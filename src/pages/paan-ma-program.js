import SEO from "@/components/SEO";
import PaanMaHeader from "../layouts/paan-ma-header";
import Image from "next/image";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import EnquiryModal from "@/components/EnquiryModal";
import MaConsultationModal from "@/components/MaConsultationModal";
import ScrollToTop from "@/components/ScrollToTop";
import Accordion from "@/components/Accordion";
import { motion } from "framer-motion";

const PaanMaPage = () => {
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
  const [isMaModalOpen, setIsMaModalOpen] = useState(false);

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
  const openMaModal = () => setIsMaModalOpen(true);
  const closeMaModal = () => setIsMaModalOpen(false);

  return (
    <>
      <SEO
        title="Grow Your Brand in Africa with Trusted Partners | Pan-African Agency Network (PAAN)"
        description="Connect with certified agencies and freelancers across 20+ African countries to launch campaigns with cultural fluency and regional expertise. Find your delivery partner today."
        keywords="African marketing, certified agencies Africa, freelancers Africa, campaign execution, PAAN Summit, brand growth Africa, vetted creators, regional campaigns, Africa marketing, African marketing agencies, African freelancers, African marketing network, African marketing solutions, African marketing experts, African marketing professionals, African marketing services, African marketing consultants, African marketing agencies, African marketing freelancers, African marketing network, African marketing solutions, African marketing experts, African marketing professionals, African marketing services, African marketing consultants"
      />
      <main className="relative">
        <PaanMaHeader openModal={openMaModal} />
        <Hero openModal={openMaModal} />
        {/* Lead the way */}
        <div id="vision" className="bg-[#E6F3F7] relative overflow-hidden">       
          <section className="relative mx-auto max-w-6xl py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-base sm:text-lg lg:text-xl font-normal uppercase text-[#172840]">Lead with the Vision</h2>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#172840] leading-tight">From Local Player to Continental Leader</h3>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg"
                >
                  The African creative and marketing industry is at an inflection point. Borders are fading and the biggest opportunities belong to agencies bold enough to make strategic moves.
                  <br/><br/>
                  The PAAN M&A Program gives you the platform, people, and process to make it happen with confidence.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex justify-center lg:justify-start"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openMaModal}
                    className="bg-paan-red text-white px-6 py-3 sm:px-8 rounded-full hover:bg-orange-600 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center gap-2 w-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Book Consultation
                  </motion.button>
                </motion.div>
              </motion.div>
              
                              <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="order-first lg:order-last"
                >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white shadow-lg rounded-xl p-6 md:p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col items-left text-left space-y-4">
                      <motion.div 
                        whileHover={{ rotate: 5 }}
                        className="flex items-left justify-left"
                      >
                        <Image 
                          src="/assets/images/ma-program/1.svg" 
                          width={96} 
                          height={96} 
                          alt="Acquire across Africa" 
                          className="w-20 h-20"
                        />
                      </motion.div>
                      <h4 className="text-md font-semibold text-[#172840]">Acquire across Africa</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          Enter new markets by acquiring a thriving agency.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white shadow-lg rounded-xl p-6 md:p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col items-left text-left space-y-4">
                      <motion.div 
                        whileHover={{ rotate: 5 }}
                        className="flex items-left justify-left"
                      >
                        <Image 
                          src="/assets/images/ma-program/2.svg" 
                          width={96} 
                          height={96} 
                          alt="Merge to win bigger" 
                          className="w-20 h-20"
                        />
                      </motion.div>
                      <h4 className="text-md font-semibold text-[#172840]">Merge to win bigger</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          Unlock scale and capability to land larger contracts.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white shadow-lg rounded-xl p-6 md:p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col items-left text-left space-y-4">
                      <motion.div 
                        whileHover={{ rotate: 5 }}
                        className="flex items-left justify-left"
                      >
                        <Image 
                          src="/assets/images/ma-program/3.svg" 
                          width={96} 
                          height={96} 
                          alt="Sell for a strong exit" 
                          className="w-20 h-20"
                        />
                      </motion.div>
                      <h4 className="text-md font-semibold text-[#172840]">Sell for a strong exit</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Secure a profitable, well-structured exit.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white shadow-lg rounded-xl p-6 md:p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col items-left text-left space-y-4">
                      <motion.div 
                        whileHover={{ rotate: 5 }}
                        className="flex items-left justify-left"
                      >
                        <Image 
                          src="/assets/images/ma-program/4.svg" 
                          width={96} 
                          height={96} 
                          alt="Expand capabilities" 
                          className="w-20 h-20"
                        />
                      </motion.div>
                      <h4 className="text-md font-semibold text-[#172840]">Expand capabilities</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Add new services and enter new industries.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>     

        {/* Power of partnership */}
        <div id="partnership" className="relative bg-white py-16 sm:py-20">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6" style={{ zIndex: 2 }}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-lg sm:text-xl font-normal uppercase text-[#172840] mb-4">The Power of the Partnership</h2>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#172840] leading-tight">A Partnership Built for Africa's Biggest Moves</h3>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#E6F3F7] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col items-left text-left space-y-2">
                      <Image 
                        src="/assets/images/ma-program/paan-logo.svg" 
                        alt="PAAN Logo" 
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain" 
                      />
              <div>
                        <p className="text-gray-700 text-xs leading-relaxed"><span className="font-semibold">PAAN: </span>
                          Unmatched access to Africa's most connected network of agencies.
                      </p>
                    </div>
                    </div>
                  </div>
                  
                  <div className="bg-paan-dark-blue p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col items-left text-left space-y-2">
                      <Image 
                        src="/assets/images/ma-program/agency-futures-logo.avif" 
                        alt="Future Agencies Logo" 
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain" 
                      />
                    <div>
                        <p className="text-white text-xs leading-relaxed"><span className="font-semibold">Future Agencies: </span>
                          Decades of global deal‑making experience in creative, marketing, and professional services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
                <div className="mt-8">
                  <Accordion 
                    items={[
                      {
                        title: "Exclusive deal flow",
                        content: "Opportunities you won’t find on the open market — sourced through PAAN’s trusted network."
                      },
                      {
                        title: "Who can participate in the program?",
                        content: "The program is open to established marketing and creative agencies across Africa who are looking to expand their reach, merge with complementary businesses, or prepare for a strategic exit. We work with agencies of all sizes, from boutique studios to regional powerhouses."
                      },
                      {
                        title: "What services does PAAN provide?",
                        content: "PAAN provides comprehensive M&A support including deal sourcing, due diligence, valuation services, negotiation support, and post-transaction integration guidance. We also offer strategic consulting to help agencies position themselves for successful transactions."
                      },
                      {
                        title: "How long does the M&A process typically take?",
                        content: "The timeline varies depending on the complexity of the transaction, but typically ranges from 6-18 months from initial consultation to deal closure. We work closely with all parties to ensure a smooth and efficient process."
                      },
                      {
                        title: "What are the costs involved?",
                        content: "Our fee structure is transparent and success-based. We offer an initial consultation at no cost, followed by a structured fee arrangement that aligns with your transaction goals. Contact us for a detailed breakdown of our services and pricing."
                      }
                    ]}
                  />
              </div>
            </div>
            
              <div className="flex justify-center lg:justify-end h-full">
                <div className="relative h-full flex items-center">
                  <Image
                    src="/assets/images/ma-program/partnership.png" 
                    width={400} 
                    height={400} 
                    alt="Partnership" 
                    className="w-full max-w-sm lg:max-w-md h-full object-contain"
                    />
                    </div>
                  </div>
                      </div>
            </section>
                    </div>
                    
        {/* How it works */}
        <div id="how-it-works" className="bg-[#172840] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">  
          <section className="relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mb-12 sm:mb-16"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg sm:text-xl font-normal uppercase text-white mb-4"
                >
                  How it works
                </motion.h2>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-semibold text-white leading-tight"
                >
                  Your Journey to Strategic Growth
                </motion.h3>
              </motion.div>
              
                              <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12"
                >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-4 h-full">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-[#172840] rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-lg font-bold">1</span>
                    </motion.div>
                    <h4 className="text-[#172840] text-lg font-semibold">Discover</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Confidential consultation to understand your goals and positioning.
                    </p>
                      </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-4 h-full">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-paan-red rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-lg font-bold">2</span>
                    </motion.div>
                    <h4 className="text-[#172840] text-lg font-semibold">Match</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Access a curated list of potential buyers, sellers, or partners.
                    </p>
                    </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-4 h-full">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-[#84C1D9] rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-lg font-bold">3</span>
                    </motion.div>
                    <h4 className="text-[#172840] text-lg font-semibold">Strategize</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Deal structure, valuation, and negotiation guidance from seasoned experts.
                    </p>
                      </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-4 h-full">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-[#F2B706] rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-lg font-bold">4</span>
                    </motion.div>
                    <h4 className="text-[#172840] text-lg font-semibold">Close & Grow</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We handle the heavy lifting so you can focus on the future.
                    </p>
                    </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openMaModal}
                  className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2 mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Book Consultation
                </motion.button>
              </motion.div>
            </section>
                    </div>
                  </div>
                  
        {/* Who Should Join */}
        <div id="who-should-join" className="relative bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <section>
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-lg sm:text-xl font-normal uppercase text-[#172840] mb-4">Who should Join</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="flex justify-center lg:justify-start">
                  <Image
                    src="/assets/images/ma-program/who-should-join.png" 
                    width={400} 
                    height={400} 
                    alt="Partnership" 
                    className="w-full max-w-sm lg:max-w-md h-auto object-contain"
                />
              </div>  
              
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-[#172840]">Scaling Agencies</h4>
                    <p className="text-gray-600 leading-relaxed">Ready to expand regionally or globally.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-[#172840]">Exit‑Ready Leaders</h4>
                    <p className="text-gray-600 leading-relaxed">Planning a strategic sale or succession.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-[#172840]">Diversifiers</h4>
                    <p className="text-gray-600 leading-relaxed">Seeking to add services via acquisition.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-[#172840]">Investors</h4>
                    <p className="text-gray-600 leading-relaxed">Targeting Africa's high‑growth creative sector.</p>
                </div>
              </div>
            </div>
          </section>
                    </div>
        </div>

        {/* African Creative Economy */}
        <div className="relative bg-[#E6F3F7] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#172840] leading-tight">
                    The African creative economy is consolidating — fast.
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Agencies that act now will own the client relationships, capabilities, and market presence others will be chasing in five years.
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#172840]">
                    Will you lead the wave or watch from the sidelines?
                  </h3>
                    </div>
                
                <div className="flex justify-center lg:justify-end">
                  <Image
                    src="/assets/images/ma-program/african-map.png" 
                    width={400} 
                    height={400} 
                    alt="African Map" 
                    className="w-full max-w-sm lg:max-w-md h-auto object-contain"
                  />
                    </div>
                  </div>
            </section>
                </div>
              </div>
              
        {/* CTA Section */}
        <div className="relative bg-[#F2B706] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <section>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#172840] mb-4">
                    Take Your Agency to the Next Level
                </h2>
                  <p className="text-lg text-[#172840] leading-relaxed">
                    Secure your competitive edge with Africa's most connected M&A platform for creative agencies.
                </p>  
              </div>  
              
                <div>
                <button 
                    onClick={openMaModal}
                    className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 font-medium text-base shadow-lg flex items-center gap-2 mx-auto"
                >
                    Book Your Confidential Consultation
                </button>             
              </div>
            </div>
          </section>
          </div>
        </div>
        <Footer />
        <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
        <MaConsultationModal isOpen={isMaModalOpen} onClose={closeMaModal} />
        <ScrollToTop />
      </main>
    </>
  );
};

const Hero = ({ openModal }) => {
  return (
    <div
      className="relative min-h-screen w-full bg-gray-900 overflow-hidden" 
      id="home"
    >
      {/* Background image positioned to cover full container */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/ma-hero.webp')"
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative min-h-screen flex items-center mx-auto max-w-6xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                    <div className="max-w-3xl text-center sm:text-left space-y-6 sm:space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-bold leading-tight"
            >
              Grow, Merge, or Exit with Confidence in Africa's Creative Economy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white text-base sm:text-lg lg:text-xl font-light leading-relaxed"
            >
              Through the PAAN Mergers & Acquisitions Program, powered by Cactus, 
              we connect Africa's most ambitious agencies with strategic opportunities to grow, scale, 
              or exit, backed by world-class M&A expertise and a trusted Pan-African network.
            </motion.p>  
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="bg-paan-red text-white py-3 px-6 sm:px-8 rounded-full hover:bg-orange-600 transition-all duration-300 font-semibold text-sm sm:text-base w-auto shadow-lg flex items-center justify-center gap-2"
              >
                Book Your Confidential Consultation
              </motion.button>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center sm:text-left"
              >
                <span className="text-white/90 text-xs sm:text-sm font-light block">
                Confidential • No obligation
              </span>
              </motion.div>
            </motion.div>             
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


export default PaanMaPage;