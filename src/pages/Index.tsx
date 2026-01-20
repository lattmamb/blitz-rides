
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { vehicles } from '@/data/vehicles';
import FeaturesSection from '@/components/FeaturesSection';
import IntelligentLoading from '@/components/ui/IntelligentLoading';
import { motion } from 'framer-motion';

// Import our new section components
import SearchSection from '@/components/sections/SearchSection';
import CarouselSection from '@/components/sections/CarouselSection';
import VehiclesSection from '@/components/sections/VehiclesSection';
import FeaturedVehicleSection from '@/components/sections/FeaturedVehicleSection';
import MapSection from '@/components/sections/MapSection';
import TeslaModelsSection from '@/components/sections/TeslaModelsSection';

const Index = () => {
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [isLoading, setIsLoading] = useState(true);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const initialTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    const vehiclesTimer = setTimeout(() => {
      setVehiclesLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(vehiclesTimer);
    };
  }, []);
  
  const handleSearch = (filters: {
    query: string;
    vehicleType: string;
    location: string;
    dateRange: string;
  }) => {
    setVehiclesLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
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
      setVehiclesLoading(false);
    }, 800);
  };
  
  if (isLoading) {
    return <IntelligentLoading customMessage="Preparing your BLITZ experience" />;
  }

  return (
    <MainLayout>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
        title="BLITZ Experience"
        date="Next-Gen Mobility"
        scrollToExpand="Scroll to Explore"
        textBlend
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SearchSection onSearch={handleSearch} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CarouselSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VehiclesSection vehicles={filteredVehicles} loading={vehiclesLoading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FeaturedVehicleSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FeaturesSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <MapSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <TeslaModelsSection />
        </motion.div>
      </ScrollExpandMedia>
    </MainLayout>
  );
};

export default Index;
