import { Activity } from 'lucide-react';

interface DashboardHeaderProps {
  connected: boolean;
  lastUpdate?: string;
}

export const DashboardHeader = ({ connected, lastUpdate }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                AI-Enabled Wireless Environment Health Monitor
              </h1>
              <p className="text-sm text-muted-foreground">
                A Stethoscope for Wireless Communication Environments
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  connected
                    ? 'bg-status-normal shadow-[0_0_10px_hsl(var(--status-normal))]'
                    : 'bg-destructive shadow-[0_0_10px_hsl(var(--destructive))]'
                }`}
              />
              <span className="text-sm font-medium">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            {lastUpdate && (
              <div className="text-sm text-muted-foreground">
                Last update: {new Date(lastUpdate).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
