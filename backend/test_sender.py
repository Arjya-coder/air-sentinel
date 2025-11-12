"""
Test script to simulate ESP32 sensor data
Sends mock data to the Flask backend for testing
"""

import requests
import time
import random
from datetime import datetime

# Backend URL
# TODO: Update this URL when running on a different machine
BACKEND_URL = 'http://127.0.0.1:5000/data'

def generate_mock_sensor_data():
    """
    Generates realistic mock sensor data
    Simulates different environmental conditions
    """
    scenarios = ['normal', 'interference', 'critical']
    scenario = random.choice(scenarios)
    
    if scenario == 'normal':
        data = {
            "temperature": round(20 + random.uniform(-3, 3), 1),
            "humidity": round(50 + random.uniform(-10, 10), 1),
            "gas": random.randint(100, 200),
            "wifi_rssi": random.randint(-65, -55),
            "rf_noise": random.randint(-100, -90)
        }
    elif scenario == 'interference':
        data = {
            "temperature": round(25 + random.uniform(-5, 5), 1),
            "humidity": round(65 + random.uniform(-15, 15), 1),
            "gas": random.randint(200, 350),
            "wifi_rssi": random.randint(-75, -65),
            "rf_noise": random.randint(-95, -85)
        }
    else:  # critical
        data = {
            "temperature": round(32 + random.uniform(-3, 3), 1),
            "humidity": round(80 + random.uniform(-10, 10), 1),
            "gas": random.randint(350, 500),
            "wifi_rssi": random.randint(-85, -75),
            "rf_noise": random.randint(-90, -80)
        }
    
    return data

def send_sensor_data():
    """Sends sensor data to the backend"""
    try:
        sensor_data = generate_mock_sensor_data()
        
        print(f"\n📤 Sending data at {datetime.now().strftime('%H:%M:%S')}")
        print(f"   Temperature: {sensor_data['temperature']}°C")
        print(f"   Humidity: {sensor_data['humidity']}%")
        print(f"   Gas: {sensor_data['gas']}")
        print(f"   Wi-Fi RSSI: {sensor_data['wifi_rssi']}dBm")
        print(f"   RF Noise: {sensor_data['rf_noise']}dB")
        
        response = requests.post(BACKEND_URL, json=sensor_data, timeout=5)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Response: {result['prediction']} (confidence: {result['confidence']})")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Connection error: {e}")
        print("   Make sure the Flask backend is running!")

def main():
    """Main test loop"""
    print("="*60)
    print("🧪 ESP32 Sensor Data Simulator")
    print("="*60)
    print(f"Target: {BACKEND_URL}")
    print("Sending data every 2 seconds...")
    print("Press Ctrl+C to stop")
    print("="*60)
    
    try:
        while True:
            send_sensor_data()
            time.sleep(2)
    except KeyboardInterrupt:
        print("\n\n✋ Test stopped by user")
        print("="*60)

if __name__ == '__main__':
    main()
