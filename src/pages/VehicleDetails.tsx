
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { vehicles, subscriptionPlans } from '@/data/vehicles';
import VehicleDetailsHero from '@/components/vehicle-details/VehicleDetailsHero';
import SubscriptionPlans from '@/components/vehicle-details/SubscriptionPlans';
import VehicleDetailsTabs from '@/components/vehicle-details/VehicleDetailsTabs';
import RelatedVehicles from '@/components/vehicle-details/RelatedVehicles';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const vehicle = vehicles.find(v => v.id === id);
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1]?.id || '');
  
  // Set default selected color when vehicle changes
  useEffect(() => {
    if (vehicle && vehicle.colors.length > 0) {
      setSelectedColor(vehicle.colors[0]);
    }
  }, [vehicle]);
  
  if (!vehicle) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 mt-14 md:mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Vehicle Not Found</h2>
          <p className="mb-8 text-white/70">The requested vehicle could not be found.</p>
          <Link to="/vehicles">
            <Button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white">
              Browse Vehicles
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="text-sm text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/vehicles" className="hover:text-white">Vehicles</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{vehicle.model}</span>
          </div>
        </div>
        
        {/* Hero Section */}
        <VehicleDetailsHero 
          vehicle={vehicle} 
          selectedColor={selectedColor} 
          setSelectedColor={setSelectedColor} 
        />
        
        {/* Subscription Plans */}
        <SubscriptionPlans 
          plans={subscriptionPlans}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          vehicleAvailable={vehicle.available}
        />
        
        {/* Additional Information */}
        <VehicleDetailsTabs vehicle={vehicle} />
        
        {/* Related Vehicles */}
        <RelatedVehicles currentVehicleId={vehicle.id} vehicles={vehicles} />
      </div>
    </MainLayout>
  );
};

export default VehicleDetails;
