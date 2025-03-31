// header.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { menuItems, ctaButton } from '../data/menuData'; // Import shared data

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-6">
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
          <div className="sm:hidden flex items-center">
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
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {/* Menu Items */}
            <div className="flex space-x-2">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-gray-950 hover:text-gray-900 hover:bg-[#F2B706] px-4 py-2 rounded-full transition-all duration-300">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
            {/* CTA */}
            <Link href={ctaButton.href}>
              <span className={ctaButton.className}>
                {ctaButton.label}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu (shown when hamburger is clicked) */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className="text-gray-950 hover:text-gray-900 hover:bg-[#F2B706] block px-3 py-2 rounded-full transition-all duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href={ctaButton.href}>
              <span className={ctaButton.mobileClassName}>
                {ctaButton.label}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;