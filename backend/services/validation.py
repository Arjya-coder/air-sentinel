"""
Data validation and integrity checks
"""

def validate_sensor_data(data):
    """
    Validates sensor data from ESP32
    
    Args:
        data: Dictionary containing sensor readings
        
    Returns:
        tuple: (is_valid, error_message)
    """
    required_fields = ['temperature', 'humidity', 'gas', 'wifi_rssi', 'rf_noise']
    
    # Check for missing fields
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    
    # Validate data types and ranges
    validations = {
        'temperature': {'type': (int, float), 'min': -40, 'max': 85},
        'humidity': {'type': (int, float), 'min': 0, 'max': 100},
        'gas': {'type': (int, float), 'min': 0, 'max': 1000},
        'wifi_rssi': {'type': (int, float), 'min': -100, 'max': 0},
        'rf_noise': {'type': (int, float), 'min': -120, 'max': -50}
    }
    
    for field, rules in validations.items():
        value = data[field]
        
        # Check type
        if not isinstance(value, rules['type']):
            return False, f"Invalid type for {field}: expected number"
        
        # Check range
        if value < rules['min'] or value > rules['max']:
            return False, f"Value out of range for {field}: {value}"
    
    return True, None
