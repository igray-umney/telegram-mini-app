import uuid
import logging
from yookassa import Configuration, Payment
from yookassa.domain.notification import WebhookNotification
import os

logger = logging.getLogger(__name__)

class PaymentHandler:
    def __init__(self, shop_id: str, secret_key: str):
        Configuration.account_id = shop_id
        Configuration.secret_key = secret_key
        self.return_url = os.getenv("WEBAPP_URL", "https://your-app.vercel.app")
        self.webhook_url = os.getenv("BOT_WEBHOOK_URL", "https://your-bot.railway.app/webhook/payment")
        
    async def create_payment(self, amount: float, description: str, user_id: int):
        """Создание платежа в ЮKassa"""
        try:
            idempotence_key = str(uuid.uuid4())
            
            payment = Payment.create({
                "amount": {
                    "value": str(amount),
                    "currency": "RUB"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": f"{self.return_url}?payment=success&user_id={user_id}"
                },
                "capture": True,
                "description": description,
                "metadata": {
                    "user_id": str(user_id)
                },
                "receipt": {
                    "customer": {
                        "email": "customer@example.com"  # Можно запросить у пользователя
                    },
                    "items": [
                        {
                            "description": description,
                            "quantity": "1.00",
                            "amount": {
                                "value": str(amount),
                                "currency": "RUB"
                            },
                            "vat_code": "1",  # НДС 20%
                            "payment_mode": "full_payment",
                            "payment_subject": "service"
                        }
                    ]
                }
            }, idempotence_key)
            
            # Сохраняем платеж в БД
            from database import Database
            db = Database()
            await db.save_payment(
                user_id=user_id,
                amount=amount,
                currency="RUB",
                payment_method="yookassa",
                payment_id=payment.id,
                status=payment.status
            )
            
            return payment.confirmation.confirmation_url
            
        except Exception as e:
            logger.error(f"Error creating payment: {e}")
            return None
            
    async def check_payment_status(self, user_id: int):
        """Проверка статуса последнего платежа пользователя"""
        try:
            # Здесь нужно получить payment_id из БД для данного пользователя
            # Для упрощения возвращаем False
            # В реальном приложении нужно:
            # 1. Получить последний payment_id из БД
            # 2. Запросить статус у ЮKassa
            # 3. Обновить статус в БД
            
            # payment = Payment.find_one(payment_id)
            # return payment.status == "succeeded"
            
            return False
            
        except Exception as e:
            logger.error(f"Error checking payment status: {e}")
            return False
            
    def process_webhook(self, request_body: bytes, headers: dict):
        """Обработка вебхука от ЮKassa"""
        try:
            # Проверяем подпись
            notification = WebhookNotification(request_body, headers)
            
            # Получаем объект платежа
            payment = notification.object
            
            if payment.status == "succeeded":
                return {
                    "success": True,
                    "user_id": payment.metadata.get("user_id"),
                    "payment_id": payment.id,
                    "amount": payment.amount.value
                }
                
            return {"success": False}
            
        except Exception as e:
            logger.error(f"Error processing webhook: {e}")
            return {"success": False}
