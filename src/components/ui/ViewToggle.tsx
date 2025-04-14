
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { Grid, Layers } from 'lucide-react';

interface ViewToggleProps {
  activeView: 'grid' | 'carousel';
  onChange: (view: 'grid' | 'carousel') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, onChange }) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex justify-end mb-6">
      <div className={cn(
        "glass-card p-1 rounded-full flex items-center",
        theme === 'neoPulse' ? "border-tesla-blue/20" :
        theme === 'quantumGlass' ? "border-white/10" :
        "border-tesla-purple/20"
      )}>
        <button
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full relative",
            activeView === 'grid' && "text-white",
            activeView !== 'grid' && "text-white/60 hover:text-white/80"
          )}
          onClick={() => onChange('grid')}
          aria-label="Grid view"
        >
          <Grid className="h-5 w-5" />
          {activeView === 'grid' && (
            <motion.div
              layoutId="viewToggleIndicator"
              className={cn(
                "absolute inset-0 rounded-full -z-10",
                theme === 'neoPulse' ? "bg-tesla-blue/20" :
                theme === 'quantumGlass' ? "bg-white/10" :
                "bg-tesla-purple/20"
              )}
              transition={{ type: "spring", duration: 0.3 }}
            />
          )}
        </button>
        
        <button
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full relative",
            activeView === 'carousel' && "text-white",
            activeView !== 'carousel' && "text-white/60 hover:text-white/80"
          )}
          onClick={() => onChange('carousel')}
          aria-label="Carousel view"
        >
          <Layers className="h-5 w-5" />
          {activeView === 'carousel' && (
            <motion.div
              layoutId="viewToggleIndicator"
              className={cn(
                "absolute inset-0 rounded-full -z-10",
                theme === 'neoPulse' ? "bg-tesla-blue/20" :
                theme === 'quantumGlass' ? "bg-white/10" :
                "bg-tesla-purple/20"
              )}
              transition={{ type: "spring", duration: 0.3 }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
