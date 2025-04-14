
import { ParticlesProps } from "../types";

export const getBaseConfig = (props: ParticlesProps) => {
  const { background } = props;
  
  return {
    background: {
      color: {
        value: background || "#0d47a1",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 120,
  };
};
