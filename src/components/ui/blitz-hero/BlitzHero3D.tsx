
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const BlitzHero3D = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  
  // Get appropriate accent color based on theme
  const getAccentColor = () => {
    switch (theme) {
      case 'neoPulse':
        return 'rgba(10, 132, 255, 0.8)';
      case 'quantumGlass':
        return 'rgba(255, 255, 255, 0.8)';
      case 'orbitalDark':
        return 'rgba(249, 115, 22, 0.8)';
      default:
        return 'rgba(10, 132, 255, 0.8)';
    }
  };
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    setRotation({ 
      x: y * -10, // Reverse for natural feeling
      y: x * 10 
    });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };
  
  // Subtle animation effect
  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
  }, [controls]);
  
  return (
    <div 
      ref={containerRef}
      className="relative h-[400px] md:h-[500px] crystal-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={controls}
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Main vehicle image */}
        <motion.div
          className="absolute inset-0 crystal-3d-element flex items-center justify-center"
          style={{ transform: "translateZ(40px)" }}
        >
          <img 
            src="https://assets.aceternity.com/demos/tesla-model-s.webp" 
            alt="Tesla Model S" 
            className="max-h-full max-w-full object-contain"
            style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}
          />
          
          {/* Floating specs around the car */}
          <motion.div 
            className="absolute left-4 top-1/4 crystal-card p-3"
            animate={{ x: [-5, 5, -5], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="text-xs text-white/80">Range</div>
            <div className="text-lg font-bold text-white">405 mi</div>
          </motion.div>
          
          <motion.div 
            className="absolute right-4 top-1/3 crystal-card p-3"
            animate={{ x: [5, -5, 5], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="text-xs text-white/80">0-60 mph</div>
            <div className="text-lg font-bold text-white">1.99 s</div>
          </motion.div>
          
          <motion.div 
            className="absolute left-1/4 bottom-8 crystal-card p-3"
            animate={{ y: [-5, 5, -5], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 2 }}
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="text-xs text-white/80">Top Speed</div>
            <div className="text-lg font-bold text-white">200 mph</div>
          </motion.div>
        </motion.div>
        
        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
              background: getAccentColor(),
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              boxShadow: `0 0 10px ${getAccentColor()}, 0 0 20px ${getAccentColor()}`,
              transform: `translateZ(${Math.random() * 80 + 20}px)`
            }}
            animate={{
              y: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.5 + 0.3]
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
        
        {/* Holographic circle */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[20px] rounded-[100%] opacity-30"
          style={{
            background: `radial-gradient(circle, ${getAccentColor()} 0%, transparent 70%)`,
            transform: "translateZ(10px) rotateX(90deg)",
            transformOrigin: "center bottom"
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Light beam effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 0%, ${getAccentColor().replace('0.8', '0.05')} 50%, transparent 100%)`,
            transform: "translateZ(20px)"
          }}
          animate={{
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
      
      {/* Bottom reflection surface */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/40 to-transparent transform-gpu" />
      
      {/* Surface reflection */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[70%] h-[15px] opacity-40 rounded-[50%] blur-sm"
        style={{
          background: `radial-gradient(ellipse, ${getAccentColor().replace('0.8', '0.4')} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default BlitzHero3D;
