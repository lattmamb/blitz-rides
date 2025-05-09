
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Battery, Zap } from "lucide-react";

interface BlitzNeoCardProps {
  title: string;
  description: string;
  image: string;
}

export default function BlitzNeoCard({ title, description, image }: BlitzNeoCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCardClick = () => {
    navigate(`/vehicles/${title.toLowerCase().replace(/\s+/g, '-')}`);
  };
  
  // Generate random specs for demonstration
  const range = Math.floor(Math.random() * 100) + 300; // 300-400 miles
  const acceleration = (Math.random() * 2 + 2).toFixed(1); // 2.0-4.0 seconds
  
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -10 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer relative"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced glass card with better reflections */}
      <Card className="glass-premium overflow-hidden border-none p-1 h-full relative group">
        {/* Enhanced animated glow effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 -z-10 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ 
                background: 'radial-gradient(circle at 50% 50%, rgba(10,132,255,0.2) 0%, transparent 70%)',
                boxShadow: '0 8px 32px rgba(10,132,255,0.3)'
              }}
            />
          )}
        </AnimatePresence>
        
        {/* Enhanced top reflection */}
        <motion.div 
          className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Enhanced gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          style={{ 
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)'
          }}
        />
        
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <motion.img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <motion.div 
                className="blue-glow w-12 h-1 bg-tesla-blue mb-2 rounded-full"
                initial={{ width: 12 }}
                animate={{ width: isHovered ? 48 : 12 }}
                transition={{ duration: 0.3 }}
              />
              <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
              <p className="text-white/80 text-sm">{description}</p>
              
              {/* Enhanced vehicle specs that appear on hover */}
              <motion.div 
                className="mt-2 grid grid-cols-2 gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center gap-1.5">
                  <Battery className="h-3 w-3 text-tesla-blue" />
                  <span className="text-xs text-white/80">{range} mi range</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-tesla-blue" />
                  <span className="text-xs text-white/80">{acceleration}s 0-60 mph</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Enhanced reflection effect */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 relative">
          <motion.h3 
            className="text-white text-xl font-bold mb-1"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-white/70 text-sm"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="mt-4 flex justify-between items-center"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2 shadow-[0_0_5px_rgba(52,199,89,0.5)]"></div>
              <span className="text-white/60 text-xs">Available Now</span>
            </div>
            
            <motion.div 
              className="text-white/90 text-sm font-medium flex items-center"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              Explore
              <ChevronRight className="h-4 w-4 ml-1" />
            </motion.div>
          </motion.div>
          
          {/* Enhanced button appears on hover */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-tesla-blue to-tesla-purple text-white px-4 py-2 rounded-full text-sm flex items-center group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Details</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              
              {/* Enhanced button reflection */}
              <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
              
              {/* Enhanced animation flow */}
              <motion.span 
                className="absolute inset-0 bg-white/10 -z-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </motion.button>
          </motion.div>
        </div>
        
        {/* Enhanced bottom reflection */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </Card>
      
      {/* Enhanced 3D floating shadow */}
      <motion.div 
        className="absolute -inset-0.5 bg-tesla-blue/5 -z-10 rounded-xl blur-xl"
        animate={{ 
          opacity: isHovered ? 0.7 : 0.1,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
