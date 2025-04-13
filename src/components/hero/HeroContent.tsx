
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroCard3D from "./HeroCard3D";

const HeroContent: React.FC = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-20 pb-16 md:pt-32 md:pb-28">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text">Unity Fleet</span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experience the future of transportation with our premium Tesla rental service.
          Discover luxury electric vehicles for your next adventure.
        </motion.p>
        
        <motion.div 
          className="flex justify-center space-x-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/vehicles" className="tesla-button">
            Browse Vehicles
          </Link>
          <Link to="/pricing" className="tesla-button-outline">
            View Pricing
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <HeroCard3D 
            imageSrc="/lovable-uploads/011215ed-22f9-4462-8492-3cdff3c58719.png" 
            title="Tesla Model S"
            subtitle="Premium Sedan"
          />
          <HeroCard3D 
            imageSrc="/lovable-uploads/87310600-2a51-4edd-a0b3-4ae26fc44398.png"
            title="Tesla Model 3"
            subtitle="Performance Edition"
          />
          <HeroCard3D 
            imageSrc="/lovable-uploads/011215ed-22f9-4462-8492-3cdff3c58719.png"
            title="Tesla Model X"
            subtitle="Premium SUV"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;
