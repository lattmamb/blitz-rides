
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDown, ChevronRight, Zap } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 150]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage of screen
      const xPos = (clientX / innerWidth) - 0.5;
      const yPos = (clientY / innerHeight) - 0.5;
      
      setMousePosition({ x: xPos, y: yPos });
      
      // Update motion values for parallax effect
      mouseX.set(xPos * 20);
      mouseY.set(yPos * 20);
      
      // Apply parallax to background elements if hero ref exists
      if (heroRef.current) {
        const bgElements = heroRef.current.querySelectorAll('.parallax-bg');
        
        bgElements.forEach((element, index) => {
          if (element instanceof HTMLElement) {
            const depth = index * 0.2 + 0.5; // Different parallax intensity based on element index
            element.style.transform = `translate(${xPos * 40 * depth}px, ${yPos * 40 * depth}px)`;
          }
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ opacity, scale }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] z-0"></div>
      
      {/* Sparkles background effect */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="heroSparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#0A84FF"
          speed={0.3}
        />
      </div>
      
      {/* Background 3D elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Morphing gradient blobs */}
        <motion.div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-radial from-tesla-purple/20 to-transparent blur-[80px] parallax-bg"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
            borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%']
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{
            x: useTransform(springX, value => value * -1.2),
            y: useTransform(springY, value => value * -1.2)
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-radial from-tesla-blue/20 to-transparent blur-[100px] parallax-bg"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            borderRadius: ['30% 70% 70% 30% / 30% 52% 48% 70%', '70% 30% 30% 70% / 70% 48% 52% 30%', '30% 70% 70% 30% / 30% 52% 48% 70%']
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{
            x: useTransform(springX, value => value * -1.5),
            y: useTransform(springY, value => value * -1.5)
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#121212] to-transparent opacity-50 blur-[60px] parallax-bg"
          style={{
            x: useTransform(springX, value => value * -0.7),
            y: useTransform(springY, value => value * -0.7)
          }}
        />
      </div>
      
      {/* Animated gradients */}
      <motion.div 
        className="absolute inset-x-0 top-1/3 z-0 h-px w-full"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0), rgba(10,132,255,0.5), rgba(0,0,0,0))",
          x: useTransform(mousePosition.x, [-0.5, 0.5], ['-20%', '20%']),
          opacity: useTransform(mousePosition.y, [-0.5, 0.5], [0.8, 0.2])
        }}
      />
      
      <motion.div 
        className="absolute inset-x-0 top-2/3 z-0 h-px w-full"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0), rgba(94,92,230,0.5), rgba(0,0,0,0))",
          x: useTransform(mousePosition.x, [-0.5, 0.5], ['20%', '-20%']),
          opacity: useTransform(mousePosition.y, [-0.5, 0.5], [0.2, 0.8])
        }}
      />
      
      {/* Content container */}
      <motion.div 
        ref={containerRef} 
        className="container relative z-10 mx-auto px-4 py-16 md:py-32"
        style={{ y }}
      >
        <motion.div 
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
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
            className="mb-10 relative"
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
              style={{
                rotateY: useTransform(mousePosition.x, [-0.5, 0.5], [-15, 15]),
                rotateX: useTransform(mousePosition.y, [-0.5, 0.5], [15, -15])
              }}
            >
              <motion.div 
                className="w-14 h-14 absolute inset-0 flex items-center justify-center"
                animate={{ 
                  boxShadow: ['0 0 20px 2px rgba(10,132,255,0.3)', '0 0 30px 5px rgba(10,132,255,0.5)', '0 0 20px 2px rgba(10,132,255,0.3)']
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Zap size={36} className="text-tesla-blue" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            style={{
              perspective: 1000,
              rotateX: useTransform(mousePosition.y, [-0.5, 0.5], [2, -2]),
              rotateY: useTransform(mousePosition.x, [-0.5, 0.5], [-2, 2])
            }}
          >
            <motion.span 
              className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/70 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rent Your Dream
            </motion.span>
            <motion.span 
              className="block bg-clip-text text-transparent bg-gradient-to-r from-tesla-blue/90 via-white to-tesla-purple/90 relative mt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Electric Vehicle
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Experience the future of transportation with our premium electric 
            vehicle rental service. Zero emissions, maximum performance.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="tesla-button bg-gradient-to-r from-tesla-blue to-tesla-purple px-8 py-6 text-lg">
                <Link to="/vehicles" className="relative z-10 flex items-center">
                  Browse Vehicles
                  <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" size={18} />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" className="tesla-button-outline px-8 py-6 text-lg">
                <Link to="/how-it-works" className="flex items-center group">
                  <span>Learn More</span>
                  <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                    <ChevronRight size={18} />
                  </span>
                </Link>
              </Button>
            </motion.div>
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
