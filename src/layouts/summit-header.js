"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { menuItems, ctaButton } from "../data/summitMenu";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";
import LanguageSwitch from "../components/LanguageSwitch";

const Header = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFixed = useFixedHeader();
  
  // Use PAAN dark blue color for text always
  const currentTextColor = "text-[#172840]";

  return (
    <nav
      className={`w-full z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-1/2 transform -translate-x-1/2 shadow-lg backdrop-blur-md bg-white rounded-lg mx-4 mt-4 max-w-7xl"
          : "absolute left-1/2 transform -translate-x-1/2 bg-white rounded-lg mx-4 mt-4 shadow-md max-w-7xl"
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
                className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto"
              />
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
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href, isFixed)}
                  className={`${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitch className="mr-3" />
            
            <a
              href="https://membership.paan.africa/"              
              className={ctaButton.className}
            >
              {ctaButton.label}
            </a>
          </div>
        </div>

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg-custom:hidden`}>
          <div className="px-3 sm:px-4 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Language Switcher for Mobile */}
            <div className="px-3 sm:px-4 py-3 border-b border-gray-200">
              <LanguageSwitcher />
            </div>
            
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleScroll(e, item.href, isFixed);
                  setIsMenuOpen(false);
                }}
                className={`${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] block px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaButton.href}              
              className={ctaButton.mobileClassName}
            >
              {ctaButton.label}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;