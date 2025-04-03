
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
      <Tabs defaultValue="specifications">
        <TabsList className="glass-effect w-full mb-6">
          <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
          <TabsTrigger value="availability" className="flex-1">Availability</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specifications">
          <SpecificationsTab vehicle={vehicle} />
        </TabsContent>
        
        <TabsContent value="availability">
          <AvailabilityTab vehicle={vehicle} />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehicleDetailsTabs;
