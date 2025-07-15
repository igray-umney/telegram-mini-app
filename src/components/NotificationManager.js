import { useState, useEffect } from 'react';

const NotificationManager = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    }
  };

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === 'granted') {
      await subscribeUser();
    }
  };

  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
      });
      
      // Отправить подписку на сервер
      console.log('Subscription:', subscription);
      setIsSubscribed(true);
      
      // Здесь можно сохранить subscription в localStorage или отправить на сервер
      localStorage.setItem('pushSubscription', JSON.stringify(subscription));
    } catch (error) {
      console.error('Ошибка подписки:', error);
    }
  };

  const scheduleNotification = (minutes = 60) => {
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('Развивайка', {
          body: 'Время для новой активности!',
          icon: '/icon-192.png'
        });
      }
    }, minutes * 60 * 1000);
  };

  if (permission === 'denied') {
    return (
      <div className="notification-block">
        <p>Уведомления отключены. Включите их в настройках браузера.</p>
      </div>
    );
  }

  return (
    <div className="notification-manager">
      {permission !== 'granted' ? (
        <button 
          onClick={requestPermission}
          className="btn btn-primary"
        >
          🔔 Включить напоминания
        </button>
      ) : (
        <div>
          <p>✅ Напоминания включены</p>
          <button 
            onClick={() => scheduleNotification(1)}
            className="btn btn-secondary"
          >
            Тестовое уведомление (через 1 мин)
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;
