import os
import asyncpg
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        self.pool = None
        self.database_url = os.getenv("DATABASE_URL")
        
    async def init(self):
        """Инициализация подключения к БД"""
        try:
            self.pool = await asyncpg.create_pool(
                self.database_url,
                min_size=1,
                max_size=10
            )
            await self.create_tables()
            logger.info("Database connected successfully")
        except Exception as e:
            logger.error(f"Database connection error: {e}")
            
    async def create_tables(self):
        """Создание таблиц если их нет"""
        async with self.pool.acquire() as conn:
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    user_id BIGINT PRIMARY KEY,
                    username TEXT,
                    first_name TEXT,
                    created_at TIMESTAMP DEFAULT NOW(),
                    premium_until TIMESTAMP,
                    total_activities INT DEFAULT 0,
                    total_time_minutes INT DEFAULT 0,
                    current_streak INT DEFAULT 0,
                    max_streak INT DEFAULT 0,
                    last_activity_date DATE
                )
            """)
            
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS payments (
                    id SERIAL PRIMARY KEY,
                    user_id BIGINT REFERENCES users(user_id),
                    amount DECIMAL(10, 2),
                    currency TEXT,
                    payment_method TEXT,
                    payment_id TEXT UNIQUE,
                    status TEXT,
                    created_at TIMESTAMP DEFAULT NOW(),
                    confirmed_at TIMESTAMP
                )
            """)
            
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS activities (
                    id SERIAL PRIMARY KEY,
                    user_id BIGINT REFERENCES users(user_id),
                    activity_name TEXT,
                    category TEXT,
                    duration_minutes INT,
                    child_age INT,
                    completed_at TIMESTAMP DEFAULT NOW()
                )
            """)
            
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS children (
                    id SERIAL PRIMARY KEY,
                    user_id BIGINT REFERENCES users(user_id),
                    name TEXT,
                    age INT,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            """)
    
    async def register_user(self, user_id: int, username: str = None, first_name: str = None):
        """Регистрация нового пользователя"""
        async with self.pool.acquire() as conn:
            await conn.execute("""
                INSERT INTO users (user_id, username, first_name)
                VALUES ($1, $2, $3)
                ON CONFLICT (user_id) 
                DO UPDATE SET 
                    username = EXCLUDED.username,
                    first_name = EXCLUDED.first_name
            """, user_id, username, first_name)
            
    async def check_premium(self, user_id: int) -> bool:
        """Проверка активности премиум подписки"""
        async with self.pool.acquire() as conn:
            result = await conn.fetchval("""
                SELECT premium_until > NOW()
                FROM users
                WHERE user_id = $1
            """, user_id)
            return result or False
            
    async def activate_premium(self, user_id: int, days: int = 30):
        """Активация премиум подписки"""
        async with self.pool.acquire() as conn:
            # Получаем текущую дату окончания премиума
            current_premium = await conn.fetchval("""
                SELECT premium_until
                FROM users
                WHERE user_id = $1
            """, user_id)
            
            # Если премиум уже активен, продлеваем от текущей даты окончания
            if current_premium and current_premium > datetime.now():
                new_premium_until = current_premium + timedelta(days=days)
            else:
                new_premium_until = datetime.now() + timedelta(days=days)
                
            await conn.execute("""
                UPDATE users
                SET premium_until = $2
                WHERE user_id = $1
            """, user_id, new_premium_until)
            
    async def save_payment(self, user_id: int, amount: float, currency: str, 
                          payment_method: str, payment_id: str, status: str):
        """Сохранение информации о платеже"""
        async with self.pool.acquire() as conn:
            await conn.execute("""
                INSERT INTO payments (user_id, amount, currency, payment_method, payment_id, status)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (payment_id) 
                DO UPDATE SET status = EXCLUDED.status
            """, user_id, amount, currency, payment_method, payment_id, status)
            
    async def confirm_payment(self, payment_id: str):
        """Подтверждение платежа"""
        async with self.pool.acquire() as conn:
            await conn.execute("""
                UPDATE payments
                SET status = 'confirmed', confirmed_at = NOW()
                WHERE payment_id = $1
            """, payment_id)
            
    async def add_child(self, user_id: int, name: str, age: int):
        """Добавление ребенка"""
        async with self.pool.acquire() as conn:
            await conn.execute("""
                INSERT INTO children (user_id, name, age)
                VALUES ($1, $2, $3)
            """, user_id, name, age)
            
    async def get_children(self, user_id: int):
        """Получение списка детей пользователя"""
        async with self.pool.acquire() as conn:
            return await conn.fetch("""
                SELECT id, name, age
                FROM children
                WHERE user_id = $1
                ORDER BY id
            """, user_id)
            
    async def save_activity(self, user_id: int, activity_name: str, 
                           category: str, duration_minutes: int, child_age: int):
        """Сохранение выполненной активности"""
        async with self.pool.acquire() as conn:
            # Сохраняем активность
            await conn.execute("""
                INSERT INTO activities (user_id, activity_name, category, duration_minutes, child_age)
                VALUES ($1, $2, $3, $4, $5)
            """, user_id, activity_name, category, duration_minutes, child_age)
            
            # Обновляем статистику пользователя
            last_activity = await conn.fetchval("""
                SELECT last_activity_date
                FROM users
                WHERE user_id = $1
            """, user_id)
            
            today = datetime.now().date()
            yesterday = today - timedelta(days=1)
            
            # Обновляем streak
            if last_activity == yesterday:
                # Продолжаем streak
                await conn.execute("""
                    UPDATE users
                    SET current_streak = current_streak + 1,
                        max_streak = GREATEST(max_streak, current_streak + 1),
                        last_activity_date = $2,
                        total_activities = total_activities + 1,
                        total_time_minutes = total_time_minutes + $3
                    WHERE user_id = $1
                """, user_id, today, duration_minutes)
            elif last_activity != today:
                # Начинаем новый streak или обновляем сегодняшний
                await conn.execute("""
                    UPDATE users
                    SET current_streak = 1,
                        max_streak = GREATEST(max_streak, 1),
                        last_activity_date = $2,
                        total_activities = total_activities + 1,
                        total_time_minutes = total_time_minutes + $3
                    WHERE user_id = $1
                """, user_id, today, duration_minutes)
            else:
                # Уже была активность сегодня, просто добавляем статистику
                await conn.execute("""
                    UPDATE users
                    SET total_activities = total_activities + 1,
                        total_time_minutes = total_time_minutes + $2
                    WHERE user_id = $1
                """, user_id, duration_minutes)
                
    async def get_user_stats(self, user_id: int):
        """Получение статистики пользователя"""
        async with self.pool.acquire() as conn:
            return await conn.fetchrow("""
                SELECT 
                    current_streak,
                    max_streak,
                    total_activities,
                    total_time_minutes,
                    premium_until > NOW() as is_premium,
                    premium_until
                FROM users
                WHERE user_id = $1
            """, user_id)
            
    async def get_recent_activities(self, user_id: int, limit: int = 10):
        """Получение последних активностей"""
        async with self.pool.acquire() as conn:
            return await conn.fetch("""
                SELECT 
                    activity_name,
                    category,
                    duration_minutes,
                    child_age,
                    completed_at
                FROM activities
                WHERE user_id = $1
                ORDER BY completed_at DESC
                LIMIT $2
            """, user_id, limit)
            
    async def close(self):
        """Закрытие подключения к БД"""
        if self.pool:
            await self.pool.close()
