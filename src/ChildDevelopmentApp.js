import React, { useState } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Привет, Максим! 👋</h1>
            <p className="text-gray-600">Возраст: 3 года</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-orange-800">🏆 7 дней</span>
            </div>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
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
            <p className="text-gray-600">Выбери активность для Максим</p>
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
                <p className="text-2xl font-bold text-blue-600">24</p>
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

      {/* Test Buttons */}
      <div className="px-4 pb-6">
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Тест экранов:</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Главная
            </button>
            <button 
              onClick={() => setCurrentScreen('test')}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm"
            >
              Тест
            </button>
          </div>
        </div>
      </div>

      {/* Other screens */}
      {currentScreen !== 'main' && (
        <div className="fixed inset-0 bg-white z-50 p-4">
          <div className="mb-4">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="text-2xl"
            >
              ← Назад
            </button>
          </div>
          <div className="text-center mt-20">
            <h2 className="text-xl font-bold mb-4">Экран: {currentScreen}</h2>
            <p className="text-gray-600 mb-4">Функционал в разработке</p>
            <button 
              onClick={() => setCurrentScreen('main')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildDevelopmentApp;
