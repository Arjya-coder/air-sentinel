import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'critical';
}

export const SensorCard = ({ title, value, unit, icon: Icon, status }: SensorCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return 'text-status-normal';
      case 'warning':
        return 'text-status-interference';
      case 'critical':
        return 'text-status-critical';
    }
  };

  return (
    <Card className="p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className={`h-5 w-5 ${getStatusColor()}`} />
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">
          {value.toFixed(1)}
        </span>
        <span className="text-lg text-muted-foreground">{unit}</span>
      </div>
      
      <div className={`mt-3 h-1 w-full rounded-full bg-secondary`}>
        <div
          className={`h-full rounded-full ${getStatusColor().replace('text-', 'bg-')} transition-all duration-300`}
          style={{ width: `${Math.min(100, Math.abs(value) % 100)}%` }}
        />
      </div>
    </Card>
  );
};
