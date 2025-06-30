
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
  const [scrollVelocity, setScrollVelocity] = useState(0);
  
  useEffect(() => {
    if (!interactive) return;
    
    let lastScrollTime = Date.now();
    let lastScrollY = window.scrollY;
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = mousePosition.x;
      const currentY = mousePosition.y;
      const targetX = e.clientX / window.innerWidth;
      const targetY = e.clientY / window.innerHeight;
      
      setMousePosition({
        x: currentX + (targetX - currentX) * 0.08,
        y: currentY + (targetY - currentY) * 0.08
      });
    };
    
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const deltaTime = currentTime - lastScrollTime;
      const deltaScroll = Math.abs(currentScrollY - lastScrollY);
      
      // Calculate scroll velocity for dynamic effects
      const velocity = deltaTime > 0 ? deltaScroll / deltaTime : 0;
      setScrollVelocity(Math.min(velocity * 0.5, 1));
      
      setScrollPosition(currentScrollY * 0.3);
      
      lastScrollTime = currentTime;
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [interactive, mousePosition]);
  
  // Theme-aware glass colors with enhanced opacity
  const getThemeColors = () => {
    switch (theme) {
      case 'neoPulse':
        return {
          primary: 'rgba(10, 132, 255, 0.12)',
          secondary: 'rgba(94, 92, 230, 0.08)',
          accent: 'rgba(139, 92, 246, 0.06)',
          reflection: 'rgba(10, 132, 255, 0.15)'
        };
      case 'quantumGlass':
        return {
          primary: 'rgba(255, 255, 255, 0.08)',
          secondary: 'rgba(255, 255, 255, 0.05)',
          accent: 'rgba(255, 255, 255, 0.03)',
          reflection: 'rgba(255, 255, 255, 0.12)'
        };
      case 'orbitalDark':
        return {
          primary: 'rgba(249, 115, 22, 0.1)',
          secondary: 'rgba(234, 88, 12, 0.06)',
          accent: 'rgba(194, 65, 12, 0.04)',
          reflection: 'rgba(249, 115, 22, 0.12)'
        };
      default:
        return {
          primary: 'rgba(10, 132, 255, 0.12)',
          secondary: 'rgba(94, 92, 230, 0.08)',
          accent: 'rgba(139, 92, 246, 0.06)',
          reflection: 'rgba(10, 132, 255, 0.15)'
        };
    }
  };
  
  const { primary, secondary, accent, reflection } = getThemeColors();
  
  // Calculate dynamic positions based on scroll and mouse
  const getGlassPanelTransform = (index: number) => {
    const scrollFactor = scrollPosition * 0.001;
    const mouseFactor = (mousePosition.x - 0.5) * 0.02;
    const velocityFactor = scrollVelocity * 0.1;
    
    return {
      transform: `
        translateX(${(mouseFactor + scrollFactor * (index % 2 === 0 ? 1 : -1)) * 100}px)
        translateY(${(scrollPosition * 0.05 * (index + 1)) * -1}px)
        rotateX(${15 + velocityFactor * 5}deg)
        rotateY(${(mousePosition.x - 0.5) * 10}deg)
        rotateZ(${(index * 5) + (scrollPosition * 0.01)}deg)
      `,
      opacity: 0.6 + scrollVelocity * 0.3
    };
  };
  
  // Light reflection calculations
  const getLightReflection = () => {
    const scrollIntensity = Math.min(scrollPosition * 0.002, 1);
    const mouseIntensity = Math.sqrt(Math.pow(mousePosition.x - 0.5, 2) + Math.pow(mousePosition.y - 0.5, 2));
    
    return {
      x: `${50 + (mousePosition.x - 0.5) * 30 + scrollPosition * 0.05}%`,
      y: `${50 + (mousePosition.y - 0.5) * 30 - scrollPosition * 0.03}%`,
      intensity: 0.3 + scrollIntensity * 0.4 + mouseIntensity * 0.3 + scrollVelocity * 0.2
    };
  };

  const lightReflection = getLightReflection();

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Deep black base with subtle gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top, #0a0a0a 0%, #000000 70%),
            linear-gradient(180deg, #050505 0%, #000000 100%)
          `
        }}
      />
      
      {/* Glass morphism layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary glass panel */}
        <div 
          className="absolute inset-0"
          style={{
            ...getGlassPanelTransform(0),
            background: `
              linear-gradient(135deg, 
                ${primary} 0%, 
                transparent 30%, 
                ${secondary} 70%, 
                transparent 100%
              )
            `,
            backdropFilter: 'blur(40px)',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        />
        
        {/* Secondary glass panel */}
        <div 
          className="absolute inset-0"
          style={{
            ...getGlassPanelTransform(1),
            background: `
              linear-gradient(225deg, 
                transparent 0%, 
                ${accent} 40%, 
                ${primary} 60%, 
                transparent 100%
              )
            `,
            backdropFilter: 'blur(60px)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        />
        
        {/* Tertiary glass panel */}
        <div 
          className="absolute inset-0"
          style={{
            ...getGlassPanelTransform(2),
            background: `
              radial-gradient(ellipse at ${lightReflection.x} ${lightReflection.y}, 
                ${secondary} 0%, 
                transparent 50%
              )
            `,
            backdropFilter: 'blur(80px)',
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        />
      </div>
      
      {/* Dynamic light reflections */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary light source */}
        <div 
          className="absolute w-full h-full"
          style={{
            background: `
              radial-gradient(circle at ${lightReflection.x} ${lightReflection.y}, 
                ${reflection} 0%, 
                transparent 40%
              )
            `,
            opacity: lightReflection.intensity,
            filter: 'blur(100px)',
            transition: 'all 0.3s ease-out'
          }}
        />
        
        {/* Secondary moving light */}
        <div 
          className="absolute w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 150% 80% at ${lightReflection.x} 20%, 
                ${primary} 0%, 
                transparent 60%
              )
            `,
            opacity: 0.4 + scrollVelocity * 0.3,
            filter: 'blur(120px)',
            transform: `translateY(${scrollPosition * -0.1}px)`,
            transition: 'all 0.5s ease-out'
          }}
        />
        
        {/* Edge light streaks */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, 
                ${reflection} 0%, 
                transparent 20%, 
                transparent 80%, 
                ${reflection} 100%
              )
            `,
            opacity: 0.1 + scrollVelocity * 0.2,
            filter: 'blur(50px)',
            transform: `scaleY(${1 + scrollVelocity * 0.5})`,
            transition: 'all 0.4s ease-out'
          }}
        />
      </div>
      
      {/* Glass surface highlights */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top edge reflection */}
        <div 
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${reflection} 50%, 
              transparent 100%
            )`,
            opacity: 0.6 + scrollVelocity * 0.4,
            filter: 'blur(2px)',
            transition: 'opacity 0.3s ease-out'
          }}
        />
        
        {/* Side reflections */}
        <div 
          className="absolute inset-y-0 left-0 w-1"
          style={{
            background: `linear-gradient(180deg, 
              ${reflection} 0%, 
              transparent 30%, 
              transparent 70%, 
              ${reflection} 100%
            )`,
            opacity: 0.3 + mousePosition.x * 0.3,
            filter: 'blur(3px)',
            transition: 'opacity 0.3s ease-out'
          }}
        />
        
        <div 
          className="absolute inset-y-0 right-0 w-1"
          style={{
            background: `linear-gradient(180deg, 
              ${reflection} 0%, 
              transparent 30%, 
              transparent 70%, 
              ${reflection} 100%
            )`,
            opacity: 0.3 + (1 - mousePosition.x) * 0.3,
            filter: 'blur(3px)',
            transition: 'opacity 0.3s ease-out'
          }}
        />
        
        {/* Bottom gradient reflection */}
        <div 
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: `linear-gradient(0deg, 
              ${primary} 0%, 
              transparent 100%
            )`,
            opacity: 0.2,
            filter: 'blur(20px)'
          }}
        />
      </div>
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            )
          `
        }}
      />
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CrystalBackground;
