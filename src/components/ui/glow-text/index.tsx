
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export interface GlowTextProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  variant?: 'default' | 'soft' | 'intense';
  perspective?: boolean;
}

const GlowText: React.FC<GlowTextProps> = ({
  children,
  as: Component = 'div',
  className,
  variant = 'default',
  perspective = false
}) => {
  const { theme } = useTheme();
  
  // Get theme-specific glow color
  const getGlowColor = () => {
    switch (theme) {
      case 'neoPulse': return 'rgba(94, 92, 230, 0.5)';
      case 'quantumGlass': return 'rgba(255, 255, 255, 0.5)';
      case 'orbitalDark': return 'rgba(249, 115, 22, 0.5)';
      default: return 'rgba(10, 132, 255, 0.5)';
    }
  };
  
  // Get gradient based on theme
  const getGradient = () => {
    switch (theme) {
      case 'neoPulse': 
        return 'linear-gradient(135deg, #FFFFFF 0%, #8B5CF6 100%)';
      case 'quantumGlass': 
        return 'linear-gradient(135deg, #FFFFFF 0%, #8E9196 100%)';
      case 'orbitalDark': 
        return 'linear-gradient(135deg, #FFFFFF 0%, #F97316 100%)';
      default: 
        return 'linear-gradient(135deg, #FFFFFF 0%, #0A84FF 100%)';
    }
  };
  
  // Get text shadow intensity based on variant
  const getTextShadow = () => {
    const color = getGlowColor();
    
    switch (variant) {
      case 'soft': 
        return `0 0 5px ${color}`;
      case 'intense': 
        return `0 0 5px ${color}, 0 0 15px ${color}, 0 0 25px ${color.replace('0.5', '0.3')}`;
      default: 
        return `0 0 10px ${color}`;
    }
  };

  // Separate styles to avoid type issues
  const containerStyle = {
    perspective: perspective ? '1000px' : 'none',
  };
  
  const textStyle = {
    textShadow: getTextShadow(),
    backgroundImage: getGradient(),
    transform: perspective ? 'perspective(1000px) translateZ(20px)' : 'none',
    transformStyle: 'preserve-3d' as 'preserve-3d' // Type assertion to fix compatibility
  };

  return (
    <div 
      className={cn(
        perspective && "transform-gpu",
        className
      )}
      style={containerStyle}
    >
      <Component
        className={cn(
          "bg-clip-text text-transparent",
          className
        )}
        style={textStyle}
      >
        {children}
      </Component>
    </div>
  );
};

export default GlowText;
