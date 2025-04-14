
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
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Galaxy Background Effect (subtle) */}
      <div className="fixed inset-0 z-[-1]">
        <GalaxyBackground interactive starDensity={30} speed={0.2} />
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
          >
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
