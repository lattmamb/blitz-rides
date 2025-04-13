
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ScrollIndicator: React.FC = () => {
  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <ArrowDown className="h-8 w-8 text-white/60" />
    </motion.div>
  );
};

export default ScrollIndicator;
