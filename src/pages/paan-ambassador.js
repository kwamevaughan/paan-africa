import SEO from "@/components/SEO";
import Header from "../layouts/ambassador-header";
import Image from "next/image";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import AmbassadorPageParallax from "@/components/AmbassadorPageParallax";
import BecomeAmbassadorModal from "@/components/BecomeAmbassadorModal";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";

const PAANAmbassador = () => {
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

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

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
  };

  return (
    <>
      <SEO
        title="PAAN Ambassador Program | Become a Leader in Africa's Creative Economy | Pan-African Agency Network"
        description="Join the exclusive PAAN Ambassador Program and become a trusted leader in Africa's creative, digital, and strategic industries. Represent the future of African agencies and unlock exclusive benefits, VIP access, and thought leadership opportunities across 20+ African countries."
        keywords="PAAN Ambassador Program, African creative leaders, African marketing ambassadors, African digital leaders, African strategic leadership, PAAN network ambassadors, African creative economy, African marketing network leadership, African agency representatives, African industry leaders, African creative professionals, African digital professionals, African strategic professionals, African marketing leadership, African creative leadership, African digital leadership, African strategic leadership, African industry ambassadors, African creative ambassadors, African digital ambassadors, African strategic ambassadors, African marketing ambassadors, African creative economy leaders, African digital economy leaders, African strategic economy leaders, African marketing economy leaders, African creative industry leaders, African digital industry leaders, African strategic industry leaders, African marketing industry leaders"
      />
      <main className="sm:px-0 sm:pt-0 relative">
        <Header />
        <Hero openModal={openModal} />
        <div className="bg-paan-blue relative overflow-hidden">
            <section className="relative mx-auto max-w-6xl mt-8 sm:mt-12 md:mt-20 px-4 sm:px-6 pb-16 sm:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6">
                    <div className="space-y-4">
                    <h2 className="text-l sm:text-xl lg:text-2xl font-bold text-paan-dark-blue uppercase">
                        Leadership with Purpose
                    </h2>
                    <h3 className="text-paan-dark-blue text-2xl sm:text-4xl font-normal leading-relaxed">
                        This isn't a role for everyone.<br/> It's a role for changemakers.
                    </h3>
                    </div>
                    
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed">
                    The PAAN Ambassador Program is not open to everyone. It is a carefully curated initiative for a select group of professionals across Africa who stand at the intersection of leadership, connection, and continental growth.
                    </p>
                    
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed">
                        As a PAAN Ambassador, you don't just represent a network — you represent the future of Africa's creative, digital, and strategic industries. You are a trusted connector, a voice of credibility, and a champion of excellence.
                    </p>
                    <button 
                    onClick={openModal}
                    className="bg-paan-red border border-paan-red mt-10 text-white py-3 px-8 sm:px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-full sm:w-auto"
                    >
                        Become an Ambassador
                    </button>
                </div>
                
                <div className="flex justify-center lg:justify-end">
                    <div className="w-full max-w-md lg:max-w-lg">
                    <Image
                        src="/assets/images/leadership-img.webp"
                        width={400}
                        height={400}
                        alt="Leadership illustration"
                    />
                    </div>
                </div>
                </div>
            </section>
        </div>   
       

        <div className="relative bg-[#172840]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
                <section className="relative">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
                    <div className="space-y-4">
                    <h2 className="text-paan-yellow uppercase text-sm font-semibold tracking-wider">
                        Why This Matters — And Why You Were Chosen
                    </h2>
                    <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light leading-tight">
                        Your voice, credibility, and leadership are essential to Africa's growth story.
                    </h3>
                    </div>
                    <div className="flex items-center">
                    <p className="text-white text-lg leading-relaxed">
                        Africa's creative economy is on the rise — but remains fragmented. PAAN exists to bridge that gap, and you are a key part of that bridge. As a PAAN Ambassador, you:
                    </p>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 lg:mb-16">
                    <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                    <div className="mb-6">
                        <img
                        src="/assets/images/icons/open-doors.svg"
                        width="80"
                        height="80"
                        className="w-20 h-20"
                        alt="Open doors"
                        />
                    </div>
                    <p className="text-paan-dark-blue text-lg font-medium leading-relaxed">
                        Open doors for local agencies to access opportunities across Africa.
                    </p>
                    </div>

                    <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                    <div className="mb-6">
                        <img
                        src="/assets/images/icons/collaborate.svg"
                        width="80"
                        height="80"
                        className="w-20 h-20"
                        alt="Collaborate"
                        />
                    </div>
                    <p className="text-paan-dark-blue text-lg font-medium leading-relaxed">
                        Represent a trusted brand committed to collaboration, quality, and integrity.
                    </p>
                    </div>

                    <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                    <div className="mb-6">
                        <img
                        src="/assets/images/icons/insights.svg"
                        width="80"
                        height="80"
                        className="w-20 h-20"
                        alt="Insights"
                        />
                    </div>
                    <p className="text-paan-dark-blue text-lg font-medium leading-relaxed">
                        Gather insights that shape how we grow continent-wide.
                    </p>
                    </div>

                    <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                    <div className="mb-6">
                        <img
                        src="/assets/images/icons/ecosystem.svg"
                        width="80"
                        height="80"
                        className="w-20 h-20"
                        alt="Ecosystem"
                        />
                    </div>
                    <p className="text-paan-dark-blue text-lg font-medium leading-relaxed">
                        Champion your local ecosystem, while being part of a larger vision.
                    </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                    <p className="text-white text-2xl sm:text-3xl font-light leading-tight">
                        This is more than a role. It's a platform for leaders. And that leader is you.
                    </p>
                    </div>
                    <div className="flex justify-start lg:justify-end">
                    <button 
                        onClick={openModal}
                        className="bg-paan-red border border-paan-red text-white py-4 px-8 sm:px-12 rounded-full hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg font-medium text-base"
                    >
                        Become an Ambassador
                    </button>  
                    </div>
                </div>
                </section>
            </div>
        </div>
        <div className="bg-white relative overflow-hidden">
          <section className="relative mx-auto max-w-6xl mt-16 sm:mt-24 md:mt-40 px-4 sm:px-6 pb-16 sm:pb-20">
            <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-10">
              <div className="flex flex-col gap-4 order-2 md:order-1">
                <Image 
                  src="/assets/images/influence-in-action.webp" 
                  width={300} 
                  height={200} 
                  alt="PAAN Summit" 
                  className="w-full h-auto object-cover rounded-lg" 
                />
              </div>
              
              <div className="flex flex-col order-1 md:order-2">
                <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl text-dark uppercase font-semibold">Your Influence, In Action</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-dark font-normal leading-tight">
                PAAN Ambassadors don't observe - they activate, elevate, and shape.
              </h2>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    As a PAAN Ambassador, your responsibilities are impactful and intentional. You are expected to:
                  </p>
                  
                  <div className="mt-6 sm:mt-8">
                    <ul className="space-y-3 sm:space-y-4">
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>            
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">Shared Resources & Tools PAAN<br/> Certification Credibility</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg> 
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">Engage with communities, events, and<br/> industry forums</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>  
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">Share trends, barriers, and opportunities<br/> from your country</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>  
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">Join internal PAAN conversations,<br/> strategy calls, and regional activations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="relative bg-paan-blue">
          <section className="relative mx-auto max-w-6xl mt-0 px-4 sm:px-6 pb-16 sm:pb-20">
            <div className="space-y-3 sm:space-y-4 text-center md:text-left pt-10">
              <h2 className="text-paan-dark-blue text-sm sm:text-md md:text-xl font-bold uppercase">Rewards for Visionaries</h2>
              <p className="text-paan-dark-blue text-xl sm:text-2xl mb-6 font-normal max-w-lg">With great responsibility comes exclusive recognition and support.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-left text-left hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                  <div className="mb-6">
                    <img src="/assets/images/icons/recognition.svg" width="80" height="80" className="w-20 h-20" alt="Open doors" />
                  </div>
                  <h4 className="text-paan-dark-blue text-lg font-medium leading-relaxed text-left">Recognition</h4>
                  <p className="text-paan-dark-blue text-md font-light leading-relaxed text-left">Featured across PAAN's digital platforms, magazine, and events.</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-left text-left hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                  <div className="mb-6">
                    <img src="/assets/images/icons/vip.svg" width="80" height="80" className="w-20 h-20" alt="Open doors" />
                  </div>
                  <h4 className="text-paan-dark-blue text-lg font-medium leading-relaxed text-left">VIP Summit Access</h4>
                  <p className="text-paan-dark-blue text-md font-light leading-relaxed text-left">Special access to attend and connect at exclusive ecosystem gatherings.</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-left text-left hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                  <div className="mb-6">
                    <img src="/assets/images/icons/leadership.svg" width="80" height="80" className="w-20 h-20" alt="Open doors" />
                  </div>
                  <h4 className="text-paan-dark-blue text-lg font-medium leading-relaxed text-left">Thought Leadership</h4>
                  <p className="text-paan-dark-blue text-md font-light leading-relaxed text-left">Opportunities to speak, publish, and join high-impact panels.</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-left text-left hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                  <div className="mb-6">
                    <img src="/assets/images/icons/finance.svg" width="80" height="80" className="w-20 h-20" alt="Open doors" />
                  </div>
                  <h4 className="text-paan-dark-blue text-lg font-medium leading-relaxed text-left">Financial Benefits</h4>
                  <p className="text-paan-dark-blue text-md font-light leading-relaxed text-left">Enjoy exclusive incentives based on your ambassador impact.</p>
                </div>
              </div>
            </div>            
          </section>
        </div>

        <AmbassadorPageParallax openModal={openModal} />
        <div className="relative bg-gradient-to-b from-white to-gray-50">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-paan-dark-blue text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide mb-4">
                Let's Get You Started
              </h2>
              <p className="text-paan-dark-blue text-2xl sm:text-3xl md:text-4xl font-light leading-tight">
                Three simple steps to activate your influence.
              </p>
            </div>
            
            <div className="grid gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="group relative bg-white border-2 border-paan-dark-blue rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-paan-red/10 to-paan-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-1 -left-1 w-0 h-0 bg-gradient-to-br from-paan-red/20 to-transparent group-hover:w-32 group-hover:h-32 transition-all duration-700 ease-out rounded-br-full"></div>
                <div className="relative z-10">
                  <div className="absolute top-4 right-4 bg-paan-dark-blue text-white text-xs font-bold px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                    01
                  </div>
                  <div className="pr-12">
                    <h3 className="text-paan-dark-blue text-lg sm:text-xl font-bold uppercase mb-3 tracking-wide group-hover:text-paan-red transition-colors duration-300">
                      Step 1
                    </h3>
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed group-hover:text-paan-red transition-colors duration-300">
                      Share your details with us →{' '}
                      <a 
                        href="mailto:secretariat@paan.africa" 
                        className="font-semibold underline decoration-2 underline-offset-2 hover:decoration-4 transition-all"
                      >
                        secretariat@paan.africa
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white border-2 border-paan-dark-blue rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-paan-yellow/10 to-paan-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-1 -right-1 w-0 h-0 bg-gradient-to-bl from-paan-yellow/20 to-transparent group-hover:w-32 group-hover:h-32 transition-all duration-700 ease-out rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="absolute top-4 right-4 bg-paan-dark-blue text-white text-xs font-bold px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                    02
                  </div>
                  <div className="pr-12">
                    <h3 className="text-paan-dark-blue text-lg sm:text-xl font-bold uppercase mb-3 tracking-wide group-hover:text-paan-yellow transition-colors duration-300">
                      Step 2
                    </h3>
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed group-hover:text-paan-yellow transition-colors duration-300">
                      Receive your Welcome Kit & attend the onboarding call
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white border-2 border-paan-dark-blue rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-paan-blue/10 to-paan-dark-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-1 -left-1 w-0 h-0 bg-gradient-to-tr from-paan-blue/20 to-transparent group-hover:w-32 group-hover:h-32 transition-all duration-700 ease-out rounded-tr-full"></div>
                <div className="absolute -bottom-1 -right-1 w-0 h-0 bg-gradient-to-tl from-paan-dark-blue/10 to-transparent group-hover:w-24 group-hover:h-24 transition-all duration-500 ease-out rounded-tl-full"></div>
                <div className="relative z-10">
                  <div className="absolute top-4 right-4 bg-paan-dark-blue text-white text-xs font-bold px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                    03
                  </div>
                  <div className="pr-12">
                    <h3 className="text-paan-dark-blue text-lg sm:text-xl font-bold uppercase mb-3 tracking-wide group-hover:text-paan-blue transition-colors duration-300">
                      Step 3
                    </h3>
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed group-hover:text-paan-blue transition-colors duration-300">
                      Start activating your network with PAAN HQ behind you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ContactSection />
        <Footer />
        <BecomeAmbassadorModal isOpen={isModalOpen} onClose={closeModal} />
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
          backgroundImage: "url('/assets/images/ambassador-hero.webp')"
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative h-full flex mx-auto max-w-6xl">
        <div className="w-full px-4 sm:px-6 md:px-8 pb-0 sm:pb-24 flex flex-col justify-center sm:justify-end h-full">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
            <h1 className="text-4xl text-white font-bold uppercase">
                The PAAN<br/> Ambassador Program
            </h1>
            <p className="text-white text-base sm:text-lg mb-6 font-light w-full leading-relaxed">
                Powering Africa's Creative Future — One Leader at a Time
            </p>  
            <button 
              onClick={openModal}
              className="bg-paan-red border border-paan-red text-white py-3 px-8 sm:px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-full sm:w-auto"
            >
                Become an Ambassador
            </button>             
          </div>
        </div>
      </div>
    </div>
  );
};

export default PAANAmbassador;