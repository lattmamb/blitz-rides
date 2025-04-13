
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

const SparklesBackground: React.FC = () => {
  return (
    <div className="w-full absolute inset-0 h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black"></div>
      <SparklesCore
        id="heroSparkles"
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={70}
        className="w-full h-full"
        particleColor="#0A84FF"
        speed={0.3}
      />
    </div>
  );
};

export default SparklesBackground;
