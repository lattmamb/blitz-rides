
import React from 'react';
import { SubscriptionPlan } from '@/types';
import ExpandableSubscriptionPlans from '@/components/ui/expandable-subscription-plans';

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
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Subscription Plans</h2>
      <ExpandableSubscriptionPlans 
        plans={plans}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        vehicleAvailable={vehicleAvailable}
      />
    </div>
  );
};

export default SubscriptionPlans;
