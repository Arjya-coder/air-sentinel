import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  timestamp: string;
  temperature: number;
  humidity: number;
  gas: number;
  wifi_rssi: number;
  rf_noise: number;
}

interface EnvironmentChartsProps {
  data: ChartData[];
}

export const EnvironmentCharts = ({ data }: EnvironmentChartsProps) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Environmental Sensors Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Environmental Conditions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelFormatter={formatTime}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--chart-1))"
              name="Temperature (°C)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="hsl(var(--chart-2))"
              name="Humidity (%)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="gas"
              stroke="hsl(var(--chart-3))"
              name="Gas Index"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* RF Metrics Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">RF Signal Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelFormatter={formatTime}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="wifi_rssi"
              stroke="hsl(var(--status-normal))"
              name="Wi-Fi RSSI (dBm)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="rf_noise"
              stroke="hsl(var(--status-interference))"
              name="RF Noise (dB)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
