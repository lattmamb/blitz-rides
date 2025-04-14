
import React, { useState, useRef } from "react";
import { Vehicle } from "@/types";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import VehiclePerformance from "./VehiclePerformance";
import VehicleImage from "./VehicleImage";
import VehicleCardButtons from "./VehicleCardButtons";
import AvailabilityBadge from "./AvailabilityBadge";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother animation
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position as percentage from center of card
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset card position on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="glass-card group overflow-hidden transition-all duration-300 tesla-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
            <div>
              <span className="text-2xl font-bold text-white">${vehicle.price}</span>
              <span className="text-white/70 text-sm">{vehicle.priceUnit}</span>
            </div>
            <div className="glass-effect px-2 py-1 rounded-full text-xs font-medium text-white/90">
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
