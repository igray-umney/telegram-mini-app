// Telegram Web App интеграция

class TelegramWebApp {
  constructor() {
    this.tg = window.Telegram?.WebApp;
    this.initData = null;
    this.user = null;
    this.isPremium = false;
    
    if (this.tg) {
      this.init();
    }
  }
  
  init() {
    // Разворачиваем приложение на весь экран
    this.tg.expand();
    
    // Включаем кнопку закрытия
    this.tg.enableClosingConfirmation();
    
    // Устанавливаем цвет заголовка
    this.tg.setHeaderColor('#6366f1');
    
    // Получаем данные пользователя
    this.initData = this.tg.initDataUnsafe;
    this.user = this.initData?.user;
    
    // Проверяем премиум статус из URL параметров
    const urlParams = new URLSearchParams(window.location.search);
    this.isPremium = urlParams.get('premium') === 'true';
    
    // Настраиваем главную кнопку
    this.setupMainButton();
    
    // Настраиваем кнопку назад
    this.setupBackButton();
  }
  
  setupMainButton() {
    if (!this.tg) return;
    
    this.tg.MainButton.setParams({
      text: 'Купить Premium 👑',
      color: '#8b5cf6',
      text_color: '#ffffff',
      is_visible: !this.isPremium,
      is_active: true
    });
    
    this.tg.MainButton.onClick(() => {
      this.requestPremium();
    });
  }
  
  setupBackButton() {
    if (!this.tg) return;
    
    this.tg.BackButton.onClick(() => {
      this.tg.close();
    });
  }
  
  showBackButton() {
    if (this.tg) {
      this.tg.BackButton.show();
    }
  }
  
  hideBackButton() {
    if (this.tg) {
      this.tg.BackButton.hide();
    }
  }
  
  requestPremium() {
    if (!this.tg) return;
    
    // Отправляем запрос на покупку премиума боту
    this.tg.sendData(JSON.stringify({
      action: 'buy_premium',
      user_id: this.user?.id
    }));
  }
  
  // Показать уведомление
  showNotification(message) {
    if (this.tg) {
      this.tg.showPopup({
        title: 'Уведомление',
        message: message,
        buttons: [{
          type: 'ok'
        }]
      });
    } else {
      alert(message);
    }
  }
  
  // Показать подтверждение
  showConfirm(title, message, callback) {
    if (this.tg) {
      this.tg.showPopup({
        title: title,
        message: message,
        buttons: [
          { id: 'yes', type: 'default', text: 'Да' },
          { id: 'no', type: 'cancel' }
        ]
      }, (buttonId) => {
        callback(buttonId === 'yes');
      });
    } else {
      callback(confirm(message));
    }
  }
  
  // Вибрация
  hapticFeedback(type = 'light') {
    if (this.tg) {
      switch(type) {
        case 'light':
          this.tg.HapticFeedback.impactOccurred('light');
          break;
        case 'medium':
          this.tg.HapticFeedback.impactOccurred('medium');
          break;
        case 'heavy':
          this.tg.HapticFeedback.impactOccurred('heavy');
          break;
        case 'error':
          this.tg.HapticFeedback.notificationOccurred('error');
          break;
        case 'success':
          this.tg.HapticFeedback.notificationOccurred('success');
          break;
        case 'warning':
          this.tg.HapticFeedback.notificationOccurred('warning');
          break;
      }
    }
  }
  
  // Готовность приложения
  ready() {
    if (this.tg) {
      this.tg.ready();
    }
  }
  
  // Закрыть приложение
  close() {
    if (this.tg) {
      this.tg.close();
    }
  }
  
  // Открыть ссылку
  openLink(url) {
    if (this.tg) {
      this.tg.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  }
  
  // Открыть счет Telegram
  openInvoice(url) {
    if (this.tg) {
      this.tg.openInvoice(url);
    }
  }
  
  // Данные пользователя
  getUserData() {
    return {
      id: this.user?.id || null,
      first_name: this.user?.first_name || 'Пользователь',
      last_name: this.user?.last_name || '',
      username: this.user?.username || '',
      language_code: this.user?.language_code || 'ru',
      is_premium: this.isPremium
    };
  }
  
  // Сохранить данные в облако Telegram
  async saveToCloud(key, value) {
    if (this.tg && this.tg.CloudStorage) {
      return new Promise((resolve, reject) => {
        this.tg.CloudStorage.setItem(key, JSON.stringify(value), (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }
    // Fallback на localStorage
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
  }
  
  // Получить данные из облака Telegram
  async getFromCloud(key) {
    if (this.tg && this.tg.CloudStorage) {
      return new Promise((resolve, reject) => {
        this.tg.CloudStorage.getItem(key, (error, value) => {
          if (error) {
            reject(error);
          } else {
            try {
              resolve(value ? JSON.parse(value) : null);
            } catch (e) {
              resolve(value);
            }
          }
        });
      });
    }
    // Fallback на localStorage
    const value = localStorage.getItem(key);
    return Promise.resolve(value ? JSON.parse(value) : null);
  }
  
  // Обновить тему
  updateTheme() {
    if (this.tg) {
      const theme = this.tg.themeParams;
      document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color || '#000000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', theme.hint_color || '#999999');
      document.documentElement.style.setProperty('--tg-theme-link-color', theme.link_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-color', theme.button_color || '#5288c1');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', theme.button_text_color || '#ffffff');
    }
  }
}

// Создаем глобальный экземпляр
const telegram = new TelegramWebApp();

export default telegram;
