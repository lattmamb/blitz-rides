
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useParallaxEffects } from "./useParallaxEffects";
import ParallaxBackground from "./ParallaxBackground";
import SparklesBackground from "./SparklesBackground";
import HeroGradients from "./HeroGradients";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 150]);
  
  const {
    mouseX,
    mouseY,
    springX,
    springY,
    gradientX1,
    gradientOpacity1,
    gradientX2,
    gradientOpacity2,
    rotateX,
    rotateY,
    headingRotateX,
    headingRotateY
  } = useParallaxEffects();

  return (
    <motion.div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ opacity, scale }}
    >
      {/* Sparkles background effect */}
      <SparklesBackground />
      
      {/* Parallax background elements */}
      <ParallaxBackground 
        heroRef={heroRef}
        mouseX={mouseX}
        mouseY={mouseY}
        springX={springX}
        springY={springY}
      />
      
      {/* Animated gradients */}
      <HeroGradients 
        gradientX1={gradientX1}
        gradientOpacity1={gradientOpacity1}
        gradientX2={gradientX2}
        gradientOpacity2={gradientOpacity2}
      />
      
      {/* Content container */}
      <motion.div 
        className="container relative z-10 mx-auto px-4 py-16 md:py-32"
        style={{ y }}
      >
        <HeroContent 
          rotateX={rotateX}
          rotateY={rotateY}
          headingRotateX={headingRotateX}
          headingRotateY={headingRotateY}
        />
      </motion.div>
      
      {/* Scroll indicator */}
      <ScrollIndicator />
    </motion.div>
  );
};

export default Hero;
