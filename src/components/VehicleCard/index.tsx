
import React, { useState, useRef, useEffect } from "react";
import { Vehicle } from "@/types";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import VehiclePerformance from "./VehiclePerformance";
import VehicleImage from "./VehicleImage";
import VehicleCardButtons from "./VehicleCardButtons";
import AvailabilityBadge from "./AvailabilityBadge";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother animation
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // For spotlight effect
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });
  
  // For glow pulsing
  const [glowOpacity, setGlowOpacity] = useState(0);
  
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setGlowOpacity((prev) => prev === 0.7 ? 0.4 : 0.7);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isHovered]);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position as percentage from center of card
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Calculate spotlight position (as percentage)
    setSpotlightPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };
  
  // Reset card position on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setSpotlightPosition({ x: 50, y: 50 }); // Center spotlight
  };

  // Handle card click
  const handleCardClick = () => {
    if (!isHovered) {
      navigate(`/vehicles/${vehicle.id}`);
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      className="glass-card group overflow-hidden transition-all duration-300 tesla-card-hover relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1200,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Blue edge glow effect */}
      <motion.div 
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: 'linear-gradient(120deg, rgba(10,132,255,0.2) 0%, rgba(94,92,230,0.2) 100%)',
          zIndex: -1,
          opacity: isHovered ? glowOpacity : 0
        }}
      />
      
      {/* Spotlight effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${spotlightPosition.x}% ${spotlightPosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            opacity: 0.7
          }}
        />
      )}
      
      {/* Glass reflections */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10"></div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/20"></div>
        <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10"></div>
        <div className="absolute inset-y-0 right-0 w-[1px] bg-black/20"></div>
      </div>
      
      <div className="p-6 relative overflow-hidden">
        <AvailabilityBadge available={vehicle.available} />
        <VehicleImage 
          image={vehicle.image} 
          model={vehicle.model} 
          isHovered={isHovered} 
        />

        <div>
          <motion.h3 
            className="text-xl font-bold mb-1"
            style={{
              transformStyle: "preserve-3d",
              transform: isHovered ? "translateZ(30px)" : "translateZ(0)"
            }}
          >
            {vehicle.model}
          </motion.h3>
          
          <motion.div 
            className="flex justify-between items-center mb-4"
            style={{
              transformStyle: "preserve-3d",
              transform: isHovered ? "translateZ(25px)" : "translateZ(0)"
            }}
          >
            <div className="relative overflow-hidden">
              <span className="text-2xl font-bold text-white">${vehicle.price}</span>
              <span className="text-white/70 text-sm">{vehicle.priceUnit}</span>
              
              {/* Price underline animation on hover */}
              <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-tesla-blue/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '100%' : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </div>
            <div className="glass-effect px-2 py-1 rounded-full text-xs font-medium text-white/90 backdrop-blur-md">
              {vehicle.type.toUpperCase()}
            </div>
          </motion.div>

          <VehiclePerformance 
            range={vehicle.performance.range} 
            topSpeed={vehicle.performance.topSpeed} 
            acceleration={vehicle.performance.acceleration}
            isHovered={isHovered}
          />

          <VehicleCardButtons 
            vehicleId={vehicle.id}
            available={vehicle.available}
            isHovered={isHovered}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
