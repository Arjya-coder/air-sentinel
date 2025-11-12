# AI-Enabled Wireless Environment Health Monitor - Backend

Flask + Socket.IO + TensorFlow backend for real-time wireless environment monitoring.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Server

```bash
python app.py
```

You should see:
```
✅ Backend running on http://127.0.0.1:5000
✅ Socket.IO active
✅ Ready for sensor data
```

### 3. Test with Mock Data

Open a new terminal and run:

```bash
python test_sender.py
```

This will simulate ESP32 sensor data and send it to the backend every 2 seconds.

## 📁 Project Structure

```
backend/
├── app.py                 # Main Flask + Socket.IO server
├── routes/
│   └── data_routes.py     # ESP32 data endpoint
├── services/
│   ├── validation.py      # Data validation
│   ├── preprocess.py      # Feature engineering
│   └── inference.py       # AI predictions
├── utils/
│   ├── logger.py          # Logging utilities
│   └── config_loader.py   # Configuration
├── model/                 # AI model files (add later)
├── test_sender.py         # Mock ESP32 simulator
└── requirements.txt       # Python dependencies
```

## 🔌 API Endpoints

### POST /data
Receives sensor data from ESP32

**Request Body:**
```json
{
  "temperature": 28.4,
  "humidity": 56.2,
  "gas": 213,
  "wifi_rssi": -67,
  "rf_noise": -98
}
```

**Response:**
```json
{
  "temperature": 28.4,
  "humidity": 56.2,
  "gas": 213,
  "wifi_rssi": -67,
  "rf_noise": -98,
  "entropy": 0.82,
  "prediction": "Interference",
  "confidence": 0.87,
  "timestamp": "2025-11-12T22:45:03Z",
  "ok": true
}
```

### GET /health
Health check endpoint

## 🧠 AI Model Integration

Currently using **mock inference** for development. To integrate your trained model:

1. Place your trained model files in `model/`:
   - `model.h5` (TensorFlow/Keras model)
   - `scaler.pkl` (Feature scaler)

2. Update `services/inference.py`:
   - Uncomment the model loading code
   - Comment out the mock_inference() call

## 🔗 Connecting to Frontend

Update the frontend's Socket.IO URL to point to this backend:

```typescript
// In src/hooks/useEnvironmentData.ts
const SOCKET_URL = 'http://localhost:5000';
const USE_MOCK_DATA = false;
```

## 📡 ESP32 Integration

To connect real ESP32 hardware:

1. Update ESP32 code to POST to `http://YOUR_SERVER_IP:5000/data`

2. Expected JSON format:
```cpp
{
  "temperature": dht.readTemperature(),
  "humidity": dht.readHumidity(),
  "gas": analogRead(MQ7_PIN),
  "wifi_rssi": WiFi.RSSI(),
  "rf_noise": getRFNoise()
}
```

## 📊 Data Flow

```
ESP32 → POST /data → Validation → Preprocessing → AI Inference → Socket.IO Broadcast → Frontend
```

## 🛠️ Development Notes

- Server runs on port 5000 by default
- Socket.IO broadcasts data to all connected clients
- Logs are saved to `app.log`
- Mock inference uses rule-based logic (replace with trained model)

## 🔧 Configuration

Edit `utils/config_loader.py` to customize:
- Port and host settings
- Model paths
- Sensor value ranges
- Enable data logging to SQLite

## 📝 TODO

- [ ] Train and integrate TensorFlow model
- [ ] Calibrate sensor thresholds with real hardware
- [ ] Add SQLite/Firebase logging for data collection
- [ ] Implement model retraining pipeline
- [ ] Add authentication for production deployment
