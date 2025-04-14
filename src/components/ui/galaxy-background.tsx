
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

interface GalaxyBackgroundProps {
  className?: string;
  starDensity?: number;
  speed?: number;
  children?: React.ReactNode;
  interactive?: boolean;
}

const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({ 
  className, 
  starDensity = 100, 
  speed = 0.5, 
  children,
  interactive = false
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <motion.div 
        className="absolute inset-0 z-0"
        animate={interactive ? {
          x: mousePosition.x,
          y: mousePosition.y,
        } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        {/* Galaxy Particles */}
        <SparklesCore
          id="galaxy-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={starDensity}
          className="w-full h-full"
          particleColor="#0A84FF"
          speed={speed}
        />
        
        {/* Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-tesla-blue/5 rounded-full filter blur-[80px] opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-tesla-purple/5 rounded-full filter blur-[100px] opacity-30"></div>
        
        {/* Star Clusters */}
        <div className="star-cluster star-cluster-1"></div>
        <div className="star-cluster star-cluster-2"></div>
        <div className="star-cluster star-cluster-3"></div>
      </motion.div>
      
      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GalaxyBackground;
