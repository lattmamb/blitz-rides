import { useEffect, useRef, useState, useCallback } from 'react';

interface UseLazyAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useLazyAnimation = (options: UseLazyAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    delay = 0
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  return { ref, isVisible, hasAnimated };
};

// Hook for lazy loading heavy components
export const useLazyLoad = (options: UseLazyAnimationOptions = {}) => {
  const { threshold = 0, rootMargin = '200px' } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, shouldLoad };
};

// Hook for staggered animations
export const useStaggeredAnimation = (
  itemCount: number,
  options: UseLazyAnimationOptions & { staggerDelay?: number } = {}
) => {
  const { staggerDelay = 100, ...lazyOptions } = options;
  const { ref, isVisible } = useLazyAnimation(lazyOptions);
  
  const getItemDelay = useCallback((index: number) => {
    return isVisible ? index * staggerDelay : 0;
  }, [isVisible, staggerDelay]);

  const getItemStyle = useCallback((index: number) => {
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.4s ease ${index * staggerDelay}ms, transform 0.4s ease ${index * staggerDelay}ms`
    };
  }, [isVisible, staggerDelay]);

  return { ref, isVisible, getItemDelay, getItemStyle };
};
