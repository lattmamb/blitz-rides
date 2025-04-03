
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Vehicle } from "../types";
import { ArrowRight, Battery, Gauge, Zap } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-card overflow-hidden group transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 relative overflow-hidden">
        {vehicle.available ? (
          <div className="absolute top-4 right-4 z-10 bg-tesla-green text-white text-xs font-medium px-2 py-1 rounded-full">
            Available
          </div>
        ) : (
          <div className="absolute top-4 right-4 z-10 bg-tesla-red/90 text-white text-xs font-medium px-2 py-1 rounded-full">
            Coming Soon
          </div>
        )}

        <div className="relative h-40 flex items-center justify-center mb-4">
          <img
            src={vehicle.image}
            alt={vehicle.model}
            className={`h-full object-contain transition-all duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold mb-1">{vehicle.model}</h3>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold text-white">${vehicle.price}</span>
              <span className="text-white/70 text-sm">{vehicle.priceUnit}</span>
            </div>
            <div className="glass-effect px-2 py-1 rounded text-xs font-medium text-white/80">
              {vehicle.type.toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="glass-effect flex flex-col items-center p-2 rounded">
              <Battery className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">Range</span>
              <span className="text-sm font-medium">{vehicle.performance.range} mi</span>
            </div>
            <div className="glass-effect flex flex-col items-center p-2 rounded">
              <Gauge className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">Top Speed</span>
              <span className="text-sm font-medium">{vehicle.performance.topSpeed} mph</span>
            </div>
            <div className="glass-effect flex flex-col items-center p-2 rounded">
              <Zap className="h-4 w-4 text-tesla-blue mb-1" />
              <span className="text-xs text-white/70">0-60 mph</span>
              <span className="text-sm font-medium">{vehicle.performance.acceleration}s</span>
            </div>
          </div>

          <div className="flex justify-between gap-2 mt-5">
            <Button 
              asChild 
              variant="outline" 
              className="flex-1 border-glass-border bg-glass hover:bg-white/10 text-white"
            >
              <Link to={`/vehicles/${vehicle.id}`}>
                View Details
              </Link>
            </Button>
            
            <Button 
              asChild 
              className="flex-1 bg-tesla-blue hover:bg-tesla-blue/90 text-white"
            >
              <Link to={`/book/${vehicle.id}`}>
                Rent Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
