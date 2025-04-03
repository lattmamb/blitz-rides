
import React from 'react';
import { Zap, Leaf, Shield } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="glass-card p-6 transition-all duration-300 hover:bg-glass-highlight/10 group">
      <div className="mb-4 bg-glass-highlight/10 inline-block p-3 rounded-lg text-tesla-blue group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Why Rent a Tesla?</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the future of driving with zero emissions, industry-leading edge technology, and
            unmatched performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Instant Acceleration"
            description="Experience 0 to 60 mph in as little as 1.99 seconds. Electric motors deliver instant torque for unparalleled acceleration."
          />
          <FeatureCard
            icon={<Leaf className="h-8 w-8" />}
            title="Zero Emissions"
            description="Help reduce air pollution and minimize your carbon footprint with zero-emission vehicles powered by clean electricity."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Advanced Technology"
            description="Enjoy cutting-edge technology features including Autopilot, over-the-air updates, and intuitive touchscreen controls."
          />
        </div>

        <div className="mt-16 glass-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Ready for the future of transportation?</h3>
              <p className="text-white/70 mb-6">
                Join thousands of satisfied customers who have embraced our premium electric vehicle rental service. Your journey to the future begins here.
              </p>
              <button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white py-3 px-6 rounded-lg font-medium transition-colors w-fit">
                Start Your Trial Now
              </button>
            </div>
            <div className="relative min-h-[300px]">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-tesla-dark-80 to-transparent z-10"></div>
                <img 
                  src="/lovable-uploads/87310600-2a51-4edd-a0b3-4ae26fc44398.png"
                  alt="Tesla Model X" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
