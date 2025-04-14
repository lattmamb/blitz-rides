
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import { motion } from "framer-motion"

export function ThreeDPhotoCarouselDemo() {
  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-8 text-center glx-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Explore Our Fleet
      </motion.h2>
      <motion.p 
        className="text-white/70 text-xl max-w-2xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Drag to explore our luxury electric vehicles in stunning 3D. Click any vehicle to see details.
      </motion.p>
      
      <div className="glx-card p-2 overflow-hidden relative">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-tesla-blue/5 rounded-full filter blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-tesla-purple/5 rounded-full filter blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
        
        <ThreeDPhotoCarousel />
        
        {/* Reflection surface */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </motion.div>
  )
}
