
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayoutContent: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  // Enable custom cursor effect for desktop
  useEffect(() => {
    if (window.innerWidth > 768) {
      const cursor = document.createElement('div');
      cursor.className = 'crystal-cursor';
      document.body.appendChild(cursor);
      
      const moveCursor = (e: MouseEvent) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      };
      
      document.addEventListener('mousemove', moveCursor);
      
      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.body.removeChild(cursor);
      };
    }
  }, []);
  
  return (
    <div className={cn(
      "min-h-screen text-white overflow-x-hidden",
      "bg-noise relative",
      "crystal-dealership",
      theme === 'neoPulse' && "neo-pulse-bg",
      theme === 'quantumGlass' && "quantum-glass-bg",
      theme === 'orbitalDark' && "orbital-dark-bg"
    )}>
      {/* Enhanced ambient effects */}
      <div className="fixed inset-0 pointer-events-none crystal-bg-effects">
        {/* Common ambient effect for all themes */}
        <div className="crystal-gradient absolute inset-0 opacity-30"></div>
        
        {theme === 'neoPulse' && (
          <>
            <motion.div 
              className="star-cluster star-cluster-1 bg-tesla-blue/20"
              animate={{
                opacity: [0.2, 0.3, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            <motion.div 
              className="star-cluster star-cluster-2 bg-tesla-purple/20"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            ></motion.div>
            <div className="crystal-grid opacity-5"></div>
          </>
        )}
        
        {theme === 'quantumGlass' && (
          <>
            <motion.div 
              className="star-cluster star-cluster-1 bg-white/5"
              animate={{
                opacity: [0.05, 0.1, 0.05],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            <motion.div 
              className="star-cluster star-cluster-3 bg-white/5"
              animate={{
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 4
              }}
            ></motion.div>
            <div className="crystal-dots opacity-10"></div>
          </>
        )}
        
        {theme === 'orbitalDark' && (
          <>
            <motion.div 
              className="star-cluster star-cluster-2 bg-tesla-purple/15"
              animate={{
                opacity: [0.15, 0.25, 0.15],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            <motion.div 
              className="star-cluster star-cluster-3 bg-tesla-blue/10"
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 3
              }}
            ></motion.div>
            <div className="grid-background opacity-15"></div>
          </>
        )}
        
        {/* Crystal reflections on the edges */}
        <div className="crystal-edge-top"></div>
        <div className="crystal-edge-bottom"></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10">
        {children || <Outlet />}
      </div>
      
      <Footer />
    </div>
  );
};

// MainLayout no longer needs to provide the ThemeProvider
// since it's now provided at the root level
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <MainLayoutContent children={children} />;
};

export default MainLayout;
