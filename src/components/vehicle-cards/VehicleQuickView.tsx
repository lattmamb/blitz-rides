
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vehicle } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, Calendar, Battery, Zap, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import Vehicle3DModel from '@/components/Vehicle3DModel';

interface VehicleQuickViewProps {
  vehicle: Vehicle;
  onClose: () => void;
  onViewDetails: () => void;
}

const VehicleQuickView: React.FC<VehicleQuickViewProps> = ({
  vehicle,
  onClose,
  onViewDetails
}) => {
  const { theme } = useTheme();
  const [selectedColor, setSelectedColor] = useState(vehicle.colors[0] || '#FFFFFF');
  
  // Get color image or fall back to default image
  const displayImage = vehicle.colorImages && selectedColor && vehicle.colorImages[selectedColor] 
    ? vehicle.colorImages[selectedColor] 
    : vehicle.image;
  
  return (
    <Card className="glass-premium border-none overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left side: 3D Model or Image */}
        <div className="relative aspect-video md:aspect-auto">
          <motion.button 
            className="absolute top-3 right-3 z-30 glass-card p-2 rounded-full"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-4 w-4" />
          </motion.button>
          
          <div className="w-full h-full">
            {/* Use 3D model when available, otherwise use image */}
            {vehicle.model3D ? (
              <Vehicle3DModel 
                modelPath={displayImage} 
                label={`Tesla ${vehicle.model}`}
                interactive={true}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 bg-black/50">
                <motion.img 
                  src={displayImage}
                  alt={vehicle.model}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring", 
                    stiffness: 100 
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Color selection */}
          {vehicle.colors && vehicle.colors.length > 0 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {vehicle.colors.map(color => (
                <motion.button
                  key={color}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all",
                    selectedColor === color ? "border-tesla-blue scale-125" : "border-white/20"
                  )}
                  style={{ background: color }}
                  onClick={() => setSelectedColor(color)}
                  whileHover={{ scale: selectedColor === color ? 1.25 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Right side: Vehicle Details */}
        <div className="p-6 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-1">Tesla {vehicle.model}</h2>
            <p className="text-white/70 mb-4">{vehicle.tagline}</p>
            
            {/* Performance specs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-3 text-center rounded-xl">
                <Battery className="mx-auto h-5 w-5 mb-2 text-tesla-blue" />
                <div className="text-sm text-white/70">Range</div>
                <div className="font-bold">{vehicle.performance.range} mi</div>
              </div>
              
              <div className="glass-card p-3 text-center rounded-xl">
                <Zap className="mx-auto h-5 w-5 mb-2 text-tesla-blue" />
                <div className="text-sm text-white/70">0-60 mph</div>
                <div className="font-bold">{vehicle.performance.acceleration}s</div>
              </div>
              
              <div className="glass-card p-3 text-center rounded-xl">
                <Gauge className="mx-auto h-5 w-5 mb-2 text-tesla-blue" />
                <div className="text-sm text-white/70">Top Speed</div>
                <div className="font-bold">{vehicle.performance.topSpeed} mph</div>
              </div>
            </div>
            
            {/* Key Features */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <ul className="space-y-1 mb-4">
                {vehicle.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-sm text-white/80 flex items-center gap-2">
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-tesla-blue"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: index * 0.3 }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Pricing */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-white/70">Starting at</div>
                  <div className="text-2xl font-bold">
                    ${vehicle.price}<span className="text-white/70 text-sm font-normal">{vehicle.priceUnit}</span>
                  </div>
                </div>
                {vehicle.available && (
                  <div className="text-sm text-white/70">
                    * Terms & conditions apply
                  </div>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-4">
              <Button 
                className={cn(
                  "flex-1",
                  theme === 'neoPulse' ? "bg-tesla-blue hover:bg-tesla-blue/90" :
                  theme === 'quantumGlass' ? "bg-white/10 hover:bg-white/20 backdrop-blur-xl" :
                  "bg-tesla-purple hover:bg-tesla-purple/90"
                )}
                onClick={onViewDetails}
              >
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              
              {vehicle.available && (
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/20 hover:bg-white/5"
                  onClick={() => window.location.href = `/book/${vehicle.id}`}
                >
                  <Calendar className="h-4 w-4 mr-2" /> Book Now
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleQuickView;
