import React, { useState } from 'react';
import { ShaderCanvas, ControlSlider } from "@/components/ui/aether-flow";

export default function AetherFlowDemo() {
  const [hue, setHue] = useState(260);
  const [speed, setSpeed] = useState(0.15);
  const [intensity, setIntensity] = useState(0.7);
  const [complexity, setComplexity] = useState(6.0);
  const [warp, setWarp] = useState(0.4);

  return (
    <div className="relative w-screen h-screen bg-gray-900 font-sans overflow-hidden">
      {/* The main canvas where the shader is rendered */}
      <ShaderCanvas
        hue={hue}
        speed={speed}
        intensity={intensity}
        complexity={complexity}
        warp={warp}
      />

      {/* A title overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-5xl md:text-8xl font-bold text-white mix-blend-soft-light text-center select-none">
          Aether Flow
        </h1>
      </div>

      {/* The control panel for adjusting shader parameters */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md p-4">
        <div className="bg-black/40 backdrop-blur-lg p-6 rounded-2xl shadow-2xl space-y-4 border border-white/10">
          <ControlSlider label="Hue" value={hue} onChange={(e) => setHue(parseFloat(e.target.value))} min="0" max="360" step="1" />
          <ControlSlider label="Speed" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} min="0.0" max="1.0" step="0.01" />
          <ControlSlider label="Intensity" value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))} min="0.1" max="2.0" step="0.01" />
          <ControlSlider label="Complexity" value={complexity} onChange={(e) => setComplexity(parseFloat(e.target.value))} min="1.0" max="8.0" step="0.1" />
          <ControlSlider label="Warp" value={warp} onChange={(e) => setWarp(parseFloat(e.target.value))} min="0.0" max="1.0" step="0.01" />
        </div>
      </div>
    </div>
  );
}
