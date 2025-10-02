import { useState, useEffect } from 'react';
import LanguageSwitch from '@/components/LanguageSwitch';
import { ChevronDown, Menu, X, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Get current path for active state detection
    setCurrentPath(window.location.pathname);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint
        setIsMobileMenuOpen(false);
        setExpandedMobileSection(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = {
    'Join Us': [
      { label: 'Full Agency Membership', href: '/pricing' },
      { label: 'For Freelancers', href: '/freelancers' },
      { label: 'For Clients', href: '/clients' },
      { label: 'For Partners', href: '/partners' },
      { label: 'Careers', href: '/careers' },
    ],
    'Programs': [
      { label: 'M&A', href: '/paan-ma-program' },
      { label: 'Ambassadors', href: '/paan-ambassador' },
      { label: 'PAAN Academy', href: '/academy' },
    ],
    'Events': [
      { label: '2026 Summit', href: '/summit' },
      { label: 'PAAN Awards', href: '/paan-awards' },
      { label: 'Webinars', href: '/events' },
    ],
    'Resources': [
      { label: 'Portal', href: 'https://member-portal.paan.africa/' },
      { label: 'Apply to Join Us', href: 'https://membership.paan.africa/' },
      { label: 'Full Member Benefits', href: '/pricing' },
      { label: 'AI Brief Builder', href: '/ai-brief-builder' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'PAAN Insights', href: '/blogs' },
    ],
  };  

  const handleMouseEnter = (item) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(item);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setExpandedMobileSection(null);
    }
  };

  const toggleMobileSection = (section) => {
    setExpandedMobileSection(expandedMobileSection === section ? null : section);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileSection(null);
  };

  // Helper function to check if we're on the home page
  const isHomePage = currentPath === '/';

  // Helper function to check if a menu item is active
  const isMenuActive = (href) => {
    return currentPath === href;
  };

  // Helper function to check if any submenu item is active
  const isSubmenuActive = (subItems) => {
    return subItems.some(item => currentPath === item.href);
  };

  // Helper function to get menu item classes
  const getMenuItemClasses = (href = null, isDropdown = false, subItems = null) => {
    const isActive = href ? isMenuActive(href) : (subItems ? isSubmenuActive(subItems) : false);
    
    const baseClasses = `px-3 py-2 text-sm font-medium transition-all duration-200 rounded-full whitespace-nowrap`;
    
    if (isActive) {
      return `${baseClasses} bg-paan-yellow text-slate-900 hover:bg-yellow-300`;
    }
    
    // Different colors based on page and scroll state
    if (isHomePage && !isScrolled) {
      // On home page before scroll - dark blue text
      return `${baseClasses} text-paan-dark-blue hover:text-[#84C1D9] hover:bg-[#84C1D9]/10`;
    } else {
      // Scrolled or other pages - white text
      return `${baseClasses} text-white hover:text-[#84C1D9] hover:bg-white/10`;
    }
  };

  // Helper function to get logo classes
  const getLogoClasses = () => {
    if (isHomePage && !isScrolled) {
      // On home page before scroll - show normal logo (no invert)
      return 'h-10 sm:h-12 lg:h-16 w-auto transition-all duration-300';
    } else {
      // Scrolled or other pages - show inverted logo
      return 'h-10 sm:h-12 lg:h-16 w-auto brightness-0 invert transition-all duration-300';
    }
  };

  // Helper function to get mobile menu button classes
  const getMobileButtonClasses = () => {
    if (isMobileMenuOpen) {
      return 'text-slate-600 bg-white/90';
    }
    
    if (isHomePage && !isScrolled) {
      return 'text-paan-dark-blue hover:text-[#84C1D9] hover:bg-[#84C1D9]/10';
    } else {
      return 'text-white hover:text-[#84C1D9] hover:bg-white/10';
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-paan-dark-blue backdrop-blur-md shadow-lg border-b border-paan-dark-blue' 
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 z-50">
            <img 
              src="https://ik.imagekit.io/nkmvdjnna/PAAN/paan-final-logo.svg" 
              alt="PAAN Logo" 
              className={getLogoClasses()}
            />
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden xl:block">
            <div className="flex items-center space-x-2">
              {/* Home */}
              <a 
                href="/" 
                className={getMenuItemClasses('/')}
              >
                Home
              </a>

              {/* About Us */}
              <a 
                href="/about" 
                className={getMenuItemClasses('/about')}
              >
                About
              </a>

              {/* Dropdown Menus */}
              {Object.entries(menuItems).map(([menuName, subItems]) => {
                const isActive = isSubmenuActive(subItems);
                const textColorClass = isHomePage && !isScrolled 
                  ? (isActive ? 'bg-yellow-400 text-paan-dark-blue hover:bg-yellow-300' : 'text-paan-dark-blue hover:text-[#84C1D9] hover:bg-[#84C1D9]/10')
                  : (isActive ? 'bg-yellow-400 text-paan-dark-blue hover:bg-yellow-300' : 'text-white hover:text-[#84C1D9] hover:bg-white/10');
                
                return (
                  <div
                    key={menuName}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(menuName)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-full whitespace-nowrap ${textColorClass}`}
                    >
                      <span>{menuName === 'Join Us' ? 'Join' : menuName}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === menuName ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Dropdown */}
                    {activeDropdown === menuName && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-3 z-10"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-gray-100 mb-2">
                          {menuName}
                        </div>
                        {subItems.map((subItem, index) => (
                          <a
                            key={index}
                            href={subItem.href}
                            className={`block px-4 py-2.5 text-sm transition-colors duration-200 mx-2 rounded-lg ${
                              isMenuActive(subItem.href)
                                ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-300'
                                : 'text-slate-600 hover:bg-[#84C1D9]/10 hover:text-[#84C1D9]'
                            }`}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Awards */}
              <a 
                href="/summit" 
                className={getMenuItemClasses('/summit')}
              >
                2026 Summit
              </a>

              {/* Contact Us */}
              <a 
                href="/contact-us" 
                className={getMenuItemClasses('/contact-us')}
              >
                Contact
              </a>
            </div>
          </div>          

          {/* CTA Buttons - Hidden on mobile, shown on tablet+ */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Switcher */}
            <LanguageSwitch className="mr-3" />
            <button 
              onClick={() => window.location.href = 'https://member-portal.paan.africa/'}
              className={`px-4 lg:px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                isScrolled 
                  ? 'bg-[#172840] text-white hover:bg-[#1a2d47]' 
                  : 'bg-[#172840] text-white hover:bg-[#1a2d47]'
              }`}
            >
              Access Portal
            </button>
            <button 
              onClick={() => window.location.href = 'https://membership.paan.africa/'}
              className="px-4 lg:px-6 py-2.5 text-sm font-medium bg-[#F25849] text-white rounded-full hover:bg-[#e04537] transition-all duration-200 whitespace-nowrap"
            >
              Join Network
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden z-50">
            <button
              onClick={toggleMobileMenu}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ${getMobileButtonClasses()}`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay - FIXED POSITIONING */}
        {isMobileMenuOpen && (
          <div className={`xl:hidden fixed inset-0 bg-white z-40 overflow-y-auto ${
            isScrolled ? 'top-16 sm:top-20' : 'top-16 sm:top-20 lg:top-24'
          }`}>
            <div className="px-4 py-6 space-y-1 max-h-screen">
              {/* Main Navigation Links */}
              <a 
                href="/" 
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-4 text-lg font-medium transition-colors duration-200 rounded-xl border-b border-gray-100 ${
                  isMenuActive('/')
                    ? 'bg-yellow-400 text-slate-900'
                    : 'text-slate-700 hover:bg-gray-50'
                }`}
              >
                <span>Home</span>
                {isMenuActive('/') && <div className="w-2 h-2 bg-slate-900 rounded-full" />}
              </a>

              <a 
                href="/about" 
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-4 text-lg font-medium transition-colors duration-200 rounded-xl border-b border-gray-100 ${
                  isMenuActive('/about')
                    ? 'bg-yellow-400 text-slate-900'
                    : 'text-slate-700 hover:bg-gray-50'
                }`}
              >
                <span>About Us</span>
                {isMenuActive('/about') && <div className="w-2 h-2 bg-slate-900 rounded-full" />}
              </a>
              
              {/* Dropdown Sections */}
              {Object.entries(menuItems).map(([menuName, subItems]) => {
                const isExpanded = expandedMobileSection === menuName;
                const hasActiveSubItem = isSubmenuActive(subItems);
                
                return (
                  <div key={menuName} className="border-b border-gray-100">
                    <button
                      onClick={() => toggleMobileSection(menuName)}
                      className={`w-full flex items-center justify-between px-4 py-4 text-lg font-medium transition-colors duration-200 rounded-xl ${
                        hasActiveSubItem
                          ? 'bg-yellow-50 text-[#84C1D9]'
                          : 'text-slate-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{menuName}</span>
                      <div className="flex items-center space-x-2">
                        {hasActiveSubItem && <div className="w-2 h-2 bg-[#84C1D9] rounded-full" />}
                        <ChevronRight 
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </button>
                    
                    {/* Submenu Items */}
                    {isExpanded && (
                      <div className="pb-2 space-y-1">
                        {subItems.map((subItem, index) => (
                          <a
                            key={index}
                            href={subItem.href}
                            onClick={closeMobileMenu}
                            className={`block px-8 py-3 text-base transition-colors duration-200 rounded-lg ml-4 mr-2 ${
                              isMenuActive(subItem.href)
                                ? 'bg-yellow-400 text-slate-900 font-medium'
                                : 'text-slate-600 hover:bg-[#84C1D9]/10 hover:text-[#84C1D9]'
                            }`}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <a 
                href="/paan-awards" 
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-4 text-lg font-medium transition-colors duration-200 rounded-xl border-b border-gray-100 ${
                  isMenuActive('/paan-awards')
                    ? 'bg-yellow-400 text-slate-900'
                    : 'text-slate-700 hover:bg-gray-50'
                }`}
              >
                <span>Awards</span>
                {isMenuActive('/paan-awards') && <div className="w-2 h-2 bg-slate-900 rounded-full" />}
              </a>

              <a 
                href="/contact-us" 
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-4 text-lg font-medium transition-colors duration-200 rounded-xl border-b border-gray-100 ${
                  isMenuActive('/contact-us')
                    ? 'bg-yellow-400 text-slate-900'
                    : 'text-slate-700 hover:bg-gray-50'
                }`}
              >
                <span>Contact Us</span>
                {isMenuActive('/contact-us') && <div className="w-2 h-2 bg-slate-900 rounded-full" />}
              </a>
              
              {/* Mobile CTA Section */}
              <div className="pt-6 space-y-4 border-t-2 border-gray-100 mt-6">
                <div className="mb-4">
                  <LanguageSwitch />
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = 'https://member-portal.paan.africa/';
                    closeMobileMenu();
                  }}
                  className="w-full px-6 py-4 text-base font-medium bg-[#172840] text-white rounded-xl hover:bg-[#1a2d47] transition-colors duration-200 shadow-md"
                >
                  Access Portal
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = 'https://membership.paan.africa/';
                    closeMobileMenu();
                  }}
                  className="w-full px-6 py-4 text-base font-medium bg-[#F25849] text-white rounded-xl hover:bg-[#e04537] transition-colors duration-200 shadow-md"
                >
                  Join Network
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;