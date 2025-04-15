
import React, { useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

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
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowOpacity, setGlowOpacity] = useState(0);
  
  // Get theme-specific colors
  const getThemeGlow = () => {
    switch (theme) {
      case 'neoPulse': return 'rgba(94, 92, 230, 0.12)';
      case 'quantumGlass': return 'rgba(255, 255, 255, 0.08)';
      case 'orbitalDark': return 'rgba(249, 115, 22, 0.1)';
      default: return 'rgba(10, 132, 255, 0.12)';
    }
  };
  
  const glowColor = getThemeGlow();
  
  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Smoother transitions with easing
    setRotation({
      x: y * -5, // Reduced intensity, was -8
      y: x * 5   // Reduced intensity, was 8
    });
    setGlowOpacity(0.3); // Reduced opacity, was 0.5
  };
  
  const handleMouseLeave = () => {
    if (!interactive) return;
    setRotation({ x: 0, y: 0 });
    setGlowOpacity(0);
    setIsHovered(false);
  };
  
  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
  };
  
  // Get shadow based on depth
  const getShadow = () => {
    const baseShadow = `0 5px 20px rgba(0, 0, 0, 0.2), 0 0 10px ${glowColor}`;
    
    if (!interactive) return baseShadow;
    
    switch (depth) {
      case 'shallow': 
        return isHovered 
          ? `0 5px 15px rgba(0, 0, 0, 0.25), 0 0 10px ${glowColor}`
          : baseShadow;
      case 'deep': 
        return isHovered 
          ? `0 15px 40px rgba(0, 0, 0, 0.35), 0 0 20px ${glowColor}`
          : baseShadow;
      default: 
        return isHovered 
          ? `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${glowColor}`
          : baseShadow;
    }
  };
  
  return (
    <div
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
        transform: interactive 
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          : 'none',
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
        boxShadow: getShadow()
      }}
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
          background: `linear-gradient(to bottom, rgba(255, 255, 255, ${isHovered ? 0.08 : 0.05}) 0%, transparent 100%)`
        }}
      />
      
      {/* Static glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHovered 
            ? `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)`
            : 'none',
          opacity: glowOpacity,
          transition: "opacity 0.5s ease-out"
        }}
      />
      
      {/* Static light glint effect instead of animated */}
      {glint && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div
            className="absolute -inset-full"
            style={{
              width: '50%',
              height: '200%',
              transform: 'rotate(30deg) translateX(-100%)',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
              transition: isHovered ? 'transform 0.5s ease-out' : 'none',
              left: isHovered ? '150%' : '-100%'
            }}
          />
        </div>
      )}
      
      {/* Content - with subtle parallax effect */}
      <div 
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: interactive && isHovered ? "translateZ(10px)" : "translateZ(0px)",
          transition: "transform 0.3s ease-out"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CrystalCard;
