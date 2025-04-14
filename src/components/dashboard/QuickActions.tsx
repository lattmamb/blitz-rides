
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar, MapPin, Navigation, Shield, Zap, Wrench } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const QuickActions: React.FC = () => {
  const { theme } = useTheme();

  const handleTrackVehicle = () => {
    toast.success("Tracking mode activated", {
      description: "Your vehicle location is now being tracked in real-time",
      position: "top-center",
      duration: 3000
    });
  };

  const actions = [
    {
      icon: <Navigation className={`h-5 w-5 ${theme === 'neoPulse' ? 'text-tesla-blue' : theme === 'quantumGlass' ? 'text-white' : 'text-tesla-purple'}`} />,
      label: "Track Vehicle",
      onClick: handleTrackVehicle
    },
    {
      icon: <Car className="h-5 w-5" />,
      label: "Switch Vehicle",
      onClick: () => toast.info("Vehicle switch feature", { description: "Coming soon" })
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule Pickup",
      onClick: () => toast.info("Schedule pickup feature", { description: "Coming soon" })
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Find Charging Stations",
      onClick: () => toast.info("Charging stations feature", { description: "Coming soon" })
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "Boost Performance",
      onClick: () => toast.info("Performance boost feature", { description: "Coming soon" })
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Security Settings",
      onClick: () => toast.info("Security settings feature", { description: "Coming soon" })
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      label: "Maintenance",
      onClick: () => toast.info("Maintenance feature", { description: "Coming soon" })
    }
  ];

  return (
    <Card className={cn(
      "p-6 border-none",
      theme === 'neoPulse' && "neo-card",
      theme === 'quantumGlass' && "glass-card",
      theme === 'orbitalDark' && "glass-blue"
    )}>
      <h2 className={cn(
        "text-xl font-bold mb-4",
        theme === 'neoPulse' && "neo-pulse-text",
        theme === 'quantumGlass' && "quantum-glass-text",
        theme === 'orbitalDark' && "orbital-dark-text"
      )}>
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.div key={index} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start border-glass-border text-white",
                theme === 'neoPulse' ? "bg-glass hover:bg-glass-highlight hover:border-tesla-blue/30" : 
                theme === 'quantumGlass' ? "bg-white/5 hover:bg-white/10 hover:border-white/20" : 
                "bg-glass hover:bg-glass-highlight hover:border-tesla-purple/30"
              )}
              onClick={action.onClick}
            >
              {action.icon} {action.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
