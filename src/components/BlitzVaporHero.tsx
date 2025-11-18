import React from 'react';
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect';
import GlassFluidHero from '@/components/ui/glass-fluid-hero';
import { motion } from 'framer-motion';

interface BlitzVaporHeroProps {
  className?: string;
}

const BlitzVaporHero: React.FC<BlitzVaporHeroProps> = ({ className = '' }) => {
  return (
    <GlassFluidHero className={className}>
      <div className="flex flex-col items-center justify-center space-y-12">
        {/* Vapor text effect */}
        <div className="relative w-full h-40 flex items-center justify-center">
          <VaporizeTextCycle
            texts={["BLITZ", "Experience", "Innovation"]}
            font={{
              fontFamily: "Inter, sans-serif",
              fontSize: "120px",
              fontWeight: 800
            }}
            color="rgb(255, 255, 255)"
            spread={7}
            density={8}
            animation={{
              vaporizeDuration: 2.5,
              fadeInDuration: 1.2,
              waitDuration: 1.5
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
          />
        </div>

        {/* Subtitle with glass effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl" />
          <p className="relative text-foreground/90 text-xl md:text-2xl font-light text-center px-8 backdrop-blur-sm">
            Next-Generation Mobility Platform
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {['Seamless', 'Innovative', 'Connected'].map((feature, i) => (
            <div
              key={feature}
              className="px-6 py-3 rounded-full backdrop-blur-xl bg-background/20 border border-border/30 text-foreground/80 text-sm font-medium hover:bg-background/30 transition-all duration-300 hover:scale-105"
            >
              {feature}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 flex flex-col items-center">
          <p className="text-muted-foreground text-sm mb-3 font-light tracking-wide">Scroll to Explore</p>
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center p-1 backdrop-blur-sm bg-background/10">
            <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50" />
          </div>
        </div>
      </div>
    </GlassFluidHero>
  );
};

export default BlitzVaporHero;
