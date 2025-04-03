
import React from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center" style={{background: "linear-gradient(135deg, #000000, #222222)"}}>
      {/* Background overlay gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
      
      {/* Content container */}
      <div className="container relative z-20 mx-auto px-4 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Rural Mobility
              <br />
              Reimagined
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-lg font-light">
              Experience the future with Unity Fleet's revolutionary transportation ecosystem, 
              bringing premium electric and autonomous vehicles to rural Illinois.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/vehicles" className="unity-button text-center">
                Explore Vehicles
              </Link>
              
              <a href="#vision" className="unity-button-secondary text-center">
                Learn About Our Vision
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center relative">
            <img 
              src="/lovable-uploads/011215ed-22f9-4462-8492-3cdff3c58719.png"
              alt="Tesla Cybertruck" 
              className="relative z-0 w-full h-auto object-contain max-w-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="h-8 w-8 text-white/60" />
      </div>
    </div>
  );
};

export default Hero;
