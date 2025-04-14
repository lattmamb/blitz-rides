import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import SearchFilter from '@/components/SearchFilter';
import FeaturesSection from '@/components/FeaturesSection';
import Map from '@/components/Map';
import { vehicles } from '@/data/vehicles';
import ThreeDCardDemo from '@/components/ui/3d-card-demo';
import ExpandableCardDemoStandard from '@/components/ui/expandable-card-demo-standard';
import TeslaCardCarousel from '@/components/TeslaCardCarousel';
import { motion, useScroll, useTransform } from "framer-motion";
import BlitzHero from '@/components/ui/blitz-hero';

const Index = () => {
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  const handleSearch = (filters: {
    query: string;
    vehicleType: string;
    location: string;
    dateRange: string;
  }) => {
    let results = [...vehicles];

    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(
        (vehicle) => vehicle.model.toLowerCase().includes(query)
      );
    }

    if (filters.vehicleType !== 'all') {
      results = results.filter(
        (vehicle) => vehicle.type === filters.vehicleType
      );
    }

    setFilteredVehicles(results);
  };
  
  if (isLoading) {
    return null;
  }

  return (
    <MainLayout>
      <BlitzHero />
      
      <div className="container mx-auto px-4 mt-16">
        <SearchFilter onSearch={handleSearch} />
      </div>

      <div className="py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-tesla-dark-80 to-black"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <TeslaCardCarousel />
      </div>
      
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
            {filteredVehicles.map((vehicle, index) => (
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

      <motion.section 
        className="py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-tesla-dark-50 to-black"></div>
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
              Featured Vehicle
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Experience our interactive 3D showcase of Tesla's finest vehicles.
            </motion.p>
          </div>
          <ThreeDCardDemo />
        </div>
      </motion.section>

      <FeaturesSection />
      
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
            <Map className="w-full h-[500px] rounded-2xl" />
          </div>
        </div>
      </motion.section>
      
      <motion.section 
        className="py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
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
              Tesla Models
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore our lineup of premium electric vehicles. Click on any model to learn more.
            </motion.p>
          </div>
          <ExpandableCardDemoStandard />
        </div>
      </motion.section>
    </MainLayout>
  );
};

export default Index;
