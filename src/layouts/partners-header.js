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
  };

  return (
    <nav
      className={`w-full z-20 transition-all duration-300 overflow-hidden ${
        isFixed
          ? "fixed top-0 left-0 shadow-lg backdrop-blur-md bg-white"
          : "absolute bg-white"
      }`}
    >
      <div className="w-full px-4 lg-custom:px-8 relative">
        <div className="flex items-center justify-between py-2 relative">
          {/* Header Pattern - Left Side with perfect alignment */}
          <div className="absolute left-0 lg-custom:left-0 top-0 bottom-0 flex items-center pr-4 z-0">
            <Image
              src="/assets/images/header-pattern.png"
              alt="Header Pattern"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>

          {/* Logo - Left Side (with margin to account for pattern) */}
          <div className="flex-shrink-0 ml-20 relative z-10">
            <Link href="/" passHref>
              <Image
                src="/assets/images/partners-page-logo.png"
                alt="Logo"
                width={200}
                height={70}
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="lg-custom:hidden flex items-center relative z-10">
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

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg-custom:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
            {PartnersPageMenu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href, item.label);
                  setIsMenuOpen(false);
                }}
                className={`${
                  activeNav === item.label 
                    ? "bg-[#F2B706] text-gray-900" 
                    : `${currentTextColor} hover:text-gray-900 hover:bg-[#F2B706]`
                } block px-4 py-2 rounded-full transition-all duration-300 cursor-pointer`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://membership.paan.africa/"            
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