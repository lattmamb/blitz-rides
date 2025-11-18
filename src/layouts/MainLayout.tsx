
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CrystalBackground, OrbitalRing } from '@/components/ui/crystal-ui';

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
        if (document.body.contains(cursor)) {
          document.body.removeChild(cursor);
        }
      };
    }
  }, []);
  
  return (
    <div className={cn(
      "min-h-screen text-white overflow-x-hidden relative",
      "crystal-dealership",
      theme === 'neoPulse' && "neo-pulse-bg",
      theme === 'quantumGlass' && "quantum-glass-bg",
      theme === 'orbitalDark' && "orbital-dark-bg"
    )}>
      {/* Enhanced glass morphism background */}
      <CrystalBackground variant="deep" interactive={true}>
        {/* Orbital rings overlay */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <OrbitalRing 
            size="fullscreen" 
            speed="slow" 
            tilt={75} 
            className="top-1/2 left-1/2 opacity-30"
          />
          
          <OrbitalRing 
            size="lg" 
            speed="medium" 
            reverse={true} 
            thickness="thin"
            tilt={65}
            className="top-1/3 left-1/4 opacity-20"
          />
          
          {theme === 'neoPulse' && (
            <>
              <motion.div 
                className="star-cluster star-cluster-1 bg-tesla-blue/10"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="star-cluster star-cluster-2 bg-tesla-purple/10"
                animate={{
                  opacity: [0.1, 0.25, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 3
                }}
              />
            </>
          )}
          
          {theme === 'quantumGlass' && (
            <>
              <motion.div 
                className="star-cluster star-cluster-1 bg-white/3"
                animate={{
                  opacity: [0.03, 0.08, 0.03],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="star-cluster star-cluster-3 bg-white/4"
                animate={{
                  opacity: [0.04, 0.12, 0.04],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 5
                }}
              />
            </>
          )}
          
          {theme === 'orbitalDark' && (
            <>
              <motion.div 
                className="star-cluster star-cluster-2 bg-tesla-purple/8"
                animate={{
                  opacity: [0.08, 0.15, 0.08],
                  scale: [1, 1.06, 1],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="star-cluster star-cluster-3 bg-tesla-blue/6"
                animate={{
                  opacity: [0.06, 0.12, 0.06],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 13,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 4
                }}
              />
            </>
          )}
        </div>
        
        <EnhancedNavbar />
        
        <div className="relative z-10">
          {children || <Outlet />}
        </div>
        
        <Footer />
      </CrystalBackground>
    </div>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <MainLayoutContent children={children} />;
};

export default MainLayout;
