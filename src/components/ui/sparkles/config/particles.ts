
import type { 
  OutMode, 
  SingleOrMultiple,
  LimitMode
} from "@tsparticles/engine";

export const getParticlesConfig = (
  size?: number,
  minSize?: number,
  maxSize?: number,
  particleColor?: string,
  speed?: number,
  density?: number,
) => {
  const defaultParticleSize = size || 1.2;
  const actualMinSize = minSize || 0.2;
  const actualMaxSize = maxSize || 2.5;
  const actualParticleColor = particleColor || "#FFFFFF";
  const actualSpeed = speed || 0.5;
  const actualDensity = density || 15;

  return {
    number: {
      density: {
        enable: true,
        area: actualDensity * 40,
      },
      value: 0,
      limit: {
        mode: "delete" as LimitMode,
      },
    },
    color: {
      value: actualParticleColor,
      animation: {
        h: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          delay: 0,
          sync: true,
          offset: 0,
        },
        s: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          delay: 0,
          sync: true,
          offset: 0,
        },
        l: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          delay: 0,
          sync: true,
          offset: 0,
        },
      },
    },
    shape: {
      options: {},
      type: "circle",
    },
    size: {
      value: {
        min: actualMinSize,
        max: actualMaxSize,
      },
      animation: {
        count: 0,
        enable: false,
        speed: defaultParticleSize,
        decay: 0,
        delay: 0,
        sync: false,
        mode: "auto" as "auto" | "random" | "increase" | "decrease", // Fixed type here
        startValue: "random",
        destroy: "none",
      },
    },
    life: {
      count: 0,
      delay: {
        value: 0,
        sync: false,
      },
      duration: {
        value: 0,
        sync: false,
      },
    },
    move: {
      angle: {
        offset: 0,
        value: 90,
      },
      center: {
        x: 50,
        y: 50,
        mode: "percent",
        radius: 0,
      },
      decay: 0,
      distance: {},
      direction: "none",
      drift: 0,
      enable: true,
      outModes: {
        default: "out" as SingleOrMultiple<OutMode>,
      },
      random: true,
      size: false,
      speed: actualSpeed,
      straight: false,
      vibrate: false,
      warp: false,
    },
    rotate: {
      animation: {
        enable: false,
        speed: 0,
        decay: 0,
        sync: false,
      },
      direction: "clockwise",
      value: 0,
    },
    destroy: {
      bounds: {},
      mode: "none",
      split: {
        count: 1,
        factor: {
          value: 3,
        },
        rate: {
          value: {
            min: 4,
            max: 9,
          },
        },
      },
    },
    roll: {
      darken: {
        enable: false,
        value: 0,
      },
      enable: false,
      speed: 25,
    },
    tilt: {
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        decay: 0,
        sync: false,
      },
      direction: "clockwise",
      enable: false,
    },
    wobble: {
      distance: 5,
      enable: false,
      speed: {
        angle: 50,
        move: 10,
      },
    },
    orbit: {
      animation: {
        count: 0,
        enable: false,
        speed: 1,
        decay: 0,
        delay: 0,
        sync: false,
      },
      enable: false,
      opacity: 1,
      rotation: {
        value: 45,
      },
      width: 1,
    },
    repulse: {
      value: 0,
      enabled: false,
      distance: 1,
      duration: 1,
      factor: 1,
      speed: 1,
    },
  };
};
