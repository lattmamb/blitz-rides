import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import MainLayout from '@/layouts/MainLayout';
import { vehicles } from '@/data/vehicles';
import VehicleCard3D from '@/components/vehicle-cards/VehicleCard3D';
import { SparklesCore } from '@/components/ui/sparkles';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import VehiclesHeader from '@/components/sections/VehiclesHeader';
import ViewToggle from '@/components/ui/ViewToggle';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import VehicleQuickView from '@/components/vehicle-cards/VehicleQuickView';
import { Vehicle } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { Loader2, ChevronRight, ChevronLeft } from 'lucide-react';

const Vehicles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'grid' | 'carousel'>('grid');
  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [exiting, setExiting] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFilter = (filters: any) => {
    let results = [...vehicles];
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(
        vehicle => vehicle.model.toLowerCase().includes(query) || 
                   vehicle.type.toLowerCase().includes(query)
      );
    }
    
    if (filters.vehicleType && filters.vehicleType !== 'all') {
      results = results.filter(vehicle => vehicle.type === filters.vehicleType);
    }
    
    setFilteredVehicles(results);
    
    if (results.length === 0) {
      toast({
        title: "No matches found",
        description: "Try adjusting your filters or search terms",
        variant: "destructive"
      });
    } else {
      toast({
        title: `${results.length} vehicles found`,
        description: `Showing ${results.length} of ${vehicles.length} vehicles`,
      });
    }
  };

  const handleCardClick = (vehicleId: string) => {
    setExiting(true);
    setTimeout(() => {
      navigate(`/vehicles/${vehicleId}`);
    }, 500);
  };

  const handleQuickView = (vehicle: Vehicle, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewVehicle(vehicle);
  };

  const closeQuickView = () => {
    setQuickViewVehicle(null);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeIndex < filteredVehicles.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    },
    trackMouse: true
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && activeIndex < filteredVehicles.length - 1) {
        setActiveIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, filteredVehicles.length]);

  return (
    <MainLayout>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key="vehicles-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16 relative"
          >
            <div 
              className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(10,132,255,0.15) 0%, transparent 70%)`
              }}
            >
              <SparklesCore
                id="tsparticles-vehicles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={70}
                className="w-full h-full"
                particleColor={theme === 'neoPulse' ? "#0A84FF" : 
                               theme === 'quantumGlass' ? "#FFFFFF" : "#F97316"}
                speed={0.2}
              />
            </div>
            
            <VehiclesHeader onFilter={handleFilter} />
            
            <div className="container mx-auto px-4 mb-8">
              <ViewToggle activeView={activeView} onChange={setActiveView} />
            </div>
            
            {activeView === 'grid' && (
              <motion.div 
                className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10, 
                      transition: { duration: 0.2 } 
                    }}
                    className="h-full"
                  >
                    <VehicleCard3D
                      vehicle={vehicle}
                      onClick={() => handleCardClick(vehicle.id)}
                      onQuickView={(e) => handleQuickView(vehicle, e)}
                      mousePosition={mousePosition}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {activeView === 'carousel' && (
              <div className="h-[70vh] relative" {...swipeHandlers}>
                <motion.div 
                  className="absolute top-1/2 left-4 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeIndex > 0 ? 1 : 0.3 }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    className="glass-card p-3 rounded-full"
                    onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
                    disabled={activeIndex === 0}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 right-4 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeIndex < filteredVehicles.length - 1 ? 1 : 0.3 }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    className="glass-card p-3 rounded-full"
                    onClick={() => activeIndex < filteredVehicles.length - 1 && setActiveIndex(activeIndex + 1)}
                    disabled={activeIndex === filteredVehicles.length - 1}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </motion.div>
                
                <div className="container mx-auto px-4 h-full flex items-center justify-center perspective">
                  <div className="carousel-container relative w-full h-full flex items-center justify-center">
                    {filteredVehicles.map((vehicle, index) => {
                      const position = index - activeIndex;
                      const isActive = position === 0;
                      const isVisible = Math.abs(position) <= 1;
                      
                      return (
                        <AnimatePresence key={vehicle.id}>
                          {isVisible && (
                            <motion.div
                              className={`absolute w-full max-w-2xl h-full flex items-center justify-center ${isActive ? 'z-10' : 'z-0'}`}
                              initial={{ 
                                opacity: 0,
                                x: position > 0 ? 300 : -300,
                                rotateY: position > 0 ? 45 : -45,
                                scale: 0.8,
                              }}
                              animate={{ 
                                opacity: isActive ? 1 : 0.7,
                                x: position * 300,
                                rotateY: position * 30,
                                scale: isActive ? 1 : 0.8,
                                zIndex: isActive ? 10 : 5 - Math.abs(position)
                              }}
                              exit={{ 
                                opacity: 0,
                                x: position > 0 ? 300 : -300,
                                rotateY: position > 0 ? 45 : -45,
                                scale: 0.8,
                              }}
                              transition={{ duration: 0.5 }}
                              onClick={() => isActive && handleCardClick(vehicle.id)}
                              style={{ 
                                cursor: isActive ? 'pointer' : 'default',
                                filter: isActive ? 'none' : 'blur(1px)',
                              }}
                            >
                              <VehicleCard3D 
                                vehicle={vehicle} 
                                isActive={isActive}
                                onClick={() => handleCardClick(vehicle.id)}
                                onQuickView={(e) => handleQuickView(vehicle, e)}
                                mousePosition={mousePosition}
                                carouselView
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      );
                    })}
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                  {filteredVehicles.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === activeIndex 
                          ? 'w-8 bg-tesla-blue' 
                          : 'w-2 bg-white/30'
                      }`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <AnimatePresence>
              {quickViewVehicle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                  onClick={closeQuickView}
                >
                  <motion.div 
                    className="w-full max-w-4xl"
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <VehicleQuickView 
                      vehicle={quickViewVehicle} 
                      onClose={closeQuickView}
                      onViewDetails={() => {
                        closeQuickView();
                        handleCardClick(quickViewVehicle.id);
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </MainLayout>
  );
};

export default Vehicles;
