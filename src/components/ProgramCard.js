import Image from 'next/image';

const PAANProgramsSection = () => {
  return ( 
    <section className="w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* First Card - PAAN Academy */}
          <div className="bg-paan-dark-blue w-full pt-10 relative">
            {/* New Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-transparent text-white border border-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                New
              </span>
            </div>

            {/* Desktop Version */}
            <div className="hidden sm:block h-full min-h-[280px] lg:min-h-[320px]">
              <div className="h-full relative">
                {/* First card: Title full width, image at bottom */}
                <div className="flex flex-col h-full p-6 md:p-8 relative z-10">
                  {/* Logo */}
                  <div className="mb-6">
                    <div className="relative w-28 h-10 md:w-32 md:h-12 lg:w-36 lg:h-14">
                      <Image
                        src="/assets/images/paan-academy/logo.webp"
                        alt="PAAN Academy Logo"
                        fill
                        className="object-contain object-left"
                        priority
                      />
                    </div>
                  </div>

                  {/* Main Content - Full Width */}
                  <div className="flex-1 flex flex-col justify-center mb-6">
                    <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight w-full">
                      Bring Your <span className="text-paan-maroon">Agency</span> <span className='text-paan-yellow'>Skills</span><br/> to PAAN Academy
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div>
                            <p className="text-white text-sm md:text-base lg:text-lg mb-6 max-w-2xl leading-relaxed opacity-90">
                            Train Africa's next creative leaders and open a new revenue stream for your agency.
                            </p>
                            {/* CTA Button */}
                            <div>
                            <a
                                href="./academy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-paan-maroon hover:bg-paan-maroon/90 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm lg:text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-block text-center border border-transparent hover:border-white/20"
                            >
                                Become a Trainer
                            </a>
                            </div>
                        </div>
                        <div className="relative">
                        </div>
                    </div>
                    
                  </div>
                </div>
                
                {/* Hero Image - Full Height at Bottom Right */}
                <div className="absolute bottom-0 right-0 w-48 md:w-56 lg:w-64 h-full">
                    <Image
                        src="/assets/images/paan-academy/hero-image.webp"
                        alt="Academy Training Session"
                        fill
                        className="object-cover object-bottom rounded-tl-lg"
                        priority
                    />
                </div>
              </div>
            </div>

            {/* Mobile Version */}
            <div className="sm:hidden p-4">
              <div className="mx-auto max-w-6xl">
                <div className="text-center">
                  {/* Mobile Logo */}
                  <div className="mb-4 flex justify-center">
                    <div className="relative w-24 h-9">
                      <Image
                        src="/assets/images/paan-academy/logo.webp"
                        alt="PAAN Academy Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Mobile Content - Hero image removed */}
                  <h2 className="text-lg font-bold text-white mb-3 leading-tight">
                    Bring Your <span className="text-paan-maroon">Agency Skills</span> to PAAN Academy
                  </h2>
                  
                  <p className="text-white text-xs mb-4 leading-relaxed opacity-90">
                    Train Africa's next creative leaders and open a new revenue stream for your agency.
                  </p>

                  {/* Mobile CTA */}
                  <a
                    href="./academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-paan-maroon hover:bg-paan-maroon/90 text-white px-5 py-2 rounded-full font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 inline-block w-full max-w-xs text-center"
                  >
                    Become a Trainer
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Card - PAAN Ambassador */}
          <div className="bg-paan-blue w-full relative">
            {/* New Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-transparent text-paan-dark-blue border border-paan-dark-blue px-3 py-1 rounded-full text-xs font-bold shadow-md">
                New
              </span>
            </div>

            {/* Desktop Version */}
            <div className="hidden sm:block h-full min-h-[280px] lg:min-h-[320px]">
              <div className="h-full">
                {/* Second card: Content aligned to left */}
                <div className="flex flex-col justify-center h-full p-6 md:p-8">
                  <div className="max-w-2xl">
                    {/* Logo */}
                    <div className="mb-6">
                      <div className="relative w-28 h-10 md:w-32 md:h-12 lg:w-36 lg:h-14">
                        <Image
                          src="/assets/images/paan-ambassador-logo-dark.svg"
                          alt="PAAN Ambassador Logo"
                          fill
                          className="object-contain object-left"
                          priority
                        />
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="mb-6">
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-paan-dark-blue mb-4 leading-tight">
                        Powering Africa's Creative Future - One Leader at a Time
                      </h2>
                      
                      <p className="text-paan-dark-blue text-sm md:text-base lg:text-lg mb-6 leading-relaxed opacity-90">
                        A curated program for standout professionals shaping Africa's creative, digital, and strategic industries. As a PAAN Ambassador, you represent opportunity, trust, and impact.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div>
                      <a
                        href="./paan-ambassador"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-paan-red hover:bg-paan-red/90 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm lg:text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-block text-center border border-transparent hover:border-white/20"
                      >
                        Become a PAAN Ambassador
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Version */}
            <div className="sm:hidden p-4">
              <div className="mx-auto max-w-6xl">
                <div className="text-center">
                  {/* Mobile Logo */}
                  <div className="mb-4 flex justify-center">
                    <div className="relative w-24 h-9">
                      <Image
                        src="/assets/images/paan-ambassador-logo-dark.svg"
                        alt="PAAN Ambassador Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Mobile Content - No image for this card */}
                  <h2 className="text-lg font-bold text-paan-dark-blue mb-3 leading-tight">
                    Powering Africa's <span className="text-paan-yellow">Creative Future</span> — One Leader at a Time
                  </h2>
                  
                  <p className="text-paan-dark-blue text-xs mb-4 leading-relaxed opacity-90">
                    A curated program for standout professionals shaping Africa's creative, digital, and strategic industries. As a PAAN Ambassador, you represent opportunity, trust, and impact.
                  </p>

                  {/* Mobile CTA */}
                  <a
                    href="./paan-ambassador"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-paan-red hover:bg-paan-red/90 text-white px-5 py-2 rounded-full font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 inline-block w-full max-w-xs text-center"
                  >
                    Become a PAAN Ambassador
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PAANProgramsSection;