
export const getColorName = (hex: string) => {
  switch(hex.toUpperCase()) {
    case '#FFFFFF': return 'Pearl White';
    case '#000000': return 'Solid Black';
    case '#C0C0C0': return 'Silver Metallic';
    case '#FF0000': return 'Red Multi-Coat';
    case '#0000FF': return 'Deep Blue Metallic';
    case '#808080': return 'Midnight Silver';
    case '#A52A2A': return 'Brown Metallic';
    default: return 'Custom Color';
  }
};

export const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -20 }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};
