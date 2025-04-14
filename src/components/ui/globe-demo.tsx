
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassEarth } from '@/components/ui/glass-earth';
import { ChargingStation } from '@/types';
import { MapPin, Zap, Info } from 'lucide-react';

interface GlobeDemoProps {
  stations: ChargingStation[];
}

const GlobeDemo: React.FC<GlobeDemoProps> = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl glass-card">
      {/* Background elements */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] z-0"></div>
      <div className="absolute -left-40 top-40 w-80 h-80 bg-tesla-blue/5 rounded-full filter blur-[100px] animate-pulse-glow z-0"></div>
      <div className="absolute -right-40 bottom-20 w-96 h-96 bg-tesla-purple/5 rounded-full filter blur-[120px] animate-pulse-glow z-0" style={{ animationDelay: "1s" }}></div>
      
      {/* Globe container with glass earth */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <GlassEarth className="w-80 h-80" />
          
          {/* Station markers */}
          {stations.map((station, index) => (
            <motion.div
              key={station.id}
              className="absolute cursor-pointer z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{
                // Position randomly around the globe
                left: `calc(50% + ${Math.cos(index * (Math.PI * 2 / stations.length)) * 120}px)`,
                top: `calc(50% + ${Math.sin(index * (Math.PI * 2 / stations.length)) * 120}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedStation(station === selectedStation ? null : station)}
            >
              <motion.div 
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  station.available > 0 ? 'bg-tesla-blue' : 'bg-tesla-red'
                }`}
                animate={{
                  boxShadow: [
                    `0 0 0 rgba(${station.available > 0 ? '10,132,255' : '255,59,48'}, 0.4)`,
                    `0 0 10px rgba(${station.available > 0 ? '10,132,255' : '255,59,48'}, 0.6)`,
                    `0 0 0 rgba(${station.available > 0 ? '10,132,255' : '255,59,48'}, 0.4)`
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
              >
                {station.available > 0 ? 
                  <Zap className="h-3 w-3 text-white" /> : 
                  <MapPin className="h-3 w-3 text-white" />
                }
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Station info panel */}
      <AnimatePresence>
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="absolute top-6 right-6 w-64 z-20"
          >
            <div className="glass-premium overflow-hidden p-4 rounded-xl backdrop-blur-xl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{selectedStation.name}</h3>
                <motion.button 
                  className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={() => setSelectedStation(null)}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-sm">×</span>
                </motion.button>
              </div>
              
              <div className="flex items-center gap-2 mb-3 text-sm text-white/70">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span>{selectedStation.address}</span>
              </div>
              
              <div className="bg-glass-highlight rounded overflow-hidden p-2 mb-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs text-white/70">Available</div>
                    <div className="font-medium text-sm">
                      {selectedStation.available}/{selectedStation.total}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-white/70">Speed</div>
                    <div className="flex items-center justify-center gap-1 font-medium text-sm">
                      <Zap className="h-2 w-2 text-tesla-blue" />
                      {selectedStation.chargingSpeed}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-white/70">Status</div>
                    <div className="font-medium text-sm">
                      {selectedStation.available > 0 ? 'Open' : 'Full'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-white/50">
                <Info className="h-3 w-3" />
                <span>Click on the globe to explore more stations</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Ambient reflections */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
  );
};

export default GlobeDemo;
