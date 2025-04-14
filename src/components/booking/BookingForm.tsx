
import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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

export type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onSubmit: (values: BookingFormValues) => void;
  isLoading: boolean;
  defaultValues?: Partial<BookingFormValues>;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, isLoading, defaultValues = {} }) => {
  const { theme } = useTheme();
  
  const form = useForm<BookingFormValues>({
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
      ...defaultValues
    },
  });

  return (
    <Card className={cn(
      "p-6 border-none",
      theme === 'neoPulse' && "neo-card",
      theme === 'quantumGlass' && "glass-card",
      theme === 'orbitalDark' && "glass-blue"
    )}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInformationSection form={form} theme={theme} />
          
          <Separator className="border-white/10" />
          
          <BookingDetailsSection form={form} theme={theme} />
          
          <Separator className="border-white/10" />
          
          <DeliveryAddressSection form={form} theme={theme} />
          
          <Button 
            type="submit" 
            className={cn(
              "w-full text-white",
              theme === 'neoPulse' && "bg-gradient-to-r from-tesla-blue to-tesla-purple hover:bg-tesla-blue/90",
              theme === 'quantumGlass' && "glx-glass border-tesla-blue/30 hover:border-tesla-blue/60",
              theme === 'orbitalDark' && "bg-gradient-to-r from-tesla-purple to-tesla-blue hover:bg-tesla-purple/90"
            )}
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
  );
};

export default BookingForm;

const PersonalInformationSection = ({ form, theme }) => (
  <div className="space-y-4">
    <h2 className={cn(
      "text-xl font-semibold",
      theme === 'neoPulse' && "neo-pulse-text",
      theme === 'quantumGlass' && "quantum-glass-text",
      theme === 'orbitalDark' && "orbital-dark-text"
    )}>
      Personal Information
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} className="tesla-input" />
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
              <Input placeholder="Doe" {...field} className="tesla-input" />
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
              <Input placeholder="john.doe@example.com" {...field} className="tesla-input" />
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
              <Input placeholder="(555) 123-4567" {...field} className="tesla-input" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);

const BookingDetailsSection = ({ form, theme }) => (
  <div className="space-y-4">
    <h2 className={cn(
      "text-xl font-semibold",
      theme === 'neoPulse' && "neo-pulse-text",
      theme === 'quantumGlass' && "quantum-glass-text",
      theme === 'orbitalDark' && "orbital-dark-text"
    )}>
      Booking Details
    </h2>
    
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
                  variant="outline"
                  className="w-full pl-3 text-left font-normal border-glass-border bg-glass hover:bg-glass-highlight"
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
            <PopoverContent className="w-auto p-0 glass-effect border-none pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))
                }
                initialFocus
                className="p-3 pointer-events-auto"
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
);

const DeliveryAddressSection = ({ form, theme }) => (
  <div className="space-y-4">
    <h2 className={cn(
      "text-xl font-semibold",
      theme === 'neoPulse' && "neo-pulse-text",
      theme === 'quantumGlass' && "quantum-glass-text",
      theme === 'orbitalDark' && "orbital-dark-text"
    )}>
      Delivery Address
    </h2>
    
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Street Address</FormLabel>
          <FormControl>
            <Input placeholder="123 Main St" {...field} className="tesla-input" />
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
              <Input placeholder="San Francisco" {...field} className="tesla-input" />
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
              <Input placeholder="CA" {...field} className="tesla-input" />
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
              <Input placeholder="94105" {...field} className="tesla-input" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);

import { Card } from '@/components/ui/card';
