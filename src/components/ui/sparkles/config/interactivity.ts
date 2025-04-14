
export const getInteractivityConfig = () => {
  return {
    events: {
      onClick: {
        enable: true,
        mode: "push" as const,
      },
      onHover: {
        enable: false,
        mode: "repulse" as const,
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
