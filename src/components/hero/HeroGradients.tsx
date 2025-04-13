
import React from "react";
import { motion, MotionValue } from "framer-motion";

type HeroGradientsProps = {
  gradientX1: MotionValue<number>;
  gradientOpacity1: MotionValue<number>;
  gradientX2: MotionValue<number>;
  gradientOpacity2: MotionValue<number>;
};

const HeroGradients: React.FC<HeroGradientsProps> = ({
  gradientX1,
  gradientOpacity1,
  gradientX2,
  gradientOpacity2,
}) => {
  return (
    <>
      <motion.div 
        className="absolute inset-x-0 top-1/3 z-0 h-px w-full"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0), rgba(10,132,255,0.5), rgba(0,0,0,0))",
          x: gradientX1,
          opacity: gradientOpacity1
        }}
      />
      
      <motion.div 
        className="absolute inset-x-0 top-2/3 z-0 h-px w-full"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0), rgba(94,92,230,0.5), rgba(0,0,0,0))",
          x: gradientX2,
          opacity: gradientOpacity2
        }}
      />
    </>
  );
};

export default HeroGradients;
