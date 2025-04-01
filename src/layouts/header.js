'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { menuItems, ctaButton } from '../data/menuData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // Function to handle smooth scrolling with offset for fixed header
  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = document.querySelector('nav').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - (isFixed ? headerHeight : 0),
        behavior: 'smooth',
      });
    }
    // Close mobile menu after clicking a link
    setIsMenuOpen(false);
  };

  // Add scroll event listener to toggle fixed header
  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <nav
      className={`bg-white w-full z-50 transition-all duration-300 ${
        isFixed
          ? 'fixed top-0 left-0 shadow-lg backdrop-blur-md bg-white/80'
          : 'relative'
      }`}
    >
      {/* Full width container for header */}
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
              className="p-2 rounded-md text-gray-950 focus:outline-none"
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
            {/* Menu Items */}
            <div className="flex space-x-0 flex-grow justify-center md:justify-center">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className=" text-gray-950 hover:text-gray-900 hover:bg-[#F2B706] px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
            {/* CTA */}
            <a
              href={ctaButton.href}
              onClick={(e) => handleScroll(e, ctaButton.href)}
              className={ctaButton.className}
            >
              {ctaButton.label}
            </a>
          </div>
        </div>

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg-custom:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-gray-950 hover:text-gray-900 hover:bg-[#F2B706] block px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaButton.href}
              onClick={(e) => handleScroll(e, ctaButton.href)}
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
