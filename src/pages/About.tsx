
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Separator } from '@/components/ui/separator';
import ExpandableCardDemo from '@/components/ui/expandable-card-demo-grid';

const About: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Us</h1>
          <p className="text-white/70 text-lg mb-10">
            Discover the story behind Unity Fleet, our mission, and the team that makes it all possible.
          </p>

          <div className="glass-card p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-white/70 mb-6">
              At Unity Fleet, we're committed to transforming the way people experience transportation. We believe in a future where mobility is sustainable, convenient, and tailored to your lifestyle. Our mission is to provide access to premium electric vehicles through flexible subscription plans, making eco-friendly transportation accessible to everyone.
            </p>
            <p className="text-white/70">
              Founded in 2023, we've quickly grown to become a leader in the electric vehicle subscription market, with operations in major cities across the country. Our team of automotive enthusiasts and tech innovators works tirelessly to ensure that every aspect of your experience with us exceeds expectations.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <p className="text-white/70 mb-10">
            Meet the passionate individuals behind Unity Fleet who are driving the future of sustainable transportation.
          </p>

          <ExpandableCardDemo />

          <div className="glass-card p-8 mt-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <Separator className="mb-6 bg-white/10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-tesla-blue">Sustainability</h3>
                <p className="text-white/70">
                  We're committed to reducing carbon emissions through our all-electric fleet and eco-friendly practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-tesla-blue">Innovation</h3>
                <p className="text-white/70">
                  We continuously seek new technologies and solutions to improve your mobility experience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-tesla-blue">Customer Focus</h3>
                <p className="text-white/70">
                  Your satisfaction drives everything we do, from vehicle selection to subscription flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
