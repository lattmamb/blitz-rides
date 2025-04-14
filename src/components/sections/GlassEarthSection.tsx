
import React from 'react';
import { motion } from 'framer-motion';
import { GlassEarth } from '@/components/ui/glass-earth';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const GlassEarthSection = () => {
  return (
    <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-tesla-blue/5 rounded-full filter blur-[100px] animate-pulse-glow z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-tesla-purple/5 rounded-full filter blur-[100px] animate-pulse-glow z-0" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Global</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tesla-blue to-tesla-purple">Sustainability</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/80 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Experience our commitment to environmental responsibility through our all-electric fleet. Every journey contributes to a cleaner planet.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button variant="glx-neo" size="lg" className="group">
                Explore Our Mission
                <ChevronDown className="h-4 w-4 ml-1 group-hover:animate-bounce" />
              </Button>
              
              <Button variant="glx-glass" size="lg">
                View Impact Report
              </Button>
            </motion.div>
            
            {/* Stats in glass cards */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-white/70">Electric Fleet</div>
              </div>
              
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">0</div>
                <div className="text-sm text-white/70">Emissions</div>
              </div>
              
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-white/70">Charging</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* 3D Earth */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <GlassEarth className="w-64 h-64 md:w-96 md:h-96" />
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient divider */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default GlassEarthSection;
