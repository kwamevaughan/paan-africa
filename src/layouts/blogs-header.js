"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { freelancersMenu, ctaButton } from "../data/menuData";
import { useFixedHeader } from "../../utils/scrollUtils";

const Header = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Blogs"); 
  const isFixed = useFixedHeader();
  
  // Determine the current text color based on scroll position
  const currentTextColor = isFixed ? "text-gray-950" : navLinkColor;

  const handleNavClick = (label) => {
    setActiveNav(label);
  };

  return (
    <nav
      className={`w-full z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 shadow-lg backdrop-blur-md bg-white/80"
          : "absolute bg-white"
      }`}
    >
      <div className="w-full px-4 lg-custom:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <Image
                src="/assets/images/logo.svg"
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
              {freelancersMenu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.label)}
                  className={`${
                    activeNav === item.label 
                      ? "bg-paan-yellow text-gray-900" 
                      : `${currentTextColor} hover:text-gray-900 hover:bg-paan-yellow`
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
            {freelancersMenu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.label)}
                className={`${
                  activeNav === item.label 
                    ? "bg-paan-yellow text-gray-900" 
                    : `${currentTextColor} hover:text-gray-900 hover:bg-paan-yellow`
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