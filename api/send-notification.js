// api/send-notification.js
import webpush from 'web-push';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Настройка VAPID ключей
    webpush.setVapidDetails(
      'mailto:your-email@example.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    const { subscription, message, title } = req.body;

    if (!subscription || !message) {
      return res.status(400).json({ error: 'Subscription and message are required' });
    }

    const payload = JSON.stringify({
      title: title || 'Развивайка',
      body: message,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
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
      ]
    });

    const result = await webpush.sendNotification(subscription, payload);
    
    console.log('Notification sent successfully:', result);
    res.status(200).json({ success: true, message: 'Notification sent' });
    
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: error.message 
    });
  }
}
