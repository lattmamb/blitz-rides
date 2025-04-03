
import React from 'react';
import { Smartphone, Brain, Gem, RefreshCw } from 'lucide-react';

interface VisionFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const VisionFeature: React.FC<VisionFeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-unity-light p-5 rounded-xl mb-4">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const VisionSystem: React.FC = () => {
  return (
    <section id="vision" className="section-padding bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">VisionOS</h2>
        <p className="section-subtitle">
          Our proprietary AI-powered operating system connects you to your vehicles, community, and the entire Unity Ecosystem.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <VisionFeature 
              icon={<Smartphone className="text-unity-blue h-5 w-5" />}
              title="Seamless Multi-Device Experience"
              description="Access your AI companion across iPhone, Surface Pro, and web interfaces with consistent, personalized interactions."
            />
            
            <VisionFeature 
              icon={<Brain className="text-unity-blue h-5 w-5" />}
              title="Persistent AI Memory"
              description="Vision Core captures all your AI interactions, learning your preferences, patterns, and goals to serve you better."
            />
            
            <VisionFeature 
              icon={<Gem className="text-unity-blue h-5 w-5" />}
              title="Apple-Inspired Design"
              description="Beautiful, intuitive interface with minimalist aesthetics and powerful functionality beneath the surface."
            />
            
            <VisionFeature 
              icon={<RefreshCw className="text-unity-blue h-5 w-5" />}
              title="Integrated Token Economy"
              description="Manage your Atlas Tokens, monitor infrastructure investments, and participate in the ecosystem economy."
            />
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/da56a3b8-eb77-4dfa-9c31-07b4e5c53497.png" 
              alt="VisionOS Interface" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSystem;
