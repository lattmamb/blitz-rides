
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Vehicle } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Battery, Gauge, Zap, Check, X } from "lucide-react";

interface ExpandableVehiclesGridProps {
  vehicles: Vehicle[];
}

export default function ExpandableVehiclesGrid({ vehicles }: ExpandableVehiclesGridProps) {
  const [active, setActive] = useState<Vehicle | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-tesla-dark-80 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.model}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-4 right-4 items-center justify-center glass-effect rounded-full h-8 w-8"
              onClick={() => setActive(null)}
            >
              <X className="h-4 w-4 text-white" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col glass-card overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <img
                  src={active.image}
                  alt={active.model}
                  className="w-full h-80 object-contain p-4"
                />
              </motion.div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="text-2xl font-bold text-white mb-1"
                    >
                      {active.model}
                    </motion.h3>
                    <motion.p
                      layoutId={`type-${active.id}-${id}`}
                      className="text-white/70"
                    >
                      {active.type.charAt(0).toUpperCase() + active.type.slice(1)} • {active.available ? "Available" : "Coming Soon"}
                    </motion.p>
                  </div>

                  <div className="text-right">
                    <motion.p
                      layoutId={`price-${active.id}-${id}`}
                      className="text-2xl font-bold text-white"
                    >
                      ${active.price}
                    </motion.p>
                    <span className="text-white/70 text-sm">{active.priceUnit}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="glass-effect flex flex-col items-center p-3 rounded">
                    <Battery className="h-5 w-5 text-tesla-blue mb-1" />
                    <span className="text-xs text-white/70">Range</span>
                    <span className="text-sm font-medium text-white">{active.performance.range} mi</span>
                  </div>
                  <div className="glass-effect flex flex-col items-center p-3 rounded">
                    <Gauge className="h-5 w-5 text-tesla-blue mb-1" />
                    <span className="text-xs text-white/70">Top Speed</span>
                    <span className="text-sm font-medium text-white">{active.performance.topSpeed} mph</span>
                  </div>
                  <div className="glass-effect flex flex-col items-center p-3 rounded">
                    <Zap className="h-5 w-5 text-tesla-blue mb-1" />
                    <span className="text-xs text-white/70">0-60 mph</span>
                    <span className="text-sm font-medium text-white">{active.performance.acceleration}s</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {active.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="p-1 rounded-full bg-tesla-blue/20 text-tesla-blue">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="flex-1 border-glass-border bg-glass hover:bg-glass-highlight text-white"
                  >
                    <Link to={`/vehicles/${active.id}`}>
                      View Details
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    className="flex-1 bg-tesla-blue hover:bg-tesla-blue/90 text-white"
                    disabled={!active.available}
                  >
                    <Link to={`/book/${active.id}`}>
                      {active.available ? "Rent Now" : "Coming Soon"}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <motion.div
            layoutId={`card-${vehicle.id}-${id}`}
            key={vehicle.id}
            onClick={() => setActive(vehicle)}
            className="glass-card p-5 relative overflow-hidden cursor-pointer hover:bg-glass-highlight transition-all duration-300"
          >
            {vehicle.available ? (
              <div className="absolute top-4 right-4 z-10 bg-tesla-green text-white text-xs font-medium px-2 py-1 rounded-full">
                Available
              </div>
            ) : (
              <div className="absolute top-4 right-4 z-10 bg-tesla-red/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                Coming Soon
              </div>
            )}

            <motion.div layoutId={`image-${vehicle.id}-${id}`} className="h-40 flex items-center justify-center mb-4">
              <img
                src={vehicle.image}
                alt={vehicle.model}
                className="h-full object-contain"
              />
            </motion.div>

            <motion.h3
              layoutId={`title-${vehicle.id}-${id}`}
              className="text-xl font-bold mb-1 text-white"
            >
              {vehicle.model}
            </motion.h3>
            
            <motion.p
              layoutId={`type-${vehicle.id}-${id}`}
              className="mb-2 text-white/70 text-sm"
            >
              {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}
            </motion.p>
            
            <motion.p
              layoutId={`price-${vehicle.id}-${id}`}
              className="text-2xl font-bold text-white"
            >
              ${vehicle.price}<span className="text-white/70 text-sm">{vehicle.priceUnit}</span>
            </motion.p>
            
            <p className="text-white/60 text-sm mt-2 mb-4">{vehicle.tagline}</p>
            
            <div className="flex justify-center mt-2">
              <Button 
                variant="ghost" 
                className="text-tesla-blue hover:text-white hover:bg-tesla-blue/20 text-sm"
              >
                Tap to view details
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
