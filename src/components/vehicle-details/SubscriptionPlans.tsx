
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '@/types';

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
  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    if (vehicleAvailable) {
      // Scroll to top of page to make "Book This" button visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <Card 
            key={plan.id}
            className={`glass-card p-6 relative overflow-hidden ${
              plan.recommended ? 'border-2 border-tesla-blue' : ''
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-tesla-blue text-white text-xs px-3 py-1">
                RECOMMENDED
              </div>
            )}
            
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <div className="text-white/70 text-sm mb-4">{plan.duration}</div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-white/70 text-sm">{plan.priceUnit}</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="p-1 rounded-full bg-tesla-blue/20 text-tesla-blue">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              onClick={() => handlePlanSelection(plan.id)}
              className={
                selectedPlan === plan.id
                  ? "w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white"
                  : "w-full bg-glass hover:bg-glass-highlight text-white"
              }
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
