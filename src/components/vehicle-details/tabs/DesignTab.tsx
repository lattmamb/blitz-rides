
import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { Vehicle } from '@/types';
import { itemVariants, getColorName } from './utils';

interface DesignTabProps {
  vehicle: Vehicle;
}

const DesignTab: React.FC<DesignTabProps> = ({ vehicle }) => {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold mb-4">Exterior Design</h3>
        <div className="glass-card p-6 mb-4">
          <h4 className="font-bold mb-2 flex items-center">
            <Palette className="mr-2 h-5 w-5 text-tesla-blue" />
            Aerodynamics
          </h4>
          <p className="text-white/70">
            Sleek design with an industry-leading drag coefficient of 0.23, maximizing efficiency and range.
          </p>
        </div>
        
        <div className="glass-card p-6">
          <h4 className="font-bold mb-2 flex items-center">
            <Palette className="mr-2 h-5 w-5 text-tesla-blue" />
            Available Colors
          </h4>
          <div className="flex flex-wrap gap-3 mt-3">
            {vehicle.colors.map((color, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center"
              >
                <div 
                  className="h-8 w-8 rounded-full border-2 border-white/10" 
                  style={{ background: color }}
                ></div>
                <span className="text-xs mt-1">{getColorName(color).split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold mb-4">Interior Design</h3>
        <div className="glass-card p-6 mb-4">
          <h4 className="font-bold mb-2 flex items-center">
            <Palette className="mr-2 h-5 w-5 text-tesla-blue" />
            Minimalist Aesthetic
          </h4>
          <p className="text-white/70">
            Clean, modern interior with a 15-inch center touchscreen and panoramic glass roof.
          </p>
        </div>
        
        <div className="glass-card p-6">
          <h4 className="font-bold mb-2 flex items-center">
            <Palette className="mr-2 h-5 w-5 text-tesla-blue" />
            Premium Materials
          </h4>
          <p className="text-white/70">
            Vegan leather seats, wood trim, and premium textiles create a luxurious cabin environment.
          </p>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="col-span-full">
        <div className="glass-blue p-6 text-center">
          <p className="text-white/90">
            Every aspect of the {vehicle.model} has been engineered with an unwavering focus on sustainability without compromising luxury or performance.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DesignTab;
