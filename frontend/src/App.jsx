import React, { useState, useEffect } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [telegramUser, setTelegramUser] = useState(null);
  const [botConnected, setBotConnected] = useState(false);
  
  const [child, setChild] = useState({
    name: 'Андрей',
    age: 2,
    streak: 7
  });

  // Настройки уведомлений
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    time: '19:00',
    frequency: 'daily',
    reminderType: 'motivational',
    botUsername: 'razvivaykaBot',
    quietHours: {
      enabled: true,
      start: '21:00',
      end: '08:00'
    },
    weekendMode: false,
    customDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    }
  });

  // Данные прогресса
  const [progressData] = useState({
    weeklyActivities: [true, true, false, true, true, false, false],
    totalActivities: 45,
    totalTime: 12.5,
    skillsProgress: {
      motor: 85,
      speech: 70,
      logic: 60,
      creativity: 90,
      development: 75
    },
    achievements: [
      { id: 1, title: 'Первая неделя', description: '7 дней подряд', icon: '🎯', unlocked: true },
      { id: 2, title: 'Творческий гений', description: '10 творческих активностей', icon: '🎨', unlocked: true },
      { id: 3, title: 'Исследователь', description: '15 логических игр', icon: '🔍', unlocked: false, progress: 12 },
      { id: 4, title: 'Месяц развития', description: '30 дней занятий', icon: '📅', unlocked: false, progress: 15 }
    ],
    recentActivities: [
      { name: 'Сортировка по цветам', category: 'Логика', date: '2025-01-13', duration: 20 },
      { name: 'Рисование пальчиками', category: 'Творчество', date: '2025-01-13', duration: 25 },
      { name: 'Простые пазлы', category: 'Логика', date: '2025-01-12', duration: 15 }
    ]
  });

  // База материалов библиотеки
  const [libraryContent] = useState({
    categories: [
      { id: 'development', name: 'Развитие', icon: '🧠', count: 23 },
      { id: 'health', name: 'Здоровье', icon: '🏥', count: 18 },
      { id: 'education', name: 'Обучение', icon: '📖', count: 31 },
      { id: 'psychology', name: 'Психология', icon: '💭', count: 15 },
      { id: 'nutrition', name: 'Питание', icon: '🍎', count: 12 },
      { id: 'safety', name: 'Безопасность', icon: '🛡️', count: 9 }
    ],
    articles: [
      {
        id: 1,
        title: 'Как развивать речь у ребенка 2-3 лет',
        description: 'Практические советы для развития речевых навыков в раннем возрасте',
        readTime: '5 мин',
        category: 'development',
        premium: false,
        author: 'Логопед Анна Петрова',
        rating: 4.8,
        views: 1247
      },
      {
        id: 2,
        title: 'Лучшие игры для развития мелкой моторики',
        description: 'Простые упражнения и игры для укрепления мышц рук и пальцев',
        readTime: '7 мин',
        category: 'development',
        premium: false,
        author: 'Педиатр Мария Иванова',
        rating: 4.9,
        views: 987
      },
      {
        id: 3,
        title: 'Подготовка к школе: чек-лист для родителей',
        description: 'Что должен уметь ребенок перед поступлением в первый класс',
        readTime: '10 мин',
        category: 'education',
        premium: true,
        author: 'Педагог Ольга Волкова',
        rating: 4.9,
        views: 1543
      },
      {
        id: 4,
        title: 'Детские страхи: как помочь ребенку',
        description: 'Работаем с типичными страхами детей разного возраста',
        readTime: '6 мин',
        category: 'psychology',
        premium: true,
        author: 'Психолог Дмитрий Козлов',
        rating: 4.6,
        views: 445
      },
      {
        id: 5,
        title: 'Здоровое питание для дошкольников',
        description: 'Составляем сбалансированное меню для детей 3-6 лет',
        readTime: '8 мин',
        category: 'nutrition',
        premium: true,
        author: 'Диетолог Елена Сидорова',
        rating: 4.7,
        views: 756
      }
    ],
    videos: [
      {
        id: 1,
        title: 'Массаж для малышей: укрепляем здоровье',
        duration: '15 мин',
        category: 'health',
        premium: false,
        thumbnail: '👶',
        views: 2341
      },
      {
        id: 2,
        title: 'Творческие занятия с детьми 4-6 лет',
        duration: '22 мин',
        category: 'development',
        premium: true,
        thumbnail: '🎨',
        views: 1567
      }
    ]
  });

  // РАСШИРЕННАЯ база активностей
  const [activitiesDatabase] = useState({
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
      },
      {
        id: 6,
        title: 'Лепка из пластилина',
        description: 'Развиваем креативность и мелкую моторику',
        duration: '30 мин',
        category: 'Творчество',
        premium: true,
        icon: '🎭',
        difficulty: 'Средне',
        materials: ['Мягкий пластилин', 'Доска для лепки', 'Простые формочки'],
        instructions: [
          'Разогрейте пластилин в руках',
          'Покажите основные приемы: катание, сплющивание',
          'Лепите простые фигуры: шарики, колбаски',
          'Используйте формочки для создания фигур',
          'Создавайте простых животных',
          'Не стремитесь к идеальному результату'
        ],
        benefits: 'Развивает мелкую моторику, творческие способности, пространственное мышление, усидчивость',
        ageRange: '24-36 месяцев'
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
      },
      {
        id: 8,
        title: 'Простые пазлы',
        description: 'Пазлы из 4-6 элементов, развиваем логику',
        duration: '25 мин',
        category: 'Логика',
        premium: false,
        icon: '🧩',
        difficulty: 'Средне',
        materials: ['Пазлы из 4-6 крупных элементов', 'Картинки для образца'],
        instructions: [
          'Выберите пазл с крупными деталями',
          'Покажите готовую картинку',
          'Разберите пазл на части',
          'Помогите найти угловые детали',
          'Собирайте постепенно, хваля за успехи',
          'Постепенно увеличивайте количество деталей'
        ],
        benefits: 'Развивает логическое мышление, пространственное восприятие, терпение, мелкую моторику',
        ageRange: '2,5-4 года'
      },
      {
        id: 9,
        title: 'Ролевые игры',
        description: 'Играем в доктора, повара, водителя',
        duration: '30 мин',
        category: 'Развитие',
        premium: true,
        icon: '👨‍⚕️',
        difficulty: 'Средне',
        materials: ['Игрушечные инструменты', 'Костюмы или атрибуты', 'Куклы/игрушки'],
        instructions: [
          'Выберите роль для игры (доктор, повар, и т.д.)',
          'Подготовьте необходимые атрибуты',
          'Покажите, как играть эту роль',
          'Пусть ребенок попробует сам',
          'Меняйтесь ролями',
          'Придумывайте разные сценарии'
        ],
        benefits: 'Развивает социальные навыки, воображение, речь, эмпатию, понимание профессий',
        ageRange: '2,5-5 лет'
      }
    ]
  });

  // База мотивирующих сообщений
  const [motivationalMessages] = useState({
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
  });

  // История уведомлений
  const [notificationHistory] = useState([
    {
      id: 1,
      message: 'Время для развития с Андрей! Сегодня изучаем что-то новое?',
      timestamp: '2025-01-14 19:00',
      type: 'daily',
      opened: true
    },
    {
      id: 2,
      message: 'Невероятно! 7 дней подряд! Андрей настоящий чемпион!',
      timestamp: '2025-01-13 19:00',
      type: 'streak',
      opened: true
    }
  ]);

  // Utility functions
  const getAgeText = (age) => {
    if (age === 1) return 'год';
    if (age < 5) return 'года';
    return 'лет';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Моторика': 'bg-blue-100 text-blue-800',
      'Речь': 'bg-green-100 text-green-800',
      'Логика': 'bg-purple-100 text-purple-800',
      'Творчество': 'bg-pink-100 text-pink-800',
      'Развитие': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Легко': 'bg-green-100 text-green-800',
      'Средне': 'bg-yellow-100 text-yellow-800',
      'Сложно': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getSkillName = (key) => {
    const names = {
      motor: 'Мелкая моторика',
      speech: 'Речь и коммуникация', 
      logic: 'Логическое мышление',
      creativity: 'Творческие способности',
      development: 'Общее развитие'
    };
    return names[key];
  };

  const getSkillColor = (key) => {
    const colors = {
      motor: 'bg-blue-500',
      speech: 'bg-green-500',
      logic: 'bg-purple-500', 
      creativity: 'bg-pink-500',
      development: 'bg-orange-500'
    };
    return colors[key];
  };

  const getFilteredArticles = () => {
    if (selectedCategory === 'all') {
      return libraryContent.articles;
    }
    return libraryContent.articles.filter(article => article.category === selectedCategory);
  };

  const getFilteredActivities = () => {
    const activities = activitiesDatabase[child.age] || [];
    if (selectedCategory === 'all') {
      return activities;
    }
    return activities.filter(activity => activity.category === selectedCategory);
  };

  const getActivityCategories = () => {
    const activities = activitiesDatabase[child.age] || [];
    const categories = [...new Set(activities.map(activity => activity.category))];
    return categories.map(cat => ({
      id: cat,
      name: cat,
      count: activities.filter(a => a.category === cat).length
    }));
  };

  const getRandomMessage = (type) => {
    const messages = motivationalMessages[type] || motivationalMessages.daily;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return randomMessage
      .replace('{name}', child.name)
      .replace('{streak}', child.streak);
  };

  // Telegram Mini App integration
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramUser(user);
        setChild(prev => ({
          ...prev,
          name: user.first_name || 'Малыш'
        }));
      }

      tg.setHeaderColor('#ffffff');
      tg.setBackgroundColor('#f8fafc');
      
      tg.onEvent('backButtonClicked', () => {
        if (currentScreen !== 'main') {
          setCurrentScreen('main');
          setSelectedActivity(null);
        }
      });

      if (currentScreen !== 'main') {
        tg.BackButton.show();
      } else {
        tg.BackButton.hide();
      }
    }
  }, [currentScreen]);

  useEffect(() => {
    if (telegramUser) {
      const timer = setTimeout(() => {
        checkNotificationStatus();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [telegramUser]);

  const checkNotificationStatus = async () => {
    if (telegramUser?.id) {
      try {
        console.log('🔍 Проверяем статус уведомлений для:', telegramUser.id);
        
        const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/status/${telegramUser.id}`);
        
        if (response.ok) {
          const status = await response.json();
          console.log('📊 Статус с сервера:', status);
          
          if (status.connected) {
            console.log('✅ Уведомления уже настроены');
            setBotConnected(true);
            setNotificationSettings(prev => ({
              ...prev,
              enabled: status.enabled,
              time: status.time || prev.time,
              reminderType: status.type || prev.reminderType
            }));
          } else {
            console.log('❌ Уведомления не настроены');
            setBotConnected(false);
          }
        } else {
          console.log('⚠️ Ошибка ответа сервера:', response.status);
          setBotConnected(false);
        }
      } catch (error) {
        console.error('❌ Ошибка проверки статуса:', error);
        setBotConnected(false);
      }
    }
  };

  const connectToBot = async () => {
    try {
      console.log('🔗 Подключение к боту, telegramUser:', telegramUser);
      
      const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUser.id,
          username: telegramUser.username || telegramUser.first_name,
          firstName: telegramUser.first_name,
          childName: child.name,
          childAge: child.age,
          notificationTime: notificationSettings.time,
          reminderType: notificationSettings.reminderType
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Подключение успешно:', result);
        setBotConnected(true);
        
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('🎉 Бот подключен! Теперь вы будете получать напоминания в Telegram');
        } else {
          alert('🎉 Бот подключен! Теперь вы будете получать напоминания в Telegram');
        }
        
        setTimeout(() => checkNotificationStatus(), 1000);
      } else {
        console.error('❌ Ошибка подключения:', response.status);
        setBotConnected(false);
      }
    } catch (error) {
      console.error('❌ Ошибка при подключении к боту:', error);
      setBotConnected(false);
    }
  };

  const sendTestNotification = async () => {
    try {
      const message = getRandomMessage(notificationSettings.reminderType);
      
      const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUser.id,
          message: message
        }),
      });

      if (response.ok) {
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('✅ Тестовое сообщение отправлено! Проверьте Telegram');
        } else {
          alert('✅ Тестовое сообщение отправлено! Проверьте Telegram');
        }
      } else {
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('❌ Ошибка отправки. Попробуйте еще раз');
        } else {
          alert('❌ Ошибка отправки. Попробуйте еще раз');
        }
      }
    } catch (error) {
      console.error('❌ Ошибка при отправке тестового сообщения:', error);
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('❌ Ошибка отправки. Проверьте подключение');
      } else {
        alert('❌ Ошибка отправки. Проверьте подключение');
      }
    }
  };

  // Send payment notification to Telegram bot
  const sendPaymentNotification = async (paymentType, amount, currency = '₽') => {
    try {
      if (telegramUser?.id) {
        const notificationMessage = `🎯 Новая попытка оплаты премиум подписки!

👤 Пользователь: ${telegramUser.first_name} ${telegramUser.last_name || ''}
🆔 ID: ${telegramUser.id}
👶 Ребенок: ${child.name} (${child.age} ${getAgeText(child.age)})

💳 Способ оплаты: ${paymentType === 'card' ? 'Банковская карта' : 'Telegram Stars'}
💰 Сумма: ${amount}${currency}
📅 Время: ${new Date().toLocaleString('ru-RU')}

✨ Подписка: Премиум на 1 месяц
🎁 Включает: Все активности, персональные программы, подробная аналитика`;

        await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/payment-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: telegramUser.id,
            message: notificationMessage,
            paymentType: paymentType,
            amount: amount,
            currency: currency,
            childInfo: {
              name: child.name,
              age: child.age
            }
          }),
        });

        console.log('✅ Payment notification sent to Telegram bot');
      }
    } catch (error) {
      console.error('❌ Error sending payment notification:', error);
      // Don't block payment flow if notification fails
    }
  };

  const createCardPayment = async () => {
    setPaymentStatus('processing');
    
    try {
      // Send notification to Telegram bot
      await sendPaymentNotification('card', 299, '₽');

      if (window.Telegram?.WebApp) {
        const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/create-invoice`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: telegramUser.id,
            amount: 299,
            description: 'Премиум подписка на 1 месяц'
          }),
        });

        const { invoiceUrl } = await response.json();
        
        window.Telegram.WebApp.openInvoice(invoiceUrl, (status) => {
          if (status === 'paid') {
            setPaymentStatus('success');
            setIsPremium(true);
            // Send success notification
            sendSuccessPaymentNotification('card', 299, '₽');
            setTimeout(() => {
              setShowPayment(false);
              setPaymentStatus('idle');
            }, 2000);
          } else if (status === 'cancelled') {
            setPaymentStatus('cancelled');
            // Send cancellation notification
            sendCancelledPaymentNotification('card', 299, '₽');
            setTimeout(() => {
              setPaymentStatus('idle');
            }, 2000);
          } else {
            setPaymentStatus('error');
            // Send error notification
            sendErrorPaymentNotification('card', 299, '₽');
          }
        });
      }
    } catch (error) {
      console.error('Ошибка при создании платежа:', error);
      setPaymentStatus('error');
      sendErrorPaymentNotification('card', 299, '₽');
    }
  };

  const createStarsPayment = async () => {
    setPaymentStatus('processing');
    
    try {
      // Send notification to Telegram bot
      await sendPaymentNotification('stars', 100, ' ⭐');

      if (window.Telegram?.WebApp) {
        const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/create-stars-invoice`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: telegramUser.id,
            amount: 100,
            description: 'Премиум подписка на 1 месяц'
          }),
        });

        const { invoiceUrl } = await response.json();
        
        window.Telegram.WebApp.openInvoice(invoiceUrl, (status) => {
          if (status === 'paid') {
            setPaymentStatus('success');
            setIsPremium(true);
            // Send success notification
            sendSuccessPaymentNotification('stars', 100, ' ⭐');
            setTimeout(() => {
              setShowPayment(false);
              setPaymentStatus('idle');
            }, 2000);
          } else if (status === 'cancelled') {
            setPaymentStatus('cancelled');
            // Send cancellation notification
            sendCancelledPaymentNotification('stars', 100, ' ⭐');
            setTimeout(() => {
              setPaymentStatus('idle');
            }, 2000);
          } else {
            setPaymentStatus('error');
            // Send error notification
            sendErrorPaymentNotification('stars', 100, ' ⭐');
          }
        });
      }
    } catch (error) {
      console.error('Ошибка при создании платежа:', error);
      setPaymentStatus('error');
      sendErrorPaymentNotification('stars', 100, ' ⭐');
    }
  };

  // Send payment success notification
  const sendSuccessPaymentNotification = async (paymentType, amount, currency) => {
    try {
      if (telegramUser?.id) {
        const successMessage = `🎉 УСПЕШНАЯ ОПЛАТА ПРЕМИУМ ПОДПИСКИ!

👤 Пользователь: ${telegramUser.first_name} ${telegramUser.last_name || ''}
🆔 ID: ${telegramUser.id}
👶 Ребенок: ${child.name} (${child.age} ${getAgeText(child.age)})

✅ Платеж завершен успешно!
💳 Способ: ${paymentType === 'card' ? 'Банковская карта' : 'Telegram Stars'}
💰 Сумма: ${amount}${currency}
📅 Время: ${new Date().toLocaleString('ru-RU')}

🎁 Активирована: Премиум подписка на 1 месяц
🔓 Разблокированы все активности и материалы!`;

        await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/payment-success`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: telegramUser.id,
            message: successMessage,
            paymentType: paymentType,
            amount: amount,
            currency: currency
          }),
        });

        console.log('✅ Payment success notification sent');
      }
    } catch (error) {
      console.error('❌ Error sending success notification:', error);
    }
  };

  // Send payment cancellation notification
  const sendCancelledPaymentNotification = async (paymentType, amount, currency) => {
    try {
      if (telegramUser?.id) {
        const cancelMessage = `❌ Платеж отменен пользователем

👤 Пользователь: ${telegramUser.first_name} ${telegramUser.last_name || ''}
🆔 ID: ${telegramUser.id}
👶 Ребенок: ${child.name}

💳 Способ: ${paymentType === 'card' ? 'Банковская карта' : 'Telegram Stars'}
💰 Сумма: ${amount}${currency}
📅 Время: ${new Date().toLocaleString('ru-RU')}

🤔 Возможно, нужна помощь с оплатой?`;

        await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/payment-cancelled`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: telegramUser.id,
            message: cancelMessage,
            paymentType: paymentType,
            amount: amount,
            currency: currency
          }),
        });

        console.log('⚠️ Payment cancellation notification sent');
      }
    } catch (error) {
      console.error('❌ Error sending cancellation notification:', error);
    }
  };

  // Send payment error notification
  const sendErrorPaymentNotification = async (paymentType, amount, currency) => {
    try {
      if (telegramUser?.id) {
        const errorMessage = `⚠️ ОШИБКА ПРИ ОПЛАТЕ

👤 Пользователь: ${telegramUser.first_name} ${telegramUser.last_name || ''}
🆔 ID: ${telegramUser.id}
👶 Ребенок: ${child.name}

❌ Платеж завершился с ошибкой
💳 Способ: ${paymentType === 'card' ? 'Банковская карта' : 'Telegram Stars'}
💰 Сумма: ${amount}${currency}
📅 Время: ${new Date().toLocaleString('ru-RU')}

🛠️ Требуется техническая поддержка`;

        await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/payment-error`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: telegramUser.id,
            message: errorMessage,
            paymentType: paymentType,
            amount: amount,
            currency: currency
          }),
        });

        console.log('❌ Payment error notification sent');
      }
    } catch (error) {
      console.error('❌ Error sending error notification:', error);
    }
  };

  // PaymentModal component
  const PaymentModal = () => {
    if (!showPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">👑</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Премиум подписка</h2>
            <p className="text-gray-600 mb-6">Разблокируйте все возможности приложения</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Что входит в премиум:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Все активности без ограничений
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Персональные программы развития
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Подробная аналитика прогресса
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Эксклюзивные материалы
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Приоритетная поддержка
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Стоимость:</span>
                <span className="text-2xl font-bold text-purple-600">299₽/мес</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">или 100 ⭐ Telegram Stars</p>
            </div>
            
            {paymentStatus === 'processing' && (
              <div className="mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600 text-center">Обработка платежа...</p>
                <p className="text-xs text-gray-500 text-center mt-1">Уведомление отправлено в Telegram</p>
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <div className="text-green-500 text-2xl mb-2 text-center">✓</div>
                <p className="text-green-800 font-semibold text-center">Платеж успешно завершен!</p>
                <p className="text-sm text-green-600 text-center">Премиум активирован</p>
                <p className="text-xs text-green-500 text-center mt-1">✨ Уведомление отправлено в Telegram</p>
              </div>
            )}
            
            {paymentStatus === 'cancelled' && (
              <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                <div className="text-yellow-500 text-2xl mb-2 text-center">⚠️</div>
                <p className="text-yellow-800 font-semibold text-center">Платеж отменен</p>
                <p className="text-sm text-yellow-600 text-center">Вы можете попробовать еще раз</p>
              </div>
            )}
            
            {paymentStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-50 rounded-lg">
                <div className="text-blue-500 text-2xl mb-2 text-center">💬</div>
                <p className="text-sm text-blue-600 text-center">Проверьте Telegram - там должен быть счет для оплаты</p>
                <p className="text-xs text-gray-500 text-center mt-1">📱 Уведомление о проблеме отправлено</p>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={createCardPayment}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="mr-2">💳</span>
                {paymentStatus === 'processing' ? 'Обработка...' : 'Оплатить картой'}
              </button>
              
              <button
                onClick={createStarsPayment}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="mr-2">⭐</span>
                {paymentStatus === 'processing' ? 'Обработка...' : 'Оплатить Stars'}
              </button>
              
              <button
                onClick={() => setShowPayment(false)}
                className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main screen with Telegram integration
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white shadow-sm px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Привет, {child.name}! 👋</h1>
              <p className="text-gray-600">Возраст: {child.age} {getAgeText(child.age)}</p>
              {telegramUser && (
                <p className="text-xs text-gray-500 mt-1">
                  Telegram: @{telegramUser.username || telegramUser.first_name}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-orange-800">🏆 {child.streak} дней</span>
              </div>
              <button 
                onClick={() => setCurrentScreen('notifications')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative"
              >
                <span className="text-xl">🔔</span>
                {botConnected && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                )}
              </button>
              <button 
                onClick={() => setCurrentScreen('settings')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {!isPremium && (
          <div className="mx-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold flex items-center">👑 Премиум подписка</h3>
                <p className="text-sm opacity-90">Открой все активности и возможности</p>
              </div>
              <button 
                onClick={() => setShowPayment(true)}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Подключить
              </button>
            </div>
          </div>
        )}

        <div className="px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">▶️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Время для развития!</h2>
              <p className="text-gray-600">Выбери активность для {child.name}</p>
            </div>
            
            <button 
              onClick={() => setCurrentScreen('activities')}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-medium text-lg hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105"
            >
              Начать активность
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{(activitiesDatabase[child.age] || []).length}</p>
                  <p className="text-sm text-gray-600">Активности</p>
                </div>
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">{progressData.totalTime}ч</p>
                  <p className="text-sm text-gray-600">Время развития</p>
                </div>
                <span className="text-2xl">⏰</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setCurrentScreen('progress')}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">📅</span>
              </div>
              <p className="text-sm font-medium text-gray-800">Прогресс</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">📚</span>
              </div>
              <p className="text-sm font-medium text-gray-800">Библиотека</p>
            </button>
          </div>
        </div>

        <PaymentModal />
      </div>
    );
  }

  // Activities screen
  if (currentScreen === 'activities') {
    const categories = getActivityCategories();
    const filteredActivities = getFilteredActivities();
    const freeActivities = filteredActivities.filter(a => !a.premium);
    const premiumActivities = filteredActivities.filter(a => a.premium);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => {
                setSelectedActivity(null);
                setCurrentScreen('main');
              }}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Активности</h1>
              <p className="text-sm text-gray-600">{child.age} {getAgeText(child.age)} • {filteredActivities.length} активностей</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Категории</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Все ({(activitiesDatabase[child.age] || []).length})
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {freeActivities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-green-500 mr-2">🆓</span>
                Бесплатные активности ({freeActivities.length})
              </h2>
              <div className="space-y-3">
                {freeActivities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{activity.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                {activity.category}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                                {activity.difficulty}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                ⏱️ {activity.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-11 mb-2">{activity.description}</p>
                        <p className="text-xs text-gray-500 ml-11">Возраст: {activity.ageRange}</p>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setSelectedActivity(activity);
                            setCurrentScreen('activity-details');
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                        >
                          Подробнее
                        </button>
                        
                        <button 
                          onClick={() => {
                            if (window.Telegram?.WebApp) {
                              window.Telegram.WebApp.showAlert(
                                `🚀 Активность "${activity.title}" начата!\n\n` +
                                `⏱️ Время: ${activity.duration}\n` +
                                `🎯 Польза: ${activity.benefits}\n\n` +
                                `Удачных занятий с ${child.name}! 💪`
                              );
                            } else {
                              alert(`Активность "${activity.title}" начата! 🎯`);
                            }
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm"
                        >
                          Начать
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {premiumActivities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-yellow-500 mr-2">👑</span>
                Премиум активности ({premiumActivities.length})
              </h2>
              <div className="space-y-3">
                {premiumActivities.map((activity) => (
                  <div key={activity.id} className={`bg-white rounded-xl p-4 shadow-sm ${!isPremium ? 'opacity-75' : 'hover:shadow-md transition-shadow'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{activity.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                              {activity.title}
                              {!isPremium && <span className="ml-2 text-gray-400">🔒</span>}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                {activity.category}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                                {activity.difficulty}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                ⏱️ {activity.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-11 mb-2">{activity.description}</p>
                        <p className="text-xs text-gray-500 ml-11">Возраст: {activity.ageRange}</p>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <button 
                          onClick={() => {
                            if (isPremium) {
                              setSelectedActivity(activity);
                              setCurrentScreen('activity-details');
                            } else {
                              setShowPayment(true);
                            }
                          }}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                            isPremium 
                              ? 'bg-blue-500 text-white hover:bg-blue-600' 
                              : 'bg-gray-300 text-gray-500'
                          }`}
                        >
                          {isPremium ? 'Подробнее' : 'Премиум'}
                        </button>
                        <button 
                          onClick={() => {
                            if (isPremium) {
                              if (window.Telegram?.WebApp) {
                                window.Telegram.WebApp.showAlert(`Премиум активность "${activity.title}" начата! ✨`);
                              } else {
                                alert(`Премиум активность "${activity.title}" начата! ✨`);
                              }
                            } else {
                              setShowPayment(true);
                            }
                          }}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                            isPremium 
                              ? 'bg-purple-500 text-white hover:bg-purple-600' 
                              : 'bg-gray-300 text-gray-500'
                          }`}
                        >
                          {isPremium ? 'Начать' : 'Премиум'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Активности не найдены</h3>
              <p className="text-gray-600 mb-6">
                Для возраста {child.age} {getAgeText(child.age)} в категории "{selectedCategory}" активностей нет
              </p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Показать все активности
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Activity details screen
  if (currentScreen === 'activity-details' && selectedActivity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => {
                setSelectedActivity(null);
                setCurrentScreen('activities');
              }}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div className="flex items-center">
              <span className="text-2xl mr-3">{selectedActivity.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{selectedActivity.title}</h1>
                <p className="text-sm text-gray-600">{selectedActivity.ageRange} • {selectedActivity.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedActivity.category)}`}>
                {selectedActivity.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedActivity.difficulty)}`}>
                {selectedActivity.difficulty}
              </span>
              {selectedActivity.premium && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                  👑 Премиум
                </span>
              )}
            </div>
            
            <p className="text-gray-700 mb-4">{selectedActivity.description}</p>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">🎯 Польза для развития:</h3>
              <p className="text-blue-800 text-sm">{selectedActivity.benefits}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📦 Что понадобится:</h3>
            <div className="grid grid-cols-1 gap-2">
              {selectedActivity.materials.map((material, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">{material}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Пошаговая инструкция:</h3>
            <div className="space-y-3">
              {selectedActivity.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => {
                if (window.Telegram?.WebApp) {
                  window.Telegram.WebApp.showAlert(`🚀 Активность "${selectedActivity.title}" начата!\n\n⏱️ Время: ${selectedActivity.duration}\n🎯 Цель: ${selectedActivity.benefits}\n\nУдачных занятий с ${child.name}! 💪`);
                } else {
                  alert(`🚀 Активность "${selectedActivity.title}" начата!\n\n⏱️ Время: ${selectedActivity.duration}\n🎯 Цель: ${selectedActivity.benefits}\n\nУдачных занятий с ${child.name}! 💪`);
                }
              }}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-medium text-lg hover:from-green-600 hover:to-blue-600 transition-all"
            >
              🚀 Начать активность
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Progress screen
  if (currentScreen === 'progress') {
    const completedThisWeek = progressData.weeklyActivities.filter(Boolean).length;
    const totalDaysThisWeek = 7;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Прогресс развития</h1>
              <p className="text-sm text-gray-600">{child.name} • {child.age} {getAgeText(child.age)}</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Эта неделя</h2>
              <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-green-800">🔥 {child.streak} дней подряд</span>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{day}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    progressData.weeklyActivities[index] ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}>
                    {progressData.weeklyActivities[index] ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Выполнено активностей</span>
                <span className="font-bold text-green-600">{completedThisWeek} из {totalDaysThisWeek}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(completedThisWeek / totalDaysThisWeek) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Развитие навыков</h2>
            <div className="space-y-4">
              {Object.entries(progressData.skillsProgress).map(([key, progress]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{getSkillName(key)}</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getSkillColor(key)}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Достижения</h2>
            <div className="grid grid-cols-2 gap-4">
              {progressData.achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-lg border-2 ${
                    achievement.unlocked 
                      ? 'border-yellow-300 bg-yellow-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h3 className={`font-medium text-sm ${
                    achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                  
                  {!achievement.unlocked && achievement.progress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Прогресс</span>
                        <span>{achievement.progress}/15</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="h-1 rounded-full bg-yellow-400"
                          style={{ width: `${(achievement.progress / 15) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Последние активности</h2>
            <div className="space-y-3">
              {progressData.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">{activity.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                        {activity.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{activity.duration} мин</p>
                    <span className="text-xs text-gray-500">выполнено</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Library screen
  if (currentScreen === 'library') {
    const filteredArticles = getFilteredArticles();
    const freeArticles = filteredArticles.filter(article => !article.premium);
    const premiumArticles = filteredArticles.filter(article => article.premium);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Библиотека</h1>
              <p className="text-sm text-gray-600">Материалы для родителей</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Категории</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {libraryContent.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                  <p className={`text-xs ${
                    selectedCategory === category.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {category.count} материалов
                  </p>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full p-3 rounded-lg text-center transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Все категории ({libraryContent.articles.length} статей)
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🎥 Популярные видео</h2>
            <div className="space-y-3">
              {libraryContent.videos.map((video) => (
                <div 
                  key={video.id} 
                  className={`bg-white rounded-xl p-4 shadow-sm ${!video.premium || isPremium ? 'hover:shadow-md transition-shadow' : 'opacity-75'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-2xl">{video.thumbnail}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          {video.title}
                          {video.premium && !isPremium && <span className="ml-2 text-gray-400">🔒</span>}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">⏱️ {video.duration}</span>
                          <span className="text-xs text-gray-500">👁️ {video.views}</span>
                          {video.premium && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                              Премиум
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                        video.premium && !isPremium
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      onClick={() => {
                        if (video.premium && !isPremium) {
                          setShowPayment(true);
                        } else {
                          if (window.Telegram?.WebApp) {
                            window.Telegram.WebApp.showAlert(`Запускаем видео: ${video.title}`);
                          } else {
                            alert(`Запускаем видео: ${video.title}`);
                          }
                        }
                      }}
                    >
                      {video.premium && !isPremium ? 'Премиум' : 'Смотреть'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {freeArticles.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-green-500 mr-2">🆓</span>
                Бесплатные статьи ({freeArticles.length})
              </h2>
              <div className="space-y-3">
                {freeArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>👤 {article.author}</span>
                          <span>⏱️ {article.readTime}</span>
                          <span>⭐ {article.rating}</span>
                          <span>👁️ {article.views}</span>
                        </div>
                      </div>
                      <button 
                        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                        onClick={() => {
                          if (window.Telegram?.WebApp) {
                            window.Telegram.WebApp.showAlert(`Открываем статью: ${article.title}`);
                          } else {
                            alert(`Открываем статью: ${article.title}`);
                          }
                        }}
                      >
                        Читать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {premiumArticles.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-yellow-500 mr-2">👑</span>
                Премиум статьи ({premiumArticles.length})
              </h2>
              <div className="space-y-3">
                {premiumArticles.map((article) => (
                  <div key={article.id} className={`bg-white rounded-xl p-4 shadow-sm ${!isPremium ? 'opacity-75' : 'hover:shadow-md transition-shadow'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                          {article.title}
                          {!isPremium && <span className="ml-2 text-gray-400">🔒</span>}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>👤 {article.author}</span>
                          <span>⏱️ {article.readTime}</span>
                          <span>⭐ {article.rating}</span>
                          <span>👁️ {article.views}</span>
                        </div>
                      </div>
                      <button 
                        className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                          isPremium 
                            ? 'bg-purple-500 text-white hover:bg-purple-600' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (isPremium) {
                            if (window.Telegram?.WebApp) {
                              window.Telegram.WebApp.showAlert(`Открываем премиум статью: ${article.title}`);
                            } else {
                              alert(`Открываем премиум статью: ${article.title}`);
                            }
                          } else {
                            setShowPayment(true);
                          }
                        }}
                      >
                        {isPremium ? 'Читать' : 'Премиум'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isPremium && premiumArticles.length > 0 && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">📚 Доступ ко всей библиотеке!</h3>
              <p className="text-sm opacity-90 mb-4">
                Получи доступ к {premiumArticles.length} эксклюзивным статьям, видеоурокам и материалам от экспертов
              </p>
              <button 
                onClick={() => setShowPayment(true)}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Подключить премиум - 299₽/мес
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Settings screen
  if (currentScreen === 'settings') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Настройки</h1>
              <p className="text-sm text-gray-600">Профиль и настройки приложения</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          {/* Child Profile Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Профиль ребенка</h2>
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-2xl">👶</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя ребенка
                </label>
                <input 
                  type="text" 
                  value={child.name}
                  onChange={(e) => setChild({...child, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите имя ребенка"
                />
                <p className="text-xs text-gray-500 mt-1">Имя будет использоваться в активностях и уведомлениях</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Возраст
                </label>
                <select 
                  value={child.age}
                  onChange={(e) => setChild({...child, age: parseInt(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7].map(age => (
                    <option key={age} value={age}>{age} {getAgeText(age)}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Активности будут подобраны под возраст ребенка</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-900">Streak</h3>
                    <p className="text-sm text-blue-700">Дней занятий подряд</p>
                  </div>
                  <div className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full">
                    <span className="text-lg font-bold">🔥 {child.streak}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* App Statistics */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Статистика</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {Object.values(activitiesDatabase).flat().length}
                </div>
                <p className="text-sm text-gray-600">Всего активностей</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {progressData.totalActivities}
                </div>
                <p className="text-sm text-gray-600">Выполнено</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {progressData.totalTime}ч
                </div>
                <p className="text-sm text-gray-600">Время развития</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {libraryContent.articles.length}
                </div>
                <p className="text-sm text-gray-600">Статей</p>
              </div>
            </div>
          </div>

          {/* Premium Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Подписка</h2>
            {isPremium ? (
              <div className="text-center py-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">👑</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Премиум активен</h3>
                <p className="text-gray-600 mb-2">Все активности и материалы разблокированы</p>
                <p className="text-sm text-gray-500 mb-4">Подписка продлевается автоматически</p>
                
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-green-500 text-xl mr-2">✨</span>
                    <span className="text-green-800 font-semibold">Премиум возможности:</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Неограниченные активности</li>
                    <li>• Персональные программы развития</li>
                    <li>• Подробная аналитика прогресса</li>
                    <li>• Эксклюзивные материалы</li>
                  </ul>
                </div>
                
                <button 
                  onClick={() => setIsPremium(false)}
                  className="text-red-600 hover:text-red-700 text-sm underline"
                >
                  Отключить премиум (для тестирования)
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-500 text-2xl">👑</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Базовая версия</h3>
                <p className="text-gray-600 mb-4">
                  Разблокируй все возможности приложения
                </p>
                
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">С премиум подпиской:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Все активности без ограничений</li>
                    <li>• Персональные программы развития</li>
                    <li>• Подробная аналитика прогресса</li>
                    <li>• Эксклюзивные материалы от экспертов</li>
                    <li>• Приоритетная поддержка</li>
                  </ul>
                </div>
                
                <button 
                  onClick={() => setShowPayment(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Подключить премиум - 299₽/мес
                </button>
              </div>
            )}
          </div>

          {/* App Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">О приложении</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Версия приложения</span>
                <span className="font-medium text-gray-800">1.0.0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Telegram интеграция</span>
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${botConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <span className={`font-medium text-sm ${botConnected ? 'text-green-600' : 'text-gray-600'}`}>
                    {botConnected ? 'Подключена' : 'Не подключена'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Уведомления</span>
                <button 
                  onClick={() => setCurrentScreen('notifications')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Настроить →
                </button>
              </div>
            </div>
          </div>

          {/* Support & Feedback */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Поддержка</h2>
            <div className="space-y-3">
              <button 
                className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.showAlert('Связываемся с поддержкой...\n\nВы можете написать нам в Telegram: @support');
                  } else {
                    alert('Связываемся с поддержкой...\n\nВы можете написать нам в Telegram: @support');
                  }
                }}
              >
                <span className="text-2xl mr-3">💬</span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Связаться с поддержкой</h3>
                  <p className="text-sm text-gray-600">Помощь по использованию приложения</p>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              
              <button 
                className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.showAlert('Спасибо за желание оценить приложение!\n\nВаше мнение очень важно для нас! ⭐');
                  } else {
                    alert('Спасибо за желание оценить приложение!\n\nВаше мнение очень важно для нас! ⭐');
                  }
                }}
              >
                <span className="text-2xl mr-3">⭐</span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Оценить приложение</h3>
                  <p className="text-sm text-gray-600">Поделитесь впечатлениями</p>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              
              <button 
                className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.showAlert('Есть идея для новой активности?\n\nМы всегда рады новым предложениям! 💡');
                  } else {
                    alert('Есть идея для новой активности?\n\nМы всегда рады новым предложениям! 💡');
                  }
                }}
              >
                <span className="text-2xl mr-3">💡</span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Предложить идею</h3>
                  <p className="text-sm text-gray-600">Идеи для новых активностей</p>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Notifications screen
  if (currentScreen === 'notifications') {
    const getNotificationTypeColor = (type) => {
      const colors = {
        'daily': 'bg-blue-100 text-blue-800',
        'streak': 'bg-orange-100 text-orange-800',
        'encouragement': 'bg-green-100 text-green-800',
        'reminder': 'bg-purple-100 text-purple-800'
      };
      return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Уведомления</h1>
              <p className="text-sm text-gray-600">Настройка напоминаний через Telegram</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Telegram Bot</h2>
                <p className="text-sm text-gray-600">@{notificationSettings.botUsername}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                botConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {botConnected ? 'Подключен' : 'Не подключен'}
              </div>
            </div>

            {!botConnected ? (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Как подключить уведомления:</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Найдите бота @{notificationSettings.botUsername} в Telegram</li>
                    <li>2. Нажмите /start</li>
                    <li>3. Вернитесь в приложение и нажмите "Подключить"</li>
                  </ol>
                </div>
                
                <button
                  onClick={connectToBot}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Подключить бота
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Бот успешно подключен!</h3>
                  <p className="text-sm text-green-800">
                    Теперь вы будете получать напоминания о занятиях прямо в Telegram
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Время напоминания
                  </label>
                  <input 
                    type="time" 
                    value={notificationSettings.time}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings, 
                      time: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Частота напоминаний
                  </label>
                  <select 
                    value={notificationSettings.frequency}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings, 
                      frequency: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="daily">Ежедневно</option>
                    <option value="weekly">Еженедельно</option>
                    <option value="custom">Выбрать дни</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {botConnected && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Тип сообщений</h2>
              <div className="space-y-3">
                {[
                  { 
                    value: 'motivational', 
                    label: 'Мотивирующие', 
                    description: 'Вдохновляющие сообщения для занятий',
                    example: getRandomMessage('daily')
                  },
                  { 
                    value: 'simple', 
                    label: 'Простые', 
                    description: 'Краткие напоминания о времени занятий',
                    example: `Время для занятий с ${child.name}!`
                  },
                  { 
                    value: 'streak', 
                    label: 'С акцентом на streak', 
                    description: 'Фокус на достижениях и регулярности',
                    example: getRandomMessage('streak')
                  }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      reminderType: type.value
                    })}
                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                      notificationSettings.reminderType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{type.label}</h3>
                      {notificationSettings.reminderType === type.value && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                    <p className="text-xs text-gray-500 italic">"{type.example}"</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {botConnected && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Тестовое уведомление</h2>
              <p className="text-sm text-gray-600 mb-4">
                Посмотрите, как будет выглядеть ваше уведомление
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-blue-500 mr-2">🔔</span>
                  <span className="font-semibold text-blue-900">Развивайка</span>
                  <span className="text-xs text-blue-600 ml-auto">{notificationSettings.time}</span>
                </div>
                <p className="text-blue-800">
                  {getRandomMessage(notificationSettings.reminderType)}
                </p>
              </div>

              <button 
                onClick={sendTestNotification}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Отправить тестовое уведомление
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">История уведомлений</h2>
            <div className="space-y-3">
              {notificationHistory.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg ${
                    notification.opened ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNotificationTypeColor(notification.type)}`}>
                      {notification.type === 'daily' ? 'Ежедневное' : 
                       notification.type === 'streak' ? 'Streak' : 'Другое'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  {!notification.opened && (
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Экран в разработке</h2>
        <button 
          onClick={() => setCurrentScreen('main')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default ChildDevelopmentApp;