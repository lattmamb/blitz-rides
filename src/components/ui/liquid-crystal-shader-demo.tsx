import React from "react";
import LiquidCrystalBackground from "@/components/ui/liquid-crystal-shader";

export default function LiquidCrystalDemo() {
  return (
    <div className="relative w-screen h-screen bg-background text-foreground font-sans">
      {/* Liquid-Crystal background with default settings */}
      <LiquidCrystalBackground
        speed={0.6}
        radii={[0.25, 0.18, 0.3]}
        smoothK={[0.2, 0.3]}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center pointer-events-none px-4">
        <h1 className="text-6xl font-black leading-tight">
          Liquid Crystal
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          A smooth, lava-lamp style GLSL shader in WebGL2, fully customizable
          via props and theme-aware through CSS variables.
        </p>
      </div>
    </div>
  );
}
