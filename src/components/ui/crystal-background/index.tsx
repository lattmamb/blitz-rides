
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface CrystalBackgroundProps {
  children?: React.ReactNode;
  variant?: 'default' | 'deep' | 'nebula';
  interactive?: boolean;
}

const CrystalBackground: React.FC<CrystalBackgroundProps> = ({ 
  children, 
  variant = 'default', 
  interactive = true 
}) => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY * 0.1);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [interactive]);
  
  // Set color based on current theme
  const getThemeColors = () => {
    switch (theme) {
      case 'neoPulse':
        return {
          primary: 'rgba(10, 132, 255, 0.15)',
          secondary: 'rgba(94, 92, 230, 0.1)',
          accent: 'rgba(139, 92, 246, 0.05)'
        };
      case 'quantumGlass':
        return {
          primary: 'rgba(255, 255, 255, 0.08)',
          secondary: 'rgba(255, 255, 255, 0.05)',
          accent: 'rgba(255, 255, 255, 0.03)'
        };
      case 'orbitalDark':
        return {
          primary: 'rgba(249, 115, 22, 0.1)',
          secondary: 'rgba(234, 88, 12, 0.07)',
          accent: 'rgba(194, 65, 12, 0.05)'
        };
      default:
        return {
          primary: 'rgba(10, 132, 255, 0.15)',
          secondary: 'rgba(94, 92, 230, 0.1)',
          accent: 'rgba(139, 92, 246, 0.05)'
        };
    }
  };
  
  const { primary, secondary, accent } = getThemeColors();
  
  // Calculate parallax positions
  const getNebulaPosition = () => {
    if (!interactive) return { x: '0%', y: '0%' };
    return { 
      x: `${(mousePosition.x - 0.5) * -10}%`,
      y: `${(mousePosition.y - 0.5) * -10 + scrollPosition * 0.05}%`
    };
  };
  
  const getStarFieldPosition = () => {
    if (!interactive) return { x: '0%', y: '0%' };
    return { 
      x: `${(mousePosition.x - 0.5) * -5}%`,
      y: `${(mousePosition.y - 0.5) * -5 + scrollPosition * 0.02}%`
    };
  };
  
  const getDustPosition = () => {
    if (!interactive) return { x: '0%', y: '0%' };
    return { 
      x: `${(mousePosition.x - 0.5) * -2}%`,
      y: `${(mousePosition.y - 0.5) * -2 + scrollPosition * 0.01}%`
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base background */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: variant === 'deep' 
            ? 'radial-gradient(circle at 50% 50%, #080810 0%, #000000 100%)' 
            : 'radial-gradient(circle at 50% 0%, #0a0a12 0%, #000000 100%)'
        }}
      />
      
      {/* Nebula effect - deep background layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={getNebulaPosition()}
        transition={{ type: 'spring', damping: 25, stiffness: 100 }}
      >
        <div 
          className="absolute top-1/4 -left-[25%] w-[150%] h-[150%] rounded-full opacity-30 mix-blend-screen"
          style={{ 
            background: `radial-gradient(ellipse at center, ${primary} 0%, transparent 70%)`,
            filter: 'blur(80px)'
          }}
        />
        
        <div 
          className="absolute bottom-1/4 -right-[25%] w-[150%] h-[150%] rounded-full opacity-20 mix-blend-screen"
          style={{ 
            background: `radial-gradient(ellipse at center, ${secondary} 0%, transparent 70%)`,
            filter: 'blur(100px)',
            transform: 'rotate(15deg)'
          }}
        />
      </motion.div>
      
      {/* Star field layer - middle layer */}
      {variant !== 'deep' && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          animate={getStarFieldPosition()}
          transition={{ type: 'spring', damping: 50, stiffness: 200 }}
        >
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
          
          {/* Crystal grid */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: `perspective(1000px) rotateX(75deg) translateY(${scrollPosition * 0.5}px)`,
              transformOrigin: 'center top'
            }}
          />
        </motion.div>
      )}
      
      {/* Dust and particles layer - top layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={getDustPosition()}
        transition={{ type: 'spring', damping: 60, stiffness: 300 }}
      >
        {/* Glass edge highlights */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        {variant === 'nebula' && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(1px circle at center, ${accent} 0%, transparent 100%)`,
              backgroundSize: '20px 20px'
            }}
          />
        )}
      </motion.div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CrystalBackground;
