
import React from "react";
import { motion } from "framer-motion";
import { World } from "@/components/ui/globe";
import { ChargingStation } from "@/types";

interface GlobeDemoProps {
  stations?: ChargingStation[];
  className?: string;
}

export default function GlobeDemo({ stations = [], className = "" }: GlobeDemoProps) {
  const colors = ["#0A84FF", "#5E5CE6", "#FF3B30", "#34C759"];

  // Generate arcs based on charging stations
  const generateArcs = () => {
    if (!stations || stations.length === 0) return sampleArcs;
    
    const arcs = [];
    // Create connections between charging stations
    for (let i = 0; i < stations.length; i++) {
      for (let j = i + 1; j < stations.length; j++) {
        if (Math.random() > 0.7) continue; // Only create some connections
        
        arcs.push({
          order: Math.floor(Math.random() * 5) + 1,
          startLat: stations[i].location.lat,
          startLng: stations[i].location.lng,
          endLat: stations[j].location.lat,
          endLng: stations[j].location.lng,
          arcAlt: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }
    
    // If no arcs were created (not enough stations), return sample arcs
    return arcs.length > 0 ? arcs : sampleArcs;
  };

  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const arcs = generateArcs();

  return (
    <div className={`relative w-full h-[500px] ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-full inset-0 bg-black/20 glass-card rounded-xl overflow-hidden"
      >
        <div className="absolute w-full bottom-0 inset-x-0 h-20 bg-gradient-to-b pointer-events-none from-transparent to-tesla-dark z-10" />
        <div className="absolute w-full h-full">
          <World data={arcs} globeConfig={globeConfig} />
        </div>
      </motion.div>
    </div>
  );
}

// Sample arcs for when no stations are provided
const sampleArcs = [
  {
    order: 1,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: "#0A84FF",
  },
  {
    order: 2,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: 47.6062,
    endLng: -122.3321,
    arcAlt: 0.2,
    color: "#5E5CE6",
  },
  {
    order: 3,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 32.7157,
    endLng: -117.1611,
    arcAlt: 0.1,
    color: "#34C759",
  },
  {
    order: 1,
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.3,
    color: "#0A84FF",
  },
  {
    order: 2,
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 41.8781,
    endLng: -87.6298,
    arcAlt: 0.2,
    color: "#5E5CE6",
  },
  {
    order: 3,
    startLat: 41.8781,
    startLng: -87.6298,
    endLat: 39.7392,
    endLng: -104.9903,
    arcAlt: 0.2,
    color: "#0A84FF",
  },
];
