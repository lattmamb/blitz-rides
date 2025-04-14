
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/types';

interface RecommendedVehiclesProps {
  vehicles: Vehicle[];
}

const RecommendedVehicles: React.FC<RecommendedVehiclesProps> = ({ vehicles }) => {
  const recommendedVehicles = vehicles.slice(1, 3);
  
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
      
      <div className="space-y-4">
        {recommendedVehicles.map(vehicle => (
          <div key={vehicle.id} className="glass-effect p-3 rounded-lg flex items-center gap-3">
            <img src={vehicle.image} alt={vehicle.model} className="w-20 h-14 object-contain" />
            <div>
              <div className="font-medium">{vehicle.model}</div>
              <div className="text-sm text-white/70 mb-1">Starting at ${vehicle.price}{vehicle.priceUnit}</div>
              <Button size="sm" className="h-7 text-xs bg-tesla-blue hover:bg-tesla-blue/90 text-white">View Deal</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecommendedVehicles;
