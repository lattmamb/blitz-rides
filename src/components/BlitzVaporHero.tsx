import React from 'react';
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect';
import GlassFluidHero from '@/components/ui/glass-fluid-hero';
import { useLazyAnimation } from '@/hooks/useLazyAnimation';

interface BlitzVaporHeroProps {
  className?: string;
}

const BlitzVaporHero: React.FC<BlitzVaporHeroProps> = ({ className = '' }) => {
  const { ref: subtitleRef, isVisible: subtitleVisible } = useLazyAnimation({ delay: 300 });
  const { ref: featuresRef, isVisible: featuresVisible } = useLazyAnimation({ delay: 500 });
  const { ref: scrollRef, isVisible: scrollVisible } = useLazyAnimation({ delay: 700 });

  return (
    <GlassFluidHero className={className}>
      <div className="flex flex-col items-center justify-center space-y-12">
        {/* Vapor text effect - already has internal lazy loading */}
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

        {/* Subtitle with lazy animation */}
        <div 
          ref={subtitleRef as React.RefObject<HTMLDivElement>}
          className="relative transition-all duration-700 ease-out"
          style={{
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl" />
          <p className="relative text-foreground/90 text-xl md:text-2xl font-light text-center px-8 backdrop-blur-sm">
            Next-Generation Mobility Platform
          </p>
        </div>

        {/* Feature highlights with staggered lazy animation */}
        <div 
          ref={featuresRef as React.RefObject<HTMLDivElement>}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          {['Seamless', 'Innovative', 'Connected'].map((feature, i) => (
            <div
              key={feature}
              className="px-6 py-3 rounded-full backdrop-blur-xl bg-background/20 border border-border/30 text-foreground/80 text-sm font-medium transition-all duration-500 ease-out hover:bg-background/30 hover:scale-105"
              style={{
                opacity: featuresVisible ? 1 : 0,
                transform: featuresVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 100}ms`
              }}
            >
              {feature}
            </div>
          ))}
        </div>

        {/* Scroll indicator with lazy animation */}
        <div 
          ref={scrollRef as React.RefObject<HTMLDivElement>}
          className="absolute bottom-12 flex flex-col items-center transition-all duration-700 ease-out"
          style={{
            opacity: scrollVisible ? 1 : 0,
            transform: scrollVisible ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
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
