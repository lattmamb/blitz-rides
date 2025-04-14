import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

interface GlassEarthProps {
  className?: string;
}

const GlassEarth: React.FC<GlassEarthProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  
  const controls = useAnimation();
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasSize = () => {
      if (!containerRef.current || !canvas) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    let rotation = 0;
    const stars: { x: number; y: number; size: number; brightness: number }[] = [];
    
    const createStars = () => {
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;
      
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
    };
    
    createStars();
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);
      const radius = Math.min(centerX, centerY) * 0.7;
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(10, 132, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(10, 132, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(94, 92, 230, 0.3)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rotation;
        ctx.beginPath();
        ctx.ellipse(
          centerX, 
          centerY, 
          radius, 
          radius, 
          0, 
          0, 
          Math.PI * 2
        );
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX - radius * Math.cos(angle), centerY - radius * Math.sin(angle));
        ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
        ctx.stroke();
      }
      
      for (let i = 1; i < 4; i++) {
        const latRadius = radius * (i / 4);
        ctx.beginPath();
        ctx.arc(centerX, centerY, latRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      const highlightGradient = ctx.createRadialGradient(
        centerX - radius * 0.4, 
        centerY - radius * 0.4, 
        0,
        centerX - radius * 0.4, 
        centerY - radius * 0.4, 
        radius * 0.8
      );
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = highlightGradient;
      ctx.fill();
      
      rotation += 0.002;
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <motion.div 
      ref={containerRef}
      className={`relative rounded-full backdrop-blur-3xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      animate={controls}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-sm overflow-hidden border-none"
        animate={{
          boxShadow: isHovered 
            ? [
                "0 0 20px rgba(10,132,255,0.3), inset 0 0 30px rgba(10,132,255,0.3)",
                "0 0 40px rgba(10,132,255,0.5), inset 0 0 60px rgba(10,132,255,0.2)",
                "0 0 20px rgba(10,132,255,0.3), inset 0 0 30px rgba(10,132,255,0.3)"
              ]
            : "0 0 20px rgba(10,132,255,0.2), inset 0 0 30px rgba(10,132,255,0.1)"
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        <canvas 
          ref={canvasRef} 
          className="w-full h-full absolute inset-0"
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30"></div>
      </motion.div>
      
      <motion.div 
        className="absolute -inset-8 rounded-full opacity-30 z-[-1]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(10,132,255,0.3) 0%, transparent 70%)"
        }}
        animate={{
          opacity: isHovered ? [0.3, 0.5, 0.3] : 0.3,
          scale: isHovered ? [1, 1.05, 1] : 1,
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
    </motion.div>
  );
};

export { GlassEarth };
