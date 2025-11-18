import { useState, useCallback } from 'react';

interface UseParticleTransitionReturn {
  triggerTransition: (origin?: { x: number; y: number }, direction?: 'forward' | 'backward' | 'center') => Promise<void>;
  isTransitioning: boolean;
}

export const useParticleTransition = (): UseParticleTransitionReturn => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = useCallback((
    origin?: { x: number; y: number },
    direction: 'forward' | 'backward' | 'center' = 'center'
  ): Promise<void> => {
    return new Promise((resolve) => {
      setIsTransitioning(true);
      
      // Trigger will be handled by ParticleTransition component
      setTimeout(() => {
        setIsTransitioning(false);
        resolve();
      }, 1000); // Match particle animation duration
    });
  }, []);

  return { triggerTransition, isTransitioning };
};
