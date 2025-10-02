import SEO from "@/components/SEO";
import PAANAwardsHeader from "../layouts/paan-awards-header";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";
import { motion } from "framer-motion";
import PAANAwardsApplicationModal from "@/components/PAANAwardsApplicationModal";
import CategoryNominationModal from "@/components/CategoryNominationModal";
import PaystackScript from "@/components/PaystackScript";

// Animation variants - defined outside component for global access
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const SummitPage = () => {
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    highlights: useRef(null),
    themes: useRef(null),
    sessions: useRef(null),
    whoShouldAttend: useRef(null),
    tickets: useRef(null),
    events: useRef(null),
    contactUs: useRef(null),
  };

  const isFixed = useFixedHeader();
  const [activeDay, setActiveDay] = useState('day1');
  
  // Count up animation state
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    investorMeetings: 0,
    ndasSigned: 0,
    termSheets: 0
  });

  // Speakers carousel state - Commented out jury state
  // const [currentJuryIndex, setCurrentJuryIndex] = useState(0);
  // const [visibleJury, setVisibleJury] = useState(3);

  // Sessions carousel state
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [visibleSessions, setVisibleSessions] = useState(3);

  // Awards toggle state
  const [awardType, setAwardType] = useState('agency'); // 'agency' or 'freelancer'
  
  // Application modal state
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  
  // Category nomination modal state
  const [isNominationModalOpen, setIsNominationModalOpen] = useState(false);

 
  // Get visible jury - Commented out
  // const getVisibleJury = () => {
  //   return jury.slice(currentJuryIndex, currentJuryIndex + visibleJury);
  // };

  // Get visible sessions
  const getVisibleSessions = () => {
    return sessions.slice(currentSessionIndex, currentSessionIndex + visibleSessions);
  };

  // Jury data - Commented out
  // const jury = [
  //   {
  //     id: 1,
  //     name: "Mark Doe",
  //     title: "CEO, Company",
  //     image: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/jury/1.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Sarah Johnson",
  //     title: "Creative Director, Design Studio",
  //     image: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/jury/1.png",
  //   },
  //   {
  //     id: 3,
  //     name: "David Kim",
  //     title: "Tech Innovation Lead, Startup Inc",
  //     image: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/jury/1.png",
  //   },
  // ];

  // Sessions/Special Features data
  const sessions = [
    {
      id: 1,
      title: "Creator Crawl",
      description: "An evening tour of Nairobi's creative hotspots designed for networking and collaboration.",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/creator-crawl.png",
      icon: "mdi:handshake",
      category: "Networking"
    },
    {
      id: 2,
      title: "City Excursions",
      description: "Curated cultural and innovation hub visits to immerse participants in Nairobi's vibrant ecosystem.",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/city-excursions.png",
      icon: "mdi:tools",
      category: "Experience"
    },
    {
      id: 3,
      title: "Investor Roundtables",
      description: "Invite-only sessions connecting startups, creators, and investors for candid deal-making discussions.",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/investor-roundtable.png",
      icon: "mdi:map-marker",
      category: "Investment"
    },
    {
      id: 4,
      title: "Creator Crawl",
      description: "An evening tour of Nairobi's creative hotspots designed for networking and collaboration.",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/creator-crawl.png",
      icon: "mdi:handshake",
      category: "Networking"
    },
    {
      id: 5,
      title: "City Excursions",
      description: "Curated cultural and innovation hub visits to immerse participants in Nairobi's vibrant ecosystem.",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/city-excursions.png",
      icon: "mdi:tools",
      category: "Experience"
    },
    {
      id: 6,
      title: "Investor Roundtables",
      description: "Invite-only sessions connecting startups, creators, and investors for candid deal-making discussions.",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/investor-roundtable.png",
      icon: "mdi:map-marker",
      category: "Investment"
    },
  ];

  // Awards data
  const agencyAwards = [
    {
      id: 1,
      title: "The Continental Crown: Pan-African Agency of the Year",
      description: "The highest honor celebrating the agency that set the creative standard across Africa.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/healthicons_award-trophy.svg"
    },
    {
      id: 2,
      title: "The Purpose & Impact Award",
      description: "For agencies and clients leading in CSR, sustainability, and purpose-driven campaigns.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_leaf-circle.svg"
    },
    {
      id: 3,
      title: "The Borderless Collaboration Award",
      description: "Honoring seamless cross-country campaigns that prove creativity knows no borders.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ri_speak-ai-fill.svg"
    },
    {
      id: 4,
      title: "The Creative Campaign Masterpiece Award",
      description: "Recognizing the year’s most original and impactful creative campaign.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/material-symbols_target.svg"
    },
    {
      id: 5,
      title: "The Visionary Leadership Award: Pan-African CEO of the Year",
      description: "Celebrating bold leadership shaping Africa’s creative economy.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg"
    },
    {
      id: 6,
      title: "The Innovation & AI Excellence Award",
      description: "For groundbreaking and ethical use of AI in marketing and creativity.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_leaf-circle.svg"
    },
    {
      id: 7,
      title: "The Bold Brand Disruptor Award",
      description: "Recognizing a brand campaign that redefined the rules and sparked conversation.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_leaf-circle.svg"
    }
  ];

  const freelancerAwards = [
    {
      id: 1,
      title: "Freelancer of the Year",
      description: "Celebrating exceptional individual creative talent and impact.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/heroicons_user-solid.svg"
    },
    {
      id: 2,
      title: "Rising Creative Star",
      description: "Recognizing emerging talent with outstanding potential and growth.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/material-symbols_target.svg"
    },
    {
      id: 3,
      title: "Cross-Border Collaborator",
      description: "Honoring freelancers who excel in international partnerships.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg"
    },
    {
      id: 4,
      title: "Creative Entrepreneur",
      description: "Celebrating freelancers who have built successful creative businesses.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/healthicons_award-trophy.svg"
    },
    {
      id: 5,
      title: "Digital Innovation Leader",
      description: "Recognizing freelancers at the forefront of digital creative innovation.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ri_speak-ai-fill.svg"
    },
    {
      id: 6,
      title: "Community Impact Creator",
      description: "Honoring freelancers who use their skills to create positive social impact.",
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_leaf-circle.svg"
    }
  ];

  // Count up animation effect
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;
      
      const targets = {
        investorMeetings: 150,
        ndasSigned: 50,
        termSheets: 10
      };
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          investorMeetings: Math.floor(targets.investorMeetings * progress),
          ndasSigned: Math.floor(targets.ndasSigned * progress),
          termSheets: Math.floor(targets.termSheets * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setCounts(targets);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Countdown timer state and logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date to April 22, 2026
  useEffect(() => {
    const targetDate = new Date('2026-04-22T00:00:00+03:00'); // April 22, 2026 at midnight EAT
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Intersection observer for stats animation
  useEffect(() => {
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(statsSection);
      
      return () => observer.unobserve(statsSection);
    }
  }, [isVisible]);
  

  return (
    <>
      <SEO
        title="PAAN Awards 2026 | Celebrating Excellence in African Creative & Tech Industry"
        description="Join the prestigious PAAN Awards 2026, recognizing outstanding achievements in Africa's creative and tech industry. Celebrate innovation, creativity, and excellence across agencies, freelancers, and digital professionals shaping Africa's future."
        keywords="PAAN Awards 2026, African creative awards, tech industry awards, creative excellence Africa, digital innovation awards, African agency awards, freelancer recognition, creative industry awards, tech leadership awards, African business awards"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/awards-hero.webp"
        ogTitle="PAAN Awards 2026 | Celebrating Excellence in African Creative & Tech Industry"
        ogDescription="Join the prestigious PAAN Awards 2026, recognizing outstanding achievements in Africa's creative and tech industry. Celebrate innovation, creativity, and excellence across agencies, freelancers, and digital professionals shaping Africa's future."
        twitterTitle="PAAN Awards 2026 | Celebrating Excellence in African Creative & Tech Industry"
        twitterDescription="Join the prestigious PAAN Awards 2026, recognizing outstanding achievements in Africa's creative and tech industry. Celebrate innovation, creativity, and excellence across agencies, freelancers, and digital professionals shaping Africa's future."
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "PAAN Awards 2026 - Celebrating Excellence in African Creative & Tech Industry",
              "alternateName": "PAAN Creative & Tech Awards 2026",
              "startDate": "2026-04-22T19:00:00+03:00",
              "endDate": "2026-04-22T23:00:00+03:00",
              "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "Sarit Centre",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Sarit Centre, Westlands",
                  "addressLocality": "Nairobi",
                  "addressRegion": "Nairobi County",
                  "postalCode": "00100",
                  "addressCountry": "KE"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "-1.2921",
                  "longitude": "36.8219"
                }
              },
              "image": [
                "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/awards-hero.webp",
                "https://paan.africa/assets/images/hero.webp"
              ],
              "description": "Join the prestigious PAAN Awards 2026, recognizing outstanding achievements in Africa's creative and tech industry. Celebrate innovation, creativity, and excellence across agencies, freelancers, and digital professionals shaping Africa's future.",
              "offers": {
                "@type": "Offer",
                "url": "https://paan.africa/paan-awards",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-09-01T00:00:00+03:00",
                "description": "Free attendance for PAAN Awards 2026 ceremony"
              },
              "performer": { 
                "@type": "Organization", 
                "name": "PAAN Africa",
                "url": "https://paan.africa"
              },
              "organizer": { 
                "@type": "Organization", 
                "name": "Pan-African Agency Network (PAAN)", 
                "url": "https://paan.africa",
                "logo": "https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Creative professionals, tech industry leaders, agencies, freelancers, digital innovators, award nominees and winners"
              },
              "eventSchedule": {
                "@type": "Schedule",
                "startTime": "19:00",
                "endTime": "23:00",
                "duration": "PT4H"
              },
              "award": {
                "@type": "Award",
                "name": "PAAN Awards 2026",
                "description": "Annual awards recognizing excellence in African creative and tech industry",
                "sponsor": {
                  "@type": "Organization",
                  "name": "Pan-African Agency Network (PAAN)"
                }
              },
              "keywords": "PAAN Awards 2026, African creative awards, tech industry awards, creative excellence Africa, digital innovation awards, African agency awards, freelancer recognition, creative industry awards, tech leadership awards, African business awards"
            }),
          }}
        />
      </Head>

      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <PAANAwardsHeader 
          navLinkColor='text-white' 
          onApplyNowClick={() => setIsApplicationModalOpen(true)}
        />

        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} timeLeft={timeLeft} onApplyNowClick={() => setIsApplicationModalOpen(true)} />

        {/* Our Partners */}
        <div className="bg-gray-50 relative py-16 sm:py-20 md:py-24">
          
          <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h3 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-bold mb-4">
                In Collaboration With
              </h3>
              <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Partnering with industry leaders to drive innovation and excellence
              </p>
            </div>
            
            {/* Partners Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-2 md:gap-4 max-w-5xl mx-auto">
              
              {/* AIA Logo */}
              <div className="group relative">
                <div className="relative w-full h-32 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                  <img 
                    src="/assets/images/partners/aia-2.png" 
                    alt="AIA Logo" 
                    className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              </div>

              {/* PAAN Logo */}
              <div className="group relative">
                <div className="relative w-full h-32 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                  <img 
                    src="/assets/images/partners/paan.png" 
                    alt="PAAN Logo" 
                    className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              </div>
              
              {/* IAN Logo */}
              <div className="group relative sm:col-span-2 lg:col-span-1 sm:justify-self-center lg:justify-self-auto">
                <div className="relative w-full h-32 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                  <img 
                    src="/assets/images/partners/IAN.png" 
                    alt="IAN Logo" 
                    className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>

            
          </section>
        </div>
     
        {/* About the Awards */}
        <div className="bg-[#F3F9FB]" id="about-us" ref={sectionRefs.about} handleScroll={handleScroll} isFixed={isFixed}>
        <section className="relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-4 py-20 items-center">
            <div className="flex flex-col gap-8 z-0">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl lg:text-5xl text-[#172840] uppercase font-bold leading-tight">11 Categories. One Continental Stage.</h2>
                <p className="text-lg text-[#172840] font-light leading-relaxed">From Agency of the Year to Best Use of AI, these awards celebrate the people, brands, and ideas driving Africa's creative future.</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/healthicons_award-trophy.svg" alt="Agency of the Year" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-[#172840] leading-tight">Agency of the Year</h4>
                </div>
                <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_leaf-circle.svg" alt="Sustainability & Purpose" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-[#172840] leading-tight">Sustainability & Purpose</h4>  
                </div>
                <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg" alt="Cross-Border Collaboration" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-[#172840] leading-tight">Cross-Border Collaboration</h4>  
                </div>
                <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/material-symbols_target.svg" alt="Creative Campaign" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-[#172840] leading-tight">Creative Campaign</h4>  
                </div>
                <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/heroicons_user-solid.svg" alt="Agency CEO" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-[#172840] leading-tight">Agency CEO</h4>  
                </div>
                <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ri_speak-ai-fill.svg" alt="Best Use of AI" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-[#172840] leading-tight">Best Use Of AI</h4>  
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  className="bg-[#F25849] text-white rounded-full px-8 py-4 text-base font-semibold hover:bg-[#E0473A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                  onClick={() => setIsApplicationModalOpen(true)}
                >
                  Apply Now
                </button>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/imag-1.png" 
                  alt="PAAN Awards" 
                  className="h-[500px] w-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
        <Image
            src="/assets/images/bg-pattern.svg"
            width={0}
            height={0}
            alt="Background Pattern"
            className="absolute bottom-0 left-0 w-full h-1/3 object-cover z-0 opacity-10"
          />
        </div>

        {/* New Detailed Information Section */}
        <div className="bg-white relative py-20" id="detailed-info-section">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl text-paan-dark-blue uppercase font-bold leading-tight mb-6">
                Celebrating Africa's Independent Agencies, Creativity & Innovation
              </h2>
              <p className="text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto">
                The Pan-African Agency Network (PAAN) proudly invites entries for the PAAN Awards 2026 — the premier platform celebrating the creativity, innovation, and impact of Africa's independent agencies.
              </p>
              <p className="text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto mt-4">
                This is your chance to showcase your agency's best work, gain continental recognition, and position your brand as a leader shaping Africa's creative economy.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Why Enter Section */}
              <div className="bg-gradient-to-br from-paan-blue/10 to-paan-red/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-paan-dark-blue mb-6">Why Enter?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-paan-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon icon="mdi:trophy" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue mb-1">Credibility & Recognition</h4>
                      <p className="text-gray-600 text-sm">Stand out as a top-performing agency on a continental stage.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-paan-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon icon="mdi:handshake" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue mb-1">Client Attraction</h4>
                      <p className="text-gray-600 text-sm">Strengthen your pitch power with award-winning credentials.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-paan-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon icon="mdi:account-group" className="w-5 h-5 text-paan-dark-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue mb-1">Talent Magnet</h4>
                      <p className="text-gray-600 text-sm">Attract top creative talent eager to join award-winning teams.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon icon="mdi:eye" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue mb-1">Visibility</h4>
                      <p className="text-gray-600 text-sm">Get featured across PAAN's platforms, media partners, and industry events.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon icon="mdi:network" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue mb-1">Networking</h4>
                      <p className="text-gray-600 text-sm">Gain access to brand leaders, decision-makers, and fellow innovators.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon icon="mdi:medal" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue mb-1">Prestige</h4>
                      <p className="text-gray-600 text-sm">Winners receive the official PAAN Award badge — a seal of excellence for all communications.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who Can Enter Section */}
              <div className="bg-gradient-to-br from-paan-yellow/10 to-paan-blue/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-paan-dark-blue mb-6">Who Can Enter?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Independent agencies across Africa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">PR, advertising, media, digital, design, branding, and specialist agencies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Production houses, content creators, and communication consultancies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Agencies working in both local and regional markets</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

         {/* Award Categories Overview */}
        <section className="bg-paan-dark-blue py-12" id="award-categories-section">
          <div className="max-w-7xl mx-auto p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">Award Categories</h3>
              <p className="text-white/90 text-center mb-8 max-w-3xl mx-auto">
                The PAAN Awards recognize excellence across five major clusters:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-paan-red rounded-full flex items-center justify-center mb-4">
                    <Icon icon="mdi:bullhorn" className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Campaign Excellence Awards</h4>
                  <p className="text-white/80 text-sm">PR, Communication, OOH, Social Media, Content, Influencer, CSR/Impact, Integrated, B2B, and Experiential campaigns.</p>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-paan-blue rounded-full flex items-center justify-center mb-4">
                    <Icon icon="mdi:office-building" className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Agency Excellence Awards</h4>
                  <p className="text-white/80 text-sm">Digital, Creative, Design & Branding, Media Buying, Production, Specialist, Rising, Regional, and Independent agencies.</p>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-paan-yellow rounded-full flex items-center justify-center mb-4">
                    <Icon icon="mdi:lightbulb" className="w-6 h-6 text-paan-dark-blue" />
                  </div>
                  <h4 className="font-semibold mb-2">Innovation & Technology Awards</h4>
                  <p className="text-white/80 text-sm">Tech Innovation, Creative Use of Data, and E-Commerce Marketing.</p>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <Icon icon="mdi:bank" className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Sector Excellence Awards</h4>
                  <p className="text-white/80 text-sm">Public Sector and Financial Services campaigns.</p>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm md:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-paan-red to-paan-yellow rounded-full flex items-center justify-center mb-4">
                    <Icon icon="mdi:crown" className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Special Honors</h4>
                  <p className="text-white/80 text-sm">Agency Leader of the Year and the Grand Prix: Agency of the Year.</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button
                  className="bg-paan-red text-white px-8 py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1 mx-auto"
                  onClick={() => setIsApplicationModalOpen(true)}
                >
                  <Icon icon="mdi:trophy" className="w-5 h-5" />
                  Apply for Awards
                </button>
              </div>
            </div>
        </section>

        {/* PAAN AWARDS SECTION */}
        <div className="bg-white relative py-20" id="paan-awards-section" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl">
             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
               <div className="text-left mb-6 lg:mb-0">
                 <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Awards Category</h3>
               </div>
               
               {/* Toggle Switch */}
               <div className="flex items-center">
                 <button
                   onClick={() => setAwardType(awardType === 'agency' ? 'freelancer' : 'agency')}
                   className="relative inline-flex h-12 w-80 items-center rounded-full bg-[#C2E0EC] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-paan-blue focus:ring-offset-2 overflow-hidden"
                 >
                   {/* Agency Label */}
                   <span className={`absolute left-6 text-sm font-medium transition-colors duration-300 z-10 ${
                     awardType === 'agency' ? 'text-white' : 'text-[#172840]'
                   }`}>
                     Agency Awards
                   </span>
                   
                   {/* Freelancer Label */}
                   <span className={`absolute right-6 text-sm font-medium transition-colors duration-300 z-10 ${
                     awardType === 'freelancer' ? 'text-white' : 'text-[#172840]'
                   }`}>
                     Freelancer Awards
                   </span>
                   
                   {/* Sliding Background */}
                   <span
                     className={`absolute h-10 transform rounded-full bg-[#172840] transition-all duration-300 ${
                       awardType === 'freelancer' 
                         ? 'w-[200px] translate-x-[120px]' 
                         : 'w-[140px] translate-x-2'
                     }`}
                   />
                 </button>
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
               {(awardType === 'agency' ? agencyAwards : freelancerAwards).map((award) => (
                 <div key={award.id} className="bg-paan-dark-blue w-80 h-80 rounded-full shadow-xl overflow-hidden relative flex items-center justify-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                   {/* Ring image inside the circle with padding */}
                   <div className="absolute inset-4 flex items-center justify-center">
                     <img 
                       src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/awards-ring.svg?updatedAt=1757757368902" 
                       alt="Awards Ring" 
                       className="w-full h-full object-contain"
                     />
                   </div>
                   
                   <div className="text-center relative mt-12 max-w-48">
                     <h4 className="text-md font-bold text-white mb-3">{award.title}</h4>
                     <p className="text-white font-light text-xs leading-relaxed">{award.description}</p>
                   </div>
                 </div>
               ))}                
             </div>
          </section>
        </div>
        
        {/* Transparency Section */}
        <div className="bg-[#FEEEED] relative py-20" id="transparency-section" ref={sectionRefs.about} handleScroll={handleScroll} isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl text-[#172840] uppercase font-bold leading-tight mb-6">Fair. Transparent. Prestigious.</h2>
              <p className="text-lg text-[#172840] font-light leading-relaxed max-w-4xl mx-auto">
                Entries will be scored on creativity, impact, collaboration, and authenticity by an independent jury of African industry leaders.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <div className="flex justify-center lg:justify-end order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-md w-full">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-2.png" 
                    alt="PAAN Awards Transparency" 
                    className="h-[500px] w-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Criteria Cards Section */}
              <div className="flex flex-col gap-6 order-1 lg:order-2">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#172840] mb-2">Judging Criteria</h3>
                  <p className="text-[#172840] font-light">Our independent panel evaluates entries across four key dimensions:</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-paan-dark-blue rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ic_outline-color-lens.svg" alt="Creativity" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-white leading-tight mb-2">Creativity</h4>  
                    <p className="text-white font-light text-sm leading-relaxed">Original thinking, craft, and storytelling excellence.</p>
                  </div>
                  
                  <div className="bg-paan-red rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/tabler_bulb.svg" alt="Impact" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-white leading-tight mb-2">Impact</h4>  
                    <p className="text-white font-light text-sm leading-relaxed">Measurable results and cultural relevance.</p>
                  </div>
                  
                  <div className="bg-paan-yellow rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg" alt="Authenticity" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-[#172840] leading-tight mb-2">Authenticity</h4>  
                    <p className="text-paan-dark-blue font-light text-sm leading-relaxed">African context, voice, and integrity.</p>
                  </div>
                  
                  <div className="bg-paan-blue rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_world.svg" alt="Collaboration" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg font-bold text-white leading-tight mb-2">Collaboration</h4>  
                    <p className="text-white font-light text-sm leading-relaxed">Cross-discipline and cross-border teamwork.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        <Image
            src="/assets/images/bg-pattern.svg"
            width={0}
            height={0}
            alt="Background Pattern"
            className="absolute bottom-0 left-0 w-full h-1/3 object-cover z-0 opacity-10"
          />
        </div>

        {/* Jury section - Commented out */}
        {/*
        <div className="bg-white relative py-20" id="speakers-section" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl">
             <div className="text-center mb-12">
               <div>
                 <h3 className="text-3xl text-paan-dark-blue font-bold">Meet the Jury</h3>
                 <p className="text-xl font-normal text-paan-dark-blue mb-4">Independent leaders shaping Africa's creative future.</p>
               </div>
             </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getVisibleJury().map((jury) => (
                  <div key={jury.id} className="relative rounded-xl shadow-xl overflow-hidden h-96">
                    <Image
                      src={jury.image}
                      alt={jury.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div>
                        <h4 className="text-xl font-bold text-paan-red mb-1">{jury.name}</h4>
                        <p className="text-white/90 text-sm">{jury.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </section>
        </div>
        */}
        
        {/* Categories Section */}
        <div className="bg-paan-dark-blue relative py-20" id="categories-section" isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Section */}
              <div className="flex flex-col justify-center space-y-8">
                <div className="text-left">
                  <h2 className="text-4xl lg:text-5xl text-white uppercase font-bold leading-tight mb-6">Your Work. Africa's Spotlight.</h2>
                  <p className="text-lg text-white/90 font-light leading-relaxed mb-8">
                    Join Africa's most prestigious creative awards and showcase your talent to a continental audience.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Why Participate?</h3>
                  <ul className="space-y-3 text-white font-light">
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-yellow mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Gain continental recognition and credibility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-yellow mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Strengthen your brand and professional reputation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-yellow mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Connect with top agencies, clients & collaborators</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-yellow mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Inspire and be part of Africa's creative future</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    className="bg-paan-red text-white px-8 py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                    onClick={() => setIsApplicationModalOpen(true)}
                  >
                    Apply Now
                  </button>
                  <button 
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                    onClick={() => scrollToSection('paan-awards-section')}
                  >
                    Explore Categories
                  </button>
                </div>
              </div>
              
              {/* Image Section */}
              <div className="flex justify-center lg:justify-end order-first lg:order-last">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg w-full">
                  <Image 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-3.png" 
                    alt="PAAN Awards Categories" 
                    width={500} 
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Key Dates Section */}
        <div className="bg-[#F3F9FB] relative py-20" id="key-dates-section" isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl text-paan-dark-blue uppercase font-bold leading-tight mb-6">Key Dates 2025/2026</h2>
              <p className="text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto">
                Mark your calendar for the PAAN Summit & Creative Excellence Awards 2026.
              </p>
            </div>

               {/* table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-6 text-paan-dark-blue font-semibold text-lg">Date</th>
                    <th className="text-left py-4 px-6 text-paan-dark-blue font-semibold text-lg">Event</th>
                    <th className="text-left py-4 px-6 text-paan-dark-blue font-semibold text-lg">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-paan-dark-blue/20">
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">10 October 2025</td>
                    <td className="py-6 px-6 text-paan-red font-medium">Entries Open</td>
                    <td className="py-6 px-6 text-paan-dark-blue font-light">Submit your entries starting March 10. Showcase your agency, brand, or freelance work to a continental jury.</td>
                  </tr>
                  <tr className="border-t border-paan-dark-blue/20">
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">15 November 2025</td>
                    <td className="py-6 px-6 text-paan-red font-medium">Early Bird Deadline</td>
                    <td className="py-6 px-6 text-paan-dark-blue font-light">Take advantage of reduced entry fees and priority review for submissions received by this date.</td>
                  </tr>
                  <tr className="border-t border-paan-dark-blue/20">
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">30 November 2025</td>
                    <td className="py-6 px-6 text-paan-red font-medium">Final Entry Deadline</td>
                    <td className="py-6 px-6 text-paan-dark-blue font-light">All award entries must be submitted by midnight EAT. Late submissions will not be accepted.</td>
                  </tr>
                  <tr className="border-t border-paan-dark-blue/20">
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">15 January 2026</td>
                    <td className="py-6 px-6 text-paan-red font-medium">Finalists Announced</td>
                    <td className="py-6 px-6 text-paan-dark-blue font-light">The shortlisted entries will be revealed across all categories. Finalists will be notified directly.</td>
                  </tr>
                  <tr className="border-t border-paan-dark-blue/20">
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">22 April 2026</td>
                    <td className="py-6 px-6 text-paan-red font-medium">Awards Ceremony</td>
                    <td className="py-6 px-6 text-paan-dark-blue font-light">Join us at the PAAN Summit in Nairobi for the prestigious awards ceremony celebrating Africa's creative excellence.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

         

         {/* Parallax Section */}
         <div className="relative py-20 overflow-hidden h-[500px]" id="parallax-section" isFixed={isFixed}>
           {/* Parallax Background Image */}
           <div 
             className="absolute inset-0 bg-cover bg-center bg-fixed"
             style={{
               backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-4.png')",
               filter: "brightness(0.8)"
             }}
           />
           
           {/* Dark overlay for better text readability */}
           <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
           
           <section className="relative mx-auto max-w-6xl h-full flex items-center justify-center">
             <div className="text-center max-w-4xl mx-auto px-4">
               <div className="mb-12">
                 <h3 className="text-4xl lg:text-5xl text-white font-bold uppercase leading-tight mb-6">Are You Africa's Next Creative Leader?</h3>
                 <p className="text-xl lg:text-2xl font-normal text-white leading-relaxed">Join the most prestigious celebration of creativity in Africa. Showcase your impact, inspire the industry, and own the stage at the PAAN Summit Awards.</p>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button 
                   onClick={() => setIsApplicationModalOpen(true)} 
                   className="bg-paan-red text-white px-8 py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                 >
                   Apply Now
                 </button>
                 <button 
                   onClick={() => window.location.href = '/summit'} 
                   className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                 >
                   Join 2026 Summit
                 </button>
                 <a 
                   href="/paan-awards-terms"
                   target="_blank"
                   className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                 >
                   <Icon icon="mdi:gavel" className="w-5 h-5" />
                   Terms & Conditions
                 </a>
               </div>
             </div>
           </section>
         </div>

        <Footer />
        <ScrollToTop />
        
        {/* Paystack Script */}
        <PaystackScript />
        
        {/* Application Modal */}
        <PAANAwardsApplicationModal 
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
        />
        
        {/* Category Nomination Modal */}
        <CategoryNominationModal 
          isOpen={isNominationModalOpen}
          onClose={() => setIsNominationModalOpen(false)}
        />
      </main>
    </>
  );
};

const Hero = ({ sectionRefs, handleScroll, isFixed, scrollToSection, timeLeft, onApplyNowClick }) => {

  return (
    <>
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
          <div className="w-full px-4 sm:px-6 md:px-8 pb-8 sm:pb-44 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-12 lg:py-16">
            {/* Text Content */}
            <motion.div 
              className="flex-1 max-w-3xl text-left space-y-4 sm:space-y-6 lg:space-y-8 w-full"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="space-y-3 sm:space-y-4"
                variants={fadeInUp}
              >
                <h1 className="text-xs sm:text-sm text-white relative uppercase tracking-wide font-light">
                    The Pan-African Creative Excellence Awards
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl relative font-bold leading-tight bg-gradient-to-r from-[#A57C23] via-[#EBD679] via-[#F9EFA3] via-[#F2E085] to-[#A57C23] bg-clip-text text-transparent">
                    Celebrating Africa's Creative Excellence
                </h2>
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 font-light w-full leading-relaxed">
                    The PAAN Awards honor the boldest agencies, visionary brands, and exceptional freelancers shaping a borderless creative Africa.
                </p>  
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
                variants={scaleIn}
              >
                <button 
                  onClick={onApplyNowClick}
                  className="bg-[#F25849] border border-[#F25849] text-white py-3 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-10 rounded-full hover:bg-[#D6473C] transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-semibold text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => scrollToSection('categories-section')}
                  className="bg-transparent border border-white text-white py-3 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-10 rounded-full hover:bg-white hover:text-[#172840] transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-semibold text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
                >
                  Explore Categories
                </button>
              </motion.div>
              <motion.div 
                className="flex gap-2 text-white text-sm"
                variants={fadeInUp}
              >
                    <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 bg-[#F25849] rounded-full"></div>
                        Pan-African Jurors
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 bg-paan-yellow rounded-full"></div>
                        Transparent Criteria
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 bg-paan-blue rounded-full"></div>
                        Continental Recognition
                    </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <div className="flex-1 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mt-6 sm:mt-4 lg:mt-0 w-full">
              <div className="relative">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png"
                  alt="PAAN Team - Join Our Dynamic Team"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl object-cover shadow-2xl max-h-[300px] sm:max-h-[400px] lg:max-h-none"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 600px"
                />
                
                {/* Yellow Info Card */}
                <div className="absolute -bottom-2 left-4 bg-[#F2B706] rounded-lg p-4 shadow-lg max-w-[280px]">
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:trophy" className="text-[#172840] flex-shrink-0" width="32" height="32" />
                    <div className="flex flex-col">
                      <h3 className="text-[#172840] font-bold text-sm">Award Categories</h3>
                      <p className="text-[#172840] text-xs font-medium leading-relaxed">
                        11 categories across agencies & freelancers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default SummitPage;