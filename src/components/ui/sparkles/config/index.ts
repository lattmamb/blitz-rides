
import { ParticlesProps } from "../types";
import { getBaseConfig } from "./base";
import { getParticlesConfig as getParticlesConfigInternal } from "./particles";
import { getInteractivityConfig } from "./interactivity";

export const getParticlesConfig = (props: ParticlesProps) => {
  return {
    ...getBaseConfig(props),
    interactivity: getInteractivityConfig(),
    particles: getParticlesConfigInternal(props),
    detectRetina: true,
  };
};
