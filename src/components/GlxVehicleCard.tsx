
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types';
import { cn } from '@/lib/utils';

interface GlxVehicleCardProps {
  vehicle: Vehicle;
  className?: string;
}

const GlxVehicleCard: React.FC<GlxVehicleCardProps> = ({ vehicle, className }) => {
  return (
    <Link 
      to={`/vehicles/${vehicle.id}`} 
      className={cn("block", className)}
    >
      <motion.div 
        className="glx-card h-[380px] relative overflow-hidden group"
        whileHover={{ 
          y: -10,
          boxShadow: "0 15px 30px rgba(10, 132, 255, 0.2), 0 0 20px rgba(10, 132, 255, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Orbital effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="glx-orbital w-[140%] h-[140%] -left-[20%] -top-[20%]"></div>
          <div className="glx-orbital w-[120%] h-[120%] -left-[10%] -top-[10%] animation-delay-1000"></div>
        </div>
        
        {/* Image Container */}
        <div className="h-52 overflow-hidden relative">
          <motion.img 
            src={vehicle.image} 
            alt={vehicle.model} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Availability badge */}
          {vehicle.availability && (
            <div className="absolute top-3 right-3 bg-tesla-blue/90 text-white text-xs px-2 py-1 rounded-full">
              Available Now
            </div>
          )}
          
          {/* GLX Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tesla-blue via-tesla-purple to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold glx-text">
              {vehicle.model}
            </h3>
            <span className="text-xl font-semibold text-white">${vehicle.price}<span className="text-sm text-white/70">/day</span></span>
          </div>
          
          <p className="text-white/70 text-sm mb-3">{vehicle.description.substring(0, 100)}...</p>
          
          {/* Vehicle Specs */}
          <div className="grid grid-cols-2 gap-2 text-xs text-white/60 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-tesla-blue"></div>
              <span>{vehicle.range}mi range</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-tesla-purple"></div>
              <span>{vehicle.seats} seats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-tesla-red"></div>
              <span>{vehicle.topSpeed}mph</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-tesla-green"></div>
              <span>{vehicle.type}</span>
            </div>
          </div>
        </div>
        
        {/* Book Button */}
        <motion.div 
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button 
            className="bg-tesla-blue hover:bg-tesla-blue/90 text-white px-4 py-1.5 rounded-full text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default GlxVehicleCard;
