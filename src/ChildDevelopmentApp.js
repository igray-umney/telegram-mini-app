import React, { useState } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
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
        id: 4,
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
        id: 5,
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
        id: 6,
        title: 'Безопасность дома: создаем детское пространство',
        description: 'Практические советы по обустройству безопасного дома для малыша',
        readTime: '9 мин',
        category: 'safety',
        premium: false,
        author: 'Специалист по безопасности',
        rating: 4.8,
        views: 623
      },
      {
        id: 7,
        title: 'Режим дня для детей разного возраста',
        description: 'Как составить оптимальный распорядок дня с учетом возрастных особенностей',
        readTime: '8 мин',
        category: 'health',
        premium: false,
        author: 'Педиатр Михаил Орлов',
        rating: 4.7,
        views: 891
      },
      {
        id: 8,
        title: 'Эмоциональное развитие дошкольника',
        description: 'Учим ребенка понимать и выражать свои эмоции',
        readTime: '12 мин',
        category: 'psychology',
        premium: true,
        author: 'Психолог Татьяна Белова',
        rating: 4.9,
        views: 1124
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
      },
      {
        id: 3,
        title: 'Первая помощь детям: основы для родителей',
        duration: '18 мин',
        category: 'safety',
        premium: true,
        thumbnail: '🚑',
        views: 998
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
                  <p className="text-2xl font-bold text-blue-600">{progressData.totalActivities}</p>
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
      </div>
    );
  }

  // Экран прогресса (без изменений)
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

  // НОВЫЙ Экран библиотеки
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
          {/* Categories */}
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
            
            {/* All Categories Button */}
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

          {/* Featured Videos */}
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
                      disabled={video.premium && !isPremium}
                    >
                      {video.premium && !isPremium ? 'Премиум' : 'Смотреть'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Free Articles */}
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
                        {selectedCategory === 'all' && (
                          <div className="mt-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {getCategoryInfo(article.category)?.icon} {getCategoryInfo(article.category)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                        Читать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Premium Articles */}
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
                       {selectedCategory === 'all' && (
                         <div className="mt-2">
                           <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                             {getCategoryInfo(article.category)?.icon} {getCategoryInfo(article.category)?.name}
                           </span>
                         </div>
                       )}
                     </div>
                     <button 
                       className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                         isPremium 
                           ? 'bg-purple-500 text-white hover:bg-purple-600' 
                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                       }`}
                       disabled={!isPremium}
                       onClick={() => !isPremium && setIsPremium(true)}
                     >
                       {isPremium ? 'Читать' : 'Премиум'}
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Upgrade prompt for non-premium users */}
         {!isPremium && premiumArticles.length > 0 && (
           <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
             <h3 className="text-lg font-bold mb-2">📚 Доступ ко всей библиотеке!</h3>
             <p className="text-sm opacity-90 mb-4">
               Получи доступ к {premiumArticles.length} эксклюзивным статьям, видеоурокам и материалам от экспертов
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
