
import React from 'react';

interface TokenDetailProps {
  title: string;
  description: string;
  buttonText: string;
}

const TokenDetail: React.FC<TokenDetailProps> = ({ title, description, buttonText }) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <button className="unity-button-secondary">{buttonText}</button>
    </div>
  );
};

const AtlasToken: React.FC = () => {
  return (
    <section id="token" className="section-padding text-white" style={{background: "linear-gradient(135deg, #000, #222)"}}>
      <div className="container mx-auto">
        <h2 className="section-title text-white">Atlas Token (ATX)</h2>
        <p className="section-subtitle text-gray-300">
          The digital currency powering our ecosystem, enabling fractional ownership of infrastructure and participation in rural economic revival.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div className="text-center">
            <img 
              src="/lovable-uploads/d78df9f7-5d5e-4510-9126-f3a961011731.png" 
              alt="Atlas Token" 
              className="max-w-full h-auto rounded-2xl inline-block"
            />
          </div>
          
          <div>
            <TokenDetail 
              title="Fractional Asset Ownership"
              description="Own pieces of charging stations, vehicles, and infrastructure through tokenized investment, beginning with UnityLink Units (ULUs)."
              buttonText="Learn More"
            />
            
            <TokenDetail 
              title="Rural Economic Development"
              description="Atlas Tokens drive economic revitalization in rural communities by creating new digital economies, funding infrastructure, and enabling fractional ownership of community assets."
              buttonText="Learn More"
            />
            
            <TokenDetail 
              title="Tokenized Vehicle Platform"
              description="Each vehicle in our fleet is available for fractional investment, generating revenue through our Series LLC structure and rewarding token holders."
              buttonText="Invest Now"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtlasToken;
