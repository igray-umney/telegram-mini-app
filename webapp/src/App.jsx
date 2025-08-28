import React, { useState, useEffect } from 'react';
import telegram from './telegram';
import ChildDevelopmentApp from './ChildDevelopmentApp'; // Ваш существующий компонент

const App = () => {
  const [userData, setUserData] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Инициализация Telegram Web App
    initializeTelegramApp();
  }, []);

  const initializeTelegramApp = async () => {
    try {
      // Получаем данные пользователя
      const user = telegram.getUserData();
      setUserData(user);
      setIsPremium(user.is_premium);
      
      // Загружаем сохраненные данные из облака
      const savedChild = await telegram.getFromCloud('child_data');
      if (savedChild) {
        // Передаем данные в основное приложение
        window.savedChildData = savedChild;
      }
      
      // Обновляем тему
      telegram.updateTheme();
      
      // Сообщаем Telegram, что приложение готово
      telegram.ready();
      
    } catch (error) {
      console.error('Error initializing Telegram app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработка покупки премиума
  const handlePremiumPurchase = () => {
    telegram.hapticFeedback('medium');
    
    // Показываем попап с выбором способа оплаты
    telegram.showConfirm(
      '👑 Premium подписка',
      'Хотите оформить Premium подписку за 299₽/месяц?\n\nВы получите:\n• Все активности\n• Детальные инструкции\n• Библиотеку статей\n• Видеоуроки',
      (confirmed) => {
        if (confirmed) {
          // Отправляем запрос боту на покупку
          telegram.requestPremium();
          telegram.showNotification('Откройте чат с ботом для оплаты');
          
          // Закрываем Web App чтобы вернуться к боту
          setTimeout(() => {
            telegram.close();
          }, 1000);
        }
      }
    );
  };

  // Сохранение данных ребенка
  const saveChildData = async (childData) => {
    try {
      await telegram.saveToCloud('child_data', childData);
      telegram.hapticFeedback('success');
    } catch (error) {
      console.error('Error saving child data:', error);
      telegram.hapticFeedback('error');
    }
  };

  // Сохранение прогресса активности
  const saveActivityProgress = async (activityData) => {
    try {
      // Отправляем данные боту через sendData
      telegram.tg?.sendData(JSON.stringify({
        action: 'save_activity',
        data: activityData
      }));
      
      // Сохраняем локально в облако
      const activities = await telegram.getFromCloud('activities') || [];
      activities.push({
        ...activityData,
        timestamp: new Date().toISOString()
      });
      await telegram.saveToCloud('activities', activities);
      
      telegram.hapticFeedback('success');
      telegram.showNotification('Активность сохранена! 🎉');
      
    } catch (error) {
      console.error('Error saving activity:', error);
      telegram.hapticFeedback('error');
    }
  };

  // Экран загрузки
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Экран для не-Telegram окружения (разработка)
  if (!telegram.tg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="p-4 bg-yellow-100 border-b border-yellow-300">
          <p className="text-sm text-yellow-800">
            ⚠️ Режим разработки: Telegram Web App API недоступен
          </p>
        </div>
        <ChildDevelopmentApp 
          isPremium={true} // В режиме разработки всегда premium
          onPremiumPurchase={handlePremiumPurchase}
          onSaveChild={saveChildData}
          onSaveActivity={saveActivityProgress}
          userData={{
            first_name: 'Тестовый',
            id: 12345
          }}
        />
      </div>
    );
  }

  // Основное приложение
  return (
    <ChildDevelopmentApp 
      isPremium={isPremium}
      onPremiumPurchase={handlePremiumPurchase}
      onSaveChild={saveChildData}
      onSaveActivity={saveActivityProgress}
      userData={userData}
      telegram={telegram}
    />
  );
};

export default App;
