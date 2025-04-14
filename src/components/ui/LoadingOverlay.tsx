
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface LoadingOverlayProps {
  customMessage?: string;
  minimalist?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  customMessage = "Loading...", 
  minimalist = false 
}) => {
  const { theme } = useTheme();
  
  const getAccentColor = () => {
    if (theme === 'neoPulse') return '#0A84FF';
    if (theme === 'quantumGlass') return '#FFFFFF';
    return '#F97316';
  };
  
  if (minimalist) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50">
        <motion.div 
          className="crystal-card p-4 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="loading-dots flex gap-1">
            <motion.span 
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: getAccentColor() }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <motion.span 
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: getAccentColor() }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
            />
            <motion.span 
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: getAccentColor() }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <span className="text-sm font-medium">{customMessage}</span>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-noise opacity-[0.05]"></div>
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-tesla-blue/5 rounded-full filter blur-[100px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-tesla-purple/5 rounded-full filter blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      
      {/* Crystal hexagon loading animation */}
      <motion.div
        className="crystal-3d relative mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
            stroke={getAccentColor()}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <motion.path
            d="M50 10L83.3 30V70L50 90L16.7 70V30L50 10Z"
            stroke={getAccentColor()}
            strokeWidth="0.5"
            strokeOpacity="0.8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          
          <motion.path
            d="M50 20L73.3 35V65L50 80L26.7 65V35L50 20Z"
            stroke={getAccentColor()}
            strokeWidth="0.5"
            strokeOpacity="0.6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
          
          <motion.path
            d="M50 30L63.3 40V60L50 70L36.7 60V40L50 30Z"
            stroke={getAccentColor()}
            strokeWidth="0.5"
            strokeOpacity="0.4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          
          <motion.circle
            cx="50"
            cy="50"
            r="5"
            fill={getAccentColor()}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
        
        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              background: getAccentColor(),
              left: Math.random() * 100 + "px",
              top: Math.random() * 100 + "px",
              opacity: Math.random() * 0.5 + 0.3,
              boxShadow: `0 0 5px ${getAccentColor()}`
            }}
            animate={{
              y: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.5 + 0.3]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </motion.div>
      
      {/* Loading text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 mb-2"
          animate={{ 
            backgroundPosition: ['0% center', '100% center', '0% center'] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% auto'
          }}
        >
          Crystal BLITZ
        </motion.h2>
        
        <p className="text-white/70 mb-4">{customMessage}</p>
        
        <div className="loading-dots flex gap-2 justify-center">
          <motion.span 
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: getAccentColor() }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <motion.span 
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: getAccentColor() }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span 
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: getAccentColor() }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingOverlay;
