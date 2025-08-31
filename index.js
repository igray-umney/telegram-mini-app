const { Bot, Keyboard, InlineKeyboard } = require('grammy');
const cron = require('node-cron');
const axios = require('axios');
const crypto = require('crypto');
const { Pool } = require('pg');
const express = require('express');
require('dotenv').config();

// Express сервер
const app = express();
app.use(express.json());

// Подключение к базе данных
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// СНАЧАЛА создаем бота
const bot = new Bot(process.env.BOT_TOKEN);

// Тарифные планы
const PLANS = {
  month: { price: 19900, title: "1 месяц", stars: 199 }, // цены в копейках для ЮКасса, в Stars для Telegram
  quarter: { price: 49900, title: "3 месяца", stars: 499 },
  half: { price: 99900, title: "6 месяцев", stars: 999 },
  year: { price: 199900, title: "1 год", stars: 1999 }
};

// Команды
bot.command('start', async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text('🎮 Открыть приложение', 'open_app')
    .row()
    .text('💎 Премиум доступ', 'premium')
    .text('⚙️ Настройки', 'settings');

  await ctx.reply(
    `🌟 Добро пожаловать в развивающие игры для малышей!
    
👶 Возраст: 1-2 года
🎯 Интерактивные активности для развития
👨‍👩‍👧‍👦 Материалы для родителей

Нажмите "Открыть приложение" чтобы начать!`,
    { reply_markup: keyboard }
  );
});

// ПОТОМ добавляем webhook обработчик
app.post('/webhook/telegram', (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

// Обработка callback'ов
bot.callbackQuery('open_app', async (ctx) => {
  const userId = ctx.from.id;
  const webAppUrl = `${process.env.WEBAPP_URL}?user_id=${userId}`;
  
  const keyboard = new InlineKeyboard()
    .webApp('🎮 Открыть приложение', webAppUrl)
    .row()
    .text('◀️ Назад', 'back_main');
    
  await ctx.editMessageText(
    `🎮 Нажмите кнопку ниже чтобы открыть приложение:`,
    { reply_markup: keyboard }
  );
});

bot.callbackQuery('premium', async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text('💳 ЮКасса', 'pay_yukassa')
    .text('⭐ Telegram Stars', 'pay_stars')
    .row()
    .text('◀️ Назад', 'back_main');
    
  await ctx.editMessageText(
    `💎 Премиум доступ открывает:
    
✅ 20+ развивающих активностей
📊 Трекинг прогресса ребенка  
📚 Экспертные материалы для родителей
⏰ Настраиваемые напоминания

Выберите способ оплаты:`,
    { reply_markup: keyboard }
  );
});

bot.callbackQuery('pay_yukassa', async (ctx) => {
  const keyboard = new InlineKeyboard();
  
  Object.entries(PLANS).forEach(([key, plan]) => {
    keyboard.text(`${plan.title} - ${plan.price/100}₽`, `yukassa_${key}`).row();
  });
  
  keyboard.text('◀️ Назад', 'premium');
  
  await ctx.editMessageText(
    `💳 Выберите тарифный план (ЮКасса):`,
    { reply_markup: keyboard }
  );
});

bot.callbackQuery('pay_stars', async (ctx) => {
  const keyboard = new InlineKeyboard();
  
  Object.entries(PLANS).forEach(([key, plan]) => {
    keyboard.text(`${plan.title} - ${plan.stars}⭐`, `stars_${key}`).row();
  });
  
  keyboard.text('◀️ Назад', 'premium');
  
  await ctx.editMessageText(
    `⭐ Выберите тарифный план (Telegram Stars):`,
    { reply_markup: keyboard }
  );
});

// Обработка платежей ЮКасса
bot.callbackQuery(/^yukassa_(.+)$/, async (ctx) => {
  const plan = ctx.match[1];
  const planData = PLANS[plan];
  
  if (!planData) return;
  
  try {
    const userId = ctx.from.id;
    const paymentId = await createYookassaPayment(userId, plan, planData);
    
    if (paymentId) {
      // Сохраняем информацию о платеже в БД
      await savePaymentInfo(userId, paymentId, plan, planData.price, 'yukassa');
      
      const keyboard = new InlineKeyboard()
        .url('💳 Оплатить', paymentId.confirmation.confirmation_url)
        .row()
        .text('◀️ Назад', 'premium');
        
      await ctx.editMessageText(
        `💳 Счет создан!
        
📋 План: ${planData.title}
💰 Сумма: ${planData.price/100}₽

Нажмите "Оплатить" для перехода к оплате.
После успешной оплаты вы получите доступ к премиум версии.`,
        { reply_markup: keyboard }
      );
    } else {
      await ctx.reply('Ошибка создания платежа. Попробуйте позже.');
    }
  } catch (error) {
    console.error('YooKassa payment error:', error);
    await ctx.reply('Произошла ошибка при создании платежа. Попробуйте позже.');
  }
});

// Обработка платежей Stars
bot.callbackQuery(/^stars_(.+)$/, async (ctx) => {
  const plan = ctx.match[1];
  const planData = PLANS[plan];
  
  if (!planData) return;
  
  try {
    await ctx.answerCallbackQuery();
    await ctx.replyWithInvoice({
      title: `Премиум доступ - ${planData.title}`,
      description: 'Полный доступ ко всем развивающим активностям',
      payload: `premium_${plan}_${ctx.from.id}`,
      provider_token: '', // Для Stars оставляем пустым
      currency: 'XTR', // Telegram Stars
      prices: [{ label: planData.title, amount: planData.stars }]
    });
  } catch (error) {
    console.error('Error creating Stars invoice:', error);
    await ctx.reply('Произошла ошибка при создании счета. Попробуйте позже.');
  }
});

// Обработка успешных платежей Stars
bot.on('pre_checkout_query', async (ctx) => {
  await ctx.answerPreCheckoutQuery(true);
});

bot.on('message:successful_payment', async (ctx) => {
  const payment = ctx.message.successful_payment;
  const userId = ctx.from.id;
  
  // TODO: Обновить статус подписки в базе данных
  
  const premiumUrl = `${process.env.WEBAPP_URL}/premium?user_id=${userId}&token=${generatePremiumToken(userId)}`;
  
  const keyboard = new InlineKeyboard()
    .webApp('🌟 Открыть премиум версию', premiumUrl);
  
  await ctx.reply(
    `🎉 Спасибо за покупку! Премиум доступ активирован.
    
Теперь вам доступны все функции приложения:
✅ Все развивающие активности
📊 Трекинг прогресса
📚 Материалы для родителей`,
    { reply_markup: keyboard }
  );
});

bot.callbackQuery('settings', async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text('👶 Изменить возраст ребенка', 'change_age')
    .row()
    .text('⏰ Настроить напоминания', 'setup_reminders')
    .row()
    .text('◀️ Назад', 'back_main');
    
  await ctx.editMessageText(
    '⚙️ Настройки:', 
    { reply_markup: keyboard }
  );
});

bot.callbackQuery('back_main', async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text('🎮 Открыть приложение', 'open_app')
    .row()
    .text('💎 Премиум доступ', 'premium')
    .text('⚙️ Настройки', 'settings');

  await ctx.editMessageText(
    `🌟 Главное меню
    
👶 Возраст: 1-2 года
🎯 Интерактивные активности для развития
👨‍👩‍👧‍👦 Материалы для родителей`,
    { reply_markup: keyboard }
  );
});

// Вспомогательные функции
function generatePremiumToken(userId) {
  // Простая генерация токена - в продакшене использовать JWT
  return Buffer.from(`${userId}_${Date.now()}`).toString('base64');
}

// Функции для работы с ЮКассой
async function createYookassaPayment(userId, plan, planData) {
  const { v4: uuidv4 } = require('uuid');
  
  const paymentData = {
    amount: {
      value: (planData.price / 100).toFixed(2),
      currency: 'RUB'
    },
    confirmation: {
      type: 'redirect',
      return_url: `${process.env.WEBAPP_URL}/payment-success?user_id=${userId}&plan=${plan}`
    },
    capture: true,
    description: `Премиум подписка - ${planData.title}`,
    metadata: {
      user_id: userId,
      plan: plan,
      telegram_bot: 'kids_dev'
    }
  };

  try {
    const response = await axios.post(
      'https://api.yookassa.ru/v3/payments',
      paymentData,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.YUKASSA_SHOP_ID}:${process.env.YUKASSA_SECRET_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
          'Idempotence-Key': uuidv4()
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('YooKassa API error:', error.response?.data || error.message);
    return null;
  }
}

// Функции для работы с базой данных
async function savePaymentInfo(telegramId, paymentData, plan, amount, method) {
  try {
    // Получаем или создаем пользователя
    const userResult = await pool.query(
      'INSERT INTO users (telegram_id) VALUES ($1) ON CONFLICT (telegram_id) DO UPDATE SET telegram_id = $1 RETURNING id',
      [telegramId]
    );
    
    const userId = userResult.rows[0].id;
    
    // Вычисляем дату окончания подписки
    let expiresAt;
    const now = new Date();
    switch (plan) {
      case 'month':
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 дней
        break;
      case 'quarter':
        expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // +90 дней
        break;
      case 'half':
        expiresAt = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000); // +180 дней
        break;
      case 'year':
        expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // +365 дней
        break;
      default:
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // по умолчанию месяц
    }
    
    // Сохраняем информацию о платеже С expires_at
    await pool.query(
      `INSERT INTO subscriptions (user_id, plan_type, status, payment_method, payment_id, amount_paid, expires_at)
       VALUES ($1, $2, 'pending', $3, $4, $5, $6)`,
      [userId, plan, method, paymentData.id, amount, expiresAt]
    );
    
    return true;
  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
}

async function activateSubscription(paymentId) {
  try {
    console.log('Ищем платеж с ID:', paymentId);
    
    // Находим платеж и активируем подписку
    const result = await pool.query(
      `UPDATE subscriptions 
       SET status = 'active', 
           starts_at = CURRENT_TIMESTAMP,
           expires_at = CASE 
             WHEN plan_type = 'month' THEN CURRENT_TIMESTAMP + INTERVAL '1 month'
             WHEN plan_type = 'quarter' THEN CURRENT_TIMESTAMP + INTERVAL '3 months'
             WHEN plan_type = 'half' THEN CURRENT_TIMESTAMP + INTERVAL '6 months'
             WHEN plan_type = 'year' THEN CURRENT_TIMESTAMP + INTERVAL '1 year'
           END
       WHERE payment_id = $1 AND status = 'pending'
       RETURNING user_id, plan_type`,
      [paymentId]
    );
    
    console.log('Результат обновления подписки:', result.rows);
    
    if (result.rows.length > 0) {
      const { user_id, plan_type } = result.rows[0];
      console.log('Найден user_id:', user_id, 'plan:', plan_type);
      
      // Получаем telegram_id пользователя
      const userResult = await pool.query('SELECT telegram_id FROM users WHERE id = $1', [user_id]);
      console.log('Результат поиска telegram_id:', userResult.rows);
      
      if (userResult.rows.length > 0) {
        const telegramId = userResult.rows[0].telegram_id;
        console.log('Возвращаем telegram_id:', telegramId);
        return telegramId;
      }
    } else {
      console.log('ПРОБЛЕМА: Не найден платеж для активации');
    }
    
    return null;
  } catch (error) {
    console.error('Database error in activateSubscription:', error);
    return null;
  }
}

async function checkPremiumAccess(telegramId) {
  try {
    const result = await pool.query(
      `SELECT s.* FROM subscriptions s 
       JOIN users u ON s.user_id = u.id 
       WHERE u.telegram_id = $1 
       AND s.status = 'active' 
       AND s.expires_at > CURRENT_TIMESTAMP
       ORDER BY s.expires_at DESC 
       LIMIT 1`,
      [telegramId]
    );
    
    return result.rows.length > 0;
  } catch (error) {
    console.error('Database error in checkPremiumAccess:', error);
    return false;
  }
}

// Система напоминаний (базовая)
cron.schedule('0 10 * * *', () => {
  // TODO: Отправка утренних напоминаний всем пользователям
  console.log('Sending morning reminders...');
});

// Функция инициализации базы данных
async function initDatabase() {
  try {
    console.log('🔧 Инициализация базы данных...');
    
    // Создание таблицы users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        telegram_id BIGINT UNIQUE NOT NULL,
        username VARCHAR(255),
        first_name VARCHAR(255),
        child_name VARCHAR(255),
        child_age_months INTEGER DEFAULT 12,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Создание таблицы subscriptions
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        plan_type VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        starts_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,
        payment_method VARCHAR(50),
        payment_id VARCHAR(255),
        amount_paid INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Создание таблицы activities
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        age_min_months INTEGER NOT NULL,
        age_max_months INTEGER NOT NULL,
        category VARCHAR(100),
        requires_device BOOLEAN DEFAULT FALSE,
        requires_props BOOLEAN DEFAULT FALSE,
        is_premium BOOLEAN DEFAULT TRUE,
        content_type VARCHAR(50),
        content_data JSONB,
        duration_minutes INTEGER,
        difficulty_level INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Создание таблицы user_progress
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        rating INTEGER,
        notes TEXT,
        completion_time_minutes INTEGER
      )
    `);
    
    // Создание индексов
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
      CREATE INDEX IF NOT EXISTS idx_activities_premium ON activities(is_premium);
      CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
    `);
    
    // Добавление тестовых активностей (только если их нет)
    const activitiesCount = await pool.query('SELECT COUNT(*) FROM activities');
    if (parseInt(activitiesCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO activities (title, description, age_min_months, age_max_months, category, requires_device, requires_props, is_premium, content_type, duration_minutes) VALUES 
        ('Пальчиковая гимнастика «Сорока»', 'Классическая игра для развития мелкой моторики', 12, 24, 'physical', false, false, false, 'text', 5),
        ('Игра с мячиком', 'Катание мяча друг другу для координации', 15, 24, 'physical', false, true, false, 'text', 10),
        ('Изучаем животных', 'Показываем картинки и звуки животных', 12, 24, 'cognitive', true, false, false, 'interactive', 8)
      `);
      console.log('✅ Тестовые активности добавлены');
    }
    
    console.log('✅ База данных инициализирована успешно');
  } catch (error) {
    console.error('❌ Ошибка инициализации базы данных:', error);
  }
}

// Запуск бота и сервера
async function startApp() {
  // Инициализация базы данных при запуске
  await initDatabase();

  await bot.init();
  console.log('Bot initialized successfully');
  
  // Webhook для ЮКассы
app.post('/webhook/yookassa', async (req, res) => {
  try {
    console.log('=== ЮКасса webhook получен ===');
    console.log('Тип события:', req.body.type);
    
    if (req.body.type === 'notification' && req.body.object && req.body.object.status === 'succeeded') {
      const userId = req.body.object.metadata.user_id;
      const plan = req.body.object.metadata.plan;
      const paymentId = req.body.object.id;
      
      console.log('Получен успешный платеж:');
      console.log('- User ID:', userId);
      console.log('- Plan:', plan);
      console.log('- Payment ID:', paymentId);
      
      // Создаем или обновляем пользователя
      await pool.query(
        'INSERT INTO users (telegram_id) VALUES ($1) ON CONFLICT (telegram_id) DO NOTHING',
        [userId]
      );
      
      // Получаем ID пользователя
      const userResult = await pool.query('SELECT id FROM users WHERE telegram_id = $1', [userId]);
      const dbUserId = userResult.rows[0].id;
      
      // Создаем активную подписку
      await pool.query(
        `INSERT INTO subscriptions (user_id, plan_type, status, payment_id, expires_at, amount_paid)
         VALUES ($1, $2, 'active', $3, CURRENT_TIMESTAMP + INTERVAL '1 month', 19900)`,
        [dbUserId, plan, paymentId]
      );
      
      console.log('Подписка активирована для пользователя:', userId);
      
      // Отправляем уведомление с премиум ссылкой
      const premiumUrl = `${process.env.WEBAPP_URL}/premium.html?user_id=${userId}`;
      
      const keyboard = new InlineKeyboard()
        .webApp('🌟 Открыть премиум версию', premiumUrl);
      
      await bot.api.sendMessage(userId, 
        `🎉 Оплата прошла успешно! Премиум доступ активирован.

Теперь вам доступны все функции:
✅ 20+ развивающих активностей
📊 Трекинг прогресса ребенка
📚 Материалы для родителей`,
        { reply_markup: keyboard }
      );
      
      console.log('Премиум доступ отправлен пользователю');
    }
    
    res.status(200).json({ status: 'ok' });
    
  } catch (error) {
    console.error('Ошибка webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API для проверки статуса подписки
  app.get('/api/subscription/:telegramId', async (req, res) => {
    try {
      const { telegramId } = req.params;
      const hasPremium = await checkPremiumAccess(telegramId);
      
      res.json({ 
        hasPremium,
        telegramId: telegramId
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Запускаем Express сервер
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Запускаем Telegram бота
console.log('Bot configured for webhook mode');
}

startApp().catch(console.error);
