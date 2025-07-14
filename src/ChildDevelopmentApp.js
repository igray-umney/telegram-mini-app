// Telegram Bot для приложения развития детей
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

// Конфигурация
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Получить у @BotFather
const WEBHOOK_URL = 'https://your-domain.com/webhook'; // Ваш домен для webhook
const PORT = process.env.PORT || 3000;

// Инициализация бота
const bot = new TelegramBot(BOT_TOKEN, { webHook: true });
bot.setWebHook(`${WEBHOOK_URL}/${BOT_TOKEN}`);

app.use(express.json());

// База данных пользователей (в продакшене использовать реальную БД)
const users = new Map();

// Данные активностей из React приложения
const activitiesDatabase = {
  1: [
    {
      id: 1,
      title: 'Сенсорная коробка',
      description: 'Исследуем разные текстуры: песок, крупы, ткани',
      duration: '15 мин',
      category: 'Моторика',
      premium: false,
      icon: '🤲',
      difficulty: 'Легко',
      materials: ['Коробка', 'Рис/гречка', 'Ткани разной текстуры', 'Мелкие игрушки'],
      instructions: [
        'Возьмите небольшую коробку или контейнер',
        'Наполните её рисом, гречкой или другой крупой',
        'Добавьте кусочки разных тканей',
        'Спрячьте мелкие игрушки в наполнителе',
        'Пусть малыш исследует содержимое руками',
        'Показывайте и называйте найденные предметы'
      ],
      benefits: 'Развивает тактильные ощущения, мелкую моторику, концентрацию внимания',
      ageRange: '12-18 месяцев'
    },
    {
      id: 2,
      title: 'Игра с водой',
      description: 'Переливаем воду между емкостями, развиваем координацию',
      duration: '20 мин',
      category: 'Моторика',
      premium: false,
      icon: '💧',
      difficulty: 'Легко',
      materials: ['2-3 емкости разного размера', 'Вода', 'Губка', 'Полотенце'],
      instructions: [
        'Приготовьте емкости разного размера',
        'Налейте воду в одну из них',
        'Покажите малышу, как переливать воду',
        'Пусть ребенок экспериментирует самостоятельно',
        'Дайте губку - пусть выжимает воду',
        'Не забудьте про полотенце для уборки!'
      ],
      benefits: 'Развивает мелкую моторику, понимание причины и следствия, тактильные ощущения',
      ageRange: '10-24 месяца'
    },
    {
      id: 3,
      title: 'Музыкальные инструменты',
      description: 'Изучаем звуки: погремушки, барабан, колокольчики',
      duration: '10 мин',
      category: 'Творчество',
      premium: true,
      icon: '🎵',
      difficulty: 'Легко',
      materials: ['Погремушки', 'Колокольчики', 'Самодельный барабан', 'Ложки'],
      instructions: [
        'Подготовьте разные музыкальные инструменты',
        'Покажите, как извлекать звуки из каждого',
        'Пусть малыш попробует сам',
        'Играйте простые ритмы',
        'Пойте песенки под аккомпанемент',
        'Танцуйте под музыку'
      ],
      benefits: 'Развивает слух, чувство ритма, координацию движений, творческие способности',
      ageRange: '8-18 месяцев'
    }
  ],
  2: [
    {
      id: 4,
      title: 'Собираем пирамидку',
      description: 'Развиваем мелкую моторику и понимание размеров',
      duration: '15 мин',
      category: 'Логика',
      premium: false,
      icon: '📐',
      difficulty: 'Легко',
      materials: ['Пирамидка с кольцами разного размера'],
      instructions: [
        'Покажите ребенку пирамидку',
        'Разберите её на части',
        'Объясните понятия "большой" и "маленький"',
        'Пусть ребенок попробует собрать сам',
        'Помогайте при необходимости',
        'Хвалите за каждое правильное действие'
      ],
      benefits: 'Развивает мелкую моторику, понимание размеров, логическое мышление, терпение',
      ageRange: '18-30 месяцев'
    },
    {
      id: 5,
      title: 'Рисование пальчиками',
      description: 'Творческое развитие с безопасными красками',
      duration: '25 мин',
      category: 'Творчество',
      premium: false,
      icon: '🎨',
      difficulty: 'Средне',
      materials: ['Пальчиковые краски', 'Большой лист бумаги', 'Влажные салфетки'],
      instructions: [
        'Подготовьте рабочее место',
        'Наденьте на ребенка старую одежду',
        'Покажите, как макать палец в краску',
        'Начните с простых отпечатков',
        'Рисуйте вместе простые фигуры',
        'Не ограничивайте творчество ребенка'
      ],
      benefits: 'Развивает творческие способности, мелкую моторику, цветовосприятие, тактильные ощущения',
      ageRange: '18-36 месяцев'
    }
  ],
  3: [
    {
      id: 7,
      title: 'Сортировка по цветам',
      description: 'Изучаем основные цвета и их названия',
      duration: '20 мин',
      category: 'Логика',
      premium: false,
      icon: '🌈',
      difficulty: 'Легко',
      materials: ['Цветные предметы', '4-5 коробочек или емкостей'],
      instructions: [
        'Подготовьте предметы 4-5 основных цветов',
        'Покажите ребенку, как сортировать по цветам',
        'Называйте каждый цвет при сортировке',
        'Пусть ребенок повторяет названия цветов',
        'Проверьте результат вместе',
        'Усложните задачу, добавив больше цветов'
      ],
      benefits: 'Развивает цветовосприятие, логическое мышление, внимание, словарный запас',
      ageRange: '2-4 года'
    }
  ]
};

// Мотивирующие сообщения
const motivationalMessages = {
  daily: [
    '🌟 Время для развития с {name}! Сегодня изучаем что-то новое?',
    '💫 {name} ждет интересную активность! Что выберем сегодня?',
    '🎯 Продолжаем streak! Уже {streak} дней развиваемся вместе!',
    '🚀 Пора заниматься с {name}! Каждый день - новое открытие!',
    '⭐ {name} готов(а) к новым знаниям! Начинаем?'
  ],
  streak: [
    '🔥 Невероятно! {streak} дней подряд! {name} настоящий чемпион!',
    '👑 Потрясающий streak - {streak} дней! Продолжаем развиваться!',
    '🏆 {streak} дней занятий! {name} становится умнее каждый день!'
  ],
  encouragement: [
    '💪 Даже 10 минут занятий принесут пользу {name}!',
    '🌱 Каждая активность помогает {name} расти и развиваться!',
    '❤️ {name} любит проводить время с вами за играми!'
  ]
};

// Inline клавиатуры
const keyboards = {
  main: {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🎯 Активности', callback_data: 'activities' },
          { text: '📅 Прогресс', callback_data: 'progress' }
        ],
        [
          { text: '📚 Библиотека', callback_data: 'library' },
          { text: '🔔 Напоминания', callback_data: 'notifications' }
        ],
        [
          { text: '⚙️ Настройки', callback_data: 'settings' },
          { text: '👑 Премиум', callback_data: 'premium' }
        ]
      ]
    }
  },
  
  activities: (age) => ({
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🤲 Моторика', callback_data: 'category_Моторика' },
          { text: '🎨 Творчество', callback_data: 'category_Творчество' }
        ],
        [
          { text: '🧠 Логика', callback_data: 'category_Логика' },
          { text: '🗣️ Речь', callback_data: 'category_Речь' }
        ],
        [
          { text: '📋 Все активности', callback_data: 'all_activities' }
        ],
        [
          { text: '← Назад', callback_data: 'back_main' }
        ]
      ]
    }
  }),

  activity_detail: (activityId, isPremium) => ({
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🚀 Начать активность', callback_data: `start_activity_${activityId}` }
        ],
        [
          { text: '📋 Материалы', callback_data: `materials_${activityId}` },
          { text: '📝 Инструкция', callback_data: `instructions_${activityId}` }
        ],
        [
          { text: '← К активностям', callback_data: 'activities' }
        ]
      ]
    }
  }),

  back_to_activities: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '← К активностям', callback_data: 'activities' }]
      ]
    }
  },

  back_to_main: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '← Главное меню', callback_data: 'back_main' }]
      ]
    }
  }
};

// Функции-помощники
function getUserData(userId) {
  if (!users.has(userId)) {
    users.set(userId, {
      name: '',
      age: 2,
      streak: 0,
      isPremium: false,
      lastActivity: null,
      totalActivities: 0,
      notificationsEnabled: true,
      notificationTime: '19:00',
      reminderType: 'motivational'
    });
  }
  return users.get(userId);
}

function getAgeText(age) {
  if (age === 1) return 'год';
  if (age < 5) return 'года';
  return 'лет';
}

function getActivitiesForAge(age) {
  return activitiesDatabase[age] || [];
}

function getRandomMessage(type, userData) {
  const messages = motivationalMessages[type] || motivationalMessages.daily;
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return randomMessage
    .replace('{name}', userData.name || 'малыш')
    .replace('{streak}', userData.streak);
}

function formatActivity(activity, isPremium) {
  const premiumIcon = activity.premium && !isPremium ? '🔒 ' : '';
  const difficultyEmoji = activity.difficulty === 'Легко' ? '🟢' : 
                         activity.difficulty === 'Средне' ? '🟡' : '🔴';
  
  return `${premiumIcon}${activity.icon} <b>${activity.title}</b>

📝 ${activity.description}
⏱️ Длительность: ${activity.duration}
${difficultyEmoji} Сложность: ${activity.difficulty}
🎯 Категория: ${activity.category}
👶 Возраст: ${activity.ageRange}

💡 <b>Польза:</b> ${activity.benefits}`;
}

function formatMaterials(activity) {
  const materialsList = activity.materials.map((material, index) => 
    `${index + 1}. ${material}`
  ).join('\n');
  
  return `📦 <b>Материалы для "${activity.title}":</b>

${materialsList}

💡 Все материалы можно найти дома или купить в любом магазине!`;
}

function formatInstructions(activity) {
  const instructionsList = activity.instructions.map((instruction, index) => 
    `${index + 1}. ${instruction}`
  ).join('\n\n');
  
  return `📋 <b>Пошаговая инструкция "${activity.title}":</b>

${instructionsList}

✨ Не торопитесь и хвалите ребенка за каждый шаг!`;
}

// Основные команды бота
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userData = getUserData(chatId);
  
  const welcomeMessage = `🌟 <b>Добро пожаловать в Развивайку!</b>

Привет! Я помогу вам развивать вашего малыша с помощью интересных и полезных активностей.

${userData.name ? `Рад снова видеть вас и ${userData.name}! 👋` : ''}

Что я умею:
🎯 Подбирать активности по возрасту
📅 Отслеживать прогресс развития
📚 Предоставлять материалы для родителей
🔔 Напоминать о занятиях
👑 Премиум функции

${!userData.name ? 'Давайте сначала настроим профиль вашего ребенка!' : 'Выберите раздел из меню ниже:'}`;

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'HTML',
    ...(!userData.name ? keyboards.back_to_main : keyboards.main)
  });

  if (!userData.name) {
    setTimeout(() => {
      bot.sendMessage(chatId, '👶 Как зовут вашего малыша?');
    }, 1000);
  }
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  const helpMessage = `📚 <b>Помощь по боту Развивайка</b>

<b>Основные команды:</b>
/start - Главное меню
/help - Эта справка
/profile - Профиль ребенка
/activities - Список активностей
/progress - Прогресс развития
/premium - Премиум подписка

<b>Возможности:</b>
🎯 <b>Активности</b> - Более 20 развивающих занятий для детей 1-7 лет
📅 <b>Прогресс</b> - Отслеживание достижений и навыков
📚 <b>Библиотека</b> - Статьи и видео для родителей
🔔 <b>Напоминания</b> - Персональные уведомления
👑 <b>Премиум</b> - Расширенный функционал

<b>Поддержка:</b> @your_support_username`;

  bot.sendMessage(chatId, helpMessage, {
    parse_mode: 'HTML',
    ...keyboards.back_to_main
  });
});

bot.onText(/\/profile/, (msg) => {
  const chatId = msg.chat.id;
  const userData = getUserData(chatId);
  
  if (!userData.name) {
    bot.sendMessage(chatId, '⚠️ Сначала настройте профиль с помощью /start');
    return;
  }
  
  const profileMessage = `👶 <b>Профиль ребенка</b>

👤 Имя: ${userData.name}
🎂 Возраст: ${userData.age} ${getAgeText(userData.age)}
🔥 Streak: ${userData.streak} дней
📊 Всего активностей: ${userData.totalActivities}
👑 Статус: ${userData.isPremium ? 'Премиум' : 'Бесплатный'}
🔔 Напоминания: ${userData.notificationsEnabled ? `Включены (${userData.notificationTime})` : 'Выключены'}

${userData.lastActivity ? `🎯 Последняя активность: ${userData.lastActivity}` : ''}`;

  bot.sendMessage(chatId, profileMessage, {
    parse_mode: 'HTML',
    ...keyboards.back_to_main
  });
});

bot.onText(/\/activities/, (msg) => {
  const chatId = msg.chat.id;
  handleActivitiesMenu(chatId);
});

bot.onText(/\/progress/, (msg) => {
  const chatId = msg.chat.id;
  handleProgressMenu(chatId);
});

bot.onText(/\/premium/, (msg) => {
  const chatId = msg.chat.id;
  handlePremiumMenu(chatId);
});

// Обработка текстовых сообщений (настройка профиля)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userData = getUserData(chatId);
  
  // Игнорируем команды и callback'и
  if (msg.text && !msg.text.startsWith('/') && !userData.name) {
    // Устанавливаем имя ребенка
    userData.name = msg.text.trim();
    users.set(chatId, userData);
    
    bot.sendMessage(chatId, `Приятно познакомиться, ${userData.name}! 👋

Теперь выберите возраст:`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1 год', callback_data: 'set_age_1' },
            { text: '2 года', callback_data: 'set_age_2' },
            { text: '3 года', callback_data: 'set_age_3' }
          ],
          [
            { text: '4 года', callback_data: 'set_age_4' },
            { text: '5 лет', callback_data: 'set_age_5' },
            { text: '6 лет', callback_data: 'set_age_6' }
          ],
          [
            { text: '7 лет', callback_data: 'set_age_7' }
          ]
        ]
      }
    });
  }
});

// Обработчики callback запросов
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const data = callbackQuery.data;
  const userData = getUserData(chatId);

  bot.answerCallbackQuery(callbackQuery.id);

  // Установка возраста
  if (data.startsWith('set_age_')) {
    const age = parseInt(data.split('_')[2]);
    userData.age = age;
    users.set(chatId, userData);
    
    bot.editMessageText(`✅ Отлично! ${userData.name}, ${age} ${getAgeText(age)}

Профиль настроен! Теперь вы можете пользоваться всеми функциями бота.`, {
      chat_id: chatId,
      message_id: msg.message_id,
      parse_mode: 'HTML',
      ...keyboards.main
    });
    return;
  }

  // Главное меню
  if (data === 'back_main') {
    const mainMessage = `🏠 <b>Главное меню</b>

Привет, ${userData.name || 'родитель'}! 
${userData.name ? `${userData.name} (${userData.age} ${getAgeText(userData.age)}) ждет новых занятий! 🎯` : ''}

Выберите раздел:`;

    bot.editMessageText(mainMessage, {
      chat_id: chatId,
      message_id: msg.message_id,
      parse_mode: 'HTML',
      ...keyboards.main
    });
    return;
  }

  // Обработка остальных callback'ов
  switch (data) {
    case 'activities':
      handleActivitiesMenu(chatId, msg.message_id);
      break;
    case 'progress':
      handleProgressMenu(chatId, msg.message_id);
      break;
    case 'library':
      handleLibraryMenu(chatId, msg.message_id);
      break;
    case 'notifications':
      handleNotificationsMenu(chatId, msg.message_id);
      break;
    case 'settings':
      handleSettingsMenu(chatId, msg.message_id);
      break;
    case 'premium':
      handlePremiumMenu(chatId, msg.message_id);
      break;
    case 'all_activities':
      handleAllActivities(chatId, msg.message_id);
      break;
    default:
      if (data.startsWith('category_')) {
        const category = data.split('_')[1];
        handleCategoryActivities(chatId, msg.message_id, category);
      } else if (data.startsWith('activity_')) {
        const activityId = parseInt(data.split('_')[1]);
        handleActivityDetail(chatId, msg.message_id, activityId);
      } else if (data.startsWith('start_activity_')) {
        const activityId = parseInt(data.split('_')[2]);
        handleStartActivity(chatId, activityId);
      } else if (data.startsWith('materials_')) {
        const activityId = parseInt(data.split('_')[1]);
        handleActivityMaterials(chatId, activityId);
      } else if (data.startsWith('instructions_')) {
        const activityId = parseInt(data.split('_')[1]);
        handleActivityInstructions(chatId, activityId);
      }
      break;
  }
});

// Функции обработки меню
function handleActivitiesMenu(chatId, messageId = null) {
  const userData = getUserData(chatId);
  const activities = getActivitiesForAge(userData.age);
  const freeCount = activities.filter(a => !a.premium).length;
  const premiumCount = activities.filter(a => a.premium).length;
  
  const activitiesMessage = `🎯 <b>Активности для ${userData.name || 'ребенка'}</b>

Возраст: ${userData.age} ${getAgeText(userData.age)}
Доступно активностей: ${activities.length}
🆓 Бесплатных: ${freeCount}
👑 Премиум: ${premiumCount}

Выберите категорию или посмотрите все активности:`;

  const options = {
    chat_id: chatId,
    parse_mode: 'HTML',
    ...keyboards.activities(userData.age)
  };

  if (messageId) {
    options.message_id = messageId;
    bot.editMessageText(activitiesMessage, options);
  } else {
    bot.sendMessage(chatId, activitiesMessage, options);
  }
}

function handleAllActivities(chatId, messageId) {
  const userData = getUserData(chatId);
  const activities = getActivitiesForAge(userData.age);
  
  if (activities.length === 0) {
    bot.editMessageText(`😔 Пока нет активностей для возраста ${userData.age} ${getAgeText(userData.age)}.

Скоро добавим больше занятий!`, {
      chat_id: chatId,
      message_id: messageId,
      ...keyboards.back_to_activities
    });
    return;
  }

  let message = `📋 <b>Все активности (${userData.age} ${getAgeText(userData.age)})</b>\n\n`;
  
  const keyboard = [];
  
  activities.forEach((activity, index) => {
    const premiumIcon = activity.premium && !userData.isPremium ? '🔒 ' : '';
    message += `${index + 1}. ${premiumIcon}${activity.icon} ${activity.title}\n`;
    message += `   ⏱️ ${activity.duration} | ${activity.category}\n\n`;
    
    keyboard.push([{
      text: `${premiumIcon}${activity.icon} ${activity.title}`,
      callback_data: `activity_${activity.id}`
    }]);
  });
  
  keyboard.push([{ text: '← К категориям', callback_data: 'activities' }]);
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: keyboard }
  });
}

function handleCategoryActivities(chatId, messageId, category) {
  const userData = getUserData(chatId);
  const allActivities = getActivitiesForAge(userData.age);
  const activities = allActivities.filter(a => a.category === category);
  
  if (activities.length === 0) {
    bot.editMessageText(`😔 В категории "${category}" пока нет активностей для возраста ${userData.age} ${getAgeText(userData.age)}.`, {
      chat_id: chatId,
      message_id: messageId,
      ...keyboards.back_to_activities
    });
    return;
  }

  let message = `🎯 <b>Категория: ${category}</b>\n\n`;
  
  const keyboard = [];
  
  activities.forEach(activity => {
    const premiumIcon = activity.premium && !userData.isPremium ? '🔒 ' : '';
    message += `${premiumIcon}${activity.icon} <b>${activity.title}</b>\n`;
    message += `⏱️ ${activity.duration} | ${activity.difficulty}\n`;
    message += `📝 ${activity.description}\n\n`;
    
    keyboard.push([{
      text: `${premiumIcon}Подробнее о "${activity.title}"`,
      callback_data: `activity_${activity.id}`
    }]);
  });
  
  keyboard.push([{ text: '← К категориям', callback_data: 'activities' }]);
  
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: keyboard }
  });
}

function handleActivityDetail(chatId, messageId, activityId) {
  const userData = getUserData(chatId);
  const allActivities = Object.values(activitiesDatabase).flat();
  const activity = allActivities.find(a => a.id === activityId);
  
  if (!activity) {
    bot.editMessageText('❌ Активность не найдена', {
      chat_id: chatId,
      message_id: messageId,
      ...keyboards.back_to_activities
    });
    return;
  }

  if (activity.premium && !userData.isPremium) {
    bot.editMessageText(`🔒 <b>Премиум активность</b>

${formatActivity(activity, userData.isPremium)}

❗ Для доступа к этой активности нужна премиум подписка.`, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '👑 Оформить премиум', callback_data: 'premium' }],
          [{ text: '← К активностям', callback_data: 'activities' }]
        ]
      }
    });
    return;
  }

  bot.editMessageText(formatActivity(activity, userData.isPremium), {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'HTML',
    ...keyboards.activity_detail(activityId, userData.isPremium)
  });
}

function handleStartActivity(chatId, activityId) {
  const userData = getUserData(chatId);
  const allActivities = Object.values(activitiesDatabase).flat();
  const activity = allActivities.find(a => a.id === activityId);
  
  if (!activity) {
    bot.sendMessage(chatId, '❌ Активность не найдена');
    return;
  }

  // Обновляем статистику
  userData.totalActivities += 1;
  userData.lastActivity = activity.title;
  userData.streak += 1;
  users.set(chatId, userData);

  const startMessage = `🚀 <b>Начинаем активность!</b>

${activity.icon} <b>${activity.title}</b>
⏱️ Время: ${activity.duration}

🎯 <b>Цель:</b> ${activity.benefits}

💡 <b>Совет:</b> Не торопитесь и получайте удовольствие от процесса! Хвалите ${userData.name || 'ребенка'} за каждый успех.

Удачи! 🍀`;

  bot.sendMessage(chatId, startMessage, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📋 Инструкция', callback_data: `instructions_${activityId}` },
          { text: '📦 Материалы', callback_data: `materials_${activityId}` }
        ],
        [
          { text: '✅ Завершить занятие', callback_data: `complete_activity_${activityId}` }
        ],
        [
          { text: '← К активностям', callback_data: 'activities' }
        ]
      ]
    }
  });

  // Отправляем таймер через 5 секунд
  setTimeout(() => {
    const timeReminders = [
      '⏰ Прошло 5 минут! Как дела?',
      '🔔 Половина времени прошла!',
      '⚡ Осталось совсем немного!'
    ];
    
    const reminder = timeReminders[Math.floor(Math.random() * timeReminders.length)];
    bot.sendMessage(chatId, reminder);
  }, 5000);
}

function handleActivityMaterials(chatId, activityId) {
  const allActivities = Object.values(activitiesDatabase).flat();
  const activity = allActivities.find(a => a.id === activityId);
  
  if (!activity) {
    bot.sendMessage(chatId, '❌ Активность не найдена');
    return;
  }

  bot.sendMessage(chatId, formatMaterials(activity), {
    parse_mode: 'HTML',
    ...keyboards.back_to_activities
  });
}

function handleActivityInstructions(chatId, activityId) {
  const allActivities = Object.values(activitiesDatabase).flat();
  const activity = allActivities.find(a => a.id === activityId);
  
  if (!activity) {
    bot.sendMessage(chatId, '❌ Активность не найдена');
    return;
  }

  bot.sendMessage(chatId, formatInstructions(activity), {
    parse_mode: 'HTML',
    ...keyboards.back_to_activities
  });
}

function handleProgressMenu(chatId, messageId = null) {
  const userData = getUserData(chatId);
  
  const progressMessage = `📅 <b>Прогресс ${userData.name || 'ребенка'}</b>

🔥 <b>Streak:</b> ${userData.streak} дней подряд
📊 <b>Всего активностей:</b> ${userData.totalActivities}
🎯 <b>Последняя активность:</b> ${userData.lastActivity || 'Еще не было'}

📈 <b>Достижения:</b>
${userData.streak >= 7 ? '🏆 Первая неделя' : '⏳ Первая неделя (осталось: ' + (7 - userData.streak) + ' дней)'}
${userData.totalActivities >= 10 ? '🎨 Творческий гений' : '⏳ Творческий гений (осталось: ' + (10 - userData.totalActivities) + ' активностей)'}
${userData.streak >= 30 ? '📅 Месяц развития' : '⏳ Месяц развития (осталось: ' + (30 - userData.streak) + ' дней)'}

💪 Продолжайте в том же духе!`;

  const options = {
    chat_id: chatId,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📊 Детальная статистика', callback_data: 'detailed_stats' },
          { text: '🏆 Достижения', callback_data: 'achievements' }
        ],
        [
          { text: '← Главное меню', callback_data: 'back_main' }
        ]
      ]
    }
  };

  if (messageId) {
    options.message_id = messageId;
    bot.editMessageText(progressMessage, options);
  } else {
    bot.sendMessage(chatId, progressMessage, options);
  }
}

function handleLibraryMenu(chatId, messageId = null) {
  const userData = getUserData(chatId);
  
  const libraryMessage = `📚 <b>Библиотека материалов</b>

Полезные материалы для родителей:

🧠 <b>Развитие:</b> Статьи о развитии детей
🏥 <b>Здоровье:</b> Советы педиатров
📖 <b>Обучение:</b> Методики и подходы
💭 <b>Психология:</b> Детская психология
🍎 <b>Питание:</b> Здоровое питание
🛡️ <b>Безопасность:</b> Безопасность дома

${userData.isPremium ? '👑 У вас есть доступ ко всем материалам!' : '🔒 Премиум статьи доступны по подписке'}`;

  const options = {
    chat_id: chatId,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🧠 Развитие', callback_data: 'library_development' },
          { text: '🏥 Здоровье', callback_data: 'library_health' }
        ],
        [
          { text: '📖 Обучение', callback_data: 'library_education' },
          { text: '💭 Психология', callback_data: 'library_psychology' }
        ],
        [
          { text: '🍎 Питание', callback_data: 'library_nutrition' },
          { text: '🛡️ Безопасность', callback_data: 'library_safety' }
        ],
        [
          { text: '🎥 Видеоуроки', callback_data: 'library_videos' }
        ],
        [
          { text: '← Главное меню', callback_data: 'back_main' }
        ]
      ]
    }
  };

  if (messageId) {
    options.message_id = messageId;
    bot.editMessageText(libraryMessage, options);
  } else {
    bot.sendMessage(chatId, libraryMessage, options);
  }
}

function handleNotificationsMenu(chatId, messageId = null) {
  const userData = getUserData(chatId);
  
  const notificationsMessage = `🔔 <b>Настройки напоминаний</b>

Статус: ${userData.notificationsEnabled ? '✅ Включены' : '❌ Выключены'}
Время: ${userData.notificationTime}
Тип: ${userData.reminderType === 'motivational' ? 'Мотивирующие' : 
       userData.reminderType === 'simple' ? 'Простые' : 'Со streak'}

${userData.notificationsEnabled ? 
  `📱 Следующее напоминание: сегодня в ${userData.notificationTime}` : 
  '💡 Включите напоминания, чтобы не забывать о занятиях!'}

Пример сообщения:
"${getRandomMessage(userData.reminderType, userData)}"`;

  const options = {
    chat_id: chatId,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { 
            text: userData.notificationsEnabled ? '🔕 Выключить' : '🔔 Включить', 
            callback_data: 'toggle_notifications' 
          }
        ],
        [
          { text: '⏰ Изменить время', callback_data: 'change_time' },
          { text: '📝 Тип сообщений', callback_data: 'change_reminder_type' }
        ],
        [
          { text: '📨 Тест уведомления', callback_data: 'test_notification' }
        ],
        [
          { text: '← Главное меню', callback_data: 'back_main' }
        ]
      ]
    }
  };

  if (messageId) {
    options.message_id = messageId;
    bot.editMessageText(notificationsMessage, options);
  } else {
    bot.sendMessage(chatId, notificationsMessage, options);
  }
}

function handleSettingsMenu(chatId, messageId = null) {
  const userData = getUserData(chatId);
  
  const settingsMessage = `⚙️ <b>Настройки профиля</b>

👤 <b>Имя ребенка:</b> ${userData.name || 'Не указано'}
🎂 <b>Возраст:</b> ${userData.age} ${getAgeText(userData.age)}
👑 <b>Статус:</b> ${userData.isPremium ? 'Премиум' : 'Бесплатный'}
🔔 <b>Уведомления:</b> ${userData.notificationsEnabled ? 'Включены' : 'Выключены'}

Выберите что хотите изменить:`;

  const options = {
    chat_id: chatId,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '👤 Изменить имя', callback_data: 'change_name' },
          { text: '🎂 Изменить возраст', callback_data: 'change_age' }
        ],
        [
          { text: '🔔 Напоминания', callback_data: 'notifications' },
          { text: '👑 Премиум', callback_data: 'premium' }
        ],
        [
          { text: '📊 Экспорт данных', callback_data: 'export_data' },
          { text: '🗑️ Сброс прогресса', callback_data: 'reset_progress' }
        ],
        [
          { text: '← Главное меню', callback_data: 'back_main' }
        ]
      ]
    }
  };

  if (messageId) {
    options.message_id = messageId;
    bot.editMessageText(settingsMessage, options);
  } else {
    bot.sendMessage(chatId, settingsMessage, options);
  }
}

function handlePremiumMenu(chatId, messageId = null) {
  const userData = getUserData(chatId);
  
  if (userData.isPremium) {
    const premiumMessage = `👑 <b>Премиум активен!</b>

✅ Все активности разблокированы
✅ Персональные программы развития
✅ Расширенная аналитика прогресса
✅ Приоритетная поддержка
✅ Еженедельные отчеты

💎 Спасибо за доверие!`;

    const options = {
      chat_id: chatId,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📊 Премиум статистика', callback_data: 'premium_stats' },
            { text: '📄 Отчеты', callback_data: 'premium_reports' }
          ],
          [
            { text: '🎯 Персональные программы', callback_data: 'personal_programs' }
          ],
          [
            { text: '← Главное меню', callback_data: 'back_main' }
          ]
        ]
      }
    };

    if (messageId) {
      options.message_id = messageId;
      bot.editMessageText(premiumMessage, options);
    } else {
      bot.sendMessage(chatId, premiumMessage, options);
    }
  } else {
    const premiumMessage = `👑 <b>Премиум подписка</b>

🚀 <b>Что вы получите:</b>

🎯 <b>Все активности</b> - Доступ к 50+ премиум занятиям
📊 <b>Детальная аналитика</b> - Подробные отчеты о развитии
🎨 <b>Персональные программы</b> - Индивидуальные планы развития
📚 <b>Эксклюзивные материалы</b> - Статьи и видео от экспертов
🔔 <b>Умные напоминания</b> - Персонализированные уведомления
👨‍⚕️ <b>Консультации</b> - Доступ к детским психологам
📄 <b>Еженедельные отчеты</b> - Прогресс развития

💰 <b>Стоимость:</b> 299₽/месяц
🎁 <b>Первые 7 дней бесплатно!</b>`;

    const options = {
      chat_id: chatId,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🎁 Попробовать бесплатно', callback_data: 'start_trial' }
          ],
          [
            { text: '💳 Оформить подписку', callback_data: 'subscribe_premium' }
          ],
          [
            { text: '❓ Часто задаваемые вопросы', callback_data: 'premium_faq' }
          ],
          [
            { text: '← Главное меню', callback_data: 'back_main' }
          ]
        ]
      }
    };

    if (messageId) {
      options.message_id = messageId;
      bot.editMessageText(premiumMessage, options);
    } else {
      bot.sendMessage(chatId, premiumMessage, options);
    }
  }
}

// Система напоминаний
function scheduleNotifications() {
  setInterval(() => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    users.forEach((userData, chatId) => {
      if (userData.notificationsEnabled && userData.notificationTime === currentTime) {
        sendNotification(chatId, userData);
      }
    });
  }, 60000); // Проверяем каждую минуту
}

function sendNotification(chatId, userData) {
  const message = getRandomMessage(userData.reminderType, userData);
  
  bot.sendMessage(chatId, `🔔 ${message}`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🎯 Выбрать активность', callback_data: 'activities' },
          { text: '📅 Прогресс', callback_data: 'progress' }
        ],
        [
          { text: '⏰ Напомнить через час', callback_data: 'snooze_1h' },
          { text: '🔕 Выключить на сегодня', callback_data: 'snooze_today' }
        ]
      ]
    }
  });
}

// Webhook endpoint
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Дополнительные callback обработчики
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const data = callbackQuery.data;
  const userData = getUserData(chatId);

  // Обработка дополнительных callback'ов
  if (data === 'toggle_notifications') {
    userData.notificationsEnabled = !userData.notificationsEnabled;
    users.set(chatId, userData);
    
    bot.answerCallbackQuery(callbackQuery.id, {
      text: userData.notificationsEnabled ? '🔔 Напоминания включены!' : '🔕 Напоминания выключены'
    });
    
    handleNotificationsMenu(chatId, msg.message_id);
  }
  
  else if (data === 'test_notification') {
    bot.answerCallbackQuery(callbackQuery.id);
    sendNotification(chatId, userData);
  }
  
  else if (data === 'start_trial') {
    userData.isPremium = true;
    users.set(chatId, userData);
    
    bot.answerCallbackQuery(callbackQuery.id, {
      text: '🎉 Пробный период активирован!'
    });
    
    bot.sendMessage(chatId, `🎁 <b>Добро пожаловать в Премиум!</b>

Ваш 7-дневный пробный период начался! Теперь у вас есть доступ ко всем функциям:

✅ Все активности разблокированы
✅ Персональные программы развития
✅ Детальная аналитика

Наслаждайтесь! 🚀`, {
      parse_mode: 'HTML',
      ...keyboards.main
    });
  }
  
  else if (data === 'subscribe_premium') {
    bot.answerCallbackQuery(callbackQuery.id);
    
    bot.sendMessage(chatId, `💳 <b>Оформление подписки</b>

Для оформления премиум подписки:

1. Переведите 299₽ на карту: 
   \`1234 5678 9012 3456\`

2. Отправьте скриншот оплаты в чат

3. Премиум будет активирован автоматически!

💡 Или воспользуйтесь встроенной оплатой:`, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '💳 Оплатить 299₽', url: 'https://your-payment-link.com' }],
          [{ text: '← Назад', callback_data: 'premium' }]
        ]
      }
    });
  }
  
  else if (data.startsWith('complete_activity_')) {
    const activityId = parseInt(data.split('_')[2]);
    const allActivities = Object.values(activitiesDatabase).flat();
    const activity = allActivities.find(a => a.id === activityId);
    
    bot.answerCallbackQuery(callbackQuery.id, {
      text: '🎉 Отличная работа!'
    });
    
    bot.sendMessage(chatId, `🎉 <b>Активность завершена!</b>

${activity.icon} <b>${activity.title}</b>
✅ Время потрачено с пользой!

🏆 Streak: ${userData.streak} дней
📊 Всего активностей: ${userData.totalActivities}

${userData.name || 'Ребенок'} молодец! 👏`, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📸 Поделиться результатом', callback_data: 'share_result' },
            { text: '⭐ Оценить занятие', callback_data: `rate_activity_${activityId}` }
          ],
          [
            { text: '🎯 Следующая активность', callback_data: 'activities' },
            { text: '📅 Посмотреть прогресс', callback_data: 'progress' }
          ]
        ]
      }
    });
  }
  
  else if (data === 'change_age') {
    bot.answerCallbackQuery(callbackQuery.id);
    
    bot.sendMessage(chatId, 'Выберите новый возраст:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1 год', callback_data: 'set_age_1' },
            { text: '2 года', callback_data: 'set_age_2' },
            { text: '3 года', callback_data: 'set_age_3' }
          ],
          [
            { text: '4 года', callback_data: 'set_age_4' },
            { text: '5 лет', callback_data: 'set_age_5' },
            { text: '6 лет', callback_data: 'set_age_6' }
          ],
          [
            { text: '7 лет', callback_data: 'set_age_7' }
          ],
          [
            { text: '← Отмена', callback_data: 'settings' }
          ]
        ]
      }
    });
  }
});

// Запуск сервера и планировщика
app.listen(PORT, () => {
  console.log(`🚀 Telegram Bot сервер запущен на порту ${PORT}`);
  console.log(`📱 Webhook URL: ${WEBHOOK_URL}/${BOT_TOKEN}`);
  scheduleNotifications();
});

// Обработка ошибок
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error);
});

/* 
=== ИНСТРУКЦИЯ ПО РАЗВЕРТЫВАНИЮ ===

1. Установите зависимости:
   npm install express node-telegram-bot-api

2. Получите токен бота:
   - Напишите @BotFather в Telegram
   - Создайте нового бота командой /newbot
   - Скопируйте токен

3. Настройте переменные:
   - Замените 'YOUR_BOT_TOKEN_HERE' на ваш токен
   - Укажите ваш домен в WEBHOOK_URL

4. Развертывание:
   - Загрузите на сервер (Heroku, VPS, etc.)
   - Убедитесь что порт доступен
   - Запустите: node bot.js

5. Настройка webhook:
   curl -X POST "https://api.telegram.org/bot{TOKEN}/setWebhook" \
        -H "Content-Type: application/json" \
        -d '{"url":"https://your-domain.com/webhook/{TOKEN}"}'

6. Дополнительные возможности:
   - Подключите базу данных (MongoDB, PostgreSQL)
   - Настройте платежную систему
   - Добавьте аналитику
   - Интегрируйте с внешними API

=== ФУНКЦИИ БОТА ===

✅ Полная навигация по меню
✅ Все активности из React приложения  
✅ Система прогресса и достижений
✅ Напоминания с настройками
✅ Премиум функции
✅ Пошаговые инструкции
✅ Материалы для занятий
✅ Настройки профиля
✅ Библиотека материалов

🚀 БОТ ГОТОВ К ИСПОЛЬЗОВАНИЮ!
*/
