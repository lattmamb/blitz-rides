
import { useState, useEffect, useRef } from 'react';

export const useLoadingDetection = (threshold = 500) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSlowRender, setIsSlowRender] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<number | null>(null);
  
  useEffect(() => {
    const startTime = performance.now();
    let timeoutId: number;
    
    // Set a timeout to check if rendering takes longer than threshold
    timeoutId = window.setTimeout(() => {
      setIsSlowRender(true);
      
      // Start simulated progress if we're in a slow render
      if (!progressInterval.current) {
        progressInterval.current = window.setInterval(() => {
          setProgress(prev => {
            // Gradually slow down as we approach 100%
            const increment = Math.max(0.5, (100 - prev) / 20);
            const newProgress = Math.min(99, prev + increment);
            return newProgress;
          });
        }, 200);
      }
    }, threshold);
    
    // Schedule the loading completion for the next frame
    requestAnimationFrame(() => {
      // Complete rendering measurement
      const renderTime = performance.now() - startTime;
      setIsSlowRender(renderTime > threshold);
      
      // Minor delay to prevent flashing of loading states
      setTimeout(() => {
        setIsLoading(false);
        setProgress(100);
        
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
      }, 50);
      
      window.clearTimeout(timeoutId);
    });
    
    return () => {
      window.clearTimeout(timeoutId);
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, [threshold]);
  
  return { isLoading, isSlowRender, progress };
};
