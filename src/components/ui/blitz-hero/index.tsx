
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { SparklesCore } from '@/components/ui/sparkles';
import { useNavigate } from 'react-router-dom';
import BlitzHero3D from './BlitzHero3D';

const BlitzHero = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* 3D interactive background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="tsparticles-hero"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={40}
          className="w-full h-full"
          particleColor={theme === 'neoPulse' ? "#0A84FF" : 
                          theme === 'quantumGlass' ? "#FFFFFF" : "#F97316"}
          speed={0.1}
        />
      </div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-tesla-blue/5 rounded-full filter blur-[100px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-tesla-purple/5 rounded-full filter blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left side: Text content */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="inline-block mb-4 crystal-card px-3 py-1 backdrop-blur-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-tesla-blue to-tesla-purple">
                THE FUTURE OF ELECTRIC MOBILITY
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.7) 100%)',
                textShadow: '0 0 40px rgba(10, 132, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Crystal <span className="text-tesla-blue">BLITZ</span> Dealership
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Experience the future of electric vehicle ownership with our premium 
              subscription service. Seamless access to the world's most advanced electric vehicles.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <button 
                className="crystal-button-glow"
                onClick={() => navigate('/vehicles')}
              >
                Explore Vehicles
              </button>
              <button 
                className="crystal-button"
                onClick={() => navigate('/dashboard')}
              >
                Start Your Journey
              </button>
            </motion.div>
            
            {/* Key features */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="glass-card p-4 text-center backdrop-blur-xl">
                <div className="text-tesla-blue mb-1">100%</div>
                <div className="text-xs text-white/70">Electric Fleet</div>
              </div>
              <div className="glass-card p-4 text-center backdrop-blur-xl">
                <div className="text-tesla-blue mb-1">24/7</div>
                <div className="text-xs text-white/70">Premium Support</div>
              </div>
              <div className="glass-card p-4 text-center backdrop-blur-xl">
                <div className="text-tesla-blue mb-1">Unlimited</div>
                <div className="text-xs text-white/70">Charging Access</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side: 3D Model */}
          <motion.div 
            className="w-full lg:w-1/2 crystal-3d-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <BlitzHero3D />
          </motion.div>
        </div>
      </div>
      
      {/* Bottom reflection */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default BlitzHero;
