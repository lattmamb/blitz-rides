import React from 'react';
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect';
import { motion } from 'framer-motion';

interface BlitzVaporHeroProps {
  className?: string;
}

const BlitzVaporHero: React.FC<BlitzVaporHeroProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-[100vh] flex items-center justify-center ${className}`}>
      {/* Vapor text effect */}
      <div className="relative z-10 w-full h-32 flex items-center justify-center">
        <VaporizeTextCycle
          texts={["BLITZ", "Experience", "Innovation"]}
          font={{
            fontFamily: "Inter, sans-serif",
            fontSize: "90px",
            fontWeight: 700
          }}
          color="rgb(255, 255, 255)"
          spread={6}
          density={7}
          animation={{
            vaporizeDuration: 2.5,
            fadeInDuration: 1.2,
            waitDuration: 1
          }}
          direction="left-to-right"
          alignment="center"
          tag={Tag.H1}
        />
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-32 text-muted-foreground text-lg md:text-xl text-center px-4"
      >
        Next-Generation Mobility Platform
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12 flex flex-col items-center"
      >
        <p className="text-muted-foreground text-sm mb-2">Scroll to Explore</p>
        <motion.div
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center p-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlitzVaporHero;
