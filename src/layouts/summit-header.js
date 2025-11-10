"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { menuItems, ctaButton } from "../data/summitMenu";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";
import LanguageSwitch from "../components/LanguageSwitch";

const Header = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isFixed = useFixedHeader();
  
  // Use PAAN dark blue color for text always
  const currentTextColor = "text-[#172840]";

  // Track active section based on scroll position
  useEffect(() => {
    const handleScrollEvent = () => {
      // Get sections from menuItems to ensure they match
      const sections = menuItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY;
      
      // Calculate dynamic offset based on header height
      const header = document.querySelector('nav');
      const headerHeight = header ? header.offsetHeight : 0;
      const headerOffset = headerHeight + 100; // Header height + buffer

      let currentSection = 'home'; // Default to home

      // Check sections from top to bottom to find which section is currently in view
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          
          // If we've scrolled past this section's top (with offset), it's the active one
          if (scrollPosition + headerOffset >= sectionTop) {
            currentSection = sections[i];
          } else {
            // Once we find a section we haven't reached, stop checking
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Initial check
    handleScrollEvent();
    
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollEvent();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Get navigation item styling based on active state
  const getNavItemStyle = (href) => {
    const sectionId = href.replace('#', '');
    const isActive = activeSection === sectionId;
    
    if (isActive) {
      return `text-paan-dark-blue bg-paan-yellow px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium`;
    }
    
    return `${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm`;
  };

  return (
    <nav
      className={`w-full z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 right-0 shadow-lg backdrop-blur-md bg-white rounded-none sm:rounded-lg mx-0 sm:mx-4 mt-0 sm:mt-4 max-w-none sm:max-w-7xl sm:left-1/2 sm:transform sm:-translate-x-1/2"
          : "fixed top-0 left-0 right-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 bg-white rounded-none sm:rounded-lg mx-0 sm:mx-4 mt-0 sm:mt-4 shadow-md max-w-none sm:max-w-7xl"
      }`}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <Image
                src="/assets/images/paan-summit-logo.svg"
                alt="Logo"
                width={200}
                height={70}
                className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-auto"
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
            <div className="flex space-x-1 xl:space-x-2 flex-grow justify-center md:justify-center">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href, isFixed)}
                  className={getNavItemStyle(item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitch className="mr-2 xl:mr-3" />
            
            <button 
              onClick={() => window.location.href = '/summit/purchase-ticket'}
              className="bg-paan-red text-white px-4 py-2 text-sm rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium shadow-lg flex items-center justify-center gap-2"
            >
              {ctaButton.label}
            </button>
          </div>
        </div>

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg-custom:hidden`}>
          <div className="px-3 sm:px-4 pt-2 pb-3 space-y-1 bg-white rounded-none sm:rounded-lg shadow-lg border-t border-gray-200 sm:border border-gray-200">
            {/* Language Switcher for Mobile */}
            <div className="px-3 sm:px-4 py-3 border-b border-gray-200">
              <LanguageSwitch />
            </div>
            
            {menuItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              const mobileStyle = isActive 
                ? `text-paan-dark-blue bg-paan-yellow block px-3 sm:px-4 py-2 sm:py-3 rounded-full transition-all duration-300 cursor-pointer text-sm sm:text-base font-medium`
                : `${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] block px-3 sm:px-4 py-2 sm:py-3 rounded-full transition-all duration-300 cursor-pointer text-sm sm:text-base`;
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    handleScroll(e, item.href, isFixed);
                    setIsMenuOpen(false);
                  }}
                  className={mobileStyle}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="px-3 sm:px-4 py-3 mt-4">
              <button 
                onClick={() => window.location.href = '/summit/purchase-ticket'}
                className="bg-paan-red text-white px-4 py-2 text-sm rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium shadow-lg flex items-center justify-center gap-2 w-full"
              >
                {ctaButton.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;