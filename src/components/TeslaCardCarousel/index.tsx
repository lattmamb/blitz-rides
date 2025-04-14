
import React, { useState, useEffect } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { vehicles } from "@/data/vehicles";
import { motion } from "framer-motion";
import VehicleContent from "./VehicleContent";

export function TeslaCardCarousel() {
  const [selectedColors, setSelectedColors] = useState<{[key: string]: string}>({
    'model-3': '#FFFFFF', // Set white as default for Model 3
  });

  useEffect(() => {
    // Initialize with default colors
    const initialColors: {[key: string]: string} = {};
    vehicles.forEach(vehicle => {
      if (vehicle.id === 'model-3') {
        initialColors[vehicle.id] = '#FFFFFF'; // Ensure white is default for Model 3
      }
    });
    setSelectedColors(prev => ({...prev, ...initialColors}));
  }, []);

  const handleColorChange = (vehicleId: string, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [vehicleId]: color
    }));
  };

  const cards = vehicles.map((vehicle, index) => {
    const selectedColor = selectedColors[vehicle.id];
    const displayImage = vehicle.colorImages && selectedColor && vehicle.colorImages[selectedColor] 
      ? vehicle.colorImages[selectedColor] 
      : vehicle.image;

    return (
      <Card 
        key={vehicle.id} 
        card={{
          category: vehicle.type.toUpperCase(),
          title: vehicle.model,
          src: displayImage,
          content: <VehicleContent 
                    model={vehicle.model} 
                    features={vehicle.features} 
                    performance={vehicle.performance}
                    colors={vehicle.colors}
                    colorImages={vehicle.colorImages}
                    onColorChange={(color) => handleColorChange(vehicle.id, color)}
                  />
        }} 
        index={index} 
      />
    );
  });

  return (
    <motion.div 
      className="w-full h-full py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2 
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Discover Our Tesla Fleet
      </motion.h2>
      <Carousel items={cards} />
    </motion.div>
  );
}

export default TeslaCardCarousel;
