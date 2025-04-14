
import { useState, useEffect } from 'react';

export const useLoadingDetection = (threshold = 500) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSlowRender, setIsSlowRender] = useState(false);
  
  useEffect(() => {
    const startTime = performance.now();
    let timeoutId: number;
    
    // Set a timeout to check if rendering takes longer than threshold
    timeoutId = window.setTimeout(() => {
      setIsSlowRender(true);
    }, threshold);
    
    // Schedule the loading completion for the next frame
    requestAnimationFrame(() => {
      window.clearTimeout(timeoutId);
      
      // Complete rendering measurement
      const renderTime = performance.now() - startTime;
      setIsSlowRender(renderTime > threshold);
      
      // Minor delay to prevent flashing of loading states
      setTimeout(() => setIsLoading(false), 50);
    });
    
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [threshold]);
  
  return { isLoading, isSlowRender };
};
