import SEO from "@/components/SEO";
import Header from "../layouts/clients-header";
import Image from "next/image";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import ClientsSlider from "@/components/ClientsSlider";
import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";
import AgencyLogosGrid from "@/components/AgencyLogosGrid";


const AgenciesPage = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SEO
        title="Grow Your Brand in Africa with Trusted Partners | Pan-African Agency Network (PAAN)"
        description="Connect with certified agencies and freelancers across 20+ African countries to launch campaigns with cultural fluency and regional expertise. Find your delivery partner today."
        keywords="African marketing, certified agencies Africa, freelancers Africa, campaign execution, PAAN Summit, brand growth Africa, vetted creators, regional campaigns, Africa marketing, African marketing agencies, African freelancers, African marketing network, African marketing solutions, African marketing experts, African marketing professionals, African marketing services, African marketing consultants, African marketing agencies, African marketing freelancers, African marketing network, African marketing solutions, African marketing experts, African marketing professionals, African marketing services, African marketing consultants"
      />
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />
        <Hero openModal={openModal} />
        <div className="bg-white relative">
            <div className="absolute top-50 right-10 w-16 h-16 bg-[#F25849] rounded-full z-0"></div>
            <div className="absolute top-40 left-40 w-8 h-8 bg-[#F25849] rounded-full z-0"></div>
            <div className="absolute top-10 right-40 w-8 h-8 bg-[#F2B706] rounded-full z-0"></div>
            <div className="absolute bottom-20 right-16 w-11 h-11 bg-[#84C1D9] rounded-full z-0"></div>
            {/* Pattern positioned on left middle edge */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <Image 
                src="/assets/images/paan-patterns.png" 
                width={80} 
                height={80} 
                alt="PAAN Summit" 
                className="opacity-80" 
              />
            </div>
          
            <section className="relative mx-auto max-w-6xl mt-40 px-6">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-xl text-dark uppercase font-semibold">WHY JOIN?</h3>
                <h2 className="text-3xl md:text-4xl text-dark font-normal leading-tight">
                  Africa is a mosaic of markets. You need <br className="hidden md:block" />
                  more than reach; you need readiness.
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mt-10">
                <div className="flex flex-col gap-4 order-2 md:order-1">
                  <Image 
                    src="/assets/images/africa2.png" 
                    width={400} 
                    height={300} 
                    alt="PAAN Summit" 
                    className="w-full h-auto object-cover rounded-lg" 
                  />
                </div>
                
                <div className="flex flex-col order-1 md:order-2">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      PAAN connects your brand to a trusted network of vetted agencies and freelancers across 20+ African countries.
                      <br /><br />
                      Whether you're rolling out across multiple regions or localizing a single campaign, our ecosystem gives you the agility and confidence to deliver at scale.
                    </p>
                    
                    <div className="mt-8">
                      <h3 className="font-bold text-xl mb-4 text-dark">We help you:</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <span className="mr-3 mt-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-[#F25849]" viewBox="0 0 256 256">
                              <path fill="currentColor" d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18m-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"/>
                            </svg>              
                          </span>
                          <span className="text-gray-700 leading-relaxed">Launch campaigns across regions with fewer unknowns</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-3 mt-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-[#F25849]" viewBox="0 0 256 256">
                              <path fill="currentColor" d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18m-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"/>
                            </svg>   
                          </span>
                          <span className="text-gray-700 leading-relaxed">Localize with insight, not guesswork</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-3 mt-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-[#F25849]" viewBox="0 0 256 256">
                                <path fill="currentColor" d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18m-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"/>
                            </svg>   
                          </span>
                          <span className="text-gray-700 leading-relaxed">Work with delivery partners already trusted in their markets</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>        
        <div className="relative mt-20 bg-[#84C1D9] py-10">
          <section className="relative mx-auto max-w-6xl space-y-2" style={{ zIndex: 2 }}>
            <h2 className="text-lg uppercase font-bold text-left mb-4">What you Get</h2>
            <h3 className="text-2xl">Certified Talent. Regional Execution. Real Results</h3>
            <p className="text-sm">Working with PAAN gives you access to:</p>
            <ClientsSlider openModal={openModal} />
          </section>
          {/* Background Pattern */}
          <Image
            src="/assets/images/bg-pattern.svg"
            width={0}
            height={0}
            alt="Background Pattern"
            className="absolute bottom-0 left-0 w-full h-1/3 object-cover opacity-1 pointer-events-none"
            style={{ zIndex: 1, width: '100%' }}
          />
        </div>

        <div className="relative">
            {/* Background Pattern */}
            <Image
            src="/assets/images/bg-pattern.svg"
            width={0}
            height={0}
            alt="Background Pattern"
            className="absolute top-0 left-0 w-full h-1/3 object-cover opacity-[.6] pointer-events-none"
            style={{ width: '100%' }}
          />
          <div className="mx-auto max-w-6xl pt-20 mb-20 relative">  
            <section className="relative">            
              <div className="mb-10">
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="flex flex-col space-y-6 max-w-lg">
                    <h2 className="text-xl font-normal uppercase">Who We Work With</h2>
                    <h3 className="text-3xl font-normal">Trusted by <span className="font-semibold text-[#F25849]">brands</span>,<br/> <span className="font-semibold text-[#F2B706]">NGOs</span>, and <span className="font-semibold text-[#84C1D9]">institutions</span><br/> building across Africa</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our network supports global brands, regional NGOs, 
                      and mission-driven organizations expanding into African markets.<br/><br/> 
                      Whether you're launching a digital campaign, activating in new regions, 
                      or building long-term brand presence, we help you find the right creative and strategic partners.
                    </p> 
                  </div>
                  <div className="mx-auto md:mx-0 flex justify-center">
                    <img 
                      src="/assets/images/who-we-work-with.png" 
                      alt="Professional woman" 
                      className="rounded-lg w-full max-w-md h-auto object-cover" 
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="relative bg-[#172840]">
        <div className="absolute right-0 top-1/8 transform -translate-y-1/2 z-10">
            <Image 
              src="/assets/images/right-pattern.png" 
              width={80} 
              height={80} 
              alt="PAAN Summit" 
              className="opacity-80" 
            />
        </div>
        <div className="mx-auto max-w-6xl pt-20 relative">
          <section className="relative">            
            <div className="mb-0">
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                <div className="text-white flex flex-col space-y-6 max-w-lg pb-10">
                  <h2 className="text-white text-xl font-normal uppercase">How it works</h2>
                  <h3 className="text-white text-3xl font-normal">It's easy to get started.</h3>
                  <Image
                    src="/assets/images/how-it-works.png"
                    width={300}
                    height={300}
                    alt="How it works"
                  />
                  <div className="pt-4">
                    <button 
                      onClick={openModal}
                      className="bg-[#F25849] text-[#172840] py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] hover:shadow-lg font-medium text-sm tracking-wider"
                    >
                      Submit Your Brief
                    </button>
                  </div>
                </div>                  
                <div className="mx-auto md:mx-0 flex justify-center">
                  <VerticalSteps />
                </div>
              </div>
            </div>
          </section>
        </div>
        </div>

        <AgencyLogosGrid />

        <div className="relative w-full bg-gray-900 overflow-visible h-[70vh] min-h-[500px]">
        <div className="absolute -bottom-9 left-[40%] w-12 h-12 bg-[#84C1D9] rounded-full z-10"></div>
        <div className="absolute bottom-10 left-[60%] w-8 h-8 bg-[#84C1D9] rounded-full z-10"></div>
        <div className="absolute -bottom-9 right-40 w-20 h-20 bg-[#F2B706] rounded-full z-10"></div>
        <div className="absolute top-4 right-20 w-11 h-11 bg-[#F25849] rounded-full z-10"></div>

          {/* Background image positioned to cover full container */}
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/images/build-with-confidence.png')"
            }}
          />
          <div className="relative h-full flex mx-auto max-w-6xl">
            <div className="max-w-6xl px-6 md:px-8 py-16 flex flex-col justify-center h-full">
              <div className="max-w-2xl text-left space-y-4">
                <h3 className="text-md text-[#172840] relative uppercase font-semibold">
                  Build With Confidence
                </h3>
                <h2 className="text-3xl md:text-4xl text-[#172840] relative font-semibold leading-tight">
                  Ready to scale your <br/>work across Africa?
                </h2>
                <p className="text-[#172840] text-base md:text-lg mb-6 font-light max-w-lg">
                  Don't build a patchwork of vendors. Work with a network designed for scale, fluency, and performance.
                </p>  
                <button 
                  onClick={openModal}
                  className="bg-[#F25849] border border-[#F25849] text-[#172840] py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-medium text-sm"
                >
                  Find Your Delivery Partner
                </button>             
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
      </main>
    </>
  );
};

const Hero = ({ openModal }) => {
  return (
    <div
      className="relative h-screen w-full bg-gray-900 overflow-visible" 
      id="home"
    >
      {/* Background image positioned to cover full container */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/agency-hero-bg.png')"
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative h-full flex mx-auto max-w-6xl">
        <div className="max-w-6xl px-6 md:px-8 pb-44 flex flex-col justify-end h-full">
          <div className="max-w-2xl text-left space-y-4">
            <h1 className="text-md text-white relative uppercase">
              Grow Your Brand in Africa
            </h1>
            <h2 className="text-3xl text-white relative font-semibold">
              With <span className="text-[#F25849]">Partners</span> You Can <span className="text-[#F2B706]">Trust</span>
            </h2>
            <p className="text-white text-lg mb-6 font-light w-full">
              Work with certified agencies and freelancers who understand the
              markets, move fast, and deliver with cultural fluency.
            </p>  
            <button 
              onClick={openModal}
              className="bg-transparent border border-white text-white py-3 px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm"
            >
              Find Your Delivery Partner
            </button>             
          </div>
        </div>
      </div>

      {/* Overlapping cards positioned at bottom with consistent width */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-6 md:px-8 z-10">
        <div className="flex gap-8 justify-center">
          <div className="w-56 h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2">
              <div>
                <Image
                  src="/assets/images/icons/agencies.png"
                  width={40}
                  height={40}
                  alt="Icon"
                  className="items-left"
                />
              </div>
              <h2 className="font-semibold text-base">200+ <br />Agencies</h2>
              <p className="font-light text-sm">Certified and trusted for campaign execution</p>
            </div>
          </div>
          <div className="w-56 h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2">
              <div>
                <Image
                  src="/assets/images/icons/freelancers.png"
                  width={40}
                  height={40}
                  alt="Icon"
                  className="items-left"
                />
              </div>
              <h2 className="font-semibold text-base">1000+ <br />Freelancers</h2>
              <p className="font-light text-sm">Local creative talent across Africa</p>
            </div>
          </div>
          <div className="w-56 h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2">
              <div>
                <Image
                  src="/assets/images/icons/docs.png"
                  width={40}
                  height={40}
                  alt="Icon"
                  className="items-left"
                />
              </div>
              <h2 className="font-semibold text-base">Fully Managed+ <br />Campaigns</h2>
              <p className="font-light text-sm">From briefing to rollout, we've got your back</p>
            </div>
          </div>
          <div className="w-56 h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2">
              <div>
                <Image
                  src="/assets/images/icons/creators.png"
                  width={40}
                  height={40}
                  alt="Icon"
                  className="items-left"
                />
              </div>
              <h2 className="font-semibold text-base">Vetted Creators <br />& Influencers</h2>
              <p className="font-light text-sm">Authentic voices that move markets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerticalSteps = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  
  const steps = [
    {
      number: 1,
      title: "Tell us where you want to activate and what you need."
    },
    {
      number: 2,
      title: "Get paired with certified partners across Africa."
    },
    {
      number: 3,
      title: "Work directly or with PAAN's support team for oversight."
    },
    {
      number: 4,
      title: "Execute with partners who understand your markets."
    }
  ];
  
  return (
    <div className="relative flex flex-col max-w-lg mx-auto">
      {/* Continuous vertical line through circles */}
      <div className="absolute left-6 top-0 bottom-0">
        <div className="w-0.5 bg-[#F2B706] h-full" />
      </div>
      
      {/* Steps */}
      {steps.map((step, index) => (
        <div 
          key={step.number}
          className={`flex items-center relative z-10 ${index !== steps.length - 1 ? 'mb-8' : ''}`}
          onMouseEnter={() => setHoveredStep(step.number)}
          onMouseLeave={() => setHoveredStep(null)}
        >
          {/* Circle */}
          <div 
            className={`flex items-center justify-center w-12 h-12 rounded-full bg-[#F2B706] text-white text-lg font-bold shadow-lg transition-transform duration-300 flex-shrink-0 ${hoveredStep === step.number ? 'transform scale-110' : ''}`}
          >
            {step.number}
          </div>
          
          {/* Title on the right */}
          <div className="ml-6">
            <h4 className="text-white text-base font-medium">{step.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgenciesPage;