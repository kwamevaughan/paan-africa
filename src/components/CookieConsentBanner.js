import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consentGiven = localStorage.getItem('cookieConsent');
    
    if (!consentGiven) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleSettings = () => {
    // You can implement a settings modal here if needed
    console.log('Cookie settings clicked');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleDecline}
      />
      
      {/* Cookie banner */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-300 ${
          isAnimating 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#84C1D9] rounded-full flex items-center justify-center">
                    <Icon icon="mdi:cookie" className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#172840]">
                    We use cookies
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleSettings}
                  className="px-4 py-2 text-sm font-medium text-[#172840] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
                >
                  Cookie Settings
                </button>
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 text-sm font-medium text-white bg-[#F25849] rounded-full hover:bg-[#D6473C] transition-colors duration-200 whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsentBanner;
