
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IntelligentShineProps {
  className?: string;
  triggerOnHover?: boolean;
  autoTriggerInterval?: number | null;
  followMouse?: boolean;
  intensity?: 'subtle' | 'medium' | 'high';
  color?: string;
  borderHighlight?: boolean;
  debug?: boolean;
}

const IntelligentShine: React.FC<IntelligentShineProps> = ({
  className,
  triggerOnHover = true,
  autoTriggerInterval = 60000, // Every 60 seconds by default, null to disable
  followMouse = true,
  intensity = 'medium',
  color = 'rgba(255,255,255,0.4)',
  borderHighlight = true,
  debug = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [lastTriggered, setLastTriggered] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [mouseBounds, setMouseBounds] = useState({ x: 50, y: 50 });
  
  // Motion values for mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position into shine position
  const shineX = useTransform(mouseX, [-1, 1], [-100, 200]);
  const shineY = useTransform(mouseY, [-1, 1], [-100, 200]);
  
  // Get intensity values based on selected level
  const getIntensityValues = () => {
    switch (intensity) {
      case 'subtle':
        return { opacity: 0.2, duration: 1.5, blur: 50 };
      case 'high':
        return { opacity: 0.6, duration: 2, blur: 30 };
      case 'medium':
      default:
        return { opacity: 0.4, duration: 1.8, blur: 40 };
    }
  };
  
  const { opacity, duration, blur } = getIntensityValues();
  
  // Handle auto-trigger for idle shine effect
  useEffect(() => {
    if (!autoTriggerInterval) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      // Only trigger if not recently triggered and not currently hovered
      if (now - lastTriggered > autoTriggerInterval && !isHovered) {
        setMouseBounds({ x: Math.random() * 100, y: Math.random() * 100 });
        setShouldAnimate(true);
        setLastTriggered(now);
        
        // Reset after animation completes
        setTimeout(() => {
          setShouldAnimate(false);
        }, duration * 1000 + 100);
      }
    }, 1000); // Check every second
    
    return () => clearInterval(interval);
  }, [autoTriggerInterval, lastTriggered, isHovered, duration]);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!followMouse || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x * 2 - 1); // Convert to -1 to 1 range
    mouseY.set(y * 2 - 1);
    
    setMouseBounds({ x: x * 100, y: y * 100 });
  };
  
  // Handle hover state
  const handleMouseEnter = () => {
    if (!triggerOnHover) return;
    setIsHovered(true);
    setShouldAnimate(true);
    setLastTriggered(Date.now());
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setShouldAnimate(false);
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-10 rounded-inherit",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute"
        style={{
          width: '150%',
          height: '150%',
          top: '-25%',
          left: '-25%',
          background: `radial-gradient(circle at ${mouseBounds.x}% ${mouseBounds.y}%, ${color} 0%, transparent 70%)`,
          borderRadius: 'inherit',
          filter: `blur(${blur}px)`,
          opacity: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: shouldAnimate ? opacity : 0,
        }}
        transition={{
          duration: duration,
          ease: "easeInOut",
        }}
      />
      
      {/* Border highlight effect */}
      {borderHighlight && (
        <motion.div
          className="absolute inset-0"
          style={{
            boxShadow: `0 0 0 1px ${color.replace(/[\d.]+\)$/g, '0.1)')}`,
            borderRadius: 'inherit',
            opacity: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: shouldAnimate ? 1 : 0,
          }}
          transition={{
            duration: duration * 0.7,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Debug overlay */}
      {debug && (
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs p-1 rounded z-50">
          {mouseBounds.x.toFixed(0)}%, {mouseBounds.y.toFixed(0)}%
          <br />
          {shouldAnimate ? 'Animating' : 'Idle'}
        </div>
      )}
    </motion.div>
  );
};

export default IntelligentShine;
