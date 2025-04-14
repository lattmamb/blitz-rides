
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { vehicles, subscriptionPlans } from '@/data/vehicles';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import BookingForm, { BookingFormValues } from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import BookingBreadcrumbs from '@/components/booking/BookingBreadcrumbs';

const BookVehicle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1]?.id || '');
  const { theme } = useTheme();
  
  // Find the vehicle based on the model or ID
  const vehicle = vehicles.find(v => v.id === id || v.model.toLowerCase() === id?.toLowerCase());
  
  if (!vehicle) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 mt-14 md:mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Vehicle Not Found</h2>
          <p className="mb-8 text-white/70">The requested vehicle could not be found.</p>
          <Button 
            className="bg-tesla-blue hover:bg-tesla-blue/90 text-white"
            onClick={() => navigate('/vehicles')}
          >
            Browse Vehicles
          </Button>
        </div>
      </MainLayout>
    );
  }

  const onSubmit = async (values: BookingFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success toast
      toast({
        title: "Booking Successful!",
        description: `Your ${vehicle.model} has been booked! Check your email for confirmation details.`,
        variant: "default",
      });

      // Navigate to success page
      navigate('/booking-success', { 
        state: { 
          vehicle, 
          bookingDetails: values, 
          plan: subscriptionPlans.find(plan => plan.id === selectedPlan) 
        } 
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto px-4 py-16 mt-14 md:mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BookingBreadcrumbs vehicle={vehicle} />
        
        <motion.h1 
          className={cn(
            "text-4xl font-bold mb-6",
            theme === 'neoPulse' && "neo-pulse-text",
            theme === 'quantumGlass' && "quantum-glass-text",
            theme === 'orbitalDark' && "orbital-dark-text"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Book Your {vehicle.model}
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookingForm 
              onSubmit={onSubmit} 
              isLoading={isLoading} 
            />
          </motion.div>
          
          {/* Booking Summary */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BookingSummary 
              vehicle={vehicle}
              subscriptionPlans={subscriptionPlans}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default BookVehicle;
