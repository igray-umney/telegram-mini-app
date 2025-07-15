import React, { useState, useEffect } from 'react';
import './styles/mobile.css';

function App() {
  const [selectedAge, setSelectedAge] = useState('2');
  const [showPayment, setShowPayment] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Простая проверка премиума без сложной логики
  useEffect(() => {
    try {
      const premium = localStorage.getItem('isPremium');
      setIsPremium(premium === 'true');
    } catch (error) {
      console.log('LocalStorage error:', error);
    }
  }, []);

  // Простая функция для уведомлений
  const requestNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Развивайка', {
            body: 'Уведомления включены! 🎉',
            icon: '/favicon.ico'
          });
        }
      });
    } else {
      alert('Ваш браузер не поддерживает уведомления');
    }
  };

  // Простая функция активности
  const startActivity = (activity) => {
    alert(`🎯 Начинаем: "${activity}"!\n\nЭто демо-версия приложения.`);
  };

  // Простая функция оплаты
  const handlePayment = () => {
    localStorage.setItem('isPremium', 'true');
    setIsPremium(true);
    setShowPayment(false);
    alert('✅ Премиум активирован (демо)!');
  };

  const ages = ['1 год', '2 года', '3 года', '4 года', '5 лет', '6 лет', '7 лет'];
  
  const activities = {
    '1': ['Пальчиковые игры', 'Музыкальные игрушки', 'Сенсорные мешочки'],
    '2': ['Сортировка по цветам', 'Простые пазлы', 'Лепка из пластилина'],
    '3': ['Изучение букв', 'Счет до 10', 'Рисование пальчиками'],
    '4': ['Чтение по слогам', 'Математические игры', 'Конструирование'],
    '5': ['Подготовка к письму', 'Логические задачи', 'Творческие проекты'],
    '6': ['Чтение книг', 'Решение примеров', 'Научные эксперименты'],
    '7': ['Развитие речи', 'Сложные задачи', 'Командные игры']
  };

  return (
    <div className="App">
      {/* Заголовок */}
      <header className="main-header">
        <h1>👋 Привет, Андрей! 👶</h1>
        <p className="age-info">Возраст: 2 года</p>
      </header>

      <main className="container">
        {/* Премиум баннер */}
        {!isPremium && (
          <div className="premium-banner">
            <div className="premium-content">
              <h3>🌟 Премиум подписка</h3>
              <p>Откройте все активности и возможности</p>
              <button 
                onClick={() => setShowPayment(true)}
                className="btn btn-primary premium-btn"
              >
                Подключить
              </button>
            </div>
          </div>
        )}

        {/* Успешный премиум */}
        {isPremium && (
          <div className="premium-active">
            <div className="premium-content">
              <h3>✨ Премиум активен</h3>
              <p>У вас есть доступ ко всем функциям!</p>
            </div>
          </div>
        )}

        {/* Уведомления */}
        <div className="notification-banner">
          <div className="notification-content">
            <span>🔔</span>
            <div>
              <h4>Включить напоминания</h4>
              <p>Получайте уведомления о времени активностей</p>
            </div>
            <button 
              onClick={requestNotifications}
              className="btn btn-secondary"
            >
              Включить
            </button>
          </div>
        </div>

        {/* Выбор возраста */}
        <section className="age-selection">
          <h2>Тест возрастов:</h2>
          <div className="age-selector">
            {ages.map((age, index) => (
              <button
                key={index}
                className={`age-button ${selectedAge === (index + 1).toString() ? 'active' : ''}`}
                onClick={() => setSelectedAge((index + 1).toString())}
              >
                {age}
              </button>
            ))}
          </div>
        </section>

        {/* Активности */}
        <section className="activities-section">
          <h2>⏰ Время для развития!</h2>
          <p className="activities-subtitle">Выбери активность для Андрей</p>
          
          <div className="activity-grid">
            {activities[selectedAge] && activities[selectedAge].map((activity, index) => (
              <div key={index} className="activity-card">
                <div className="activity-icon">
                  {index === 0 ? '📚' : index === 1 ? '🎯' : '🔬'}
                </div>
                <h3>{activity}</h3>
                <button 
                  className="btn btn-primary activity-btn"
                  onClick={() => startActivity(activity)}
                >
                  Начать активность
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Статистика */}
        <section className="stats-section">
          <div className="stats-card" onClick={() => alert('📊 Статистика: 12.5 часов развития')}>
            <div className="stats-icon">📊</div>
            <div className="stats-info">
              <h3>12.5ч</h3>
              <p>Время развития</p>
            </div>
          </div>
        </section>

        {/* Разделы */}
        <section className="sections-grid">
          <div className="section-card" onClick={() => alert('📈 Раздел "Прогресс" скоро будет доступен!')}>
            <div className="section-icon">📈</div>
            <h3>Прогресс</h3>
            <p>Отслеживайте успехи</p>
          </div>
          <div className="section-card" onClick={() => alert('📚 Библиотека материалов скоро будет доступна!')}>
            <div className="section-icon">📚</div>
            <h3>Библиотека</h3>
            <p>Коллекция материалов</p>
          </div>
        </section>
      </main>

      {/* Модальное окно оплаты */}
      {showPayment && (
        <div className="modal-overlay" onClick={() => setShowPayment(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💳 Выберите план</h2>
              <button 
                onClick={() => setShowPayment(false)}
                className="modal-close"
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <div className="plan-card featured">
                <h3>Премиум план</h3>
                <div className="price">599 ₽<span>/месяц</span></div>
                <ul className="features">
                  <li>✓ Все активности</li>
                  <li>✓ Детальная статистика</li>
                  <li>✓ Персонализация</li>
                  <li>✓ Без рекламы</li>
                  <li>✓ Push-уведомления</li>
                </ul>
                <button 
                  className="btn btn-primary"
                  onClick={handlePayment}
                >
                  Выбрать план (ДЕМО)
                </button>
                <p style={{fontSize: '0.8rem', color: '#666', marginTop: '10px'}}>
                  * Это демо-версия оплаты
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
