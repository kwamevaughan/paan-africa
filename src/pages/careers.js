import dynamic from "next/dynamic";
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Image from "next/image";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import CareerApplicationModal from "@/components/CareerApplicationModal";
import { useAppTranslations } from "../hooks/useTranslations";
import { useCountUp } from "../hooks/useCountUp";

const CareersPage = () => {
  const { t } = useAppTranslations();
  const [isClient, setIsClient] = useState(false);
  const sectionRefs = {
    home: useRef(null),
    openPositions: useRef(null),
    whyJoinUs: useRef(null),
    culture: useRef(null),
    application: useRef(null),
  };

  const [isFixed, setIsFixed] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const handleScrollEvent = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 50);
    };

    // Initial check in case the page is already scrolled
    handleScrollEvent();

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);

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

  // Hero component
  const Hero = () => {
    const { count: countriesCount, elementRef: countriesRef } = useCountUp(20, 0, 2000, 0);
    const { count: agenciesCount, elementRef: agenciesRef } = useCountUp(200, 0, 2000, 200);
    const { count: creatorsCount, elementRef: creatorsRef } = useCountUp(1000, 0, 2000, 400);

    return (
      <div
        className="relative min-h-screen w-full bg-[#172840] overflow-visible pt-16 sm:pt-18 lg-custom:pt-20" 
        id="home"
        ref={sectionRefs.home}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/assets/images/bg-pattern.svg')"
          }}
        />

        <div className="relative min-h-screen flex mx-auto max-w-7xl">
          <div className="w-full px-4 sm:px-6 md:px-8 pb-8 sm:pb-44 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Text Content */}
            <div className="flex-1 max-w-3xl text-left space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h1 className="text-sm sm:text-md text-[#84C1D9] relative uppercase tracking-wide font-semibold">
                  {t('careers.hero.subtitle')}
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white relative font-bold leading-tight">
                  {t('careers.hero.title')}
                </h2>
                <p className="text-white text-lg sm:text-xl mb-8 font-light w-full leading-relaxed max-w-2xl">
                  {t('careers.hero.description')}
                </p>  
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#F25849] border border-[#F25849] text-white py-4 px-8 sm:px-10 rounded-full hover:bg-[#D6473C] transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-semibold text-base w-full sm:w-auto"
                >
                  {t('careers.hero.viewPositions')}
                </button>
                <button 
                  onClick={() => document.getElementById('why-join-us').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent border border-white text-white py-4 px-8 sm:px-10 rounded-full hover:bg-white hover:text-[#172840] transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-semibold text-base w-full sm:w-auto"
                >
                  {t('careers.hero.learnAboutUs')}
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 max-w-lg lg:max-w-xl">
              <div className="relative">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/Careers/hero.jpg"
                  alt="PAAN Team - Join Our Dynamic Team"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl object-cover shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="absolute -bottom-8 sm:-bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 md:px-8 z-10 hidden sm:block">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full h-40 sm:h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
              <div className="flex flex-col gap-2 text-center">
                <div ref={countriesRef} className="text-3xl font-bold text-[#172840]">
                  {countriesCount}+
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-[#172840]">{t('careers.stats.countries')}</h3>
                <p className="font-light text-xs sm:text-sm text-gray-600">{t('careers.stats.countriesSubtext')}</p>
              </div>
            </div>
            <div className="w-full h-40 sm:h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#84C1D9] transition-colors duration-300 cursor-pointer">
              <div className="flex flex-col gap-2 text-center">
                <div ref={agenciesRef} className="text-3xl font-bold text-[#172840]">
                  {agenciesCount}+
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-[#172840]">{t('careers.stats.agencies')}</h3>
                <p className="font-light text-xs sm:text-sm text-gray-600">{t('careers.stats.agenciesSubtext')}</p>
              </div>
            </div>
            <div className="w-full h-40 sm:h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F25849] transition-colors duration-300 cursor-pointer">
              <div className="flex flex-col gap-2 text-center">
                <div ref={creatorsRef} className="text-3xl font-bold text-[#172840]">
                  {creatorsCount}+
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-[#172840]">{t('careers.stats.creators')}</h3>
                <p className="font-light text-xs sm:text-sm text-gray-600">{t('careers.stats.creatorsSubtext')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Open Positions component
  const OpenPositions = () => {
    const positions = [
      {
        title: "Commercial Manager",
        location: "Accra, Ghana (Pan-African/International Scope)",
        type: t('careers.openPositions.fullTime'),
        department: "Commercial",
        description: "Spearhead the commercialization of PAAN across its verticals — from membership and partnerships to events, knowledge products, training, and new ventures.",
        requirements: [
          "Bachelor's degree in Business, Marketing, Economics (Master's preferred)",
          "7+ years commercial management/business development experience",
          "Strong Pan-African and/or international business exposure",
          "Exceptional commercial acumen with negotiation skills",
          "Deep understanding of Africa's creative economy landscape"
        ],
        detailedDescription: `
          <h4 class="font-semibold text-[#172840] mb-3">Role Overview</h4>
          <p class="text-gray-600 mb-4">The Commercial Manager will be responsible for developing and executing PAAN's commercial strategy, identifying new revenue streams, strengthening client and partner relationships, and ensuring sustainable financial growth. This is a high-impact role that requires a mix of strategic vision, business development expertise, and operational execution.</p>
          
          <h4 class="font-semibold text-[#172840] mb-3">Key Responsibilities</h4>
          <div class="space-y-3 mb-4">
            <div>
              <h5 class="font-medium text-[#172840] mb-1">1. Commercial Strategy & Business Development</h5>
              <ul class="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                <li>Design and implement a Pan-African and global commercialization strategy for PAAN</li>
                <li>Identify and develop revenue streams across PAAN's verticals: memberships, partnerships, sponsorships, training programs, consultancy services, events, and digital platforms</li>
                <li>Develop new business models to scale PAAN's offerings regionally and internationally</li>
                <li>Build a strong sales pipeline and close high-value deals</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-[#172840] mb-1">2. Partnerships & Client Relations</h5>
              <ul class="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                <li>Cultivate and manage relationships with agencies, brands, international partners, and institutional stakeholders</li>
                <li>Develop value propositions and partnership packages tailored to different markets and sectors</li>
                <li>Represent PAAN in high-level negotiations, forums, and industry platforms</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-[#172840] mb-1">3. Commercial Operations & Delivery</h5>
              <ul class="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                <li>Oversee commercial operations and ensure contractual obligations are met</li>
                <li>Collaborate with the programs, events, and marketing teams to deliver on commercial partnerships</li>
                <li>Develop financial projections, track performance against targets, and report on ROI</li>
                <li>Ensure compliance with commercial agreements and risk management policies</li>
              </ul>
            </div>
          </div>
          
          <h4 class="font-semibold text-[#172840] mb-3">What We Offer</h4>
          <ul class="text-gray-600 text-sm space-y-1 mb-4 list-disc ml-4">
            <li>An opportunity to shape the future of Africa's creative economy</li>
            <li>A Pan-African platform with global reach and influence</li>
            <li>Dynamic, purpose-driven work environment</li>
            <li>Competitive compensation package with performance incentives</li>
            <li>Opportunities for growth, international exposure, and leadership</li>
          </ul>
        `
      },
      {
        title: "Business Development Intern",
        location: "South Africa (Pan-African Scope)",
        type: "Internship",
        department: "Business Development",
        description: "Support the growth of PAAN by assisting in membership recruitment, partner onboarding, research, and relationship management in a Pan-African creative economy platform.",
        requirements: [
          "Bachelor's degree (completed or ongoing) in Business, Marketing, Communications, or related field",
          "Strong interest in business development and African creative industry",
          "Excellent communication and interpersonal skills",
          "Strong research and analytical abilities",
          "Tech-savvy with MS Office/Google Workspace knowledge"
        ],
        duration: "6 months (with possibility of extension)",
        detailedDescription: `
          <h4 class="font-semibold text-[#172840] mb-3">Role Overview</h4>
          <p class="text-gray-600 mb-4">The Business Development Intern will support the growth of PAAN by assisting in membership recruitment, partner onboarding, research, and relationship management. This is a learning role designed for a dynamic and ambitious individual interested in business development, partnerships, and the African creative industry.</p>
          
          <h4 class="font-semibold text-[#172840] mb-3">Key Responsibilities</h4>
          <div class="space-y-3 mb-4">
            <div>
              <h5 class="font-medium text-[#172840] mb-1">1. Membership Recruitment & Onboarding</h5>
              <ul class="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                <li>Assist in identifying and reaching out to potential new members and partners</li>
                <li>Support the onboarding process by preparing documentation, presentations, and follow-up communication</li>
                <li>Maintain accurate member and partner records in the CRM system</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-[#172840] mb-1">2. Business Development Support</h5>
              <ul class="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                <li>Research and map potential opportunities across African and global markets</li>
                <li>Assist in preparing business proposals, pitch decks, and partnership packages</li>
                <li>Track leads, opportunities, and support pipeline reporting</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-[#172840] mb-1">3. Client & Partner Engagement</h5>
              <ul class="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                <li>Support relationship management with existing members and partners</li>
                <li>Assist in organizing and coordinating onboarding sessions, webinars, and networking events</li>
                <li>Handle basic queries from members and partners, escalating where necessary</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-[#172840] mb-1">4. Market Research & Intelligence</h5>
              <ul class="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                <li>Conduct research on industry trends, competitive landscapes, and potential growth markets</li>
                <li>Generate insights to support strategic decision-making and partnership development</li>
              </ul>
            </div>
          </div>
          
          <h4 class="font-semibold text-[#172840] mb-3">Learning Outcomes</h4>
          <p class="text-gray-600 mb-3">By the end of the internship, the Business Development Intern will have gained:</p>
          <ul class="text-gray-600 text-sm space-y-1 mb-4 list-disc ml-4">
            <li>Practical experience in business development, membership growth, and client relations</li>
            <li>Skills in proposal writing, partner engagement, and CRM tools</li>
            <li>Exposure to Africa's dynamic creative and communications industry</li>
            <li>Networking opportunities with top agencies and brands across Africa and beyond</li>
          </ul>
          
          <h4 class="font-semibold text-[#172840] mb-3">What We Offer</h4>
          <ul class="text-gray-600 text-sm space-y-1 mb-4 list-disc ml-4">
            <li>A structured, mentorship-driven internship experience</li>
            <li>Hands-on exposure to business development and partnerships in a Pan-African context</li>
            <li>Networking opportunities across Africa's top creative agencies and global partners</li>
            <li>A dynamic, collaborative, and inclusive work environment</li>
            <li>Stipend/allowance</li>
          </ul>
        `
      }
    ];

    return (
      <section className="py-16 sm:py-20 bg-white" id="open-positions" ref={sectionRefs.openPositions}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#172840] mb-4">
              {t('careers.openPositions.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('careers.openPositions.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-[#84C1D9] transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F2B706]/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                {/* Header Section */}
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-[#172840] group-hover:text-[#F25849] transition-colors duration-300 mb-3">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-[#84C1D9] text-[#172840] px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                          {position.location.includes('Ghana') ? (
                            <Icon icon="flag:gh-4x3" className="w-4 h-4 inline mr-2" />
                          ) : position.location.includes('South Africa') ? (
                            <Icon icon="flag:za-4x3" className="w-4 h-4 inline mr-2" />
                          ) : (
                            <Icon icon="ic:baseline-location-on" className="w-4 h-4 inline mr-1" />
                          )}
                          {position.location}
                        </span>
                        <span className="bg-[#F2B706] text-[#172840] px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                          <Icon icon="ic:baseline-work" className="w-4 h-4 inline mr-1" />
                          {position.type}
                        </span>
                        <span className="bg-[#F25849] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                          <Icon icon="ic:baseline-business" className="w-4 h-4 inline mr-1" />
                          {position.department}
                        </span>
                        {position.duration && (
                          <span className="bg-[#34B6A7] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                            <Icon icon="ic:baseline-schedule" className="w-4 h-4 inline mr-1" />
                            {position.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="mb-6">
                    <p className="text-gray-700 text-base leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-[#84C1D9]">
                      {position.description}
                    </p>
                  </div>

                  {/* Requirements Section */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#172840] mb-4 flex items-center">
                      <Icon icon="ic:baseline-verified" className="w-5 h-5 mr-2 text-[#34B6A7]" />
                      Key Requirements
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {position.requirements.map((req, reqIndex) => (
                        <div key={reqIndex} className="flex items-start bg-white p-3 rounded-lg border border-gray-100 hover:border-[#84C1D9] transition-colors duration-200">
                          <Icon icon="ic:baseline-check-circle" className="w-5 h-5 text-[#34B6A7] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 leading-relaxed">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Read More/Read Less Toggle */}
                  <div className="mb-6">
                    <button
                      onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                      className="flex items-center justify-center w-full text-[#F25849] hover:text-[#D6473C] hover:bg-[#F25849]/5 transition-all duration-300 font-semibold text-sm py-3 px-4 rounded-lg border border-[#F25849]/20 hover:border-[#F25849]"
                    >
                      {expandedJob === index ? (
                        <>
                          <Icon icon="ic:baseline-keyboard-arrow-up" className="w-5 h-5 mr-2" />
                          Read Less
                        </>
                      ) : (
                        <>
                          <Icon icon="ic:baseline-keyboard-arrow-down" className="w-5 h-5 mr-2" />
                          Read More About This Role
                        </>
                      )}
                    </button>
                    
                    {expandedJob === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm"
                      >
                        <div 
                          dangerouslySetInnerHTML={{ __html: position.detailedDescription }}
                          className="prose prose-sm max-w-none"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <button 
                      onClick={openModal}
                      className="w-full bg-gradient-to-r from-[#172840] to-[#0F1A2E] text-white py-4 px-6 rounded-xl hover:from-[#F25849] hover:to-[#D6473C] transition-all duration-300 font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
                    >
                      <Icon icon="ic:baseline-send" className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {t('careers.openPositions.applyNow')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#F2B706] bg-opacity-10 border border-[#F2B706] rounded-lg p-6">
                <h4 className="font-semibold text-[#172840] mb-2">Commercial Manager - Direct Application</h4>
                <p className="text-gray-600 text-sm mb-3">
                  For the Commercial Manager position, please send your CV and Cover Letter directly to:
                </p>
                <a 
                  href="mailto:careers@paanetwork.org?subject=Commercial Manager – PAAN"
                  className="text-[#F25849] font-semibold hover:underline"
                >
                  careers@paan.africa
                </a>
                <p className="text-gray-500 text-xs mt-2">
                  Subject line: "Commercial Manager – PAAN"
                </p>
              </div>
              
              <div className="bg-[#34B6A7] bg-opacity-10 border border-[#34B6A7] rounded-lg p-6">
                <h4 className="font-semibold text-[#172840] mb-2">Business Development Intern - Direct Application</h4>
                <p className="text-gray-600 text-sm mb-3">
                  For the Business Development Intern position, please send your CV and Cover Letter directly to:
                </p>
                <a 
                  href="mailto:careers@paan.africa?subject=Business Development Intern – PAAN"
                  className="text-[#F25849] font-semibold hover:underline"
                >
                  careers@paan.africa
                </a>
                <p className="text-gray-500 text-xs mt-2">
                  Subject line: "Business Development Intern – PAAN"
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              Don't see a position that matches your skills? We're always looking for exceptional talent.
            </p>
            <button 
              onClick={openModal}
              className="bg-transparent border border-[#172840] text-[#172840] py-3 px-8 rounded-full hover:bg-[#172840] hover:text-white transition-all duration-300 font-semibold"
            >
              Send Us Your Resume
            </button>
          </div>
        </div>
      </section>
    );
  };

  // Why Join Us component
  const WhyJoinUs = () => {
    const reasons = [
      {
        icon: "ic:baseline-public",
        title: t('careers.whyJoinUs.impact.title'),
        description: t('careers.whyJoinUs.impact.description')
      },
      {
        icon: "ic:baseline-trending-up",
        title: t('careers.whyJoinUs.growth.title'),
        description: t('careers.whyJoinUs.growth.description')
      },
      {
        icon: "ic:baseline-group",
        title: t('careers.whyJoinUs.culture.title'),
        description: t('careers.whyJoinUs.culture.description')
      },
      {
        icon: "ic:baseline-lightbulb",
        title: t('careers.whyJoinUs.mission.title'),
        description: t('careers.whyJoinUs.mission.description')
      }
    ];

    return (
      <section className="py-16 sm:py-20 bg-[#84C1D9]" id="why-join-us" ref={sectionRefs.whyJoinUs}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#172840] mb-4">
              {t('careers.whyJoinUs.title')}
            </h2>
            <p className="text-lg text-[#172840] max-w-2xl mx-auto">
              {t('careers.whyJoinUs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F2B706] p-3 rounded-lg">
                    <Icon icon={reason.icon} className="w-6 h-6 text-[#172840]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#172840] mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };


  // Culture component
  const Culture = () => {
    const values = [
      {
        title: "Excellence",
        description: "We strive for the highest standards in everything we do, delivering exceptional results for our clients and partners.",
        color: "bg-[#F2B706]"
      },
      {
        title: "Innovation",
        description: "We embrace new ideas and technologies, constantly pushing boundaries to create better solutions.",
        color: "bg-[#84C1D9]"
      },
      {
        title: "Collaboration",
        description: "We believe in the power of teamwork and diverse perspectives to achieve extraordinary outcomes.",
        color: "bg-[#F25849]"
      },
      {
        title: "Integrity",
        description: "We operate with honesty, transparency, and ethical practices in all our business relationships.",
        color: "bg-[#34B6A7]"
      }
    ];

    return (
      <section className="py-16 sm:py-20 bg-[#172840]" ref={sectionRefs.culture}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Culture & Values
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our values guide everything we do, from how we work together to how we serve our clients and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                    <span className="text-white font-bold text-lg">
                      {value.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#172840]">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Application Process component
  const ApplicationProcess = () => {
    const steps = [
      {
        number: 1,
        title: "Apply Online",
        description: "Submit your application through our careers portal with your resume and cover letter."
      },
      {
        number: 2,
        title: "Initial Review",
        description: "Our team reviews your application and reaches out within 5 business days if there's a match."
      },
      {
        number: 3,
        title: "Interview Process",
        description: "Participate in interviews with our team to discuss your experience and fit."
      },
      {
        number: 4,
        title: "Decision & Onboarding",
        description: "Receive our decision and join our team with a comprehensive onboarding experience."
      }
    ];

    return (
      <section className="py-16 sm:py-20 bg-white" ref={sectionRefs.application}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#172840] mb-4">
              {t('careers.application.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('careers.application.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[#F2B706]"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="bg-[#F2B706] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-[#172840] font-bold text-2xl">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#172840] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={openModal}
              className="bg-[#F25849] text-white py-4 px-8 rounded-full hover:bg-[#D6473C] transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-semibold text-lg shadow-lg"
            >
              Start Your Application
            </button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <SEO
        title="Careers at PAAN - Join Our Team | Pan-African Agency Network"
        description="Join PAAN and help build the future of African marketing. Explore career opportunities, learn about our culture, and apply for positions across our growing network."
        keywords="PAAN careers, African marketing jobs, remote work Africa, marketing careers, creative jobs Africa, PAAN team, join PAAN, African talent, marketing opportunities"
      />
      <main className="sm:px-0 sm:pt-0 relative">
        <Header navLinkColor="text-white" transparent={true} />
        <Hero />
        <OpenPositions />
        <WhyJoinUs />
        <Culture />
        <ApplicationProcess />
        <Footer />
        <CareerApplicationModal isOpen={isModalOpen} onClose={closeModal} />
        <ScrollToTop />
      </main>
    </>
  );
};

export default dynamic(() => Promise.resolve(CareersPage), {
  ssr: false
});
