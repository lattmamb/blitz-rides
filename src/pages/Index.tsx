
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { vehicles } from '@/data/vehicles';
import FeaturesSection from '@/components/FeaturesSection';

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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
      <HeroSection />
      <SearchSection onSearch={handleSearch} />
      <CarouselSection />
      <VehiclesSection vehicles={filteredVehicles} />
      <FeaturedVehicleSection />
      <FeaturesSection />
      <MapSection />
      <TeslaModelsSection />
    </MainLayout>
  );
};

export default Index;
