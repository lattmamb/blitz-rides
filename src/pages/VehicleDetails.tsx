
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { vehicles, subscriptionPlans } from '@/data/vehicles';
import VehicleDetailsHero from '@/components/vehicle-details/VehicleDetailsHero';
import SubscriptionPlans from '@/components/vehicle-details/SubscriptionPlans';
import VehicleDetailsTabs from '@/components/vehicle-details/VehicleDetailsTabs';
import RelatedVehicles from '@/components/vehicle-details/RelatedVehicles';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const vehicle = vehicles.find(v => v.id === id);
  
  const [selectedColor, setSelectedColor] = useState(vehicle?.colors[0] || '#FFFFFF');
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1]?.id || '');
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 text-tesla-blue animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-center">Loading vehicle details</h2>
          <p className="text-white/70 text-center">Preparing your experience...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!vehicle) {
    return (
      <MainLayout>
        <motion.div 
          className="container mx-auto px-4 py-16 mt-14 md:mt-20 text-center glass-card p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Vehicle Not Found</h2>
          <p className="mb-8 text-white/70">The requested vehicle could not be found.</p>
          <Link to="/vehicles">
            <Button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white">
              Browse Vehicles
            </Button>
          </Link>
        </motion.div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20 relative">
        {/* Back button with enhanced style */}
        <motion.div 
          className="absolute top-16 left-4 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="glass-card border-0" 
            onClick={() => navigate('/vehicles')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to vehicles
          </Button>
        </motion.div>
        
        {/* Breadcrumbs with enhanced style */}
        <motion.div 
          className="mb-12 mt-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-sm text-white/60 flex gap-2 items-center">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <Link to="/vehicles" className="hover:text-white transition-colors">Vehicles</Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{vehicle.model}</span>
          </div>
        </motion.div>
        
        {/* Main content with staggered animation */}
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {/* Hero Section */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <VehicleDetailsHero 
                vehicle={vehicle} 
                selectedColor={selectedColor} 
                setSelectedColor={setSelectedColor} 
              />
            </motion.div>
            
            {/* Separator line */}
            <motion.div 
              className="my-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            />
            
            {/* Subscription Plans */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <SubscriptionPlans 
                plans={subscriptionPlans}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                vehicleAvailable={vehicle.available}
              />
            </motion.div>
            
            {/* Separator line */}
            <motion.div 
              className="my-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            />
            
            {/* Additional Information */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <VehicleDetailsTabs vehicle={vehicle} />
            </motion.div>
            
            {/* Related Vehicles */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <RelatedVehicles currentVehicleId={vehicle.id} vehicles={vehicles} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default VehicleDetails;
