"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { locales, localeNames, localeFlags } from '../i18n';
import { Icon } from '@iconify/react';

const LanguageSwitcher = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('en');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { locale, pathname, asPath } = router;

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px margin
        right: window.innerWidth - rect.right
      });
    }
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (newLocale) => {
    setIsOpen(false);
    
    // Navigate to the new locale path
    router.push(pathname, asPath, { locale: newLocale });
  };

  const currentLanguageName = localeNames[currentLocale];
  const currentLanguageFlag = localeFlags[currentLocale];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F2B706] focus:border-transparent transition-all duration-200"
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentLanguageFlag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {currentLanguageName}
        </span>
        <Icon 
          icon="heroicons:chevron-down" 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div 
          className="fixed z-[99999] bg-white rounded-lg shadow-lg border border-gray-200 py-1"
          style={{
            top: dropdownPosition.top,
            right: dropdownPosition.right,
            width: '192px' // w-48 = 12rem = 192px
          }}
        >
          {locales.map((localeOption) => {
            const isCurrent = localeOption === currentLocale;
            return (
              <button
                key={localeOption}
                onClick={() => handleLanguageChange(localeOption)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  isCurrent ? 'bg-[#F2B706] text-gray-900' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{localeFlags[localeOption]}</span>
                <span className="font-medium">{localeNames[localeOption]}</span>
                {isCurrent && (
                  <Icon 
                    icon="heroicons:check" 
                    className="w-4 h-4 ml-auto text-gray-900" 
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
