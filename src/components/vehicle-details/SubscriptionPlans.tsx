
import React from 'react';
import { SubscriptionPlan } from '@/types';
import ExpandableSubscriptionPlans from '@/components/ui/expandable-subscription-plans';
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
  vehicleAvailable: boolean;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  plans,
  selectedPlan,
  setSelectedPlan,
  vehicleAvailable
}) => {
  const { toast } = useToast();
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    
    if (!vehicleAvailable) {
      toast({
        title: "Vehicle Unavailable",
        description: "This vehicle is currently unavailable for the selected dates.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Subscription Plans</h2>
      <ExpandableSubscriptionPlans 
        plans={plans}
        selectedPlan={selectedPlan}
        setSelectedPlan={handlePlanSelect}
        vehicleAvailable={vehicleAvailable}
      />
    </div>
  );
};

export default SubscriptionPlans;
