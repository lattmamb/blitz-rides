import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Zap, Battery, ShieldCheck, Palette, Info } from 'lucide-react';
import { Vehicle } from '@/types';

interface VehicleDetailsTabsProps {
  vehicle: Vehicle;
}

const getColorName = (hex: string) => {
  switch(hex.toUpperCase()) {
    case '#FFFFFF': return 'Pearl White';
    case '#000000': return 'Solid Black';
    case '#C0C0C0': return 'Silver Metallic';
    case '#FF0000': return 'Red Multi-Coat';
    case '#0000FF': return 'Deep Blue Metallic';
    case '#808080': return 'Midnight Silver';
    case '#A52A2A': return 'Brown Metallic';
    default: return 'Custom Color';
  }
};

const VehicleDetailsTabs: React.FC<VehicleDetailsTabsProps> = ({ vehicle }) => {
  const [activeTab, setActiveTab] = useState('performance');
  
  const tabs = [
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'features', label: 'Features', icon: Info },
    { id: 'specifications', label: 'Specifications', icon: Gauge },
    { id: 'safety', label: 'Safety', icon: ShieldCheck },
    { id: 'design', label: 'Design', icon: Palette },
  ];
  
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

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
              className="grid md:grid-cols-2 gap-10"
            >
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
            </motion.div>
          )}
          
          {activeTab === 'specifications' && (
            <motion.div
              key="specifications"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid md:grid-cols-2 gap-10"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VehicleDetailsTabs;
