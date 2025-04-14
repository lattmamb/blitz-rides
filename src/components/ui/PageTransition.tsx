
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface PageTransitionProps {
  children: React.ReactNode;
  enableTransition?: boolean;
  transitionDuration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  enableTransition = true,
  transitionDuration = 0.5
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  // Handle location changes
  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
      setIsTransitioning(true);
    }
  }, [location, displayLocation]);

  // Get theme-specific transition
  const getTransitionStyles = () => {
    if (theme === 'neoPulse') {
      return {
        background: 'radial-gradient(circle at center, rgba(10,132,255,0.15) 0%, transparent 70%)',
        foregroundColor: 'rgba(10,132,255,0.3)',
      };
    } else if (theme === 'quantumGlass') {
      return {
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
        foregroundColor: 'rgba(255,255,255,0.15)',
      };
    } else {
      return {
        background: 'radial-gradient(circle at center, rgba(249,115,22,0.1) 0%, transparent 70%)',
        foregroundColor: 'rgba(249,115,22,0.2)',
      };
    }
  };

  const { background, foregroundColor } = getTransitionStyles();

  // Variants for page transitions
  const pageVariants = {
    fadeIn: {
      opacity: 1,
      y: 0,
      transition: {
        duration: transitionDuration,
        ease: "easeInOut"
      }
    },
    fadeOut: {
      opacity: 0,
      y: -20,
      transition: {
        duration: transitionDuration,
        ease: "easeInOut"
      }
    }
  };

  // Handle end of exit animation
  const handleAnimationComplete = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayLocation(location);
      setTransitionStage('fadeIn');
      
      // Small delay before marking transition as complete
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }
  };

  // Links click handler with transition
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (!enableTransition) return;
    
    // Only handle internal links that should trigger transitions
    const isInternalLink = to.startsWith('/');
    const isSamePage = to === location.pathname;
    const hasTarget = (e.currentTarget as HTMLAnchorElement).target;
    
    if (isInternalLink && !isSamePage && !hasTarget) {
      e.preventDefault();
      setTransitionStage('fadeOut');
      setIsTransitioning(true);
      
      // Navigate after animation starts
      setTimeout(() => {
        navigate(to);
      }, transitionDuration * 500); // Half the transition time
    }
  };

  // Listen for link clicks
  useEffect(() => {
    if (!enableTransition) return;
    
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')) {
        const to = anchor.getAttribute('href') || '';
        if (to.startsWith('/')) {
          handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, to);
        }
      }
    };
    
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [enableTransition, location.pathname, navigate]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayLocation.pathname}
          initial="fadeOut"
          animate={transitionStage}
          variants={pageVariants}
          onAnimationComplete={handleAnimationComplete}
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Overlay for transitions */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionDuration * 0.8 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="w-12 h-12 rounded-full"
              style={{ 
                background: foregroundColor,
                boxShadow: `0 0 30px ${foregroundColor}`
              }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ 
                duration: transitionDuration,
                times: [0, 0.7, 1]
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
