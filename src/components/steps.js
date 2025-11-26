import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppTranslations } from '../hooks/useTranslations';

const Steps = () => {
  const { t } = useAppTranslations();
  const dividerRef = useRef(null);
  const sectionRef = useRef(null);
  const [fillHeight, setFillHeight] = useState(0);

  const steps = [
    {
      number: '1',
      title: t('partners.howItWorks.steps.step1.title'),
      subtitle: t('partners.howItWorks.steps.step1.subtitle'),
      description: t('partners.howItWorks.steps.step1.description'),
      image: '/assets/images/clipboard-icon.svg',
    },
    {
      number: '2',
      title: t('partners.howItWorks.steps.step2.title'),
      subtitle: t('partners.howItWorks.steps.step2.subtitle'),
      description: t('partners.howItWorks.steps.step2.description'),
      image: '/assets/images/handshake-icon.svg',
    },
    {
      number: '3',
      title: t('partners.howItWorks.steps.step3.title'),
      subtitle: t('partners.howItWorks.steps.step3.subtitle'),
      description: t('partners.howItWorks.steps.step3.description'),
      image: '/assets/images/rocket-icon.svg',
    },
    {
      number: '4',
      title: t('partners.howItWorks.steps.step4.title'),
      subtitle: t('partners.howItWorks.steps.step4.subtitle'),
      description: t('partners.howItWorks.steps.step4.description'),
      image: '/assets/images/growth-graph-icon.svg',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!dividerRef.current || !sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Section visible area
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      // Only animate when section is in viewport
      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) {
        setFillHeight(0);
        return;
      }
      // Calculate scroll progress (0 to 1)
      const progress = Math.min(
        1,
        Math.max(0, (windowHeight - sectionTop) / (windowHeight + sectionHeight))
      );
      // Divider height
      const dividerHeight = dividerRef.current.offsetHeight;
      // Fill height (min 0, max dividerHeight)
      setFillHeight(progress * dividerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="mb-20 relative py-16" ref={sectionRef}>
      <section className="relative">
        <h2 className="text-xl text-center font-medium uppercase text-paan-yellow mb-2">{t('partners.howItWorks.badge')}</h2>
        <h3 className='text-2xl text-center font-light text-paan-dark-blue mb-8'>{t('partners.howItWorks.title')}</h3>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row w-full">
            {/* Left column: image or text depending on step (desktop), full step (mobile) */}
            <div className="flex flex-col flex-1 gap-8">
              {steps.map((step, idx) => (
                <div key={step.number} className="md:flex items-center justify-center p-4 md:p-8 min-h-[120px] h-full">
                  {/* Mobile: stacked image above text, no divider */}
                  <div className="flex flex-col md:hidden">
                    <div className="flex items-center justify-center mb-4">
                      <Image
                        src={step.image}
                        width={180}
                        height={200}
                        alt={step.title}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center mb-2">
                        <span className="text-paan-dark-blue text-xl font-bold mr-2">{step.number}.</span>
                        <span className="text-paan-dark-blue text-xl font-bold">{step.title}</span>
                      </div>
                      <h3 className='font-normal text-lg mb-1 text-paan-dark-blue'>{step.subtitle}</h3>
                      <p className='font-light text-paan-dark-blue'>{step.description}</p>
                    </div>
                  </div>
                  {/* Desktop: alternate image/text with divider in center */}
                  <>
                    {idx % 2 === 0 ? (
                      <div className="hidden md:flex flex-1 items-center justify-center">
                        <Image
                          src={step.image}
                          width={180}
                          height={200}
                          alt={step.title}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="hidden md:flex flex-1 flex-col justify-center w-full">
                        <div className="flex items-center mb-2">
                          <span className="text-paan-dark-blue text-xl font-bold mr-2">{step.number}.</span>
                          <span className="text-paan-dark-blue text-xl font-bold">{step.title}</span>
                        </div>
                        <h3 className='font-normal text-lg mb-1 text-paan-dark-blue'>{step.subtitle}</h3>
                        <p className='font-light text-paan-dark-blue'>{step.description}</p>
                      </div>
                    )}
                  </>
                </div>
              ))}
            </div>
            {/* Vertical divider: single continuous line, only on desktop */}
            <div className="relative hidden md:flex flex-col items-center justify-center px-0" style={{ minHeight: `${steps.length * 140}px` }}>
              {/* Main gray divider */}
              <div
                ref={dividerRef}
                className="w-1 bg-gray-200 opacity-80 h-full absolute left-1/2 -translate-x-1/2 top-0 overflow-visible"
                style={{ minHeight: `${steps.length * 140}px` }}
              />
              {/* Filled section (animated) */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-paan-dark-blue transition-all duration-300"
                style={{ height: `${fillHeight}px` }}
              />
              {/* Droplet circle at the end of fill */}
              <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                style={{ top: `${fillHeight - 8}px` }}
              >
                <div className="w-4 h-4 bg-paan-dark-blue rounded-full shadow-md droplet-effect" />
              </div>
            </div>
            {/* Right column: text or image depending on step (desktop only) */}
            <div className="hidden md:flex flex-col flex-1 gap-8">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex items-center justify-center p-4 md:p-8 min-h-[120px] h-full">
                  {idx % 2 === 0 ? (
                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center mb-2">
                        <span className="text-paan-dark-blue text-xl font-bold mr-2">{step.number}.</span>
                        <span className="text-paan-dark-blue text-xl font-bold">{step.title}</span>
                      </div>
                      <h3 className='font-normal text-lg mb-1 text-paan-dark-blue'>{step.subtitle}</h3>
                      <p className='font-light text-paan-dark-blue'>{step.description}</p>
                    </div>
                  ) : (
                    <Image
                      src={step.image}
                      width={180}
                      height={180}
                      alt={step.title}
                      className="object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Steps;