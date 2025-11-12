"""
AI-Enabled Wireless Environment Health Monitor - Backend Server
Flask + Socket.IO + TensorFlow
"""

from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from routes.data_routes import data_bp
from utils.logger import setup_logger

app = Flask(__name__)
CORS(app)

# Socket.IO configuration
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# Setup logger
logger = setup_logger()

# Register blueprints
app.register_blueprint(data_bp)

# Store Socket.IO instance for use in routes
app.config['SOCKETIO'] = socketio

@app.route('/')
def index():
    return {
        "status": "online",
        "service": "AI-Enabled Wireless Environment Health Monitor",
        "version": "1.0.0"
    }

@socketio.on('connect')
def handle_connect():
    logger.info('Client connected to Socket.IO')
    print('✅ Frontend connected to Socket.IO')

@socketio.on('disconnect')
def handle_disconnect():
    logger.info('Client disconnected from Socket.IO')
    print('❌ Frontend disconnected from Socket.IO')

if __name__ == '__main__':
    print('\n' + '='*60)
    print('🚀 AI-Enabled Wireless Environment Health Monitor')
    print('='*60)
    print('✅ Backend running on http://127.0.0.1:5000')
    print('✅ Socket.IO active')
    print('✅ Ready for sensor data')
    print('='*60 + '\n')
    
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
