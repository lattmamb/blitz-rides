
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { SubscriptionPlan, Vehicle } from '@/types';

interface BookingSummaryProps {
  vehicle: Vehicle;
  subscriptionPlans: SubscriptionPlan[];
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  vehicle,
  subscriptionPlans,
  selectedPlan,
  setSelectedPlan
}) => {
  const { theme } = useTheme();
  const selectedPlanDetails = subscriptionPlans.find(plan => plan.id === selectedPlan);

  return (
    <div className={cn(
      "p-6 sticky top-24 border-none",
      theme === 'neoPulse' && "neo-card",
      theme === 'quantumGlass' && "glass-card",
      theme === 'orbitalDark' && "glass-blue"
    )}>
      <h2 className={cn(
        "text-xl font-semibold mb-4",
        theme === 'neoPulse' && "neo-pulse-text",
        theme === 'quantumGlass' && "quantum-glass-text",
        theme === 'orbitalDark' && "orbital-dark-text"
      )}>
        Booking Summary
      </h2>
      
      <VehicleInfo vehicle={vehicle} />
      
      <SubscriptionOptions 
        subscriptionPlans={subscriptionPlans} 
        selectedPlan={selectedPlan} 
        setSelectedPlan={setSelectedPlan} 
        theme={theme} 
      />
      
      <PriceSummary selectedPlanDetails={selectedPlanDetails} theme={theme} />
      
      <SecurityNote theme={theme} />
    </div>
  );
};

export default BookingSummary;

const VehicleInfo = ({ vehicle }) => (
  <div className="flex items-center mb-6">
    <div className="flex-shrink-0 w-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-tesla-blue/20 to-tesla-purple/20 rounded-full filter blur-xl opacity-80"></div>
      <img 
        src={vehicle.image} 
        alt={vehicle.model} 
        className="w-full relative z-10"
      />
    </div>
    <div className="ml-4">
      <h3 className="font-medium text-gradient-blue-text">Tesla {vehicle.model}</h3>
      <p className="text-sm text-white/70">{vehicle.tagline}</p>
    </div>
  </div>
);

const SubscriptionOptions = ({ subscriptionPlans, selectedPlan, setSelectedPlan, theme }) => (
  <div className="space-y-4 mb-6">
    {subscriptionPlans.map(plan => (
      <motion.div
        key={plan.id}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "p-4 rounded-md cursor-pointer transition-all",
          selectedPlan === plan.id ? 'border-tesla-blue/50 bg-tesla-blue/10' : 'border-glass-border hover:border-white/20',
          theme === 'neoPulse' && "glass-effect",
          theme === 'quantumGlass' && "glass-premium",
          theme === 'orbitalDark' && "glass-effect"
        )}
        onClick={() => setSelectedPlan(plan.id)}
      >
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium">{plan.name}</h4>
            <p className="text-sm text-white/70">{plan.duration}</p>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-lg mr-1">${plan.price}</span>
            <span className="text-xs text-white/70">{plan.priceUnit}</span>
            {selectedPlan === plan.id && (
              <div className="ml-2 text-tesla-blue/90 h-5 w-5 rounded-full bg-tesla-blue/20 flex items-center justify-center">
                <Check className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const PriceSummary = ({ selectedPlanDetails, theme }) => (
  <>
    <Separator className="border-white/10 my-6" />
    
    <div className="space-y-3 mb-6">
      <div className="flex justify-between">
        <span className="text-white/70">Subscription</span>
        <span className="font-medium">
          ${selectedPlanDetails?.price || 0}{selectedPlanDetails?.priceUnit}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/70">Delivery Fee</span>
        <span className="font-medium">$0.00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/70">Taxes & Fees</span>
        <span className="font-medium">${((selectedPlanDetails?.price || 0) * 0.085).toFixed(2)}</span>
      </div>
      <Separator className="border-white/10 my-2" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span className={cn(
          theme === 'neoPulse' && "neo-pulse-text",
          theme === 'quantumGlass' && "quantum-glass-text",
          theme === 'orbitalDark' && "orbital-dark-text"
        )}>
          ${((selectedPlanDetails?.price || 0) + (selectedPlanDetails?.price || 0) * 0.085).toFixed(2)}{selectedPlanDetails?.priceUnit}
        </span>
      </div>
    </div>
  </>
);

const SecurityNote = ({ theme }) => (
  <div className={cn(
    "rounded-md p-4 text-white/70 text-sm",
    theme === 'neoPulse' && "glass-effect",
    theme === 'quantumGlass' && "glass-premium",
    theme === 'orbitalDark' && "glass-blue"
  )}>
    <div className="flex items-start">
      <CreditCard className="h-5 w-5 mr-2 text-tesla-blue mt-0.5" />
      <span>
        You won't be charged until your subscription is confirmed. Cancellation is available 
        up to 24 hours before your delivery date.
      </span>
    </div>
  </div>
);
