
import React from "react";
import { motion } from "framer-motion";

interface HeroCard3DProps {
  imageSrc: string;
  title?: string;
  subtitle?: string;
}

const HeroCard3D: React.FC<HeroCard3DProps> = ({ 
  imageSrc, 
  title, 
  subtitle 
}) => {
  return (
    <div className="card-3d-wrapper">
      <motion.div 
        className="card-3d"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="obj">
          <div className="objchild">
            <div className="inn6">
              <img
                className="card-3d-image"
                src={imageSrc}
                alt={title || "Unity Fleet"}
              />
            </div>
          </div>
        </div>
        
        {(title || subtitle) && (
          <div className="card-3d-content">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {title && <h3 className="text-white text-lg font-medium">{title}</h3>}
              {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroCard3D;
