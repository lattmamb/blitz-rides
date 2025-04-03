
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDown, ChevronRight, Zap } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / 50;
      const moveY = (clientY - innerHeight / 2) / 50;
      
      const bgElements = heroRef.current.querySelectorAll('.parallax-bg');
      
      bgElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ opacity, scale }}
    >
      {/* Sparkles background effect */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="heroSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#0A84FF"
          speed={0.3}
        />
      </div>
      
      {/* Background blur effects */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-tesla-blue/20 rounded-full blur-[120px] parallax-bg"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-tesla-purple/20 rounded-full blur-[120px] parallax-bg"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </div>
      
      {/* Animated gradients */}
      <motion.div 
        className="absolute inset-x-20 top-40 z-0 bg-gradient-to-r from-transparent via-tesla-blue to-transparent h-[2px] w-3/4 blur-sm"
        animate={{ 
          x: [50, -50, 50],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute inset-x-20 top-40 z-0 bg-gradient-to-r from-transparent via-tesla-blue to-transparent h-px w-3/4"
        animate={{ 
          x: [-30, 30, -30],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute inset-x-60 top-40 z-0 bg-gradient-to-r from-transparent via-tesla-purple to-transparent h-[5px] w-1/4 blur-sm"
        animate={{ 
          x: [-50, 50, -50],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2 
        }}
      />
      <motion.div 
        className="absolute inset-x-60 top-40 z-0 bg-gradient-to-r from-transparent via-tesla-purple to-transparent h-px w-1/4"
        animate={{ 
          x: [30, -30, 30],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 14, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Content container */}
      <motion.div 
        ref={containerRef} 
        className="container relative z-10 mx-auto px-4 py-16 md:py-32"
        style={{ y }}
      >
        <motion.div 
          className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 relative"
          >
            <motion.div
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-tesla-blue/20 rounded-full blur-lg"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="w-14 h-14 mx-auto mb-6 relative"
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              <Zap size={56} className="text-tesla-blue" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Rent Your Dream
            <br />
            Electric Vehicle
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the future of transportation with our premium electric 
            vehicle rental service. Zero emissions, maximum performance.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button asChild size="lg" className="bg-tesla-blue hover:bg-tesla-blue/90 text-white font-medium px-8 group relative overflow-hidden">
              <Link to="/vehicles">
                <span className="relative z-10 flex items-center">
                  Browse Electric Vehicles
                  <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" size={18} />
                </span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white/20 bg-glass hover:bg-white/10 text-white group">
              <Link to="/how-it-works" className="flex items-center">
                <span>Learn More</span>
                <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                  <ChevronRight size={18} />
                </span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Radial Gradient to prevent sharp edges */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(600px_400px_at_top,transparent_30%,white)]"></div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <ArrowDown className="h-8 w-8 text-white/60" />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
