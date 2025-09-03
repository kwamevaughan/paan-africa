// footer.js
"use client";

import NewsletterSignup from "@/components/NewsletterSignup";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { menuItems } from "../data/menuData";
import { useState, useEffect, useMemo } from "react";
import { useAppTranslations } from '../hooks/useTranslations';

const Footer = () => {
  const { t } = useAppTranslations();
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScrollEvent = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          if (scrolled !== isHeaderFixed) {
            setIsHeaderFixed(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [isHeaderFixed]);

  // Preload critical images
  useEffect(() => {
    const preloadImages = [
      "/assets/images/bg-pattern.webp",
      "/assets/images/footer-pattern.svg",
      "/assets/images/paan-academy/logo.webp"
    ];

    preloadImages.forEach(src => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  // Optimized smooth scroll function
  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerElement = document.querySelector("nav");
      const headerHeight = headerElement?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition - (isHeaderFixed ? headerHeight : 0),
        behavior: "smooth",
      });
    }
  };

  // Social media links with lazy loading consideration
  const socialLinks = useMemo(() => [
    {
      href: "https://www.facebook.com/panafricanagencynetwork",
      icon: "ic:baseline-facebook",
      label: "Facebook",
      hoverColor: "#1877F2"
    },
    {
      href: "https://www.linkedin.com/company/pan-african-agency-network",
      icon: "mdi:linkedin",
      label: "LinkedIn",
      hoverColor: "#0077B5"
    },
    {
      href: "https://instagram.com/pan_african_agency_network",
      icon: "mingcute:instagram-fill",
      label: "Instagram",
      hoverColor: "#E4405F"
    },
    {
      href: "https://x.com/paan_network",
      icon: "iconoir:x",
      label: "X",
      hoverColor: "#000000"
    }
  ], []);

  return (
    <section className="bg-[#172840] pt-28 pb-8 text-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-0">
        {/* Top Section: Collaborate, Innovate, Dominate */}
        <div className="grid grid-cols-1 md:grid-cols-6 justify-items-center gap-4 text-center md:text-left">
          <p className="text-4xl font-medium">{t('homepage.footer.motto.collaborate')}</p>
          <span className="flex bg-[#F2B706] rounded-full w-8 h-8"></span>
          <p className="text-4xl font-medium">{t('homepage.footer.motto.innovate')}</p>
          <span className="flex bg-[#84C1D9] rounded-full w-8 h-8"></span>
          <p className="text-4xl font-medium">{t('homepage.footer.motto.dominate')}</p>
          <span className="flex bg-[#F25849] rounded-full w-8 h-8"></span>
        </div>
      </div>

      {/* Middle Section: Newsletter, Tools, and Vertical Menu with Full-Width Background */}
      <div className="relative">
        {/* Background Image with Reduced Opacity - Optimized loading */}
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
          <Image
            src="/assets/images/bg-pattern.svg"
            fill
            alt=""
            className="object-cover"
            priority={false}
            loading="lazy"
            sizes="100vw"
          />
        </div>
        
        {/* Content Container */}
        <section className="relative max-w-6xl mx-auto px-3 sm:px-0 grid grid-cols-1 sm:grid-cols-4 gap-8 mt-20 pb-10 z-10">
          {/* Left: Newsletter Signup */}
          <div className="flex flex-col gap-8">
            <NewsletterSignup />

            <div>
              <ul className="flex gap-2">
                {socialLinks.map(({ href, icon, label, hoverColor }) => (
                  <li 
                    key={label}
                    className="group pb-4 hover:translate-y-[-4px] transition-transform duration-300"
                  >
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      <Icon
                        icon={icon}
                        width="32"
                        height="32"
                        className="text-gray-400"
                        style={{
                          '--hover-color': hoverColor,
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = hoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '';
                        }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center: Tools Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white mb-2">{t('homepage.footer.tools')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/ai-brief-builder"
                  className="font-normal text-gray-200 hover:text-white hover:underline transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <Icon icon="fa-solid:magic" className="w-4 h-4" />
                  {t('homepage.footer.aiBriefBuilder')}
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/talent-discovery"
                  className="font-normal text-gray-200 hover:text-white hover:underline transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <Icon icon="lucide:map-pin" className="w-4 h-4" />
                  Talent Discovery
                </Link>
              </li> */}
              {/* More tools here as they become available */}
            </ul>
          </div>

          {/* PAAN Academy Professional Section */}
          <div className="flex flex-col items-center gap-4">
            <Link href="/academy" className="flex flex-col items-center">
              <Image
                src="/assets/images/paan-academy/logo.svg"
                width={144}
                height={144}
                alt="PAAN Academy Logo"
                className="mb-2 object-contain w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
                loading="lazy"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
              />
            </Link>
          </div>

          {/* Right: Vertical Menu */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white mb-2">{t('homepage.footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-normal text-gray-200 hover:text-white hover:underline transition-all duration-300 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Footer Bottom Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-0">
        <p className="pt-10 pb-24 border-t border-gray-400 text-center text-gray-200 text-sm relative z-10">
          © {currentYear} PAAN. {t('homepage.footer.copyright')} |
          <Link
            href="/privacy-policy"
            className="ml-2 text-white hover:text-[#84c1d9] transition-colors duration-300"
          >
            {t('homepage.footer.privacyPolicy')}
          </Link>
        </p>
      </div>

      {/* Footer Pattern - Optimized */}
      <div className="absolute bottom-0 left-0 w-full h-[20px] sm:h-[30px] md:h-[40px] z-0">
        <Image
          src="/assets/images/footer-pattern.svg"
          fill
          alt=""
          className="object-cover"
          loading="lazy"
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default Footer;