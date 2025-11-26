import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    agencies: 0,
    countries: 0,
    market: 0
  });
  const sectionRef = useRef(null);

  // Intersection Observer to trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate counters when visible
  useEffect(() => {
    if (!isVisible) return;

    const animateCount = (target, key, duration = 2000) => {
      const start = Date.now();
      const startValue = counts[key];
      
      const updateCount = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
        
        setCounts(prev => ({
          ...prev,
          [key]: currentValue
        }));
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    };

    // Start animations with slight delays for staggered effect
    setTimeout(() => animateCount(200, 'agencies'), 100);
    setTimeout(() => animateCount(20, 'countries'), 300);
    setTimeout(() => animateCount(70, 'market'), 500);
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#E8EAEC] py-8 sm:py-12 md:py-16 px-2 sm:px-6 lg:px-8 relative overflow-hidden mb-6"
    >
      {/* Decorative Red Circle - responsive position and size */}
      <div className="absolute bottom-2 right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-paan-red rounded-full z-0"></div>
      <div className="max-w-7xl mx-auto relative z-10">      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          {/* Agencies Stat */}
          <div className="p-4 sm:p-8">
            <div className="flex justify-center items-center mb-3 sm:mb-4">
              <Image
                src="/assets/images/agencies-icon.svg"
                width={64}
                height={64}
                className="sm:w-20 sm:h-20 w-16 h-16"
                alt="PAAN Portal Feature"
              />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-paan-red mb-1 sm:mb-2">
              {counts.agencies}+
            </div>
            <div className="text-paan-dark-blue text-base uppercase sm:text-lg font-medium">
              Vetted Agencies
            </div>
          </div>

          {/* Countries Stat */}
          <div className="p-4 sm:p-8">
            <div className="flex justify-center items-center mb-3 sm:mb-4">
              <Image
                src="/assets/images/countries-icon.svg"
                width={64}
                height={64}
                className="sm:w-20 sm:h-20 w-16 h-16"
                alt="PAAN Portal Feature"
              />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-paan-red mb-1 sm:mb-2">
              {counts.countries}+
            </div>
            <div className="text-paan-dark-blue text-base uppercase sm:text-lg font-medium">
              Countries
            </div>
          </div>

          {/* Market Access Stat */}
          <div className="p-4 sm:p-8">
            <div className="flex justify-center items-center mb-3 sm:mb-4">
              <Image
                src="/assets/images/market-icon.svg"
                width={64}
                height={64}
                className="sm:w-20 sm:h-20 w-16 h-16"
                alt="PAAN Portal Feature"
              />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-paan-red mb-1 sm:mb-2">
              {counts.market}%
            </div>
            <div className="text-paan-dark-blue text-base uppercase sm:text-lg font-medium">
              Faster Market Access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;