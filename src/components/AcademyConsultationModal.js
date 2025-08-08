import { useEffect } from 'react';
import Image from 'next/image';

const AcademyConsultationModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
      <div className="relative bg-paan-dark-blue rounded-lg sm:rounded-xl shadow-2xl w-full max-w-xs sm:max-w-3xl max-h-[85vh] sm:max-h-[95vh] flex flex-col sm:flex-row overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 border border-2 rounded-full text-white hover:border-paan-red hover:text-paan-red transition-colors z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 p-0.5 sm:p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Mobile Layout */}
        <div className="flex flex-col sm:hidden w-full">
          {/* Mobile Header with Logo and Small Image */}
          <div className="flex items-center justify-between p-3 pb-2">
            <div className="relative w-16 h-6">
              <Image
                src="/assets/images/paan-academy/logo.webp"
                alt="PAAN Academy Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative w-12 h-12 rounded-lg overflow-hidden ml-2">
              <Image
                src="/assets/images/paan-academy/hero-image.webp"
                alt="Academy Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Mobile Content */}
          <div className="px-3 pb-3">
            <h2 className="text-base font-bold text-white mb-2 leading-tight">
              Bring Your <span className='text-paan-maroon'>Agency</span> <span className='text-paan-yellow'>Skills</span> to PAAN Academy
            </h2>
            <p className="text-white text-xs mb-3 leading-relaxed">
              Train Africa's next creative leaders and open a new revenue stream for your agency.
            </p>
            
            {/* Mobile CTA Button */}
            <a
              href="https://calendly.com/njue-duncan-growthpad/paan-partners-introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-paan-green text-white px-4 py-2 rounded-full font-semibold text-xs shadow-lg hover:bg-[#D6473C] transition-all duration-300 inline-block w-full text-center"
            >
              Schedule consultation
            </a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex w-full">
          {/* Left: Content & Button */}
          <div className="flex-1 flex flex-col justify-between p-6 md:p-8 min-w-0">
            {/* Logo */}
            <div className="mb-6">
              <div className="relative w-32 h-12 md:w-40 md:h-16">
                <Image
                  src="/assets/images/paan-academy/logo.webp"
                  alt="PAAN Academy Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Bring Your<br/> 
                <span className='text-paan-maroon'>Agency</span> <span className='text-paan-yellow'>Skills</span> to<br/> 
                PAAN Academy
              </h2>
              <p className="text-white text-base md:text-lg mb-6 md:mb-8 max-w-md leading-relaxed">
                Train Africa's next creative leaders and open a new revenue stream for your agency.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <a
                href="https://calendly.com/njue-duncan-growthpad/paan-partners-introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paan-green text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base shadow-lg hover:bg-[#D6473C] transition-all duration-300 inline-block w-auto text-center"
              >
                Schedule a free consultation
              </a>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="w-48 md:w-56 lg:w-64 relative min-h-[300px] md:min-h-[380px]">
            <Image
              src="/assets/images/paan-academy/hero-image.webp"
              alt="Academy Hero"
              fill
              className="object-cover rounded-r-xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyConsultationModal;