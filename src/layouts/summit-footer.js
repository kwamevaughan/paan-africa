import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useMemo } from "react";

const SummitFooter = () => {
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
    <footer 
      className="text-white relative"
      style={{
        backgroundImage: 'url(https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-footer-pattern.webp), linear-gradient(to right, #84C1D9, #172840)',
        backgroundRepeat: 'repeat, no-repeat',
        backgroundPosition: 'center, center',
        backgroundSize: 'auto, cover'
      }}
    >
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {/* Summit Info */}
             <div className="w-full">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-logo-white.svg" alt="Summit Logo" width={300} height={300} />
             </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-white/80 hover:text-paan-red transition-colors">
                    About PAAN
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-white/80 hover:text-paan-red transition-colors">
                    Membership
                  </a>
                </li>
                <li>
                  <a href="/paan-awards" className="text-white/80 hover:text-paan-red transition-colors">
                    PAAN Awards
                  </a>
                </li>
                <li>
                  <a href="https://membership.paan.africa/" className="text-white/80 hover:text-paan-red transition-colors">
                    Join PAAN
                  </a>
                </li>
                <li>
                  <a href="/summit/travel-guide" className="text-white/80 hover:text-paan-red transition-colors">
                    Plan Your Trip
                  </a>
                </li>
              </ul>
            </div>

             {/* Newsletter & Social */}
             <div className="space-y-4">
               <NewsletterSignup />
               
               {/* Social Links */}
              <div className="pt-4">
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
          </div>

        
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-sm">
                  © 2026 Pan African Agency Network. All rights reserved.
                </span>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="/privacy-policy" className="text-white/80 hover:text-paan-red transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms-and-conditions" className="text-white/80 hover:text-paan-red transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SummitFooter;
