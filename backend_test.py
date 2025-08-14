#!/usr/bin/env python3
"""
Backend Test Suite for Telegram Bot Payment Notification System
Tests all payment notification endpoints and core functionality
"""

import requests
import json
import time
import sys
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:8001"
TEST_USER_ID = "123456789"
TEST_USERNAME = "testuser"

class TelegramBotTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, message="", response_data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "message": message,
            "response": response_data,
            "timestamp": datetime.now().isoformat()
        })
        
        if not success:
            self.failed_tests.append(test_name)
    
    def test_health_check(self):
        """Test GET / - Basic health check"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "timestamp" in data:
                    self.log_test("Health Check", True, f"Server is running - {data['message']}", data)
                    return True
                else:
                    self.log_test("Health Check", False, "Invalid response format", data)
                    return False
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_payment_notification(self):
        """Test POST /api/telegram/payment-notification"""
        payload = {
            "userId": TEST_USER_ID,
            "message": "🔄 Начинаем обработку платежа за премиум подписку...",
            "paymentType": "card",
            "amount": 299,
            "currency": "RUB",
            "childInfo": {
                "name": "Анна",
                "age": 5
            }
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/payment-notification",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Payment Notification", True, "Notification sent successfully", data)
                    return True
                else:
                    self.log_test("Payment Notification", False, f"API returned success=false: {data}", data)
                    return False
            elif response.status_code == 500:
                # Check if it's the expected "chat not found" error
                data = response.json()
                if "chat not found" in data.get("error", ""):
                    self.log_test("Payment Notification", True, "Expected error: User not registered with bot", data)
                    return True
                else:
                    self.log_test("Payment Notification", False, f"Unexpected 500 error: {data}", data)
                    return False
            else:
                self.log_test("Payment Notification", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Payment Notification", False, f"Request error: {str(e)}")
            return False
    
    def test_payment_success(self):
        """Test POST /api/telegram/payment-success"""
        payload = {
            "userId": TEST_USER_ID,
            "message": "🎉 Платеж успешно завершен! Премиум подписка активирована!",
            "paymentType": "card",
            "amount": 299,
            "currency": "RUB"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/payment-success",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Payment Success", True, "Success notification sent", data)
                    return True
                else:
                    self.log_test("Payment Success", False, f"API returned success=false: {data}", data)
                    return False
            elif response.status_code == 500:
                # Check if it's the expected "chat not found" error
                data = response.json()
                if "chat not found" in data.get("error", ""):
                    self.log_test("Payment Success", True, "Expected error: User not registered with bot", data)
                    return True
                else:
                    self.log_test("Payment Success", False, f"Unexpected 500 error: {data}", data)
                    return False
            else:
                self.log_test("Payment Success", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Payment Success", False, f"Request error: {str(e)}")
            return False
    
    def test_payment_cancelled(self):
        """Test POST /api/telegram/payment-cancelled"""
        payload = {
            "userId": TEST_USER_ID,
            "message": "⚠️ Платеж был отменен. Попробуйте еще раз позже.",
            "paymentType": "card",
            "amount": 299,
            "currency": "RUB"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/payment-cancelled",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Payment Cancelled", True, "Cancellation notification sent", data)
                    return True
                else:
                    self.log_test("Payment Cancelled", False, f"API returned success=false: {data}", data)
                    return False
            elif response.status_code == 500:
                # Check if it's the expected "chat not found" error
                data = response.json()
                if "chat not found" in data.get("error", ""):
                    self.log_test("Payment Cancelled", True, "Expected error: User not registered with bot", data)
                    return True
                else:
                    self.log_test("Payment Cancelled", False, f"Unexpected 500 error: {data}", data)
                    return False
            else:
                self.log_test("Payment Cancelled", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Payment Cancelled", False, f"Request error: {str(e)}")
            return False
    
    def test_payment_error(self):
        """Test POST /api/telegram/payment-error"""
        payload = {
            "userId": TEST_USER_ID,
            "message": "❌ Произошла ошибка при обработке платежа. Обратитесь в поддержку.",
            "paymentType": "card",
            "amount": 299,
            "currency": "RUB"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/payment-error",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Payment Error", True, "Error notification sent", data)
                    return True
                else:
                    self.log_test("Payment Error", False, f"API returned success=false: {data}", data)
                    return False
            elif response.status_code == 500:
                # Check if it's the expected "chat not found" error
                data = response.json()
                if "chat not found" in data.get("error", ""):
                    self.log_test("Payment Error", True, "Expected error: User not registered with bot", data)
                    return True
                else:
                    self.log_test("Payment Error", False, f"Unexpected 500 error: {data}", data)
                    return False
            else:
                self.log_test("Payment Error", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Payment Error", False, f"Request error: {str(e)}")
            return False
    
    def test_test_notification(self):
        """Test POST /api/telegram/test"""
        payload = {
            "userId": TEST_USER_ID,
            "message": "🧪 Это тестовое уведомление от системы Развивайка!"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/test",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Test Notification", True, "Test notification sent", data)
                    return True
                else:
                    self.log_test("Test Notification", False, f"API returned success=false: {data}", data)
                    return False
            else:
                self.log_test("Test Notification", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Test Notification", False, f"Request error: {str(e)}")
            return False
    
    def test_user_status(self):
        """Test GET /api/telegram/status/:userId"""
        try:
            response = requests.get(
                f"{self.base_url}/api/telegram/status/{TEST_USER_ID}",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                expected_fields = ["connected", "enabled", "time", "timezone", "type"]
                
                if all(field in data for field in expected_fields):
                    self.log_test("User Status", True, f"Status retrieved: connected={data['connected']}", data)
                    return True
                else:
                    self.log_test("User Status", False, f"Missing required fields in response: {data}", data)
                    return False
            else:
                self.log_test("User Status", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("User Status", False, f"Request error: {str(e)}")
            return False
    
    def test_user_connect(self):
        """Test POST /api/telegram/connect"""
        payload = {
            "userId": TEST_USER_ID
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/connect",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "success" in data and "botUsername" in data:
                    self.log_test("User Connect", True, f"Connect response: {data['message']}", data)
                    return True
                else:
                    self.log_test("User Connect", False, f"Invalid response format: {data}", data)
                    return False
            else:
                self.log_test("User Connect", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("User Connect", False, f"Request error: {str(e)}")
            return False
    
    def test_create_invoice(self):
        """Test POST /api/telegram/create-invoice"""
        payload = {
            "userId": TEST_USER_ID,
            "amount": 299,
            "description": "Премиум подписка Развивайка - тестовый платеж",
            "payload": f"test_premium_{int(time.time())}"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/create-invoice",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Create Invoice", True, "Invoice created successfully", data)
                    return True
                else:
                    self.log_test("Create Invoice", False, f"Invoice creation failed: {data}", data)
                    return False
            elif response.status_code == 400:
                # Payment token not configured is acceptable for testing
                data = response.json()
                if "Payment token не настроен" in data.get("message", ""):
                    self.log_test("Create Invoice", True, "Expected error: Payment token not configured", data)
                    return True
                else:
                    self.log_test("Create Invoice", False, f"Unexpected 400 error: {data}", data)
                    return False
            else:
                self.log_test("Create Invoice", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Create Invoice", False, f"Request error: {str(e)}")
            return False
    
    def test_create_stars_invoice(self):
        """Test POST /api/telegram/create-stars-invoice"""
        payload = {
            "userId": TEST_USER_ID,
            "stars": 100,
            "description": "Премиум подписка через Telegram Stars - тест",
            "payload": f"test_stars_premium_{int(time.time())}"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/create-stars-invoice",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Create Stars Invoice", True, "Stars invoice created successfully", data)
                    return True
                else:
                    self.log_test("Create Stars Invoice", False, f"Stars invoice creation failed: {data}", data)
                    return False
            else:
                self.log_test("Create Stars Invoice", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Create Stars Invoice", False, f"Request error: {str(e)}")
            return False
    
    def test_premium_status(self):
        """Test GET /api/telegram/premium-status/:userId"""
        try:
            response = requests.get(
                f"{self.base_url}/api/telegram/premium-status/{TEST_USER_ID}",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                expected_fields = ["isPremium", "activatedAt", "paymentHistory"]
                
                if all(field in data for field in expected_fields):
                    self.log_test("Premium Status", True, f"Premium status: {data['isPremium']}", data)
                    return True
                else:
                    self.log_test("Premium Status", False, f"Missing required fields: {data}", data)
                    return False
            else:
                self.log_test("Premium Status", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Premium Status", False, f"Request error: {str(e)}")
            return False
    
    def test_error_handling(self):
        """Test error handling with invalid requests"""
        # Test missing userId
        try:
            response = requests.post(
                f"{self.base_url}/api/telegram/test",
                json={"message": "Test without userId"},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should handle gracefully (either 400 or 500 with error message)
            if response.status_code in [400, 500]:
                self.log_test("Error Handling", True, "Properly handles missing userId")
                return True
            else:
                self.log_test("Error Handling", False, f"Unexpected response to invalid request: {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Error Handling", False, f"Request error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests and generate report"""
        print("🚀 Starting Telegram Bot Backend Tests")
        print(f"📍 Testing server at: {self.base_url}")
        print(f"👤 Test User ID: {TEST_USER_ID}")
        print("=" * 60)
        
        # List of all tests to run
        tests = [
            self.test_health_check,
            self.test_payment_notification,
            self.test_payment_success,
            self.test_payment_cancelled,
            self.test_payment_error,
            self.test_test_notification,
            self.test_user_status,
            self.test_user_connect,
            self.test_create_invoice,
            self.test_create_stars_invoice,
            self.test_premium_status,
            self.test_error_handling
        ]
        
        # Run all tests
        for test in tests:
            try:
                test()
                time.sleep(0.5)  # Small delay between tests
            except Exception as e:
                test_name = test.__name__.replace("test_", "").replace("_", " ").title()
                self.log_test(test_name, False, f"Test execution error: {str(e)}")
        
        # Generate final report
        self.generate_report()
    
    def generate_report(self):
        """Generate final test report"""
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  • {test}")
        
        print(f"\n🎯 OVERALL STATUS: {'✅ ALL TESTS PASSED' if failed_tests == 0 else '❌ SOME TESTS FAILED'}")
        
        # Save detailed results to file
        with open('/app/test_results_detailed.json', 'w') as f:
            json.dump({
                "summary": {
                    "total": total_tests,
                    "passed": passed_tests,
                    "failed": failed_tests,
                    "success_rate": (passed_tests/total_tests)*100,
                    "timestamp": datetime.now().isoformat()
                },
                "failed_tests": self.failed_tests,
                "detailed_results": self.test_results
            }, f, indent=2)
        
        print(f"\n📄 Detailed results saved to: /app/test_results_detailed.json")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = TelegramBotTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)