"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";

const TravelGuideHeader = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('visa-requirements');
  const isFixed = useFixedHeader();
  
  // Use PAAN dark blue color for text always
  const currentTextColor = "text-[#172840]";

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['visa-requirements', 'accommodation', 'travel-essentials', 'pack-smart', 'summit-experiences', 'explore-nairobi'];
      const scrollPosition = window.scrollY + 150; // Increased offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Initial call to set active section on page load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    console.log('Scrolling to section:', sectionId); // Debug log
    const element = document.getElementById(sectionId);
    if (element) {
      // Add offset to account for fixed header
      const headerHeight = 100;
      const elementPosition = element.offsetTop - headerHeight;
      
      console.log('Element found, scrolling to position:', elementPosition); // Debug log
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        window.scrollTo({
          top: Math.max(0, elementPosition),
          behavior: 'smooth'
        });
      });
    } else {
      console.log('Element not found for section:', sectionId); // Debug log
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Visa Requirements', href: '#visa-requirements' },
    { name: 'Accommodation', href: '#accommodation' },
    { name: 'Travel Essentials', href: '#travel-essentials' },
    { name: 'Pack Smart', href: '#pack-smart' },
    { name: 'Summit Experiences', href: '#summit-experiences' },
    { name: 'Explore Nairobi', href: '#explore-nairobi' },
  ];

  // Get navigation item styling based on active state
  const getNavItemStyle = (href) => {
    const sectionId = href.replace('#', '');
    const isActive = activeSection === sectionId;
    
    if (isActive) {
      return `text-paan-dark-blue bg-paan-yellow px-1.5 sm:px-2 py-1 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap`;
    }
    
    return `${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] px-1.5 sm:px-2 py-1 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm whitespace-nowrap`;
  };

  return (
    <nav
      className={`w-full z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 right-0 shadow-lg backdrop-blur-md bg-white rounded-none sm:rounded-lg mx-0 sm:mx-4 mt-0 sm:mt-4 max-w-none sm:max-w-6xl sm:left-1/2 sm:transform sm:-translate-x-1/2"
          : "fixed top-0 left-0 right-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 bg-white rounded-none sm:rounded-lg mx-0 sm:mx-4 mt-0 sm:mt-4 shadow-md max-w-none sm:max-w-6xl"
      }`}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/summit" passHref>
              <Image
                src="/assets/images/paan-summit-logo.svg"
                alt="Logo"
                width={200}
                height={70}
                className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="lg-custom:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 sm:p-3 rounded-md ${currentTextColor} focus:outline-none`}
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu and CTA (hidden on mobile) */}
          <div className="hidden lg-custom:flex lg-custom:items-center lg-custom:space-x-1 xl:space-x-2 w-full justify-end">
            <div className="flex space-x-0.5 flex-grow justify-center md:justify-center">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                  className={getNavItemStyle(item.href)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            <Link
              href="/summit"
              className="bg-paan-red text-white px-4 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-xs sm:text-sm shadow-lg flex items-center gap-1 mr-2"
            >
              Back to Summit
            </Link>
          </div>
        </div>

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg-custom:hidden`}>
          <div className="px-3 sm:px-4 pt-2 pb-3 space-y-1 bg-white rounded-none sm:rounded-lg shadow-lg border-t border-gray-200 sm:border border-gray-200">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              const mobileStyle = isActive 
                ? `text-paan-dark-blue bg-paan-yellow block px-3 sm:px-4 py-2 sm:py-3 rounded-full transition-all duration-300 cursor-pointer text-sm sm:text-base font-medium`
                : `${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] block px-3 sm:px-4 py-2 sm:py-3 rounded-full transition-all duration-300 cursor-pointer text-sm sm:text-base`;
              
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(sectionId)}
                  className={mobileStyle}
                >
                  {item.name}
                </button>
              );
            })}
            <div className="px-3 sm:px-4 py-3 mt-4">
              <Link
                href="/summit"
                className="bg-paan-red text-white px-4 py-2 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm shadow-lg flex items-center justify-center gap-2 w-full"
              >
                Back to Summit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TravelGuideHeader;