
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface HoveringObjectProps {
  children: React.ReactNode;
  className?: string;
  float?: boolean;
  rotate?: boolean;
  initialOffset?: { x: number; y: number; z: number };
  motionSensitivity?: number;
}

const HoveringObject: React.FC<HoveringObjectProps> = ({
  children,
  className,
  float = true,
  rotate = true,
  initialOffset = { x: 0, y: 0, z: 0 },
  motionSensitivity = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configuration for smoother movement
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  
  // Transformed values for rotation based on mouse position
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10].map(v => v * motionSensitivity)), 
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10].map(v => v * motionSensitivity)), 
    springConfig
  );
  
  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        perspective: 1000
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          rotateX: rotate ? rotateX : 0,
          rotateY: rotate ? rotateY : 0,
          translateX: initialOffset.x,
          translateY: initialOffset.y,
          translateZ: initialOffset.z
        }}
        animate={float ? {
          y: [0, -10, 0],
          rotateZ: rotate ? [0, initialOffset.z ? -2 : 2, 0] : 0
        } : {}}
        transition={float ? {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        } : {}}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default HoveringObject;
