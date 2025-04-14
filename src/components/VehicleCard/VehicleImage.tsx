
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
      className="relative h-40 flex items-center justify-center mb-6 overflow-hidden"
      style={{
        z: 50,
        transformStyle: "preserve-3d",
        transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 opacity-0"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
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
        style={{
          filter: isHovered ? "drop-shadow(0 0 10px rgba(10, 132, 255, 0.5))" : "none"
        }}
      />
      
      {/* Enhanced reflection effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-12"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08))",
          transform: "rotateX(180deg) translateY(100%)",
          transformOrigin: "bottom",
          opacity: isHovered ? 0.4 : 0,
          transition: "opacity 0.5s ease"
        }}
      />
      
      {/* Tesla logo watermark */}
      {isHovered && (
        <motion.div
          className="absolute bottom-1 right-1 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50.2 84.3C49.5 84.3 48.8 84.2 48.2 84C39.3 81.7 15.9 68.2 15.9 68.2L29.9 16.5H38.5L39.2 19.7C39.2 19.7 45.8 18.3 50.1 18.3C54.4 18.3 61 19.7 61 19.7L61.7 16.5H70.3L84.3 68.2C84.3 68.2 60.7 81.7 51.8 84C51.3 84.2 50.7 84.3 50.2 84.3Z" fill="white"/>
            <path d="M71.5 68.2L59.8 23.4C59.8 23.4 54.3 22.2 50.1 22.2C45.9 22.2 40.4 23.4 40.4 23.4L28.7 68.2H71.5Z" fill="white"/>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VehicleImage;
