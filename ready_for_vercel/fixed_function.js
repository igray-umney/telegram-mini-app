// ИСПРАВЛЕННАЯ ФУНКЦИЯ sendPaymentNotification
// Замените старую функцию на эту:

const sendPaymentNotification = async (paymentType, amount, currency = '₽') => {
  try {
    let userId = telegramUser?.id;
    let userName = telegramUser?.first_name || 'Пользователь';
    let userLastName = telegramUser?.last_name || '';
    
    if (!userId) {
      const urlParams = new URLSearchParams(window.location.search);
      userId = urlParams.get('start_param') || '6266485372';
      console.log('⚠️ No Telegram user found, using fallback userId:', userId);
    }

    const notificationMessage = `🎯 Новая попытка оплаты премиум подписки!

👤 Пользователь: ${userName} ${userLastName}
🆔 ID: ${userId}
👶 Ребенок: ${child.name} (${child.age} ${getAgeText(child.age)})

💳 Способ оплаты: ${paymentType === 'card' ? 'Банковская карта' : 'Telegram Stars'}
💰 Сумма: ${amount}${currency}
📅 Время: ${new Date().toLocaleString('ru-RU')}

✨ Подписка: Премиум на 1 месяц
🎁 Включает: Все активности, персональные программы, подробная аналитика`;

    console.log('📤 Sending payment notification to userId:', userId);
    console.log('🌐 Backend URL:', import.meta.env.REACT_APP_BACKEND_URL);

    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/telegram/payment-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          message: notificationMessage,
          paymentType: paymentType,
          amount: amount,
          currency: currency,
          childInfo: {
            name: child.name,
            age: child.age
          }
        }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        console.log('❌ HTTP Error:', response.status, response.statusText);
        return;
      }

      const result = await response.json();
      console.log('🔄 Backend response:', result);

      if (result.success) {
        console.log('✅ Payment notification sent to Telegram bot');
      } else {
        console.log('❌ Payment notification failed:', result.error);
      }
    } catch (fetchError) {
      console.error('🚫 Fetch error:', fetchError);
      console.error('🚫 Error details:', fetchError.message);
    }
  } catch (error) {
    console.error('❌ Error sending payment notification:', error);
  }
};