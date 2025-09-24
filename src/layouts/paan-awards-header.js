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
      className: 'bg-[#F25849] text-white px-4 py-3 rounded-full text-sm font-bold hover:bg-[#D6473C] transition duration-300',
      mobileClassName: 'bg-[#F25849] text-white block px-3 py-2 rounded-full text-sm font-bold hover:bg-[#D6473C] transition duration-300',
      onClick: onApplyNowClick
    },
    joinSummit: {
      href: '/summit',
      label: 'Join the Summit',
      className: 'bg-transparent border-2 border-white text-white px-4 py-3 rounded-full text-sm font-bold hover:bg-[#F25849] hover:border-paan-red transition duration-300',
      mobileClassName: 'bg-transparent border-2 border-[#F25849] text-[#F25849] block px-3 py-2 rounded-full text-sm font-bold hover:bg-[#F25849] hover:text-white transition duration-300',
      onClick: onJoinSummitClick
    }
  };
  
  // Use PAAN dark blue color for text when fixed, navLinkColor when not fixed
  const currentTextColor = isFixed ? "text-white" : navLinkColor;

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get navigation item styling based on active state
  const getNavItemStyle = (href) => {
    const sectionId = href.replace('#', '');
    const isActive = activeSection === sectionId;
    
    if (isActive) {
      return `text-paan-dark-blue bg-paan-yellow px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium`;
    }
    
    return `${currentTextColor} hover:text-white hover:bg-[#172840] px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium`;
  };

  // Handle join summit click
  const handleJoinSummitClick = () => {
    if (onJoinSummitClick) {
      onJoinSummitClick();
    } else {
      // Fallback to direct navigation
      window.location.href = '/summit';
    }
  };

  return (
    <nav
      className={`w-full z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-1/2 transform -translate-x-1/2 shadow-lg backdrop-blur-md bg-paan-dark-blue rounded-lg mx-4 mt-4 max-w-7xl"
          : "absolute left-1/2 transform -translate-x-1/2 bg-transparent mx-4 mt-4 max-w-7xl"
      }`}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <div className="flex items-center gap-3">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/awards-logo.svg"
                  alt="PAAN Logo"
                  width={200}
                  height={70}
                  className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
                />
              </div>
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="lg-custom:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${currentTextColor} focus:outline-none`}
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
          <div className="hidden lg-custom:flex lg-custom:items-center lg-custom:space-x-1 xl:space-x-2 w-full justify-end">
            <div className="flex space-x-0 flex-grow justify-center md:justify-center">
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
            <LanguageSwitch className="mr-3" />
            
            {/* CTA Buttons */}
            <div className="flex space-x-2">
              {/* Using Link component for Join Summit button */}
              <button onClick={() => window.location.href = '/summit'} >
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

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg-custom:hidden`}>
          <div className="px-3 sm:px-4 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Mobile Awards Title */}
            <div className="px-3 sm:px-4 py-2 border-b border-gray-200">
              <div className="text-[#172840] font-bold text-lg">PAAN Awards 2026</div>
              <div className="text-[#F25849] text-sm">Celebrating African Creativity</div>
            </div>
            
            {/* Language Switcher for Mobile */}
            <div className="px-3 sm:px-4 py-3 border-b border-gray-200">
              <LanguageSwitch />
            </div>
            
            {awardsMenuItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              const mobileStyle = isActive 
                ? `${currentTextColor} bg-paan-yellow text-paan-dark-blue block px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium`
                : `${currentTextColor} hover:text-white hover:bg-[#172840] block px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium`;
              
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
            
            {/* Mobile CTA Buttons */}
            <div className="space-y-2 pt-2">
              {/* Using Link component for mobile Join Summit button */}
              <button onClink={() => window.location.href = '/summit'} >
                <span className={ctaButtons.joinSummit.mobileClassName}>
                  {ctaButtons.joinSummit.label}
                </span>
              </button>
              <button
                onClick={ctaButtons.applyNow.onClick}              
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