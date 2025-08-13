import React, { useState, useMemo, useCallback } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
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
  const progressData = useMemo(() => ({
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
  }), []);

  // База материалов библиотеки
  const libraryContent = useMemo(() => ({
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
      },
      {
        id: 6,
        title: 'Безопасность дома: детские замки и защита',
        description: 'Как обезопасить дом для активного малыша',
        readTime: '4 мин',
        category: 'safety',
        premium: false,
        author: 'Эксперт по безопасности Игорь Смирнов',
        rating: 4.8,
        views: 891
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
  }), []);

  // РАСШИРЕННАЯ база активностей
  const activitiesDatabase = useMemo(() => ({
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
    ],
    4: [
      {
        id: 10,
        title: 'Конструктор по схемам',
        description: 'Строим по образцу, развиваем пространственное мышление',
        duration: '35 мин',
        category: 'Логика',
        premium: false,
        icon: '🧱',
        difficulty: 'Средне',
        materials: ['Крупный конструктор', 'Схемы построек', 'Карточки с образцами'],
        instructions: [
          'Выберите простую схему для начала',
          'Разложите все детали конструктора',
          'Покажите, как читать схему',
          'Стройте вместе, следуя образцу',
          'Поощряйте самостоятельные попытки',
          'Создавайте собственные постройки'
        ],
        benefits: 'Развивает пространственное мышление, следование инструкциям, мелкую моторику, планирование',
        ageRange: '3-5 лет'
      }
    ]
  }), []);

  // Мотивирующие сообщения
  const motivationalMessages = useMemo(() => ({
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
  }), []);

  // История уведомлений
  const notificationHistory = useMemo(() => [
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
  ], []);

  // ФУНКЦИИ-ХЕЛПЕРЫ
  const getAgeText = useCallback((age) => {
    if (age === 1) return 'год';
    if (age < 5) return 'года';
    return 'лет';
  }, []);

  const getCategoryColor = useCallback((category) => {
    const colors = {
      'Моторика': 'bg-blue-100 text-blue-800',
      'Речь': 'bg-green-100 text-green-800',
      'Логика': 'bg-purple-100 text-purple-800',
      'Творчество': 'bg-pink-100 text-pink-800',
      'Развитие': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  }, []);

  const getDifficultyColor = useCallback((difficulty) => {
    const colors = {
      'Легко': 'bg-green-100 text-green-800',
      'Средне': 'bg-yellow-100 text-yellow-800',
      'Сложно': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  }, []);

  const getNotificationTypeColor = useCallback((type) => {
    const colors = {
      'daily': 'bg-blue-100 text-blue-800',
      'streak': 'bg-orange-100 text-orange-800',
      'encouragement': 'bg-green-100 text-green-800',
      'reminder': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  }, []);

  const getSkillName = useCallback((key) => {
    const names = {
      motor: 'Мелкая моторика',
      speech: 'Речь и коммуникация', 
      logic: 'Логическое мышление',
      creativity: 'Творческие способности',
      development: 'Общее развитие'
    };
    return names[key];
  }, []);

  const getSkillColor = useCallback((key) => {
    const colors = {
      motor: 'bg-blue-500',
      speech: 'bg-green-500',
      logic: 'bg-purple-500', 
      creativity: 'bg-pink-500',
      development: 'bg-orange-500'
    };
    return colors[key];
  }, []);

  const getFilteredArticles = useMemo(() => {
    if (selectedCategory === 'all') {
      return libraryContent.articles;
    }
    return libraryContent.articles.filter(article => article.category === selectedCategory);
  }, [selectedCategory, libraryContent.articles]);

  const getFilteredActivities = useMemo(() => {
    const activities = activitiesDatabase[child.age] || [];
    if (selectedCategory === 'all') {
      return activities;
    }
    return activities.filter(activity => activity.category === selectedCategory);
  }, [selectedCategory, child.age, activitiesDatabase]);

  const getActivityCategories = useMemo(() => {
    const activities = activitiesDatabase[child.age] || [];
    const categories = [...new Set(activities.map(activity => activity.category))];
    return categories.map(cat => ({
      id: cat,
      name: cat,
      count: activities.filter(a => a.category === cat).length
    }));
  }, [child.age, activitiesDatabase]);

  const getRandomMessage = useCallback((type) => {
    const messages = motivationalMessages[type] || motivationalMessages.daily;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return randomMessage
      .replace('{name}', child.name)
      .replace('{streak}', child.streak);
  }, [child.name, child.streak, motivationalMessages]);

  // ОБРАБОТЧИКИ СОБЫТИЙ
  const handleActivitySelect = useCallback((activity) => {
    setSelectedActivity(activity);
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleScreenChange = useCallback((screen) => {
    setCurrentScreen(screen);
    if (screen !== 'activities') {
      setSelectedActivity(null);
    }
    if (screen === 'main') {
      setSelectedCategory('all');
    }
  }, []);

  const handleChildAgeChange = useCallback((age) => {
    setChild(prev => ({ ...prev, age }));
    setSelectedActivity(null);
    setSelectedCategory('all');
  }, []);

  // КОМПОНЕНТЫ
  const EmptyState = ({ icon, title, description }) => (
    <div className="text-center py-8">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const AccessibleButton = ({ onClick, className, children, disabled = false, ariaLabel }) => (
    <button
      onClick={onClick}
      className={`${className} ${disabled ? 'cursor-not-allowed opacity-50' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </button>
  );

  // ГЛАВНЫЙ ЭКРАН
  if (currentScreen === 'main') {
    const availableActivitiesCount = (activitiesDatabase[child.age] || []).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <header className="bg-white shadow-sm px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Привет, {child.name}! 👋</h1>
              <p className="text-gray-600">Возраст: {child.age} {getAgeText(child.age)}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-orange-800">🏆 {child.streak} дней</span>
              </div>
              <AccessibleButton
                onClick={() => handleScreenChange('notifications')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative"
                ariaLabel="Настройки уведомлений"
              >
                <span className="text-xl">🔔</span>
                {notificationSettings.enabled && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                )}
              </AccessibleButton>
              <AccessibleButton
                onClick={() => handleScreenChange('settings')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                ariaLabel="Настройки приложения"
              >
                ⚙️
              </AccessibleButton>
            </div>
          </div>
        </header>

        <main className="px-4">
          {notificationSettings.enabled && (
            <div className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold flex items-center">🔔 Напоминания включены</h3>
                  <p className="text-sm opacity-90">Следующее в {notificationSettings.time}</p>
                </div>
                <AccessibleButton
                  onClick={() => handleScreenChange('notifications')}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors"
                  ariaLabel="Настроить напоминания"
                >
                  Настроить
                </AccessibleButton>
              </div>
            </div>
          )}

          {!isPremium && (
            <div className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold flex items-center">👑 Премиум подписка</h3>
                  <p className="text-sm opacity-90">Открой все активности и возможности</p>
                </div>
                <AccessibleButton
                  onClick={() => setIsPremium(true)}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  ariaLabel="Подключить премиум подписку"
                >
                  Подключить
                </AccessibleButton>
              </div>
            </div>
          )}

          <div className="py-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl" role="img" aria-label="Играть">▶️</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Время для развития!</h2>
                <p className="text-gray-600">Выбери активность для {child.name}</p>
              </div>
              
              <AccessibleButton
                onClick={() => handleScreenChange('activities')}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-medium text-lg hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105"
                ariaLabel="Начать активность"
              >
                Начать активность
              </AccessibleButton>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{availableActivitiesCount}</p>
                    <p className="text-sm text-gray-600">Активности</p>
                  </div>
                  <span className="text-2xl" role="img" aria-label="Активности">🎯</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{progressData.totalTime}ч</p>
                    <p className="text-sm text-gray-600">Время развития</p>
                  </div>
                  <span className="text-2xl" role="img" aria-label="Время">⏰</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <AccessibleButton
                onClick={() => handleScreenChange('progress')}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                ariaLabel="Посмотреть прогресс"
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl" role="img" aria-label="Прогресс">📅</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Прогресс</p>
              </AccessibleButton>
              <AccessibleButton
                onClick={() => handleScreenChange('library')}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                ariaLabel="Открыть библиотеку"
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl" role="img" aria-label="Библиотека">📚</span>
                </div>
                <p className="text-sm font-medium text-gray-800">Библиотека</p>
              </AccessibleButton>
            </div>
          </div>

          {/* Age Selector for testing */}
          <div className="pb-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Тест возрастов:</p>
              <div className="flex gap-2 flex-wrap">
                {[1,2,3,4,5,6,7].map(age => (
                  <AccessibleButton
                    key={age}
                    onClick={() => handleChildAgeChange(age)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      child.age === age ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-blue-50'
                    }`}
                    ariaLabel={`Установить возраст ${age} ${getAgeText(age)}`}
                  >
                    {age} {getAgeText(age)}
                  </AccessibleButton>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ЭКРАН АКТИВНОСТЕЙ
  if (currentScreen === 'activities') {
    const categories = getActivityCategories;
    const filteredActivities = getFilteredActivities;
    const freeActivities = filteredActivities.filter(a => !a.premium);
    const premiumActivities = filteredActivities.filter(a => a.premium);

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <AccessibleButton
              onClick={() => {
                setSelectedActivity(null);
                handleScreenChange('main');
              }}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              ariaLabel="Вернуться на главную"
            >
              <span className="text-2xl">←</span>
            </AccessibleButton>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Активности</h1>
              <p className="text-sm text-gray-600">{child.age} {getAgeText(child.age)} • {filteredActivities.length} активностей</p>
            </div>
          </div>
        </header>

        <main className="px-4 py-6">
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Категории</h2>
            <div className="flex gap-2 overflow-x-auto pb-2" role="tablist">
              <AccessibleButton
                onClick={() => handleCategorySelect('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                role="tab"
                aria-selected={selectedCategory === 'all'}
                ariaLabel="Показать все категории"
              >
                Все ({(activitiesDatabase[child.age] || []).length})
              </AccessibleButton>
              {categories.map((category) => (
                <AccessibleButton
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  role="tab"
                  aria-selected={selectedCategory === category.id}
                  ariaLabel={`Фильтр по категории ${category.name}`}
                >
                  {category.name} ({category.count})
                </AccessibleButton>
              ))}
            </div>
          </section>

          {filteredActivities.length === 0 && (
            <EmptyState
              icon="🎯"
              title="Активности не найдены"
              description={`Для возраста ${child.age} ${getAgeText(child.age)} в категории "${selectedCategory}" пока нет активностей`}
            />
          )}

          {freeActivities.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-green-500 mr-2">🆓</span>
                Бесплатные активности ({freeActivities.length})
              </h2>
              <div className="space-y-3">
                {freeActivities.map((activity) => (
                  <article key={activity.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3" role="img" aria-label={activity.category}>{activity.icon}</span>
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
                        <AccessibleButton
                          onClick={() => handleActivitySelect(activity)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                          ariaLabel={`Подробнее об активности ${activity.title}`}
                        >
                          Подробнее
                        </AccessibleButton>
                        <AccessibleButton
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm"
                          ariaLabel={`Начать активность ${activity.title}`}
                        >
                          Начать
                        </AccessibleButton>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {premiumActivities.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-yellow-500 mr-2">👑</span>
                Премиум активности ({premiumActivities.length})
              </h2>
              <div className="space-y-3">
                {premiumActivities.map((activity) => (
                  <article key={activity.id} className={`bg-white rounded-xl p-4 shadow-sm ${!isPremium ? 'opacity-75' : 'hover:shadow-md transition-shadow'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3" role="img" aria-label={activity.category}>{activity.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                              {activity.title}
                              {!isPremium && <span className="ml-2 text-gray-400" role="img" aria-label="Заблокировано">🔒</span>}
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
                        <AccessibleButton
                          onClick={() => isPremium ? handleActivitySelect(activity) : setIsPremium(true)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                            isPremium 
                              ? 'bg-blue-500 text-white hover:bg-blue-600' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!isPremium}
                          ariaLabel={isPremium ? `Подробнее об активности ${activity.title}` : 'Требует премиум подписку'}
                        >
                          {isPremium ? 'Подробнее' : 'Премиум'}
                        </AccessibleButton>
                        <AccessibleButton
                          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                            isPremium 
                              ? 'bg-purple-500 text-white hover:bg-purple-600' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!isPremium}
                          ariaLabel={isPremium ? `Начать активность ${activity.title}` : 'Требует премиум подписку'}
                        >
                          {isPremium ? 'Начать' : 'Премиум'}
                        </AccessibleButton>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {!isPremium && premiumActivities.length > 0 && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">🚀 Разблокируй все активности!</h3>
              <p className="text-sm opacity-90 mb-4">
                Получи доступ к {premiumActivities.length} премиум активностям с детальными инструкциями и материалами
              </p>
              <AccessibleButton
                onClick={() => setIsPremium(true)}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                ariaLabel="Подключить премиум подписку"
              >
                Подключить премиум - 299₽/мес
              </AccessibleButton>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ДЕТАЛЬНЫЙ ЭКРАН АКТИВНОСТИ
  if (selectedActivity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <AccessibleButton
              onClick={() => setSelectedActivity(null)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              ariaLabel="Вернуться к списку активностей"
            >
              <span className="text-2xl">←</span>
            </AccessibleButton>
            <div className="flex items-center">
              <span className="text-2xl mr-3" role="img" aria-label={selectedActivity.category}>{selectedActivity.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{selectedActivity.title}</h1>
                <p className="text-sm text-gray-600">{selectedActivity.ageRange} • {selectedActivity.duration}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6">
          <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
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
          </section>

          {selectedActivity.materials && selectedActivity.materials.length > 0 && (
            <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📦 Что понадобится:</h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedActivity.materials.map((material, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-green-500 mr-3" role="img" aria-label="Есть">✓</span>
                    <span className="text-gray-700">{material}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {selectedActivity.instructions && selectedActivity.instructions.length > 0 && (
            <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Пошаговая инструкция:</h3>
              <ol className="space-y-3" role="list">
                {selectedActivity.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="space-y-3">
            <AccessibleButton
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-medium text-lg hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105"
              ariaLabel={`Начать активность ${selectedActivity.title}`}
            >
              🚀 Начать активность
            </AccessibleButton>
            
            <div className="grid grid-cols-2 gap-3">
              <AccessibleButton
                className="bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors"
                ariaLabel="Установить таймер для активности"
              >
                ⏰ Установить таймер
              </AccessibleButton>
              <AccessibleButton
                className="bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors"
                ariaLabel="Сохранить результат активности"
              >
                📸 Сохранить результат
              </AccessibleButton>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // ОСТАЛЬНЫЕ ЭКРАНЫ (заглушки)
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center">
          <AccessibleButton
            onClick={() => handleScreenChange('main')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            ariaLabel="Вернуться на главную"
          >
            <span className="text-2xl">←</span>
          </AccessibleButton>
          <h1 className="text-xl font-bold text-gray-800">Экран: {currentScreen}</h1>
        </div>
      </header>
      
      <main className="px-4 py-20 text-center">
        <EmptyState
          icon="🚧"
          title="Раздел в разработке"
          description="Функционал будет добавлен в следующих версиях"
        />
        <AccessibleButton
          onClick={() => handleScreenChange('main')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
          ariaLabel="Вернуться на главную страницу"
        >
          Вернуться на главную
        </AccessibleButton>
      </main>
    </div>
  );
};

export default ChildDevelopmentApp;
