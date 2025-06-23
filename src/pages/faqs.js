import SEO from "@/components/SEO";
import Header from "../layouts/clients-header"; 
import Footer from "@/layouts/footer";
import { useEffect, useRef } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import PartnerBenefits from "@/components/PartnersBenefits";
import Steps from "@/components/steps";
import Link from "next/link";
import AgencyLogosGrid from "@/components/AgencyLogosGrid";
import ScrollToTop from "@/components/ScrollToTop";


const FAQs = () => {
  const sectionRefs = {
    home: useRef(null),
    aboutUs: useRef(null),
    ourMission: useRef(null),
    whyJoinUs: useRef(null),
    membership: useRef(null),
    services: useRef(null),
    events: useRef(null),
    contactUs: useRef(null),
  };

  const isFixed = useFixedHeader();

  // Restore IntersectionObserver for section transitions
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <SEO
        title="Partner with PAAN | Unlock Growth Across Africa's Creative & Tech Markets"
        description="Join PAAN's Partnership Program to connect with 200+ vetted agencies across Africa. Accelerate your market entry, build trust, and scale with local expertise."
        keywords="PAAN partnerships, Africa agency network, tech partnerships Africa, creative agency Africa, expand in Africa, African market entry, local tech partners Africa, scale in African markets"
      />
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />
        <Hero />

        <div className="mx-auto max-w-6xl mt-20 mb-20 relative">
          <div className="absolute top-80 right-0 w-16 h-16 bg-paan-yellow rounded-full z-0"></div>
          <div className="absolute bottom-40 right-80 w-11 h-11 bg-paan-blue rounded-full z-0"></div>
          <div className="absolute -bottom-24 -right-40 w-14 h-14 bg-paan-red rounded-full z-10"></div>
          <section className="relative">            
            <div className="mb-10">
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="mx-auto md:mx-0 flex justify-center">
                  <img 
                    src="/assets/images/black-girl.png" 
                    alt="Professional woman" 
                    className="rounded-lg shadow-md w-full max-w-md h-auto object-cover" 
                  />
                </div>
                <div className="flex flex-col space-y-6 max-w-lg">
                  <h3 className="text-xl font-semibold">For Technology Companies, Platforms, and Innovators</h3>
                  <p className="text-gray-700 leading-relaxed">
                    At PAAN, we bridge the gap between cutting-edge technology solutions and 
                    Africa's most dynamic markets. Partner with us to connect with 200+ vetted 
                    communication, marketing, and tech agencies serving big brands, NGOs, and fast-growing enterprises across the continent.
                  </p>
                  <button className="bg-paan-red text-white py-3 px-8 rounded-full hover:bg-paan-red transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-fit">
                    <Link href="https://membership.paan.africa/" passHref>
                      Become a member
                    </Link>
                  </button> 
                </div>
              </div>
              <div className="mt-20">
                <h2 className="text-2xl font-semibold">Why Partner with PAAN?</h2>
                <p className="text-gray-700 leading-relaxed mt-4 font-normal text-2xl">Africa’s markets are diverse, complex, and ripe with opportunity—but navigating them alone is costly and time-consuming. 
                  PAAN’s agency network acts as your local accelerator, providing:</p>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-[#172840] relative w-full">
        <section className="relative mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-16">
          <h2 className="text-base md:text-lg text-white uppercase text-left font-semibold">Partner Benefits</h2>
          <h3 className="text-xl md:text-2xl py-2 md:py-4 text-white text-left font-normal">Tailored to Drive Your Africa Growth Strategy</h3>
          <PartnerBenefits />
        </section>
      </div>
      
        <Steps/>
    
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10 sm:mt-20 relative">
        {/* Yellow circle - adjusted for mobile */}
        <div className="absolute -bottom-6 sm:-bottom-9 -left-3 sm:-left-6 w-12 h-12 sm:w-20 sm:h-20 bg-paan-yellow rounded-full z-0"></div>
        {/* Red circle - adjusted for mobile */}
        <div className="absolute bottom-2 sm:bottom-4 left-20 sm:left-56 w-8 h-8 sm:w-11 sm:h-11 bg-paan-red rounded-full z-0"></div>
        
        <section className="relative items-center mt-6 sm:mt-10">           
          <h2 className="text-sm font-bold mb-3 sm:mb-4 uppercase">Ready to Scale Across Africa?</h2>
          <h3 className="text-lg sm:text-xl font-normal mb-3 sm:mb-4">Join industry leaders in leveraging PAAN's network to:</h3>
          
          {/* Grid that changes from 1 column on mobile to 3 columns on medium screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pb-12 sm:pb-20 md:pb-32">
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-20">
                <img src="/assets/images/icons/power-icon.png" alt="Localize Faster" className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Localize Faster</h2>
              <p className="text-gray-800 text-sm sm:text-base">Cut through market complexity with agency expertise.</p>
            </div>
            
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-16">
                <img src="/assets/images/icons/caution-icon.png" alt="Reduce Risk" className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Reduce Risk</h2>
              <p className="text-gray-800 text-sm sm:text-base">PAAN-certified agencies ensure compliance and relevance.</p>
            </div>
            
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-20">
                <img src="/assets/images/icons/window-icon.png" alt="Maximize ROI" className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Maximize ROI</h2>
              <p className="text-gray-800 text-sm sm:text-base">Turn partnerships into revenue with measurable outcomes.</p>
            </div>
          </div>                
        </section>
        </div>
        <AgencyLogosGrid/>
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

const Hero = () => {
    return (
      <div
        className="relative min-h-[90vh] w-full bg-[#84C1D9] overflow-hidden flex items-center" 
        id="home"
      >  
        <div className="relative w-full flex items-center justify-center mx-auto max-w-6xl px-6 md:px-8 py-12">

          <div className="flex-1 max-w-xl text-left space-y-4 z-10">
            <h1 className="text-dark font-bold mb-2 relative uppercase text-xl md:text-2xl lg:text-3xl">
                Got Questions About PAAN? We've Got You Covered.
            </h1>
            <p className="text-dark text-lg md:text-xl lg:text-2xl mb-4 leading-tight">
                Find quick answers to common questions about PAAN membership, collaboration, tools, and growth.
            </p>             
          </div>
  
          {/* Right side - Image */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-full max-w-2xl">
                <img 
                    src="/assets/images/faqs-hero.png" 
                    alt="Professional woman" 
                    className="rounded-lg w-full h-auto object-cover" 
                />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default FAQs;