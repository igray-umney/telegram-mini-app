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
                <p className="text-2xl font-bold text-purple
