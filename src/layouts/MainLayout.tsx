import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import NavbarDemo from '@/components/ui/navbar-menu-demo';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowFloatingMenu(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Fixed NavMenu for initial view */}
      <div className={`container mx-auto px-4 transition-opacity duration-500 ${showFloatingMenu ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <NavbarDemo />
      </div>
      
      {/* Floating NavMenu Bubbles after scroll */}
      {showFloatingMenu && (
        <>
          {/* Left side bubble */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed left-4 top-1/3 z-50"
          >
            <FloatingNavItem label="Vehicles" position="left" />
          </motion.div>
          
          {/* Right side bubble */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="fixed right-4 top-1/3 z-50"
          >
            <FloatingNavItem label="Fleet" position="right" />
          </motion.div>
          
          {/* Top side bubble */}
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <FloatingNavItem label="Plans" position="top" />
          </motion.div>
          
          {/* Bottom side bubble */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <FloatingNavItem label="Locations" position="bottom" />
          </motion.div>
        </>
      )}
      
      <main className="flex-grow">{children}</main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

interface FloatingNavItemProps {
  label: string;
  position: 'left' | 'right' | 'top' | 'bottom';
}

const FloatingNavItem: React.FC<FloatingNavItemProps> = ({ label, position }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="glass-card rounded-full p-3 cursor-pointer shadow-lg blue-glow"
      animate={{ 
        y: [0, -10, 0],
        scale: isHovered ? 1.1 : 1,
        transition: { 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.2 }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        const menuItem = document.querySelector(`[data-menu-item="${label}"]`) as HTMLElement;
        if (menuItem) {
          menuItem.click();
        }
      }}
    >
      <div className="text-white font-medium">{label}</div>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute glass-effect px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap ${
            position === 'left' ? 'left-full ml-2' :
            position === 'right' ? 'right-full mr-2' :
            position === 'top' ? 'top-full mt-2' :
            'bottom-full mb-2'
          }`}
        >
          Click to open menu
        </motion.div>
      )}
    </motion.div>
  );
};

export default MainLayout;
