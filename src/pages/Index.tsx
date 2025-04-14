
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { vehicles } from '@/data/vehicles';
import FeaturesSection from '@/components/FeaturesSection';
import IntelligentLoading from '@/components/ui/IntelligentLoading';

// Import our new section components
import HeroSection from '@/components/sections/HeroSection';
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
      <HeroSection />
      <SearchSection onSearch={handleSearch} />
      <CarouselSection />
      <VehiclesSection vehicles={filteredVehicles} loading={vehiclesLoading} />
      <FeaturedVehicleSection />
      <FeaturesSection />
      <MapSection />
      <TeslaModelsSection />
    </MainLayout>
  );
};

export default Index;
