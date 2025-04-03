
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vehicle } from '@/types';
import SpecificationsTab from './tabs/SpecificationsTab';
import AvailabilityTab from './tabs/AvailabilityTab';
import ReviewsTab from './tabs/ReviewsTab';

interface VehicleDetailsTabsProps {
  vehicle: Vehicle;
}

const VehicleDetailsTabs: React.FC<VehicleDetailsTabsProps> = ({ vehicle }) => {
  return (
    <div className="mb-12">
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="glass-effect w-full mb-6 grid grid-cols-3 gap-2">
          <TabsTrigger value="specifications" className="data-[state=active]:bg-tesla-blue/30 data-[state=active]:text-white">
            Specifications
          </TabsTrigger>
          <TabsTrigger value="availability" className="data-[state=active]:bg-tesla-blue/30 data-[state=active]:text-white">
            Availability
          </TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-tesla-blue/30 data-[state=active]:text-white">
            Reviews
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="specifications" className="animate-in fade-in-50 duration-300">
          <SpecificationsTab vehicle={vehicle} />
        </TabsContent>
        
        <TabsContent value="availability" className="animate-in fade-in-50 duration-300">
          <AvailabilityTab vehicle={vehicle} />
        </TabsContent>
        
        <TabsContent value="reviews" className="animate-in fade-in-50 duration-300">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehicleDetailsTabs;
