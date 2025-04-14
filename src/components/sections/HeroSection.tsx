
import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import BlitzHero from '@/components/ui/blitz-hero';

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative min-h-screen"
    >
      <BlitzHero />
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <p className="text-white/50 text-sm mb-2">Scroll to explore</p>
        <motion.div 
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
