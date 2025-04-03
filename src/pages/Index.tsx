
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import ServiceTiers from '@/components/ServiceTiers';
import VehiclesSection from '@/components/VehiclesSection';
import UnityLinkHubs from '@/components/UnityLinkHubs';
import VisionSystem from '@/components/VisionSystem';
import AtlasToken from '@/components/AtlasToken';
import RuralImpact from '@/components/RuralImpact';
import Timeline from '@/components/Timeline';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <ServiceTiers />
      <VehiclesSection />
      <UnityLinkHubs />
      <VisionSystem />
      <AtlasToken />
      <RuralImpact />
      <Timeline />
    </MainLayout>
  );
};

export default Index;
