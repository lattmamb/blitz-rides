
import React from 'react';
import { Vehicle } from '@/types';

interface SpecificationsTabProps {
  vehicle: Vehicle;
}

const SpecificationsTab: React.FC<SpecificationsTabProps> = ({ vehicle }) => {
  return (
    <div className="glass-card p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4 gradient-text">Performance & Specs</h3>
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
            <li className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-white/70">Drive</span>
              <span className="font-medium">Dual Motor All-Wheel Drive</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4 gradient-text">Interior & Comfort</h3>
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
            <li className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-white/70">Climate Control</span>
              <span className="font-medium">Tri-zone</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsTab;
