
import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Vehicle } from '@/types';
import { itemVariants } from './utils';

interface FeaturesTabProps {
  vehicle: Vehicle;
}

const FeaturesTab: React.FC<FeaturesTabProps> = ({ vehicle }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicle.features.map((feature, index) => (
        <motion.div 
          key={index}
          variants={itemVariants} 
          className="glass-card p-4 hover:bg-white/5 transition-colors"
        >
          <div className="text-tesla-blue mb-2">
            <Info className="h-5 w-5" />
          </div>
          <div className="font-medium mb-1">{feature}</div>
          <p className="text-sm text-white/70">
            Enhanced feature for premium driving experience.
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesTab;
