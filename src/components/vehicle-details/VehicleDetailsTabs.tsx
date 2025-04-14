
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Zap, Battery, ShieldCheck, Palette, Info } from 'lucide-react';
import { Vehicle } from '@/types';
import { tabContentVariants } from './tabs/utils';
import PerformanceTab from './tabs/PerformanceTab';
import FeaturesTab from './tabs/FeaturesTab';
import SpecificationsTab from './tabs/SpecificationsTab';
import SafetyTab from './tabs/SafetyTab';
import DesignTab from './tabs/DesignTab';

interface VehicleDetailsTabsProps {
  vehicle: Vehicle;
}

const VehicleDetailsTabs: React.FC<VehicleDetailsTabsProps> = ({ vehicle }) => {
  const [activeTab, setActiveTab] = useState('performance');
  
  const tabs = [
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'features', label: 'Features', icon: Info },
    { id: 'specifications', label: 'Specifications', icon: Gauge },
    { id: 'safety', label: 'Safety', icon: ShieldCheck },
    { id: 'design', label: 'Design', icon: Palette },
  ];

  return (
    <div className="mt-16 mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
        Detailed Specifications
      </h2>
      
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                isActive 
                  ? 'text-white bg-tesla-blue' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              
              {isActive && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30"
                  layoutId="activeTabIndicator"
                />
              )}
              
              {isActive && (
                <motion.div 
                  className="absolute -inset-px rounded-full bg-tesla-blue/30 -z-10"
                  layoutId="activeTabBackground"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      <div className="glass-premium p-8 rounded-2xl min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === 'performance' && (
            <motion.div
              key="performance"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PerformanceTab vehicle={vehicle} />
            </motion.div>
          )}
          
          {activeTab === 'features' && (
            <motion.div
              key="features"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FeaturesTab vehicle={vehicle} />
            </motion.div>
          )}
          
          {activeTab === 'specifications' && (
            <motion.div
              key="specifications"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SpecificationsTab vehicle={vehicle} />
            </motion.div>
          )}
          
          {activeTab === 'safety' && (
            <motion.div
              key="safety"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SafetyTab vehicle={vehicle} />
            </motion.div>
          )}
          
          {activeTab === 'design' && (
            <motion.div
              key="design"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DesignTab vehicle={vehicle} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VehicleDetailsTabs;
