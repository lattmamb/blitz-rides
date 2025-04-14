
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import VehicleDetails from "./pages/VehicleDetails";
import VehiclesList from "./pages/VehiclesList";
import BookVehicle from "./pages/BookVehicle";
import BookingSuccess from "./pages/BookingSuccess";
import Pricing from "./pages/Pricing";
import Locations from "./pages/Locations";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import GalaxyBackground from "./components/ui/galaxy-background";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // GLX-inspired loading animation
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        <GalaxyBackground starDensity={50} speed={0.3} className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center"
          >
            <motion.div 
              className="w-24 h-24 relative"
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
              <div className="absolute top-0 bottom-0 left-0 right-0">
                <div className="w-full h-full border-t-2 border-tesla-blue rounded-full"></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-40 h-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tesla-blue/5 blur-3xl animate-pulse-glow"
            />
            
            <motion.h1 
              className="text-white text-3xl mt-8 font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              UNITY FLEET GLX
            </motion.h1>
            
            <motion.div
              className="bg-white/10 h-[2px] w-0 mt-4 rounded overflow-hidden"
              animate={{ width: 200 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-tesla-blue via-tesla-purple to-tesla-blue"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </motion.div>
            
            <motion.p
              className="text-white/60 mt-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Experience the galaxy of mobility
            </motion.p>
          </motion.div>
        </GalaxyBackground>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vehicles" element={<VehiclesList />} />
                <Route path="/vehicles/:id" element={<VehicleDetails />} />
                <Route path="/book/:id" element={<BookVehicle />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/about" element={<About />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </motion.div>
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
