
import React from "react";
import HeroContent from "./HeroContent";
import SparklesBackground from "./SparklesBackground";
import ScrollIndicator from "./ScrollIndicator";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <SparklesBackground />
      <HeroContent />
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
