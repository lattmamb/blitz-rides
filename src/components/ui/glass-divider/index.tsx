
import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassDividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'subtle' | 'default' | 'prominent';
}

const GlassDivider: React.FC<GlassDividerProps> = ({
  className,
  orientation = 'horizontal',
  variant = 'default'
}) => {
  // Get opacity based on variant
  const getOpacity = () => {
    switch (variant) {
      case 'subtle': return 'opacity-5';
      case 'prominent': return 'opacity-20';
      default: return 'opacity-10';
    }
  };
  
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div
      className={cn(
        "overflow-hidden relative",
        isHorizontal ? "w-full h-px my-8" : "h-full w-px mx-8",
        getOpacity(),
        className
      )}
    >
      <div
        className={cn(
          "absolute",
          isHorizontal 
            ? "inset-x-0 h-px bg-gradient-to-r" 
            : "inset-y-0 w-px bg-gradient-to-b",
          "from-transparent via-white to-transparent"
        )}
      />
    </div>
  );
};

export default GlassDivider;
