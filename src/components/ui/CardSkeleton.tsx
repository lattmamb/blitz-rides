
import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface CardSkeletonProps {
  className?: string;
  variant?: 'default' | 'quick-view' | 'detailed';
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ 
  className, 
  variant = 'default'
}) => {
  const { theme } = useTheme();
  
  // Shine animation variants
  const shimmerVariants = {
    initial: {
      backgroundPosition: '-500px 0',
    },
    animate: {
      backgroundPosition: '500px 0',
      transition: {
        repeat: Infinity,
        duration: 2.5,
        ease: "easeInOut",
        repeatDelay: 2
      }
    }
  };
  
  // Define theme-specific styles
  const glowColor = theme === 'neoPulse' 
    ? 'rgba(10,132,255,0.1)' 
    : theme === 'quantumGlass'
    ? 'rgba(255,255,255,0.05)'
    : 'rgba(249,115,22,0.1)';
  
  return (
    <motion.div 
      className={cn(
        "overflow-hidden rounded-2xl border-none p-0", 
        theme === 'neoPulse' ? "neo-card" : 
        theme === 'quantumGlass' ? "glass-premium" :
        "glass-blue",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Image area skeleton */}
        <motion.div 
          className="relative aspect-video overflow-hidden bg-white/5"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        >
          <Skeleton className="w-full h-full" />
          
          {/* Theme-based accent glow */}
          <motion.div 
            className="absolute inset-0 rounded-t-xl"
            style={{ 
              background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
            }}
            animate={{ 
              opacity: [0.6, 0.8, 0.6] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Badge placeholder */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {/* Title and price */}
        <div className="flex justify-between">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-7 w-20" />
        </div>
        
        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        
        {/* Specs grid for detailed variant */}
        {variant !== 'default' && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={cn(
                "p-3 rounded-xl",
                theme === 'neoPulse' ? "bg-white/5" : 
                theme === 'quantumGlass' ? "glass-card" :
                "bg-white/5"
              )}>
                <Skeleton className="h-5 w-5 mx-auto mb-2" />
                <Skeleton className="h-3 w-12 mx-auto" />
                <Skeleton className="h-4 w-8 mx-auto mt-1" />
              </div>
            ))}
          </div>
        )}
        
        {/* Button(s) */}
        <div className="flex justify-end gap-2 pt-2">
          <Skeleton className="h-9 w-28 rounded-full" />
          {variant === 'quick-view' && (
            <Skeleton className="h-9 w-28 rounded-full" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CardSkeleton;
