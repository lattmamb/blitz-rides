
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Vehicle } from '@/types';
import { ArrowRight, Info, Heart, Zap, Battery, Gauge } from 'lucide-react';

interface VehicleCard3DProps {
  vehicle: Vehicle;
  onClick: () => void;
  onQuickView: (e: React.MouseEvent) => void;
  mousePosition?: { x: number; y: number };
  isActive?: boolean;
  carouselView?: boolean;
}

const VehicleCard3D: React.FC<VehicleCard3DProps> = ({
  vehicle,
  onClick,
  onQuickView,
  mousePosition = { x: 0.5, y: 0.5 },
  isActive = true,
  carouselView = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // For 3D rotation effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // For shine effect
  const shineX = useMotionValue(0);
  const opacity = useTransform(shineX, [-300, 0, 300], [0, 1, 0]);
  
  // For reflection glow position
  const [reflectionPos, setReflectionPos] = useState({ x: 50, y: 50 });
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isActive) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate rotation (adjusted to feel more natural)
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    
    setCurrentRotation({ x: x * 8, y: y * 8 });
    
    // Calculate shine effect position
    const mouseXPos = e.clientX - rect.left;
    shineX.set(mouseXPos - rect.width / 2);
    
    // Calculate reflection position
    setReflectionPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentRotation({ x: 0, y: 0 });
  };
  
  // Use mouse position from props when in carousel view
  useEffect(() => {
    if (carouselView && isActive) {
      setCurrentRotation({ 
        x: (mousePosition.y - 0.5) * 20,
        y: (mousePosition.x - 0.5) * -20
      });
      
      setReflectionPos({
        x: mousePosition.x * 100,
        y: mousePosition.y * 100
      });
    }
  }, [carouselView, isActive, mousePosition]);
  
  // Get color based on theme
  const getAccentColor = () => {
    if (theme === 'neoPulse') return 'rgba(10, 132, 255, 0.3)';
    if (theme === 'quantumGlass') return 'rgba(255, 255, 255, 0.2)';
    return 'rgba(249, 115, 22, 0.3)';
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`crystal-card h-full ${carouselView ? 'w-[300px] md:w-[420px]' : 'w-full'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={isActive ? onClick : undefined}
      whileHover={{ y: -10 }}
      style={{
        rotateX: currentRotation.x,
        rotateY: currentRotation.y,
        transition: "transform 0.2s ease",
        transformStyle: "preserve-3d",
        cursor: isActive ? 'pointer' : 'default',
        boxShadow: isHovered 
          ? '0 25px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2), 0 0 20px rgba(10, 132, 255, 0.2)' 
          : '0 15px 35px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)'
      }}
    >
      {/* Enhanced reflection effect on hover */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(circle at ${reflectionPos.x}% ${reflectionPos.y}%, ${getAccentColor()} 0%, transparent 70%)`
            }}
          />
        </motion.div>
      )}
      
      {/* Card content with 3D effect */}
      <div className="p-5 h-full flex flex-col relative">
        {/* Availability badge */}
        <div className="absolute top-3 right-3 z-10">
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
        
        {/* Vehicle image with 3D transform */}
        <motion.div 
          className="relative h-40 flex items-center justify-center mb-4 overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
          }}
        >
          <motion.img
            src={vehicle.image}
            alt={vehicle.model}
            className="h-full max-w-full object-contain"
            style={{
              filter: isHovered ? "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))" : "none"
            }}
            animate={{ 
              y: isHovered ? [-3, 3, -3] : 0,
              rotate: isHovered ? [-0.5, 0.5, -0.5] : 0
            }}
            transition={{ 
              duration: 3, 
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          
          {/* Holographic circle under the car */}
          {isHovered && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[10px] opacity-30"
              style={{
                background: `radial-gradient(ellipse, ${getAccentColor()} 0%, transparent 80%)`,
                filter: "blur(2px)"
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
        
        {/* Vehicle details with 3D transform */}
        <motion.div
          className="flex-1 flex flex-col"
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
          }}
        >
          <div className="flex justify-between items-start mb-3">
            <motion.h3 
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {vehicle.model}
            </motion.h3>
            <div className="text-2xl font-bold text-white">
              ${vehicle.price}
              <span className="text-white/70 text-sm font-normal">{vehicle.priceUnit}</span>
            </div>
          </div>
          
          <p className="text-white/70 text-sm mb-4 line-clamp-2">{vehicle.tagline}</p>
          
          {/* Performance specs */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="crystal-card p-2 text-center backdrop-blur-xl">
              <Battery className="h-4 w-4 text-tesla-blue mx-auto mb-1" />
              <div className="text-xs text-white/70">Range</div>
              <div className="text-sm font-medium">{vehicle.performance.range}mi</div>
            </div>
            <div className="crystal-card p-2 text-center backdrop-blur-xl">
              <Zap className="h-4 w-4 text-tesla-blue mx-auto mb-1" />
              <div className="text-xs text-white/70">0-60</div>
              <div className="text-sm font-medium">{vehicle.performance.acceleration}s</div>
            </div>
            <div className="crystal-card p-2 text-center backdrop-blur-xl">
              <Gauge className="h-4 w-4 text-tesla-blue mx-auto mb-1" />
              <div className="text-xs text-white/70">Top Speed</div>
              <div className="text-sm font-medium">{vehicle.performance.topSpeed}</div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="mt-auto flex gap-2">
            <motion.button
              className="crystal-button flex-1 py-2 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                transformStyle: "preserve-3d",
                transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
              }}
              onClick={isActive ? onClick : undefined}
              disabled={!vehicle.available}
            >
              {vehicle.available ? 'View Details' : 'Coming Soon'}
              <ArrowRight className="inline-block ml-1 h-4 w-4" />
            </motion.button>
            
            {/* Quick view button with 3D effect */}
            <motion.button
              className="crystal-card p-2 aspect-square"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                transformStyle: "preserve-3d",
                transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
              }}
              onClick={(e) => isActive && onQuickView(e)}
            >
              <Info className="h-5 w-5 text-tesla-blue" />
            </motion.button>
            
            <motion.button
              className="crystal-card p-2 aspect-square"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                transformStyle: "preserve-3d",
                transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
              }}
            >
              <Heart className="h-5 w-5 text-tesla-blue" />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Reflection shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.2) 45%, transparent 50%)",
          opacity,
          transform: `rotate(${isHovered ? 10 : 0}deg)`,
          mixBlendMode: "overlay",
          borderRadius: "inherit"
        }}
      />
      
      {/* Enhanced edges */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-black/30 to-transparent pointer-events-none"></div>
    </motion.div>
  );
};

export default VehicleCard3D;
