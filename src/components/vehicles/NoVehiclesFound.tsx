
import React from 'react';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

interface NoVehiclesFoundProps {
  onResetFilters: () => void;
}

const NoVehiclesFound: React.FC<NoVehiclesFoundProps> = ({ onResetFilters }) => {
  return (
    <div className="glass-card p-8 text-center">
      <Car className="w-12 h-12 text-white/20 mx-auto mb-4" />
      <h3 className="text-xl font-medium mb-2">No vehicles found</h3>
      <p className="text-white/70 mb-4">Try adjusting your filters to see more vehicles</p>
      <Button 
        variant="outline" 
        className="border-tesla-blue/50 hover:bg-tesla-blue/20"
        onClick={onResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default NoVehiclesFound;
