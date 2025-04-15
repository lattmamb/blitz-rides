
import React, { useEffect, useState } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Slow down the mouse tracking for more subtle effect
      const currentX = mousePosition.x;
      const currentY = mousePosition.y;
      const targetX = e.clientX / window.innerWidth;
      const targetY = e.clientY / window.innerHeight;
      
      // Smooth lerp for mouse movement
      setMousePosition({
        x: currentX + (targetX - currentX) * 0.05,
        y: currentY + (targetY - currentY) * 0.05
      });
    };
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY * 0.05); // Reduced intensity
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [interactive, mousePosition]);
  
  // Set color based on current theme but with darker values
  const getThemeColors = () => {
    switch (theme) {
      case 'neoPulse':
        return {
          primary: 'rgba(10, 132, 255, 0.07)',
          secondary: 'rgba(94, 92, 230, 0.05)',
          accent: 'rgba(139, 92, 246, 0.03)'
        };
      case 'quantumGlass':
        return {
          primary: 'rgba(255, 255, 255, 0.04)',
          secondary: 'rgba(255, 255, 255, 0.02)',
          accent: 'rgba(255, 255, 255, 0.01)'
        };
      case 'orbitalDark':
        return {
          primary: 'rgba(249, 115, 22, 0.05)',
          secondary: 'rgba(234, 88, 12, 0.03)',
          accent: 'rgba(194, 65, 12, 0.02)'
        };
      default:
        return {
          primary: 'rgba(10, 132, 255, 0.07)',
          secondary: 'rgba(94, 92, 230, 0.05)',
          accent: 'rgba(139, 92, 246, 0.03)'
        };
    }
  };
  
  const { primary, secondary, accent } = getThemeColors();
  
  // Calculate parallax positions with reduced movement
  const getNebulaPosition = () => {
    if (!interactive) return { x: '0%', y: '0%' };
    return { 
      x: `${(mousePosition.x - 0.5) * -5}%`,
      y: `${(mousePosition.y - 0.5) * -5 + scrollPosition * 0.02}%`
    };
  };
  
  const getStarFieldPosition = () => {
    if (!interactive) return { x: '0%', y: '0%' };
    return { 
      x: `${(mousePosition.x - 0.5) * -2}%`,
      y: `${(mousePosition.y - 0.5) * -2 + scrollPosition * 0.01}%`
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Pure black base background */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0%, #050505 0%, #000000 100%)'
        }}
      />
      
      {/* Nebula effect - very subtle */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${getNebulaPosition().x}, ${getNebulaPosition().y})`,
          transition: 'transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1)'
        }}
      >
        <div 
          className="absolute top-1/4 -left-[25%] w-[150%] h-[150%] rounded-full opacity-30 mix-blend-screen"
          style={{ 
            background: `radial-gradient(ellipse at center, ${primary} 0%, transparent 70%)`,
            filter: 'blur(120px)'
          }}
        />
        
        <div 
          className="absolute bottom-1/4 -right-[25%] w-[150%] h-[150%] rounded-full opacity-20 mix-blend-screen"
          style={{ 
            background: `radial-gradient(ellipse at center, ${secondary} 0%, transparent 70%)`,
            filter: 'blur(150px)',
            transform: 'rotate(15deg)'
          }}
        />
      </div>
      
      {/* Star field layer - extremely subtle */}
      {variant !== 'deep' && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${getStarFieldPosition().x}, ${getStarFieldPosition().y})`,
            transition: 'transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)'
          }}
        >
          <div className="absolute inset-0 bg-noise opacity-[0.01]" />
          
          {/* Crystal grid - barely visible */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: `perspective(1000px) rotateX(75deg) translateY(${scrollPosition * 0.2}px)`,
              transformOrigin: 'center top'
            }}
          />
        </div>
      )}
      
      {/* Subtle glass edge highlights */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/3 to-transparent" />
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CrystalBackground;
