import os, sys
sys.path.append(os.path.dirname(__file__))  # чтобы видеть database.py рядом
from database import Database


import logging
import os
from datetime import datetime
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart, Command
from aiogram.types import WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup, LabeledPrice
from aiogram.utils.keyboard import InlineKeyboardBuilder
import asyncio
import aiohttp
from database import Database
from payments import PaymentHandler

# Настройка логирования
logging.basicConfig(level=logging.INFO)

# Инициализация
BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://your-app.vercel.app")
YOOKASSA_SECRET = os.getenv("YOOKASSA_SECRET")
YOOKASSA_SHOP_ID = os.getenv("YOOKASSA_SHOP_ID")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()
db = Database()
payment_handler = PaymentHandler(YOOKASSA_SHOP_ID, YOOKASSA_SECRET)

# Главное меню
@dp.message(CommandStart())
async def start_command(message: types.Message):
    user_id = message.from_user.id
    username = message.from_user.username or "Пользователь"
    
    # Регистрируем пользователя в БД
    await db.register_user(user_id, username)
    
    # Проверяем статус подписки
    is_premium = await db.check_premium(user_id)
    
    text = f"""
👋 Привет, {message.from_user.first_name}!

🎯 **Развивайка** - приложение для развития детей от 1 до 7 лет

{'👑 У вас активна Premium подписка!' if is_premium else '🆓 Вы используете бесплатную версию'}

Выберите действие:
"""
    
    keyboard = InlineKeyboardBuilder()
    
    # Кнопка запуска приложения
    webapp_url = f"{WEBAPP_URL}?user_id={user_id}&premium={str(is_premium).lower()}"
    keyboard.row(
        InlineKeyboardButton(
            text="🚀 Открыть приложение",
            web_app=WebAppInfo(url=webapp_url)
        )
    )
    
    # Кнопки управления подпиской
    if not is_premium:
        keyboard.row(
            InlineKeyboardButton(text="👑 Купить Premium", callback_data="buy_premium")
        )
    else:
        keyboard.row(
            InlineKeyboardButton(text="💳 Управление подпиской", callback_data="manage_subscription")
        )
    
    keyboard.row(
        InlineKeyboardButton(text="ℹ️ О приложении", callback_data="about"),
        InlineKeyboardButton(text="💬 Поддержка", callback_data="support")
    )
    
    await message.answer(
        text,
        reply_markup=keyboard.as_markup(),
        parse_mode="Markdown"
    )

# Обработка покупки Premium
@dp.callback_query(F.data == "buy_premium")
async def buy_premium(callback: types.CallbackQuery):
    keyboard = InlineKeyboardBuilder()
    
    keyboard.row(
        InlineKeyboardButton(text="⭐ Оплатить через Telegram Stars (299 ⭐)", callback_data="pay_stars")
    )
    keyboard.row(
        InlineKeyboardButton(text="💳 Оплатить картой (299₽)", callback_data="pay_card")
    )
    keyboard.row(
        InlineKeyboardButton(text="◀️ Назад", callback_data="back_to_menu")
    )
    
    text = """
👑 **Premium подписка**

✅ Все активности для всех возрастов
✅ Детальные инструкции и материалы  
✅ Полная библиотека статей
✅ Видеоуроки от экспертов
✅ Персональная статистика
✅ Без рекламы

💰 **Стоимость:** 299₽/месяц

Выберите способ оплаты:
"""
    
    await callback.message.edit_text(
        text,
        reply_markup=keyboard.as_markup(),
        parse_mode="Markdown"
    )
    await callback.answer()

# Оплата через Telegram Stars
@dp.callback_query(F.data == "pay_stars")
async def pay_with_stars(callback: types.CallbackQuery):
    user_id = callback.from_user.id
    
    # Создаем инвойс для Telegram Stars
    await bot.send_invoice(
        chat_id=user_id,
        title="Premium подписка Развивайка",
        description="Месячная подписка на все функции приложения",
        payload=f"premium_month_{user_id}",
        provider_token="",  # Пустой токен для Stars
        currency="XTR",  # Код валюты для Stars
        prices=[LabeledPrice(label="Premium на 1 месяц", amount=299)],
        start_parameter=f"premium_{user_id}",
        photo_url="https://your-app.vercel.app/premium-banner.jpg",
        photo_size=100,
        photo_width=640,
        photo_height=360
    )
    await callback.answer()

# Оплата картой через ЮKassa
@dp.callback_query(F.data == "pay_card") 
async def pay_with_card(callback: types.CallbackQuery):
    user_id = callback.from_user.id
    
    # Создаем платеж в ЮKassa
    payment_url = await payment_handler.create_payment(
        amount=299,
        description="Premium подписка Развивайка", 
        user_id=user_id
    )
    
    if payment_url:
        keyboard = InlineKeyboardBuilder()
        keyboard.row(
            InlineKeyboardButton(text="💳 Перейти к оплате", url=payment_url)
        )
        keyboard.row(
            InlineKeyboardButton(text="✅ Я оплатил", callback_data=f"check_payment_{user_id}")
        )
        keyboard.row(
            InlineKeyboardButton(text="◀️ Назад", callback_data="buy_premium")
        )
        
        await callback.message.edit_text(
            "🔗 Ссылка на оплату создана!\n\nНажмите кнопку ниже для перехода к оплате:",
            reply_markup=keyboard.as_markup()
        )
    else:
        await callback.answer("❌ Ошибка создания платежа. Попробуйте позже.", show_alert=True)

# Обработка успешной оплаты Stars
@dp.message(F.successful_payment)
async def process_successful_payment(message: types.Message):
    user_id = message.from_user.id
    
    # Активируем Premium в БД
    await db.activate_premium(user_id, days=30)
    
    # Отправляем подтверждение
    await message.answer(
        "✅ Спасибо за покупку!\n\n"
        "👑 Premium подписка активирована на 30 дней.\n\n"
        "Нажмите кнопку ниже, чтобы открыть приложение с полным функционалом:",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(
                text="🚀 Открыть приложение",
                web_app=WebAppInfo(url=f"{WEBAPP_URL}?user_id={user_id}&premium=true")
            )
        ]])
    )

# Pre-checkout query для Stars
@dp.pre_checkout_query()
async def process_pre_checkout_query(pre_checkout_query: types.PreCheckoutQuery):
    await bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True)

# Проверка оплаты через ЮKassa
@dp.callback_query(F.data.startswith("check_payment_"))
async def check_payment(callback: types.CallbackQuery):
    user_id = int(callback.data.split("_")[2])
    
    # Проверяем статус платежа
    is_paid = await payment_handler.check_payment_status(user_id)
    
    if is_paid:
        await db.activate_premium(user_id, days=30)
        await callback.message.edit_text(
            "✅ Оплата подтверждена!\n\n"
            "👑 Premium подписка активирована на 30 дней.",
            reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
                InlineKeyboardButton(
                    text="🚀 Открыть приложение",
                    web_app=WebAppInfo(url=f"{WEBAPP_URL}?user_id={user_id}&premium=true")
                )
            ]])
        )
    else:
        await callback.answer(
            "⏳ Платеж еще не подтвержден. Попробуйте через минуту.",
            show_alert=True
        )

# О приложении
@dp.callback_query(F.data == "about")
async def about_app(callback: types.CallbackQuery):
    text = """
📱 **О приложении Развивайка**

Развивайка - это современное приложение для развития детей, созданное родителями для родителей.

**Что включено:**
• 100+ развивающих активностей
• Адаптация под каждый возраст (1-7 лет)
• Пошаговые инструкции
• Отслеживание прогресса
• Библиотека полезных статей
• Видеоуроки от экспертов

**Возрастные группы:**
• 1-2 года: Сенсорное развитие
• 2-3 года: Мелкая моторика и речь
• 3-4 года: Логика и творчество  
• 4-5 лет: Подготовка к школе
• 5-7 лет: Комплексное развитие

Версия: 2.0
"""
    
    keyboard = InlineKeyboardBuilder()
    keyboard.row(
        InlineKeyboardButton(text="◀️ Назад", callback_data="back_to_menu")
    )
    
    await callback.message.edit_text(
        text,
        reply_markup=keyboard.as_markup(),
        parse_mode="Markdown"
    )
    await callback.answer()

# Поддержка
@dp.callback_query(F.data == "support")
async def support(callback: types.CallbackQuery):
    text = """
💬 **Поддержка**

Если у вас есть вопросы или предложения:

📧 Email: support@razvivajka.ru
💬 Telegram: @razvivajka_support

Часто задаваемые вопросы:

**Q: Как отменить подписку?**
A: Нажмите "Управление подпиской" в главном меню

**Q: Можно ли использовать на нескольких устройствах?**
A: Да, привязка идет к вашему Telegram аккаунту

**Q: Есть ли пробный период?**
A: Бесплатная версия доступна без ограничений по времени
"""
    
    keyboard = InlineKeyboardBuilder()
    keyboard.row(
        InlineKeyboardButton(text="◀️ Назад", callback_data="back_to_menu")
    )
    
    await callback.message.edit_text(
        text,
        reply_markup=keyboard.as_markup(),
        parse_mode="Markdown"
    )
    await callback.answer()

# Возврат в главное меню
@dp.callback_query(F.data == "back_to_menu")
async def back_to_menu(callback: types.CallbackQuery):
    await start_command(callback.message)
    await callback.answer()

# Вебхук для ЮKassa
async def yookassa_webhook(request):
    data = await request.json()
    
    if data.get("event") == "payment.succeeded":
        payment_data = data.get("object", {})
        user_id = payment_data.get("metadata", {}).get("user_id")
        
        if user_id:
            await db.activate_premium(int(user_id), days=30)
            await bot.send_message(
                user_id,
                "✅ Оплата получена! Premium подписка активирована на 30 дней."
            )
    
    return {"status": "ok"}

# Запуск бота
async def main():
    await db.init()
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
