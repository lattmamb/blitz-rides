
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDown, ChevronRight } from "lucide-react";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / 50;
      const moveY = (clientY - innerHeight / 2) / 50;
      
      const bgElements = heroRef.current.querySelectorAll('.parallax-bg');
      const fgElements = heroRef.current.querySelectorAll('.parallax-fg');
      
      bgElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        }
      });
      
      fgElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.transform = `translate(${-moveX * 1.5}px, ${-moveY * 1.5}px)`;
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background blur effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-tesla-blue/20 rounded-full blur-[120px] parallax-bg"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-tesla-purple/20 rounded-full blur-[120px] parallax-bg"></div>
      </div>
      
      {/* Hero overlay gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent z-10"></div>
      
      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Rural Mobility</span>
              <br />
              <span className="text-glow">Reimagined</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-lg">
              Experience the future with Unity Fleet's revolutionary transportation ecosystem, 
              bringing premium electric and autonomous vehicles to rural communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-tesla-blue hover:bg-tesla-blue/90 text-white font-medium px-8">
                <Link to="/vehicles">Explore Electric Vehicles</Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white/20 bg-glass hover:bg-white/10 text-white">
                <Link to="/about" className="flex items-center">
                  Learn About Our Vision
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center parallax-fg">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-tesla-dark z-10"></div>
              <img 
                src="/lovable-uploads/011215ed-22f9-4462-8492-3cdff3c58719.png"
                alt="Tesla Model S" 
                className="relative z-0 w-full h-auto object-contain max-w-lg blue-glow"
              />
              <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-tesla-dark to-transparent z-20"></div>
            </div>
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
