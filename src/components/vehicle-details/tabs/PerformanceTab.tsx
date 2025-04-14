
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Battery, Info } from 'lucide-react';
import { Vehicle } from '@/types';
import { itemVariants } from './utils';

interface PerformanceTabProps {
  vehicle: Vehicle;
}

const PerformanceTab: React.FC<PerformanceTabProps> = ({ vehicle }) => {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <Zap className="mr-2 text-tesla-blue" /> 
            Acceleration
          </h3>
          <div className="glass-card p-4 mb-2">
            <div className="flex justify-between mb-2">
              <span>0-60 mph</span>
              <span className="font-bold">{vehicle.performance.acceleration}s</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-tesla-blue to-tesla-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (1 / vehicle.performance.acceleration) * 50)}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex justify-between mb-2">
              <span>¼ Mile</span>
              <span className="font-bold">10.6s</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-tesla-blue to-tesla-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <Gauge className="mr-2 text-tesla-blue" /> 
            Top Speed
          </h3>
          <div className="glass-card p-4">
            <div className="flex justify-between mb-2">
              <span>Maximum</span>
              <span className="font-bold">{vehicle.performance.topSpeed} mph</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-tesla-blue to-tesla-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(vehicle.performance.topSpeed / 200) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
          
      <div>
        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <Battery className="mr-2 text-tesla-blue" /> 
            Range & Charging
          </h3>
          <div className="glass-card p-4 mb-2">
            <div className="flex justify-between mb-2">
              <span>EPA Estimated Range</span>
              <span className="font-bold">{vehicle.performance.range} miles</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-tesla-blue to-tesla-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(vehicle.performance.range / 500) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex justify-between mb-2">
              <span>Peak Charging Rate</span>
              <span className="font-bold">250 kW</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-tesla-blue to-tesla-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <Info className="mr-2 text-tesla-blue" /> 
            Powertrain
          </h3>
          <div className="glass-card p-4 mb-2">
            <div className="flex justify-between mb-2">
              <span>Drive</span>
              <span className="font-bold">Dual Motor AWD</span>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex justify-between mb-2">
              <span>Peak Power</span>
              <span className="font-bold">1,020 hp</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="col-span-full mt-4 glass-blue p-6 rounded-xl"
        variants={itemVariants}
      >
        <div className="text-lg font-medium mb-2 text-white">Performance Highlights</div>
        <p className="text-white/80">The {vehicle.model} delivers unparalleled performance with instant torque and responsive handling. Advanced dual-motor architecture provides independent digital control of torque to the front and rear wheels.</p>
      </motion.div>
    </div>
  );
};

export default PerformanceTab;
