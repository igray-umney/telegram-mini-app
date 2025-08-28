require('dotenv').config();
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://your-app.vercel.app';

// Middleware
app.use(cors());
app.use(express.json());

// Инициализация бота
const bot = new TelegramBot(TOKEN, { polling: true });

// Простое хранилище данных (в продакшене используйте базу данных)
const users = new Map();
const payments = new Map();

// Команда /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;
  
  // Регистрируем пользователя
  users.set(chatId, {
    id: chatId,
    username: user.username,
    first_name: user.first_name,
    premium_until: null,
    created_at: new Date()
  });

  const isWebAppUser = msg.text.includes('webapp');
  
  if (isWebAppUser) {
    // Если запуск из WebApp, отправляем другой интерфейс
    await bot.sendMessage(chatId, 
      '✅ Подключение к боту успешно!\n\nТеперь вы можете получать напоминания о занятиях.', 
      {
        reply_markup: {
          inline_keyboard: [[
            { text: '🚀 Открыть приложение', web_app: { url: WEBAPP_URL } }
          ]]
        }
      }
    );
  } else {
    // Обычное главное меню
    await sendMainMenu(chatId, user.first_name);
  }
});

async function sendMainMenu(chatId, firstName) {
  const isPremium = checkPremium(chatId);
  
  const text = `
👋 Привет, ${firstName}!

🎯 **Развивайка** - приложение для развития детей от 1 до 7 лет

${isPremium ? '👑 У вас активна Premium подписка!' : '🆓 Вы используете бесплатную версию'}

Выберите действие:
`;

  const keyboard = {
    inline_keyboard: [
      [{ text: '🚀 Открыть приложение', web_app: { url: `${WEBAPP_URL}?user_id=${chatId}&premium=${isPremium}` } }],
      isPremium 
        ? [{ text: '💳 Управление подпиской', callback_data: 'manage_subscription' }]
        : [{ text: '👑 Купить Premium', callback_data: 'buy_premium' }],
      [
        { text: 'ℹ️ О приложении', callback_data: 'about' },
        { text: '💬 Поддержка', callback_data: 'support' }
      ]
    ]
  };

  await bot.sendMessage(chatId, text, { 
    reply_markup: keyboard,
    parse_mode: 'Markdown'
  });
}

// Обработка callback запросов
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  switch (data) {
    case 'buy_premium':
      await handleBuyPremium(chatId, query.message.message_id);
      break;
    case 'pay_stars':
      await createStarsPayment(chatId);
      break;
    case 'about':
      await handleAbout(chatId, query.message.message_id);
      break;
    case 'support':
      await handleSupport(chatId, query.message.message_id);
      break;
    case 'back_to_menu':
      await bot.deleteMessage(chatId, query.message.message_id);
      await sendMainMenu(chatId, query.from.first_name);
      break;
  }

  await bot.answerCallbackQuery(query.id);
});

async function handleBuyPremium(chatId, messageId) {
  const text = `
👑 **Premium подписка**

✅ Все активности для всех возрастов
✅ Детальные инструкции и материалы  
✅ Полная библиотека статей
✅ Видеоуроки от экспертов
✅ Персональная статистика
✅ Без рекламы

💰 **Стоимость:** 299₽/месяц

Выберите способ оплаты:
`;

  const keyboard = {
    inline_keyboard: [
      [{ text: '⭐ Оплатить через Telegram Stars (299 ⭐)', callback_data: 'pay_stars' }],
      [{ text: '◀️ Назад', callback_data: 'back_to_menu' }]
    ]
  };

  await bot.editMessageText(text, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: keyboard,
    parse_mode: 'Markdown'
  });
}

async function createStarsPayment(chatId) {
  try {
    await bot.sendInvoice(
      chatId,
      'Premium подписка Развивайка',
      'Месячная подписка на все функции приложения',
      `premium_month_${chatId}`,
      '', // Пустой токен для Stars
      'XTR', // Валюта для Stars
      [{ label: 'Premium на 1 месяц', amount: 299 }],
      {
        start_parameter: `premium_${chatId}`,
        photo_url: 'https://via.placeholder.com/640x360/6366f1/ffffff?text=Premium',
        photo_size: 100,
        photo_width: 640,
        photo_height: 360
      }
    );
  } catch (error) {
    console.error('Ошибка создания инвойса Stars:', error);
    await bot.sendMessage(chatId, '❌ Ошибка создания платежа. Попробуйте позже.');
  }
}

function checkPremium(userId) {
  const user = users.get(userId);
  if (!user || !user.premium_until) return false;
  return new Date(user.premium_until) > new Date();
}

// API endpoints для WebApp
app.post('/api/telegram/connect', async (req, res) => {
  const { userId, username, settings } = req.body;
  
  try {
    // Сохраняем настройки уведомлений
    const userData = users.get(userId) || {};
    userData.notification_settings = settings;
    users.set(userId, userData);
    
    res.json({ 
      success: true, 
      message: 'Подключение успешно',
      needsBotStart: !users.has(userId)
    });
  } catch (error) {
    console.error('Ошибка подключения:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Обработка successful payment для Stars
bot.on('successful_payment', async (msg) => {
  const chatId = msg.chat.id;
  
  // Активируем премиум на 30 дней
  const user = users.get(chatId) || {};
  const premiumUntil = new Date();
  premiumUntil.setDate(premiumUntil.getDate() + 30);
  user.premium_until = premiumUntil;
  users.set(chatId, user);
  
  await bot.sendMessage(chatId, 
    '✅ Спасибо за покупку!\n\n👑 Premium подписка активирована на 30 дней.\n\nТеперь у вас есть доступ ко всем функциям!',
    {
      reply_markup: {
        inline_keyboard: [[
          { text: '🚀 Открыть приложение', web_app: { url: `${WEBAPP_URL}?user_id=${chatId}&premium=true` } }
        ]]
      }
    }
  );
});

// Pre-checkout query для Stars
bot.on('pre_checkout_query', async (query) => {
  await bot.answerPreCheckoutQuery(query.id, true);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
