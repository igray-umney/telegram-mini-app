import React, { useState, useEffect } from 'react';
import { Bell, Play, Settings, Star, Calendar, Trophy, Lock, Crown, Clock, Users, Book, Target } from 'lucide-react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [child, setChild] = useState({
    name: 'Максим',
    age: 3,
    streak: 7
  });
  const [notifications, setNotifications] = useState({
    enabled: true,
    time: '19:00',
    frequency: 'daily'
  });

  const activities = {
    1: [
      { title: 'Сенсорная коробка', description: 'Исследуем разные текстуры', duration: '15 мин', premium: false },
      { title: 'Игра с водой', description: 'Переливаем воду между емкостями', duration: '20 мин', premium: false },
      { title: 'Музыкальные инструменты', description: 'Развиваем слух и ритм', duration: '10 мин', premium: true },
      { title: 'Массаж ладошек', description: 'Стимулируем нервные окончания', duration: '5 мин', premium: true }
    ],
    2: [
      { title: 'Собираем пирамидку', description: 'Развиваем мелкую моторику', duration: '15 мин', premium: false },
      { title: 'Рисование пальчиками', description: 'Творческое развитие', duration: '25 мин', premium: false },
      { title: 'Игра в прятки', description: 'Развиваем понимание объектов', duration: '20 мин', premium: true },
      { title: 'Лепка из пластилина', description: 'Развиваем креативность', duration: '30 мин', premium: true }
    ],
    3: [
      { title: 'Сортировка по цветам', description: 'Изучаем цвета и формы', duration: '20 мин', premium: false },
      { title: 'Простые пазлы', description: 'Развиваем логику', duration: '25 мин', premium: false },
      { title: 'Ролевые игры', description: 'Играем в доктора или повара', duration: '30 мин', premium: true },
      { title: 'Изучаем алфавит', description: 'Первые буквы и звуки', duration: '15 мин', premium: true }
    ],
    4: [
      { title: 'Строим из конструктора', description: 'Развиваем пространственное мышление', duration: '35 мин', premium: false },
      { title: 'Считаем до 10', description: 'Основы математики', duration: '20 мин', premium: false },
      { title: 'Рассказываем истории', description: 'Развиваем речь и фантазию', duration: '25 мин', premium: true },
      { title: 'Эксперименты с магнитами', description: 'Изучаем физические свойства', duration: '30 мин', premium: true }
    ],
    5: [
      { title: 'Решаем загадки', description: 'Развиваем логическое мышление', duration: '25 мин', premium: false },
      { title: 'Изучаем часы', description: 'Понятие времени', duration: '20 мин', premium: false },
      { title: 'Готовим вместе', description: 'Практические навыки', duration: '45 мин', premium: true },
      { title: 'Изучаем карту мира', description: 'Расширяем кругозор', duration: '30 мин', premium: true }
    ],
    6: [
      { title: 'Письмо и чтение', description: 'Подготовка к школе', duration: '30 мин', premium: false },
      { title: 'Математические задачи', description: 'Сложение и вычитание', duration: '25 мин', premium: false },
      { title: 'Научные эксперименты', description: 'Изучаем окружающий мир', duration: '40 мин', premium: true },
      { title: 'Изучаем иностранный язык', description: 'Первые английские слова', duration: '20 мин', premium: true }
    ],
    7: [
      { title: 'Чтение книг', description: 'Развиваем навыки чтения', duration: '30 мин', premium: false },
      { title: 'Решение примеров', description: 'Углубляем знания математики', duration: '25 мин', premium: false },
      { title: 'Проектная работа', description: 'Создаем презентацию', duration: '50 мин', premium: true },
      { title: 'Программирование для детей', description: 'Основы алгоритмического мышления', duration: '35 мин', premium: true }
    ]
  };

  const getAgeText = (age) => {
    if (age === 1) return 'год';
    if (age < 5) return 'года';
    return 'лет';
  };

  const MainScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-sm px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Привет, {child.name}! 👋</h1>
            <p className="text-gray-600">Возраст: {child.age} {getAgeText(child.age)}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
              <Trophy className="w-4 h-4 text-orange-600 mr-1" />
              <span className="text-sm font-medium text-orange-800">{child.streak} дней</span>
            </div>
            <button 
              onClick={() => setCurrentScreen('settings')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {!isPremium && (
        <div className="mx-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                Премиум подписка
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

      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
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
                <p className="text-2xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-600">Активности</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">12ч</p>
                <p className="text-sm text-gray-600">Время развития</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setCurrentScreen('progress')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-sm font-medium text-gray-800">Прогресс</p>
          </button>
          <button 
            onClick={() => setCurrentScreen('library')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center mb-2">
              <Book className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-sm font-medium text-gray-800">Библиотека</p>
          </button>
        </div>
      </div>
    </div>
  );

  const ActivitiesScreen = () => {
    const childActivities = activities[child.age] || activities[3];
    const freeActivities = childActivities.filter(a => !a.premium);
    const premiumActivities = childActivities.filter(a => a.premium);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ←
            </button>
            <h1 className="text-xl font-bold text-gray-800">Активности ({child.age} {getAgeText(child.age)})</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Бесплатные активности</h2>
            <div className="space-y-3">
              {freeActivities.map((activity, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{activity.duration}</span>
                      </div>
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                      Начать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Crown className="w-5 h-5 text-yellow-500 mr-2" />
              Премиум активности
            </h2>
            <div className="space-y-3">
              {premiumActivities.map((activity, index) => (
                <div key={index} className={`bg-white rounded-xl p-4 shadow-sm ${!isPremium ? 'opacity-75' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 flex items-center">
                        {activity.title}
                        {!isPremium && <Lock className="w-4 h-4 text-gray-400 ml-2" />}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{activity.duration}</span>
                      </div>
                    </div>
                    <button 
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
        </div>
      </div>
    );
  };

  const SettingsScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => setCurrentScreen('main')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ←
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

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Напоминания</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Включить напоминания</span>
              <button 
                onClick={() => setNotifications({...notifications, enabled: !notifications.enabled})}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  notifications.enabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  notifications.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Время напоминания</label>
              <input 
                type="time" 
                value={notifications.time}
                onChange={(e) => setNotifications({...notifications, time: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Частота</label>
              <select 
                value={notifications.frequency}
                onChange={(e) => setNotifications({...notifications, frequency: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Ежедневно</option>
                <option value="weekly">Еженедельно</option>
                <option value="custom">Настроить</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Подписка</h2>
          {isPremium ? (
            <div className="text-center py-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Премиум активен</h3>
              <p className="text-gray-600">Следующее списание: 15 августа 2025</p>
              <button 
                onClick={() => setIsPremium(false)}
                className="mt-4 text-red-600 hover:text-red-700 text-sm"
              >
                Отменить подписку
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Разблокируй все возможности</h3>
              <p className="text-gray-600 mb-4">• Неограниченные активности<br/>• Персональные программы<br/>• Подробная аналитика</p>
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

  const ProgressScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => setCurrentScreen('main')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-800">Прогресс развития</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Эта неделя</h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{day}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < 5 ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {index < 5 ? '✓' : ''}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Выполнено активностей</span>
              <span className="font-bold text-green-600">15 из 21</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Развитие навыков</h2>
          <div className="space-y-4">
            {[
              { skill: 'Мелкая моторика', progress: 85, color: 'bg-blue-500' },
              { skill: 'Речь и коммуникация', progress: 70, color: 'bg-green-500' },
              { skill: 'Логическое мышление', progress: 60, color: 'bg-purple-500' },
              { skill: 'Творческие способности', progress: 90, color: 'bg-pink-500' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                  <span className="text-sm text-gray-500">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Достижения</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Первая неделя', icon: '🎯', unlocked: true },
              { title: 'Творческий гений', icon: '🎨', unlocked: true },
              { title: 'Маленький исследователь', icon: '🔍', unlocked: false },
              { title: 'Месяц развития', icon: '📅', unlocked: false }
            ].map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                achievement.unlocked 
                  ? 'border-yellow-300 bg-yellow-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h3 className={`font-medium ${
                  achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'
                }`}>{achievement.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LibraryScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => setCurrentScreen('main')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-800">Библиотека</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { title: 'Статьи о развитии', icon: '📚', count: 47 },
            { title: 'Видеоуроки', icon: '🎥', count: 23 },
            { title: 'Игры и активности', icon: '🎮', count: 156 },
            { title: 'Советы экспертов', icon: '👨‍⚕️', count: 12 }
          ].map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-800">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.count} материалов</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Популярные статьи</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Как развивать речь у ребенка 3-4 лет',
                readTime: '5 мин',
                premium: false
              },
              {
                title: 'Лучшие игры для развития мелкой моторики',
                readTime: '7 мин',
                premium: false
              },
              {
                title: 'Подготовка к школе: чек-лист для родителей',
                readTime: '10 мин',
                premium: true
              },
              {
                title: 'Эмоциональное развитие дошкольника',
                readTime: '8 мин',
                premium: true
              }
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 flex items-center">
                    {article.title}
                    {article.premium && <Lock className="w-4 h-4 text-gray-400 ml-2" />}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{article.readTime} чтения</p>
                </div>
                <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  article.premium && !isPremium
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}>
                  Читать
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentScreen === 'main' && <MainScreen />}
      {currentScreen === 'activities' && <ActivitiesScreen />}
      {currentScreen === 'settings' && <SettingsScreen />}
      {currentScreen === 'progress' && <ProgressScreen />}
      {currentScreen === 'library' && <LibraryScreen />}
    </div>
  );
};

export default ChildDevelopmentApp;
