
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Vehicle } from "../types";
import { ArrowRight, Battery, Gauge, Zap } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother animation
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position as percentage from center of card
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset card position on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="glass-card group overflow-hidden transition-all duration-300 tesla-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1200,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 relative overflow-hidden">
        {/* Availability badge */}
        {vehicle.available ? (
          <motion.div 
            className="absolute top-4 right-4 z-10 bg-tesla-green text-white text-xs font-medium px-2 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Available
          </motion.div>
        ) : (
          <motion.div 
            className="absolute top-4 right-4 z-10 bg-tesla-red/90 text-white text-xs font-medium px-2 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Coming Soon
          </motion.div>
        )}

        {/* Vehicle image */}
        <motion.div 
          className="relative h-40 flex items-center justify-center mb-6"
          style={{
            z: 50,
            transformStyle: "preserve-3d",
            transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
          }}
        >
          <motion.img
            src={vehicle.image}
            alt={vehicle.model}
            className="h-full object-contain"
            animate={{ 
              y: isHovered ? [0, -5, 0] : 0,
              rotate: isHovered ? [-0.5, 0.5, -0.5] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ 
              duration: 3, 
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          
          {/* Reflection */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white/5 backdrop-blur-md"
            style={{
              transform: "rotateX(180deg) translateY(90%)",
              opacity: isHovered ? 0.3 : 0,
              transition: "opacity 0.5s ease"
            }}
          />
        </motion.div>

        {/* Vehicle info */}
        <div>
          <motion.h3 
            className="text-xl font-bold mb-1"
            style={{
              transformStyle: "preserve-3d",
              transform: isHovered ? "translateZ(30px)" : "translateZ(0)"
            }}
          >
            {vehicle.model}
          </motion.h3>
          
          <motion.div 
            className="flex justify-between items-center mb-4"
            style={{
              transformStyle: "preserve-3d",
              transform: isHovered ? "translateZ(25px)" : "translateZ(0)"
            }}
          >
            <div>
              <span className="text-2xl font-bold text-white">${vehicle.price}</span>
              <span className="text-white/70 text-sm">{vehicle.priceUnit}</span>
            </div>
            <div className="glass-effect px-2 py-1 rounded-full text-xs font-medium text-white/90">
              {vehicle.type.toUpperCase()}
            </div>
          </motion.div>

          {/* Performance metrics */}
          <motion.div 
            className="grid grid-cols-3 gap-2 mb-5"
            style={{
              transformStyle: "preserve-3d",
              transform: isHovered ? "translateZ(20px)" : "translateZ(0)"
            }}
          >
            <motion.div 
              className="neo-card flex flex-col items-center p-3 rounded-xl"
              whileHover={{ y: -2, scale: 1.05 }}
            >
              <Battery className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">Range</span>
              <span className="text-sm font-medium">{vehicle.performance.range} mi</span>
            </motion.div>
            
            <motion.div 
              className="neo-card flex flex-col items-center p-3 rounded-xl"
              whileHover={{ y: -2, scale: 1.05 }}
            >
              <Gauge className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">Top Speed</span>
              <span className="text-sm font-medium">{vehicle.performance.topSpeed} mph</span>
            </motion.div>
            
            <motion.div 
              className="neo-card flex flex-col items-center p-3 rounded-xl"
              whileHover={{ y: -2, scale: 1.05 }}
            >
              <Zap className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">0-60 mph</span>
              <span className="text-sm font-medium">{vehicle.performance.acceleration}s</span>
            </motion.div>
          </motion.div>

          {/* Action buttons */}
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
                <Link to={`/vehicles/${vehicle.id}`}>
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
                disabled={!vehicle.available}
              >
                <Link to={`/book/${vehicle.id}`} className="flex items-center">
                  Rent Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
