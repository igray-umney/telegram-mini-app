// server.js — переработанный код с исправлениями

require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const crypto = require('crypto');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const APP_URL = process.env.APP_URL;
const PORT = process.env.PORT || 3000;
const DATA_FILE = 'users.json';

// === Утилиты работы с БД ===
function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { users: [] };
  }
}
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error('saveData error', e);
    return false;
  }
}

// === Инициализация бота ===
const bot = new TelegramBot(TOKEN, { polling: true });
bot.deleteWebHook().catch(()=>{});

// подтверждение оплаты (обязательно)
bot.on('pre_checkout_query', q => bot.answerPreCheckoutQuery(q.id, true));

// обработка оплаты
bot.on('message', async (msg) => {
  const sp = msg.successful_payment;
  if (!sp) return;

  console.log('✅ successful_payment', sp);
  const tgUserId = String(msg.from.id);
  const data = loadData();
  let user = data.users.find(u => u.userId === tgUserId);
  if (!user) {
    user = { userId: tgUserId, createdAt: new Date().toISOString() };
    data.users.push(user);
  }
  user.isPremium = true;
  user.premiumActivatedAt = new Date().toISOString();
  user.premiumUntil = new Date(Date.now() + 30*24*3600*1000).toISOString();
  saveData(data);

  await bot.sendMessage(tgUserId, '🎉 Премиум активирован! Открой приложение:', {
    reply_markup: { inline_keyboard: [[{ text: '🚀 Открыть приложение', web_app: { url: APP_URL } }]] }
  });
});

// стартовое сообщение с кнопкой
bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, 'Добро пожаловать! 👋', {
    reply_markup: { inline_keyboard: [[{ text: '🚀 Открыть приложение', web_app: { url: APP_URL } }]] }
  });
});

// === Проверка initData ===
function verifyInitData(initData, botToken) {
  const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
  const urlSearch = new URLSearchParams(initData);
  const hash = urlSearch.get('hash');
  urlSearch.delete('hash');
  const dataCheckString = [...urlSearch.entries()].map(([k,v]) => `${k}=${v}`).sort().join('\n');
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');
  return hmac === hash ? Object.fromEntries(new URLSearchParams(initData)) : null;
}

// === Express API ===
const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Init-Data']
}));

// Эндпоинт доступа
app.get('/me/access', (req, res) => {
  const initData = req.header('X-Init-Data');
  if (!initData) return res.status(400).json({ ok:false, reason:'no_initdata' });

  const parsed = verifyInitData(initData, TOKEN);
  if (!parsed) return res.status(401).json({ ok:false, reason:'bad_hmac' });

  const user = JSON.parse(parsed.user);
  const db = loadData();
  const u = db.users.find(x => x.userId === String(user.id));

  const premium = !!u?.isPremium && (!u.premiumUntil || new Date(u.premiumUntil) > new Date());
  res.json({
    premium,
    premium_until: u?.premiumUntil || null,
    _debug: { tg_user_id: user.id, hasRow: !!u }
  });
});

// health-check
app.get('/', (req, res) => res.send('Server OK'));

app.listen(PORT, () => console.log('🚀 Server running on port', PORT));
