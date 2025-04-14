import { ParticlesProps } from "../types";
import type { 
  CollisionMode, 
  PixelMode, 
  SingleOrMultiple, 
  MoveDirection, 
  MoveDirectionAlt,
  OutMode,
  LimitMode
} from "@tsparticles/engine";

export const getParticlesConfig = (props: ParticlesProps) => {
  const {
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  
  return {
    bounce: {
      horizontal: {
        value: 1,
      },
      vertical: {
        value: 1,
      },
    },
    collisions: {
      absorb: {
        speed: 2,
      },
      bounce: {
        horizontal: {
          value: 1,
        },
        vertical: {
          value: 1,
        },
      },
      enable: false,
      maxSpeed: 50,
      mode: "bounce" as CollisionMode,
      overlap: {
        enable: true,
        retries: 0,
      },
    },
    color: {
      value: particleColor || "#ffffff",
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
    effect: {
      close: true,
      fill: true,
      options: {},
      type: {} as SingleOrMultiple<string> | undefined,
    },
    groups: {},
    move: {
      angle: {
        offset: 0,
        value: 90,
      },
      attract: {
        distance: 200,
        enable: false,
        rotate: {
          x: 3000,
          y: 3000,
        },
      },
      center: {
        x: 50,
        y: 50,
        mode: "percent" as "percent" | PixelMode | "precise",
        radius: 0,
      },
      decay: 0,
      distance: {},
      direction: "none" as "none" | "bottom" | "left" | "right" | "top" | "bottom-left" | "bottom-right" | "top-left" | "top-right" | MoveDirection | MoveDirectionAlt,
      drift: 0,
      enable: true,
      gravity: {
        acceleration: 9.81,
        enable: false,
        inverse: false,
        maxSpeed: 50,
      },
      path: {
        clamp: true,
        delay: {
          value: 0,
        },
        enable: false,
        options: {},
      },
      outModes: {
        default: "out" as OutMode,
      },
      random: false,
      size: false,
      speed: {
        min: 0.1,
        max: 1,
      },
      spin: {
        acceleration: 0,
        enable: false,
      },
      straight: false,
      trail: {
        enable: false,
        length: 10,
        fill: {},
      },
      vibrate: false,
      warp: false,
    },
    number: {
      density: {
        enable: true,
        width: 400,
        height: 400,
      },
      limit: {
        mode: "delete" as LimitMode,
        value: 0,
      },
      value: particleDensity || 120,
    },
    opacity: getOpacityConfig(speed),
    reduceDuplicates: false,
    shadow: {
      blur: 0,
      color: {
        value: "#000",
      },
      enable: false,
      offset: {
        x: 0,
        y: 0,
      },
    },
    shape: {
      close: true,
      fill: true,
      options: {},
      type: "circle",
    },
    size: getSizeConfig(minSize, maxSize),
    stroke: {
      width: 0,
    },
    zIndex: {
      value: 0,
      opacityRate: 1,
      sizeRate: 1,
      velocityRate: 1,
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
        sizeOffset: true,
      },
    },
    roll: getRollConfig(),
    tilt: getTiltConfig(),
    twinkle: getTwinkleConfig(),
    wobble: getWobbleConfig(),
    life: getLifeConfig(),
    rotate: getRotateConfig(),
    orbit: getOrbitConfig(),
    links: getLinksConfig(),
    repulse: getRepulseConfig(),
  };
};

const getOpacityConfig = (speed?: number) => {
  return {
    value: {
      min: 0.1,
      max: 1,
    },
    animation: {
      count: 0,
      enable: true,
      speed: speed || 4,
      decay: 0,
      delay: 0,
      sync: false,
      mode: "auto",
      startValue: "random",
      destroy: "none" as const,
    },
  };
};

const getSizeConfig = (minSize?: number, maxSize?: number) => {
  return {
    value: {
      min: minSize || 1,
      max: maxSize || 3,
    },
    animation: {
      count: 0,
      enable: false,
      speed: 5,
      decay: 0,
      delay: 0,
      sync: false,
      mode: "auto",
      startValue: "random",
      destroy: "none" as const,
    },
  };
};

const getRollConfig = () => {
  return {
    darken: {
      enable: false,
      value: 0,
    },
    enable: false,
    enlighten: {
      enable: false,
      value: 0,
    },
    mode: "vertical",
    speed: 25,
  };
};

const getTiltConfig = () => {
  return {
    value: 0,
    animation: {
      enable: false,
      speed: 0,
      decay: 0,
      sync: false,
    },
    direction: "clockwise",
    enable: false,
  };
};

const getTwinkleConfig = () => {
  return {
    lines: {
      enable: false,
      frequency: 0.05,
      opacity: 1,
    },
    particles: {
      enable: false,
      frequency: 0.05,
      opacity: 1,
    },
  };
};

const getWobbleConfig = () => {
  return {
    distance: 5,
    enable: false,
    speed: {
      angle: 50,
      move: 10,
    },
  };
};

const getLifeConfig = () => {
  return {
    count: 0,
    delay: {
      value: 0,
      sync: false,
    },
    duration: {
      value: 0,
      sync: false,
    },
  };
};

const getRotateConfig = () => {
  return {
    value: 0,
    animation: {
      enable: false,
      speed: 0,
      decay: 0,
      sync: false,
    },
    direction: "clockwise",
    path: false,
  };
};

const getOrbitConfig = () => {
  return {
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
  };
};

const getLinksConfig = () => {
  return {
    blink: false,
    color: {
      value: "#fff",
    },
    consent: false,
    distance: 100,
    enable: false,
    frequency: 1,
    opacity: 1,
    shadow: {
      blur: 5,
      color: {
        value: "#000",
      },
      enable: false,
    },
    triangles: {
      enable: false,
      frequency: 1,
    },
    width: 1,
    warp: false,
  };
};

const getRepulseConfig = () => {
  return {
    value: 0,
    enabled: false,
    distance: 1,
    duration: 1,
    factor: 1,
    speed: 1,
  };
};
