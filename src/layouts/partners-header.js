"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PartnersPageMenu, ctaButton } from "../data/menuData";
import { useFixedHeader } from "../../utils/scrollUtils";

const Header = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("For Partners"); // Set default active nav
  const isFixed = useFixedHeader();
  
  // Determine the current text color based on scroll position
  const currentTextColor = isFixed ? "text-gray-950" : navLinkColor;

  const handleNavClick = (e, href, label) => {
    setActiveNav(label);
    setIsMenuOpen(false); // Close mobile menu when item is clicked
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`w-full pb-4 sm:pb-0 z-50 transition-all duration-300 overflow-hidden top-0 left-0 fixed$${
        isFixed
          ? " top-0 left-0 shadow-lg backdrop-blur-md bg-white/95"
          : " top-0 left-0 bg-white"
      }`}
    >
      <div className="w-full px-4 lg-custom:px-8 relative">
        <div className="flex items-center justify-between py-2 relative lg-custom:py-2 py-0">
          {/* Header Pattern - Left Side with perfect alignment */}
          <div className="hidden lg-custom:flex absolute left-0 lg-custom:left-0 top-0 bottom-0 items-center pr-4 z-0">
            <Image
              src="/assets/images/header-pattern.svg"
              alt="Header Pattern"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>

          {/* Logo - Left Side (with margin to account for pattern) */}
          <div className="flex-shrink-0 ml-0 lg-custom:ml-20 relative z-10">
            <Link href="/" passHref>
              <Image
                src="/assets/images/partners-logo.svg"
                alt="Logo"
                width={160}
                height={56}
                className="w-auto h-10 lg-custom:w-[200px] lg-custom:h-[70px] object-contain"
                priority
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="lg-custom:hidden flex items-center relative z-20">
            <button
              onClick={handleMenuToggle}
              className={`p-2 rounded-lg ${currentTextColor} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F2B706] transition-colors duration-200`}
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
          <div className="hidden lg-custom:flex lg-custom:items-center lg-custom:space-x-4 w-full justify-end relative z-10">
            <div className="flex space-x-0 flex-grow justify-center md:justify-center">
              {PartnersPageMenu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
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
          className={`lg-custom:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-20 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center">
              <Image
                src="/assets/images/partners-page-logo.png"
                alt="Logo"
                width={110}
                height={39}
                className="w-auto h-8 object-contain"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F2B706]"
              aria-label="Close navigation menu"
            >
              <svg
                className="h-6 w-6 text-gray-600"
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
          <div className="flex flex-col h-screen bg-white">
            <div className="flex-1 px-4 py-6 space-y-3 bg-white overflow-y-auto">
              {PartnersPageMenu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
                  className={`${
                    activeNav === item.label 
                      ? "bg-[#F2B706] text-gray-900 shadow-sm" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-[#F2B706]"
                  } flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium`}
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <div className="p-4 bg-white">
              <a
                href="https://membership.paan.africa/"
                className="w-full bg-paan-red text-white px-6 py-4 rounded-xl text-base font-bold hover:bg-paan-red transition duration-300 cursor-pointer flex items-center justify-center shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {ctaButton.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;