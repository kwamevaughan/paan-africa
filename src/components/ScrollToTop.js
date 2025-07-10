import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        const scrolled = window.scrollY;
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;

        setScrollProgress(progress);
        setIsVisible(scrolled > 300); // Show button after 300px
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 flex items-center justify-center w-14 h-14 bg-white/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          {/* Circular Progress Indicator */}
          <svg className="absolute w-14 h-14" viewBox="0 0 36 36">
            <path
              className="fill-none stroke-gray-200 stroke-2"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="fill-none stroke-paan-red stroke-2"
              strokeDasharray={`${scrollProgress}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          {/* Arrow Icon */}
          <Icon
            icon="mdi:arrow-up"
            width="24"
            height="24"
            className="text-paan-red relative z-10"
          />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
