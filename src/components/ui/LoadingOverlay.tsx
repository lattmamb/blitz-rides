
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Loader2 } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="relative mb-8"
          animate={{ 
            rotateY: [0, 360],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "linear" 
          }}
        >
          <motion.div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: theme === 'neoPulse' 
                ? 'radial-gradient(circle at center, rgba(10,132,255,0.5) 0%, transparent 70%)' 
                : theme === 'quantumGlass'
                ? 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(249,115,22,0.3) 0%, transparent 70%)',
              boxShadow: theme === 'neoPulse' 
                ? '0 0 30px rgba(10,132,255,0.5)' 
                : theme === 'quantumGlass'
                ? '0 0 30px rgba(255,255,255,0.2)'
                : '0 0 30px rgba(249,115,22,0.3)',
            }}
            animate={{ 
              boxShadow: [
                theme === 'neoPulse' ? '0 0 20px rgba(10,132,255,0.3)' : 
                theme === 'quantumGlass' ? '0 0 20px rgba(255,255,255,0.1)' :
                '0 0 20px rgba(249,115,22,0.2)',
                
                theme === 'neoPulse' ? '0 0 50px rgba(10,132,255,0.6)' : 
                theme === 'quantumGlass' ? '0 0 50px rgba(255,255,255,0.3)' :
                '0 0 50px rgba(249,115,22,0.5)',
                
                theme === 'neoPulse' ? '0 0 20px rgba(10,132,255,0.3)' : 
                theme === 'quantumGlass' ? '0 0 20px rgba(255,255,255,0.1)' :
                '0 0 20px rgba(249,115,22,0.2)',
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <Loader2 
              className={`h-12 w-12 animate-spin ${
                theme === 'neoPulse' ? "text-tesla-blue" : 
                theme === 'quantumGlass' ? "text-white" : 
                "text-tesla-purple"
              }`}
            />
          </motion.div>
        </motion.div>
        
        <motion.h2
          className="text-2xl font-bold mb-2"
          animate={{ 
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          Loading Vehicles
        </motion.h2>
        
        <motion.div
          className="flex space-x-2 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className={`h-2 w-2 rounded-full ${
                theme === 'neoPulse' ? "bg-tesla-blue" : 
                theme === 'quantumGlass' ? "bg-white" : 
                "bg-tesla-purple"
              }`}
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
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;
