import SEO from "@/components/SEO";
import Header from "../layouts/partners-header"; 
import Footer from "@/layouts/footer";
import { useEffect, useRef } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import PartnerBenefits from "@/components/PartnersBenefits";
import Steps from "@/components/steps";

const FreelancersPage = () => {
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
          <section className="relative">
            <div className="mb-6">
                <h2 className="text-l uppercase font-bold text-left text-black mb-4">For Technology Companies, Platforms, and Innovators</h2>
                <h3 className="text-left text-black">
                    At PAAN, we bridge the gap between cutting-edge technology solutions and Africa’s most dynamic markets. 
                    Partner with us to connect with 200+ vetted communication, marketing, and tech agencies serving big brands,
                    NGOs, and fast-growing enterprises across the continent.
                </h3>
            </div>
            <div className="mb-10">
                <h2 className="text-l uppercase font-bold text-left text-black mb-4">Why Partner with PAAN?</h2>
                <h3 className="text-left text-black">
                    Africa’s markets are diverse, complex, and ripe with opportunity—but navigating them alone is costly and time-consuming. 
                    PAAN’s agency network acts as your local accelerator, providing:
                </h3>   
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="mx-auto md:mx-0">
                        <img src="/assets/images/black-girl.png" alt="Professional woman" className="rounded-lg shadow-md max-w-full h-auto" />
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Local Expertise</h2>
                            <p className="text-gray-600">Agencies fluent in cultural, regulatory, and market nuances.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Scalable Distribution</h2>
                            <p className="text-gray-600">Access decision-makers through trusted partners.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Credibility</h2>
                            <p className="text-gray-600">PAAN's endorsement builds trust with agencies and their clients.</p>
                        </div>
                    </div>
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
        <div className="absolute -bottom-6 sm:-bottom-9 -left-3 sm:-left-6 w-12 h-12 sm:w-20 sm:h-20 bg-[#F2B706] rounded-full z-0"></div>
        {/* Red circle - adjusted for mobile */}
        <div className="absolute bottom-2 sm:bottom-4 left-20 sm:left-56 w-8 h-8 sm:w-11 sm:h-11 bg-[#F25849] rounded-full z-0"></div>
        
        <section className="relative items-center mt-6 sm:mt-10">           
          <h2 className="text-sm font-bold mb-3 sm:mb-4 uppercase">Ready to Scale Across Africa?</h2>
          <h3 className="text-lg sm:text-xl font-normal mb-3 sm:mb-4">Join industry leaders in leveraging PAAN's network to:</h3>
          
          {/* Grid that changes from 1 column on mobile to 3 columns on medium screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pb-12 sm:pb-20 md:pb-32">
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-20">
                <img src="/assets/images/icons/power-icon.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Localize Faster</h2>
              <p className="text-gray-800 text-sm sm:text-base">Cut through market complexity with agency expertise.</p>
            </div>
            
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-16">
                <img src="/assets/images/icons/caution-icon.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Reduce Risk</h2>
              <p className="text-gray-800 text-sm sm:text-base">PAAN-certified agencies ensure compliance and relevance.</p>
            </div>
            
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-20">
                <img src="/assets/images/icons/window-icon.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Maximize ROI</h2>
              <p className="text-gray-800 text-sm sm:text-base">Turn partnerships into revenue with measurable outcomes.</p>
            </div>
          </div>                
        </section>
        </div>
        
        <Footer />
      </main>
    </>
  );
};

const Hero = () => {
  return (
    <div
    className="relative h-screen w-full bg-[#F25849] overflow-hidden" 
    id="home"
  >
    {/* Background image positioned at the bottom */}
    <div 
      className="absolute inset-x-0 bottom-0 bg-bottom bg-no-repeat opacity-20"
      style={{
        backgroundImage: "url('/assets/images/bg-pattern.png')",
        height: "100%"
      }}
    />

    <div className="relative h-full flex">
      <div className="max-w-6xl px-6 md:px-8 pb-16 flex flex-col justify-end h-full">
      
        <div className="max-w-2xl text-left space-y-6">
          <h2 className="text-white font-bold mb-2 relative uppercase">
            PAAN Partnership Program
          </h2>
          <p className="text-white text-3xl mb-6">
            Power Your Growth Across Africa. <br/>Unlock Africa's Potential with PAAN's Agency Network.
          </p>                        
        </div>
      </div>
    </div>
  </div>
  );
};

export default FreelancersPage;