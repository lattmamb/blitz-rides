
import React, { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { vehicles } from "@/data/vehicles";
import { motion } from "framer-motion";

const VehicleContent = ({ 
  model, 
  features, 
  performance,
  colors,
  colorImages,
  onColorChange
}: { 
  model: string; 
  features: string[]; 
  performance: { range: number; topSpeed: number; acceleration: number; };
  colors: string[];
  colorImages?: {[key: string]: string};
  onColorChange?: (color: string) => void;
}) => {
  return (
    <div className="bg-[#0A0A0A]/80 backdrop-blur-md p-8 md:p-14 rounded-3xl mb-4">
      <div className="text-neutral-200 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-white text-xl md:text-3xl block mb-4">
          {model} - Experience Electric Excellence
        </span>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
          <div className="bg-black/30 p-4 rounded-xl">
            <p className="text-tesla-blue text-sm">Range</p>
            <p className="text-white text-xl font-bold">{performance.range} mi</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl">
            <p className="text-tesla-blue text-sm">Top Speed</p>
            <p className="text-white text-xl font-bold">{performance.topSpeed} mph</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl">
            <p className="text-tesla-blue text-sm">0-60 mph</p>
            <p className="text-white text-xl font-bold">{performance.acceleration}s</p>
          </div>
        </div>
        
        {/* Color selector */}
        {colorImages && Object.keys(colorImages).length > 0 && (
          <div className="mt-6 mb-8">
            <h3 className="text-tesla-blue text-lg mb-3">Available Colors:</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {colors.filter(color => colorImages[color]).map((color) => (
                <motion.div
                  key={color}
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-white transition-all"
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onColorChange && onColorChange(color)}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <h3 className="text-tesla-blue text-lg mb-2">Key Features:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-neutral-300">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export function TeslaCardCarousel() {
  const [selectedColors, setSelectedColors] = useState<{[key: string]: string}>({});

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
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-8">
        Discover Our Tesla Fleet
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

export default TeslaCardCarousel;
