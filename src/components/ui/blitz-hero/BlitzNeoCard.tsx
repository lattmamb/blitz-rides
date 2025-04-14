
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface BlitzNeoCardProps {
  title: string;
  description: string;
  image: string;
}

export default function BlitzNeoCard({ title, description, image }: BlitzNeoCardProps) {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/vehicles/${title.toLowerCase().replace(/\s+/g, '-')}`);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="glass-card overflow-hidden border-none p-1 h-full">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <div className="blue-glow w-12 h-1 bg-tesla-blue mb-2 rounded-full"></div>
            <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-white/60 text-xs">Available Now</span>
            </div>
            <div className="text-white/90 text-sm font-medium">
              Explore
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
