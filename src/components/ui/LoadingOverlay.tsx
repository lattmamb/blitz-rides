
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface LoadingOverlayProps {
  minimalist?: boolean;
  customMessage?: string;
}

const LoadingOverlay = ({ minimalist = false, customMessage }: LoadingOverlayProps) => {
  const { theme } = useTheme();
  
  // Define theme-specific styles
  const accentGradient = theme === 'neoPulse' 
    ? 'from-tesla-blue to-tesla-purple' 
    : theme === 'quantumGlass'
    ? 'from-white/80 to-white/30'
    : 'from-tesla-orange to-tesla-red';
  
  const accentColor = theme === 'neoPulse' 
    ? 'text-tesla-blue' 
    : theme === 'quantumGlass'
    ? 'text-white'
    : 'text-tesla-orange';
  
  const themeText = theme === 'neoPulse' 
    ? 'neo-pulse-text' 
    : theme === 'quantumGlass'
    ? 'quantum-glass-text'
    : 'orbital-dark-text';
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)'
      }}
    >
      {minimalist ? (
        <div className="flex flex-col items-center">
          <motion.div
            className={`h-8 w-8 rounded-full border-2 border-t-transparent border-solid ${accentColor}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {customMessage && (
            <motion.p 
              className="mt-3 text-sm font-medium text-white/70"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {customMessage}
            </motion.p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center max-w-md text-center p-6">
          <motion.div
            className={cn(
              "relative flex items-center justify-center p-6 rounded-full",
              theme === 'neoPulse' ? "neo-card" : 
              theme === 'quantumGlass' ? "glass-premium" :
              "glass-blue"
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${accentGradient} opacity-20`}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div
              className={cn("text-white", accentColor)}
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {theme === 'neoPulse' ? (
                <TrendingUp size={28} />
              ) : (
                <Loader2 size={28} />
              )}
            </motion.div>
          </motion.div>
          
          <motion.h3
            className={cn("text-xl font-medium mt-6", themeText)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {customMessage || "Loading Experience"}
          </motion.h3>
          
          <motion.div
            className="loading-dots mt-4 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span className={cn("inline-block h-2 w-2 rounded-full", accentColor)}></motion.span>
            <motion.span className={cn("inline-block h-2 w-2 rounded-full", accentColor)}></motion.span>
            <motion.span className={cn("inline-block h-2 w-2 rounded-full", accentColor)}></motion.span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default LoadingOverlay;
