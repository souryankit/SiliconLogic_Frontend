import { useEffect } from 'react';

/**
 * Custom hook to apply fade-in animation to sections when they become visible
 * during scrolling
 */
const useScrollAnimation = () => {
  useEffect(() => {
    // Create section fade-in animation
    const sectionsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-bottom');
          // Only animate once per page visit
          sectionsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    // Get all sections to animate
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      // Remove the fade-in-bottom class if it exists already
      section.classList.remove('fade-in-bottom');
      // Observe the section
      sectionsObserver.observe(section);
    });

    return () => {
      // Cleanup
      sections.forEach(section => {
        sectionsObserver.unobserve(section);
      });
    };
  }, []);
};

export default useScrollAnimation; 