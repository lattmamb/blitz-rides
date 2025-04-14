
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Vehicle } from '@/types';
import { Button } from '@/components/ui/button';

interface RelatedVehiclesProps {
  currentVehicleId: string;
  vehicles: Vehicle[];
}

const RelatedVehicles: React.FC<RelatedVehiclesProps> = ({ currentVehicleId, vehicles }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  // Filter out current vehicle and get 3 related vehicles
  const relatedVehicles = vehicles
    .filter(vehicle => vehicle.id !== currentVehicleId)
    .slice(0, 3);
    
  // Scroll carousel functions
  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const { scrollLeft, clientWidth } = containerRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth / 2 
      : scrollLeft + clientWidth / 2;
      
    containerRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };
  
  if (relatedVehicles.length === 0) return null;

  return (
    <motion.div 
      className="mt-20 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-8 flex justify-between items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold">Related Vehicles</h2>
            <p className="text-white/70">Discover other models you might like</p>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={() => scroll('left')}
            className="glass-card border-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={() => scroll('right')}
            className="glass-card border-0"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-none snap-x snap-mandatory"
      >
        <div className="flex gap-6">
          {relatedVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="min-w-[300px] md:min-w-[350px] snap-start shrink-0"
            >
              <div 
                className="glass-premium overflow-hidden rounded-2xl cursor-pointer h-full"
                onClick={() => navigate(`/vehicles/${vehicle.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={vehicle.image} 
                    alt={vehicle.model}
                    className="w-full h-full object-contain p-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    {vehicle.available ? (
                      <div className="bg-tesla-green text-white text-xs font-medium px-2 py-1 rounded-full">
                        Available
                      </div>
                    ) : (
                      <div className="bg-tesla-red/80 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Coming Soon
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{vehicle.model}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-xl font-bold">${vehicle.price}</span>
                      <span className="text-white/70 text-sm ml-1">{vehicle.priceUnit}</span>
                    </div>
                    <div className="text-sm text-white/70">{vehicle.type}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-white/5 p-2 rounded-lg text-center">
                      <div className="text-xs text-white/70">Range</div>
                      <div className="text-sm font-medium">{vehicle.performance.range} mi</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg text-center">
                      <div className="text-xs text-white/70">0-60</div>
                      <div className="text-sm font-medium">{vehicle.performance.acceleration}s</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg text-center">
                      <div className="text-xs text-white/70">Top Speed</div>
                      <div className="text-sm font-medium">{vehicle.performance.topSpeed}</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-tesla-blue/80 hover:bg-tesla-blue text-white"
                    onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                  >
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                {/* Enhanced reflection effect */}
                <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Bottom reflection */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mt-2"></div>
    </motion.div>
  );
};

export default RelatedVehicles;
