
import { ParticlesProps } from "../types";
import { getBaseConfig } from "./base";
import { getParticlesConfig as getParticlesSettings } from "./particles";
import { getInteractivityConfig } from "./interactivity";

export const getParticlesConfig = (props: ParticlesProps) => {
  return {
    ...getBaseConfig(props),
    interactivity: getInteractivityConfig(),
    particles: getParticlesSettings(props),
    detectRetina: true,
  };
};
