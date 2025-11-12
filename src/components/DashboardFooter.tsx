import { Cpu, Database, Wifi } from 'lucide-react';

export const DashboardFooter = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Cpu className="h-4 w-4" />
            <span>ESP32 Microcontroller</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              <span>Flask + Socket.IO Backend</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wifi className="h-4 w-4" />
              <span>React + TailwindCSS Frontend</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Powered by TensorFlow AI
          </div>
        </div>
      </div>
    </footer>
  );
};
