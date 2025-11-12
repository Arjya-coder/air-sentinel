import { useEnvironmentData } from '@/hooks/useEnvironmentData';
import { DashboardHeader } from '@/components/DashboardHeader';
import { HealthCard } from '@/components/HealthCard';
import { SensorCard } from '@/components/SensorCard';
import { EnvironmentCharts } from '@/components/EnvironmentCharts';
import { AlertsLog } from '@/components/AlertsLog';
import { DashboardFooter } from '@/components/DashboardFooter';
import { Thermometer, Droplets, Wind, Wifi, Radio, Activity } from 'lucide-react';

const Index = () => {
  const { connected, currentData, history, alerts } = useEnvironmentData();

  const getSensorStatus = (value: number, thresholds: { warning: number; critical: number }): 'normal' | 'warning' | 'critical' => {
    if (value > thresholds.critical) return 'critical';
    if (value > thresholds.warning) return 'warning';
    return 'normal';
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        connected={connected} 
        lastUpdate={currentData?.timestamp} 
      />

      <main className="container mx-auto px-4 py-8">
        {/* Health Status Card */}
        <div className="mb-8">
          {currentData ? (
            <HealthCard 
              prediction={currentData.prediction} 
              confidence={currentData.confidence} 
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Waiting for sensor data...
            </div>
          )}
        </div>

        {/* Sensor Grid */}
        {currentData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <SensorCard
                title="Temperature"
                value={currentData.temperature}
                unit="°C"
                icon={Thermometer}
                status={getSensorStatus(currentData.temperature, { warning: 30, critical: 35 })}
              />
              
              <SensorCard
                title="Humidity"
                value={currentData.humidity}
                unit="%"
                icon={Droplets}
                status={getSensorStatus(currentData.humidity, { warning: 70, critical: 85 })}
              />
              
              <SensorCard
                title="Gas Index"
                value={currentData.gas}
                unit=""
                icon={Wind}
                status={getSensorStatus(currentData.gas, { warning: 250, critical: 350 })}
              />
              
              <SensorCard
                title="Wi-Fi RSSI"
                value={currentData.wifi_rssi}
                unit="dBm"
                icon={Wifi}
                status={getSensorStatus(Math.abs(currentData.wifi_rssi), { warning: 70, critical: 80 })}
              />
              
              <SensorCard
                title="RF Noise"
                value={currentData.rf_noise}
                unit="dB"
                icon={Radio}
                status={getSensorStatus(Math.abs(currentData.rf_noise), { warning: 85, critical: 80 })}
              />
              
              <SensorCard
                title="Signal Entropy"
                value={currentData.entropy}
                unit=""
                icon={Activity}
                status={getSensorStatus(currentData.entropy, { warning: 0.7, critical: 0.85 })}
              />
            </div>

            {/* Charts */}
            {history.length > 0 && (
              <div className="mb-8">
                <EnvironmentCharts data={history} />
              </div>
            )}

            {/* Alerts Log */}
            <AlertsLog alerts={alerts} />
          </>
        )}
      </main>

      <DashboardFooter />
    </div>
  );
};

export default Index;
