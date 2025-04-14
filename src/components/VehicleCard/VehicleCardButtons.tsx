
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
        className="flex-1"
      >
        <Button 
          asChild 
          variant="outline" 
          className="w-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white"
        >
          <Link to={`/vehicles/${vehicleId}`}>
            View Details
          </Link>
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex-1"
      >
        <Button 
          asChild 
          className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white"
          disabled={!available}
        >
          <Link to={`/book/${vehicleId}`} className="flex items-center">
            Rent Now <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default VehicleCardButtons;
