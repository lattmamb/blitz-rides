
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import NavbarDemo from '@/components/ui/navbar-menu-demo';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import GalaxyBackground from '@/components/ui/galaxy-background';
import { useLocation } from 'react-router-dom';
import { ThreeDPhotoCarouselDemo } from '@/components/ui/3d-carousel-demo';
import GlassEarthSection from '@/components/sections/GlassEarthSection';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Track scroll position for parallax and lighting effects
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Create a motion value for scroll
  const scrollYMotion = useMotionValue(0);
  
  // Spring physics for smoother lighting effects
  const springConfig = { damping: 20, stiffness: 90 };
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, 60]), springConfig);
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, 60]), springConfig);
  
  // Update the scroll motion value whenever scrollY changes
  useEffect(() => {
    scrollYMotion.set(scrollY);
  }, [scrollY, scrollYMotion]);
  
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

  // Determine if we're on home page
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Enhanced Galaxy Background Effect */}
      <div className="fixed inset-0 z-[-1]">
        <GalaxyBackground interactive starDensity={40} speed={0.2} />
        
        {/* Enhanced ambient light effects with spring physics */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-tesla-blue/10 filter blur-[150px] opacity-30"
          style={{ 
            x: useTransform(scrollYMotion, [0, 1000], [0, -150]),
            y: useTransform(scrollYMotion, [0, 1000], [0, 100]),
            scale: useTransform(scrollYMotion, [0, 500], [1, 1.2])
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-tesla-purple/10 filter blur-[170px] opacity-20"
          style={{ 
            x: useTransform(scrollYMotion, [0, 1000], [0, 150]),
            y: useTransform(scrollYMotion, [0, 1000], [0, -50]),
            scale: useTransform(scrollYMotion, [0, 500], [1, 0.8])
          }}
        />
        
        {/* Improved dynamic spotlight effect based on mouse position */}
        <motion.div 
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay z-[-1]"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(10,132,255,0.4) 0%, transparent 70%)`,
          }}
        />
        
        {/* Enhanced surface reflection effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
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
            {/* Enhanced light source effect that follows scroll with smoother animation */}
            <motion.div 
              className="pointer-events-none fixed inset-0 bg-gradient-radial from-transparent to-black/80 mix-blend-multiply opacity-40 z-[-1]"
              style={{
                background: `radial-gradient(circle at 50% ${Math.min(30 + scrollY * 0.05, 70)}%, transparent 10%, rgba(0,0,0,0.8) 80%)`,
              }}
            />
            
            {/* Improved vignette effect for dramatic lighting */}
            <div className="pointer-events-none fixed inset-0 z-[-1] opacity-70" 
              style={{
                background: `radial-gradient(circle at center, transparent 40%, black 140%)`,
              }}
            />
            
            {/* Content */}
            {children}
            
            {/* Only show these sections on the home page */}
            {isHomePage && (
              <>
                <GlassEarthSection />
                <ThreeDPhotoCarouselDemo />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default MainLayout;
