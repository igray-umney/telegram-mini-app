import React, { useState } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [child, setChild] = useState({
    name: 'Андрей',
    age: 2,
    streak: 7
  });

  // База активностей по возрастам
  const activities = {
    1: [
      { title: 'Сенсорная коробка', description: 'Исследуем разные текстуры: песок, крупы, ткани', duration: '15 мин', category: 'Моторика', premium: false, icon: '🤲' },
      { title: 'Игра с водой', description: 'Переливаем воду между емкостями, развиваем координацию', duration: '20 мин', category: 'Моторика', premium: false, icon: '💧' },
      { title: 'Музыкальные инструменты', description: 'Изучаем звуки: погремушки, барабан, колокольчики', duration: '10 мин', category: 'Творчество', premium: true, icon: '🎵' },
      { title: 'Массаж ладошек', description: 'Стимулируем нервные окончания массажными мячиками', duration: '5 мин', category: 'Развитие', premium: true, icon: '✋' },
      { title: 'Первые слова', description: 'Повторяем простые слова: мама, папа, дай', duration: '10 мин', category: 'Речь', premium: true, icon: '👶' },
      { title: 'Игрушки-вкладыши', description: 'Изучаем размеры: большой-маленький', duration: '15 мин', category: 'Логика', premium: true, icon: '🧩' }
    ],
    2: [
      { title: 'Собираем пирамидку', description: 'Развиваем мелкую моторику и понимание размеров', duration: '15 мин', category: 'Логика', premium: false, icon: '📐' },
      { title: 'Рисование пальчиками', description: 'Творческое развитие с безопасными красками', duration: '25 мин', category: 'Творчество', premium: false, icon: '🎨' },
      { title: 'Игра в прятки', description: 'Развиваем понимание постоянства объектов', duration: '20 мин', category: 'Развитие', premium: true, icon: '👁️' },
      { title: 'Лепка из пластилина', description: 'Развиваем креативность и мелкую моторику', duration: '30 мин', category: 'Творчество', premium: true, icon: '🎭' },
      { title: 'Простые команды', description: 'Учимся выполнять: принеси, дай, покажи', duration: '10 мин', category: 'Речь', premium: true, icon: '🗣️' },
      { title: 'Сортировка игрушек', description: 'Раскладываем по цветам и формам', duration: '20 мин', category: 'Логика', premium: true, icon: '🔄' }
    ],
    3: [
      { title: 'Сортировка по цветам', description: 'Изучаем основные цвета и их названия', duration: '20 мин', category: 'Логика', premium: false, icon: '🌈' },
      { title: 'Простые пазлы', description: 'Пазлы из 4-6 элементов, развиваем логику', duration: '25 мин', category: 'Логика', premium: false, icon: '🧩' },
      { title: 'Ролевые игры', description: 'Играем в доктора, повара, водителя', duration: '30 мин', category: 'Развитие', premium: true, icon: '👨‍⚕️' },
      { title: 'Изучаем алфавит', description: 'Первые буквы в игровой форме', duration: '15 мин', category: 'Речь', premium: true, icon: '🔤' },
      { title: 'Счет до 5', description: 'Изучаем цифры с помощью игрушек', duration: '15 мин', category: 'Логика', premium: true, icon: '🔢' },
      { title: 'Танцы и движения', description: 'Развиваем координацию под музыку', duration: '20 мин', category: 'Моторика', premium: true, icon: '💃' }
    ],
    4: [
      { title: 'Строим из конструктора', description: 'Развиваем пространственное мышление', duration: '35 мин', category: 'Логика', premium: false, icon: '🏗️' },
      { title: 'Считаем до 10', description: 'Основы математики с наглядными примерами', duration: '20 мин', category: 'Логика', premium: false, icon: '🔢' },
      { title: 'Рассказываем истории', description: 'Развиваем речь и фантазию', duration: '25 мин', category: 'Речь', premium: true, icon: '📚' },
      { title: 'Эксперименты с магнитами', description: 'Изучаем физические свойства предметов', duration: '30 мин', category: 'Развитие', premium: true, icon: '🧲' },
      { title: 'Вырезаем ножницами', description: 'Развиваем мелкую моторику (под присмотром)', duration: '15 мин', category: 'Моторика', premium: true, icon: '✂️' },
      { title: 'Изучаем времена года', description: 'Знакомимся с природными циклами', duration: '20 мин', category: 'Развитие', premium: true, icon: '🍂' }
    ],
    5: [
      { title: 'Решаем загадки', description: 'Развиваем логическое мышление', duration: '25 мин', category: 'Логика', premium: false, icon: '🤔' },
      { title: 'Изучаем часы', description: 'Понятие времени: час, минута', duration: '20 мин', category: 'Логика', premium: false, icon: '⏰' },
      { title: 'Готовим вместе', description: 'Практические навыки на кухне', duration: '45 мин', category: 'Развитие', premium: true, icon: '👨‍🍳' },
      { title: 'Изучаем карту мира', description: 'Знакомимся со странами и континентами', duration: '30 мин', category: 'Развитие', premium: true, icon: '🌍' },
      { title: 'Письмо букв', description: 'Подготовка руки к письму', duration: '20 мин', category: 'Моторика', premium: true, icon: '✍️' },
      { title: 'Театральные постановки', description: 'Развиваем актерские способности', duration: '35 мин', category: 'Творчество', premium: true, icon: '🎭' }
    ],
    6: [
      { title: 'Письмо и чтение', description: 'Подготовка к школе: буквы и слоги', duration: '30 мин', category: 'Речь', premium: false, icon: '📝' },
      { title: 'Математические задачи', description: 'Сложение и вычитание в пределах 10', duration: '25 мин', category: 'Логика', premium: false, icon: '➕' },
      { title: 'Научные эксперименты', description: 'Простые опыты: вода, воздух, свет', duration: '40 мин', category: 'Развитие', premium: true, icon: '🔬' },
      { title: 'Изучаем иностранный язык', description: 'Первые английские слова', duration: '20 мин', category: 'Речь', premium: true, icon: '🇬🇧' },
      { title: 'Логические цепочки', description: 'Находим закономерности в последовательностях', duration: '25 мин', category: 'Логика', premium: true, icon: '🔗' },
      { title: 'Создаем комиксы', description: 'Рисуем истории в картинках', duration: '45 мин', category: 'Творчество', premium: true, icon: '💭' }
    ],
    7: [
      { title: 'Чтение книг', description: 'Развиваем навыки чтения и понимания', duration: '30 мин', category: 'Речь', premium: false, icon: '📖' },
      { title: 'Решение примеров', description: 'Математика в пределах 20', duration: '25 мин', category: 'Логика', premium: false, icon: '🧮' },
      { title: 'Проектная работа', description: 'Создаем презентацию на выбранную тему', duration: '50 мин', category: 'Развитие', premium: true, icon: '📊' },
      { title: 'Программирование для детей', description: 'Основы алгоритмического мышления', duration: '35 мин', category: 'Логика', premium: true, icon: '💻' },
      { title: 'Изучаем историю', description: 'Интересные факты о прошлом', duration: '30 мин', category: 'Развитие', premium: true, icon: '🏛️' },
      { title: 'Химические опыты', description: 'Безопасные эксперименты для детей', duration: '40 мин', category: 'Развитие', premium: true, icon: '⚗️' }
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

  // Главный экран
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
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

        {/* Premium Banner */}
        {!isPremium && (
          <div className="mx-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold flex items-center">
                  👑 Премиум подписка
                </h3>
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

        {/* Main Content */}
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{activities[child.age]?.length || 0}</p>
                  <p className="text-sm text-gray-600">Активности</p>
                </div>
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">12ч</p>
                  <p className="text-sm text-gray-600">Время развития</p>
                </div>
                <span className="text-2xl">⏰</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
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
                    child.age === age 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600'
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

  // Экран активностей
  if (currentScreen === 'activities') {
    const childActivities = activities[child.age] || [];
    const freeActivities = childActivities.filter(a => !a.premium);
    const premiumActivities = childActivities.filter(a => a.premium);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
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
          {/* Free Activities */}
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

          {/* Premium Activities */}
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

          {/* Upgrade prompt for non-premium users */}
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

  // Экран настроек
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
          {/* Child Info */}
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

          {/* Premium Status */}
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
