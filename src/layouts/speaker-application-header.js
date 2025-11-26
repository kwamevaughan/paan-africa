"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFixedHeader } from "../../utils/scrollUtils";
import LanguageSwitch from "../components/LanguageSwitch";

const SpeakerApplicationHeader = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isFixed = useFixedHeader();
  
  // Use PAAN dark blue color for text always
  const currentTextColor = "text-[#172840]";

  // Speaker application specific menu items
  const menuItems = [
    { href: '#home', label: 'Home' },
    { href: '#form', label: 'Application Form' },
    { href: '#requirements', label: 'Requirements' },
    { href: '#benefits', label: 'Speaker Benefits' },
    { href: '#contact', label: 'Contact' }
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'form', 'requirements', 'benefits', 'contact'];
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
      return `text-paan-dark-blue bg-paan-yellow px-2 xl:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs xl:text-sm font-medium`;
    }
    
    return `${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] px-2 xl:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs xl:text-sm`;
  };

  return (
    <nav
      className={`w-full z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 right-0 shadow-lg backdrop-blur-md bg-white rounded-none sm:rounded-lg mx-0 sm:mx-4 mt-0 sm:mt-4 max-w-none sm:max-w-7xl sm:left-1/2 sm:transform sm:-translate-x-1/2"
          : "absolute left-0 right-0 bg-white rounded-none sm:rounded-lg mx-0 sm:mx-4 mt-0 sm:mt-4 shadow-md max-w-none sm:max-w-7xl sm:left-1/2 sm:transform sm:-translate-x-1/2"
      }`}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/summit" passHref>
              <Image
                src="/assets/images/paan-summit-logo.svg"
                alt="PAAN Summit Logo"
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
              className={`p-2 sm:p-3 rounded-md ${currentTextColor} focus:outline-none hover:bg-gray-100 transition-colors`}
              aria-label="Toggle menu"
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
            <div className="flex space-x-0 flex-grow justify-center md:justify-center">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.href.replace('#', ''));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={getNavItemStyle(item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitch className="mr-2 xl:mr-3" />
            
            <button
              onClick={() => {
                const element = document.getElementById('form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-paan-red text-white px-3 xl:px-4 py-2 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-xs xl:text-sm shadow-lg flex items-center gap-1 xl:gap-2"
            >
              <Icon icon="mdi:arrow-down" className="w-3 h-3 xl:w-4 xl:h-4" />
              <span className="hidden xl:inline">Get Started</span>
              <span className="xl:hidden">Start</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg-custom:hidden`}>
          <div className="px-2 sm:px-4 pt-3 pb-4 space-y-2 bg-white rounded-none sm:rounded-lg shadow-lg border-t border-gray-200 sm:border border-gray-200">
            {/* Language Switcher for Mobile */}
            <div className="px-2 sm:px-4 py-3 border-b border-gray-200">
              <LanguageSwitch />
            </div>
            
            {menuItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              const mobileStyle = isActive 
                ? `text-paan-dark-blue bg-paan-yellow block px-3 sm:px-4 py-3 rounded-full transition-all duration-300 cursor-pointer text-sm sm:text-base font-medium`
                : `${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] block px-3 sm:px-4 py-3 rounded-full transition-all duration-300 cursor-pointer text-sm sm:text-base`;
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.href.replace('#', ''));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                  className={mobileStyle}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              onClick={() => {
                const element = document.getElementById('form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
                setIsMenuOpen(false);
              }}
              className="bg-paan-red text-white px-4 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full mt-4"
            >
              <Icon icon="mdi:arrow-down" className="w-4 h-4" />
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SpeakerApplicationHeader;
