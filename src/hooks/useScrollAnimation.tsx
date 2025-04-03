
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    const checkScroll = () => {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
          section.classList.add('animate-fade-in-up');
          section.style.opacity = '1';
        }
      });
    };
    
    // Apply initial styles
    sections.forEach((section) => {
      if (!section.classList.contains('animate-fade-in-up')) {
        section.style.opacity = '0';
      }
    });
    
    // Check on load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);
};

export default useScrollAnimation;
