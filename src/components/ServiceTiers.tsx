
import React from 'react';
import { Check } from 'lucide-react';

interface TierCardProps {
  name: string;
  price: string;
  features: string[];
}

const TierCard: React.FC<TierCardProps> = ({ name, price, features }) => {
  return (
    <div className="bg-unity-light rounded-2xl p-8 transition-all hover:transform hover:-translate-y-2 hover:shadow-xl">
      <div className="text-2xl font-bold mb-2">{name}</div>
      <div className="text-3xl font-bold text-unity-blue mb-5">
        {price} <span className="text-base font-normal text-gray-500">/week</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="text-unity-success">
              <Check className="h-5 w-5" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="unity-button w-full py-3">Select Plan</button>
    </div>
  );
};

const ServiceTiers: React.FC = () => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">Choose Your Mobility Freedom</h2>
        <p className="section-subtitle">
          From daily commutes to special occasions, Unity Fleet offers flexible subscription options tailored to your unique needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TierCard 
            name="Take-Home"
            price="$299"
            features={[
              "Personal vehicle at your home",
              "Unlimited mileage",
              "Insurance included",
              "24/7 roadside assistance",
              "Weekly cleaning service"
            ]}
          />
          
          <TierCard 
            name="FlexRide"
            price="$199"
            features={[
              "On-demand vehicle access",
              "200 miles per week included",
              "Insurance included",
              "UnityLink Hub amenities",
              "Swap vehicles twice monthly"
            ]}
          />
          
          <TierCard 
            name="Community Access"
            price="$99"
            features={[
              "Shared vehicle pool",
              "100 miles per week included",
              "Insurance included",
              "Basic UnityLink Hub access",
              "Ideal for occasional use"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceTiers;
