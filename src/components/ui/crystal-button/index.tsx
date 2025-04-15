
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export interface CrystalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glow' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CrystalButton: React.FC<CrystalButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const { theme } = useTheme();
  
  // Get theme specific colors
  const getThemeAccent = () => {
    switch (theme) {
      case 'neoPulse': return 'rgba(94, 92, 230, 0.7)';
      case 'quantumGlass': return 'rgba(10, 132, 255, 0.7)';
      case 'orbitalDark': return 'rgba(249, 115, 22, 0.7)';
      default: return 'rgba(10, 132, 255, 0.7)';
    }
  };
  
  const getThemeGlow = () => {
    switch (theme) {
      case 'neoPulse': return '0 0 20px rgba(94, 92, 230, 0.5)';
      case 'quantumGlass': return '0 0 20px rgba(10, 132, 255, 0.5)';
      case 'orbitalDark': return '0 0 20px rgba(249, 115, 22, 0.5)';
      default: return '0 0 20px rgba(10, 132, 255, 0.5)';
    }
  };
  
  const accentColor = getThemeAccent();
  const glowEffect = getThemeGlow();
  
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };
  
  // Variant base classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'glow':
        return 'bg-black/30 border border-white/10 text-white';
      case 'outline':
        return 'bg-transparent border border-white/20 text-white hover:bg-white/5';
      default:
        return 'bg-black/30 border border-white/10 text-white';
    }
  };

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-full font-medium transition-all duration-300 backdrop-blur-md",
        "flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/20",
        getVariantClasses(),
        sizeClasses[size],
        className
      )}
      style={{
        boxShadow: variant === 'glow' ? glowEffect : 'none'
      }}
      {...props}
    >
      {/* Top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      
      {/* Surface light effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 opacity-80 pointer-events-none" />
      
      {/* Static shine effect instead of animated */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.08) 40%, transparent 50%)',
          zIndex: 1
        }}
      />
      
      {/* Gradient accent border for glow variant */}
      {variant === 'glow' && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
            filter: 'blur(8px)',
            opacity: 0.5,
            zIndex: -1
          }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default CrystalButton;
