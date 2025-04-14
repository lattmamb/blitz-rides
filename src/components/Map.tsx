
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChargingStation } from '@/types';
import { MapPin, Zap, Car } from 'lucide-react';

interface MapProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  stations?: ChargingStation[];
  className?: string;
  vehicleLocation?: {
    lat: number;
    lng: number;
  };
}

const Map: React.FC<MapProps> = ({ 
  center = { lat: 37.7749, lng: -122.4194 }, 
  zoom = 9, 
  stations = [], 
  className = '', 
  vehicleLocation 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`w-full h-full relative overflow-hidden rounded-xl ${className}`}>
      {/* Loading overlay with subtle animation */}
      <motion.div 
        className="absolute inset-0 bg-black/80 z-10 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: mapLoaded ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: mapLoaded ? 'none' : 'auto' }}
      >
        <motion.div 
          className="w-16 h-16 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-tesla-blue opacity-75"></div>
        </motion.div>
      </motion.div>
      
      {/* Map background with simulated map styling */}
      <div ref={mapRef} className="w-full h-full bg-tesla-dark-80 overflow-hidden" style={{ opacity: mapLoaded ? 1 : 0.5, transition: 'opacity 0.5s ease' }}>
        {/* Grid lines for map effect */}
        <div className="absolute inset-0 grid-background opacity-30"></div>
        
        {/* Vehicle location if provided */}
        {vehicleLocation && (
          <motion.div
            className="absolute z-30"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-full bg-tesla-green flex items-center justify-center">
              <motion.div
                className="w-14 h-14 rounded-full border-2 border-tesla-green absolute"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Car className="h-5 w-5 text-white" />
            </div>
          </motion.div>
        )}
        
        {/* Stations markers */}
        {stations.map((station) => (
          <motion.div
            key={station.id}
            className="absolute cursor-pointer z-20"
            style={{
              left: `${30 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            whileHover={{ scale: 1.1 }}
            onMouseEnter={() => setHoveredStation(station.id)}
            onMouseLeave={() => setHoveredStation(null)}
          >
            {/* Station marker */}
            <motion.div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                station.available > 0 ? 'bg-tesla-blue' : 'bg-tesla-red'
              }`}
              animate={{
                boxShadow: [
                  `0 0 0 rgba(${station.available > 0 ? '10,132,255' : '255,59,48'}, 0.4)`,
                  `0 0 20px rgba(${station.available > 0 ? '10,132,255' : '255,59,48'}, 0.6)`,
                  `0 0 0 rgba(${station.available > 0 ? '10,132,255' : '255,59,48'}, 0.4)`
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {station.available > 0 ? 
                <Zap className="h-4 w-4 text-white" /> : 
                <MapPin className="h-4 w-4 text-white" />
              }
            </motion.div>
            
            {/* Info tooltip */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-40 z-30 pointer-events-none"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ 
                opacity: hoveredStation === station.id ? 1 : 0,
                y: hoveredStation === station.id ? 0 : 10,
                scale: hoveredStation === station.id ? 1 : 0.95,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-premium p-2 rounded-lg backdrop-blur-md">
                <div className="text-sm font-medium mb-1">{station.name}</div>
                <div className="text-xs text-white/70 mb-1">{station.address}</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">
                    {station.available}/{station.total} Available
                  </span>
                  <span className="text-xs flex items-center">
                    <Zap className="h-3 w-3 mr-1 text-tesla-blue" />
                    {station.chargingSpeed} kW
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
        
        {/* Map Attribution */}
        <div className="absolute bottom-2 right-2 text-xs text-white/40">
          © BLITZ Maps 2025
        </div>
      </div>
    </div>
  );
};

export default Map;
