
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin } from 'lucide-react';
import { Vehicle } from '@/types';

interface ReservationProps {
  upcomingReservation: {
    id: string;
    vehicleId: string;
    vehicle: Vehicle | undefined;
    startDate: string;
    endDate: string;
    pickupLocation: string;
  };
}

const Reservations: React.FC<ReservationProps> = ({ upcomingReservation }) => {
  return (
    <Card className="glass-card p-6">
      <Tabs defaultValue="upcoming">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Reservations</h2>
          <TabsList className="glass-effect">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="upcoming">
          {upcomingReservation.vehicle && (
            <div className="glass-effect p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <div className="h-24 flex items-center justify-center">
                    <img
                      src={upcomingReservation.vehicle.image}
                      alt={upcomingReservation.vehicle.model}
                      className="h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-3 flex flex-col justify-center">
                  <h3 className="font-bold mb-2">{upcomingReservation.vehicle.model}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-tesla-blue" />
                      <span>
                        {new Date(upcomingReservation.startDate).toLocaleDateString()} - 
                        {new Date(upcomingReservation.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-tesla-blue" />
                      <span>{upcomingReservation.pickupLocation}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-tesla-blue hover:bg-tesla-blue/90 text-white text-xs h-8">
                        Manage
                      </Button>
                      <Button size="sm" variant="outline" className="border-glass-border bg-glass hover:bg-glass-highlight text-xs h-8 text-white">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-3 text-center text-white/70 text-sm">
            No other upcoming reservations
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="text-center py-8 text-white/70">
            No past reservations found
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Reservations;
