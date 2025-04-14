import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Vehicle } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ChevronRight, Star, Battery, Zap, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface VehicleCard3DProps {
  vehicle: Vehicle;
  isActive?: boolean;
  carouselView?: boolean;
  onClick: () => void;
  onQuickView: (e: React.MouseEvent) => void;
  mousePosition: { x: number; y: number };
}

const VehicleCard3D: React.FC<VehicleCard3DProps> = ({
  vehicle,
  isActive = true,
  carouselView = false,
  onClick,
  onQuickView,
  mousePosition
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);
  
  const imageY = useTransform(y, [-0.5, 0.5], [10, -10]);
  const imageX = useTransform(x, [-0.5, 0.5], [10, -10]);
  const contentY = useTransform(y, [-0.5, 0.5], [5, -5]);
  const contentX = useTransform(x, [-0.5, 0.5], [5, -5]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isActive || carouselView) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    x.set(normalizedX);
    y.set(normalizedY);
    
    setLocalMouse({ x: normalizedX, y: normalizedY });
  };
  
  useEffect(() => {
    if (carouselView && isActive) {
      x.set((mousePosition.x - 0.5) * 0.3);
      y.set((mousePosition.y - 0.5) * 0.3);
    }
  }, [carouselView, isActive, mousePosition, x, y]);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!carouselView) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative h-full",
        carouselView ? "w-full max-w-3xl" : "w-full"
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: 1000,
        cursor: isActive ? 'pointer' : 'default'
      }}
      whileHover={{ scale: carouselView ? 1 : 1.02 }}
      onClick={isActive ? onClick : undefined}
    >
      <motion.div
        className={cn(
          "glass-card h-full rounded-2xl overflow-hidden border-none",
          isHovered && !carouselView ? "shadow-lg" : "",
          theme === 'neoPulse' ? "neo-pulse-card" :
          theme === 'quantumGlass' ? "quantum-glass-card" :
          "orbital-dark-card"
        )}
        style={{
          rotateX: carouselView && !isActive ? 0 : rotateX,
          rotateY: carouselView && !isActive ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${(localMouse.x + 0.5) * 100}% ${(localMouse.y + 0.5) * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
        
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />
        
        <motion.div 
          className="relative aspect-video overflow-hidden bg-black"
          style={{ 
            transformStyle: "preserve-3d",
            zIndex: 1,
            x: imageX,
            y: imageY
          }}
        >
          <motion.img
            src={vehicle.image}
            alt={vehicle.model}
            className="w-full h-full object-cover transition-transform"
            style={{ 
              transformStyle: "preserve-3d",
              scale: isHovered ? 1.05 : 1
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          
          <div className="absolute top-3 right-3 z-10">
            {vehicle.available ? (
              <div className="bg-tesla-green/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                Available
              </div>
            ) : (
              <div className="bg-tesla-red/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                Coming Soon
              </div>
            )}
          </div>
          
          <motion.div 
            className="absolute bottom-4 left-4 right-4 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              {vehicle.model}
            </h3>
            <p className="text-white/80 text-sm">Tesla {vehicle.type}</p>
          </motion.div>
          
          <motion.div 
            className="absolute top-4 left-4 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="icon"
              variant="glx-glass"
              className="rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20"
              onClick={onQuickView}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="p-4 z-10 relative"
          style={{
            transformStyle: "preserve-3d",
            x: contentX,
            y: contentY
          }}
        >
          <motion.div
            className="space-y-2"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-bold">Tesla {vehicle.model}</h3>
            <p className="text-white/70 text-sm line-clamp-2">{vehicle.tagline}</p>
            
            <div className="flex items-baseline justify-between mt-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                <span className="font-medium">{vehicle.rating || 5}</span>
                <span className="text-white/60 text-xs">({vehicle.reviewCount || 100})</span>
              </div>
              <div className="text-xl font-bold">
                ${vehicle.price}<span className="text-white/70 text-sm font-normal">{vehicle.priceUnit}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="absolute inset-0 p-4 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="glass-card p-2 text-center rounded-lg">
                <Battery className="mx-auto h-4 w-4 text-tesla-blue mb-1" />
                <div className="text-xs font-medium">{vehicle.performance.range} mi</div>
              </div>
              
              <div className="glass-card p-2 text-center rounded-lg">
                <Zap className="mx-auto h-4 w-4 text-tesla-blue mb-1" />
                <div className="text-xs font-medium">{vehicle.performance.acceleration}s</div>
              </div>
              
              <div className="glass-card p-2 text-center rounded-lg">
                <Gauge className="mx-auto h-4 w-4 text-tesla-blue mb-1" />
                <div className="text-xs font-medium">{vehicle.performance.topSpeed} mph</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">
                ${vehicle.price}<span className="text-white/70 text-sm font-normal">{vehicle.priceUnit}</span>
              </div>
              
              <motion.button 
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium flex items-center",
                  theme === 'neoPulse' ? "bg-tesla-blue/90 text-white" :
                  theme === 'quantumGlass' ? "bg-white/10 backdrop-blur-xl text-white" :
                  "bg-tesla-purple/90 text-white"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Details <ChevronRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>
      
      <motion.div
        className="absolute -inset-1 rounded-2xl z-[-1] opacity-0"
        style={{
          background: theme === 'neoPulse' 
            ? 'radial-gradient(circle at center, rgba(10,132,255,0.3) 0%, transparent 70%)' 
            : theme === 'quantumGlass'
            ? 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(249,115,22,0.2) 0%, transparent 70%)',
          filter: 'blur(10px)',
          transform: 'translateZ(-10px)'
        }}
        animate={{ 
          opacity: isHovered ? 0.8 : 0,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default VehicleCard3D;
