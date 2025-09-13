"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFixedHeader } from "../../utils/scrollUtils";
import LanguageSwitch from "../components/LanguageSwitch";

const PaanMaHeader = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("vision");
  const isFixed = useFixedHeader();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["vision", "partnership", "how-it-works", "who-should-join"];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "Vision", id: "vision" },
    { name: "Partnership", id: "partnership" },
    { name: "How it works", id: "how-it-works" },
    { name: "Who should join", id: "who-should-join" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isFixed 
          ? 'bg-white shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={isFixed ? "/assets/images/logo.webp" : "/assets/images/ma-program/white-logo.svg"}
                alt="PAAN Logo"
                width={140}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-full ${
                  activeSection === item.id
                    ? 'bg-[#F2B706] text-[#172840] shadow-md'
                    : isFixed 
                      ? 'text-gray-900 hover:text-paan-red hover:bg-gray-100' 
                      : 'text-white hover:text-paan-red hover:bg-white/10'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Language Switcher and CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitch />
            
            {/* CTA Button */}
            <button
              onClick={openModal}
              className="bg-paan-dark-blue text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F2B706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isFixed 
                  ? 'text-gray-900 hover:text-paan-red' 
                  : 'text-white hover:text-paan-red'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation items */}
              <div className="flex-1 px-4 pb-4">
                {/* Language Switcher for Mobile */}
                <div className="px-4 py-3 border-b border-gray-200 mb-4">
                  <LanguageSwitch />
                </div>
                
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
                        activeSection === item.id
                          ? 'bg-[#F2B706] text-[#172840]'
                          : 'text-gray-900 hover:text-paan-red hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                
                {/* CTA Button */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      openModal();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-paan-dark-blue text-white px-4 py-3 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F2B706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </header>
  );
};

export default PaanMaHeader;
