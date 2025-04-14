
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar, MapPin } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      
      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start border-glass-border bg-glass hover:bg-glass-highlight text-white">
          <Car className="mr-2 h-5 w-5" /> Switch Vehicle
        </Button>
        <Button variant="outline" className="w-full justify-start border-glass-border bg-glass hover:bg-glass-highlight text-white">
          <Calendar className="mr-2 h-5 w-5" /> Schedule Pickup
        </Button>
        <Button variant="outline" className="w-full justify-start border-glass-border bg-glass hover:bg-glass-highlight text-white">
          <MapPin className="mr-2 h-5 w-5" /> Find Charging Stations
        </Button>
      </div>
    </Card>
  );
};

export default QuickActions;
