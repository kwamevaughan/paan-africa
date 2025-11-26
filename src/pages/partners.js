import SEO from "@/components/SEO";
import Header from "@/layouts/standard-header"; 
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import PartnerBenefits from "@/components/PartnersBenefits";
import Steps from "@/components/steps";
import Link from "next/link";
import AgencyLogosGrid from "@/components/AgencyLogosGrid";
import ScrollToTop from "@/components/ScrollToTop";
import AgencyEnquiryModal from "@/components/AgencyEnquiryModal";
import Image from "next/image";
import StatsSection from "@/components/StatsSection";
import { useAppTranslations } from '../hooks/useTranslations';

const CountUp = ({ end = 200, duration = 3000, start = false }) => {
  const [count, setCount] = useState(0);
  const startTimestamp = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    let animationFrame;
    if (!start) {
      setCount(0);
      startTimestamp.current = null;
      started.current = false;
      return;
    }
    if (started.current) return;
    started.current = true;
    const step = (timestamp) => {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = Math.min((timestamp - startTimestamp.current) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return <span>{count}+</span>;
};

const FreelancersPage = () => {
  const { t } = useAppTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counterVisible, setCounterVisible] = useState(false);
  const counterRef = useRef(null);
  
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

  useEffect(() => {
    // Counter observer
    let counterObserver;
    if (counterRef.current) {
      counterObserver = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCounterVisible(true);
            counterObserver.disconnect(); // Only trigger once
          }
        },
        { threshold: 0.3 }
      );
      counterObserver.observe(counterRef.current);
    }
    return () => {
      if (counterObserver && counterRef.current) counterObserver.disconnect();
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <SEO
        title={t('partners.seo.title')}
        description={t('partners.seo.description')}
        keywords={t('partners.seo.keywords')}
      />
    <div className="relative">      
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />
        <Hero />

        <div className="mx-auto max-w-6xl mt-20 relative">
          <div className="absolute top-80 right-0 w-16 h-16 bg-paan-yellow rounded-full z-0"></div>
          <div className="absolute bottom-40 right-80 w-11 h-11 bg-paan-blue rounded-full z-0"></div>
          <section className="relative">            
            <div className="mb-10">
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="mx-auto md:mx-0 flex justify-center">
                <div className="relative" ref={counterRef}>
                  <img 
                    src="/assets/images/black-girl.webp" 
                    alt={t('partners.altText.professionalWoman')} 
                    className="rounded-lg shadow-md w-full max-w-md h-auto object-cover" 
                  />
                  <div className="absolute bottom-0 right-0 bg-[#F2B706] border-8 border-white rounded-lg shadow-lg p-3 min-w-[120px] h-auto">
                    <h4 className="font-bold text-[#172840] text-lg leading-none"><CountUp end={200} duration={3000} start={counterVisible} /></h4>
                    <p className="text-[10px] font-medium text-[#172840] mt-1 leading-tight">{t('partners.mainSection.stats.title')}</p>
                  </div>
                </div>
              </div>
                <div className="flex flex-col space-y-6 max-w-lg">
                  <h3 className="text-xl font-semibold">{t('partners.mainSection.audience.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('partners.mainSection.audience.description')}
                  </p>
                  <button 
                    onClick={()=>window.location.href='/contact-us'}
                    className="bg-paan-red text-white py-3 px-8 rounded-full hover:bg-paan-red transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-fit"
                  >
                    {t('partners.mainSection.audience.ctaButton')}
                  </button> 
                </div>
              </div>
              <div className="mt-20">
                <h2 className="text-2xl font-semibold">{t('partners.mainSection.whyPartner.title')}</h2>
                <p className="text-gray-700 leading-relaxed mt-4 font-normal text-2xl">{t('partners.mainSection.whyPartner.description')}</p>
              </div>
              <div className="flex justify-end w-full mt-4">
                <Image
                  src="/assets/images/arrow-dwn.svg"
                  width={80}
                  height={80}
                  alt={t('partners.altText.paanPortalFeature')}
                />
              </div>
            </div>
          </section>
        </div>
        {/* Stats Section */}
        <StatsSection/>

        <div className="bg-[#172840] relative w-full">
        <section className="relative mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-16">
          <h2 className="text-base md:text-lg text-paan-yellow uppercase text-left font-semibold">{t('partners.partnerBenefits.badge')}</h2>
          <h3 className="text-xl md:text-2xl py-2 md:py-4 text-white text-left font-normal">{t('partners.partnerBenefits.title')}</h3>
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
          <h2 className="text-sm font-bold mb-3 sm:mb-4 uppercase">{t('partners.readyToScale.badge')}</h2>
          <h3 className="text-lg sm:text-xl font-normal mb-3 sm:mb-4">{t('partners.readyToScale.title')}</h3>
          
          {/* Grid that changes from 1 column on mobile to 3 columns on medium screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pb-12 sm:pb-20 md:pb-32">
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-20">
                <img src="/assets/images/icons/power-icon.png" alt={t('partners.altText.localizeFaster')} className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('partners.readyToScale.benefits.localizeFaster.title')}</h2>
              <p className="text-gray-800 text-sm sm:text-base">{t('partners.readyToScale.benefits.localizeFaster.description')}</p>
            </div>
            
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-16">
                <img src="/assets/images/icons/caution-icon.png" alt={t('partners.altText.reduceRisk')} className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('partners.readyToScale.benefits.reduceRisk.title')}</h2>
              <p className="text-gray-800 text-sm sm:text-base">{t('partners.readyToScale.benefits.reduceRisk.description')}</p>
            </div>
            
            <div className="bg-[#84C1D9] rounded-lg p-4 sm:p-6 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="mb-8 sm:mb-20">
                <img src="/assets/images/icons/window-icon.png" alt={t('partners.altText.maximizeROI')} className="w-12 h-12 sm:w-16 sm:h-16"/>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('partners.readyToScale.benefits.maximizeROI.title')}</h2>
              <p className="text-gray-800 text-sm sm:text-base">{t('partners.readyToScale.benefits.maximizeROI.description')}</p>
            </div>
          </div>                
        </section>
        </div>
        <AgencyLogosGrid/>
      </main>
      <Footer />
      <ScrollToTop />
      <AgencyEnquiryModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
};

const Hero = () => {
  const { t } = useAppTranslations();
  return (
    <div
      className="relative h-screen w-full bg-gray-900 overflow-hidden" 
      id="home"
    >
      {/* Background video positioned to cover full container */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/videos/Partners-Hero.webm" type="video/webm" />
        {t('partners.altText.videoNotSupported')}
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative h-full flex mx-auto max-w-6xl">
        <div className="max-w-6xl px-6 md:px-8 pb-28 flex flex-col justify-end h-full">
        
          <div className="max-w-2xl text-left space-y-6">
            <h1 className="text-white font-bold mb-2 relative uppercase">
                {t('partners.hero.title')}
            </h1>
            <p className="text-white text-4xl mb-6">
                {t('partners.hero.subtitle')}
            </p>  
            <button 
              onClick={()=>window.location.href='/contact-us'}
              className="bg-paan-red text-white py-3 px-10 rounded-full hover:bg-paan-red transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm"
            >
              {t('partners.hero.ctaButton')}
            </button>             
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancersPage;