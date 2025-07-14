import React, { useState } from 'react';

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
      },
      {
        id: 4,
        title: 'Массаж ладошек',
        description: 'Стимулируем нервные окончания массажными мячиками',
        duration: '5 мин',
        category: 'Развитие',
        premium: true,
        icon: '✋',
        difficulty: 'Легко',
        materials: ['Массажный мячик', 'Различные текстурные предметы'],
        instructions: [
          'Возьмите специальный массажный мячик',
          'Аккуратно катайте его по ладошкам малыша',
          'Используйте разные текстурные предметы',
          'Массируйте каждый пальчик',
          'Говорите ласковые слова во время массажа',
          'Следите за реакцией ребенка'
        ],
        benefits: 'Стимулирует нервные окончания, улучшает кровообращение, развивает тактильную чувствительность',
        ageRange: '6-24 месяца'
      }
    ],
    2: [
      {
        id: 5,
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
        id: 6,
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
        id: 7,
        title: 'Игра в прятки',
        description: 'Развиваем понимание постоянства объектов',
        duration: '20 мин',
        category: 'Развитие',
        premium: true,
        icon: '👁️',
        difficulty: 'Легко',
        materials: ['Платок или одеяло', 'Любимые игрушки'],
        instructions: [
          'Начните с простого "ку-ку"',
          'Прячьтесь за платком',
          'Прячьте игрушки под одеялом',
          'Пусть ребенок ищет спрятанные предметы',
          'Меняйтесь ролями',
          'Постепенно усложняйте игру'
        ],
        benefits: 'Развивает понимание постоянства объектов, память, внимание, социальные навыки',
        ageRange: '12-30 месяцев'
      },
      {
        id: 8,
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
        id: 9,
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
        id: 10,
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
        id: 11,
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
      },
      {
        id: 12,
        title: 'Изучаем алфавит',
        description: 'Первые буквы в игровой форме',
        duration: '15 мин',
        category: 'Речь',
        premium: true,
        icon: '🔤',
        difficulty: 'Средне',
        materials: ['Карточки с буквами', 'Предметы на разные буквы', 'Книги с алфавитом'],
        instructions: [
          'Начните с букв имени ребенка',
          'Показывайте букву и называйте звук',
          'Найдите предметы, начинающиеся на эту букву',
          'Рисуйте буквы в воздухе',
          'Лепите буквы из пластилина',
          'Повторяйте изученные буквы'
        ],
        benefits: 'Развивает речь, подготавливает к чтению, улучшает память, расширяет словарный запас',
        ageRange: '3-5 лет'
      }
    ]
  });

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

  const getCategoryInfo = (categoryId) => {
    return libraryContent.categories.find(cat => cat.id === categoryId);
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

  // Главный экран
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white shadow-sm px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Привет, {child.name}! 👋</h1>
              <p className="text-gray-600">Возраст: {child.age} {getAgeText(child.age)}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-orange-800">🏆 {child.streak} дней</span>
              </div>
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
                onClick={() => setIsPremium(true)}
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

        {/* Age Selector for testing */}
        <div className="px-4 pb-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Тест возрастов:</p>
            <div className="flex gap-2 flex-wrap">
              {[1,2,3,4,5,6,7].map(age => (
                <button 
                  key={age}
                  onClick={() => setChild({...child, age})}
                  className={`px-3 py-1 rounded text-sm ${
                    child.age === age ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
                  }`}
                >
                  {age} {getAgeText(age)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // НОВЫЙ Расширенный экран активностей
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
          {/* Categories Filter */}
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

          {/* Free Activities */}
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
                         onClick={() => setSelectedActivity(activity)}
                         className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                       >
                         Подробнее
                       </button>
                       <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm">
                         Начать
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Premium Activities */}
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
                         onClick={() => isPremium ? setSelectedActivity(activity) : setIsPremium(true)}
                         className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                           isPremium 
                             ? 'bg-blue-500 text-white hover:bg-blue-600' 
                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         }`}
                       >
                         {isPremium ? 'Подробнее' : 'Премиум'}
                       </button>
                       <button 
                         className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                           isPremium 
                             ? 'bg-purple-500 text-white hover:bg-purple-600' 
                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         }`}
                         disabled={!isPremium}
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

         {/* Upgrade prompt for non-premium users */}
         {!isPremium && premiumActivities.length > 0 && (
           <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
             <h3 className="text-lg font-bold mb-2">🚀 Разблокируй все активности!</h3>
             <p className="text-sm opacity-90 mb-4">
               Получи доступ к {premiumActivities.length} премиум активностям с детальными инструкциями и материалами
             </p>
             <button 
               onClick={() => setIsPremium(true)}
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

 // Детальный экран активности
 if (selectedActivity) {
   return (
     <div className="min-h-screen bg-gray-50">
       <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
         <div className="flex items-center">
           <button 
             onClick={() => setSelectedActivity(null)}
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
         {/* Activity Info */}
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

         {/* Materials */}
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

         {/* Instructions */}
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

         {/* Action Buttons */}
         <div className="space-y-3">
           <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-medium text-lg hover:from-green-600 hover:to-blue-600 transition-all">
             🚀 Начать активность
           </button>
           
           <div className="grid grid-cols-2 gap-3">
             <button className="bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors">
               ⏰ Установить таймер
             </button>
             <button className="bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors">
               📸 Сохранить результат
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 }

 // Экран прогресса (сокращенная версия)
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

         <div className="bg-white rounded-xl p-6 shadow-sm">
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
       </div>
     </div>
   );
 }

 // Экран библиотеки (сокращенная версия)
 if (currentScreen === 'library') {
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

       <div className="px-4 py-20 text-center">
         <h2 className="text-xl font-bold mb-4">📚 Библиотека</h2>
         <p className="text-gray-600 mb-6">Полная версия библиотеки доступна в предыдущих версиях</p>
         <button 
           onClick={() => setCurrentScreen('main')}
           className="bg-blue-500 text-white px-6 py-2 rounded-lg"
         >
           Вернуться на главную
         </button>
       </div>
     </div>
   );
 }

 // Заглушки для других экранов
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
         <h1 className="text-xl font-bold text-gray-800">Экран: {currentScreen}</h1>
       </div>
     </div>
     
     <div className="px-4 py-20 text-center">
       <h2 className="text-xl font-bold mb-4">Раздел в разработке</h2>
       <p className="text-gray-600 mb-6">Добавим функционал пошагово</p>
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
