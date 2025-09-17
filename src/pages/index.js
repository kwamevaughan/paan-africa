// pages/index.js
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import CustomSlider from "../components/CustomSlider";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Tier1 from "@/components/Tier1";
import Tier2 from "@/components/Tier2";
import Tier3 from "@/components/Tier3";
import OfferingTab from "@/components/OfferingTab";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import { useAppTranslations } from '../hooks/useTranslations';
import { usePopupBanner } from '../hooks/usePopupBanner';
import ContactSection from "@/components/ContactSection";
import AgencyEnquiryModal from "@/components/AgencyEnquiryModal";
import AgenciesMarquee from "@/components/AgenciesMarquee";
import AgencyLogosGrid from "@/components/AgencyLogosGrid";
import ScrollToTop from "@/components/ScrollToTop";
import ConnectingDots from "@/components/ConnectingDots";
import AcademyConsultationModal from "@/components/AcademyConsultationModal";
import PaanAmbassadorProgramModal from "@/components/PaanAmbassadorProgramModal";
import ProgramCard from "@/components/ProgramCard";
import StrategicPartners from "@/components/StrategicPartners";

// Add PasscodeCopy component definition before HomePage
function PasscodeCopy({ passcode }) {
  const [copied, setCopied] = useState(false);
  const { t } = useAppTranslations();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(passcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-1 text-[#172840] text-sm font-medium select-none">
      <span className="font-semibold">{t('common.passcode')}</span>
      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-base">{passcode}</span>
      <button
        onClick={handleCopy}
        className="ml-1 px-2 py-0.5 rounded hover:bg-gray-200 transition text-[#F25849] font-bold flex items-center gap-1 focus:outline-none"
        title={t('common.copy')}
        type="button"
      >
        <Icon icon="mdi:content-copy" className="w-4 h-4" />
        <span className="sr-only">{t('common.copy')}</span>
      </button>
      {copied && (
        <span className="text-green-600 text-xs ml-2 transition-opacity duration-200">{t('common.copied')}</span>
      )}
    </div>
  );
}

const HomePage = () => {
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
  const canvasRef = useRef(null);
  
  // Use popup banner hooks with 7-day cooldown
  const { shouldShow: shouldShowConsultModal, markAsShown: markConsultModalAsShown } = usePopupBanner('consultation-modal', 7);
  const { shouldShow: shouldShowAmbassadorModal, markAsShown: markAmbassadorModalAsShown } = usePopupBanner('ambassador-modal', 7);
  
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showAmbassadorModal, setShowAmbassadorModal] = useState(false);

  // Video controls: refs and playing state
  const videoRefs = useRef([]);
  const [isPlayingByIndex, setIsPlayingByIndex] = useState({});
  const togglePlay = (index) => {
    const el = videoRefs.current[index];
    if (!el) return;
    if (el.paused) {
      el.play();
      setIsPlayingByIndex((prev) => ({ ...prev, [index]: true }));
    } else {
      el.pause();
      setIsPlayingByIndex((prev) => ({ ...prev, [index]: false }));
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Add scroll event listener to detect when user reaches bottom
  useEffect(() => {
    const handleScrollToBottom = () => {
      // Calculate if user has scrolled to bottom (with some tolerance)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Trigger when user is within 100px of the bottom
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;
      
      if (isNearBottom && shouldShowConsultModal && !showConsultModal) {
        setShowConsultModal(true);
        markConsultModalAsShown(); // Mark as shown and start 7-day cooldown
      }
    };

    window.addEventListener('scroll', handleScrollToBottom);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScrollToBottom);
    };
  }, [shouldShowConsultModal, showConsultModal, markConsultModalAsShown]);

  // Add exit-intent detection for Ambassador Program Modal
  useEffect(() => {
    let exitIntentTimeout;

    const handleExitIntent = (e) => {
      // Only trigger if user hasn't seen the modal yet and it should be shown
      if (!shouldShowAmbassadorModal || showAmbassadorModal) return;

      // Check if mouse is leaving from the top of the page (exit intent)
      if (e.clientY <= 0) {
        // Add a small delay to avoid false triggers
        exitIntentTimeout = setTimeout(() => {
          setShowAmbassadorModal(true);
          markAmbassadorModalAsShown(); // Mark as shown and start 7-day cooldown
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      // Clear timeout if user moves mouse back into the page quickly
      if (exitIntentTimeout) {
        clearTimeout(exitIntentTimeout);
      }
    };

    // Only add event listeners on desktop (avoid mobile false triggers)
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop) {
      document.addEventListener('mouseleave', handleExitIntent);
      document.addEventListener('mouseenter', handleMouseEnter);
    }

    // Alternative: beforeunload event for mobile/tablet
    const handleBeforeUnload = (e) => {
      if (shouldShowAmbassadorModal && !showAmbassadorModal && !isDesktop) {
        setShowAmbassadorModal(true);
        markAmbassadorModalAsShown(); // Mark as shown and start 7-day cooldown
        // Note: Modern browsers ignore custom messages in beforeunload
        e.preventDefault();
        e.returnValue = '';
      }
    };

    if (!isDesktop) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      if (exitIntentTimeout) {
        clearTimeout(exitIntentTimeout);
      }
      document.removeEventListener('mouseleave', handleExitIntent);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldShowAmbassadorModal, showAmbassadorModal, markAmbassadorModalAsShown]);

  // Remove IntersectionObserver effect (lines 70-100)
  // useEffect(() => {
  //   const observerOptions = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.1,
  //   };
  //   const observerCallback = (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("section-visible");
  //       }
  //     });
  //   };
  //   const observer = new IntersectionObserver(observerCallback, observerOptions);
  //   Object.values(sectionRefs).forEach((ref) => {
  //     if (ref.current) {
  //       observer.observe(ref.current);
  //     }
  //   });
  //   return () => {
  //     Object.values(sectionRefs).forEach((ref) => {
  //       if (ref.current) {
  //         observer.unobserve(ref.current);
  //       }
  //     });
  //   };
  // }, []);

  useEffect(() => {
    const cnvs = canvasRef.current;
    if (!cnvs) return;
    let animationId;
    let running = true;
    let mx = 0;
    let my = 0;
    let dots = [];
    let c;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Responsive parameters
    function getParams() {
      const isMobile = width < 640;
      return {
        dots_num: isMobile ? 30 : 70,
        r: 1,
        mouse_ol: isMobile ? 80 : 150,
        dots_ol: isMobile ? 80 : 150,
        max_speed: 1,
        max_ms_opac: 1,
        max_dots_opac: 1,
        uni_divs: isMobile ? 10 : 30,
      };
    }

    function resizeCanvas() {
      // Use parent container's size
      const parent = cnvs.parentElement;
      width = parent ? parent.offsetWidth : window.innerWidth;
      height = parent ? parent.offsetHeight : window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      cnvs.width = width * dpr;
      cnvs.height = height * dpr;
      cnvs.style.width = width + 'px';
      cnvs.style.height = height + 'px';
      c = cnvs.getContext('2d');
      c.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      c.scale(dpr, dpr);
    }

    function updtMouse(e) {
      // Get mouse position relative to canvas
      const rect = cnvs.getBoundingClientRect();
      mx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      my = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    }

    function init() {
      dots = [];
      const { dots_num, uni_divs } = getParams();
      for(let i=0; i<dots_num; i++) {
        let x = Math.floor((Math.random()*width/uni_divs)+(parseInt(i/(dots_num/uni_divs))*(width/uni_divs)));
        let y = Math.floor(Math.random()*height);
        let dx = Math.random()*1+0.1;
        let dy = Math.random()*1+0.1;
        if(i%2==0) {
          dx*=-1;
          dy*=-1;
        }
        dots.push({x, y, dx, dy});
      }
    }

    function update() {
      if (!running) return;
      c.clearRect(0, 0, width, height);
      const { dots_num, mouse_ol, dots_ol, max_ms_opac, max_dots_opac } = getParams();
      for(let i=0; i<dots_num; i++) {
        let dot = dots[i];
        dot.x += dot.dx;
        dot.y += dot.dy;
        if(dot.x>width || dot.x<0) dot.dx *= -1;
        if(dot.y>height || dot.y<0) dot.dy *= -1;
        let x = dot.x;
        let y = dot.y;
        let d = Math.sqrt((x-mx)*(x-mx)+(y-my)*(y-my));
        if(d<mouse_ol) {
          c.strokeStyle = `rgba(100, 180, 255, ${max_ms_opac*(mouse_ol-d)/mouse_ol})`;
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(x, y);
          c.lineTo(mx, my);
          c.stroke();
        }
        for(let j=i+1; j<dots_num; j++) {
          let x1 = dots[j].x;
          let y1 = dots[j].y;
          let d2 = Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
          if(d2<dots_ol) {
            c.strokeStyle = `rgba(157, 210, 255, ${max_dots_opac*(dots_ol-d2)/dots_ol})`;
            c.lineWidth = 1;
            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x, y);
            c.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(update);
    }

    function handleResize() {
      resizeCanvas();
      init();
    }

    resizeCanvas();
    init();
    update();
    window.addEventListener('mousemove', updtMouse);
    window.addEventListener('touchmove', updtMouse, { passive: false });
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      running = false;
      window.removeEventListener('mousemove', updtMouse);
      window.removeEventListener('touchmove', updtMouse);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
    <SEO
      title="Pan-African Agency Network (PAAN) | Leading Digital Marketing & Tech Agencies Across Pan Africa"
      description="Join the Pan African Agency Network, Alliance of independent agaencies across africa..."
      keywords="Pan-African creative agencies, top African tech agencies, African digital marketing network, join African agency network, creative agencies in Africa, leading African digital innovation, pan-African collaboration platform, agency network in Africa, African creatives community, tech partnerships Africa, Africa digital marketing agencies, pan-African tech innovation, African creative strategy partners, African digital agency network, pan-African business development, Africa’s creative agency network, digital marketing agencies in Africa, tech agency partnerships Africa"
    />
    <div className="relative">
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <ConnectingDots 
          starCount={80}
          connectionDistance={120}
          dotColor="#84C1D9"
          lineColor="#84C1D9"
          lineWidth={0.5}
        />
        <Header/>

        <div className="relative mx-auto max-w-6xl section pt-0 mt-0 sm:mt-0" id="home" ref={sectionRefs.home}>
          {/* Canvas covers top 50% of hero section */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              display: 'block',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center px-4 sm:px-0 pt-40 sm:pt-0 relative z-10">
            <div className="flex flex-col gap-4 sm:gap-8 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold uppercase text-[#172840] leading-tight">
                {t('homepage.heroSection.mainTitle')}
              </h1>
              <p className="text-gray-500 font-normal text-sm sm:text-base">
                {t('homepage.heroSection.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                <button                  
                  className="bg-[#F25849] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300 w-full sm:w-auto"
                  onClick={(e) => {
                    handleScroll(e, "#contact-us", isFixed);
                  }}
                >
                  {t('homepage.heroSection.ctaButton')}
                </button>
                <button
                  className="bg-[#84C1D9] text-[#172840] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7] text-center w-full sm:w-auto"
                  onClick={() => {
                    gtag_report_conversion('https://calendly.com/antony-paan/45min');
                  }}
                >
                  Book a Demo
                </button>
              </div>
            </div>
            <div className="mt-8 sm:mt-0">
              <CustomSlider />
            </div>
          </section>
        </div>

        <div
          className="mx-auto max-w-6xl relative section mb-10"
          id="about-us"
          ref={sectionRefs.aboutUs}
        >
          <div className="absolute -top-36 -left-36 w-28 h-28 bg-[#F2B706] rounded-full z-30"></div>
          {/* <div className="absolute -top-10 -right-20 w-16 h-16 bg-[#F25849] rounded-full z-0"></div> */}
          <div className="absolute bottom-60 -left-20 w-11 h-11 bg-[#D1D3D4] rounded-full z-30"></div>
          {/* <div className="absolute bottom-0 -right-10 w-11 h-11 bg-[#172840] rounded-full z-0"></div> */}
          <section className="relative z-10">
            <p className="uppercase font-semibold mb-4">{t('homepage.aboutUs.title')}</p>
            <p className="text-2xl">
              {t('homepage.aboutUs.description')}
            </p>
          </section>
          <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mt-20">
            <div className="relative">
              <Image
                src="/assets/images/team.webp"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-auto"
              />
              <div className="">
                <button
                  onClick={(e) => {
                    handleScroll(e, "#our-mission", isFixed);
                  }}
                  className="absolute -bottom-1 bg-[#F25849] text-white px-4 py-2 sm:px-10 sm:py-4 rounded-full font-bold text-xs sm:text-lg hover:bg-[#D6473C] transition duration-300 shadow-lg"
                >
                  {t('homepage.aboutUs.discoverMore')}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={50}
                  height={50}
                  alt={t('homepage.aboutUs.features.panAfricanReach')}
                />
                <p className="text-xl font-base">{t('homepage.aboutUs.features.panAfricanReach')}</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/strategic-collaboration.svg"
                  width={50}
                  height={50}
                  alt={t('homepage.aboutUs.features.strategicCollaboration')}
                />
                <p className="text-xl font-base">{t('homepage.aboutUs.features.strategicCollaboration')}</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/innovation-driven.svg"
                  width={50}
                  height={50}
                  alt={t('homepage.aboutUs.features.innovationDriven')}
                />
                <p className="text-xl font-base">{t('homepage.aboutUs.features.innovationDriven')}</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={50}
                  height={50}
                  alt={t('homepage.aboutUs.features.sharedKnowledgeGrowth')}
                />
                <p className="text-xl font-base">{t('homepage.aboutUs.features.sharedKnowledgeGrowth')}</p>
              </div>
            </div>
          </section>
        </div>
        <AgenciesMarquee />
        
        <div
          className="bg-[#172840] relative section px-4 sm:px-6 lg:px-8"
          id="our-mission"
          ref={sectionRefs.ourMission}
        >
          {/* Decorative Circles */}
          <div className="hidden md:block absolute top-4 left-28 w-28 h-28 bg-[#F25849] rounded-full z-20"></div>
          <div className="hidden sm:block absolute bottom-40 right-10 w-16 h-16 bg-[#F25849] rounded-full z-0"></div>
          <div className="hidden sm:block absolute top-10 right-10 w-16 h-16 bg-[#D1D3D4] rounded-full z-0"></div>

          {/* Main Section */}
          <section className="relative z-10 mt-0 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center py-16">
              {/* Image */}
              <div className="relative">
                <Image
                  src="/assets/images/mission.webp"
                  width={500}
                  height={300}
                  alt="Team collaboration"
                  className="rounded-lg object-cover w-full h-auto"
                />
              </div>

              {/* Vision & Mission Text */}
              <div className="flex flex-col gap-10 h-full">
                {/* Vision */}
                <div className="bg-[#84C1D9] p-6 rounded-lg flex flex-row items-center gap-4 transform transition-transform duration-300 hover:-translate-y-1 flex-1">
                  <div className="flex flex-col items-start">
                    <Image
                      src="/assets/images/icons/vision.svg"
                      width={60}
                      height={60}
                      alt="Vision Statement"
                      className="mb-2"
                    />
                    <div className="text-left">
                      <p className="text-xl sm:text-2xl font-semibold text-[#172840] mb-2">
                        {t('homepage.ourMission.vision.title')}
                      </p>
                      <span className="text-[#172840] font-light text-sm sm:text-base">
                        {t('homepage.ourMission.vision.description')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mission */}
                <div className="bg-[#F2B706] p-6 rounded-lg flex flex-row items-center gap-4 transform transition-transform duration-300 hover:-translate-y-1 flex-1">
                  <div className="flex flex-col items-start">
                    <Image
                      src="/assets/images/icons/mission.svg"
                      width={60}
                      height={60}
                      alt="Mission Statement"
                      className="mb-2"
                    />
                    <div className="text-left">
                      <p className="text-xl sm:text-2xl font-semibold text-[#172840] mb-2">
                        {t('homepage.ourMission.mission.title')}
                      </p>
                      <span className="text-[#172840] font-light text-sm sm:text-base">
                        {t('homepage.ourMission.mission.description')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Strategic Partners Section */}
        {/* <StrategicPartners /> */}

        <div
          className="mx-auto max-w-6xl mt-20 mb-20 relative"
          id="why-join-us"
          ref={sectionRefs.whyJoinUs}
        >
          <div className="absolute -top-24 -left-10 w-14 h-14 bg-yellow-400 rounded-full z-10"></div>
          <div className="hidden md:block absolute -top-14 right-52 w-16 h-16 bg-[#84C1D9] rounded-full z-0"></div>
          <div className="absolute -bottom-14 right-4 w-11 h-11 bg-[#172840] rounded-full z-0"></div>
          <section className="relative z-10">
            <p className="uppercase font-semibold mb-4">{t('homepage.whyJoinUs.title')}</p>
          </section>
          <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-20">
              <p className="text-2xl">
                {t('homepage.whyJoinUs.description')}
              </p>
              <Image
                  src="/assets/images/recently-added.webp"
                  width={400}
                  height={400}
                  alt="Pan-African Reach"
                  className="shadow-lg shadow-gray-400/50 rounded-lg"
                />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={40}
                  height={40}
                  alt="Pan-African Reach"
                />
                <p className="text-lg font-base">
                  Access to Global Brands & Markets
                </p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/strategic-collaboration.svg"
                  width={40}
                  height={40}
                  alt="Strategic Collaboration"
                />
                <p className="text-lg font-base">Shared Resources & Tools</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/innovation-driven.svg"
                  width={40}
                  height={40}
                  alt="Innovation-Driven"
                />
                <p className="text-xl font-base">
                  PAAN Certification Credibility
                </p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={40}
                  height={40}
                  alt="Shared Knowledge & Growth"
                />
                <p className="text-lg font-base">Knowledge Hubs & Webinars</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={40}
                  height={40}
                  alt="Shared Knowledge & Growth"
                />
                <p className="text-lg font-base">
                  Collaborative Revenue Opportunities
                </p>
              </div>
              <div className="flex md:flex-row flex-col gap-4 mt-10">
                <button
                  onClick={(e) => {
                    handleScroll(e, "#contact-us", isFixed);
                  }}
                  className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300"
                >
                  Join us Today
                </button>
                <button
                  onClick={(e) => {
                    handleScroll(e, "#services", isFixed);
                  }}
                  className="bg-[#172840] text-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7]"
                >
                  Discover More
                </button>
              </div>
            </div>
          </section>
        </div>

        <div
          className="bg-[#D1D3D4]"
          id="membership"
          ref={sectionRefs.membership}
        >
          <div className="absolute -bottom-8 right-32 w-16 h-16 bg-[#84C1D9] rounded-full z-0"></div>
          <div className="absolute -top-8 left-32 w-20 h-20 bg-[#F25849] rounded-full z-0"></div>
          <section className="mx-auto max-w-6xl py-12 sm:py-20 px-4 sm:px-6">
            <div className="flex flex-col mb-8 sm:mb-10 mx-auto w-full sm:w-3/4">
              <h2 className="text-xl sm:text-2xl text-center mb-3 sm:mb-4">
                Our Structure & Tiers
              </h2>
              <p className="text-center text-sm sm:text-base">
                Whether you're a bold startup or a seasoned agency, PAAN offers
                a tier that fits your journey. Join a network designed to
                elevate, empower, and connect.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
              <Tier1 />
              <Tier2 />
              <Tier3 />
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => gtag_report_conversion('https://calendly.com/antony-paan/45min')} 
                className="bg-[#F26522] hover:bg-[#D6473C] text-white font-semibold py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group text-sm sm:text-base whitespace-nowrap w-full sm:w-auto text-center"
              >
                <Icon icon="mdi:calendar-clock" className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                Schedule a call to explore full benefits
              </button>
            </div>
          </section>
        </div>

        <ProgramCard />
       

        <AgencyLogosGrid />

        {/* PAAN Certified Videos - COMMENTED OUT */}
        {/* <div className="mt-20 section" id="certified-videos">
          <section className="relative py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="uppercase text-xs sm:text-sm font-semibold mb-3 text-paan-dark-blue/80 tracking-widest">5. PAAN Certified Agencies</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Insights From Certified Leaders</h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Curated videos recognized by PAAN for excellence, relevance, and impact across the creative and tech landscape.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                  { src: 'https://ik.imagekit.io/nkmvdjnna/PAAN/lyftup.webm/ik-video.mp4?updatedAt=1756713902496', type: 'video/mp4', title: 'LYFTUP Agency', href: '/certified-agencies/liftup' },
                  { src: 'https://ik.imagekit.io/nkmvdjnna/PAAN/aquila.mp4', type: 'video/mp4', title: 'Aquila East Africa', href: '/certified-agencies/aquila' },
                ].map((v, i) => (
                  <div key={i} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <video 
                        className="w-full h-full object-cover" 
                        controls 
                        preload={i === 0 ? "auto" : "metadata"} 
                        autoPlay
                        preload="auto"
                        playsInline
                        muted
                        crossOrigin="anonymous"
                        onLoadStart={() => console.log('Video load started:', v.src)}
                        onError={(e) => console.log('Video error:', e.target.error, v.src)}
                        onCanPlay={() => console.log('Video can play:', v.src)}
                        ref={(el) => { videoRefs.current[i] = el; }}
                        onPlay={() => {
                          setIsPlayingByIndex((prev) => ({ ...prev, [i]: true }));
                        }}
                        onPause={() => {
                          setIsPlayingByIndex((prev) => ({ ...prev, [i]: false }));
                        }}
                      >
                        <source src={v.src} type={v.type} />
                        <source src={`/assets/videos/faqs-video.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute top-3 right-3">
                         <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/90 text-paan-dark-blue px-2.5 py-1 rounded-full">
                           <span className="inline-flex"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' className='w-4 h-4'><path d='M12 2l2.39 4.84L20 8.27l-3.9 3.8.92 5.36L12 15.9l-5.02 2.63.92-5.36L4 8.27l5.61-1.43L12 2z' fill='currentColor' /></svg></span>
                           Certified
                         </span>
                       </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        onClick={() => togglePlay(i)}
                        role="button"
                        aria-label={isPlayingByIndex[i] ? 'Pause video' : 'Play video'}
                      >
                        <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          {isPlayingByIndex[i] ? (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-7 h-7 text-paan-red fill-current'>
                              <path d='M6 5h4v14H6zM14 5h4v14h-4z'/>
                            </svg>
                          ) : (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-8 h-8 text-paan-red fill-current'>
                              <path d='M8 5v14l11-7z'/>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-gray-900">{v.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Reviewed and endorsed by PAAN for quality and relevance.</p>
                      <div className="mt-3">
                        <Link href={v.href} className="inline-flex items-center text-sm font-semibold text-paan-dark-blue hover:text-paan-red transition-colors">
                          View Certified Profile
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-4 h-4 ml-1 fill-current'><path d='M13.172 7l-1.414 1.414L14.343 11H6v2h8.343l-2.585 2.586L13.172 17 18 12z'/></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div> */}

        <div
          className="mx-auto max-w-6xl mt-20 section"
          id="services"
          ref={sectionRefs.services}
        >
          <section>
            <p className="uppercase font-semibold mb-4">{t('homepage.services.title')}</p>
            <p className="text-2xl">
              {t('homepage.services.description')}
            </p>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mt-10">
            <div className="relative col-span-1 sm:col-span-1">
              <Image
                src="/assets/images/offer.webp"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
              <OfferingTab />
            </div>
          </section>
        </div>

        <div
          className="mx-auto max-w-6xl mt-20 pb-20 section"
          id="events"
          ref={sectionRefs.events}
        >
          <section className="text-center mb-16">
            <p className="uppercase font-semibold mb-4 text-[#F25849] tracking-wider">{t('homepage.events.title')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-6">
              {t('homepage.events.mainTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('homepage.events.description')}
            </p>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F25849] to-[#F2B706] rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                <div className="mb-6">
                  <span className="inline-block bg-[#F25849] text-white text-xs font-bold px-4 py-2 rounded-full tracking-wider uppercase mb-4">
                    {t('homepage.events.featuredEvent.badge')}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#172840] mb-4">
                    {t('homepage.events.featuredEvent.title')}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t('homepage.events.featuredEvent.description')}
                  </p>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-[#F25849]">
                    <Icon icon="mdi:calendar" className="w-5 h-5" />
                    <span className="font-semibold">{t('homepage.events.featuredEvent.date')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#172840]">
                    <Icon icon="mdi:map-marker" className="w-5 h-5" />
                    <span className="font-semibold">{t('homepage.events.featuredEvent.location')}</span>
                  </div>
                </div>
                <Link
                  href="summit"
                  className="inline-flex items-center gap-2 bg-[#172840] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#F25849] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>{t('homepage.events.featuredEvent.cta')}</span>
                  <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-100 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#84C1D9] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:presentation" className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#172840] mb-2">{t('homepage.events.webinars.title')}</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {t('homepage.events.webinars.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-100 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#F2B706] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:account-group" className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#172840] mb-2">Networking Events</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Exclusive networking opportunities with fellow agency leaders, potential clients, 
                      and industry partners across Africa and beyond.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-100 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#F25849] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:lightbulb" className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#172840] mb-2">Workshops & Training</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Hands-on workshops and training sessions designed to enhance your team's skills 
                      and keep you ahead of industry trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#172840] to-[#84C1D9] rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Join Our Events?</h3>
              <p className="text-xl mb-8 opacity-90">
                Discover upcoming events, register for webinars, and connect with the PAAN community.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-3 bg-white text-[#172840] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Icon icon="mdi:calendar-multiple" className="w-6 h-6" />
                <span>View All Events</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Past Webinar */}
        <div>
        <section className="bg-paan-dark-blue py-8 sm:py-12 lg:py-16 relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Left Column - Header */}
              <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
                <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wide">
                  What Our Members Are Saying
                </h3>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-light leading-tight">
                  Discover how PAAN is transforming agency growth across Africa.
                </h2>
              </div>
              
              {/* Right Column - Testimonial */}
              <div className="relative mt-6 lg:mt-0">
                <div className="bg-paan-blue p-4 sm:p-6 lg:p-8 rounded-xl shadow-xl relative z-10">
                  {/* Quote Icon - Smaller size */}
                  <div className="absolute -top-4 sm:-top-6 lg:-top-8 left-2 sm:left-3 z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className="text-paan-yellow sm:w-12 sm:h-12 lg:w-16 lg:h-16">
                      <path fill="currentColor" d="M11.192 15.757q0-1.32-.69-2.217q-.489-.618-1.327-.812c-.55-.128-1.07-.137-1.54-.028c-.16-.95.1-1.956.76-3.022q.992-1.598 2.558-2.403L9.372 5c-.8.396-1.56.898-2.26 1.505c-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69s-.345 2.04-.216 3.1c.168 1.4.62 2.52 1.356 3.35Q6.205 19 7.85 19c.965 0 1.766-.29 2.4-.878q.941-.864.94-2.368zm9.124 0q0-1.32-.69-2.217q-.49-.63-1.327-.817q-.84-.185-1.54-.022c-.16-.94.09-1.95.752-3.02q.99-1.59 2.556-2.4L18.49 5q-1.201.594-2.26 1.505a11.3 11.3 0 0 0-1.894 2.094c-.556.79-.97 1.68-1.24 2.69a8 8 0 0 0-.217 3.1c.166 1.4.616 2.52 1.35 3.35q1.1 1.252 2.743 1.252q1.45.002 2.402-.877q.941-.864.942-2.368z"/>
                    </svg>
                  </div>
                  
                  {/* Circle - Bottom Right - Smaller */}
                  <div className="absolute -bottom-1 sm:-bottom-2 lg:-bottom-3 -right-1 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-paan-red rounded-full z-20"></div>
                  
                  <div className="space-y-3 sm:space-y-4 py-4 sm:py-6 lg:py-8">
                    {/* Quote Text - Smaller font */}
                    <p className="text-paan-dark-blue text-sm sm:text-base leading-relaxed">
                      PAAN has enabled us to access new business opportunities across Africa and has also played a pivotal role in upskilling our teams through training programs & webinars tailored to agencies
                    </p>
                    
                    {/* Author Info - Smaller spacing */}
                    <div className="flex items-center space-x-3 pt-2 sm:pt-3">
                      <div className="flex-shrink-0">
                        <Image
                          src="/assets/images/kester-muhanji.webp"
                          width={40}
                          height={40}
                          alt="Kester Muhanji"
                          className="rounded-full ring-2 ring-white/20 sm:w-12 sm:h-12"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-paan-dark-blue text-sm sm:text-base">Kester Muhanji</h4>
                        <p className="text-paan-dark-blue text-xs sm:text-sm">CEO, Aquila East Africa</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements - Smaller */}
                <div className="absolute -top-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-3 -left-3 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-paan-blue/30 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
          
          {/* Background Pattern - Smaller */}
          <div className="absolute bottom-0 left-0 opacity-40 z-0 pointer-events-none">
            <Image
              src="/assets/images/testimonial-section-pattern.svg"
              width={200}
              height={200}
              alt=""
              className="object-contain sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]"
            />
          </div>
          
          {/* Additional Decorative Elements - Smaller */}
          <div className="absolute top-8 sm:top-12 lg:top-16 left-4 sm:left-6 lg:left-8 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-paan-blue rounded-full opacity-40"></div>
          <div className="absolute top-16 sm:top-20 lg:top-24 left-8 sm:left-12 lg:left-16 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
          <div className="absolute bottom-12 sm:bottom-16 lg:bottom-20 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-paan-blue/50 rounded-full"></div>
        </section>
        </div>
        <div className="network-bg relative" id="join-network">
          <div className="absolute -top-3 left-4 w-6 h-6 bg-[#84C1D9] rounded-full z-0"></div>
          <div className="absolute -top-8 right-4 w-16 h-16 bg-yellow-400 rounded-full z-0"></div>
          <div className="absolute bottom-6 right-4 w-20 h-20 bg-red-500 rounded-full z-0"></div>
          <section className="relative mx-auto max-w-6xl py-28 px-6">
            <div className="flex flex-col mb-10 w-full md:w-3/4">
              <h2 className="text-3xl font-medium mb-4 text-[#F2B706]">
                Join the Network That's Redefining Africa's Creative Future
              </h2>
              <p className="text-white font-light">
                Step into a powerful alliance of agencies shaping the future of
                communication, marketing, and tech across Africa and beyond.
                Whether you're just starting or scaling fast — PAAN is your
                platform for global impact.
              </p>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <button
                onClick={(e) => {
                  handleScroll(e, "#contact-us", isFixed);
                }}
                className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300"
              >
                Join us Today
              </button>
              <button
                onClick={() => window.location.href = 'https://member-portal.paan.africa/'} 
                className="bg-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7]"
              >
                Member Portal
              </button>
            </div>
          </section>
        </div>
        <section className="bg-[#D1D3D4] py-10">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-[#172840] uppercase tracking-wide">
                  Everything Your Agency Needs to Grow
                </h3>
                <h2 className="text-2xl sm:text-3xl text-[#172840] font-light max-w-4xl mx-auto">
                  Access exclusive opportunities, co-bid with trusted<br className="hidden sm:block"/> agencies all through your PAAN portal.
                </h2>
              </div>
              
              {/* Image Container - Desktop Layout */}
              <div className="hidden lg:flex justify-center pt-8">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl blur-lg"></div>
                  <div className="relative">
                    <Image
                      src="/assets/images/portal.svg"
                      width={800}
                      height={800}
                      alt="PAAN Portal Dashboard"
                      className="rounded-lg object-contain"
                      priority
                      quality={100}
                    />
                    {/* Sub image positioned at top-right */}
                    <Image
                      src="/assets/images/sub-p-1.svg"
                      width={320}
                      height={320}
                      alt="PAAN Portal Feature"
                      className="absolute top-36 -right-40"
                    />
                    <Image
                      src="/assets/images/arrow-1.webp"
                      width={80}
                      height={80}
                      alt="PAAN Portal Feature"
                      className="absolute top-10 -right-4"
                    />
                    {/* Sub images positioned at left in flex column */}
                    <div className="absolute top-4 -left-56 flex flex-col space-y-12">
                      <Image
                        src="/assets/images/sub-p-3.svg"
                        width={300}
                        height={300}
                        alt="PAAN Portal Feature"
                        className=""
                      />
                      <Image
                        src="/assets/images/sub-p-2.svg"
                        width={300}
                        height={300}
                        alt="PAAN Portal Feature"
                        className=""
                      />
                    </div>
                    <Image
                      src="/assets/images/arrow-2.webp"
                      width={70}
                      height={70}
                      alt="PAAN Portal Feature"
                      className="absolute -bottom-12 left-36"
                    />
                  </div>
                </div>
              </div>

              {/* Image Container - Mobile/Tablet Layout (only main portal image) */}
              <div className="flex lg:hidden justify-center pt-8">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl blur-lg"></div>
                  <div className="relative">
                    <Image
                      src="/assets/images/portal.webp"
                      width={400}
                      height={400}
                      alt="PAAN Portal Dashboard"
                      className="rounded-lg w-full max-w-sm sm:max-w-md"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <button 
                  onClick={() => window.location.href = 'https://member-portal.paan.africa/'} 
                  className="bg-[#F25849] hover:bg-[#D6473C] text-white font-normal py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group text-sm sm:text-base whitespace-nowrap"
                >               
                  Access Your Dashboard
                </button>
              </div>
            </div>
          </div>
        </section>

        <div
          className="mx-auto max-w-6xl mt-20 relative section"
          id="contact-us"
          ref={sectionRefs.contactUs}
        >
          {/* <div className="absolute top-4 -right-5 w-12 h-12 bg-[#172840] rounded-full z-20"></div> */}
          <div className="absolute -bottom-9 -left-6 w-20 h-20 bg-[#F2B706] rounded-full z-0"></div>
          <div className="absolute bottom-4 left-50 w-11 h-11 bg-[#F25849] rounded-full z-0"></div>
          
          <ContactSection />
        </div>
        <AgencyEnquiryModal isOpen={isModalOpen} onClose={closeModal} />
        <ScrollToTop />
        <AcademyConsultationModal isOpen={showConsultModal} onClose={() => setShowConsultModal(false)} />
        <PaanAmbassadorProgramModal isOpen={showAmbassadorModal} onClose={() => setShowAmbassadorModal(false)} />
      </main>
      <Footer />
      </div>
    </>
  );
};

export default HomePage;