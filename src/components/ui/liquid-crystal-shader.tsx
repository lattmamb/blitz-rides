"use client";

import React, { FC, useRef, useEffect, useState } from "react";

export interface LiquidCrystalProps {
  /** Animation speed multiplier (default: 0.5) */
  speed?: number;
  /** Blob radii for the three SDF circles [r1, r2, r3] (default: [0.2, 0.15, 0.22]) */
  radii?: [number, number, number];
  /** Smooth‐union K values [k12, k123] (default: [0.2, 0.25]) */
  smoothK?: [number, number];
  /** CSS class for container styling */
  className?: string;
}

export const liquidCrystalShader = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_speed;
uniform vec3 u_radii;    // [r1, r2, r3]
uniform vec2 u_smoothK;  // [k12, k123]
out vec4 fragColor;

// SDF for a circle
float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

// Smooth union of two distances
float opSmoothUnion(float d1, float d2, float k) {
  float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k * h * (1.0 - h);
}

// Build scene SDF
float mapScene(vec2 uv) {
  float t = u_time * u_speed;
  vec2 p1 = vec2(cos(t * 0.5), sin(t * 0.5)) * 0.3;
  vec2 p2 = vec2(cos(t * 0.7 + 2.1), sin(t * 0.6 + 2.1)) * 0.4;
  vec2 p3 = vec2(cos(t * 0.4 + 4.2), sin(t * 0.8 + 4.2)) * 0.35;

  float b1 = sdCircle(uv - p1, u_radii.x);
  float b2 = sdCircle(uv - p2, u_radii.y);
  float b3 = sdCircle(uv - p3, u_radii.z);

  float u12 = opSmoothUnion(b1, b2, u_smoothK.x);
  return opSmoothUnion(u12, b3, u_smoothK.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  float d = mapScene(uv);

  // Bright rim by distance
  vec3 base = vec3(0.01 / abs(d));
  // shifting color palette over time
  vec3 pha = 0.5 + 0.5 * cos(u_time * 0.5 + uv.xyx + vec3(0,1,2));
  vec3 col = clamp(base * pha, 0.0, 1.0);
  fragColor = vec4(col, 1.0);
}
`;

const LiquidCrystalBackground: FC<LiquidCrystalProps> = ({
  speed = 0.5,
  radii = [0.2, 0.15, 0.22],
  smoothK = [0.2, 0.25],
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      setError("WebGL2 not supported");
      return;
    }

    // Simple WebGL2 renderer
    class Renderer {
      prog: WebGLProgram;
      uRes: WebGLUniformLocation;
      uTime: WebGLUniformLocation;
      uSpeed: WebGLUniformLocation;
      uRadii: WebGLUniformLocation;
      uK: WebGLUniformLocation;
      buf: WebGLBuffer;

      constructor() {
        // Compile shaders
        const compile = (type: GLenum, src: string) => {
          const s = gl.createShader(type)!;
          gl.shaderSource(s, src);
          gl.compileShader(s);
          if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(s));
            gl.deleteShader(s);
            return null;
          }
          return s;
        };

        const vsSrc = `#version 300 es
        in vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }`;
        const vs = compile(gl.VERTEX_SHADER, vsSrc)!;
        const fs = compile(gl.FRAGMENT_SHADER, liquidCrystalShader)!;

        this.prog = gl.createProgram()!;
        gl.attachShader(this.prog, vs);
        gl.attachShader(this.prog, fs);
        gl.linkProgram(this.prog);
        if (!gl.getProgramParameter(this.prog, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(this.prog));
        }

        // Full‐screen quad
        const quadVerts = new Float32Array([-1,1, -1,-1, 1,1, 1,-1]);
        this.buf = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
        gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(this.prog, "position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations
        this.uRes    = gl.getUniformLocation(this.prog, "u_resolution")!;
        this.uTime   = gl.getUniformLocation(this.prog, "u_time")!;
        this.uSpeed  = gl.getUniformLocation(this.prog, "u_speed")!;
        this.uRadii  = gl.getUniformLocation(this.prog, "u_radii")!;
        this.uK      = gl.getUniformLocation(this.prog, "u_smoothK")!;
      }

      render(timeMs: number) {
        const w = gl.canvas.width;
        const h = gl.canvas.height;
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.prog);
        gl.uniform2f(this.uRes, w, h);
        gl.uniform1f(this.uTime, timeMs * 0.001);
        gl.uniform1f(this.uSpeed, speed);
        gl.uniform3fv(this.uRadii, radii);
        gl.uniform2fv(this.uK, smoothK);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }

    const renderer = new Renderer();

    // Handle resize
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    window.addEventListener("resize", resize);
    resize();

    let rafId: number;
    const animate = (t: number) => {
      renderer.render(t);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [speed, radii, smoothK]);

  return (
    <div
      role="region"
      aria-label="Liquid crystal shader background"
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white font-mono text-sm p-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default LiquidCrystalBackground;
