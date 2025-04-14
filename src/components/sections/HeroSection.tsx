
import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import BlitzHero from '@/components/ui/blitz-hero';

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative"
    >
      <BlitzHero />
    </motion.div>
  );
};

export default HeroSection;
