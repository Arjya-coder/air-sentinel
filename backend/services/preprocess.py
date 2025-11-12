"""
Data preprocessing and feature engineering
"""

import numpy as np

# Store previous values for delta calculations
previous_values = {
    'wifi_rssi': None,
    'rf_noise': None
}

def preprocess_data(sensor_data):
    """
    Preprocesses sensor data and extracts features
    
    Args:
        sensor_data: Dictionary containing raw sensor readings
        
    Returns:
        Dictionary with processed features
    """
    global previous_values
    
    # Extract raw values
    temperature = sensor_data['temperature']
    humidity = sensor_data['humidity']
    gas = sensor_data['gas']
    wifi_rssi = sensor_data['wifi_rssi']
    rf_noise = sensor_data['rf_noise']
    
    # Calculate deltas (rate of change)
    delta_rssi = 0
    delta_noise = 0
    
    if previous_values['wifi_rssi'] is not None:
        delta_rssi = abs(wifi_rssi - previous_values['wifi_rssi'])
        delta_noise = abs(rf_noise - previous_values['rf_noise'])
    
    previous_values['wifi_rssi'] = wifi_rssi
    previous_values['rf_noise'] = rf_noise
    
    # Calculate signal entropy (simplified measure of signal variability)
    # In production, this would use actual signal samples
    entropy = calculate_entropy([wifi_rssi, rf_noise, delta_rssi, delta_noise])
    
    # Normalize features (simple min-max scaling)
    # TODO: Replace with trained scaler.pkl after model training
    normalized_features = {
        'temperature': normalize(temperature, -40, 85),
        'humidity': normalize(humidity, 0, 100),
        'gas': normalize(gas, 0, 1000),
        'wifi_rssi': normalize(wifi_rssi, -100, 0),
        'rf_noise': normalize(rf_noise, -120, -50),
        'delta_rssi': normalize(delta_rssi, 0, 50),
        'delta_noise': normalize(delta_noise, 0, 40),
        'entropy': entropy
    }
    
    return normalized_features

def normalize(value, min_val, max_val):
    """Min-max normalization"""
    return (value - min_val) / (max_val - min_val)

def calculate_entropy(values):
    """
    Calculate a simplified entropy measure
    
    Args:
        values: List of numerical values
        
    Returns:
        float: Entropy score between 0 and 1
    """
    # Simple variance-based entropy approximation
    # In production, use proper entropy calculation on signal samples
    variance = np.var(values)
    # Scale to 0-1 range
    entropy = min(variance / 100.0, 1.0)
    return entropy
