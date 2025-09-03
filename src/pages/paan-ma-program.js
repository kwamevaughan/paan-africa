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
import { useAppTranslations } from '../hooks/useTranslations';

const PaanMaPage = () => {
  const { t } = useAppTranslations();
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

  // Hero component defined inside main component to access translations
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
                {t('paanMaProgram.hero.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-white text-base sm:text-lg lg:text-xl font-light leading-relaxed"
              >
                {t('paanMaProgram.hero.description')}
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
                  {t('paanMaProgram.hero.ctaButton')}
                </motion.button>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-center sm:text-left"
                >
                                   <span className="text-white/90 text-xs sm:text-sm font-light block">
                   {t('paanMaProgram.hero.confidential')}
                 </span>
                </motion.div>
              </motion.div>             
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO
        title={t('paanMaProgram.seo.title')}
        description={t('paanMaProgram.seo.description')}
        keywords={t('paanMaProgram.seo.keywords')}
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
                  <h2 className="text-base sm:text-lg lg:text-xl font-normal uppercase text-[#172840]">{t('paanMaProgram.vision.badge')}</h2>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#172840] leading-tight">{t('paanMaProgram.vision.title')}</h3>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg"
                >
                  {t('paanMaProgram.vision.description')}
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
                    {t('paanMaProgram.vision.ctaButton')}
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
                          alt={t('paanMaProgram.altText.acquireAcrossAfrica')} 
                          className="w-20 h-20"
                        />
                      </motion.div>
                      <h4 className="text-md font-semibold text-[#172840]">{t('paanMaProgram.vision.strategies.acquire.title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          {t('paanMaProgram.vision.strategies.acquire.description')}
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
                          alt={t('paanMaProgram.altText.mergeToWinBigger')} 
                          className="w-20 h-20"
                        />
                      </motion.div>
                      <h4 className="text-md font-semibold text-[#172840]">{t('paanMaProgram.vision.strategies.merge.title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          {t('paanMaProgram.vision.strategies.merge.description')}
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
                          alt={t('paanMaProgram.altText.sellForStrongExit')} 
                          className="w-20 h-20"
                        />
                      </motion.div>
                      <h4 className="text-md font-semibold text-[#172840]">{t('paanMaProgram.vision.strategies.sell.title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('paanMaProgram.vision.strategies.sell.description')}
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
                          alt={t('paanMaProgram.altText.expandCapabilities')} 
                          className="w-20 h-20"
                        />
                      </motion.div>
                      <h4 className="text-md font-semibold text-[#172840]">{t('paanMaProgram.vision.strategies.expand.title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('paanMaProgram.vision.strategies.expand.description')}
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
              <h2 className="text-lg sm:text-xl font-normal uppercase text-[#172840] mb-4">{t('paanMaProgram.partnership.badge')}</h2>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#172840] leading-tight">{t('paanMaProgram.partnership.title')}</h3>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#E6F3F7] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col items-left text-left space-y-2">
                      <Image 
                        src="/assets/images/ma-program/paan-logo.svg" 
                        alt={t('paanMaProgram.altText.paanLogo')} 
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain" 
                      />
              <div>
                        <p className="text-gray-700 text-xs leading-relaxed"><span className="font-semibold">{t('paanMaProgram.partnership.partners.paan.title')} </span>
                          {t('paanMaProgram.partnership.partners.paan.description')}
                      </p>
                    </div>
                    </div>
                  </div>
                  
                  <div className="bg-paan-dark-blue p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col items-left text-left space-y-2">
                      <Image 
                        src="/assets/images/ma-program/agency-futures-logo.avif" 
                        alt={t('paanMaProgram.altText.futureAgenciesLogo')} 
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain" 
                      />
                    <div>
                        <p className="text-white text-xs leading-relaxed"><span className="font-semibold">{t('paanMaProgram.partnership.partners.agencyFutures.title')} </span>
                          {t('paanMaProgram.partnership.partners.agencyFutures.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
                <div className="mt-8">
                  <Accordion 
                    items={[
                      {
                        title: t('paanMaProgram.partnership.faq.exclusiveDealFlow.title'),
                        content: t('paanMaProgram.partnership.faq.exclusiveDealFlow.content')
                      },
                      {
                        title: t('paanMaProgram.partnership.faq.whoCanParticipate.title'),
                        content: t('paanMaProgram.partnership.faq.whoCanParticipate.content')
                      },
                      {
                        title: t('paanMaProgram.partnership.faq.whatServices.title'),
                        content: t('paanMaProgram.partnership.faq.whatServices.content')
                      },
                      {
                        title: t('paanMaProgram.partnership.faq.howLong.title'),
                        content: t('paanMaProgram.partnership.faq.howLong.content')
                      },
                      {
                        title: t('paanMaProgram.partnership.faq.costs.title'),
                        content: t('paanMaProgram.partnership.faq.costs.content')
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
                  {t('paanMaProgram.howItWorks.badge')}
                </motion.h2>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-semibold text-white leading-tight"
                >
                  {t('paanMaProgram.howItWorks.title')}
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
                                         <h4 className="text-[#172840] text-lg font-semibold">{t('paanMaProgram.howItWorks.steps.step1.title')}</h4>
                     <p className="text-gray-600 text-sm leading-relaxed">
                       {t('paanMaProgram.howItWorks.steps.step1.description')}
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
                                         <h4 className="text-[#172840] text-lg font-semibold">{t('paanMaProgram.howItWorks.steps.step2.title')}</h4>
                     <p className="text-gray-600 text-sm leading-relaxed">
                       {t('paanMaProgram.howItWorks.steps.step2.description')}
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
                                         <h4 className="text-[#172840] text-lg font-semibold">{t('paanMaProgram.howItWorks.steps.step3.title')}</h4>
                     <p className="text-gray-600 text-sm leading-relaxed">
                       {t('paanMaProgram.howItWorks.steps.step3.description')}
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
                                         <h4 className="text-[#172840] text-lg font-semibold">{t('paanMaProgram.howItWorks.steps.step4.title')}</h4>
                     <p className="text-gray-600 text-sm leading-relaxed">
                       {t('paanMaProgram.howItWorks.steps.step4.description')}
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
                  {t('paanMaProgram.howItWorks.ctaButton')}
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
                <h2 className="text-lg sm:text-xl font-normal uppercase text-[#172840] mb-4">{t('paanMaProgram.whoShouldJoin.badge')}</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="flex justify-center lg:justify-start">
                  <Image
                    src="/assets/images/ma-program/who-should-join.png" 
                    width={400} 
                    height={400} 
                    alt={t('paanMaProgram.altText.whoShouldJoin')} 
                    className="w-full max-w-sm lg:max-w-md h-auto object-contain"
                />
              </div>  
              
                <div className="space-y-6">
                  <div className="space-y-3">
                                         <h4 className="text-lg font-semibold text-[#172840]">{t('paanMaProgram.whoShouldJoin.categories.scalingAgencies.title')}</h4>
                     <p className="text-gray-600 leading-relaxed">{t('paanMaProgram.whoShouldJoin.categories.scalingAgencies.description')}</p>
                   </div>
                   <div className="space-y-3">
                     <h4 className="text-lg font-semibold text-[#172840]">{t('paanMaProgram.whoShouldJoin.categories.exitReadyLeaders.title')}</h4>
                     <p className="text-gray-600 leading-relaxed">{t('paanMaProgram.whoShouldJoin.categories.exitReadyLeaders.description')}</p>
                   </div>
                   <div className="space-y-3">
                     <h4 className="text-lg font-semibold text-[#172840]">{t('paanMaProgram.whoShouldJoin.categories.diversifiers.title')}</h4>
                     <p className="text-gray-600 leading-relaxed">{t('paanMaProgram.whoShouldJoin.categories.diversifiers.description')}</p>
                   </div>
                   <div className="space-y-3">
                     <h4 className="text-lg font-semibold text-[#172840]">{t('paanMaProgram.whoShouldJoin.categories.investors.title')}</h4>
                     <p className="text-gray-600 leading-relaxed">{t('paanMaProgram.whoShouldJoin.categories.investors.description')}</p>
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
                    {t('paanMaProgram.africanCreativeEconomy.title')}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t('paanMaProgram.africanCreativeEconomy.description')}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#172840]">
                    {t('paanMaProgram.africanCreativeEconomy.question')}
                  </h3>
                    </div>
                
                <div className="flex justify-center lg:justify-end">
                  <Image
                    src="/assets/images/ma-program/african-map.png" 
                    width={400} 
                    height={400} 
                    alt={t('paanMaProgram.altText.africanMap')} 
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
                       {t('paanMaProgram.cta.title')}
                     </h2>
                     <p className="text-lg text-[#172840] leading-relaxed">
                       {t('paanMaProgram.cta.description')}
                     </p>  
                   </div>  
                   
                     <div>
                     <button 
                         onClick={openMaModal}
                         className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 font-medium text-base shadow-lg flex items-center gap-2 mx-auto"
                     >
                         {t('paanMaProgram.cta.button')}
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






export default PaanMaPage;