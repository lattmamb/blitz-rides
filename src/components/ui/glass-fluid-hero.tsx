import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassFluidHeroProps {
  children?: React.ReactNode;
  className?: string;
}

export const GlassFluidHero: React.FC<GlassFluidHeroProps> = ({ 
  children, 
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
    >
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.2) 0%, transparent 50%)'
          }}
        />
      </div>

      {/* Static glass morphism layers */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{ opacity: 0.1 }}
          >
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(var(--primary) / ${0.12 - i * 0.03}) 0%, transparent 70%)`,
                filter: 'blur(60px)',
                transform: `translate(${i * 100}px, ${i * 50}px)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Static glass cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-2xl backdrop-blur-xl bg-background/5 border border-border/20"
            style={{
              width: 200 + i * 50,
              height: 150 + i * 30,
              left: `${10 + i * 18}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Main content area with glass container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full max-w-7xl mx-auto px-4"
        >
          {/* Glass morphism container */}
          <div className="relative backdrop-blur-2xl bg-background/10 border border-border/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, hsl(var(--primary) / 0.1) 50%, transparent 100%)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
              }}
            />

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />

            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default GlassFluidHero;
