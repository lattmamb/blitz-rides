
import React from 'react';
import { Card } from '@/components/ui/card';
import Map from '@/components/Map';
import { useVehicleTracking } from '@/utils/vehicleTracking';
import { Button } from '@/components/ui/button';
import { Car, Pause, Play } from 'lucide-react';
import { toast } from 'sonner';

interface VehicleLocationProps {
  initialLocation?: { lat: number; lng: number };
}

const VehicleLocation: React.FC<VehicleLocationProps> = ({ 
  initialLocation = { lat: 37.7749, lng: -122.4194 } 
}) => {
  const { position, lastUpdateTime, isMoving, toggleMovement } = useVehicleTracking(initialLocation);

  const handleTrackingToggle = () => {
    toggleMovement();
    toast.info(
      isMoving ? "Vehicle tracking paused" : "Vehicle tracking resumed",
      { position: "top-center", duration: 2000 }
    );
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vehicle Location</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isMoving ? 'bg-tesla-green animate-pulse' : 'bg-yellow-500'}`}></div>
            <span className="text-sm text-white/70">Updated {lastUpdateTime}</span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-glass-border bg-glass hover:bg-glass-highlight text-white h-8 w-8 p-0"
            onClick={handleTrackingToggle}
          >
            {isMoving ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Map 
          vehicleLocation={{ lat: position.lat, lng: position.lng }}
          className="w-full h-[300px]"
        />
        
        <div className="glass-card p-3 absolute bottom-3 left-3 z-10 flex gap-3 items-center">
          <Car className="text-tesla-blue" />
          <div>
            <div className="text-sm font-medium">Model S</div>
            <div className="text-xs text-white/70">Speed: {position.speed} mph</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="glass-effect p-3 rounded text-center">
          <div className="text-xs text-white/70">Latitude</div>
          <div className="text-sm font-medium">{position.lat.toFixed(4)}°N</div>
        </div>
        <div className="glass-effect p-3 rounded text-center">
          <div className="text-xs text-white/70">Longitude</div>
          <div className="text-sm font-medium">{position.lng.toFixed(4)}°W</div>
        </div>
        <div className="glass-effect p-3 rounded text-center">
          <div className="text-xs text-white/70">Heading</div>
          <div className="text-sm font-medium">{position.heading}°</div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleLocation;
