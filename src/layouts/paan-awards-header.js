"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";
import LanguageSwitch from "../components/LanguageSwitch";

const PAANAwardsHeader = ({ navLinkColor, onApplyNowClick, onJoinSummitClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isFixed = useFixedHeader();
  
  // Awards-specific menu items
  const awardsMenuItems = [
    { href: '#home', label: 'Overview' },
    { href: '#paan-awards-section', label: 'Categories' },
    { href: '#transparency-section', label: 'Judging' },
    { href: '#categories-section', label: 'Why Apply' },
  ];

  const ctaButtons = {
    applyNow: {
      href: '#',
      label: 'Apply Now',
      className: 'bg-[#F25849] text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-xs sm:text-sm font-bold hover:bg-[#D6473C] transition duration-300 whitespace-nowrap',
      mobileClassName: 'bg-[#F25849] text-white block px-4 py-3 rounded-full text-sm font-bold hover:bg-[#D6473C] transition duration-300 text-center w-full',
      onClick: onApplyNowClick
    },
    joinSummit: {
      href: '/summit',
      label: 'Join the Summit',
      className: 'bg-transparent border-2 border-white text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-xs sm:text-sm font-bold hover:bg-[#F25849] hover:border-[#F25849] transition duration-300 whitespace-nowrap',
      mobileClassName: 'bg-transparent border-2 border-[#F25849] text-[#F25849] block px-4 py-3 rounded-full text-sm font-bold hover:bg-[#F25849] hover:text-white transition duration-300 text-center w-full',
      onClick: onJoinSummitClick
    }
  };
  
  // Use PAAN dark blue color for text when fixed, navLinkColor when not fixed
  const currentTextColor = isFixed ? "text-white" : navLinkColor;

  // Track active section based on scroll position
  useEffect(() => {
    const handleScrollPosition = () => {
      const sections = ['home', 'paan-awards-section', 'transparency-section', 'categories-section'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollPosition);
    return () => window.removeEventListener('scroll', handleScrollPosition);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Get navigation item styling based on active state
  const getNavItemStyle = (href) => {
    const sectionId = href.replace('#', '');
    const isActive = activeSection === sectionId;
    
    if (isActive) {
      return `text-paan-dark-blue bg-paan-yellow px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap`;
    }
    
    return `${currentTextColor} hover:text-white hover:bg-[#172840] px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap`;
  };

  // Handle join summit click
  const handleJoinSummitClick = () => {
    if (onJoinSummitClick) {
      onJoinSummitClick();
    } else {
      window.location.href = '/summit';
    }
  };

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        isFixed
          ? "lg:fixed absolute top-0 left-0 right-0 shadow-lg backdrop-blur-md bg-paan-dark-blue mx-auto px-2 sm:px-4 mt-2 sm:mt-4 max-w-7xl rounded-lg"
          : "absolute top-0 left-0 right-0 bg-transparent mx-auto px-2 sm:px-4 mt-2 sm:mt-4 max-w-7xl"
      }`}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3 md:py-4">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0 z-50">
            <Link href="/" passHref>
              <div className="flex items-center">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/awards-logo.svg"
                  alt="PAAN Logo"
                  width={200}
                  height={70}
                  className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="lg:hidden flex items-center z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${currentTextColor} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
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
          <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2 w-full justify-end">
            <div className="flex space-x-1 flex-grow justify-center">
              {awardsMenuItems.map((item) => (
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
            <LanguageSwitch className="mr-2 lg:mr-3" />
            
            {/* CTA Buttons */}
            <div className="flex space-x-2">
              <button onClick={handleJoinSummitClick}>
                <span className={ctaButtons.joinSummit.className}>
                  {ctaButtons.joinSummit.label}
                </span>
              </button>
              <button
                onClick={ctaButtons.applyNow.onClick}              
                className={ctaButtons.applyNow.className}
              >
                {ctaButtons.applyNow.label}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div 
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-[#172840]">
              <div>
                <div className="text-white font-bold text-base sm:text-lg">PAAN Awards 2026</div>
                <div className="text-[#F25849] text-xs sm:text-sm">Celebrating African Creativity</div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            {/* Language Switcher for Mobile */}
            <div className="px-4 py-3 border-b border-gray-200">
              <LanguageSwitch />
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 px-4 py-3 space-y-1">
              {awardsMenuItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      handleScroll(e, item.href, isFixed);
                      setIsMenuOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-paan-yellow text-paan-dark-blue' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
            
            {/* Mobile CTA Buttons */}
            <div className="px-4 py-4 space-y-3 border-t border-gray-200 bg-gray-50">
              <button 
                onClick={() => {
                  handleJoinSummitClick();
                  setIsMenuOpen(false);
                }}
                className={ctaButtons.joinSummit.mobileClassName}
              >
                {ctaButtons.joinSummit.label}
              </button>
              <button
                onClick={() => {
                  ctaButtons.applyNow.onClick();
                  setIsMenuOpen(false);
                }}
                className={ctaButtons.applyNow.mobileClassName}
              >
                {ctaButtons.applyNow.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PAANAwardsHeader;