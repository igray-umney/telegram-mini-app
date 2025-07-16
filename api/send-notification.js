// api/send-notification.js
const webpush = require('web-push');

export default async function handler(req, res) {
  // Добавляем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Notification API called');
    
    // Проверяем переменные окружения
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
    
    if (!vapidPublicKey || !vapidPrivateKey) {
      console.error('Missing VAPID keys');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'VAPID keys not configured'
      });
    }

    // Настройка VAPID ключей
    webpush.setVapidDetails(
      'mailto:support@razvivajka.app',
      vapidPublicKey,
      vapidPrivateKey
    );

    const { subscription, message, title } = req.body;

    console.log('Request body:', { subscription: !!subscription, message, title });

    if (!subscription || !message) {
      return res.status(400).json({ error: 'Subscription and message are required' });
    }

    const payload = JSON.stringify({
      title: title || 'Развивайка',
      body: message,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      image: '/icon-192.png',
      data: {
        url: '/',
        timestamp: Date.now()
      },
      actions: [
        {
          action: 'open',
          title: 'Открыть приложение'
        },
        {
          action: 'close',
          title: 'Закрыть'
        }
      ],
      requireInteraction: true,
      vibrate: [100, 50, 100]
    });

    console.log('Sending notification with payload:', payload);

    const result = await webpush.sendNotification(subscription, payload);
    
    console.log('Notification sent successfully:', result);
    
    res.status(200).json({ 
      success: true, 
      message: 'Notification sent successfully',
      result: result
    });
    
  } catch (error) {
    console.error('Error sending notification:', error);
    
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
