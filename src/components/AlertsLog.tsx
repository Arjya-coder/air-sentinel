import { Card } from '@/components/ui/card';
import { SensorData } from '@/hooks/useEnvironmentData';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface AlertsLogProps {
  alerts: SensorData[];
}

export const AlertsLog = ({ alerts }: AlertsLogProps) => {
  const getStatusIcon = (prediction: string) => {
    switch (prediction) {
      case 'Normal':
        return <CheckCircle className="h-4 w-4 text-status-normal" />;
      case 'Interference':
        return <AlertTriangle className="h-4 w-4 text-status-interference" />;
      case 'Critical':
        return <XCircle className="h-4 w-4 text-status-critical" />;
    }
  };

  const getStatusColor = (prediction: string) => {
    switch (prediction) {
      case 'Normal':
        return 'text-status-normal';
      case 'Interference':
        return 'text-status-interference';
      case 'Critical':
        return 'text-status-critical bg-status-critical/10';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Live Activity Log</h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No alerts yet</p>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg border border-border ${getStatusColor(alert.prediction)} transition-all duration-300 animate-fade-in`}
            >
              {getStatusIcon(alert.prediction)}
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{alert.prediction}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="text-xs text-muted-foreground mt-1">
                  T: {alert.temperature.toFixed(1)}°C | 
                  H: {alert.humidity.toFixed(1)}% | 
                  RSSI: {alert.wifi_rssi.toFixed(0)}dBm | 
                  Conf: {(alert.confidence * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
