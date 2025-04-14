
import React from 'react';
import TeslaCardCarousel from '@/components/TeslaCardCarousel';

const CarouselSection = () => {
  return (
    <div className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-tesla-dark-80 to-black"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
      <TeslaCardCarousel />
    </div>
  );
};

export default CarouselSection;
