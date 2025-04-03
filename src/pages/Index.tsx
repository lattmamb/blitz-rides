
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import SearchFilter from '@/components/SearchFilter';
import VehicleCard from '@/components/VehicleCard';
import FeaturesSection from '@/components/FeaturesSection';
import Map from '@/components/Map';
import { vehicles } from '@/data/vehicles';

const Index = () => {
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);

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

  return (
    <MainLayout>
      <Hero />
      
      <div className="container mx-auto px-4">
        <SearchFilter onSearch={handleSearch} />
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text text-center">Tesla Vehicles</h2>
            <p className="text-xl text-white/70 mb-8 text-center max-w-3xl mx-auto">
              Experience the pinnacle of electric vehicle technology with our fleet of Tesla
              vehicles. From the sleek Model 3 to the versatile Cybertruck, find the perfect Tesla
              for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      
      <section className="py-16 bg-tesla-dark-80">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Live Vehicle Tracking</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Track available vehicles and charging stations in real-time on our interactive map.
            </p>
          </div>
          
          <Map className="w-full h-[500px]" />
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
