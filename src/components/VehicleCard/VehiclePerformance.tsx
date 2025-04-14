
import React from "react";
import { motion } from "framer-motion";
import { Battery, Gauge, Zap } from "lucide-react";
import VehicleStatValue from "./VehicleStatValue";

interface PerformanceProps {
  range: number;
  topSpeed: number;
  acceleration: number;
  isHovered: boolean;
}

const VehiclePerformance: React.FC<PerformanceProps> = ({ 
  range, 
  topSpeed, 
  acceleration,
  isHovered
}) => {
  return (
    <motion.div 
      className="grid grid-cols-3 gap-2 mb-5"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered ? "translateZ(20px)" : "translateZ(0)"
      }}
    >
      <VehicleStatValue 
        icon={Battery} 
        label="Range" 
        value={`${range} mi`} 
      />
      <VehicleStatValue 
        icon={Gauge} 
        label="Top Speed" 
        value={`${topSpeed} mph`} 
      />
      <VehicleStatValue 
        icon={Zap} 
        label="0-60 mph" 
        value={`${acceleration}s`} 
      />
    </motion.div>
  );
};

export default VehiclePerformance;
