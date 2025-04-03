
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';
import { Vehicle } from '@/types';

interface AvailabilityTabProps {
  vehicle: Vehicle;
}

const AvailabilityTab: React.FC<AvailabilityTabProps> = ({ vehicle }) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default AvailabilityTab;
