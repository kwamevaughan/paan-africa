// utils/scrollUtils.js
import { useState, useEffect } from 'react';

// Custom hook to track if the header is fixed
export const useFixedHeader = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 50);
    };

    // Initial check in case the page is already scrolled
    handleScrollEvent();

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return isFixed;
};

// Function to handle smooth scrolling with offset for fixed header
export const handleScroll = (e, href, isFixed) => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);
  if (element) {
    // Add a slight delay to ensure the header is rendered
    setTimeout(() => {
      const header = document.querySelector('nav');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = isFixed ? headerHeight + 20 : 0; // Add a 20px buffer for better spacing
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }, 0); // Delay of 0ms ensures the DOM is ready
  }
};