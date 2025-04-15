
import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Vehicle } from '@/types';
import { itemVariants } from './utils';
import { CrystalCard } from '@/components/ui/crystal-ui';

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
        >
          <CrystalCard 
            className="p-4 hover:bg-white/5 transition-colors"
            depth="shallow"
            glint={true}
          >
            <div className="text-tesla-blue mb-2">
              <Info className="h-5 w-5" />
            </div>
            <div className="font-medium mb-1">{feature}</div>
            <p className="text-sm text-white/70">
              Enhanced feature for premium driving experience.
            </p>
          </CrystalCard>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesTab;
