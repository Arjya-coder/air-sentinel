import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export interface SensorData {
  temperature: number;
  humidity: number;
  gas: number;
  wifi_rssi: number;
  rf_noise: number;
  entropy: number;
  prediction: 'Normal' | 'Interference' | 'Critical';
  confidence: number;
  timestamp: string;
}

interface HistoricalData {
  timestamp: string;
  temperature: number;
  humidity: number;
  gas: number;
  wifi_rssi: number;
  rf_noise: number;
  entropy: number;
}

// PLACEHOLDER: Hardware live data (ESP32 via backend)
// Replace SOCKET_URL with your Flask backend Socket.IO endpoint
const SOCKET_URL = 'http://localhost:5000';
const USE_MOCK_DATA = true; // Set to false when connecting to real backend

export const useEnvironmentData = () => {
  const [connected, setConnected] = useState(false);
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<HistoricalData[]>([]);
  const [alerts, setAlerts] = useState<SensorData[]>([]);

  useEffect(() => {
    let socket: Socket | null = null;
    let mockInterval: NodeJS.Timeout | null = null;

    if (USE_MOCK_DATA) {
      // Mock data for development
      setConnected(true);
      
      const generateMockData = (): SensorData => {
        const predictions: Array<'Normal' | 'Interference' | 'Critical'> = ['Normal', 'Interference', 'Critical'];
        const prediction = predictions[Math.floor(Math.random() * predictions.length)];
        
        return {
          temperature: 20 + Math.random() * 15,
          humidity: 40 + Math.random() * 40,
          gas: 100 + Math.random() * 300,
          wifi_rssi: -40 - Math.random() * 50,
          rf_noise: -100 + Math.random() * 20,
          entropy: Math.random(),
          prediction,
          confidence: 0.7 + Math.random() * 0.3,
          timestamp: new Date().toISOString(),
        };
      };

      // Initial data
      const initialData = generateMockData();
      setCurrentData(initialData);
      setAlerts([initialData]);

      // Update every 2 seconds
      mockInterval = setInterval(() => {
        const newData = generateMockData();
        setCurrentData(newData);
        
        setHistory((prev) => {
          const newHistory = [...prev, {
            timestamp: newData.timestamp,
            temperature: newData.temperature,
            humidity: newData.humidity,
            gas: newData.gas,
            wifi_rssi: newData.wifi_rssi,
            rf_noise: newData.rf_noise,
            entropy: newData.entropy,
          }];
          return newHistory.slice(-50); // Keep last 50 points
        });

        setAlerts((prev) => {
          const newAlerts = [newData, ...prev];
          return newAlerts.slice(0, 10); // Keep last 10 alerts
        });
      }, 2000);
    } else {
      // Real Socket.IO connection
      socket = io(SOCKET_URL);

      socket.on('connect', () => {
        setConnected(true);
      });

      socket.on('disconnect', () => {
        setConnected(false);
      });

      socket.on('sensor_data', (data: SensorData) => {
        setCurrentData(data);
        
        setHistory((prev) => {
          const newHistory = [...prev, {
            timestamp: data.timestamp,
            temperature: data.temperature,
            humidity: data.humidity,
            gas: data.gas,
            wifi_rssi: data.wifi_rssi,
            rf_noise: data.rf_noise,
            entropy: data.entropy,
          }];
          return newHistory.slice(-50);
        });

        setAlerts((prev) => {
          const newAlerts = [data, ...prev];
          return newAlerts.slice(0, 10);
        });
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
      if (mockInterval) {
        clearInterval(mockInterval);
      }
    };
  }, []);

  return { connected, currentData, history, alerts };
};
