"""
AI Model Inference
"""

import numpy as np

# TODO: Replace with actual trained model after hardware integration
# Uncomment when model is ready:
# from tensorflow.keras.models import load_model
# import joblib
# 
# model = load_model('model/model.h5')
# scaler = joblib.load('model/scaler.pkl')

def run_inference(processed_data):
    """
    Runs AI inference on preprocessed sensor data
    
    Args:
        processed_data: Dictionary with normalized features
        
    Returns:
        tuple: (prediction, confidence)
    """
    
    # PLACEHOLDER: Mock inference for development
    # This will be replaced with actual model inference
    prediction, confidence = mock_inference(processed_data)
    
    # TODO: Replace with actual model inference after training:
    # features = np.array([[
    #     processed_data['temperature'],
    #     processed_data['humidity'],
    #     processed_data['gas'],
    #     processed_data['wifi_rssi'],
    #     processed_data['rf_noise'],
    #     processed_data['delta_rssi'],
    #     processed_data['delta_noise'],
    #     processed_data['entropy']
    # ]])
    # 
    # # Scale features
    # features_scaled = scaler.transform(features)
    # 
    # # Predict
    # predictions = model.predict(features_scaled)
    # class_idx = np.argmax(predictions[0])
    # confidence = predictions[0][class_idx]
    # 
    # classes = ['Normal', 'Interference', 'Critical']
    # prediction = classes[class_idx]
    
    return prediction, confidence

def mock_inference(processed_data):
    """
    Mock inference using rule-based logic
    Simulates AI model behavior for development
    """
    
    # Extract key features
    wifi_rssi = processed_data['wifi_rssi']
    rf_noise = processed_data['rf_noise']
    entropy = processed_data['entropy']
    gas = processed_data['gas']
    
    # Rule-based classification
    # Critical conditions
    if entropy > 0.8 or gas > 0.8 or wifi_rssi < 0.2:
        return 'Critical', np.random.uniform(0.85, 0.99)
    
    # Interference conditions
    elif entropy > 0.6 or rf_noise < 0.3 or wifi_rssi < 0.4:
        return 'Interference', np.random.uniform(0.75, 0.90)
    
    # Normal conditions
    else:
        return 'Normal', np.random.uniform(0.70, 0.95)
