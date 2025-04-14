
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLoadingDetection } from '@/hooks/useLoadingDetection';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface IntelligentLoadingProps {
  minimalist?: boolean;
  timeout?: number;
  customMessage?: string;
  fullScreen?: boolean;
  className?: string;
}

const IntelligentLoading = ({
  minimalist = false,
  timeout = 5000,
  customMessage,
  fullScreen = true,
  className
}: IntelligentLoadingProps) => {
  const { isLoading, isSlowRender } = useLoadingDetection(500);
  const [showTimeout, setShowTimeout] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowTimeout(true);
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [isLoading, timeout]);

  if (!isLoading) return null;

  // Dynamic theme-based colors
  const accentColor = theme === 'neoPulse' ? 'from-tesla-blue to-tesla-purple' : 
                      theme === 'quantumGlass' ? 'from-white/80 to-white/30' :
                      'from-tesla-orange to-tesla-red';

  return (
    <motion.div
      className={cn(
        fullScreen ? "fixed inset-0 z-50" : "relative w-full h-full min-h-[200px]",
        "flex flex-col items-center justify-center backdrop-blur-sm",
        minimalist ? "bg-transparent" : "bg-black/60",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {minimalist ? (
        <div className="flex flex-col items-center">
          <motion.div
            className={`w-8 h-8 rounded-full border-2 border-t-transparent bg-gradient-to-r ${accentColor}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {customMessage && (
            <motion.p 
              className="mt-3 text-sm font-medium text-white/80"
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
            className="glass-premium p-8 rounded-full relative overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-tesla-blue/10 to-tesla-purple/10 rounded-full"
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Fix: Wrapping Loader2 in a motion.div for animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 
                className={cn(
                  "w-10 h-10",
                  theme === 'neoPulse' ? "text-tesla-blue" : 
                  theme === 'quantumGlass' ? "text-white" :
                  "text-tesla-orange"
                )}
              />
            </motion.div>
          </motion.div>
          
          <motion.h3
            className={cn(
              "text-xl font-medium mt-6",
              theme === 'neoPulse' ? "neo-pulse-text" : 
              theme === 'quantumGlass' ? "quantum-glass-text" :
              "orbital-dark-text"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {customMessage || "Loading Experience"}
          </motion.h3>
          
          {isSlowRender && (
            <motion.div
              className="mt-4 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-white/70 text-sm">
                {showTimeout 
                  ? "This is taking longer than expected. Please wait..." 
                  : "Preparing your premium experience..."}
              </p>
              <motion.div 
                className="h-1 w-48 bg-white/10 rounded-full mt-4 overflow-hidden"
              >
                <motion.div 
                  className={`h-full bg-gradient-to-r ${accentColor}`}
                  initial={{ width: "0%" }}
                  animate={{ width: showTimeout ? "90%" : "60%" }}
                  transition={{ 
                    duration: showTimeout ? 10 : 3, 
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default IntelligentLoading;
