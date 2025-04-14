
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Index from '@/pages/Index';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import PageTransition from '@/components/ui/PageTransition';
import IntelligentLoading from '@/components/ui/IntelligentLoading';
import { AnimatePresence } from 'framer-motion';

// Import animation styles
import '@/styles/animationUtils.css';

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
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <IntelligentLoading customMessage="Launching BLITZ" />;
  }

  return (
    <Router>
      <ThemeProvider>
        <RouteChangeListener setIsChangingRoute={setIsChangingRoute} />
        <AnimatePresence mode="wait">
          <PageTransition>
            <Suspense fallback={<IntelligentLoading customMessage="Loading Experience" />}>
              {isChangingRoute ? (
                <IntelligentLoading minimalist customMessage="Changing route..." />
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
