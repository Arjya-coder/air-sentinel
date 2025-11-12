"""
Logging utilities
"""

import logging
from datetime import datetime

def setup_logger():
    """
    Sets up the application logger
    
    Returns:
        Logger instance
    """
    logger = logging.getLogger('wireless_health_monitor')
    logger.setLevel(logging.INFO)
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    
    # File handler
    file_handler = logging.FileHandler('app.log')
    file_handler.setLevel(logging.INFO)
    
    # Formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    
    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)
    
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    
    return logger

def get_logger():
    """Returns the application logger"""
    return logging.getLogger('wireless_health_monitor')
