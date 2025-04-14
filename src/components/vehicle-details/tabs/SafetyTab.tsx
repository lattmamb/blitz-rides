
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Vehicle } from '@/types';
import { itemVariants } from './utils';

interface SafetyTabProps {
  vehicle: Vehicle;
}

const SafetyTab: React.FC<SafetyTabProps> = ({ vehicle }) => {
  return (
    <>
      <motion.div variants={itemVariants} className="mb-8 text-center max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-3">Safety Rating</h3>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div 
              key={star}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * star }}
            >
              <svg className="w-8 h-8 text-tesla-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </motion.div>
          ))}
        </div>
        <p className="text-white/70">
          The Model Y has achieved the highest safety ratings from NHTSA with 5-star ratings in every category.
        </p>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h4 className="font-bold mb-2 flex items-center">
            <ShieldCheck className="mr-2 h-5 w-5 text-tesla-blue" />
            Impact Protection
          </h4>
          <p className="text-white/70 text-sm">
            Rigid structure with reinforced battery pack provides exceptional occupant protection.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h4 className="font-bold mb-2 flex items-center">
            <ShieldCheck className="mr-2 h-5 w-5 text-tesla-blue" />
            Autopilot Safety
          </h4>
          <p className="text-white/70 text-sm">
            Advanced driver assistance features help prevent collisions and enhance safety.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h4 className="font-bold mb-2 flex items-center">
            <ShieldCheck className="mr-2 h-5 w-5 text-tesla-blue" />
            Low Center of Gravity
          </h4>
          <p className="text-white/70 text-sm">
            Floor-mounted battery pack provides a low center of gravity, reducing rollover risk.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default SafetyTab;
