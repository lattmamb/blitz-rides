
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Vehicle } from "@/types";
import { Button } from "./button";

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

export const VehicleHeader = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full left-0 top-0">
      <h2 className="text-2xl md:text-5xl font-bold gradient-text text-center mb-2">
        Experience Electric Luxury
      </h2>
      <p className="max-w-2xl mx-auto text-base md:text-xl mt-4 text-white/70 text-center">
        Discover our lineup of premium electric vehicles. Cutting-edge technology,
        breathtaking design, and zero emissions. Explore and reserve your Tesla today.
      </p>
    </div>
  );
};

export const VehicleCard = ({
  vehicle,
  translate,
}: {
  vehicle: VehicleProduct;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={vehicle.id}
      className="group/product h-96 w-[35rem] relative shrink-0"
    >
      <Link
        to={vehicle.link}
        className="block glass-card overflow-hidden h-full group-hover/product:shadow-[0_8px_32px_rgba(10,132,255,0.3)] transition-all duration-300"
      >
        <img
          src={vehicle.thumbnail}
          className="object-contain absolute h-full w-full inset-0 p-8"
          alt={vehicle.title}
        />
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-gradient-to-t from-black to-transparent pointer-events-none transition-opacity duration-300"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 opacity-0 group-hover/product:opacity-100 transition-all duration-300 transform translate-y-4 group-hover/product:translate-y-0">
          <h2 className="text-2xl font-bold text-white mb-2">
            {vehicle.title}
          </h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/70">
              ${vehicle.price}{vehicle.priceUnit}
            </span>
            {vehicle.available ? (
              <span className="bg-tesla-green text-white text-xs font-medium px-2 py-1 rounded-full">
                Available
              </span>
            ) : (
              <span className="bg-tesla-red/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                Coming Soon
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            className="bg-tesla-blue hover:bg-tesla-blue/90 text-white w-full"
          >
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};
