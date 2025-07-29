import React from 'react';
import Image from 'next/image';

const steps = [
  {
    number: '1',
    title: 'Apply',
    subtitle: "Let's get to know each other.",
    description:
      'Submit a short partnership application to help us understand your solution, target markets, and growth goals across Africa.',
    image: '/assets/images/clipboard-icon.svg',
  },
  {
    number: '2',
    title: 'Align',
    subtitle: 'We evaluate the fit',
    description:
      'Our team reviews your application to ensure a strong strategic fit and shared vision for growth across Africa.',
    image: '/assets/images/handshake-icon.svg',
  },
  {
    number: '3',
    title: 'Activate',
    subtitle: 'Launch with PAAN Support',
    description:
      'Co-design and roll out campaigns, training sessions, or licensing offers—equipping 200+ agencies with the tools to promote and implement your solution.',
    image: '/assets/images/rocket-icon.svg',
  },
  {
    number: '4',
    title: 'Grow',
    subtitle: 'Scale with data-driven insights.',
    description:
      'Track adoption, revenue impact, and user feedback—while collaborating with PAAN to fine-tune your strategy and unlock new regional opportunities.',
    image: '/assets/images/growth-graph-icon.svg',
  },
];

const Steps = () => {
  return (
    <div className="mb-20 relative py-16">
      <section className="relative">
        <h2 className="text-xl text-center font-medium uppercase text-paan-yellow mb-2">How it Works</h2>
        <h3 className='text-2xl text-center font-light text-paan-dark-blue mb-8'>A Simple 4-Step Path to Unlocking Growth Across Africa</h3>
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
              <div className="w-1 bg-gray-200 opacity-80 h-full absolute left-1/2 -translate-x-1/2 top-0" style={{ minHeight: `${steps.length * 140}px` }} />
              {/* Filled section for Step 1 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-paan-dark-blue" style={{ height: '170px' }} />
              {/* Droplet circle at the end of Step 1 fill */}
              <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '170px' }}>
                <div className="w-4 h-4 bg-paan-dark-blue rounded-full shadow-md" />
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