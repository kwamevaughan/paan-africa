"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { freelancersMenu, ctaButton } from "../data/menuData";
import { useFixedHeader } from "../../utils/scrollUtils";

const Header = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("For Clients"); 
  const isFixed = useFixedHeader();
  
  // Determine the current text color based on scroll position
  const currentTextColor = isFixed ? "text-white" : navLinkColor;

  const handleNavClick = (label) => {
    setActiveNav(label);
    setIsMenuOpen(false); // Close mobile menu when item is clicked
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`w-full text-white z-50 transition-all duration-300 fixed top-0 left-0
        ${isFixed ? "shadow-lg backdrop-blur-md text-white bg-[#172840]/95" : "bg-transparent"}
      `}
    >
      <div className="w-full px-4 sm:px-6 lg-custom:px-8 text-white">
        <div className="flex items-center justify-between h-16 sm:h-18 lg-custom:h-20">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0 z-20">
            <Link href="/" passHref>
              <Image
                src="/assets/images/clients-logo.svg"
                alt="Logo"
                width={200}
                height={70}
                style={{ objectFit: 'contain', height: 'auto', width: 'auto', maxWidth: 120, maxHeight: 70 }}
                priority
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="lg-custom:hidden flex items-center z-20">
            <button
              onClick={handleMenuToggle}
              className={`p-2 rounded-lg ${currentTextColor} hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F2B706] transition-colors duration-200`}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
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
          <div className="hidden lg-custom:flex lg-custom:items-center lg-custom:space-x-4 w-full justify-end">
            <div className="flex space-x-0 flex-grow justify-center md:justify-center">
              {freelancersMenu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.label)}
                  className={`${
                    activeNav === item.label 
                      ? "bg-[#F2B706] text-gray-900" 
                      : `${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706]`
                  } px-4 py-2 rounded-full transition-all duration-300 cursor-pointer`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="https://membership.paan.africa/"
              className={ctaButton.className}
            >
              {ctaButton.label}
            </a>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg-custom:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div 
          className={`lg-custom:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-[#172840] shadow-2xl transform transition-transform duration-300 ease-in-out z-20 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#172840]">
            <div className="flex items-center">
              <Image
                src="/assets/images/clients-logo.svg"
                alt="Logo"
                width={110}
                height={39}
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F2B706]"
              aria-label="Close navigation menu"
            >
              <svg
                className="h-6 w-6 text-white"
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

          {/* Mobile Menu Content */}
          <div className="flex flex-col h-screen bg-[#172840]">
            <div className="flex-1 px-4 py-6 space-y-3 bg-[#172840] overflow-y-auto">
              {freelancersMenu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.label)}
                  className={`
                    ${activeNav === item.label 
                      ? "bg-[#F2B706] text-gray-900 shadow-sm" 
                      : "text-white hover:text-gray-900 hover:bg-[#F2B706]"}
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium
                  `}
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
            {/* Mobile CTA Button - Hidden */}
            {/* CTA button is hidden on mobile as per requirements */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;