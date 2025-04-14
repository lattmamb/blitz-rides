
import type { SingleOrMultiple, CollisionMode, PixelMode, MoveDirection, MoveDirectionAlt } from "@tsparticles/engine";

export type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};
