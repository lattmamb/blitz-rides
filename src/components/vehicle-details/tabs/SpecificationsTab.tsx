
import React from 'react';
import { motion } from 'framer-motion';
import { Vehicle } from '@/types';
import { itemVariants } from './utils';

interface SpecificationsTabProps {
  vehicle: Vehicle;
}

const SpecificationsTab: React.FC<SpecificationsTabProps> = ({ vehicle }) => {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-xl font-bold mb-3">Dimensions</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Length</span>
              <span>196 inches</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Width</span>
              <span>86 inches</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Height</span>
              <span>57 inches</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Ground Clearance</span>
              <span>5.5 inches</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div>
        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-xl font-bold mb-3">Weight</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Curb Weight</span>
              <span>4,561 lbs</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Gross Vehicle Weight</span>
              <span>5,798 lbs</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Cargo Capacity</span>
              <span>28 cu ft</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Towing Capacity</span>
              <span>3,500 lbs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpecificationsTab;
