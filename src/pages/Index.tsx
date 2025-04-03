
import React, { useState } from 'react';
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

      {/* Tesla Vehicles Parallax Showcase */}
      <TeslaVehiclesParallax />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text text-center">Available Now</h2>
            <p className="text-xl text-white/70 mb-8 text-center max-w-3xl mx-auto">
              Browse our current inventory of Tesla vehicles ready for immediate rental.
              Select your perfect electric ride and experience the future today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-tesla-dark-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Featured Vehicle</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Experience our interactive 3D showcase of Tesla's finest vehicles.
            </p>
          </div>
          <ThreeDCardDemo />
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
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Tesla Models</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Explore our lineup of premium electric vehicles. Click on any model to learn more.
            </p>
          </div>
          <ExpandableCardDemoStandard />
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
