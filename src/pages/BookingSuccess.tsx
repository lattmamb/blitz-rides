
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Check, Calendar, MapPin, Car, ArrowRight } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicle, bookingDetails, plan } = location.state || {};

  // If no booking data is found, redirect to homepage
  if (!vehicle || !bookingDetails) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 mt-14 md:mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Booking Information Not Found</h2>
          <p className="mb-8 text-white/70">We couldn't find your booking information.</p>
          <Button 
            className="bg-tesla-blue hover:bg-tesla-blue/90 text-white"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Format booking date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="glass-card p-8 text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-tesla-green/20 text-tesla-green mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Booking Confirmed!</h1>
            <p className="text-lg text-white/70">
              Your Tesla {vehicle.model} subscription has been successfully booked.
            </p>
          </div>
          
          {/* Booking Details */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
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
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-tesla-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Delivery Date</h4>
                      <p className="text-white/70">
                        {bookingDetails.startDate ? formatDate(bookingDetails.startDate) : 'Not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-tesla-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Delivery Address</h4>
                      <p className="text-white/70">
                        {bookingDetails.address}, {bookingDetails.city}, {bookingDetails.state} {bookingDetails.zipCode}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-tesla-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Subscription Plan</h4>
                      <p className="text-white/70">
                        {plan?.name} - ${plan?.price}{plan?.priceUnit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">Next Steps</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-tesla-blue/20 text-tesla-blue flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Check your email</p>
                      <p className="text-sm text-white/70">
                        We've sent a confirmation to {bookingDetails.email} with all the details of your booking.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-tesla-blue/20 text-tesla-blue flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Prepare for delivery</p>
                      <p className="text-sm text-white/70">
                        One of our representatives will contact you to confirm delivery details and answer any questions.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-tesla-blue/20 text-tesla-blue flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Welcome aboard!</p>
                      <p className="text-sm text-white/70">
                        Enjoy your new Tesla {vehicle.model} subscription. You'll receive a walkthrough on delivery day.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="border-tesla-blue/30 hover:bg-tesla-blue/20"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button 
              className="bg-tesla-blue hover:bg-tesla-blue/90 text-white"
              onClick={() => navigate('/')}
            >
              Back to Home <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingSuccess;
