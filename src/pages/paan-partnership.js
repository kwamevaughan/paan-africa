import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import { useEffect, useRef } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import ReadyToApplySection from "@/components/ReadyToApplySection";
import ContactForm from "@/components/ContactForm";
import PartnerBenefits from "@/components/PartnersBenefits";

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
        title="Pan-African Agency Network (PAAN) | Redefining Africa's Creative & Tech Footprint"
        description="Discover the Pan-African Agency Network (PAAN), a dynamic alliance of creative and tech agencies across Africa and the diaspora. Join us to unlock global opportunities, access exclusive resources, and collaborate with top talent to redefine Africa's creative and technological footprint. Explore our membership tiers, services, and upcoming events today!"
        keywords="Pan-African Agency Network, PAAN, African agencies, creative network, tech network, collaboration, innovation, global influence"
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

        <div className="bg-[#172840] relative">
          <section className="relative mx-auto max-w-6xl py-16">
          <h2 className="text-l text-white uppercase text-left font-semibold">Partner Benefits</h2>
          <h3 className="text-2xl py-4 text-white text-left font-normal">Tailored to Drive Your Africa Growth Strategy</h3>
          <PartnerBenefits />
          </section>
        </div>
  
    <div className="mb-20 relative bg-gray-200 py-16">
      <section className="relative">
        <h2 className="text-2xl text-center font-medium mb-4">How it Works</h2>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            {/* Instead of one line, we'll create individual connecting lines between circles */}
            <div className="hidden md:flex absolute top-24 w-full">
              {/* Line from circle 1 to 2 */}
              <div className="h-1 bg-blue-600 absolute" style={{ left: '16.5%', width: '16.6%' }} />
              
              {/* Line from circle 2 to 3 */}
              <div className="h-1 bg-blue-600 absolute" style={{ left: '41.5%', width: '16.6%' }} />
              
              {/* Line from circle 3 to 4 */}
              <div className="h-1 bg-blue-600 absolute" style={{ left: '66.5%', width: '16.6%' }} />
            </div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center mb-8 md:mb-0 relative z-10 w-full md:w-1/4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-xl font-bold mb-3 relative z-20">
                1
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">Discovery</h3>
              <p className="text-sm text-center px-4">Initial consultation to understand your needs and goals</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center mb-8 md:mb-0 relative z-10 w-full md:w-1/4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-xl font-bold mb-3 relative z-20">
                2
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">Planning</h3>
              <p className="text-sm text-center px-4">Develop comprehensive strategy and roadmap</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center mb-8 md:mb-0 relative z-10 w-full md:w-1/4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-xl font-bold mb-3 relative z-20">
                3
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">Execution</h3>
              <p className="text-sm text-center px-4">Implement solutions with regular check-ins</p>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center relative z-10 w-full md:w-1/4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-xl font-bold mb-3 relative z-20">
                4
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">Results</h3>
              <p className="text-sm text-center px-4">Analyze outcomes and refine for continued success</p>
            </div>
          </div>
        </div>
      </section>
    </div>
        
        <div
          className="mx-auto max-w-6xl mt-20 relative">
          <div className="absolute top-4 -right-5 w-12 h-12 bg-[#172840] rounded-full z-20"></div>
          <div className="absolute -bottom-9 -left-6 w-20 h-20 bg-[#F2B706] rounded-full z-0"></div>
          <div className="absolute bottom-4 left-56 w-11 h-11 bg-[#F25849] rounded-full z-0"></div>
          <section className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mt-10">
            <div className="relative col-span-1 sm:col-span-1 flex flex-col gap-10">
              <div>
                <h2 className="text-3xl font-medium mb-4">Get in Touch</h2>
                <p className="text-gray-500">
                  Have questions about PAAN, membership, or upcoming events?
                  Reach out — we’re here to connect and support your journey.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-medium mb-4">
                  Direct Contact Info
                </h2>
                <div className="flex items-center gap-2 pb-4">
                  <Link
                    href="mailto:secretariat@paan.africa"
                    className="flex items-center gap-2 transform translate-y-[-5px] hover:translate-y-[-5px] transition-transform duration-200"
                  >
                    <Icon
                      icon="material-symbols:call"
                      width="32"
                      height="32"
                      className="flex-shrink-0 bg-[#F25849] p-2 rounded-full text-white"
                    />
                    <p className="font-medium text-gray-500">
                      secretariat@paan.africa
                    </p>
                  </Link>
                </div>
                <div className="flex items-center gap-2 pb-4">
                  <Link
                    href="https://www.google.com/maps?q=7th+Floor,+Mitsumi+Business+Park,+Westlands,+Nairobi,+Kenya"
                    target="_blank"
                    className="flex items-center gap-2 transform translate-y-[-5px] hover:translate-y-[-10px] transition-transform duration-200"
                  >
                    <Icon
                      icon="mdi:location"
                      width="32"
                      height="32"
                      className="flex-shrink-0 bg-[#F25849] p-2 rounded-full text-white"
                    />
                    <p className="font-medium text-gray-500">
                      7th Floor, Mitsumi Business Park, Westlands, Nairobi,
                      Kenya
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
              <ContactForm />
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
      className="absolute inset-x-0 bottom-0 bg-bottom bg-no-repeat opacity-80"
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