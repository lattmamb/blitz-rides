
import React, { useEffect, RefObject } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";

type ParallaxBackgroundProps = {
  heroRef: RefObject<HTMLDivElement>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
};

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  heroRef,
  mouseX,
  mouseY,
  springX,
  springY,
}) => {
  
  // Setup parallax effect on background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage of screen
      const xPos = (clientX / innerWidth) - 0.5;
      const yPos = (clientY / innerHeight) - 0.5;
      
      // Update motion values for parallax effect
      mouseX.set(xPos);
      mouseY.set(yPos);
      
      // Apply parallax to background elements if hero ref exists
      if (heroRef.current) {
        const bgElements = heroRef.current.querySelectorAll('.parallax-bg');
        
        bgElements.forEach((element, index) => {
          if (element instanceof HTMLElement) {
            const depth = index * 0.2 + 0.5; // Different parallax intensity based on element index
            element.style.transform = `translate(${xPos * 40 * depth}px, ${yPos * 40 * depth}px)`;
          }
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, heroRef]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] z-0"></div>
      
      {/* Background 3D elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Morphing gradient blobs */}
        <motion.div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-radial from-tesla-purple/20 to-transparent blur-[80px] parallax-bg"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
            borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%']
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{
            x: springX,
            y: springY
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-radial from-tesla-blue/20 to-transparent blur-[100px] parallax-bg"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            borderRadius: ['30% 70% 70% 30% / 30% 52% 48% 70%', '70% 30% 30% 70% / 70% 48% 52% 30%', '30% 70% 70% 30% / 30% 52% 48% 70%']
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{
            x: springX,
            y: springY
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#121212] to-transparent opacity-50 blur-[60px] parallax-bg"
          style={{
            x: springX,
            y: springY
          }}
        />
      </div>
      
      {/* Radial Gradient to prevent sharp edges */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(600px_400px_at_top,transparent_30%,white)]"></div>
    </>
  );
};

export default ParallaxBackground;
