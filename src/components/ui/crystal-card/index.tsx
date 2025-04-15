
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export interface CrystalCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: 'shallow' | 'medium' | 'deep';
  interactive?: boolean;
  glint?: boolean;
}

const CrystalCard: React.FC<CrystalCardProps> = ({
  children,
  className,
  depth = 'medium',
  interactive = true,
  glint = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  
  // Motion values for the 3D perspective effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics configuration based on depth
  const getSpringConfig = () => {
    switch(depth) {
      case 'shallow': return { damping: 25, stiffness: 300, mass: 0.5 };
      case 'deep': return { damping: 15, stiffness: 150, mass: 0.8 };
      default: return { damping: 20, stiffness: 200, mass: 0.6 };
    }
  };
  
  const springConfig = getSpringConfig();
  
  // Transform mouse position to rotation values
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Glow effect
  const glow = useSpring(0, springConfig);
  
  // Get theme-specific colors
  const getThemeGlow = () => {
    switch (theme) {
      case 'neoPulse': return 'rgba(94, 92, 230, 0.15)';
      case 'quantumGlass': return 'rgba(255, 255, 255, 0.1)';
      case 'orbitalDark': return 'rgba(249, 115, 22, 0.12)';
      default: return 'rgba(10, 132, 255, 0.15)';
    }
  };
  
  const glowColor = getThemeGlow();
  
  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    glow.set(0.5);
  };
  
  const handleMouseLeave = () => {
    if (!interactive) return;
    mouseX.set(0);
    mouseY.set(0);
    glow.set(0);
    setIsHovered(false);
  };
  
  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden backdrop-blur-xl bg-black/20 rounded-2xl",
        interactive && "transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        boxShadow: interactive 
          ? `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${glowColor}`
          : `0 5px 20px rgba(0, 0, 0, 0.2), 0 0 10px ${glowColor}`
      }}
      whileHover={interactive ? { scale: 1.02 } : {}}
    >
      {/* Edge highlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
        <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/20" />
        <div className="absolute inset-y-0 right-0 w-[1px] bg-black/20" />
      </div>
      
      {/* Surface glass effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, rgba(255, 255, 255, ${isHovered ? 0.1 : 0.05}) 0%, transparent 100%)`
        }}
      />
      
      {/* Interactive glow effect */}
      {interactive && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`,
            opacity: glow
          }}
        />
      )}
      
      {/* Light glint effect */}
      {glint && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute -inset-[100%]"
            animate={isHovered ? { left: '200%' } : { left: '-100%' }}
            transition={isHovered ? { duration: 1, ease: 'linear' } : { duration: 0 }}
            style={{
              width: '50%',
              height: '200%',
              transform: 'rotate(30deg)',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            }}
          />
        </motion.div>
      )}
      
      {/* Content - with subtle parallax effect */}
      <motion.div 
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: interactive && isHovered ? "translateZ(20px)" : "translateZ(0px)",
          transition: "transform 0.3s ease-out"
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default CrystalCard;
