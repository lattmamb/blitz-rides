
import React from 'react';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  position: 'left' | 'right';
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, position }) => {
  return (
    <div className={`relative p-4 ${position === 'left' ? 'md:ml-auto md:mr-[50%]' : 'md:mr-auto md:ml-[50%]'} md:w-[45%] mb-8`}>
      {/* Connector to timeline */}
      <div className="hidden md:block absolute top-5 w-5 h-5 rounded-full bg-white border-4 border-unity-blue z-10 
        right-[calc(-5px - 2.5%)]"></div>
      
      <div className="bg-white rounded-xl p-6 shadow-lg relative">
        <div className="font-bold text-unity-blue mb-2">{date}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="section-padding bg-unity-light">
      <div className="container mx-auto">
        <h2 className="section-title">Path to a Trillion</h2>
        <p className="section-subtitle">
          Our bold but methodical strategy to transform rural Illinois and beyond.
        </p>
        
        <div className="relative mt-16">
          {/* Timeline vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-unity-blue"></div>
          
          <TimelineItem 
            date="2025–2026"
            title="Phase 1: Foundation"
            description="Launch Unity Fleet in Taylorville, Pana, and Decatur with Cybertruck and Model 3/Y vehicles. Establish first 5 UnityLink Hubs and deploy VisionOS beta."
            position="left"
          />
          
          <TimelineItem 
            date="2026–2027"
            title="Phase 2: Expansion"
            description="Grow to 25+ rural towns with expanded fleet options. Launch TikTok Creators Academy at all hubs and begin university partnerships for AI vocational training."
            position="right"
          />
          
          <TimelineItem 
            date="2027–2028"
            title="Phase 3: Full Integration"
            description="Deploy 50+ UnityLink sites across Illinois. Begin tokenized infrastructure projects and expand Atlas Token utility to local businesses and services."
            position="left"
          />
          
          <TimelineItem 
            date="2028–2029"
            title="Phase 4: Automation"
            description="Introduce CyberCab and RoboVan autonomous vehicles. Expand AI-enabled business incubation and deploy full-scale Wedge Innovation Centers in all hub locations."
            position="right"
          />
          
          <TimelineItem 
            date="2029–2030"
            title="Phase 5: Trillion-Dollar Impact"
            description="Achieve measurable economic transformation across rural Illinois. Begin exporting the Unity model to other states and establish Illinois as the rural AI capital."
            position="left"
          />
        </div>
      </div>
    </section>
  );
};

export default Timeline;
