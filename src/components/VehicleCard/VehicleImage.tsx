
import React from "react";
import { motion } from "framer-motion";

interface VehicleImageProps {
  image: string;
  model: string;
  isHovered: boolean;
}

const VehicleImage: React.FC<VehicleImageProps> = ({ image, model, isHovered }) => {
  return (
    <motion.div 
      className="relative h-40 flex items-center justify-center mb-6"
      style={{
        z: 50,
        transformStyle: "preserve-3d",
        transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
      }}
    >
      <motion.img
        src={image}
        alt={model}
        className="h-full object-contain"
        animate={{ 
          y: isHovered ? [0, -5, 0] : 0,
          rotate: isHovered ? [-0.5, 0.5, -0.5] : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ 
          duration: 3, 
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      {/* Reflection */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white/5 backdrop-blur-md"
        style={{
          transform: "rotateX(180deg) translateY(90%)",
          opacity: isHovered ? 0.3 : 0,
          transition: "opacity 0.5s ease"
        }}
      />
    </motion.div>
  );
};

export default VehicleImage;
