
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import SearchFilter from '@/components/SearchFilter';
import VehicleCard from '@/components/VehicleCard';
import FeaturesSection from '@/components/FeaturesSection';
import Map from '@/components/Map';
import { vehicles } from '@/data/vehicles';
import TeslaVehiclesParallax from '@/components/TeslaVehiclesParallax';
import ThreeDCardDemo from '@/components/ui/3d-card-demo';
import ExpandableCardDemoStandard from '@/components/ui/expandable-card-demo-standard';
import { SparklesPreviewTesla } from '@/components/ui/sparkles-demo';
import TeslaCardCarousel from '@/components/TeslaCardCarousel';
import { motion, useScroll, useTransform } from "framer-motion";
import Vehicle3DModel from '@/components/Vehicle3DModel';

const Index = () => {
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll animations
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

    // Filter by query (model name)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(
        (vehicle) => vehicle.model.toLowerCase().includes(query)
      );
    }

    // Filter by vehicle type
    if (filters.vehicleType !== 'all') {
      results = results.filter(
        (vehicle) => vehicle.type === filters.vehicleType
      );
    }

    setFilteredVehicles(results);
  };
  
  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="relative flex flex-col items-center">
          <motion.div 
            className="w-20 h-20 relative"
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            <div className="absolute top-0 bottom-0 left-0 right-0">
              <div className="w-full h-full border-t-2 border-tesla-blue rounded-full"></div>
            </div>
          </motion.div>
          <motion.h1 
            className="text-white text-xl mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Unity Fleet
          </motion.h1>
          <motion.div
            className="bg-white/10 h-[2px] w-40 mt-2 rounded overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-tesla-blue"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <Hero />
      
      <div className="container mx-auto px-4">
        <SearchFilter onSearch={handleSearch} />
      </div>

      {/* Featured 3D Vehicle Model */}
      <motion.section 
        className="py-16 mt-10 overflow-hidden relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Experience Tesla
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Interact with our vehicles and discover the future of transportation
          </motion.p>
          
          <div className="h-[500px]">
            <Vehicle3DModel 
              modelPath="https://assets.aceternity.com/demos/tesla-model-s.webp" 
              label="Tesla Model S"
            />
          </div>
        </div>
      </motion.section>

      {/* Tesla Vehicles Parallax Showcase */}
      <TeslaVehiclesParallax />
      
      {/* Tesla Cards Carousel */}
      <div className="py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-tesla-dark-80 to-black"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <TeslaCardCarousel />
      </div>
      
      {/* SparklesPreviewTesla Showcase */}
      <SparklesPreviewTesla />
      
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
              className="text-3xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
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
                <VehicleCard vehicle={vehicle} />
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
              className="text-3xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
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
              className="text-3xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
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
              className="text-3xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
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
