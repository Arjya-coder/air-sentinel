import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface HealthCardProps {
  prediction: 'Normal' | 'Interference' | 'Critical';
  confidence: number;
}

export const HealthCard = ({ prediction, confidence }: HealthCardProps) => {
  const getStatusConfig = () => {
    switch (prediction) {
      case 'Normal':
        return {
          icon: CheckCircle,
          color: 'text-status-normal',
          bgGlow: 'shadow-[0_0_40px_hsl(var(--status-normal)/0.3)]',
          borderColor: 'border-status-normal/30',
          label: 'Normal',
          description: 'Stable communication environment',
        };
      case 'Interference':
        return {
          icon: AlertTriangle,
          color: 'text-status-interference',
          bgGlow: 'shadow-[0_0_40px_hsl(var(--status-interference)/0.3)]',
          borderColor: 'border-status-interference/30',
          label: 'Interference',
          description: 'Moderate instability detected',
        };
      case 'Critical':
        return {
          icon: XCircle,
          color: 'text-status-critical',
          bgGlow: 'shadow-[0_0_40px_hsl(var(--status-critical)/0.3)] animate-pulse-glow',
          borderColor: 'border-status-critical/30',
          label: 'Critical',
          description: 'Unsafe or high interference',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card className={`border-2 ${config.borderColor} ${config.bgGlow} transition-all duration-300`}>
      <div className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <Icon className={`h-20 w-20 ${config.color}`} />
        </div>
        
        <h2 className={`text-4xl font-bold mb-2 ${config.color}`}>
          {config.label}
        </h2>
        
        <p className="text-muted-foreground mb-4">
          {config.description}
        </p>
        
        <div className="inline-block px-4 py-2 bg-secondary rounded-full">
          <span className="text-sm font-medium">
            Confidence: {(confidence * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </Card>
  );
};
