
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
  
  const pulseAnimation = {
    initial: { opacity: 0.6 },
    animate: { 
      opacity: [0.6, 0.8, 0.6],
      transition: { 
        repeat: Infinity, 
        duration: 2.5, 
        ease: "easeInOut",
      }
    }
  };
  
  const shimmerAnimation = {
    initial: { backgroundPosition: '-500px 0' },
    animate: { 
      backgroundPosition: ['500px 0'],
      transition: { 
        repeat: Infinity, 
        duration: 3,
        ease: "easeInOut",
        repeatDelay: 2
      }
    }
  };
  
  return (
    <motion.div 
      className={cn(
        "glass-premium overflow-hidden rounded-2xl border-none p-0", 
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
          className={cn(
            "relative aspect-video overflow-hidden bg-gradient-to-r from-white/5 via-white/10 to-white/5",
            "before:absolute before:inset-0 before:bg-loading-shimmer before:bg-[length:500px_100%]"
          )}
          {...shimmerAnimation}
        >
          <Skeleton className="w-full h-full bg-white/5" />
          
          {/* Theme-based accent glow */}
          <motion.div 
            className="absolute inset-0 rounded-t-xl"
            style={{ 
              background: theme === 'neoPulse' 
                ? 'radial-gradient(circle at center, rgba(10,132,255,0.1) 0%, transparent 70%)' 
                : theme === 'quantumGlass'
                ? 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(249,115,22,0.1) 0%, transparent 70%)'
            }}
            {...pulseAnimation}
          />
        </motion.div>
        
        {/* Badge placeholder */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {/* Title and price */}
        <div className="flex justify-between">
          <Skeleton className="h-7 w-32 bg-white/10" />
          <Skeleton className="h-7 w-20 bg-white/10" />
        </div>
        
        {/* Description */}
        <Skeleton className="h-4 w-full bg-white/10" />
        <Skeleton className="h-4 w-5/6 bg-white/10" />
        
        {/* Specs grid for detailed variant */}
        {variant !== 'default' && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-3 rounded-xl">
                <Skeleton className="h-5 w-5 mx-auto mb-2 bg-white/10" />
                <Skeleton className="h-3 w-12 mx-auto bg-white/10" />
                <Skeleton className="h-4 w-8 mx-auto mt-1 bg-white/10" />
              </div>
            ))}
          </div>
        )}
        
        {/* Button(s) */}
        <div className="flex justify-end gap-2 pt-2">
          <Skeleton className="h-9 w-28 rounded-full bg-white/10" />
          {variant === 'quick-view' && (
            <Skeleton className="h-9 w-28 rounded-full bg-white/10" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CardSkeleton;
