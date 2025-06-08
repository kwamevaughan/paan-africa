// footer.js
"use client";

import NewsletterSignup from "@/components/NewsletterSignup";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { menuItems } from "../data/menuData";
import { useState, useEffect } from "react";

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
    <section className="bg-[#172840] pt-28 pb-8 text-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-0">
        {/* Top Section: Collaborate, Innovate, Dominate */}
        <div className="grid grid-cols-1 md:grid-cols-6 justify-items-center gap-4 text-center md:text-left">
          <p className="text-4xl font-medium">Collaborate</p>
          <span className="flex bg-[#F2B706] rounded-full w-8 h-8"></span>
          <p className="text-4xl font-medium">Innovate</p>
          <span className="flex bg-[#84C1D9] rounded-full w-8 h-8"></span>
          <p className="text-4xl font-medium">Dominate</p>
          <span className="flex bg-[#F25849] rounded-full w-8 h-8"></span>
        </div>
      </div>

      {/* Middle Section: Newsletter and Vertical Menu with Full-Width Background */}
      <div className="relative">
        {/* Background Image with Reduced Opacity */}
        <Image
          src="/assets/images/bg-pattern.svg"
          width={0}
          height={0}
          alt="Background Pattern"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-10"
        />
        {/* Content Container */}
        <section
          className="relative max-w-6xl mx-auto px-3 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20 pb-10 justify-items-start
 md:justify-items-end"
        >
          {/* Left: Newsletter Signup */}
          <div className="flex flex-col gap-8">
            <NewsletterSignup />

            <div>
              <ul className="flex gap-2">
                {/* Facebook */}
                <li className="group pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                  <Link
                    href="https://www.facebook.com/panafricanagencynetwork"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Icon
                      icon="ic:baseline-facebook"
                      width="32"
                      height="32"
                      className="text-gray-400 group-hover:text-[#1877F2]"
                    />
                  </Link>
                </li>

                {/* LinkedIn */}
                <li className="group pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                  <Link
                    href="https://www.linkedin.com/company/pan-african-agency-network"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Icon
                      icon="mdi:linkedin"
                      width="32"
                      height="32"
                      className="text-gray-400 group-hover:text-[#0077B5]"
                    />
                  </Link>
                </li>

                {/* Instagram */}
                <li className="group pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                  <Link
                    href="https://instagram.com/pan_african_agency_network"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Icon
                      icon="mingcute:instagram-fill"
                      width="32"
                      height="32"
                      className="text-gray-400 group-hover:text-[#E4405F]"
                    />
                  </Link>
                </li>

                {/* X (formerly Twitter) */}
                <li className="group pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                  <Link
                    href="https://x.com/paan_network"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                  >
                    <Icon
                      icon="iconoir:x"
                      width="32"
                      height="32"
                      className="text-gray-400 group-hover:text-black"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Vertical Menu */}
          <div className="flex flex-col gap-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-normal text-gray-200 hover:text-white hover:underline transition-all duration-300 cursor-pointer"
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
        <p className="pt-10 border-t border-gray-400 text-center text-gray-200 text-sm">
          © {currentYear} PAAN. All rights reserved. |
          <Link
            href="/privacy-policy"
            className="ml-2 text-white hover:text-[#84c1d9]"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Footer;
