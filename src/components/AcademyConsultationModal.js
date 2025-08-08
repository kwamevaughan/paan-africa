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
      <div className="relative bg-paan-dark-blue rounded-lg sm:rounded-xl shadow-2xl w-full max-w-xs sm:max-w-3xl max-h-[90vh] sm:max-h-[95vh] flex flex-col sm:flex-row overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 border border-2 rounded-full text-white hover:border-paan-red hover:text-paan-red transition-colors z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left: Content & Button */}
        <div className="flex-1 flex flex-col p-3 sm:p-6 md:p-8 min-w-0 pb-0 sm:pb-6 md:pb-8">
          {/* Logo */}
          <div className="mb-3 sm:mb-6">
            <div className="relative w-20 h-8 sm:w-32 sm:h-12 md:w-40 md:h-16">
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
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 leading-tight">
              Bring Your<br/> 
              <span className='text-paan-maroon'>Agency</span> <span className='text-paan-yellow'>Skills</span> to<br/> 
              PAAN Academy
            </h2>
            <p className="text-white text-xs sm:text-base md:text-lg mb-3 sm:mb-6 md:mb-8 max-w-md leading-relaxed">
              Train Africa's next creative leaders and open a new revenue stream for your agency.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-3 sm:mt-auto sm:mb-0">
            <a
              href="https://calendly.com/njue-duncan-growthpad/paan-partners-introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-paan-green text-white px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold text-xs sm:text-base shadow-lg hover:bg-[#D6473C] transition-all duration-300 inline-block w-full sm:w-auto text-center"
            >
              Schedule a free consultation
            </a>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="hidden sm:block w-48 md:w-56 lg:w-64 relative min-h-[300px] sm:min-h-[340px] md:min-h-[380px]">
          <Image
            src="/assets/images/paan-academy/hero-image.webp"
            alt="Academy Hero"
            fill
            className="object-cover rounded-r-xl"
            priority
          />
        </div>

        {/* Mobile image below content */}
        <div className="block sm:hidden w-full h-24 relative">
          <Image
            src="/assets/images/paan-academy/hero-image.webp"
            alt="Academy Hero"
            fill
            className="object-cover rounded-b-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AcademyConsultationModal;