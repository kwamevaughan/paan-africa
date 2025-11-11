"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFixedHeader } from "../../utils/scrollUtils";
import LanguageSwitch from "../components/LanguageSwitch";
import { Icon } from "@iconify/react";

const Header = ({ navLinkColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFixed = useFixedHeader();
  
  // Use PAAN dark blue color for text always
  const currentTextColor = "text-[#172840]";

  return (
    <nav
      className={`w-full z-10 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 right-0 shadow-lg backdrop-blur-md bg-white rounded-none sm:rounded-lg mx-0 sm:mx-4 mt-0 sm:mt-4 max-w-none sm:max-w-7xl sm:left-1/2 sm:transform sm:-translate-x-1/2"
          : "fixed top-0 left-0 right-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 bg-white rounded-none sm:rounded-lg mx-0 sm:mx-4 mt-0 sm:mt-4 shadow-md max-w-none sm:max-w-7xl"
      }`}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Back Button and Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
                        
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
          </div>

          {/* Hamburger Menu Button (mobile only) */}
          <div className="lg-custom:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 sm:p-3 rounded-md ${currentTextColor} focus:outline-none`}
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

          {/* Desktop Menu (hidden on mobile) */}
          <div className="hidden lg-custom:flex lg-custom:items-center lg-custom:justify-center lg-custom:flex-1">
            {/* Navigation Menu Items - Centered */}
            <div className="flex space-x-1 xl:space-x-2">
              <Link 
                href="/paan-awards"
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                PAAN Awards
              </Link>
              <Link 
                href="/summit/travel-guide"
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                Travel Guide
              </Link>
              <Link 
                href="/masterclasses"
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                Masterclasses
              </Link>
              <Link 
                href="/contact-us"
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                Contact
              </Link>
              <Link 
                href="/faqs"
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                FAQs
              </Link>
            </div>
          </div>

          {/* Right Side Actions (Language Switcher & Help) */}
          <div className="hidden lg-custom:flex lg-custom:items-center lg-custom:space-x-2 xl:space-x-3">
            {/* Language Switcher */}
            <LanguageSwitch />
            
            {/* Help/Support Button */}
            <Link 
              href="mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Ticket Purchase Support&body=Hello PAAN Support Team,%0D%0A%0D%0AI need assistance with my ticket purchase for the PAAN Summit 2026.%0D%0A%0D%0APlease help me with:%0D%0A- [ ] Payment issues%0D%0A- [ ] Ticket selection%0D%0A- [ ] Registration process%0D%0A- [ ] Other: _________________%0D%0A%0D%0AAdditional details:%0D%0A%0D%0A%0D%0AThank you for your assistance.%0D%0A%0D%0ABest regards"
              className="bg-paan-blue text-paan-dark-blue px-4 py-2 rounded-full text-sm font-medium hover:bg-paan-blue/90 transition-all duration-300 flex items-center space-x-2"
            >
              <Icon icon="mdi:help-circle-outline" className="h-4 w-4" />
              <span>Get Help</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg-custom:hidden`}>
          <div className="px-3 sm:px-4 pt-2 pb-3 space-y-1 bg-white rounded-none sm:rounded-lg shadow-lg border-t border-gray-200 sm:border border-gray-200">
            {/* Navigation Menu Items for Mobile */}
            <div className="px-3 sm:px-4 py-3 space-y-2">
              <Link 
                href="/summit#paan-awards-section"
                onClick={() => setIsMenuOpen(false)}
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] block px-4 py-3 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                PAAN Awards
              </Link>
              <Link 
                href="/summit#plan-your-trip"
                onClick={() => setIsMenuOpen(false)}
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] block px-4 py-3 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                Travel Guide
              </Link>
              <Link 
                href="/summit#masterclasses-section"
                onClick={() => setIsMenuOpen(false)}
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] block px-4 py-3 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                Masterclasses
              </Link>
              <Link 
                href="/summit#contact-section"
                onClick={() => setIsMenuOpen(false)}
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] block px-4 py-3 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                Contact
              </Link>
              <Link 
                href="/summit#faq-section"
                onClick={() => setIsMenuOpen(false)}
                className={`${currentTextColor} hover:text-paan-dark-blue hover:bg-[#F2B706] block px-4 py-3 rounded-full transition-all duration-300 text-sm font-medium`}
              >
                FAQs
              </Link>
            </div>
            
            {/* Language Switcher for Mobile */}
            <div className="px-3 sm:px-4 py-3 border-t border-gray-200">
              <LanguageSwitch />
            </div>
            
            {/* Help/Support Button for Mobile */}
            <div className="px-3 sm:px-4 py-3 border-t border-gray-200">
              <Link 
                href="mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Ticket Purchase Support&body=Hello PAAN Support Team,%0D%0A%0D%0AI need assistance with my ticket purchase for the PAAN Summit 2026.%0D%0A%0D%0APlease help me with:%0D%0A- [ ] Payment issues%0D%0A- [ ] Ticket selection%0D%0A- [ ] Registration process%0D%0A- [ ] Other: _________________%0D%0A%0D%0AAdditional details:%0D%0A%0D%0A%0D%0AThank you for your assistance.%0D%0A%0D%0ABest regards"
                className="bg-paan-blue text-paan-dark-blue block px-4 py-3 rounded-full text-sm font-medium hover:bg-paan-blue/90 transition-all duration-300 flex items-center space-x-2"
              >
                <Icon icon="mdi:help-circle-outline" className="h-4 w-4" />
                <span>Get Help with Purchase</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;