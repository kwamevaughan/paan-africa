"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { menuItems, ctaButton } from "../data/summitMenu";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";

const Header = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFixed = useFixedHeader();
  
  // Determine the current text color based on scroll position
  const currentTextColor = isFixed ? "text-white" : navLinkColor;

  return (
    <nav
      className={`w-full z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 shadow-lg backdrop-blur-md bg-[#172840]"
          : "absolute bg-transparent"
      }`}
    >
      <div className="w-full px-4 lg-custom:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <Image
                src="/assets/images/summit-logo.png"
                alt="Logo"
                width={200}
                height={70}
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
          <div className="hidden lg-custom:flex lg-custom:items-center lg-custom:space-x-4 w-full justify-end">
            <div className="flex space-x-0 flex-grow justify-center md:justify-center">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href, isFixed)}
                  className={`${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] px-4 py-2 rounded-full transition-all duration-300 cursor-pointer`}
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

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg-custom:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#172840] rounded-lg shadow-lg">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleScroll(e, item.href, isFixed);
                  setIsMenuOpen(false);
                }}
                className={`${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706] block px-4 py-2 rounded-full transition-all duration-300 cursor-pointer`}
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