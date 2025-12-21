import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import BlitzVaporHero from '@/components/BlitzVaporHero';
import { vehicles } from '@/data/vehicles';
import FeaturesSection from '@/components/FeaturesSection';
import LazySection, { LazyLoadWrapper } from '@/components/ui/LazySection';

// Lazy import heavy sections
const SearchSection = React.lazy(() => import('@/components/sections/SearchSection'));
const CarouselSection = React.lazy(() => import('@/components/sections/CarouselSection'));
const VehiclesSection = React.lazy(() => import('@/components/sections/VehiclesSection'));
const FeaturedVehicleSection = React.lazy(() => import('@/components/sections/FeaturedVehicleSection'));
const MapSection = React.lazy(() => import('@/components/sections/MapSection'));
const TeslaModelsSection = React.lazy(() => import('@/components/sections/TeslaModelsSection'));

// Minimal section placeholder
const SectionPlaceholder = () => (
  <div className="min-h-[300px] bg-background/10 backdrop-blur-sm rounded-2xl animate-pulse" />
);

const Index = () => {
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSearch = (filters: {
    query: string;
    vehicleType: string;
    location: string;
    dateRange: string;
  }) => {
    setVehiclesLoading(true);
    
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
    }, 400);
  };

  return (
    <MainLayout>
      {/* Hero with lazy vapor animation */}
      <BlitzVaporHero />
      
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
      >
        <LazySection animation="slide-up" delay={0} threshold={0.05}>
          <React.Suspense fallback={<SectionPlaceholder />}>
            <SearchSection onSearch={handleSearch} />
          </React.Suspense>
        </LazySection>

        <LazySection animation="slide-up" delay={50} threshold={0.05}>
          <React.Suspense fallback={<SectionPlaceholder />}>
            <CarouselSection />
          </React.Suspense>
        </LazySection>

        <LazySection animation="fade" delay={0} threshold={0.05}>
          <React.Suspense fallback={<SectionPlaceholder />}>
            <VehiclesSection vehicles={filteredVehicles} loading={vehiclesLoading} />
          </React.Suspense>
        </LazySection>

        <LazySection animation="slide-up" delay={0} threshold={0.1}>
          <React.Suspense fallback={<SectionPlaceholder />}>
            <FeaturedVehicleSection />
          </React.Suspense>
        </LazySection>

        <LazySection animation="fade" delay={0} threshold={0.1}>
          <FeaturesSection />
        </LazySection>

        <LazyLoadWrapper rootMargin="300px" fallback={<SectionPlaceholder />}>
          <LazySection animation="slide-up" threshold={0.1}>
            <React.Suspense fallback={<SectionPlaceholder />}>
              <MapSection />
            </React.Suspense>
          </LazySection>
        </LazyLoadWrapper>

        <LazyLoadWrapper rootMargin="300px" fallback={<SectionPlaceholder />}>
          <LazySection animation="slide-up" threshold={0.1}>
            <React.Suspense fallback={<SectionPlaceholder />}>
              <TeslaModelsSection />
            </React.Suspense>
          </LazySection>
        </LazyLoadWrapper>
      </ScrollExpandMedia>
    </MainLayout>
  );
};

export default Index;
