
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Battery, Zap, Gauge, Check } from 'lucide-react';
import { Vehicle } from '@/types';

interface VehicleDetailsHeroProps {
  vehicle: Vehicle;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const VehicleDetailsHero: React.FC<VehicleDetailsHeroProps> = ({ 
  vehicle, 
  selectedColor, 
  setSelectedColor 
}) => {
  const navigate = useNavigate();

  const handleRentClick = () => {
    navigate(`/book/${vehicle.id}`);
  };

  // Map color codes to color names for better accessibility
  const getColorName = (colorCode: string) => {
    switch (colorCode) {
      case '#FFFFFF': return 'Pearl White';
      case '#000000': return 'Solid Black';
      case '#C0C0C0': return 'Silver Metallic';
      case '#FF0000': return 'Red Multi-Coat';
      case '#0000FF': return 'Deep Blue Metallic';
      default: return 'Custom';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
      <div className="lg:order-2">
        <div className="glass-card p-8 rounded-2xl relative h-80 md:h-96 lg:h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
            {vehicle.available ? (
              <div className="bg-tesla-green text-white text-xs font-medium px-3 py-1 rounded-full">
                Available Now
              </div>
            ) : (
              <div className="bg-tesla-red/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                Coming Soon
              </div>
            )}
          </div>
          <img
            src={vehicle.image}
            alt={`Tesla ${vehicle.model}`}
            className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Select Color</h3>
          <div className="flex gap-3">
            {vehicle.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-8 w-8 rounded-full border-2 transition-all ${
                  selectedColor === color 
                    ? 'border-tesla-blue scale-110' 
                    : 'border-glass-border hover:scale-105'
                }`}
                style={{ background: color }}
                title={getColorName(color)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="lg:order-1 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
          Tesla {vehicle.model}
        </h1>
        
        <p className="text-xl text-white/80 mb-6">{vehicle.tagline}</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4 text-center">
            <Battery className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
            <div className="text-sm text-white/70">Range</div>
            <div className="font-bold text-lg">{vehicle.performance.range} mi</div>
          </div>
          
          <div className="glass-card p-4 text-center">
            <Gauge className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
            <div className="text-sm text-white/70">Top Speed</div>
            <div className="font-bold text-lg">{vehicle.performance.topSpeed} mph</div>
          </div>
          
          <div className="glass-card p-4 text-center">
            <Zap className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
            <div className="text-sm text-white/70">0-60 mph</div>
            <div className="font-bold text-lg">{vehicle.performance.acceleration}s</div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Key Features</h3>
          <ul className="space-y-3">
            {vehicle.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-tesla-blue/20 text-tesla-blue">
                  <Check className="h-4 w-4" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-white/70">Starting at</div>
              <div className="text-3xl font-bold">
                ${vehicle.price}<span className="text-white/70 text-sm font-normal">{vehicle.priceUnit}</span>
              </div>
            </div>
            <div className="text-sm text-white/70">
              * Terms & conditions apply
            </div>
          </div>
          
          <Button 
            className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white"
            onClick={handleRentClick}
            disabled={!vehicle.available}
          >
            {vehicle.available ? `Book This ${vehicle.model}` : `Coming Soon`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsHero;
