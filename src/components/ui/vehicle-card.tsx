
import React from "react";
import { motion, type MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

export default VehicleCard;
