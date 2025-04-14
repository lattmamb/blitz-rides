
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="glass-card overflow-hidden border-none p-1 h-full relative group">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ 
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }}
        />
        
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <motion.img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
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
            </div>
          </motion.div>
          
          {/* Reflection effect */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
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
          
          {/* Button appears on hover */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="bg-tesla-blue/90 hover:bg-tesla-blue text-white px-4 py-2 rounded-full text-sm flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details <ChevronRight className="h-4 w-4 ml-1" />
            </motion.button>
          </motion.div>
        </div>
        
        {/* Bottom reflection */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/10"></div>
      </Card>
    </motion.div>
  );
}
