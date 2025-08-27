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

// после app.use(cors(...))
app.use(express.json());

// вспомогательная функция получения chatId из initData
function getChatIdFromInitData(req) {
  const initData = req.header('X-Init-Data');
  if (!initData) return { ok: false, code: 400, msg: 'no_initdata' };
  const parsed = verifyInitData(initData, TOKEN);
  if (!parsed) return { ok: false, code: 401, msg: 'bad_hmac' };
  try {
    const user = JSON.parse(parsed.user); // { id, ... }
    return { ok: true, chatId: user.id };
  } catch (e) {
    return { ok: false, code: 400, msg: 'bad_user_payload' };
  }
}

/**
 * 1) Инвойс картой через провайдера (sendInvoice требует chat_id)
 *    Если используете ЮKassa как провайдера карт — здесь будет provider_token,
 *    НО для цифрового доступа в Mini App лучше переходить на Stars.
 */
app.post('/api/telegram/create-invoice', async (req, res) => {
  const g = getChatIdFromInitData(req);
  if (!g.ok) return res.status(g.code).json({ ok: false, reason: g.msg });

  const chatId = g.chatId;
  const { amountRub = 60, description = 'Премиум на 1 месяц' } = req.body || {};

  try {
    // пример: обычный инвойс в RUB через подключенного провайдера
    await bot.sendInvoice(chatId, 'Премиум подписка', description,
      `card_sub:basic:${chatId}`, // payload
      process.env.PROVIDER_TOKEN, // токен провайдера карт (если используете)
      '', // start_parameter (можно оставить пустым)
      [{ label: '1 месяц', amount: amountRub * 100 }], // amount в копейках
      { currency: 'RUB' }
    );

    return res.json({ ok: true, sent: true });
  } catch (e) {
    console.error('create-invoice error:', e?.response?.body || e);
    return res.status(500).json({ ok: false, error: 'sendInvoice_failed' });
  }
});

/**
 * 2) Stars (XTR). Вариант А: создаём ссылку через createInvoiceLink — chat_id не нужен,
 *    возвращаем link на фронт и открываем его через WebApp.openInvoice(link).
 */
app.post('/api/telegram/create-stars-invoice', async (req, res) => {
  const g = getChatIdFromInitData(req);
  if (!g.ok) return res.status(g.code).json({ ok: false, reason: g.msg });

  const { plan = 'basic_month', amountStars = 499, description = 'Премиум 30 дней' } = req.body || {};

  try {
    const payload = `stars_sub:${plan}:${g.chatId}`;
    const resp = await fetch(`https://api.telegram.org/bot${TOKEN}/createInvoiceLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Развивайка — Премиум',
        description,
        payload,
        currency: 'XTR',
        prices: [{ label: '30 дней', amount: amountStars }],
        // если нужна подписка (30 дней):
        // subscription_period: 2592000,
        // для Stars provider_token не нужен
        provider_token: ''
      })
    });

    const json = await resp.json();
    if (!json.ok) {
      console.error('createInvoiceLink error:', json);
      return res.status(500).json({ ok: false, error: 'createInvoiceLink_failed' });
    }

    return res.json({ ok: true, invoiceLink: json.result });
  } catch (e) {
    console.error('create-stars-invoice error:', e);
    return res.status(500).json({ ok: false, error: 'stars_failed' });
  }
});

/**
 * 2-бис) Stars (XTR). Вариант Б: сразу отправляем инвойс в чат (sendInvoice) — chat_id обязателен.
 * РАЗКОММЕНТИРУЙ, если хочешь слать инвойс в чат вместо ссылки:
 */
// app.post('/api/telegram/create-stars-invoice', async (req, res) => {
//   const g = getChatIdFromInitData(req);
//   if (!g.ok) return res.status(g.code).json({ ok: false, reason: g.msg });
//
//   const chatId = g.chatId;
//   const { plan = 'basic_month', amountStars = 499, description = 'Премиум 30 дней' } = req.body || {};
//
//   try {
//     await bot.sendInvoice(
//       chatId,
//       'Развивайка — Премиум',
//       description,
//       `stars_sub:${plan}:${chatId}`,
//       '', // provider_token пустой для Stars
//       '',
//       [{ label: '30 дней', amount: amountStars }],
//       { currency: 'XTR' } // Stars
//     );
//     return res.json({ ok: true, sent: true });
//   } catch (e) {
//     console.error('stars sendInvoice error:', e?.response?.body || e);
//     return res.status(500).json({ ok: false, error: 'stars_sendInvoice_failed' });
//   }
// });


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
