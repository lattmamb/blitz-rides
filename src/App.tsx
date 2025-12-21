import React, { Suspense, useEffect, useState, useCallback } from 'react';
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

// Minimal route change detection
const RouteChangeListener = ({ onRouteChange }: { onRouteChange: () => void }) => {
  const location = useLocation();
  
  useEffect(() => {
    onRouteChange();
  }, [location.pathname, onRouteChange]);
  
  return null;
};

// Minimal loading fallback
const MinimalLoader = () => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          style={{
            animation: `pulse 1s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`
          }}
        />
      ))}
    </div>
  </div>
);

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  
  useEffect(() => {
    // Reduced initial loading time - just ensure fonts/styles are ready
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRouteChange = useCallback(() => {
    // Minimal route change handling - no blocking UI
  }, []);

  if (initialLoading) {
    return <LoadingOverlay customMessage="BLITZ" minimalist />;
  }

  return (
    <ThemeProvider>
      <CrystalBackground variant="default" interactive={false}>
        <Router>
          <RouteChangeListener onRouteChange={handleRouteChange} />
          <AnimatePresence mode="wait">
            <PageTransition>
              <Suspense fallback={<MinimalLoader />}>
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
          </AnimatePresence>
          <Toaster />
        </Router>
      </CrystalBackground>
    </ThemeProvider>
  );
}

export default App;
