
import React from 'react';
import { motion } from "framer-motion";
import Map from '@/components/Map';
import { chargingStations } from '@/data/chargingStationData';

const MapSection = () => {
  return (
    <motion.section 
      className="py-16 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-radial from-tesla-dark-80 to-black"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-center glx-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Live Vehicle Tracking
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Track available vehicles and charging stations in real-time on our interactive map.
          </motion.p>
        </div>
        
        <div className="glass-card p-1 rounded-2xl overflow-hidden">
          <div className="w-full h-[500px] rounded-2xl">
            <Map 
              center={{ lat: 37.7749, lng: -122.4194 }} 
              zoom={9} 
              stations={chargingStations}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MapSection;
