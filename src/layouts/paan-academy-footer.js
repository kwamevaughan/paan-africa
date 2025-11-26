// footer.js
"use client";

import { menuItems } from "../data/menuData";
import { useState, useEffect } from "react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  // Check scroll position to determine if header is fixed
  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 50) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  // Function to handle smooth scrolling with offset for fixed header
  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = document.querySelector("nav").offsetHeight;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - (isHeaderFixed ? headerHeight : 0),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gray-300 pt-28 pb-8 text-paan-dark-blue">
    
      <div className="relative">     
        <section
          className="relative max-w-6xl mx-auto px-3 sm:px-0 grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pb-10"
        >
          
          {/* Left: Logo */}
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <Image
                src="/assets/images/paan-academy/dark-logo.svg"
                alt="PAAN Academy Logo"
                width={200}
                height={72}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-paan-dark-blue text-sm leading-relaxed">
                PAAN Academy is an initiative of the Pan African Agency Network.
            </p>
          </div>

          {/* Center: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-paan-dark-blue mb-2">Contact Us</h3>
            <div className="space-y-2 text-paan-dark-blue">
              <p className="text-sm">Email: secretariat@paan.africa</p>
              <p className="text-sm">Phone: +254701 850 850</p>
              <p className="text-sm">Address: 7th Floor, Mitsumi Business Park, Westlands, Nairobi, Kenya</p>
            </div>
          </div>
          
          {/* Right: Vertical Menu */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-paan-dark-blue mb-2">Quick Links</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-normal text-paan-dark-blue hover:text-paan-dark-blue/80 hover:underline transition-all duration-300 cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Footer Bottom Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-0">
        <p className="pt-10 pb-24 border-t border-gray-400 text-left text-paan-dark-blue text-sm relative z-10">
          © {currentYear} PAAN Africa. All rights reserved.         
        </p>
      </div>
    </section>
  );
};

export default Footer;
