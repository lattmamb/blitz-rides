
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import NavbarDemo from '@/components/ui/navbar-menu-demo';
import { motion, AnimatePresence } from 'framer-motion';
import GalaxyBackground from '@/components/ui/galaxy-background';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Track scroll position for parallax and lighting effects
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Galaxy Background Effect with reduced opacity for better contrast */}
      <div className="fixed inset-0 z-[-1]">
        <GalaxyBackground interactive starDensity={30} speed={0.2} />
        
        {/* Ambient light effects that move based on scroll */}
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-tesla-blue/10 filter blur-[100px] opacity-30"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${Math.sin(scrollY * 0.002) * 50}px)`,
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-tesla-purple/10 filter blur-[120px] opacity-20"
          style={{ 
            transform: `translateY(${scrollY * -0.1}px) translateX(${Math.cos(scrollY * 0.002) * 30}px)`,
          }}
        />
        
        {/* Surface reflection effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5"></div>
      </div>
      
      {/* Fixed NavMenu */}
      <div className="container mx-auto px-4 z-40">
        <NavbarDemo />
      </div>
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Light source effect that follows scroll */}
            <div 
              className="pointer-events-none fixed inset-0 bg-gradient-radial from-transparent to-black/80 mix-blend-multiply opacity-40 z-[-1]"
              style={{
                background: `radial-gradient(circle at 50% ${Math.min(30 + scrollY * 0.05, 70)}%, transparent 10%, rgba(0,0,0,0.8) 80%)`,
              }}
            />
            
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default MainLayout;
