
import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Zap } from "lucide-react";

type HeroContentProps = {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  headingRotateX: MotionValue<number>;
  headingRotateY: MotionValue<number>;
};

const HeroContent: React.FC<HeroContentProps> = ({
  rotateX,
  rotateY,
  headingRotateX,
  headingRotateY,
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1,
        ease: "easeOut"
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-10 relative"
      >
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-tesla-blue/20 rounded-full blur-lg"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="w-14 h-14 mx-auto mb-6 relative"
          style={{
            rotateY,
            rotateX
          }}
        >
          <motion.div 
            className="w-14 h-14 absolute inset-0 flex items-center justify-center"
            animate={{ 
              boxShadow: ['0 0 20px 2px rgba(10,132,255,0.3)', '0 0 30px 5px rgba(10,132,255,0.5)', '0 0 20px 2px rgba(10,132,255,0.3)']
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Zap size={36} className="text-tesla-blue" />
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.h1 
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        style={{
          perspective: 1000,
          rotateX: headingRotateX,
          rotateY: headingRotateY
        }}
      >
        <motion.span 
          className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/70 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Rent Your Dream
        </motion.span>
        <motion.span 
          className="block bg-clip-text text-transparent bg-gradient-to-r from-tesla-blue/90 via-white to-tesla-purple/90 relative mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Electric Vehicle
        </motion.span>
      </motion.h1>
      
      <motion.p 
        className="text-xl text-white/80 mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Experience the future of transportation with our premium electric 
        vehicle rental service. Zero emissions, maximum performance.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild className="tesla-button bg-gradient-to-r from-tesla-blue to-tesla-purple px-8 py-6 text-lg">
            <Link to="/vehicles" className="relative z-10 flex items-center">
              Browse Vehicles
              <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" size={18} />
            </Link>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild variant="outline" className="tesla-button-outline px-8 py-6 text-lg">
            <Link to="/how-it-works" className="flex items-center group">
              <span>Learn More</span>
              <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                <ChevronRight size={18} />
              </span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
