require('dotenv').config();
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8001;
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL || 'https://telegram-mini-app-gules-nine.vercel.app/';

// Middleware
app.use(cors({
  origin: [
    'https://telegram-mini-app-gules-nine.vercel.app',
    'https://web.telegram.org',
    'https://k.web.telegram.org',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.options('*', cors()); // Разрешаем preflight запросы
// Инициализация бота
let bot;
try {
  bot = new TelegramBot(TOKEN, { polling: true });
  console.log('🤖 Бот инициализирован');
} catch (error) {
  console.error('❌ Ошибка инициализации бота:', error);
}

// Файл данных
const dataFile = path.join(__dirname, 'users.json');
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ users: [] }, null, 2));
}

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch {
    return { users: [] };
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return true;
  } catch {
    return false;
  }
}

// API Endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Telegram Bot Server работает!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/telegram/status/:userId', (req, res) => {
  const data = loadData();
  const user = data.users.find(u => u.userId === req.params.userId);
  
  res.json({
    connected: user?.hasStarted || false,
    enabled: user?.enabled || false
  });
});

// Используем минимальную допустимую сумму
const testAmount = 60; // Минимум ~60 рублей для Telegram Payments

try {
  // Отправляем инвойс через бота
  const response = await bot.sendInvoice(userId, {
    title: 'Премиум подписка Развивайка',
    description: description || 'Премиум подписка на 1 месяц (тест)',
    payload: `premium_${userId}_${Date.now()}`,
    provider_token: process.env.PAYMENT_TOKEN,
    currency: 'RUB',
    prices: [{ label: 'Премиум подписка', amount: testAmount * 100 }], // 60 рублей в копейках
    start_parameter: 'premium_payment'
  });

  // Обработчик успешного платежа
bot.on('pre_checkout_query', (query) => {
  console.log('💰 Pre-checkout query получен:', query.id);
  // Отвечаем что всё ок для завершения платежа
  bot.answerPreCheckoutQuery(query.id, true);
});

// Обработчик завершенного платежа
bot.on('successful_payment', (msg) => {
  console.log('✅ Платеж успешно завершен!');
  console.log('Пользователь:', msg.from.id);
  console.log('Сумма:', msg.successful_payment.total_amount);
  console.log('Payload:', msg.successful_payment.invoice_payload);
  
  const userId = msg.from.id;
  
  // Отправляем сообщение об успешной активации
  bot.sendMessage(userId, 
    '🎉 *Поздравляем!*\n\n' +
    '✅ Премиум подписка успешно активирована!\n\n' +
    '💎 Теперь вам доступны:\n' +
    '• Все активности без ограничений\n' +
    '• Персональные программы развития\n' +
    '• Подробная аналитика прогресса\n' +
    '• Эксклюзивные материалы\n\n' +
    '🚀 Откройте приложение чтобы воспользоваться всеми возможностями!',
    { 
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 Открыть приложение', web_app: { url: process.env.APP_URL || 'https://telegram-mini-app-gules-nine.vercel.app/' } }]
        ]
      }
    }
  );
});

app.post('/api/telegram/create-stars-invoice', async (req, res) => {
  console.log('⭐ Создание Stars инвойса для:', req.body.userId);
  
  const { userId, stars, description } = req.body;
  
  if (!userId || !stars) {
    return res.status(400).json({ 
      success: false, 
      message: 'Отсутствуют обязательные параметры' 
    });
  }

  try {
    // Отправляем Stars инвойс через бота
    const response = await bot.sendInvoice(userId, {
      title: 'Премиум подписка Развивайка',
      description: description || 'Премиум подписка на 1 месяц',
      payload: `stars_premium_${userId}_${Date.now()}`,
      provider_token: '', // Для Stars токен не нужен
      currency: 'XTR', // Валюта для Telegram Stars
      prices: [{ label: 'Премиум подписка', amount: stars }], // amount в Stars
      start_parameter: 'stars_payment'
    });

    console.log('⭐ Stars инвойс создан успешно');
    res.json({ 
      success: true, 
      message: 'Stars инвойс отправлен в Telegram',
      invoiceId: response.message_id
    });

  } catch (error) {
    console.error('❌ Ошибка создания Stars инвойса:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка создания Stars платежа: ' + error.message 
    });
  }
});

// Команды бота
if (bot) {
  bot.onText(/\/start/, async (msg) => {
    const userId = msg.from.id.toString();
    
    const data = loadData();
    let user = data.users.find(u => u.userId === userId);
    
    if (!user) {
      user = {
        userId,
        username: msg.from.username,
        firstName: msg.from.first_name,
        hasStarted: true,
        enabled: false,
        createdAt: new Date().toISOString()
      };
      data.users.push(user);
    } else {
      user.hasStarted = true;
    }
    
    saveData(data);
    
    const message = `🌟 Добро пожаловать в Развивайка!
    
Нажмите кнопку ниже чтобы открыть приложение:`;

const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Открыть приложение', web_app: { url: APP_URL } }]
      ]
    }
  };

    bot.sendMessage(msg.chat.id, message, keyboard);
  });
}

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
