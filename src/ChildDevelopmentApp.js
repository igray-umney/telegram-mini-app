import React, { useState } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [child, setChild] = useState({
    name: 'Андрей',
    age: 2,
    streak: 7
  });

  // Данные прогресса (в реальном приложении будут из базы данных)
  const [progressData] = useState({
    weeklyActivities: [true, true, false, true, true, false, false], // Пн-Вс
    totalActivities: 45,
    totalTime: 12.5, // часы
    skillsProgress: {
      motor: 85,
      speech: 70,
      logic: 60,
      creativity: 90,
      development: 75
    },
    achievements: [
      { id: 1, title: 'Первая неделя', description: '7 дней подряд занятий', icon: '🎯', unlocked: true, date: '2025-01-05' },
      { id: 2, title: 'Творческий гений', description: '10 творческих активностей', icon: '🎨', unlocked: true, date: '2025-01-10' },
      { id: 3, title: 'Маленький исследователь', description: '15 логических игр', icon: '🔍', unlocked: false, progress: 12 },
      { id: 4, title: 'Месяц развития', description: '30 дней занятий', icon: '📅', unlocked: false, progress: 15 },
      { id: 5, title: 'Говорун', description: '20 речевых упражнений', icon: '🗣️', unlocked: false, progress: 8 },
      { id: 6, title: 'Мастер движений', description: '25 моторных активностей', icon: '🏃', unlocked: false, progress: 18 }
    ],
    recentActivities: [
      { name: 'Сортировка по цветам', category: 'Логика', date: '2025-01-13', duration: 20 },
      { name: 'Рисование пальчиками', category: 'Творчество', date: '2025-01-13', duration: 25 },
      { name: 'Простые пазлы', category: 'Логика', date: '2025-01-12', duration: 15 },
      { name: 'Игра с водой', category: 'Моторика', date: '2025-01-12', duration: 20 },
      { name: 'Музыкальные инструменты', category: 'Творчество', date: '2025-01-11', duration: 10 }
    ]
  });

  // База активностей (сокращенная версия для демо)
  const activities = {
    1: [
      { title: 'Сенсорная коробка', description: 'Исследуем разные текстуры: песок, крупы, ткани', duration: '15 мин', category: 'Моторика', premium: false, icon: '🤲' },
      { title: 'Игра с водой', description: 'Переливаем воду между емкостями, развиваем координацию', duration: '20 мин', category: 'Моторика', premium: false, icon: '💧' },
      { title: 'Музыкальные инструменты', description: 'Изучаем звуки: погремушки, барабан, колокольчики', duration: '10 мин', category: 'Творчество', premium: true, icon: '🎵' }
    ],
    2: [
      { title: 'Собираем пирамидку', description: 'Развиваем мелкую моторику и понимание размеров', duration: '15 мин', category: 'Логика', premium: false, icon: '📐' },
      { title: 'Рисование пальчиками', description: 'Творческое развитие с безопасными красками', duration: '25 мин', category: 'Творчество', premium: false, icon: '🎨' },
      { title: 'Игра в прятки', description: 'Развиваем понимание постоянства объектов', duration: '20 мин', category: 'Развитие', premium: true, icon: '👁️' }
    ]
  };

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

  // Главный экран (без изменений)
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

  // НОВЫЙ Экран прогресса
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
          {/* Weekly Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Эта неделя</h2>
              <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-green-800">
                  🔥 {child.streak} дней подряд
                </span>
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

          {/* Skills Development */}
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

          {/* Achievements */}
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
                  
                  {achievement.unlocked && achievement.date && (
                    <p className="text-xs text-yellow-700 mt-2">
                      Получено: {new Date(achievement.date).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
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

  // Экран активностей (без изменений)
  if (currentScreen === 'activities') {
    const childActivities = activities[child.age] || [];
    const freeActivities = childActivities.filter(a => !a.premium);
    const premiumActivities = childActivities.filter(a => a.premium);

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
              <h1 className="text-xl font-bold text-gray-800">Активности</h1>
              <p className="text-sm text-gray-600">{child.age} {getAgeText(child.age)} • {childActivities.length} активностей</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-green-500 mr-2">🆓</span>
              Бесплатные активности ({freeActivities.length})
            </h2>
            <div className="space-y-3">
              {freeActivities.map((activity, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{activity.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                              {activity.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              ⏱️ {activity.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-11">{activity.description}</p>
                    </div>
                    <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                      Начать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-yellow-500 mr-2">👑</span>
              Премиум активности ({premiumActivities.length})
            </h2>
            <div className="space-y-3">
              {premiumActivities.map((activity, index) => (
                <div key={index} className={`bg-white rounded-xl p-4 shadow-sm ${!isPremium ? 'opacity-75' : 'hover:shadow-md transition-shadow'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{activity.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800 flex items-center">
                            {activity.title}
                            {!isPremium && <span className="ml-2 text-gray-400">🔒</span>}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                              {activity.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              ⏱️ {activity.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-11">{activity.description}</p>
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
                      {isPremium ? 'Начать' : 'Премиум'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isPremium && premiumActivities.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">🚀 Разблокируй все возможности!</h3>
              <p className="text-sm opacity-90 mb-4">
                Получи доступ к {premiumActivities.length} премиум активностям и персональным программам развития
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

  // Настройки (без изменений)
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
            <h1 className="text-xl font-bold text-gray-800">Настройки</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Информация о ребенке</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                <input 
                  type="text" 
                  value={child.name}
                  onChange={(e) => setChild({...child, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите имя ребенка"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Возраст</label>
                <select 
                  value={child.age}
                  onChange={(e) => setChild({...child, age: parseInt(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7].map(age => (
                    <option key={age} value={age}>{age} {getAgeText(age)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Подписка</h2>
            {isPremium ? (
              <div className="text-center py-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">👑</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Премиум активен</h3>
                <p className="text-gray-600">Все активности разблокированы</p>
                <button 
                  onClick={() => setIsPremium(false)}
                  className="mt-4 text-red-600 hover:text-red-700 text-sm"
                >
                  Отключить премиум (для теста)
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Разблокируй все возможности</h3>
                <p className="text-gray-600 mb-4">
                  • Неограниченные активности<br/>
                  • Персональные программы<br/>
                  • Подробная аналитика
                </p>
                <button 
                  onClick={() => setIsPremium(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white pxonClick={() => setIsPremium(true)}
                 className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
               >
                 Подписаться - 299₽/мес
               </button>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 }

 // Другие экраны (заглушки)
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
       <p className="text-gray-600 mb-6">Этот функционал будет добавлен в следующих версиях</p>
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
