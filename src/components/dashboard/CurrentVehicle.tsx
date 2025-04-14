
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Battery, Gauge, Clock } from 'lucide-react';
import { Vehicle } from '@/types';

interface CurrentVehicleProps {
  activeVehicle: Vehicle;
  remainingDays: number;
  subscriptionProgress: number;
  remainingMiles: number;
  totalMiles: number;
}

const CurrentVehicle: React.FC<CurrentVehicleProps> = ({
  activeVehicle,
  remainingDays,
  subscriptionProgress,
  remainingMiles,
  totalMiles
}) => {
  return (
    <Card className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Current Vehicle</h2>
        <Button variant="outline" className="bg-glass border-glass-border hover:bg-glass-highlight text-white">
          View Details
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2">
          <div className="relative h-40 md:h-48 flex items-center justify-center">
            <img
              src={activeVehicle.image}
              alt={activeVehicle.model}
              className="h-full object-contain"
            />
          </div>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <div>
            <h3 className="text-xl font-bold">{activeVehicle.model}</h3>
            <p className="text-white/70 text-sm">{activeVehicle.tagline}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Subscription</span>
              <span className="font-medium">{remainingDays} days left</span>
            </div>
            <Progress value={subscriptionProgress} className="h-2 bg-glass" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Mileage</span>
              <span className="font-medium">{remainingMiles} / {totalMiles} miles</span>
            </div>
            <Progress value={(remainingMiles / totalMiles) * 100} className="h-2 bg-glass" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="glass-effect flex flex-col items-center p-3 rounded">
              <Battery className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">Range</span>
              <span className="text-sm font-medium">{activeVehicle.performance.range} mi</span>
            </div>
            <div className="glass-effect flex flex-col items-center p-3 rounded">
              <Gauge className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">Top Speed</span>
              <span className="text-sm font-medium">{activeVehicle.performance.topSpeed} mph</span>
            </div>
            <div className="glass-effect flex flex-col items-center p-3 rounded">
              <Clock className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">0-60 mph</span>
              <span className="text-sm font-medium">{activeVehicle.performance.acceleration}s</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentVehicle;
