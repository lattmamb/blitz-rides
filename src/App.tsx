
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Index from '@/pages/Index';
import { Toaster } from '@/components/ui/sonner';
import PageTransition from '@/components/ui/PageTransition';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { CrystalBackground } from '@/components/ui/crystal-ui';

// Import animation styles
import '@/styles/animationUtils.css';
import '@/styles/crystalAnimations.css';

// Lazy-loaded routes for better initial loading performance
const LazyDashboard = React.lazy(() => import('@/pages/Dashboard'));
const LazyVehicles = React.lazy(() => import('@/pages/Vehicles'));
const LazyVehicleDetails = React.lazy(() => import('@/pages/VehicleDetails'));
const LazyBookVehicle = React.lazy(() => import('@/pages/BookVehicle'));
const LazyBookingSuccess = React.lazy(() => import('@/pages/BookingSuccess'));

// Route change detection component
const RouteChangeListener = ({ setIsChangingRoute }) => {
  const location = useLocation();
  
  useEffect(() => {
    setIsChangingRoute(true);
    const timer = setTimeout(() => setIsChangingRoute(false), 100);
    return () => clearTimeout(timer);
  }, [location.pathname, setIsChangingRoute]);
  
  return null;
};

function App() {
  // Add a very brief initial loading state to ensure animations are ready
  const [initialLoading, setInitialLoading] = useState(true);
  const [isChangingRoute, setIsChangingRoute] = useState(false);
  
  useEffect(() => {
    // Brief timeout to ensure CSS animations are loaded
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <LoadingOverlay customMessage="Initializing Crystal BLITZ" />;
  }

  return (
    <ThemeProvider>
      <CrystalBackground variant="default" interactive={true}>
        <Router>
          <RouteChangeListener setIsChangingRoute={setIsChangingRoute} />
          <AnimatePresence mode="wait">
            <PageTransition>
              <Suspense fallback={<LoadingOverlay customMessage="Loading Experience" />}>
                {isChangingRoute ? (
                  <LoadingOverlay minimalist customMessage="Changing route..." />
                ) : (
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<LazyDashboard />} />
                    <Route path="/vehicles" element={<LazyVehicles />} />
                    <Route path="/vehicles/:id" element={<LazyVehicleDetails />} />
                    <Route path="/book/:id" element={<LazyBookVehicle />} />
                    <Route path="/booking-success" element={<LazyBookingSuccess />} />
                  </Routes>
                )}
              </Suspense>
            </PageTransition>
          </AnimatePresence>
          <Toaster />
        </Router>
      </CrystalBackground>
    </ThemeProvider>
  );
}

export default App;
