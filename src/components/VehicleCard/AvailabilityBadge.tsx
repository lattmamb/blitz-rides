
import React from "react";
import { motion } from "framer-motion";

interface AvailabilityBadgeProps {
  available: boolean;
}

const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({ available }) => {
  if (available) {
    return (
      <motion.div 
        className="absolute top-4 right-4 z-10 bg-tesla-green text-white text-xs font-medium px-2 py-1 rounded-full"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Available
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="absolute top-4 right-4 z-10 bg-tesla-red/90 text-white text-xs font-medium px-2 py-1 rounded-full"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      Coming Soon
    </motion.div>
  );
};

export default AvailabilityBadge;
