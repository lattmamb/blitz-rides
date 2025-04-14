
import React from 'react';
import { Card } from '@/components/ui/card';
import Map from '@/components/Map';

const VehicleLocation: React.FC = () => {
  return (
    <Card className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vehicle Location</h2>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-tesla-green"></div>
          <span className="text-sm text-white/70">Updated 5 minutes ago</span>
        </div>
      </div>
      
      <Map 
        vehicleLocation={{ lat: 37.7749, lng: -122.4194 }}
        className="w-full h-[300px]"
      />
    </Card>
  );
};

export default VehicleLocation;
