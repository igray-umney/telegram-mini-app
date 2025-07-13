import React, { useState } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);

  if (currentScreen === 'main') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #e0f2fe 0%, #f3e5f5 100%)',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: '0 0 5px 0'
          }}>
            Привет, Максим! 👋
          </h1>
          <p style={{ 
            color: '#6b7280', 
            margin: 0 
          }}>
            Возраст: 3 года
          </p>
        </div>

        {/* Premium Banner */}
        {!isPremium && (
          <div style={{ 
            margin: '20px', 
            background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
            borderRadius: '12px', 
            padding: '16px', 
            color: 'white'
          }}>
            <h3 style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>
              👑 Премиум подписка
            </h3>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 12px 0' }}>
              Открой все активности и возможности
            </p>
            <button 
              onClick={() => setIsPremium(true)}
              style={{
                backgroundColor: 'white',
                color: '#9333ea',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Подключить
            </button>
          </div>
        )}

        {/* Main Content */}
        <div style={{ padding: '20px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: '32px'
            }}>
              ▶️
            </div>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#1f2937', 
              margin: '0 0 8px 0' 
            }}>
              Время для развития!
            </h2>
            <p style={{ 
              color: '#6b7280', 
              margin: '0 0 24px 0' 
            }}>
              Выбери активность для Максим
            </p>
            
            <button 
              onClick={() => setCurrentScreen('activities')}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '500',
                cursor: 'pointer',
                transform: 'scale(1)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Начать активность
            </button>
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <p style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#3b82f6', 
                margin: '0 0 4px 0' 
              }}>
                24
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280', 
                margin: 0 
              }}>
                Активности
              </p>
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <p style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#9333ea', 
                margin: '0 0 4px 0' 
              }}>
                12ч
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280', 
                margin: 0 
              }}>
                Время развития
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '16px'
          }}>
            <button 
              onClick={() => setCurrentScreen('progress')}
              style={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📅</div>
              <p style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#1f2937', 
                margin: 0 
              }}>
                Прогресс
              </p>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              style={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📚</div>
              <p style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#1f2937', 
                margin: 0 
              }}>
                Библиотека
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Activities Screen
  if (currentScreen === 'activities') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentScreen('main')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                marginRight: '16px'
              }}
            >
              ←
            </button>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0
            }}>
              Активности (3 года)
            </h1>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '16px' 
          }}>
            Бесплатные активности
          </h2>
          
          <div style={{ marginBottom: '32px' }}>
            {[
              { title: 'Сортировка по цветам', description: 'Изучаем цвета и формы', duration: '20 мин' },
              { title: 'Простые пазлы', description: 'Развиваем логику', duration: '25 мин' }
            ].map((activity, index) => (
              <div key={index} style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '16px',
                marginBottom: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      margin: '0 0 4px 0' 
                    }}>
                      {activity.title}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6b7280', 
                      margin: '0 0 8px 0' 
                    }}>
                      {activity.description}
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#9ca3af', 
                      margin: 0 
                    }}>
                      ⏱️ {activity.duration}
                    </p>
                  </div>
                  <button style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Начать
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center'
          }}>
            👑 Премиум активности
          </h2>
          
          {[
            { title: 'Ролевые игры', description: 'Играем в доктора или повара', duration: '30 мин' },
            { title: 'Изучаем алфавит', description: 'Первые буквы и звуки', duration: '15 мин' }
          ].map((activity, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '16px',
              marginBottom: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              opacity: isPremium ? 1 : 0.75
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    margin: '0 0 4px 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {activity.title}
                    {!isPremium && <span style={{ marginLeft: '8px' }}>🔒</span>}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280', 
                    margin: '0 0 8px 0' 
                  }}>
                    {activity.description}
                  </p>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#9ca3af', 
                    margin: 0 
                  }}>
                    ⏱️ {activity.duration}
                  </p>
                </div>
                <button 
                  onClick={() => !isPremium && setIsPremium(true)}
                  style={{
                    backgroundColor: isPremium ? '#9333ea' : '#d1d5db',
                    color: isPremium ? 'white' : '#6b7280',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {isPremium ? 'Начать' : 'Премиум'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default return for other screens
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Экран в разработке</h2>
        <button 
          onClick={() => setCurrentScreen('main')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Назад на главную
        </button>
      </div>
    </div>
  );
};

export default ChildDevelopmentApp;
