
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar, CreditCard } from 'lucide-react';

const SubscriptionDetails: React.FC = () => {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Subscription Details</h2>
      
      <div className="space-y-4">
        <div className="glass-effect p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded-full bg-tesla-blue/20">
            <Car className="h-5 w-5 text-tesla-blue" />
          </div>
          <div>
            <div className="text-sm text-white/70">Current Plan</div>
            <div className="font-medium">Premium 6-Month</div>
          </div>
        </div>
        
        <div className="glass-effect p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded-full bg-tesla-blue/20">
            <Calendar className="h-5 w-5 text-tesla-blue" />
          </div>
          <div>
            <div className="text-sm text-white/70">Renewal Date</div>
            <div className="font-medium">May 21, 2025</div>
          </div>
        </div>
        
        <div className="glass-effect p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded-full bg-tesla-blue/20">
            <CreditCard className="h-5 w-5 text-tesla-blue" />
          </div>
          <div>
            <div className="text-sm text-white/70">Payment Method</div>
            <div className="font-medium">•••• •••• •••• 4242</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full glass-effect hover:bg-glass-highlight text-white">
          Manage Subscription
        </Button>
      </div>
    </Card>
  );
};

export default SubscriptionDetails;
