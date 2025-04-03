
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { vehicles } from '@/data/vehicles';
import SearchFilter from '@/components/SearchFilter';
import ExpandableVehiclesGrid from '@/components/ui/expandable-vehicles-grid';
import { Separator } from '@/components/ui/separator';

const VehiclesList: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Fleet</h1>
          <p className="text-white/70 text-lg mb-10">
            Explore our selection of premium electric vehicles available for rent or subscription.
          </p>
          
          <SearchFilter />
          <Separator className="my-8 bg-white/10" />
          
          <ExpandableVehiclesGrid vehicles={vehicles} />
        </div>
      </div>
    </MainLayout>
  );
};

export default VehiclesList;
