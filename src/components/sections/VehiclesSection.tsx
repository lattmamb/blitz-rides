
import React from 'react';
import { motion } from "framer-motion";
import GlxVehicleCard from '@/components/GlxVehicleCard';
import { Vehicle } from '@/types';

interface VehiclesSectionProps {
  vehicles: Vehicle[];
}

const VehiclesSection = ({ vehicles }: VehiclesSectionProps) => {
  return (
    <motion.section 
      className="py-16 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-center glx-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Available Vehicles
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 mb-10 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Browse our current inventory of Tesla vehicles ready for immediate rental.
            Select your perfect electric ride and experience the future today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlxVehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default VehiclesSection;
