
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { VehicleCard } from "./vehicle-card";
import { VehicleHeader } from "./vehicle-header";

interface VehicleProduct {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  price: number;
  priceUnit: string;
  available: boolean;
}

export const HeroParallax = ({
  vehicles,
}: {
  vehicles: VehicleProduct[];
}) => {
  const firstRow = vehicles.slice(0, 3);
  const secondRow = vehicles.slice(3, 5);
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 300]),
    springConfig
  );
  
  return (
    <div
      ref={ref}
      className="h-[200vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <VehicleHeader />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-20">
          {firstRow.map((vehicle) => (
            <VehicleCard
              vehicle={vehicle}
              translate={translateX}
              key={vehicle.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-10">
          {secondRow.map((vehicle) => (
            <VehicleCard
              vehicle={vehicle}
              translate={translateXReverse}
              key={vehicle.id}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroParallax;
