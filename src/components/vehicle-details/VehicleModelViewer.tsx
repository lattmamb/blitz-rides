
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Sparkles } from 'lucide-react';

interface VehicleModelViewerProps {
  vehicleModel: string;
  vehicleImage: string;
  selectedColor: string;
}

const VehicleModelViewer: React.FC<VehicleModelViewerProps> = ({ 
  vehicleModel, 
  vehicleImage,
  selectedColor 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const { theme } = useTheme();

  // For rotation animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  // For floating effect
  const y = useMotionValue(0);
  
  // For reflection intensity
  const [reflectionIntensity, setReflectionIntensity] = useState(0.2);
  
  // Handle mouse move for 3D rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
    setIsInteracting(true);
    setReflectionIntensity(0.6);
  };
  
  // Reset rotation and reflection when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsInteracting(false);
    setReflectionIntensity(0.2);
  };
  
  // Floating animation when not interacting
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (!isInteracting) {
      interval = setInterval(() => {
        const now = Date.now() / 1000;
        const floatY = Math.sin(now) * 10;
        const rotX = Math.sin(now * 0.5) * 3;
        const rotY = Math.cos(now * 0.5) * 3;
        
        y.set(floatY);
        setRotation({ x: rotX, y: rotY });
      }, 50);
    }
    
    return () => clearInterval(interval);
  }, [isInteracting, y]);
  
  // Get appropriate accent color based on theme
  const getAccentColor = () => {
    switch (theme) {
      case 'neoPulse': return 'rgba(10, 132, 255, 0.8)';
      case 'quantumGlass': return 'rgba(255, 255, 255, 0.8)';
      case 'orbitalDark': return 'rgba(249, 115, 22, 0.8)';
      default: return 'rgba(10, 132, 255, 0.8)';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-full w-full crystal-3d overflow-hidden rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-black/30 to-black/80 z-0"></div>
      
      {/* Grid floor effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 perspective-[1000px] z-0"
        style={{ 
          background: `linear-gradient(to bottom, transparent, ${getAccentColor().replace('0.8', '0.05')})`,
          transform: 'rotateX(60deg)',
          transformOrigin: 'bottom'
        }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(90deg, ${getAccentColor().replace('0.8', '0.2')} 1px, transparent 1px), 
                           linear-gradient(180deg, ${getAccentColor().replace('0.8', '0.2')} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Ambient particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              backgroundColor: getAccentColor().replace('0.8', `${Math.random() * 0.5 + 0.3}`),
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${getAccentColor()}`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [Math.random() * 10, Math.random() * -10, Math.random() * 10],
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.3]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Main vehicle model with 3D effect */}
      <motion.div
        className="relative z-20 h-full w-full flex items-center justify-center"
        style={{
          y,
          rotateX: isInteracting ? rotateX : rotation.x,
          rotateY: isInteracting ? rotateY : rotation.y,
          transformStyle: "preserve-3d",
          transformPerspective: 1000
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {/* Vehicle image with dynamic shadow */}
        <motion.img 
          src={vehicleImage} 
          alt={vehicleModel}
          className="max-h-[80%] max-w-[80%] object-contain relative"
          style={{ 
            filter: `drop-shadow(0 30px 30px rgba(0,0,0,0.4)) drop-shadow(0 0 5px ${getAccentColor().replace('0.8', '0.4')})`,
            transform: `translateZ(50px)` 
          }}
        />
        
        {/* Dynamic color indicator based on selected color */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center"
          style={{ filter: 'blur(1px)' }}
        >
          <div 
            className="w-40 h-2 rounded-full opacity-30" 
            style={{ 
              background: `radial-gradient(circle, ${selectedColor} 0%, transparent 70%)`,
              boxShadow: `0 0 20px ${selectedColor}`
            }}
          ></div>
        </motion.div>
        
        {/* Premium vehicle badge */}
        <motion.div
          className="absolute top-5 right-5 crystal-card px-3 py-1 text-xs font-medium z-30 flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="h-3 w-3 text-tesla-blue" />
          <span>Premium</span>
        </motion.div>
      </motion.div>
      
      {/* Enhanced reflection effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 z-20 opacity-40 pointer-events-none"
        style={{ 
          background: `linear-gradient(to bottom, transparent, ${getAccentColor().replace('0.8', String(reflectionIntensity))})`,
          filter: 'blur(10px)',
          transform: 'scaleY(-1)',
          maskImage: 'linear-gradient(to bottom, transparent, black)'
        }}
      ></div>
    </div>
  );
};

export default VehicleModelViewer;
