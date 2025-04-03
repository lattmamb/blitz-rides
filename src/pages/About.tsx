
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Award, Users, Shield, Leaf, Gauge, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About CarFleet</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Redefining vehicle ownership through innovative subscription services and sustainable transportation solutions.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-white/80 mb-4">
              Founded in 2023, CarFleet emerged from a simple vision: to transform the way people 
              access and experience electric vehicles. We recognized that traditional ownership and 
              leasing models weren't aligned with the rapidly evolving EV market and consumer needs.
            </p>
            <p className="text-lg text-white/80 mb-6">
              Our team of automotive enthusiasts, tech innovators, and sustainability advocates came 
              together to create a flexible subscription service that puts customers in control of their 
              mobility choices while accelerating the transition to sustainable transportation.
            </p>
            <Button 
              className="bg-tesla-blue hover:bg-tesla-blue/90 text-white"
              onClick={() => navigate('/vehicles')}
            >
              Explore Our Fleet
            </Button>
          </div>
          <div className="glass-card p-0 overflow-hidden h-[400px] flex items-center justify-center">
            {/* Placeholder for company image */}
            <div className="text-center p-8">
              <div className="text-8xl font-bold gradient-text mb-4">CarFleet</div>
              <p className="text-white/70">Electric vehicle subscription service</p>
            </div>
          </div>
        </div>
        
        {/* Our Mission */}
        <div className="glass-card p-8 md:p-12 mb-24 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto">
            "To accelerate the world's transition to sustainable transportation by making electric 
            vehicles accessible to everyone through flexible, hassle-free subscription services."
          </p>
        </div>
        
        {/* Core Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center">
              <div className="rounded-full bg-tesla-blue/20 p-4 inline-flex mb-6">
                <Leaf className="h-8 w-8 text-tesla-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-white/70">
                We're committed to reducing carbon emissions and promoting eco-friendly 
                transportation options for a greener future.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="rounded-full bg-tesla-blue/20 p-4 inline-flex mb-6">
                <Clock className="h-8 w-8 text-tesla-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexibility</h3>
              <p className="text-white/70">
                Our subscription model adapts to your changing needs, giving you the freedom 
                to switch vehicles or pause your subscription when needed.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="rounded-full bg-tesla-blue/20 p-4 inline-flex mb-6">
                <Shield className="h-8 w-8 text-tesla-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-white/70">
                We believe in clear, straightforward pricing with no hidden fees or 
                long-term commitments that lock you in.
              </p>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose CarFleet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-tesla-blue/20 p-2 flex-shrink-0">
                <Award className="h-6 w-6 text-tesla-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Premium Vehicle Selection</h3>
                <p className="text-white/70">
                  Access to the latest Tesla models, regularly maintained and updated to provide 
                  you with the best electric driving experience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-tesla-blue/20 p-2 flex-shrink-0">
                <Users className="h-6 w-6 text-tesla-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Exceptional Customer Service</h3>
                <p className="text-white/70">
                  Our dedicated team is available 24/7 to assist with any questions or issues 
                  you may encounter during your subscription.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-tesla-blue/20 p-2 flex-shrink-0">
                <Gauge className="h-6 w-6 text-tesla-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Convenient & Fast</h3>
                <p className="text-white/70">
                  From application to delivery, our streamlined process gets you behind the wheel 
                  of your new Tesla in as little as 24 hours.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-tesla-blue/20 p-2 flex-shrink-0">
                <Shield className="h-6 w-6 text-tesla-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">All-Inclusive Subscriptions</h3>
                <p className="text-white/70">
                  Insurance, maintenance, roadside assistance, and charging credits all 
                  bundled into one simple monthly payment.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Future of Mobility?</h2>
          <p className="text-lg text-white/70 mb-6 max-w-2xl mx-auto">
            Experience the freedom of electric vehicle subscription with CarFleet. 
            No long-term commitment, no hidden fees, just pure driving pleasure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-tesla-blue hover:bg-tesla-blue/90 text-white"
              onClick={() => navigate('/vehicles')}
            >
              Browse Vehicles
            </Button>
            <Button 
              variant="outline" 
              className="border-tesla-blue/30 hover:bg-tesla-blue/20"
              onClick={() => navigate('/pricing')}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
