// footer.js
'use client';

import NewsletterSignup from '@/components/NewsletterSignup';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '../data/menuData'; // Import shared menu items

const Footer = () => {
  return (
    <section className="bg-[#172840] pt-28 pb-8 text-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-0">
        {/* Top Section: Collaborate, Innovate, Dominate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <p className="text-4xl font-medium">Collaborate</p>
          <p className="text-4xl font-medium">Innovate</p>
          <p className="text-4xl font-medium">Dominate</p>
        </div>

        {/* Middle Section: Newsletter and Vertical Menu */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20 pb-10 justify-items-end">
          {/* Left: Newsletter Signup */}
          <div className="flex flex-col gap-8">
            <NewsletterSignup />
          </div>

          {/* Right: Vertical Menu */}
          <div className="flex flex-col gap-4">

            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-gray-200 hover:text-white hover:underline transition-all duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        <p className='pt-10 border-t border-gray-400 text-center text-gray-200 font-light text-sm'>© 2025 PAAN. All rights reserved. | Privacy Policy</p>

      </div>
    </section>
  );
};

export default Footer;