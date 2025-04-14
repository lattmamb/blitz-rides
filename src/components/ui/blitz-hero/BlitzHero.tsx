
import React from "react";
import { motion } from "framer-motion";
import BlitzNeoCard from "./BlitzNeoCard";
import BlitzNav from "./BlitzNav";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function BlitzHero() {
  const navigate = useNavigate();
  
  const cards = [
    { 
      title: "Model S", 
      description: "Electric Sedan", 
      image: "https://assets.aceternity.com/demos/tesla-model-s.webp" 
    },
    { 
      title: "Model X", 
      description: "Electric SUV", 
      image: "https://assets.aceternity.com/demos/tesla-model-x.webp" 
    },
    { 
      title: "Model 3", 
      description: "Electric Compact", 
      image: "https://assets.aceternity.com/demos/tesla-model-3.webp" 
    },
  ];

  const handleExploreFleet = () => {
    navigate("/vehicles");
  };

  const handleSubscribe = () => {
    navigate("/book/model-s");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* GLX Background with stars */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#0A84FF"
          speed={0.3}
        />
        
        {/* Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-tesla-blue/5 rounded-full filter blur-[80px] opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-tesla-purple/5 rounded-full filter blur-[100px] opacity-30"></div>
        
        {/* Orbital rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-[20%] w-[140%] h-[140%] glx-orbital border-white/5" style={{ animationDuration: '120s' }}></div>
          <div className="absolute top-1/2 -left-[10%] w-[120%] h-[120%] glx-orbital border-white/3" style={{ animationDuration: '80s' }}></div>
        </div>
      </div>
      
      {/* Navigation */}
      <BlitzNav />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="glx-text">UNITY FLEET GLX</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Experience the future of mobility with our exclusive GLX lineup
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Button 
              onClick={handleSubscribe}
              className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white relative overflow-hidden group px-8 py-6 text-lg"
            >
              <span className="relative z-10 flex items-center">
                Subscribe Now
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] transition-transform duration-300 group-hover:scale-105"></span>
            </Button>
            
            <Button 
              onClick={handleExploreFleet}
              variant="outline"
              className="border-white/20 hover:bg-white/5 hover:border-white/40 px-8 py-6 text-lg"
            >
              Explore Fleet
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}
            >
              <BlitzNeoCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
