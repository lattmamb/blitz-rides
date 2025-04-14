
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Battery, Zap, Gauge, Check, ChevronRight, Heart } from 'lucide-react';
import { Vehicle } from '@/types';
import VehicleModelViewer from './VehicleModelViewer';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { toast } from 'sonner';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleRentClick = () => {
    navigate(`/book/${vehicle.id}`);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      description: isFavorite ? "Vehicle removed from your saved list" : "Vehicle added to your saved list",
      position: "bottom-right",
    });
  };
  
  // Function to get color name from hex
  const getColorName = (hex: string) => {
    switch(hex.toUpperCase()) {
      case '#FFFFFF': return 'Pearl White';
      case '#000000': return 'Solid Black';
      case '#C0C0C0': return 'Silver Metallic';
      case '#FF0000': return 'Red Multi-Coat';
      case '#0000FF': return 'Deep Blue Metallic';
      case '#808080': return 'Midnight Silver';
      case '#A52A2A': return 'Brown Metallic';
      default: return 'Custom Color';
    }
  };
  
  // Performance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
      <div className="lg:order-2">
        <div className="glass-premium p-0 rounded-2xl relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
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
          
          {/* Enhanced vehicle display with 3D model viewer */}
          <VehicleModelViewer
            vehicleModel={vehicle.model}
            vehicleImage={vehicle.image}
            selectedColor={selectedColor}
          />
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <span className="inline-block h-4 w-1 bg-tesla-blue mr-2 rounded"></span>
            Select Color
          </h3>
          <div className="flex gap-4">
            {vehicle.colors.map(color => (
              <HoverCard key={color}>
                <HoverCardTrigger>
                  <button
                    onClick={() => setSelectedColor(color)}
                    className={`group relative h-10 w-10 rounded-full transition-all duration-300 ${
                      selectedColor === color 
                        ? 'scale-110 shadow-lg' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <div 
                      className={`absolute inset-0 rounded-full border-2 ${
                        selectedColor === color 
                          ? 'border-tesla-blue shadow-[0_0_10px_rgba(10,132,255,0.5)]' 
                          : 'border-white/10'
                      }`} 
                      style={{ background: color }}
                    ></div>
                    {selectedColor === color && (
                      <motion.div 
                        className="absolute -inset-1 rounded-full border border-tesla-blue/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      ></motion.div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="glass-card w-40 p-3">
                  <div className="text-sm font-medium text-white">{getColorName(color)}</div>
                  <div className="text-xs text-white/70 mt-1">Premium finish</div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
      
      <div className="lg:order-1 flex flex-col justify-center">
        <div className="flex items-center mb-2">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-tesla-blue/30 to-transparent"></div>
          <div className="px-2 text-sm text-white/50 uppercase tracking-widest">Premium Sedan</div>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-tesla-blue/30 to-transparent"></div>
        </div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tesla {vehicle.model}
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white/80 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {vehicle.tagline}
        </motion.p>
        
        {/* Enhanced performance specs with animations */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="crystal-card p-4 text-center backdrop-blur-xl">
            <Battery className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
            <div className="text-sm text-white/70">Range</div>
            <div className="font-bold text-lg">{vehicle.performance.range} mi</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="crystal-card p-4 text-center backdrop-blur-xl">
            <Gauge className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
            <div className="text-sm text-white/70">Top Speed</div>
            <div className="font-bold text-lg">{vehicle.performance.topSpeed} mph</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="crystal-card p-4 text-center backdrop-blur-xl">
            <Zap className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
            <div className="text-sm text-white/70">0-60 mph</div>
            <div className="font-bold text-lg">{vehicle.performance.acceleration}s</div>
          </motion.div>
        </motion.div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <span className="inline-block h-4 w-1 bg-tesla-blue mr-2 rounded"></span>
            Key Features
          </h3>
          <motion.ul 
            className="space-y-3 grid grid-cols-2 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {vehicle.features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <div className="p-1 rounded-full bg-tesla-blue/20 text-tesla-blue">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        
        <motion.div 
          className="glass-premium p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
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
          
          <div className="flex gap-4">
            <Button 
              className="flex-1 bg-tesla-blue hover:bg-tesla-blue/90 text-white"
              onClick={handleRentClick}
              disabled={!vehicle.available}
            >
              {vehicle.available ? `Book This ${vehicle.model}` : `Coming Soon`}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            
            <Button
              className={`aspect-square ${isFavorite ? 'bg-tesla-purple text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
              onClick={toggleFavorite}
              variant="outline"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </motion.div>
        
        {/* Enhanced delivery information */}
        <motion.div 
          className="crystal-card p-4 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <div className="text-sm text-white/70">Estimated Delivery</div>
            <div className="font-medium">2-3 Business Days</div>
          </div>
          <div className="h-10 w-px bg-white/10 mx-2"></div>
          <div>
            <div className="text-sm text-white/70">Instant Booking</div>
            <div className="font-medium text-tesla-green">Available</div>
          </div>
          <div className="h-10 w-px bg-white/10 mx-2"></div>
          <div>
            <div className="text-sm text-white/70">Location</div>
            <div className="font-medium">Crystal Center</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VehicleDetailsHero;
