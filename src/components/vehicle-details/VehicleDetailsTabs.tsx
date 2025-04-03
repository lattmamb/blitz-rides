
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar } from 'lucide-react';
import { Vehicle } from '@/types';

interface VehicleDetailsTabsProps {
  vehicle: Vehicle;
}

const VehicleDetailsTabs: React.FC<VehicleDetailsTabsProps> = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <Tabs defaultValue="specifications">
        <TabsList className="glass-effect w-full mb-6">
          <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
          <TabsTrigger value="availability" className="flex-1">Availability</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specifications">
          <div className="glass-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Performance & Specs</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Model</span>
                    <span className="font-medium">Tesla {vehicle.model}</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Range</span>
                    <span className="font-medium">{vehicle.performance.range} miles</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Top Speed</span>
                    <span className="font-medium">{vehicle.performance.topSpeed} mph</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">0-60 mph</span>
                    <span className="font-medium">{vehicle.performance.acceleration} seconds</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Charging</span>
                    <span className="font-medium">250 kW Supercharger</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Interior & Comfort</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Seating</span>
                    <span className="font-medium">{vehicle.model === "Model X" ? "Up to 7" : "5 Adults"}</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Display</span>
                    <span className="font-medium">15" Touchscreen</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Sound System</span>
                    <span className="font-medium">Premium Audio</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Autopilot</span>
                    <span className="font-medium">Included</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white/70">Over-the-air Updates</span>
                    <span className="font-medium">Yes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="availability">
          <div className="glass-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Pickup Locations</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <MapPin className="h-5 w-5 text-tesla-blue flex-shrink-0" />
                    <div>
                      <div className="font-medium">Downtown San Francisco</div>
                      <div className="text-sm text-white/70">123 Market St, San Francisco, CA 94105</div>
                      <div className="text-xs text-tesla-green mt-1">Available Now</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <MapPin className="h-5 w-5 text-tesla-blue flex-shrink-0" />
                    <div>
                      <div className="font-medium">Palo Alto</div>
                      <div className="text-sm text-white/70">456 University Ave, Palo Alto, CA 94301</div>
                      <div className="text-xs text-tesla-green mt-1">Available Now</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <MapPin className="h-5 w-5 text-tesla-blue flex-shrink-0" />
                    <div>
                      <div className="font-medium">San Jose</div>
                      <div className="text-sm text-white/70">789 Santana Row, San Jose, CA 95128</div>
                      <div className="text-xs text-white/70 mt-1">Available April 15</div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Availability Calendar</h3>
                <div className="glass-effect p-4 rounded-lg text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-3 text-tesla-blue" />
                  <p className="text-white/70 mb-4">
                    Check real-time availability and reserve your preferred dates.
                  </p>
                  <Button 
                    className="bg-tesla-blue hover:bg-tesla-blue/90 text-white"
                    onClick={() => navigate(`/book/${vehicle.id}`)}
                    disabled={!vehicle.available}
                  >
                    Check Availability
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="glass-card p-6 text-center">
            <div className="py-8">
              <h3 className="text-lg font-bold mb-3">Customer Reviews</h3>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill={i < 4 ? "#0A84FF" : "none"} 
                    stroke="#0A84FF" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mr-1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="ml-2 font-medium">4.8/5</span>
              </div>
              <p className="text-white/70 mb-6">
                Based on 128 verified customer reviews
              </p>
              
              <div className="max-w-xl mx-auto">
                <Button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white">
                  View All Reviews
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehicleDetailsTabs;
