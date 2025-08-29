const { Bot, Keyboard, InlineKeyboard } = require('grammy');
const cron = require('node-cron');
const axios = require('axios');
const crypto = require('crypto');
const { Pool } = require('pg');
const express = require('express');
require('dotenv').config();

// Express сервер для webhook'ов
const app = express();
app.use(express.json());

// Подключение к базе данных
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

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

// Обработка callback'ов
bot.callbackQuery('open_app', async (ctx) => {
  const userId = ctx.from.id;
  const webAppUrl = `${process.env.WEBAPP_URL}?user_id=${userId}`;
  
  const keyboard = new InlineKeyboard()
    .webApp('🎮 Открыть приложение', webAppUrl);
    
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
    
    // Сохраняем информацию о платеже
    await pool.query(
      `INSERT INTO subscriptions (user_id, plan_type, status, payment_method, payment_id, amount_paid)
       VALUES ($1, $2, 'pending', $3, $4, $5)`,
      [userId, plan, method, paymentData.id, amount]
    );
    
    return true;
  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
}

async function activateSubscription(paymentId) {
  try {
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
    
    if (result.rows.length > 0) {
      const { user_id, plan_type } = result.rows[0];
      
      // Получаем telegram_id пользователя
      const userResult = await pool.query('SELECT telegram_id FROM users WHERE id = $1', [user_id]);
      
      if (userResult.rows.length > 0) {
        return userResult.rows[0].telegram_id;
      }
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

// Запуск бота и сервера
async function startApp() {
  // Webhook для ЮКассы
  app.post('/webhook/yookassa', async (req, res) => {
    try {
      const { type, object } = req.body;
      
      if (type === 'payment.succeeded') {
        const paymentId = object.id;
        const userId = object.metadata.user_id;
        
        // Активируем подписку
        const telegramId = await activateSubscription(paymentId);
        
        if (telegramId) {
          // Отправляем уведомление пользователю
          const premiumUrl = `${process.env.WEBAPP_URL}/premium?user_id=${telegramId}&token=${generatePremiumToken(telegramId)}`;
          
          const keyboard = new InlineKeyboard()
            .webApp('🌟 Открыть премиум версию', premiumUrl);
          
          await bot.api.sendMessage(telegramId, 
            `🎉 Оплата прошла успешно! Премиум доступ активирован.
            
Теперь вам доступны все функции:
✅ 20+ развивающих активностей
📊 Трекинг прогресса ребенка
📚 Материалы для родителей
⏰ Персонализированные напоминания`,
            { reply_markup: keyboard }
          );
        }
      }
      
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Internal server error' });
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
  bot.start();
  console.log('Bot started successfully');
}

startApp().catch(console.error);
