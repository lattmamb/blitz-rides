
import React from "react";
import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";

interface VehicleContentProps {
  model: string;
  features: string[];
  performance: {
    range: number;
    topSpeed: number;
    acceleration: number;
  };
  colors: string[];
  colorImages?: {[key: string]: string};
  onColorChange?: (color: string) => void;
}

const VehicleContent: React.FC<VehicleContentProps> = ({ 
  model, 
  features, 
  performance,
  colors,
  colorImages,
  onColorChange
}) => {
  return (
    <motion.div 
      className="bg-[#0A0A0A]/80 backdrop-blur-md p-8 md:p-14 rounded-3xl mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-neutral-200 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <motion.span 
          className="font-bold text-white text-xl md:text-3xl block mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {model} - Experience Electric Excellence
        </motion.span>
        
        <PerformanceStats performance={performance} />
        
        {/* Color selector */}
        <ColorSelector 
          colors={colors} 
          colorImages={colorImages} 
          onColorChange={onColorChange} 
        />
        
        {/* Features list */}
        <FeaturesList features={features} />
      </div>
    </motion.div>
  );
};

// Performance Stats Component
const PerformanceStats: React.FC<{performance: {range: number; topSpeed: number; acceleration: number}}> = ({ performance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
      <motion.div 
        className="bg-black/30 p-4 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-center mb-2">
          <div className="h-10 w-10 rounded-full bg-tesla-blue/20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="h-6 w-6 rounded-full bg-tesla-blue/40 flex items-center justify-center"
            >
              <div className="h-3 w-3 rounded-full bg-tesla-blue"></div>
            </motion.div>
          </div>
        </div>
        <p className="text-tesla-blue text-sm">Range</p>
        <p className="text-white text-xl font-bold">{performance.range} mi</p>
      </motion.div>
      
      <motion.div 
        className="bg-black/30 p-4 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-center mb-2">
          <div className="h-10 w-10 rounded-full bg-tesla-purple/20 flex items-center justify-center">
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              animate={{ 
                rotateY: [0, 180, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut" 
              }}
            >
              <path d="M12 4V2M12 20v2M6.34 7.34L4.93 5.93M17.66 18.66l1.41 1.41M4 12H2M20 12h2M7.34 17.66l-1.41 1.41M18.66 7.34l1.41-1.41M12 17a5 5 0 100-10 5 5 0 000 10z" 
                stroke="#5E5CE6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        </div>
        <p className="text-tesla-purple text-sm">Top Speed</p>
        <p className="text-white text-xl font-bold">{performance.topSpeed} mph</p>
      </motion.div>
      
      <motion.div 
        className="bg-black/30 p-4 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-center mb-2">
          <motion.div 
            className="h-10 w-10 rounded-full bg-tesla-red/20 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut" 
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 9l7 7 7-7" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V4" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
        <p className="text-tesla-red text-sm">0-60 mph</p>
        <p className="text-white text-xl font-bold">{performance.acceleration}s</p>
      </motion.div>
    </div>
  );
};

// Color Selector Component
const ColorSelector: React.FC<{
  colors: string[];
  colorImages?: {[key: string]: string};
  onColorChange?: (color: string) => void;
}> = ({ colors, colorImages, onColorChange }) => {
  if (!colorImages || Object.keys(colorImages).length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      className="mt-6 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-tesla-blue text-lg mb-3">Available Colors:</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {colors.filter(color => colorImages[color]).map((color, index) => (
          <motion.div
            key={color}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-white transition-all"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onColorChange && onColorChange(color)}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Features List Component
const FeaturesList: React.FC<{features: string[]}> = ({ features }) => {
  return (
    <motion.div 
      className="mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <h3 className="text-tesla-blue text-lg mb-2">Key Features:</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-4">
        {features.map((feature, index) => (
          <motion.li 
            key={index} 
            className="flex items-center text-neutral-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
          >
            <Check size={16} className="text-tesla-green mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
      
      <motion.div 
        className="mt-6 p-4 border border-tesla-blue/20 rounded-xl bg-tesla-blue/5 flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <Shield size={24} className="text-tesla-blue mr-3 flex-shrink-0" />
        <p className="text-sm text-neutral-300">
          <span className="font-medium text-white">Premium Protection Plan</span> included with every rental. Includes insurance coverage and 24/7 roadside assistance.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default VehicleContent;
