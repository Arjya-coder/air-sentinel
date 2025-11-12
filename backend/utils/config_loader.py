"""
Configuration loader
"""

import os

class Config:
    """Application configuration"""
    
    # Flask settings
    DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
    HOST = os.getenv('FLASK_HOST', '0.0.0.0')
    PORT = int(os.getenv('FLASK_PORT', 5000))
    
    # Socket.IO settings
    SOCKETIO_ASYNC_MODE = 'threading'
    SOCKETIO_CORS_ALLOWED_ORIGINS = '*'
    
    # Model paths
    MODEL_PATH = 'model/model.h5'
    SCALER_PATH = 'model/scaler.pkl'
    
    # Data logging (optional)
    ENABLE_DATA_LOGGING = os.getenv('ENABLE_DATA_LOGGING', 'False') == 'True'
    DATABASE_PATH = 'data_log.sqlite'
    
    # Sensor thresholds (for validation)
    SENSOR_RANGES = {
        'temperature': (-40, 85),
        'humidity': (0, 100),
        'gas': (0, 1000),
        'wifi_rssi': (-100, 0),
        'rf_noise': (-120, -50)
    }

def load_config():
    """Loads configuration from environment or defaults"""
    return Config()
