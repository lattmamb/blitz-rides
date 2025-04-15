
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
  amplitude?: 'small' | 'medium' | 'large';
  delay?: number;
  reverse?: boolean;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className,
  speed = 'medium',
  amplitude = 'medium',
  delay = 0,
  reverse = false
}) => {
  // Get duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return 6;
      case 'fast': return 3;
      default: return 4;
    }
  };
  
  // Get y movement distance based on amplitude
  const getYDistance = () => {
    switch (amplitude) {
      case 'small': return 5;
      case 'large': return 15;
      default: return 10;
    }
  };
  
  // Get rotation amount based on amplitude
  const getRotation = () => {
    switch (amplitude) {
      case 'small': return 1;
      case 'large': return 3;
      default: return 2;
    }
  };
  
  const duration = getDuration();
  const yDistance = getYDistance();
  const rotation = getRotation() * (reverse ? -1 : 1);

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [0, -yDistance, 0],
        rotate: [0, rotation, 0],
        x: reverse ? [0, -3, 0] : [0, 3, 0]
      }}
      transition={{ 
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
