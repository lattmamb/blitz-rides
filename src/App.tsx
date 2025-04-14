
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Vehicles from '@/pages/Vehicles';
import VehicleDetails from '@/pages/VehicleDetails';
import BookVehicle from '@/pages/BookVehicle';
import BookingSuccess from '@/pages/BookingSuccess';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import PageTransition from '@/components/ui/PageTransition';

// Import animation styles
import '@/styles/animationUtils.css';

// Lazy-loaded routes for better initial loading performance
const LazyDashboard = React.lazy(() => import('@/pages/Dashboard'));
const LazyVehicles = React.lazy(() => import('@/pages/Vehicles'));
const LazyVehicleDetails = React.lazy(() => import('@/pages/VehicleDetails'));
const LazyBookVehicle = React.lazy(() => import('@/pages/BookVehicle'));
const LazyBookingSuccess = React.lazy(() => import('@/pages/BookingSuccess'));

function App() {
  // Add a very brief initial loading state to ensure animations are ready
  const [initialLoading, setInitialLoading] = useState(true);
  
  useEffect(() => {
    // Brief timeout to ensure CSS animations are loaded
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <LoadingOverlay minimalist customMessage="Starting BLITZ" />;
  }

  return (
    <Router>
      <ThemeProvider>
        <PageTransition>
          <Suspense fallback={<LoadingOverlay />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<LazyDashboard />} />
              <Route path="/vehicles" element={<LazyVehicles />} />
              <Route path="/vehicles/:id" element={<LazyVehicleDetails />} />
              <Route path="/book/:id" element={<LazyBookVehicle />} />
              <Route path="/booking-success" element={<LazyBookingSuccess />} />
            </Routes>
          </Suspense>
        </PageTransition>
        <Toaster />
      </ThemeProvider>
    </Router>
  );
}

export default App;
