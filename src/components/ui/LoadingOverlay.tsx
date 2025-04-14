
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  customMessage?: string;
  showProgress?: boolean;
  progress?: number;
  imagePreload?: string[];
  minimalist?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  customMessage,
  showProgress = false,
  progress = 0,
  imagePreload = [],
  minimalist = false
}) => {
  const { theme } = useTheme();
  const [loadingPhase, setLoadingPhase] = useState(1);
  const [progressValue, setProgressValue] = useState(progress);
  const [message, setMessage] = useState(customMessage || "Loading");
  
  // Phases: 1 = initial, 2 = active loading, 3 = completion
  useEffect(() => {
    // Go to active phase after a short delay
    const timer1 = setTimeout(() => {
      setLoadingPhase(2);
    }, 400);
    
    // Simulate progress if not provided externally
    let progressTimer: NodeJS.Timeout;
    if (!showProgress && progressValue < 100) {
      progressTimer = setInterval(() => {
        setProgressValue(prev => {
          // Accelerate progress as it goes
          const increment = Math.max(1, Math.floor((100 - prev) / 10));
          const nextValue = prev + increment;
          if (nextValue >= 100) {
            clearInterval(progressTimer);
            // Go to completion phase after reaching 100%
            setTimeout(() => setLoadingPhase(3), 400);
            return 100;
          }
          return nextValue;
        });
      }, 150);
    }
    
    // Preload images if provided
    const preloadImages = () => {
      return Promise.all(imagePreload.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      }));
    };
    
    if (imagePreload.length > 0) {
      setMessage("Loading assets");
      preloadImages()
        .then(() => {
          setMessage(customMessage || "Processing");
        })
        .catch(err => {
          console.warn("Failed to preload some images:", err);
        });
    }
    
    return () => {
      clearTimeout(timer1);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [customMessage, showProgress, progressValue, imagePreload]);
  
  // Update progress from props
  useEffect(() => {
    if (showProgress) {
      setProgressValue(progress);
      if (progress >= 100) {
        setTimeout(() => setLoadingPhase(3), 400);
      }
    }
  }, [progress, showProgress]);
  
  // Theme-specific styling
  const getThemeColors = () => {
    if (theme === 'neoPulse') {
      return {
        primary: '#0A84FF',
        glow: 'rgba(10,132,255,0.5)',
        loaderColor: 'text-tesla-blue',
        textGlow: '0 0 10px rgba(10,132,255,0.7)'
      };
    } else if (theme === 'quantumGlass') {
      return {
        primary: '#FFFFFF',
        glow: 'rgba(255,255,255,0.2)',
        loaderColor: 'text-white',
        textGlow: '0 0 10px rgba(255,255,255,0.5)'
      };
    } else {
      return {
        primary: '#F97316',
        glow: 'rgba(249,115,22,0.3)',
        loaderColor: 'text-tesla-purple',
        textGlow: '0 0 10px rgba(249,115,22,0.5)'
      };
    }
  };
  
  const colors = getThemeColors();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
        
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: loadingPhase === 3 ? 1.05 : 1, 
            opacity: 1 
          }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut"
          }}
        >
          {minimalist ? (
            // Minimalist version
            <motion.div 
              className="relative"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`,
                  boxShadow: `0 0 20px ${colors.glow}`,
                }}
              >
                <Loader2 className={`h-8 w-8 ${colors.loaderColor}`} />
              </motion.div>
            </motion.div>
          ) : (
            // Full version
            <motion.div
              className="relative mb-8"
              animate={{ 
                rotateY: loadingPhase === 1 ? 0 : [0, 360],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            >
              <motion.div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`,
                  boxShadow: `0 0 30px ${colors.glow}`,
                }}
                animate={{ 
                  boxShadow: [
                    `0 0 20px ${colors.glow}`,
                    `0 0 50px ${colors.glow}`,
                    `0 0 20px ${colors.glow}`,
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                <Loader2 className={`h-12 w-12 ${colors.loaderColor} animate-spin`} />
              </motion.div>
              
              {/* Circular progress indicator */}
              {showProgress && (
                <motion.svg 
                  className="absolute inset-0 -m-1"
                  width="26" 
                  height="26" 
                  viewBox="0 0 26 26"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: -90 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.circle
                    cx="13"
                    cy="13"
                    r="12"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="2"
                    strokeDasharray="75.4"
                    strokeDashoffset="75.4"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 75.4 }}
                    animate={{ 
                      strokeDashoffset: 75.4 - (progressValue / 100) * 75.4 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.svg>
              )}
            </motion.div>
          )}
          
          <motion.h2
            className="text-2xl font-bold mb-2"
            style={{ textShadow: colors.textGlow }}
            animate={{ 
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            {message}
          </motion.h2>
          
          {showProgress && (
            <motion.div
              className="text-sm text-white/70 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progressValue}%
            </motion.div>
          )}
          
          {!minimalist && (
            <motion.div
              className="flex space-x-2 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className={`h-2 w-2 rounded-full`}
                  style={{ backgroundColor: colors.primary }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    delay: dot * 0.2
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingOverlay;
