
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";

interface VehicleCardButtonsProps {
  vehicleId: string;
  available: boolean;
  isHovered: boolean;
}

const VehicleCardButtons: React.FC<VehicleCardButtonsProps> = ({ 
  vehicleId, 
  available, 
  isHovered 
}) => {
  return (
    <motion.div 
      className="flex justify-between gap-2 mt-5"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered ? "translateZ(30px)" : "translateZ(0)"
      }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex-1 relative"
      >
        <Button 
          asChild 
          variant="glass"
          className="w-full border-white/10 hover:border-white/20 text-white group"
        >
          <Link to={`/vehicles/${vehicleId}`} className="flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
            <span>View Details</span>
            
            {/* Reflection effect */}
            <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </Button>
        
        {/* Spotlight glow when hovered */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
            }}
          />
        )}
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex-1 relative"
      >
        <Button 
          asChild 
          className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white group relative overflow-hidden"
          disabled={!available}
        >
          <Link to={`/book/${vehicleId}`} className="flex items-center justify-center">
            <span className="relative z-10">Rent Now</span> 
            <ArrowRight className="ml-1 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Animated gradient overlay */}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-tesla-blue via-tesla-purple to-tesla-blue bg-[length:200%_100%]"
              initial={{ backgroundPosition: '0% 0%' }}
              whileHover={{ backgroundPosition: '100% 0%' }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            />
            
            {/* Reflection effect */}
            <span className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></span>
          </Link>
        </Button>
        
        {/* Disabled state styling */}
        {!available && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-md">
            <span className="text-white/70 text-sm">Coming Soon</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VehicleCardButtons;
