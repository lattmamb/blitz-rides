
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vehicle } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, Calendar, Battery, Zap, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import Vehicle3DModel from '@/components/Vehicle3DModel';
import IntelligentShine from '@/components/ui/IntelligentShine';
import { useLoadingDetection } from '@/hooks/useLoadingDetection';
import CardSkeleton from '@/components/ui/CardSkeleton';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const { isLoading, isSlowRender } = useLoadingDetection(300);
  
  // Reset loaded state when vehicle changes
  useEffect(() => {
    setImageLoaded(false);
    setModelLoaded(false);
  }, [vehicle.id]);
  
  // Get color image or fall back to default image
  const displayImage = vehicle.colorImages && selectedColor && vehicle.colorImages[selectedColor] 
    ? vehicle.colorImages[selectedColor] 
    : vehicle.image;
  
  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = displayImage;
    img.onload = () => setImageLoaded(true);
  }, [displayImage]);
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1 + 0.2,
        duration: 0.3
      }
    })
  };

  // Determine loading state
  const isContentLoading = isLoading || (!imageLoaded && !vehicle.model3D) || (vehicle.model3D && !modelLoaded);
  
  return (
    <Card className="glass-premium border-none overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left side: 3D Model or Image with Loading State */}
        <div className="relative aspect-video md:aspect-auto">
          <motion.button 
            className="absolute top-3 right-3 z-30 glass-card p-2 rounded-full"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-4 w-4" />
          </motion.button>
          
          <AnimatePresence mode="wait">
            {isContentLoading ? (
              <motion.div 
                key="loading"
                className="w-full h-full flex items-center justify-center bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="loading-dots flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-tesla-blue"></span>
                  <span className="w-3 h-3 rounded-full bg-tesla-blue"></span>
                  <span className="w-3 h-3 rounded-full bg-tesla-blue"></span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Use 3D model when available, otherwise use image */}
                {vehicle.model3D ? (
                  <Vehicle3DModel 
                    modelPath={vehicle.model3D} 
                    label={`Tesla ${vehicle.model}`}
                    interactive={true}
                    onLoad={() => setModelLoaded(true)}
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Intelligent shine effect */}
          <IntelligentShine 
            triggerOnHover={true}
            autoTriggerInterval={30000}
            intensity="subtle"
          />
          
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
        <AnimatePresence mode="wait">
          {isContentLoading ? (
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div className="space-y-2 mb-4">
                  <div className="h-7 w-3/4 bg-white/10 rounded-md loading-shimmer"></div>
                  <div className="h-5 w-full bg-white/10 rounded-md loading-shimmer"></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-3 text-center rounded-xl">
                      <div className="h-5 w-5 mx-auto mb-2 rounded-full bg-white/10 loading-shimmer"></div>
                      <div className="h-3 w-16 mx-auto mb-1 bg-white/10 rounded-md loading-shimmer"></div>
                      <div className="h-4 w-12 mx-auto bg-white/10 rounded-md loading-shimmer"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6 space-y-1">
                  <div className="h-5 w-1/3 bg-white/10 rounded-md loading-shimmer mb-3"></div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-full bg-white/10 rounded-md loading-shimmer"></div>
                  ))}
                </div>
                
                <div className="glass-card p-4 mb-6 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-white/10 rounded-md loading-shimmer"></div>
                      <div className="h-7 w-32 bg-white/10 rounded-md loading-shimmer"></div>
                    </div>
                    <div className="h-3 w-36 bg-white/10 rounded-md loading-shimmer"></div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-full bg-white/10 rounded-full loading-shimmer"></div>
                  <div className="h-10 w-full bg-white/10 rounded-full loading-shimmer"></div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="p-6 flex flex-col">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.h2 
                  className="text-2xl font-bold mb-1"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  Tesla {vehicle.model}
                </motion.h2>
                
                <motion.p 
                  className="text-white/70 mb-4"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  {vehicle.tagline}
                </motion.p>
                
                {/* Performance specs */}
                <motion.div 
                  className="grid grid-cols-3 gap-4 mb-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <div className="glass-card p-3 text-center rounded-xl static-shine">
                    <Battery className="mx-auto h-5 w-5 mb-2 text-tesla-blue" />
                    <div className="text-sm text-white/70">Range</div>
                    <div className="font-bold">{vehicle.performance.range} mi</div>
                  </div>
                  
                  <div className="glass-card p-3 text-center rounded-xl static-shine">
                    <Zap className="mx-auto h-5 w-5 mb-2 text-tesla-blue" />
                    <div className="text-sm text-white/70">0-60 mph</div>
                    <div className="font-bold">{vehicle.performance.acceleration}s</div>
                  </div>
                  
                  <div className="glass-card p-3 text-center rounded-xl static-shine">
                    <Gauge className="mx-auto h-5 w-5 mb-2 text-tesla-blue" />
                    <div className="text-sm text-white/70">Top Speed</div>
                    <div className="font-bold">{vehicle.performance.topSpeed} mph</div>
                  </div>
                </motion.div>
                
                {/* Key Features */}
                <motion.div 
                  className="mb-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
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
                </motion.div>
                
                {/* Pricing */}
                <motion.div 
                  className="glass-card p-4 mb-6 rounded-xl static-shine"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
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
                </motion.div>
                
                {/* Action buttons */}
                <motion.div 
                  className="flex gap-4"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                >
                  <Button 
                    className={cn(
                      "flex-1 dynamic-shine",
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
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default VehicleQuickView;
