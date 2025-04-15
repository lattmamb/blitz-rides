
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
    <motion.button
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
      whileHover={{
        scale: 1.03,
        boxShadow: variant === 'glow' ? glowEffect.replace('0.5', '0.7') : '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* Top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      
      {/* Surface light effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 opacity-80 pointer-events-none" />
      
      {/* Shine animation layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ left: '-100%' }}
        animate={{ left: '200%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', repeatDelay: 5 }}
        style={{
          width: '50%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          zIndex: 1,
          transform: 'skewX(-15deg)'
        }}
      />
      
      {/* Gradient accent border for glow variant */}
      {variant === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
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
    </motion.button>
  );
};

export default CrystalButton;
