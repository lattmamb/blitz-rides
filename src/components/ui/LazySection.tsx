import React, { memo, forwardRef } from 'react';
import { useLazyAnimation, useLazyLoad } from '@/hooks/useLazyAnimation';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const LazySection = memo(forwardRef<HTMLElement, LazySectionProps>(({
  children,
  className,
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  triggerOnce = true,
  as: Component = 'div'
}, externalRef) => {
  const { ref, isVisible } = useLazyAnimation({ threshold, triggerOnce, delay });

  const getAnimationStyles = (): React.CSSProperties => {
    const baseTransition = `opacity ${duration}s ease, transform ${duration}s ease`;
    
    if (!isVisible) {
      switch (animation) {
        case 'slide-up':
          return { opacity: 0, transform: 'translateY(30px)', transition: baseTransition };
        case 'slide-left':
          return { opacity: 0, transform: 'translateX(30px)', transition: baseTransition };
        case 'slide-right':
          return { opacity: 0, transform: 'translateX(-30px)', transition: baseTransition };
        case 'scale':
          return { opacity: 0, transform: 'scale(0.95)', transition: baseTransition };
        case 'none':
          return {};
        default:
          return { opacity: 0, transition: baseTransition };
      }
    }

    return {
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)',
      transition: baseTransition
    };
  };

  return React.createElement(
    Component,
    {
      ref: (node: HTMLElement | null) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        if (typeof externalRef === 'function') {
          externalRef(node);
        } else if (externalRef) {
          externalRef.current = node;
        }
      },
      className: cn('will-change-transform', className),
      style: getAnimationStyles()
    },
    children
  );
}));

LazySection.displayName = 'LazySection';

// Lazy load wrapper for heavy components
interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  rootMargin?: string;
}

export const LazyLoadWrapper = memo<LazyLoadWrapperProps>(({
  children,
  fallback = <div className="min-h-[200px] bg-background/20 animate-pulse rounded-xl" />,
  className,
  rootMargin = '200px'
}) => {
  const { ref, shouldLoad } = useLazyLoad({ rootMargin });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {shouldLoad ? children : fallback}
    </div>
  );
});

LazyLoadWrapper.displayName = 'LazyLoadWrapper';

export default LazySection;
