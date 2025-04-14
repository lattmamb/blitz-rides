
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleGalleryProps {
  images: string[];
  initialIndex?: number;
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({ 
  images,
  initialIndex = 0
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const { theme } = useTheme();
  
  // Animation for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };
  
  // Animation for gallery items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hovering) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hovering]);
  
  // Get accent color based on theme
  const getAccentColor = () => {
    if (theme === 'neoPulse') return 'rgba(10, 132, 255, 0.6)';
    if (theme === 'quantumGlass') return 'rgba(255, 255, 255, 0.4)';
    return 'rgba(249, 115, 22, 0.6)';
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className="crystal-3d w-full"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Main gallery container */}
      <div className="relative aspect-video overflow-hidden crystal-card">
        {/* Animated glare effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 opacity-50" 
          animate={{ 
            background: [
              `linear-gradient(45deg, transparent 0%, ${getAccentColor()} 45%, transparent 100%)`,
              `linear-gradient(135deg, transparent 0%, ${getAccentColor()} 45%, transparent 100%)`,
              `linear-gradient(225deg, transparent 0%, ${getAccentColor()} 45%, transparent 100%)`,
              `linear-gradient(315deg, transparent 0%, ${getAccentColor()} 45%, transparent 100%)`,
              `linear-gradient(45deg, transparent 0%, ${getAccentColor()} 45%, transparent 100%)`
            ]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear" 
          }}
        />
        
        {/* Navigation buttons */}
        <AnimatePresence>
          {hovering && (
            <>
              <motion.button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 crystal-card p-2 rounded-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 crystal-card p-2 rounded-full"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </>
          )}
        </AnimatePresence>
        
        {/* Main image with 3D effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={images[activeIndex]} 
              alt={`Vehicle image ${activeIndex + 1}`} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Image number indicator */}
        <div className="absolute bottom-4 right-4 crystal-card px-3 py-1 text-xs font-medium z-20">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnails */}
      <motion.div 
        className="flex gap-2 mt-4 overflow-x-auto scrollbar-none py-2"
        variants={itemVariants}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative rounded-md overflow-hidden cursor-pointer flex-shrink-0 w-20 h-20 ${
              index === activeIndex ? 'ring-2 ring-tesla-blue' : 'opacity-70'
            }`}
            whileHover={{ opacity: 1, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveIndex(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {/* Holographic overlay on active thumbnail */}
            {index === activeIndex && (
              <motion.div 
                className="absolute inset-0 pointer-events-none" 
                style={{ 
                  background: `linear-gradient(45deg, transparent 0%, ${getAccentColor().replace("0.6", "0.2")} 100%)` 
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default VehicleGallery;
