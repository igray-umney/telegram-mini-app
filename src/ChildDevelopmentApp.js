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

  // База мотивирующих сообщений
  const [motivationalMessages] = useState({
    daily: [
      '🌟 Время для развития с {name}! Сегодня изучаем что-то новое?',
      '💫 {name} ждет интересную активность! Что выберем сегодня?',
      '🎯 Продолжаем streak! Уже {streak} дней развиваемся вместе!',
      '🚀 Пора заниматься с {name}! Каждый день - новое открытие!',
      '⭐ {name} готов(а) к новым знаниям! Начинаем?',
      '🎈 Время веселого обучения с {name}!',
      '🌈 Создадим новые воспоминания с {name} сегодня!'
    ],
    streak: [
      '🔥 Невероятно! {streak} дней подряд! {name} настоящий чемпион!',
      '👑 Потрясающий streak - {streak} дней! Продолжаем развиваться!',
      '🏆 {streak} дней занятий! {name} становится умнее каждый день!',
      '⚡ Уже {streak} дней! Вы прекрасные родители!',
      '🎊 {streak} дней развития! {name} гордится вами!'
    ],
    encouragement: [
      '💪 Даже 10 минут занятий принесут пользу {name}!',
      '🌱 Каждая активность помогает {name} расти и развиваться!',
      '❤️ {name} любит проводить время с вами за играми!',
      '🎨 Творчество и игры развивают мозг {name}!',
      '📚 Сегодня {name} может узнать что-то удивительное!'
    ],
    ageSpecific: {
      1: '👶 Малыш {name} познает мир через ощущения!',
      2: '🧸 {name} активно изучает окружающий мир!',
      3: '🎭 {name} готов(а) к ролевым играм и творчеству!',
      4: '🔤 {name} может начать изучать буквы и цифры!',
      5: '📖 {name} готовится к школе - время практиковаться!',
      6: '🎓 {name} развивает важные навыки для школы!',
      7: '🚀 {name} готов(а) к сложным и интересным задачам!'
    }
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
    },
    {
      id: 3,
      message: 'Андрей ждет интересную активность! Что выберем сегодня?',
      timestamp: '2025-01-12 19:00',
      type: 'daily',
      opened: false
    }
  ]);

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

  const getNotificationTypeColor = (type) => {
    const colors = {
      'daily': 'bg-blue-100 text-blue-800',
      'streak': 'bg-orange-100 text-orange-800',
      'encouragement': 'bg-green-100 text-green-800',
      'reminder': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getRandomMessage = (type) => {
    const messages = motivationalMessages[type] || motivationalMessages.daily;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return randomMessage
      .replace('{name}', child.name)
      .replace('{streak}', child.streak);
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
                onClick={() => setCurrentScreen('notifications')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative"
              >
                <span className="text-xl">🔔</span>
                {notificationSettings.enabled && (
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

        {/* Notification Preview */}
        {notificationSettings.enabled && (
          <div className="mx-4 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold flex items-center">
                  🔔 Напоминания включены
                </h3>
                <p className="text-sm opacity-90">Следующее в {notificationSettings.time}</p>
              </div>
              <button 
                onClick={() => setCurrentScreen('notifications')}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors"
              >
                Настроить
              </button>
            </div>
          </div>
        )}

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
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-600">Активности</p>
                </div>
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">4ч</p>
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

  // НОВЫЙ Экран настроек уведомлений
  if (currentScreen === 'notifications') {
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
              <h1 className="text-xl font-bold text-gray-800">Напоминания</h1>
              <p className="text-sm text-gray-600">Настройка уведомлений о занятиях</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          {/* Main Toggle */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Уведомления</h2>
                <p className="text-sm text-gray-600">Включить напоминания о занятиях</p>
              </div>
              <button 
                onClick={() => setNotificationSettings({
                  ...notificationSettings, 
                  enabled: !notificationSettings.enabled
                })}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  notificationSettings.enabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  notificationSettings.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            {notificationSettings.enabled && (
              <div className="space-y-4">
                {/* Time Setting */}
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

                {/* Frequency Setting */}
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

                {/* Custom Days */}
                {notificationSettings.frequency === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Дни недели
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'monday', label: 'Понедельник' },
                        { key: 'tuesday', label: 'Вторник' },
                        { key: 'wednesday', label: 'Среда' },
                        { key: 'thursday', label: 'Четверг' },
                        { key: 'friday', label: 'Пятница' },
                        { key: 'saturday', label: 'Суббота' },
                        { key: 'sunday', label: 'Воскресенье' }
                      ].map((day) => (
                        <button
                          key={day.key}
                          onClick={() => setNotificationSettings({
                            ...notificationSettings,
                            customDays: {
                              ...notificationSettings.customDays,
                              [day.key]: !notificationSettings.customDays[day.key]
                            }
                          })}
                          className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                            notificationSettings.customDays[day.key]
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notification Type */}
          {notificationSettings.enabled && (
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
                    example: 'Время для занятий с Андрей!'
                  },
                  { 
                    value: 'streak', 
                    label: 'С streak', 
                    description: 'Акцент на достижениях и регулярности',
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

          {/* Advanced Settings */}
          {notificationSettings.enabled && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Дополнительные настройки</h2>
              
              {/* Quiet Hours */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">Тихие часы</h3>
                    <p className="text-sm text-gray-600">Не отправлять уведомления ночью</p>
                  </div>
                  <button 
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      quietHours: {
                        ...notificationSettings.quietHours,
                        enabled: !notificationSettings.quietHours.enabled
                      }
                    })}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      notificationSettings.quietHours.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      notificationSettings.quietHours.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>

                {notificationSettings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">С</label>
                      <input 
                        type="time" 
                        value={notificationSettings.quietHours.start}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          quietHours: {
                            ...notificationSettings.quietHours,
                            start: e.target.value
                          }
                        })}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">До</label>
                      <input 
                        type="time" 
                        value={notificationSettings.quietHours.end}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          quietHours: {
                            ...notificationSettings.quietHours,
                            end: e.target.value
                          }
                        })}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Weekend Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Режим выходных</h3>
                  <p className="text-sm text-gray-600">Другое время для выходных</p>
                </div>
                <button 
                  onClick={() => setNotificationSettings({
                    ...notificationSettings,
                    weekendMode: !notificationSettings.weekendMode
                  })}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notificationSettings.weekendMode ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    notificationSettings.weekendMode ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>
          )}

          {/* Test Notification */}
          {notificationSettings.enabled && (
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

              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Отправить тестовое уведомление
              </button>
            </div>
          )}

          {/* Notification History */}
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

  // Остальные экраны (сокращенная версия для экономии места)
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
        <p className="text-gray-600 mb-6">Функционал будет добавлен в следующих версиях</p>
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
