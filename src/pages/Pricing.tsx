
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { vehicles, subscriptionPlans } from '@/data/vehicles';
import { Check, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('all');
  
  // Filter vehicles based on selected type
  const filteredVehicles = selectedVehicleType === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.type === selectedVehicleType);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose the perfect subscription plan for your lifestyle with no hidden fees or long-term commitments.
          </p>
          
          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center mt-8 glass-effect p-1.5 rounded-full">
            <button
              className={`px-4 py-2 rounded-full transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-tesla-blue text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all ${
                billingCycle === 'yearly' 
                  ? 'bg-tesla-blue text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly <span className="text-xs text-tesla-green ml-1">Save 15%</span>
            </button>
          </div>
        </div>

        {/* Vehicle Type Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className={`px-4 py-2 rounded-full transition-all ${
                selectedVehicleType === 'all' 
                  ? 'bg-tesla-blue text-white' 
                  : 'glass-effect text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedVehicleType('all')}
            >
              All Vehicles
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all ${
                selectedVehicleType === 'sedan' 
                  ? 'bg-tesla-blue text-white' 
                  : 'glass-effect text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedVehicleType('sedan')}
            >
              Sedan
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all ${
                selectedVehicleType === 'suv' 
                  ? 'bg-tesla-blue text-white' 
                  : 'glass-effect text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedVehicleType('suv')}
            >
              SUV
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all ${
                selectedVehicleType === 'truck' 
                  ? 'bg-tesla-blue text-white' 
                  : 'glass-effect text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedVehicleType('truck')}
            >
              Truck
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all ${
                selectedVehicleType === 'sports' 
                  ? 'bg-tesla-blue text-white' 
                  : 'glass-effect text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedVehicleType('sports')}
            >
              Sports
            </button>
          </div>
        </div>
        
        {/* Subscription Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {subscriptionPlans.map(plan => (
            <div 
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
                <span className="text-4xl font-bold">${
                  billingCycle === 'yearly' 
                    ? Math.round(plan.price * 0.85) 
                    : plan.price
                }</span>
                <span className="text-white/70 text-sm">{plan.priceUnit}</span>
                {billingCycle === 'yearly' && (
                  <div className="text-tesla-green text-sm mt-1">
                    Save ${Math.round(plan.price * 0.15)}/mo with annual billing
                  </div>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
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
                className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white"
                onClick={() => navigate('/vehicles')}
              >
                Choose Vehicle
              </Button>
            </div>
          ))}
        </div>
        
        {/* Vehicle Pricing */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Vehicle Subscription Pricing</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-4 glass-effect">Model</th>
                  <th className="text-center p-4 glass-effect">Type</th>
                  <th className="text-center p-4 glass-effect">Monthly Price</th>
                  <th className="text-center p-4 glass-effect">Annual Price (Save 15%)</th>
                  <th className="text-center p-4 glass-effect">Availability</th>
                  <th className="text-center p-4 glass-effect">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle, index) => (
                  <tr key={vehicle.id} className={index % 2 === 1 ? 'glass-effect' : ''}>
                    <td className="p-4">
                      <div className="flex items-center">
                        <img src={vehicle.image} alt={vehicle.model} className="h-12 mr-3" />
                        <div>
                          <div className="font-medium">Tesla {vehicle.model}</div>
                          <div className="text-sm text-white/70">{vehicle.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs glass-effect">
                        {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium">
                      ${vehicle.price}{vehicle.priceUnit}
                    </td>
                    <td className="p-4 text-center">
                      ${Math.round(vehicle.price * 0.85)}{vehicle.priceUnit}
                      <div className="text-tesla-green text-xs">Save ${Math.round(vehicle.price * 0.15)}/mo</div>
                    </td>
                    <td className="p-4 text-center">
                      {vehicle.available ? (
                        <span className="inline-flex items-center text-tesla-green">
                          <Check className="h-4 w-4 mr-1" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-tesla-red">
                          <X className="h-4 w-4 mr-1" />
                          Coming Soon
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="outline"
                        className="border-tesla-blue/30 hover:bg-tesla-blue/20"
                        onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                        disabled={!vehicle.available}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
