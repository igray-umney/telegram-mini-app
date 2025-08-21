require('dotenv').config();
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8001;
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN;
const APP_URL = 'https://telegram-mini-app-gules-nine.vercel.app/';

// Middleware
app.use(cors({
  origin: [
    'https://telegram-mini-app-gules-nine.vercel.app',
    'https://web.telegram.org',
    'https://k.web.telegram.org'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

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

app.post('/api/telegram/create-invoice', async (req, res) => {
  console.log('💳 Создание инвойса для:', req.body.userId);
  
  // Временно возвращаем успех для тестирования
  res.json({
    success: true,
    message: 'Инвойс создан (тест)',
    invoiceUrl: 'test'
  });
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
