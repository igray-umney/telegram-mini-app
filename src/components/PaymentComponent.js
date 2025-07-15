import { useState } from 'react';

const PaymentComponent = ({ selectedPlan = 'premium' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const plans = {
    basic: {
      name: 'Базовый план',
      price: 299,
      description: 'Доступ к базовым активностям',
      features: ['10 активностей', 'Базовая статистика']
    },
    premium: {
      name: 'Премиум план', 
      price: 599,
      description: 'Полный доступ ко всем функциям',
      features: ['Все активности', 'Детальная статистика', 'Персонализация', 'Без рекламы']
    }
  };

  const createPayment = async (planType) => {
    setIsLoading(true);
    
    try {
      const plan = plans[planType];
      
      // Создание платежа через ЮKassa API
      const paymentData = {
        amount: {
          value: plan.price.toString(),
          currency: 'RUB'
        },
        confirmation: {
          type: 'redirect',
          return_url: `${window.location.origin}/payment-success`
        },
        capture: true,
        description: `Подписка "${plan.name}" - Развивайка`,
        metadata: {
          plan: planType,
          user_id: generateUserId()
        }
      };

      // В реальном приложении этот запрос должен идти через ваш бэкенд
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      
      if (result.confirmation?.confirmation_url) {
        // Перенаправление на страницу оплаты
        window.location.href = result.confirmation.confirmation_url;
      }
    } catch (error) {
      console.error('Ошибка создания платежа:', error);
      alert('Ошибка при создании платежа. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="payment-component">
      <div className="plans-grid">
        {Object.entries(plans).map(([key, plan]) => (
          <div key={key} className={`plan-card ${selectedPlan === key ? 'selected' : ''}`}>
            <h3>{plan.name}</h3>
            <div className="price">{plan.price} ₽<span>/месяц</span></div>
            <p>{plan.description}</p>
            <ul className="features">
              {plan.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
            <button 
              onClick={() => createPayment(key)}
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Создание платежа...' : 'Выбрать план'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentComponent;
