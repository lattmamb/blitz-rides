
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useParallaxEffects() {
  // Create motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring physics to smooth movement
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Create derived motion values for UI effects
  const gradientX1 = useTransform(mouseX, value => value * 1);
  const gradientOpacity1 = useTransform(mouseY, value => 0.8 - (value * 0.6));
  const gradientX2 = useTransform(mouseX, value => -value * 1);
  const gradientOpacity2 = useTransform(mouseY, value => 0.2 + (value * 0.6));
  
  // Create motion values for 3D rotation effects
  const rotateY = useTransform(mouseX, value => value * 30);
  const rotateX = useTransform(mouseY, value => -value * 30);
  const headingRotateX = useTransform(mouseY, value => -value * 4);
  const headingRotateY = useTransform(mouseX, value => value * 4);
  
  return {
    mouseX,
    mouseY,
    springX,
    springY,
    gradientX1,
    gradientOpacity1,
    gradientX2,
    gradientOpacity2,
    rotateX,
    rotateY,
    headingRotateX,
    headingRotateY
  };
}
