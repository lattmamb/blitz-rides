
import React from 'react';
import { Zap, Coffee, Car, Video } from 'lucide-react';

interface HubFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HubFeature: React.FC<HubFeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-5 mb-8">
      <div className="bg-unity-blue w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const UnityLinkHubs: React.FC = () => {
  return (
    <section id="unitylink" className="section-padding text-white" style={{background: "linear-gradient(135deg, #111, #333)"}}>
      <div className="container mx-auto">
        <h2 className="section-title text-white">UnityLink Experience Hubs</h2>
        <p className="section-subtitle text-gray-300">
          More than charging stations. Our modular solar-powered hubs serve as community spaces for creation, innovation, and collaboration.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-10">
          <div className="order-2 md:order-1">
            <HubFeature 
              icon={<Zap className="text-white h-6 w-6" />}
              title="Solar-Powered Charging"
              description="Self-sufficient clean energy powers our vehicles and facilities, with grid independence and community resilience."
            />
            
            <HubFeature 
              icon={<Coffee className="text-white h-6 w-6" />}
              title="Creator Lounge & Café"
              description="Premium co-working spaces and café environments designed for networking, creation, and collaboration."
            />
            
            <HubFeature 
              icon={<Car className="text-white h-6 w-6" />}
              title="Autonomous Fleet Base"
              description="Home base for our self-driving fleet, featuring AI-optimized charging, maintenance, and deployment."
            />
            
            <HubFeature 
              icon={<Video className="text-white h-6 w-6" />}
              title="TikTok Creators Academy"
              description="Youth-focused creator studios, providing tools, training, and opportunities for digital content creators."
            />
          </div>
          
          <div className="rounded-2xl overflow-hidden order-1 md:order-2">
            <img 
              src="/lovable-uploads/42c49c59-c4cf-4456-9201-bfb022c0da31.png" 
              alt="UnityLink Hub" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnityLinkHubs;
