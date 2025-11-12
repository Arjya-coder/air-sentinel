"""
Routes for handling ESP32 sensor data
"""

from flask import Blueprint, request, jsonify, current_app
from services.validation import validate_sensor_data
from services.preprocess import preprocess_data
from services.inference import run_inference
from utils.logger import get_logger
from datetime import datetime

data_bp = Blueprint('data', __name__)
logger = get_logger()

@data_bp.route('/data', methods=['POST'])
def receive_sensor_data():
    """
    Receives sensor data from ESP32
    Expected JSON format:
    {
        "temperature": 28.4,
        "humidity": 56.2,
        "gas": 213,
        "wifi_rssi": -67,
        "rf_noise": -98
    }
    """
    try:
        # Get JSON data
        sensor_data = request.get_json()
        
        if not sensor_data:
            return jsonify({"error": "No data provided"}), 400
        
        # Validate data
        is_valid, error_msg = validate_sensor_data(sensor_data)
        if not is_valid:
            return jsonify({"error": error_msg}), 400
        
        # Preprocess data
        processed_data = preprocess_data(sensor_data)
        
        # Run AI inference
        prediction, confidence = run_inference(processed_data)
        
        # Add timestamp
        timestamp = datetime.utcnow().isoformat() + 'Z'
        
        # Prepare response with prediction
        response_data = {
            **sensor_data,
            "entropy": processed_data['entropy'],
            "prediction": prediction,
            "confidence": round(confidence, 2),
            "timestamp": timestamp,
            "ok": True
        }
        
        # Broadcast to all connected Socket.IO clients
        socketio = current_app.config['SOCKETIO']
        socketio.emit('sensor_data', response_data)
        
        logger.info(f"Data received: {prediction} ({confidence:.2f})")
        print(f"📊 Prediction: {prediction} | Confidence: {confidence:.2f}")
        
        return jsonify(response_data), 200
        
    except Exception as e:
        logger.error(f"Error processing sensor data: {str(e)}")
        return jsonify({"error": str(e), "ok": False}), 500

@data_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "data_routes",
        "timestamp": datetime.utcnow().isoformat()
    }), 200
