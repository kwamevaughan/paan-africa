import { useEffect } from 'react';
import Image from 'next/image';

const PaanAmbassadorProgramModal = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="relative bg-paan-dark-blue rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col lg:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:border-paan-red hover:text-paan-red hover:bg-white/10 transition-all duration-200"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden w-full">
          {/* Mobile Hero Image */}
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src="/assets/images/ambassador-modal-img.webp"
              alt="Academy Hero"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-paan-dark-blue/80 via-transparent to-transparent" />
            
            {/* Logo overlay on mobile */}
            <div className="absolute bottom-4 left-4">
              <div className="relative w-20 h-8">
                <Image
                  src="/assets/images/paan-ambassador-logo.svg"
                  alt="PAAN Academy Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="p-6">
            <h2 className="text-l font-bold text-white mb-3 leading-tight">
                Powering Africa’s Creative Future, One Leader at a Time
            </h2>
            <p className="text-white/90 text-xs mb-6 leading-relaxed">
                A curated program for standout professionals shaping Africa’s creative, digital, and strategic industries. As a PAAN Ambassador, you represent opportunity, trust, and impact — driving growth in your country and across the continent.
            </p>
            
            {/* Mobile CTA Button */}
            <div className="mt-auto">
              <a
                href="./paan-ambassador"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paan-yellow hover:bg-paan-yellow/90 text-paan-dark-blue px-8 py-2 rounded-full font-bold text-sm xl:text-lg shadow-lg transition-all duration-300 inline-block hover:shadow-xl hover:scale-105"
              >
                Become a PAAN Ambassador
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full min-h-[500px]">
          {/* Left: Hero Image */}
          <div className="w-2/5 relative overflow-hidden">
            <Image
              src="/assets/images/ambassador-modal-img.webp"
              alt="Academy Hero"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-paan-dark-blue/20" />
          </div>

          {/* Right: Content */}
          <div className="w-3/5 flex flex-col justify-between p-8 xl:p-12">
            {/* Logo */}
            <div className="mb-8">
              <div className="relative w-36 h-14 xl:w-44 xl:h-16">
                <Image
                  src="/assets/images/paan-ambassador-logo.svg"
                  alt="PAAN Academy Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-2xl xl:text-4xl font-bold text-white mb-6 leading-tight">
                Powering Africa's Creative Future, One Leader at a Time
              </h2>
              <p className="text-white/90 text-base xl:text-lg font-light mb-8 max-w-lg leading-relaxed">
                A curated program for standout professionals shaping Africa's creative, digital, and strategic industries. As a PAAN Ambassador, you represent opportunity, trust, and impact — driving growth in your country and across the continent.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <a
                href="./paan-ambassador"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paan-yellow hover:bg-paan-yellow/90 text-paan-dark-blue px-8 py-4 rounded-full font-bold text-base xl:text-lg shadow-lg transition-all duration-300 inline-block hover:shadow-xl hover:scale-105"
              >
                Become a PAAN Ambassador
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaanAmbassadorProgramModal;