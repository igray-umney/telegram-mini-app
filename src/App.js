import React, { useEffect, useState } from 'react';
import NotificationManager from './components/NotificationManager';
import PaymentComponent from './components/PaymentComponent';
import './styles/mobile.css';

function App() {
  const [selectedAge, setSelectedAge] = useState('2');
  const [showPayment, setShowPayment] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Регистрация Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    }

    // Проверка статуса подписки
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = () => {
    const premiumStatus = localStorage.getItem('isPremium');
    setIsPremium(premiumStatus === 'true');
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
    <div className="App safe-area-top safe-area-bottom">
      <header className="main-header">
        <h1>👋 Привет, Андрей! 👶</h1>
        <p>Возраст: 2 года</p>
      </header>

      <main className="container">
        {!isPremium && (
          <div className="premium-banner">
            <h3>🌟 Премиум подписка</h3>
            <p>Откройте все активности и возможности</p>
            <button 
              onClick={() => setShowPayment(true)}
              className="btn btn-primary"
            >
              Подключить
            </button>
          </div>
        )}

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

        <section className="activities-section">
          <h2>⏰ Время для развития!</h2>
          <p>Выбери активность для Андрей</p>
          
          <div className="activity-grid">
            {activities[selectedAge]?.map((activity, index) => (
              <div key={index} className="activity-card">
                <h3>{activity}</h3>
                <button className="btn btn-primary">
                  Начать активность
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="progress-section">
          <div className="progress-card">
            <div className="progress-info">
              <div className="progress-icon">📊</div>
              <div>
                <h3>12.5ч</h3>
                <p>Время развития</p>
              </div>
            </div>
          </div>
        </section>

        <section className="library-section">
          <div className="section-grid">
            <div className="section-card">
              <div className="section-icon">📈</div>
              <h3>Прогресс</h3>
            </div>
            <div className="section-card">
              <div className="section-icon">📚</div>
              <h3>Библиотека</h3>
            </div>
          </div>
        </section>
      </main>

      <NotificationManager />

      {showPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <button 
              onClick={() => setShowPayment(false)}
              className="modal-close"
            >
              ✕
            </button>
            <PaymentComponent />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
