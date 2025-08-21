import React, { useState, useEffect } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [telegramUser, setTelegramUser] = useState(null);
  const [child, setChild] = useState({
    name: 'Андрей',
    age: 2,
    streak: 7
  });

  // Debug logs
  const [debugLogs, setDebugLogs] = useState([]);
  
  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev, `${time}: ${message}`].slice(-10));
  };

  // Telegram WebApp integration
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
    }
  }, []);

  // Payment functions
const createCardPayment = async () => {
  addLog('🎯 Начинаем оплату картой');
  
  // Проверяем Telegram WebApp
  if (!window.Telegram?.WebApp) {
    addLog('❌ Telegram WebApp недоступен');
    setPaymentStatus('error');
    return;
  }

  const tg = window.Telegram.WebApp;
  addLog(`📱 WebApp версия: ${tg.version}`);
  addLog(`👤 Пользователь: ${tg.initDataUnsafe?.user?.id || 'неизвестен'}`);

  if (!telegramUser?.id) {
    addLog('❌ ID пользователя отсутствует');
    setPaymentStatus('error');
    return;
  }

  setPaymentStatus('processing');
  addLog(`🔑 ID пользователя: ${telegramUser.id}`);

  try {
    addLog('🌐 Отправляем запрос на сервер...');
    
    const response = await fetch('https://telegram-mini-app-production-39d0.up.railway.app/api/telegram/create-invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: telegramUser.id,
        amount: 299,
        description: 'Премиум подписка на 1 месяц'
      })
    });

    addLog(`📡 Статус ответа: ${response.status}`);
    addLog(`📡 Headers: ${JSON.stringify([...response.headers.entries()])}`);
    
    const responseText = await response.text();
    addLog(`📄 Тело ответа: ${responseText}`);
    
    if (response.ok) {
      const data = JSON.parse(responseText);
      addLog(`✅ Данные получены: ${JSON.stringify(data)}`);
      
      // Пока временно активируем премиум для тестирования
      addLog('⚠️ ВРЕМЕННО: Активируем премиум без реального платежа');
      setPaymentStatus('success');
      setIsPremium(true);
      
      setTimeout(() => {
        setShowPayment(false);
        setPaymentStatus('idle');
      }, 3000);
      
    } else {
      addLog(`❌ Ошибка сервера: ${response.status} - ${responseText}`);
      setPaymentStatus('error');
    }
    
} catch (error) {
  addLog(`💥 Критическая ошибка: ${error.name}: ${error.message}`);
  
  if (error.message.includes('Failed to fetch')) {
    addLog('🚫 CORS ошибка - сервер не доступен');
    addLog('🔄 Проверьте настройки CORS на сервере');
    
    // Показываем пользователю понятное сообщение
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert('Ошибка подключения к серверу. Попробуйте позже.');
    }
  }
  
  setPaymentStatus('error');
}
};

  const createStarsPayment = async () => {
    addLog('⭐ Начинаем оплату Stars');
    setPaymentStatus('processing');
    
    // Имитация успешной оплаты Stars
    setTimeout(() => {
      setPaymentStatus('success');
      setIsPremium(true);
      addLog('✅ Оплата Stars успешна (тест)');
      setTimeout(() => {
        setShowPayment(false);
        setPaymentStatus('idle');
      }, 2000);
    }, 1500);
  };

const checkServerStatus = async () => {
  addLog('🔍 Проверяем статус сервера...');
  
  try {
    const response = await fetch('https://telegram-mini-app-production-39d0.up.railway.app/', {
      method: 'GET'
    });
    
    if (response.ok) {
      const data = await response.text();
      addLog(`✅ Сервер работает: ${data}`);
    } else {
      addLog(`⚠️ Сервер отвечает с ошибкой: ${response.status}`);
    }
  } catch (error) {
    addLog(`❌ Сервер недоступен: ${error.message}`);
  }
};
  
  // Activities database
  const activities = {
    2: [
      {
        id: 1,
        title: 'Сортировка по цветам',
        description: 'Изучаем основные цвета и их названия',
        duration: '20 мин',
        category: 'Логика',
        premium: false,
        icon: '🌈'
      },
      {
        id: 2,
        title: 'Рисование пальчиками',
        description: 'Творческое развитие с безопасными красками',
        duration: '25 мин',
        category: 'Творчество',
        premium: false,
        icon: '🎨'
      },
      {
        id: 3,
        title: 'Лепка из пластилина',
        description: 'Развиваем креативность и мелкую моторику',
        duration: '30 мин',
        category: 'Творчество',
        premium: true,
        icon: '🎭'
      }
    ]
  };

  const getActivities = () => activities[child.age] || [];
  const freeActivities = getActivities().filter(a => !a.premium);
  const premiumActivities = getActivities().filter(a => a.premium);

  // Payment Modal
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
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Стоимость:</span>
                <span className="text-2xl font-bold text-purple-600">299₽/мес</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">или 100 ⭐ Telegram Stars</p>
            </div>
            
            {paymentStatus === 'processing' && (
              <div className="mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Обработка платежа...</p>
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <div className="text-green-500 text-2xl mb-2">✅</div>
                <p className="text-green-800 font-semibold">Платеж успешно завершен!</p>
                <p className="text-sm text-green-600">Премиум активирован</p>
              </div>
            )}
            
            {paymentStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-50 rounded-lg">
                <div className="text-red-500 text-2xl mb-2">❌</div>
                <p className="text-red-800 font-semibold">Ошибка платежа</p>
                <p className="text-sm text-red-600">Попробуйте еще раз</p>
              </div>
            )}

            {/* Debug Logs */}
            {debugLogs.length > 0 && (
              <div className="mb-4 p-3 bg-gray-100 rounded-lg text-left">
                <h4 className="text-sm font-bold text-gray-700 mb-2">🔍 Логи отладки:</h4>
                <div className="text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                  {debugLogs.map((log, index) => (
                    <div key={index}>{log}</div>
                  ))}
                </div>
                <button 
                  onClick={() => setDebugLogs([])}
                  className="text-xs text-red-500 mt-2"
                >
                  Очистить логи
                </button>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  addLog(`👤 telegramUser: ${JSON.stringify(telegramUser)}`);
                  addLog(`🌐 window.Telegram: ${!!window.Telegram}`);
                  addLog(`📱 WebApp: ${!!window.Telegram?.WebApp}`);
                }}
                className="w-full bg-gray-500 text-white py-2 rounded-lg font-medium"
              >
                🔍 Проверить данные
              </button>
              <button
  onClick={checkServerStatus}
  className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium"
>
  🔍 Проверить сервер
</button>
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

  // Main Screen
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <PaymentModal />
        
        <div className="bg-white shadow-sm px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Привет, {child.name}! 👋</h1>
              <p className="text-gray-600">Возраст: {child.age} года</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-orange-800">🏆 {child.streak} дней</span>
              </div>
              {isPremium && (
                <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-purple-800">👑 Премиум</span>
                </div>
              )}
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{getActivities().length}</p>
                  <p className="text-sm text-gray-600">Активности</p>
                </div>
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">{isPremium ? 'Премиум' : 'Базовый'}</p>
                  <p className="text-sm text-gray-600">Тариф</p>
                </div>
                <span className="text-2xl">{isPremium ? '👑' : '⭐'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Activities Screen
  if (currentScreen === 'activities') {
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
              <p className="text-sm text-gray-600">{child.age} года • {getActivities().length} активностей</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
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
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
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
                      <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm">
                        Начать
                      </button>
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
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
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
                        onClick={() => isPremium ? null : setShowPayment(true)}
                        className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                          isPremium 
                            ? 'bg-purple-500 text-white hover:bg-purple-600' 
                            : 'bg-gray-300 text-gray-500 cursor-pointer'
                        }`}
                      >
                        {isPremium ? 'Начать' : 'Премиум'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upgrade prompt */}
          {!isPremium && premiumActivities.length > 0 && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">🚀 Разблокируй все активности!</h3>
              <p className="text-sm opacity-90 mb-4">
                Получи доступ к {premiumActivities.length} премиум активностям с детальными инструкциями
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

  return <div>Экран не найден</div>;
};

export default ChildDevelopmentApp;
