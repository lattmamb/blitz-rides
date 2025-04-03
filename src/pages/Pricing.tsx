
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SubscriptionPlan } from '@/types';
import ExpandableSubscriptionPlans from '@/components/ui/expandable-subscription-plans';

const pricingPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 299,
    priceUnit: '/month',
    duration: '1 Month',
    description: 'Perfect for short-term needs',
    features: [
      'Access to standard vehicles',
      'Up to 1,000 miles per month',
      'Basic insurance coverage',
      'Roadside assistance',
      '24/7 customer support',
      'Free cancellation with 7-day notice'
    ],
    recommended: false
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: 499,
    priceUnit: '/month',
    duration: '3 Months',
    description: 'Our most popular option',
    features: [
      'Access to premium vehicles',
      'Up to 1,500 miles per month',
      'Full insurance coverage',
      'Priority roadside assistance',
      '24/7 dedicated customer support',
      'Vehicle swap once per month',
      'Free cancellation with 30-day notice',
      'Access to charging stations network'
    ],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 899,
    priceUnit: '/month',
    duration: '6 Months',
    description: 'For the ultimate experience',
    features: [
      'Access to luxury and performance vehicles',
      'Unlimited mileage',
      'Premium insurance coverage',
      'Immediate roadside assistance',
      'Personal concierge service',
      'Vehicle swap twice per month',
      'Free cancellation with 60-day notice',
      'Complimentary charging at all stations',
      'Airport pickup and delivery',
      'One free detailing service per month'
    ],
    recommended: false
  }
];

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState('standard');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">Subscription Plans</h1>
          <p className="text-white/70 text-lg mb-10 text-center max-w-3xl mx-auto">
            Choose the perfect subscription plan for your lifestyle. Enjoy the freedom of electric mobility without the commitment of ownership.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Label htmlFor="billing-toggle" className={`text-lg ${!isAnnual ? 'text-white' : 'text-white/70'}`}>Monthly</Label>
            <Switch 
              id="billing-toggle" 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual} 
              className="data-[state=checked]:bg-tesla-blue" 
            />
            <Label htmlFor="billing-toggle" className={`text-lg ${isAnnual ? 'text-white' : 'text-white/70'}`}>
              Annual <span className="text-tesla-blue text-sm ml-1">Save 20%</span>
            </Label>
          </div>
          
          <ExpandableSubscriptionPlans 
            plans={pricingPlans.map(plan => ({
              ...plan,
              price: isAnnual ? Math.round(plan.price * 0.8) : plan.price,
              priceUnit: isAnnual ? '/month, billed annually' : '/month'
            }))} 
            selectedPlan={selectedPlan} 
            setSelectedPlan={setSelectedPlan} 
            vehicleAvailable={true}
          />

          <div className="mt-16 glass-card p-6">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Separator className="mb-6 bg-white/10" />
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">What's included in my subscription?</h4>
                <p className="text-white/70">All subscriptions include the vehicle, insurance, maintenance, and roadside assistance. Higher tier plans include additional premium features and services.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Can I change my plan later?</h4>
                <p className="text-white/70">Yes, you can upgrade or downgrade your subscription plan at any time. Changes will take effect on your next billing cycle.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Is there a minimum commitment period?</h4>
                <p className="text-white/70">The minimum commitment depends on the plan you choose. Basic plans start at 1 month, while Premium plans require a 6-month commitment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
