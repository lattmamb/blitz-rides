
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import NavbarDemo from '@/components/ui/navbar-menu-demo';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import GalaxyBackground from '@/components/ui/galaxy-background';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Track scroll position for parallax and lighting effects
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Track mouse position for ambient lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage from center
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Transform mouse position to light position
  const lightX = useTransform(mouseX, [-0.5, 0.5], [40, 60]);
  const lightY = useTransform(mouseY, [-0.5, 0.5], [40, 60]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Galaxy Background Effect with reduced opacity for better contrast */}
      <div className="fixed inset-0 z-[-1]">
        <GalaxyBackground interactive starDensity={30} speed={0.2} />
        
        {/* Ambient light effects that move based on scroll and mouse */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-tesla-blue/10 filter blur-[100px] opacity-30"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${Math.sin(scrollY * 0.002) * 50}px)`,
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-tesla-purple/10 filter blur-[120px] opacity-20"
          style={{ 
            transform: `translateY(${scrollY * -0.1}px) translateX(${Math.cos(scrollY * 0.002) * 30}px)`,
          }}
        />
        
        {/* Dynamic spotlight effect based on mouse position */}
        <motion.div 
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay z-[-1]"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(10,132,255,0.3) 0%, transparent 70%)`,
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
            key={location.pathname}
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
            
            {/* Vignette effect for dramatic lighting */}
            <div className="pointer-events-none fixed inset-0 z-[-1] opacity-70" 
              style={{
                background: `radial-gradient(circle at center, transparent 40%, black 120%)`,
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
