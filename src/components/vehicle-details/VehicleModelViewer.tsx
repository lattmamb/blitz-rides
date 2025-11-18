
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

  // Disabled rotation and floating animations
  
  
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
      
      
      {/* Main vehicle model */}
      <div className="relative z-20 h-full w-full flex items-center justify-center">
        {/* Vehicle image */}
        <img 
          src={vehicleImage} 
          alt={vehicleModel}
          className="max-h-[80%] max-w-[80%] object-contain relative"
        />
        
        
        {/* Premium vehicle badge */}
        <div className="absolute top-5 right-5 crystal-card px-3 py-1 text-xs font-medium z-30 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-tesla-blue" />
          <span>Premium</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleModelViewer;
