
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  mouseParallax?: boolean;
  mouseIntensity?: number;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  className,
  speed = 0.3,
  direction = 'up',
  mouseParallax = false,
  mouseIntensity = 0.02
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate transform based on direction
  const getTransform = () => {
    switch (direction) {
      case 'down': return useTransform(scrollYProgress, [0, 1], ['0%', `${100 * speed}%`]);
      case 'left': return useTransform(scrollYProgress, [0, 1], ['0%', `${-100 * speed}%`]);
      case 'right': return useTransform(scrollYProgress, [0, 1], ['0%', `${100 * speed}%`]);
      default: return useTransform(scrollYProgress, [0, 1], ['0%', `${-100 * speed}%`]);
    }
  };
  
  const transform = getTransform();
  
  // Handle mouse movement for mouse parallax
  useEffect(() => {
    if (!mouseParallax) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center as a percentage (-1 to 1)
      const x = ((e.clientX - centerX) / window.innerWidth) * 2;
      const y = ((e.clientY - centerY) / window.innerHeight) * 2;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseParallax]);
  
  // Calculate mouse-based transform
  const getMouseTransform = () => {
    if (!mouseParallax) return { x: 0, y: 0 };
    
    const intensity = mouseIntensity * 100;
    
    return { 
      x: -mousePosition.x * intensity,
      y: -mousePosition.y * intensity
    };
  };

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        style={{
          y: direction === 'up' || direction === 'down' ? transform : 0,
          x: direction === 'left' || direction === 'right' ? transform : 0,
        }}
        animate={getMouseTransform()}
        transition={mouseParallax ? { type: 'spring', damping: 15 } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxContainer;
