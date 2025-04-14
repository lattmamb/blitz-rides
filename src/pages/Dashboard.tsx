
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import CurrentVehicle from '@/components/dashboard/CurrentVehicle';
import VehicleLocation from '@/components/dashboard/VehicleLocation';
import Reservations from '@/components/dashboard/Reservations';
import SubscriptionDetails from '@/components/dashboard/SubscriptionDetails';
import QuickActions from '@/components/dashboard/QuickActions';
import RecommendedVehicles from '@/components/dashboard/RecommendedVehicles';
import { vehicles } from '@/data/vehicles';

const Dashboard = () => {
  // This would be actual user data in a real application
  const activeVehicle = vehicles[0];
  const subscriptionProgress = 40; // 40% of current subscription period
  const remainingMiles = 750;
  const totalMiles = 1500;
  const remainingDays = 18;
  
  // Mock upcoming reservation
  const upcomingReservation = {
    id: 'res-123',
    vehicleId: 'model-y',
    vehicle: vehicles.find(v => v.id === 'model-y'),
    startDate: '2025-04-15T10:00:00',
    endDate: '2025-04-22T18:00:00',
    pickupLocation: 'San Francisco Downtown',
  };

  // Initial vehicle location (San Francisco for demo)
  const initialLocation = { lat: 37.7749, lng: -122.4194 };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-white/70">Welcome back! Manage your electric vehicle subscriptions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-8">
            <CurrentVehicle 
              activeVehicle={activeVehicle}
              remainingDays={remainingDays}
              subscriptionProgress={subscriptionProgress}
              remainingMiles={remainingMiles}
              totalMiles={totalMiles}
            />
            
            <VehicleLocation initialLocation={initialLocation} />
            
            <Reservations upcomingReservation={upcomingReservation} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <SubscriptionDetails />
            
            <QuickActions />
            
            <RecommendedVehicles vehicles={vehicles} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
