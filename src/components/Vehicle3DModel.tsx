
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface Vehicle3DModelProps {
  modelPath: string;
  label?: string;
  className?: string;
  interactive?: boolean;
  onLoad?: () => void;
}

const Vehicle3DModel: React.FC<Vehicle3DModelProps> = ({ 
  modelPath, 
  label, 
  className = '',
  interactive = true,
  onLoad
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Springs for smoother animations
  const springConfig = { damping: 15, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  
  // Auto-rotate effect
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 0.5) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [isAutoRotating]);
  
  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !interactive) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    
    if (isDragging) {
      const delta = e.clientX - startX;
      setRotationAngle(prev => (prev + delta * 0.5) % 360);
      setStartX(e.clientX);
    }
  };
  
  const handleMouseLeave = () => {
    if (!interactive) return;
    mouseX.set(0);
    mouseY.set(0);
    setIsDragging(false);
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    setIsAutoRotating(false);
    setIsDragging(true);
    setStartX(e.clientX);
  };
  
  const handleMouseUp = () => {
    if (!interactive) return;
    setIsDragging(false);
  };
  
  // Calculate lighting positions based on rotation angle
  const lightPosition = {
    x: Math.sin(rotationAngle * Math.PI / 180) * 50,
    y: 50,
    z: Math.cos(rotationAngle * Math.PI / 180) * 50
  };

  // Handle image loading
  useEffect(() => {
    if (!modelPath) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    
    const img = new Image();
    img.src = modelPath;
    
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
      if (onLoad) onLoad();
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    
    // Simulated minimum loading time for smoother UX
    const timer = setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [modelPath, onLoad]);

  return (
    <motion.div 
      ref={containerRef}
      className={`relative perspective ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ 
        cursor: interactive && !isLoading ? (isDragging ? 'grabbing' : 'grab') : 'default'
      }}
    >
      {/* Scene environment */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Floor reflection - only show when loaded */}
        {!isLoading && !hasError && (
          <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[rgba(10,10,10,0.3)] to-transparent"></div>
        )}
        
        {/* Environment lighting - only show when loaded */}
        {!isLoading && !hasError && (
          <>
            <motion.div 
              className="absolute w-20 h-20 rounded-full bg-tesla-blue/20 blur-xl"
              style={{
                left: `calc(50% + ${lightPosition.x}px)`,
                top: `calc(40% + ${lightPosition.y}px)`,
                opacity: 0.7,
              }}
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className="absolute w-40 h-40 rounded-full bg-tesla-purple/10 blur-xl"
              style={{
                right: `calc(30% + ${-lightPosition.x}px)`,
                bottom: `calc(40% + ${-lightPosition.y}px)`,
                opacity: 0.5
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </>
        )}
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Loader2 className="h-8 w-8 text-tesla-blue animate-spin" />
          </motion.div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <motion.div 
              className="w-16 h-16 rounded-full bg-red-500/20 mb-4 mx-auto flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-3xl">🚫</span>
            </motion.div>
            <p className="text-white/70">Unable to load model</p>
          </div>
        </div>
      )}
      
      {/* 3D Model container - only show when loaded */}
      {!isLoading && !hasError && (
        <motion.div
          className="w-full h-full flex items-center justify-center"
          style={{
            rotateX: interactive ? rotateX : 0,
            rotateY: mouseX.get() !== 0 ? rotateY : rotationAngle,
            rotateZ: 0,
            transformPerspective: 1000,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.img 
            src={modelPath}
            alt={label || "3D Vehicle Model"}
            className="w-full h-full object-contain transform-gpu"
            style={{
              filter: "drop-shadow(0 20px 15px rgba(0,0,0,0.4))"
            }}
            drag={interactive}
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.05 }}
            animate={{ 
              y: [0, -5, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
      
      {/* Optional label */}
      {label && !isLoading && !hasError && (
        <motion.div 
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-medium text-white">{label}</h3>
          <p className="text-sm text-white/70">Drag to rotate</p>
        </motion.div>
      )}
      
      {/* Rotation indicator */}
      {interactive && !isLoading && !hasError && (
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <button 
            className={`p-2 rounded-full ${isAutoRotating ? 'bg-tesla-blue/20' : 'bg-white/10'}`}
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? "Stop rotation" : "Auto rotate"}
          >
            <motion.div 
              className="w-4 h-4 border-2 border-white/70 rounded-full border-t-transparent"
              animate={{ rotate: isAutoRotating ? 360 : 0 }}
              transition={{ duration: 1, repeat: isAutoRotating ? Infinity : 0, ease: "linear" }}
            />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Vehicle3DModel;
