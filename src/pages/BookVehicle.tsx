
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { vehicles, subscriptionPlans } from '@/data/vehicles';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, CreditCard, Check, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const bookingSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  startDate: z.date({
    required_error: "Please select a start date.",
  }),
  endDate: z.date({
    required_error: "Please select an end date.",
  }).optional(),
  address: z.string().min(5, { message: "Please enter your full address." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(5, { message: "Please enter a valid zip code." }),
});

const BookVehicle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1]?.id || '');
  
  // Find the vehicle based on the model or ID
  const vehicle = vehicles.find(v => v.id === id || v.model.toLowerCase() === id?.toLowerCase());
  
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

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

  const selectedPlanDetails = subscriptionPlans.find(plan => plan.id === selectedPlan);

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
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
          plan: selectedPlanDetails 
        } 
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="text-sm text-white/60">
            <Button 
              variant="link" 
              className="p-0 text-white/60 hover:text-white"
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <span className="mx-2">/</span>
            <Button 
              variant="link" 
              className="p-0 text-white/60 hover:text-white"
              onClick={() => navigate('/vehicles')}
            >
              Vehicles
            </Button>
            <span className="mx-2">/</span>
            <Button 
              variant="link" 
              className="p-0 text-white/60 hover:text-white"
              onClick={() => navigate(`/vehicles/${vehicle.id}`)}
            >
              {vehicle.model}
            </Button>
            <span className="mx-2">/</span>
            <span className="text-white">Book</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 gradient-text">Book Your {vehicle.model}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Separator className="border-white/10" />
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Booking Details</h2>
                    
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={
                                    "w-full pl-3 text-left font-normal border-glass-border bg-glass hover:bg-glass-highlight"
                                  }
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span className="text-white/60">Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 glass-effect" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When would you like to start your subscription?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="border-white/10" />
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Delivery Address</h2>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="San Francisco" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="94105" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Complete Booking"
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-24">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.model} 
                    className="w-full"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Tesla {vehicle.model}</h3>
                  <p className="text-sm text-white/70">{vehicle.tagline}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {subscriptionPlans.map(plan => (
                  <div 
                    key={plan.id} 
                    className={`glass-effect p-4 rounded-md border cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'border-tesla-blue bg-glass-highlight' 
                        : 'border-glass-border hover:border-white/20'
                    }`}
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
                          <Check className="ml-2 text-tesla-blue h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
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
                  <span>
                    ${((selectedPlanDetails?.price || 0) + (selectedPlanDetails?.price || 0) * 0.085).toFixed(2)}{selectedPlanDetails?.priceUnit}
                  </span>
                </div>
              </div>
              
              <div className="glass-effect rounded-md p-4 text-white/70 text-sm">
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 mr-2 text-tesla-blue mt-0.5" />
                  <span>
                    You won't be charged until your subscription is confirmed. Cancellation is available 
                    up to 24 hours before your delivery date.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookVehicle;
