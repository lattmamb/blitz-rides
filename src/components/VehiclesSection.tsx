
import React from 'react';
import { Link } from 'react-router-dom';

interface VehicleCardProps {
  name: string;
  image: string;
  price: string;
  features: string[];
}

const VehicleCard: React.FC<VehicleCardProps> = ({ name, image, price, features }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:transform hover:scale-[1.03] transition-all">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="text-lg font-semibold text-unity-blue mb-4">From {price}/day</div>
        <div className="flex flex-wrap gap-2 mb-5">
          {features.map((feature, index) => (
            <span key={index} className="bg-unity-light px-3 py-1 rounded-lg text-xs font-medium">
              {feature}
            </span>
          ))}
        </div>
        <Link to="/vehicles" className="unity-button block text-center">
          Book Now
        </Link>
      </div>
    </div>
  );
};

const VehiclesSection: React.FC = () => {
  return (
    <section id="vehicles" className="section-padding bg-unity-light">
      <div className="container mx-auto">
        <h2 className="section-title">Premium Electric Fleet</h2>
        <p className="section-subtitle">
          Experience the pinnacle of automotive innovation with our curated selection of high-performance electric vehicles.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <VehicleCard
            name="Cybertruck"
            image="/lovable-uploads/011215ed-22f9-4462-8492-3cdff3c58719.png"
            price="$249"
            features={["500+ Mile Range", "0-60 in 2.9s", "Autopilot"]}
          />
          
          <VehicleCard
            name="Tesla Model S"
            image="/lovable-uploads/a61a5731-3c36-4474-8258-c01eebd1c868.png"
            price="$199"
            features={["400+ Mile Range", "0-60 in 1.9s", "Full Self-Driving"]}
          />
          
          <VehicleCard
            name="Hummer EV"
            image="/lovable-uploads/ee96659e-8a14-4442-8fb3-a0b861d2773c.png"
            price="$299"
            features={["350+ Mile Range", "1,000 HP", "Crab Walk"]}
          />
          
          <VehicleCard
            name="Corvette E-Ray"
            image="/lovable-uploads/ca508435-8941-4b26-ab16-26d7fe5c8f41.png"
            price="$249"
            features={["Hybrid Performance", "0-60 in 2.5s", "655 HP"]}
          />
        </div>
      </div>
    </section>
  );
};

export default VehiclesSection;
