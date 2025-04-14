
import React from 'react';
import { motion } from "framer-motion";
import VehicleCard from '@/components/VehicleCard';
import { Vehicle } from '@/types';
import { useInView } from 'framer-motion';
import CardSkeleton from '@/components/ui/CardSkeleton';

interface VehiclesSectionProps {
  vehicles: Vehicle[];
  loading?: boolean;
}

const VehiclesSection = ({ vehicles, loading = false }: VehiclesSectionProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.section 
      ref={ref}
      className="py-16 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-center gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Available Vehicles
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 mb-10 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse our current inventory of Tesla vehicles ready for immediate rental.
            Select your perfect electric ride and experience the future today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(6).fill(0).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CardSkeleton />
              </motion.div>
            ))
          ) : (
            vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default VehiclesSection;
