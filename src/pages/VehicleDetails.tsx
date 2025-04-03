
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { vehicles, subscriptionPlans } from '@/data/vehicles';
import { Battery, Zap, Gauge, Calendar, Check, MapPin } from 'lucide-react';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const vehicle = vehicles.find(v => v.id === id);
  
  const [selectedColor, setSelectedColor] = useState(vehicle?.colors[0] || '#FFFFFF');
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1]?.id || '');
  
  if (!vehicle) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 mt-14 md:mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Vehicle Not Found</h2>
          <p className="mb-8 text-white/70">The requested vehicle could not be found.</p>
          <Link to="/vehicles">
            <Button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white">
              Browse Vehicles
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="text-sm text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/vehicles" className="hover:text-white">Vehicles</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{vehicle.model}</span>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="lg:order-2">
            <div className="glass-card p-8 rounded-2xl relative h-80 md:h-96 lg:h-[400px] flex items-center justify-center">
              <div className="absolute top-4 right-4 z-10">
                {vehicle.available ? (
                  <div className="bg-tesla-green text-white text-xs font-medium px-3 py-1 rounded-full">
                    Available Now
                  </div>
                ) : (
                  <div className="bg-tesla-red/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
              </div>
              <img
                src={vehicle.image}
                alt={vehicle.model}
                className="max-h-full object-contain"
              />
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Select Color</h3>
              <div className="flex gap-3">
                {vehicle.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-tesla-blue scale-110' 
                        : 'border-glass-border hover:scale-105'
                    }`}
                    style={{ background: color }}
                    title={`${color === '#FFFFFF' ? 'White' : color === '#000000' ? 'Black' : color === '#C0C0C0' ? 'Silver' : color === '#FF0000' ? 'Red' : color === '#0000FF' ? 'Blue' : 'Custom'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:order-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
              Tesla {vehicle.model}
            </h1>
            
            <p className="text-xl text-white/80 mb-6">{vehicle.tagline}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-4 text-center">
                <Battery className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
                <div className="text-sm text-white/70">Range</div>
                <div className="font-bold text-lg">{vehicle.performance.range} mi</div>
              </div>
              
              <div className="glass-card p-4 text-center">
                <Gauge className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
                <div className="text-sm text-white/70">Top Speed</div>
                <div className="font-bold text-lg">{vehicle.performance.topSpeed} mph</div>
              </div>
              
              <div className="glass-card p-4 text-center">
                <Zap className="mx-auto h-6 w-6 text-tesla-blue mb-2" />
                <div className="text-sm text-white/70">0-60 mph</div>
                <div className="font-bold text-lg">{vehicle.performance.acceleration}s</div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Key Features</h3>
              <ul className="space-y-3">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-tesla-blue/20 text-tesla-blue">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-white/70">Starting at</div>
                  <div className="text-3xl font-bold">
                    ${vehicle.price}<span className="text-white/70 text-sm font-normal">{vehicle.priceUnit}</span>
                  </div>
                </div>
                <div className="text-sm text-white/70">
                  * Terms & conditions apply
                </div>
              </div>
              
              <Button className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white">
                Rent This {vehicle.model}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subscription Plans */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Subscription Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map(plan => (
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
                  onClick={() => setSelectedPlan(plan.id)}
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
        
        {/* Additional Information */}
        <div className="mb-12">
          <Tabs defaultValue="specifications">
            <TabsList className="glass-effect w-full mb-6">
              <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
              <TabsTrigger value="availability" className="flex-1">Availability</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications">
              <div className="glass-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Performance & Specs</h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Model</span>
                        <span className="font-medium">Tesla {vehicle.model}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Range</span>
                        <span className="font-medium">{vehicle.performance.range} miles</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Top Speed</span>
                        <span className="font-medium">{vehicle.performance.topSpeed} mph</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">0-60 mph</span>
                        <span className="font-medium">{vehicle.performance.acceleration} seconds</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Charging</span>
                        <span className="font-medium">250 kW Supercharger</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Interior & Comfort</h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Seating</span>
                        <span className="font-medium">{vehicle.model === "Model X" ? "Up to 7" : "5 Adults"}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Display</span>
                        <span className="font-medium">15" Touchscreen</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Sound System</span>
                        <span className="font-medium">Premium Audio</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Autopilot</span>
                        <span className="font-medium">Included</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-white/70">Over-the-air Updates</span>
                        <span className="font-medium">Yes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="availability">
              <div className="glass-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Pickup Locations</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <MapPin className="h-5 w-5 text-tesla-blue flex-shrink-0" />
                        <div>
                          <div className="font-medium">Downtown San Francisco</div>
                          <div className="text-sm text-white/70">123 Market St, San Francisco, CA 94105</div>
                          <div className="text-xs text-tesla-green mt-1">Available Now</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <MapPin className="h-5 w-5 text-tesla-blue flex-shrink-0" />
                        <div>
                          <div className="font-medium">Palo Alto</div>
                          <div className="text-sm text-white/70">456 University Ave, Palo Alto, CA 94301</div>
                          <div className="text-xs text-tesla-green mt-1">Available Now</div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <MapPin className="h-5 w-5 text-tesla-blue flex-shrink-0" />
                        <div>
                          <div className="font-medium">San Jose</div>
                          <div className="text-sm text-white/70">789 Santana Row, San Jose, CA 95128</div>
                          <div className="text-xs text-white/70 mt-1">Available April 15</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Availability Calendar</h3>
                    <div className="glass-effect p-4 rounded-lg text-center">
                      <Calendar className="h-8 w-8 mx-auto mb-3 text-tesla-blue" />
                      <p className="text-white/70 mb-4">
                        Check real-time availability and reserve your preferred dates.
                      </p>
                      <Button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white">
                        Check Availability
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="glass-card p-6 text-center">
                <div className="py-8">
                  <h3 className="text-lg font-bold mb-3">Customer Reviews</h3>
                  <div className="flex justify-center items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill={i < 4 ? "#0A84FF" : "none"} 
                        stroke="#0A84FF" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                    <span className="ml-2 font-medium">4.8/5</span>
                  </div>
                  <p className="text-white/70 mb-6">
                    Based on 128 verified customer reviews
                  </p>
                  
                  <div className="max-w-xl mx-auto">
                    <Button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white">
                      View All Reviews
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Vehicles */}
        <div>
          <h2 className="text-3xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles
              .filter(v => v.id !== vehicle.id)
              .slice(0, 3)
              .map(relatedVehicle => (
                <Link key={relatedVehicle.id} to={`/vehicles/${relatedVehicle.id}`}>
                  <div className="glass-card p-4 hover:border-tesla-blue/30 transition-all group">
                    <div className="relative h-36 flex items-center justify-center mb-4">
                      <img
                        src={relatedVehicle.image}
                        alt={relatedVehicle.model}
                        className="h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-bold">{relatedVehicle.model}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">${relatedVehicle.price}</span>
                        <span className="text-white/70 text-sm">{relatedVehicle.priceUnit}</span>
                      </div>
                      <div className="text-sm text-tesla-blue">View Details</div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehicleDetails;
