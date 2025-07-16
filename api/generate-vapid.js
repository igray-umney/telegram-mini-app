// api/generate-vapid.js
import webpush from 'web-push';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Генерируем VAPID ключи
    const vapidKeys = webpush.generateVAPIDKeys();
    
    res.status(200).json({
      publicKey: vapidKeys.publicKey,
      privateKey: vapidKeys.privateKey,
      instructions: [
        '1. Добавьте эти ключи в переменные окружения Vercel:',
        '   VAPID_PUBLIC_KEY = ' + vapidKeys.publicKey,
        '   VAPID_PRIVATE_KEY = ' + vapidKeys.privateKey,
        '2. Также добавьте в переменные:',
        '   REACT_APP_VAPID_PUBLIC_KEY = ' + vapidKeys.publicKey,
        '3. После добавления переменных, пересоберите приложение'
      ]
    });
  } catch (error) {
    console.error('Error generating VAPID keys:', error);
    res.status(500).json({ error: 'Failed to generate VAPID keys' });
  }
}
