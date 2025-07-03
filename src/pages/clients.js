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
import ScrollToTop from "@/components/ScrollToTop";
import { Icon } from "@iconify/react";

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
      <main className="sm:px-0 sm:pt-0 relative">
        <Header />
        <Hero openModal={openModal} />
        <div className="bg-white relative overflow-hidden">
          {/* Decorative circles - adjusted for mobile */}
          <div className="absolute top-20 sm:top-50 right-4 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 bg-[#F25849] rounded-full z-0"></div>
          <div className="absolute top-32 sm:top-40 left-8 sm:left-40 w-6 h-6 sm:w-8 sm:h-8 bg-[#F25849] rounded-full z-0"></div>
          <div className="absolute top-8 sm:top-10 right-20 sm:right-40 w-6 h-6 sm:w-8 sm:h-8 bg-[#F2B706] rounded-full z-0"></div>
          <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-16 w-8 h-8 sm:w-11 sm:h-11 bg-[#84C1D9] rounded-full z-0"></div>
          
          {/* Pattern positioned on left middle edge - hidden on mobile */}
          <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            <Image 
              src="/assets/images/paan-patterns.png" 
              width={80} 
              height={80} 
              alt="PAAN Summit" 
              className="opacity-80" 
            />
          </div>

          <section className="relative mx-auto max-w-6xl mt-16 sm:mt-24 md:mt-40 px-4 sm:px-6 pb-16 sm:pb-20">
            <div className="space-y-3 sm:space-y-4 text-center md:text-left">
              <h3 className="text-lg sm:text-xl text-dark uppercase font-semibold">WHY JOIN?</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-dark font-normal leading-tight">
                Africa is a mosaic of markets. You need <br className="hidden sm:block" />
                more than reach; you need readiness.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-10">
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
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    PAAN connects your brand to a trusted network of vetted agencies and freelancers across 20+ African countries.
                    <br /><br />
                    Whether you're rolling out across multiple regions or localizing a single campaign, our ecosystem gives you the agility and confidence to deliver at scale.
                  </p>
                  
                  <div className="mt-6 sm:mt-8">
                    <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-dark">We help you:</h3>
                    <ul className="space-y-3 sm:space-y-4">
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 text-[#F25849]" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18m-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"/>
                          </svg>              
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">Launch campaigns across regions with fewer unknowns</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 text-[#F25849]" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18m-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"/>
                          </svg>   
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">Localize with insight, not guesswork</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 text-[#F25849]" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18m-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"/>
                          </svg>   
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">Work with delivery partners already trusted in their markets</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>     
        <div className="relative mt-10 sm:mt-20 bg-[#84C1D9] py-6 sm:py-10">
            <section className="relative mx-auto max-w-6xl px-4 sm:px-6 space-y-2 sm:space-y-4" style={{ zIndex: 2 }}>
              <h2 className="text-base sm:text-lg uppercase font-bold text-left mb-2 sm:mb-4">What you Get</h2>
              <h3 className="text-xl sm:text-2xl font-semibold">Certified Talent. Regional Execution. Real Results</h3>
              <p className="text-xs sm:text-sm">Working with PAAN gives you access to:</p>
              <ClientsSlider openModal={openModal} />
            </section>
            {/* Background Pattern */}
            <Image
              src="/assets/images/bg-pattern.svg"
              width={0}
              height={0}
              alt="Background Pattern"
              className="absolute bottom-0 left-0 w-full h-1/4 sm:h-1/3 object-cover opacity-1 pointer-events-none"
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20 relative">
          <section className="relative">
            <div className="mb-0">
              <div>
                <h2 className="text-white text-lg sm:text-xl font-normal uppercase tracking-wide">How it works</h2>
                <h3 className="text-white text-2xl sm:text-3xl font-normal">It's easy to get started.</h3>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center pb-10">
                <div className="text-white flex flex-col justify-center items-center md:items-start space-y-4 sm:space-y-6 pb-8 sm:pb-10 text-center md:text-left h-full">
                  <div className="flex justify-center md:justify-start">
                    <Image
                      src="/assets/images/how-it-works.png"
                      width={600}
                      height={600}
                      alt="How it works"
                      className="w-full max-w-[250px] sm:max-w-full h-auto"
                    />
                  </div>                 
                </div>
                <div className="flex justify-center items-center mt-6 md:mt-0 h-full">
                  <VerticalSteps />
                </div>
              </div>
            </div>
          </section>
        </div>
        </div>

        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20"
          id="ai-brief-builder"
        >
          <section className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F25849]/10 to-[#F2B706]/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4">
              <Icon icon="fa-solid:magic" className="w-4 h-4 sm:w-5 sm:h-5 text-[#F25849]" />
              <span className="text-xs sm:text-sm font-semibold text-[#172840] uppercase tracking-wide">New Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#172840] mb-3 sm:mb-4">
              PAAN AI Brief Builder
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your creative vision into comprehensive, professional briefs in minutes. 
              Our AI-powered tool helps you articulate project requirements, target audience insights, 
              and success metrics with industry expertise.
            </p>
          </section>
          
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mt-12 sm:mt-16">
            {/* Left side - Detailed Introduction */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#172840] mb-3 sm:mb-4">
                  Why Use AI Brief Builder?
                </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  Creating effective creative briefs is crucial for successful campaigns, but it's often time-consuming 
                  and requires deep expertise. Our AI Brief Builder eliminates the guesswork and helps you create 
                  professional briefs that clearly communicate your vision to agencies and freelancers.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-semibold text-[#172840]">What You Get:</h4>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#F25849]/10 rounded-full flex items-center justify-center">
                      <Icon icon="mdi:file-document-outline" className="w-4 h-4 sm:w-5 sm:h-5 text-[#F25849]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#172840] mb-1 text-sm sm:text-base">Comprehensive Project Briefs</h5>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Generate detailed briefs including project overview, objectives, target audience analysis, 
                        creative direction, deliverables, timeline, and success metrics.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#F2B706]/10 rounded-full flex items-center justify-center">
                      <Icon icon="mdi:target" className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2B706]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#172840] mb-1 text-sm sm:text-base">Industry-Specific Insights</h5>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Tailored recommendations based on your industry, market, and campaign type. 
                        Get context-aware suggestions for African markets and cultural considerations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#84C1D9]/10 rounded-full flex items-center justify-center">
                      <Icon icon="mdi:clock-outline" className="w-4 h-4 sm:w-5 sm:h-5 text-[#84C1D9]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#172840] mb-1 text-sm sm:text-base">Time-Saving Efficiency</h5>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Create professional briefs in minutes instead of hours. Focus on strategy while 
                        our AI handles the structure and formatting.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#F25849]/10 rounded-full flex items-center justify-center">
                      <Icon icon="mdi:share-variant" className="w-4 h-4 sm:w-5 sm:h-5 text-[#F25849]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#172840] mb-1 text-sm sm:text-base">Easy Export & Collaboration</h5>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Download briefs as professional documents or copy to clipboard. 
                        Share seamlessly with your team and PAAN partners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#F25849]/5 to-[#F2B706]/5 p-4 sm:p-6 rounded-xl border border-[#F25849]/20">
                <h4 className="font-semibold text-[#172840] mb-2 sm:mb-3 text-sm sm:text-base">Perfect For:</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="w-3 h-3 sm:w-4 sm:h-4 text-[#F25849]" />
                    Marketing managers launching campaigns across African markets
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="w-3 h-3 sm:w-4 sm:h-4 text-[#F25849]" />
                    Brand managers needing consistent briefs for multiple projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="w-3 h-3 sm:w-4 sm:h-4 text-[#F25849]" />
                    Agencies looking to streamline client onboarding
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="w-3 h-3 sm:w-4 sm:h-4 text-[#F25849]" />
                    Teams working with PAAN's network of certified partners
                  </li>
                </ul>
              </div>
              
              <div className="pt-4 sm:pt-6">
                <Link
                  href="/ai-brief-builder"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#F25849] to-[#F2B706] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-[#D6473C] hover:to-[#E6A800] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Icon icon="fa-solid:magic" className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start Building Your Brief
                </Link>
                <p className="text-xs text-gray-500 mt-2">Free to use • No registration required</p>
              </div>
            </div>
            
            {/* Right side - Enhanced Visual */}
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-[#84C1D9]/10 to-[#F2B706]/10 p-6 sm:p-8 rounded-2xl border border-[#84C1D9]/30">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                  {/* Browser header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#F25849] rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#F2B706] rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#84C1D9] rounded-full"></div>
                    <div className="ml-3 sm:ml-4 text-xs sm:text-sm text-gray-500">PAAN AI Brief Builder</div>
                  </div>
                  
                  {/* Form elements */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700">Project Type</label>
                      <div className="h-7 sm:h-8 bg-gray-100 rounded border-l-4 border-[#F25849] px-2 sm:px-3 flex items-center">
                        <span className="text-xs sm:text-sm text-gray-600">Digital Marketing Campaign</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700">Target Market</label>
                      <div className="h-7 sm:h-8 bg-gray-100 rounded border-l-4 border-[#F2B706] px-2 sm:px-3 flex items-center">
                        <span className="text-xs sm:text-sm text-gray-600">East Africa (Kenya, Tanzania, Uganda)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700">Campaign Objective</label>
                      <div className="h-7 sm:h-8 bg-gray-100 rounded border-l-4 border-[#84C1D9] px-2 sm:px-3 flex items-center">
                        <span className="text-xs sm:text-sm text-gray-600">Brand Awareness & Lead Generation</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Processing indicator */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-[#F25849]/10 to-[#F2B706]/10 rounded-lg border border-[#F25849]/20">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-[#F25849] border-t-transparent"></div>
                      <div className="text-[#F25849] text-xs sm:text-sm font-medium">AI is generating your professional brief...</div>
                    </div>
                  </div>
                  
                  {/* Generated brief preview */}
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-[#84C1D9]/5 rounded-lg border border-[#84C1D9]/20">
                    <div className="flex items-center gap-2 text-[#84C1D9] text-xs sm:text-sm font-medium mb-2">
                      <Icon icon="mdi:file-check" className="w-3 h-3 sm:w-4 sm:h-4" />
                      Generated Brief Preview
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="h-2 sm:h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 sm:h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 sm:h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-6 sm:w-8 h-6 sm:h-8 bg-[#F25849] rounded-full opacity-20"></div>
              <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-5 sm:w-6 h-5 sm:h-6 bg-[#F2B706] rounded-full opacity-20"></div>
              <div className="absolute top-1/2 -right-2 w-3 sm:w-4 h-3 sm:h-4 bg-[#84C1D9] rounded-full opacity-30"></div>
              
              {/* Success metrics */}
              <div className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 bg-white p-3 sm:p-4 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-[#F25849]">95%</div>
                  <div className="text-xs text-gray-600">Time Saved</div>
                </div>
              </div>
              
              <div className="absolute -top-6 sm:-top-8 -right-6 sm:-right-8 bg-white p-3 sm:p-4 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-[#F2B706]">100%</div>
                  <div className="text-xs text-gray-600">Professional Quality</div>
                </div>
              </div>
            </div>
          </section>
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
        <ScrollToTop />
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
        <div className="w-full px-4 sm:px-6 md:px-8 pb-8 sm:pb-44 flex flex-col justify-center sm:justify-end h-full">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
            <h1 className="text-sm sm:text-md text-white relative uppercase tracking-wide">
              Grow Your Brand in Africa
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white relative font-semibold leading-tight">
              With <span className="text-[#F25849]">Partners</span> You Can <span className="text-[#F2B706]">Trust</span>
            </h2>
            <p className="text-white text-base sm:text-lg mb-6 font-light w-full leading-relaxed">
              Work with certified agencies and freelancers who understand the
              markets, move fast, and deliver with cultural fluency.
            </p>  
            <button 
              onClick={openModal}
              className="bg-transparent border border-white text-white py-3 px-8 sm:px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-full sm:w-auto"
            >
              Find Your Delivery Partner
            </button>             
          </div>
        </div>
      </div>

      {/* Overlapping cards positioned at bottom with responsive layout - hidden on mobile */}
      <div className="absolute -bottom-8 sm:-bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 md:px-8 z-10 hidden sm:block">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="w-full h-40 sm:h-48 p-4 sm:p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start">
                <Image
                  src="/assets/images/icons/agencies.png"
                  width={32}
                  height={32}
                  alt="Icon"
                  className="sm:w-10 sm:h-10"
                />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">200+ <br />Agencies</h2>
              <p className="font-light text-xs sm:text-sm">Certified and trusted for campaign execution</p>
            </div>
          </div>
          <div className="w-full h-40 sm:h-48 p-4 sm:p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start">
                <Image
                  src="/assets/images/icons/freelancers.png"
                  width={32}
                  height={32}
                  alt="Icon"
                  className="sm:w-10 sm:h-10"
                />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">1000+ <br />Freelancers</h2>
              <p className="font-light text-xs sm:text-sm">Local creative talent across Africa</p>
            </div>
          </div>
          <div className="w-full h-40 sm:h-48 p-4 sm:p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start">
                <Image
                  src="/assets/images/icons/docs.png"
                  width={32}
                  height={32}
                  alt="Icon"
                  className="sm:w-10 sm:h-10"
                />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">Fully Managed+ <br />Campaigns</h2>
              <p className="font-light text-xs sm:text-sm">From briefing to rollout, we've got your back</p>
            </div>
          </div>
          <div className="w-full h-40 sm:h-48 p-4 sm:p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start">
                <Image
                  src="/assets/images/icons/creators.png"
                  width={32}
                  height={32}
                  alt="Icon"
                  className="sm:w-10 sm:h-10"
                />
              </div>
              <h2 className="font-semibold text-sm sm:text-base">Vetted Creators <br />& Influencers</h2>
              <p className="font-light text-xs sm:text-sm">Authentic voices that move markets</p>
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
      title:"Share Your Brief",
      desc: "Tell us where you want to activate and what you need."
    },
    {
      number: 2,
      title:"We Match You",
      desc: "Get paired with certified partners across Africa."
    },
    {
      number: 3,
      title:"Collaborate Your Way",
      desc: "Work directly or with PAAN's support team for oversight."
    },
    {
      number: 4,
      title:"Launch Your Confidence",
      desc: "Execute with partners who understand your markets."
    }
  ];
  
  return (
    <div className="relative flex flex-col max-w-lg mx-auto">
      {/* Vertical line that starts from center of first circle to center of last circle */}
      <div className="absolute left-6 z-0" style={{
        top: '24px', // Half of circle height (48px / 2 = 24px)
        height: `calc(100% - 48px)` // Full height minus one full circle height
      }}>
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
            className={`flex items-center justify-center w-12 h-12 rounded-full bg-[#F2B706] text-[#172840] text-lg font-bold shadow-lg transition-transform duration-300 flex-shrink-0 ${hoveredStep === step.number ? 'transform scale-110' : ''}`}
          >
            {step.number}
          </div>
          
          {/* Title on the right */}
          <div className="ml-6">
            <h4 className="text-[#84C1D9] text-base font-medium">{step.title}</h4>
            <p className="text-white font-light">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default AgenciesPage;