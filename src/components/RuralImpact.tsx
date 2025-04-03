
import React from 'react';
import { Building2, Briefcase, Leaf, Battery, Youtube, Bank } from 'lucide-react';

interface ImpactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-unity-light rounded-xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300">
      <div className="bg-unity-blue w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const RuralImpact: React.FC = () => {
  return (
    <section id="impact" className="section-padding bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">Trillion-Dollar Rural Impact</h2>
        <p className="section-subtitle">
          We're not just changing transportation. We're creating a new economic blueprint for rural America with AI-driven innovation at its core.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <ImpactCard 
            icon={<Building2 className="h-7 w-7" />}
            title="Smart Infrastructure"
            description="AI-managed logistics and autonomous mobility networks transform rural transportation while optimizing energy use and reducing emissions."
          />
          
          <ImpactCard 
            icon={<Briefcase className="h-7 w-7" />}
            title="Digital Job Creation"
            description="AI-powered vocational training transforms rural laborers into high-tech, remote-enabled workers ready for the digital economy."
          />
          
          <ImpactCard 
            icon={<Leaf className="h-7 w-7" />}
            title="Hyper-Local Economics"
            description="Small business acceleration, micro-industrialization, and digital entrepreneurship keep wealth circulating within rural communities."
          />
          
          <ImpactCard 
            icon={<Battery className="h-7 w-7" />}
            title="Clean Energy Independence"
            description="Decentralized solar-powered EV charging networks create energy resilience and independence for rural regions."
          />
          
          <ImpactCard 
            icon={<Youtube className="h-7 w-7" />}
            title="Creator Economy"
            description="TikTok Creators Academy transforms rural youth into digital content creators with monetizable skills and global reach."
          />
          
          <ImpactCard 
            icon={<Bank className="h-7 w-7" />}
            title="Community Ownership"
            description="Tokenized investment models allow residents to own pieces of the infrastructure that serves them, creating a self-funding ecosystem."
          />
        </div>
      </div>
    </section>
  );
};

export default RuralImpact;
