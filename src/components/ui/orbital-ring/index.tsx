
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export interface OrbitalRingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  speed?: 'slow' | 'medium' | 'fast';
  color?: string;
  thickness?: 'thin' | 'normal' | 'thick';
  reverse?: boolean;
  tilt?: number;
}

const OrbitalRing: React.FC<OrbitalRingProps> = ({
  className,
  size = 'md',
  speed = 'medium',
  color,
  thickness = 'normal',
  reverse = false,
  tilt = 25
}) => {
  const { theme } = useTheme();
  
  // Get theme-specific color
  const getThemeColor = () => {
    if (color) return color;
    
    switch (theme) {
      case 'neoPulse': return 'rgba(94, 92, 230, 0.15)';
      case 'quantumGlass': return 'rgba(255, 255, 255, 0.1)';
      case 'orbitalDark': return 'rgba(249, 115, 22, 0.1)';
      default: return 'rgba(10, 132, 255, 0.15)';
    }
  };
  
  // Get orbital ring duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return 120;
      case 'fast': return 60;
      default: return 90;
    }
  };
  
  // Get ring size
  const getRingSize = () => {
    switch (size) {
      case 'sm': return 'w-[300px] h-[300px]';
      case 'lg': return 'w-[800px] h-[800px]';
      case 'fullscreen': return 'w-[140%] h-[140%]';
      default: return 'w-[500px] h-[500px]';
    }
  };
  
  // Get border thickness
  const getBorderThickness = () => {
    switch (thickness) {
      case 'thin': return 'border-[0.5px]';
      case 'thick': return 'border-2';
      default: return 'border';
    }
  };
  
  return (
    <div className={cn("absolute pointer-events-none overflow-hidden", className)}>
      <motion.div 
        className={cn(
          "absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          getRingSize(),
          getBorderThickness()
        )}
        style={{
          borderColor: getThemeColor(),
          transform: `translate(-50%, -50%) rotateX(${tilt}deg) rotateY(0deg)`,
          opacity: 0.5
        }}
        animate={{ 
          rotateZ: reverse ? -360 : 360 
        }}
        transition={{ 
          duration: getDuration(), 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </div>
  );
};

export default OrbitalRing;
