
import type { HoverMode, ClickMode } from "@tsparticles/engine";

export const getInteractivityConfig = () => {
  return {
    events: {
      onClick: {
        enable: true,
        mode: "push" as ClickMode,
      },
      onHover: {
        enable: false,
        mode: "repulse" as HoverMode,
      },
      resize: true as any,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  };
};
