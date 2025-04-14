
import { ParticlesProps } from "../types";
import { getBaseConfig } from "./base";
import { getParticlesConfig } from "./particles";
import { getInteractivityConfig } from "./interactivity";

export const getParticlesConfig = (props: ParticlesProps) => {
  return {
    ...getBaseConfig(props),
    interactivity: getInteractivityConfig(),
    particles: getParticlesConfig(props),
    detectRetina: true,
  };
};
