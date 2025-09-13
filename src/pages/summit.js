import SEO from "@/components/SEO";
import Header from "../layouts/summit-header";
import Image from "next/image";
import BreakoutSessions from "@/components/BreakoutSessions";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import SummitFooter from "@/layouts/summit-footer";
import { useEffect, useRef, useState } from "react";
import BenefitsToggle from "@/components/BenefitsToggle";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import SeminarRegistration from "@/components/SeminarRegistration";
import { ctaButton } from "../data/summitMenu";
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";
import Accordion from "@/components/Accordion";


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

  // Speakers carousel state
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [visibleSpeakers, setVisibleSpeakers] = useState(3);

  // Sessions carousel state
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [visibleSessions, setVisibleSessions] = useState(3);

  // Navigation functions for speakers
  const nextSpeakers = () => {
    setCurrentSpeakerIndex((prev) => 
      prev + visibleSpeakers >= speakers.length ? 0 : prev + 1
    );
  };

  const prevSpeakers = () => {
    setCurrentSpeakerIndex((prev) => 
      prev === 0 ? Math.max(0, speakers.length - visibleSpeakers) : prev - 1
    );
  };

  // Navigation functions for sessions
  const nextSessions = () => {
    setCurrentSessionIndex((prev) => 
      prev + visibleSessions >= sessions.length ? 0 : prev + 1
    );
  };

  const prevSessions = () => {
    setCurrentSessionIndex((prev) => 
      prev === 0 ? Math.max(0, sessions.length - visibleSessions) : prev - 1
    );
  };

  // Get visible speakers
  const getVisibleSpeakers = () => {
    return speakers.slice(currentSpeakerIndex, currentSpeakerIndex + visibleSpeakers);
  };

  // Get visible sessions
  const getVisibleSessions = () => {
    return sessions.slice(currentSessionIndex, currentSessionIndex + visibleSessions);
  };

  // Speakers data
  const speakers = [
    {
      id: 1,
      name: "Mark Doe",
      title: "CEO, Company",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/1.png",
      linkedin: "https://linkedin.com/in/markdoe"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Creative Director, Design Studio",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/2.png",
      linkedin: "https://linkedin.com/in/sarahjohnson"
    },
    {
      id: 3,
      name: "David Kim",
      title: "Tech Innovation Lead, Startup Inc",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/3.png",
      linkedin: "https://linkedin.com/in/davidkim"
    },
  ];

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

  // Set target date to April 23, 2026
  useEffect(() => {
    const targetDate = new Date('2026-04-23T00:00:00+03:00'); // April 23, 2026 at midnight EAT
    
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
        title="PAAN Summit 2025 | Africa's Premier Creative & Tech Leadership Conference"
        description="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth."
        keywords="PAAN Summit 2025, African creative summit, tech conference Africa, Nairobi summit, Pan-African events, African innovation, creative tech Africa, agency summit Africa"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "PAAN Inaugural Summit 2025",
              "startDate": "2025-10-22T09:00:00+03:00",
              "endDate": "2025-10-24T17:00:00+03:00",
              "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "PAAN Africa Conference Center",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Nairobi Business Hub",
                  "addressLocality": "Nairobi",
                  "addressRegion": "Nairobi County",
                  "postalCode": "00100",
                  "addressCountry": "KE"
                }
              },
              "image": ["https://paan.africa/assets/images/hero.webp"],
              "description": "Join the PAAN Africa Summit 2025 to connect with freelancers, businesses, and innovators shaping the African digital economy. Engage in workshops, panels, and networking sessions with industry leaders.",
              "offers": {
                "@type": "Offer",
                "url": "https://paan.africa/summit",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2025-09-01T00:00:00+03:00"
              },
              "performer": { "@type": "Organization", "name": "PAAN Africa" },
              "organizer": { "@type": "Organization", "name": "PAAN Africa", "url": "https://paan.africa" }
            }),
          }}
        />
      </Head>

      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header navLinkColor='text-white' />

        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} timeLeft={timeLeft} />

        {/* Spacer to maintain layout flow */}
        <div className="h-screen"></div>


        {/* About the Summit */}
        {/* Countdown Banner with offset */}
        <div className="relative -mt-16 z-8">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="bg-gradient-to-r from-[#F25849] to-[#172840] rounded-lg shadow-2xl py-8 px-6">
              <div className="text-center">
                <div className="flex justify-center items-center gap-3 md:gap-6">
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                    <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-xs md:text-sm text-white/80">Days</div>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                    <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
                    <div className="text-xs md:text-sm text-white/80">Hours</div>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                    <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
                    <div className="text-xs md:text-sm text-white/80">Minutes</div>
                  </div>
                  <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                    <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
                    <div className="text-xs md:text-sm text-white/80">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white relative" id="about-us" ref={sectionRefs.about} handleScroll={handleScroll} isFixed={isFixed}>
        <section className="relative mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8 py-20 items-center">
            <div className="flex flex-col gap-6 z-0 pr-6">
              <div className="flex flex-col gap-4">
                <span className="bg-paan-blue text-white rounded-full px-6 py-2 text-sm font-medium w-fit">About</span>
                <h2 className="text-4xl text-[#172840] uppercase font-bold">About the Summit</h2>
                <h3 className="text-2xl text-[#172840] font-semibold">A deal-first gathering built for action.</h3>
              </div>
              
              <div className="space-y-4 text-[#172840] text-lg leading-relaxed">
                <p>
                  The Africa Borderless Creative Economy Summit 2026, hosted by the Pan-African Agency Network (PAAN), is the continent's leading deal-first gathering for creators, agencies, studios, tech innovators, investors, and policymakers.
                </p>
                <p>
                  Unlike inspiration-only events, the Summit is built for action: curated deal rooms, live simulations, and partner-funded clinics that turn conversations into MoUs, pilots, term sheets, and contracts. We're not just imagining Africa's creative future — we're building it in real time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  className="bg-[#F25849] text-white rounded-full px-8 py-4 text-base font-semibold hover:bg-[#E0473A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                  onClick={() => window.location.href = '#tickets'}
                >
                  Register Now
                </button>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative overflow-hidden">
                <img 
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/about-summit.png?updatedAt=1757608226948" 
                  alt="PAAN Summit" 
                  className="h-[45rem] w-full object-cover" 
                />
                {/* Top whitish effect */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/100 to-transparent"></div>
                {/* Bottom whitish effect */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/100 to-transparent"></div>
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

        <div className="mt-10 bg-[#DAECF3] relative">
          <section className="relative text-center mx-auto max-w-6xl py-20">
            <h2 className="text-4xl uppercase font-bold">AT A GLANCE</h2>
            <h3 className="text-md font-normal py-4">The scale and reach of the Summit.</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="bg-white rounded-lg shadow-lg p-4">
                 <div className="flex justify-end mb-2">
                   <div className="flex -space-x-2">
                     <div className="w-8 h-8 bg-[#F25849] rounded-full border-2 border-white flex items-center justify-center">
                       <Icon icon="mdi:account" className="text-white" width={16} height={16} />
                     </div>
                     <div className="w-8 h-8 bg-[#84C1D9] rounded-full border-2 border-white flex items-center justify-center">
                       <Icon icon="mdi:account" className="text-white" width={16} height={16} />
                     </div>
                     <div className="w-8 h-8 bg-[#172840] rounded-full border-2 border-white flex items-center justify-center">
                       <Icon icon="mdi:account" className="text-white" width={16} height={16} />
                     </div>
                     <div className="w-8 h-8 bg-[#D1D3D4] rounded-full border-2 border-white flex items-center justify-center">
                       <Icon icon="mdi:account" className="text-white" width={16} height={16} />
                     </div>
                   </div>
                 </div>
                 <h4 className="text-4xl font-bold text-left">300+</h4> 
                 <h5 className="text-md font-normal text-left">In-person Attendees</h5>
               </div>
               
               <div className="bg-white rounded-lg shadow-lg p-4">
                 <div className="flex justify-end mb-2">
                   <div className="flex -space-x-1">
                     <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                       <img src="https://flagcdn.com/w40/ke.png" alt="Kenya" className="w-full h-full object-cover" />
                     </div>
                     <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                       <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria" className="w-full h-full object-cover" />
                     </div>
                     <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                       <img src="https://flagcdn.com/w40/za.png" alt="South Africa" className="w-full h-full object-cover" />
                     </div>
                     <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                       <img src="https://flagcdn.com/w40/tz.png" alt="Tanzania" className="w-full h-full object-cover" />
                     </div>
                     <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                       <img src="https://flagcdn.com/w40/ug.png" alt="Uganda" className="w-full h-full object-cover" />
                     </div>
                     <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                       <img src="https://flagcdn.com/w40/gh.png" alt="Ghana" className="w-full h-full object-cover" />
                     </div>
                   </div>
                 </div>
                 <h4 className="text-4xl font-bold text-left">20+</h4> 
                 <h5 className="text-md font-normal text-left">Countries Represented</h5>
               </div>

                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex justify-end mb-2">
                    <div className="flex items-center justify-center">
                      <img 
                        src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/003-videocall%201.svg" 
                        alt="Video Call Icon" 
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <h4 className="text-4xl font-bold text-left">1,000+</h4> 
                  <h5 className="text-md font-normal text-left">Streaming Attendees</h5>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4"> 
                  <div className="flex justify-end mb-2">
                    <div className="flex items-center justify-center">
                      <img 
                        src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/038-microphones%201.svg" 
                        alt="Microphones Icon" 
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <h4 className="text-4xl font-bold text-left">30+</h4> 
                  <h5 className="text-md font-normal text-left">Industry‑leading speakers</h5>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex justify-end mb-2">
                    <div className="flex items-center justify-center">
                      <img 
                        src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/008-meeting%201.svg" 
                        alt="Meeting Icon" 
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <h4 className="text-4xl font-bold text-left">50+</h4> 
                  <h5 className="text-md font-normal text-left">Investors & funds</h5>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex justify-end mb-2">
                    <div className="flex items-center justify-center">
                      <img 
                        src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/023-network%201.svg" 
                        alt="Network Icon" 
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <h4 className="text-4xl font-bold text-left">40+</h4> 
                  <h5 className="text-md font-normal text-left">Sessions & clinics</h5>
                </div>
            </div>
            <div className="flex justify-start gap-2 pt-4">
              <button className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2">Register Now</button>
              <button className="bg-transparent border border-paan-dark-blue text-paan-dark-blue px-8 py-3 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2">Partner With Us</button>
              <button className="bg-transparent border border-paan-dark-blue text-paan-dark-blue px-8 py-3 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2">View Agenda</button>
            </div>
          </section>
        </div>
        <div className="bg-paan-dark-blue relative">
           <div className="w-full h-[30px] sm:h-[40px] md:h-[50px] relative">
              <Image
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-pattern.svg"
                fill
                alt=""
               className="object-cover w-full h-full"
                loading="lazy"
                sizes="100vw"
              />
            </div>
         </div>
      
        {/* Program Section */}
        <div className="bg-paan-dark-blue relative">
            <section className="mx-auto max-w-6xl py-20 justify-start">
              <div className="flex justify-between gap-8">
                <div className="text-left">
                    <h2 className="text-xs border w-fit mx-auto border-white text-white rounded-full px-4 py-2 text-center mb-2">Summit Program</h2>
                    <h3 className="text-2xl font-bold uppercase text-paan-yellow">Program</h3>
                </div>
                <div>
                  <p className="text-white text-3xl">Tracks and the two-day<br/> agenda snapshot.</p>
                </div>
              </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                 <div className="relative rounded-lg shadow-lg overflow-hidden h-[34rem]">
                   <Image
                     src="/assets/images/ip.png"
                     alt="Track 1"
                     fill
                     className="object-contain object-center"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-6">
                     <h4 className="text-2xl font-bold text-paan-dark-blue mb-2">IP, Capital & Content Exports</h4>
                     <p className="text-paan-dark-blue">Financing film, music, gaming, and fashion IP.</p>
                   </div>
                 </div>
                 <div className="relative rounded-lg shadow-lg overflow-hidden h-[34rem]">
                   <Image
                     src="/assets/images/nomad-work.png"
                     alt="Track 1"
                     fill
                     className="object-contain object-center"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-6">
                     <h4 className="text-2xl font-bold text-paan-dark-blue mb-2">Payments, Market Entry & Nomad Work</h4>
                     <p className="text-paan-dark-blue">Making cross-border work frictionless and borderless.</p>
                   </div>
                 </div>
                 <div className="relative rounded-lg shadow-lg overflow-hidden h-[34rem]">
                   <Image
                     src="/assets/images/ai-data.png"
                     alt="Track 1"
                     fill
                     className="object-contain object-center"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-6">
                     <h4 className="text-2xl font-bold text-paan-dark-blue mb-2">AI, Data, Discovery & <br/>Innovation</h4>
                     <p className="text-paan-dark-blue">Leveraging AI for content, compliance, and monetization.</p>
                   </div>
                 </div>
               </div>
            </section>
        </div>

        {/* Day 1 Section */}
        <div className="bg-[#F3F9FB] py-20" id="agenda" ref={sectionRefs.events} handleScroll={handleScroll} isFixed={isFixed}>          
           <section className="mx-auto max-w-6xl">            
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-paan-dark-blue mb-4">Summit Agenda</h2>
               <p className="text-lg text-gray-600">Two days of intensive learning, networking, and deal-making</p>
             </div>
             
             <div className="flex justify-center gap-4 mb-12">
               <button 
                 onClick={() => setActiveDay('day1')}
                 className={`px-8 py-3 rounded-full transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2 uppercase ${
                   activeDay === 'day1' 
                     ? 'bg-paan-blue border border-paan-blue text-white' 
                     : 'bg-transparent border border-paan-blue text-paan-blue hover:bg-paan-blue hover:text-white'
                 }`}
               >
                 Day 1
               </button>
               <button 
                 onClick={() => setActiveDay('day2')}
                 className={`px-8 py-3 rounded-full transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2 ${
                   activeDay === 'day2' 
                     ? 'bg-paan-blue border border-paan-blue text-white' 
                     : 'bg-transparent border border-paan-blue text-paan-blue hover:bg-paan-blue hover:text-white'
                 }`}
               >
                 Day 2
               </button>
            </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
               <div className="space-y-6">
                 <div className="relative rounded-lg overflow-hidden shadow-lg">
                   <Image
                     src="/assets/images/day1-1.png"
                     alt="Day 1 Morning Sessions"
                     width={500}
                     height={400}
                     className="w-full h-80 object-cover"
                   />
                   <div className="absolute inset-0 bg-black/40"></div>
                   <div className="absolute bottom-4 left-4 text-white">
                     <h3 className="text-xl font-bold">Morning Sessions</h3>
                     <p className="text-sm">Keynotes & Panels</p>
                   </div>
                 </div>
                 <div className="relative rounded-lg overflow-hidden shadow-lg">
                   <Image
                     src="/assets/images/day1-2.png"
                     alt="Day 1 Afternoon Sessions"
                     width={500}
                     height={400}
                     className="w-full h-80 object-cover"
                   />
                   <div className="absolute inset-0 bg-black/40"></div>
                   <div className="absolute bottom-4 left-4 text-white">
                     <h3 className="text-xl font-bold">Afternoon Sessions</h3>
                     <p className="text-sm">Deal Rooms & Clinics</p>
                   </div>
                 </div>
               </div>
               
               <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                 {activeDay === 'day1' ? (
                   <>
                     <div className="bg-paan-dark-blue text-white p-6">
                       <h4 className="text-xl font-bold">Day 1 — Building the Borderless Economy</h4>
                       <p className="text-sm opacity-90 mt-1">April 23, 2026</p>
                     </div>
                 
                 <div className="p-6 relative">
                   {/* Container for timeline items */}
                   <div className="space-y-6 relative">
                     {/* Continuous vertical line that runs through the middle of all circles */}
                     <div className="absolute left-[5px] top-[6px] bottom-[6px] w-0.5 bg-paan-red"></div>
                     {/* Timeline item 1 */}
                     <div className="flex items-center relative">
                       <div className="relative">
                         <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                         <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                       </div>
                       <div className="ml-6">
                         <div className="text-sm font-bold text-paan-blue mb-1">09:00 - 09:45</div>
                         <h5 className="text-paan-dark-blue">Opening Plenary & Keynotes</h5>
                       </div>
                     </div>
                     
                     {/* Timeline item 2 */}
                     <div className="flex items-center relative">
                       <div className="relative">
                         <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                         <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                       </div>
                       <div className="ml-6">
                         <div className="text-sm font-bold text-paan-blue mb-1">10:00 - 11:15</div>
                         <h5 className="text-paan-dark-blue"><span className="font-bold">Panels:</span> Creative IP Finance / AfCFTA Digital Trade</h5>
                       </div>
                     </div>
                     
                     {/* Timeline item 3 */}
                     <div className="flex items-center relative">
                       <div className="relative">
                         <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                         <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                       </div>
                       <div className="ml-6">
                         <div className="text-sm font-bold text-paan-blue mb-1">11:30 - 13:00</div>
                         <h5 className="text-paan-dark-blue"><span className="font-bold">Deal Rooms:</span> Creative Finance / Venture</h5>
                       </div>
                     </div>
                     
                     {/* Timeline item 4 */}
                     <div className="flex items-center relative">
                       <div className="relative">
                         <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                         <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                       </div>
                       <div className="ml-6">
                         <div className="text-sm font-bold text-paan-blue mb-1">13:00 - 14:00</div>
                         <h5 className="font-bold text-paan-dark-blue">Networking Lunch</h5>
                       </div>
                     </div>
                     
                     {/* Timeline item 5 */}
                     <div className="flex items-center relative">
                       <div className="relative">
                         <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                         <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                       </div>
                       <div className="ml-6">
                         <div className="text-sm font-bold text-paan-blue mb-1">14:00 - 15:15</div>
                         <h5 className="text-paan-dark-blue"><span className="font-bold">Clinics & Masterclass:</span> Digital Nomad Ops Clinic / Creator Monetization Masterclass</h5>
                       </div>
                     </div>
                     
                     {/* Timeline item 6 */}
                     <div className="flex items-center relative">
                       <div className="relative">
                         <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                         <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                       </div>
                       <div className="ml-6">
                         <div className="text-sm font-bold text-paan-blue mb-1">15:30 - 17:00</div>
                         <h5 className="text-paan-dark-blue"><span className="font-bold">Deal Rooms(continued):</span> Investor & Startup Matchmaking</h5>
                       </div>
                     </div>
                     
                     {/* Timeline item 7 - Last item */}
                     <div className="flex items-center relative">
                       <div className="relative">
                         <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                         <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                       </div>
                       <div className="ml-6">
                         <div className="text-sm font-bold text-paan-blue mb-1">18:30 - Late</div>
                         <h5 className="text-paan-dark-blue"><span className="font-bold">Creator Crawl:</span> Networking across Nairobi’s creative scene</h5>
                       </div>
                     </div>
                   </div>
                 </div>
                   </>
                 ) : (
                   <>
                     <div className="bg-paan-dark-blue text-white p-6">
                       <h4 className="text-xl font-bold">Day 2 — Scaling & Innovation</h4>
                       <p className="text-sm opacity-90 mt-1">April 24, 2026</p>
                     </div>
                 
                     <div className="p-6 relative">
                       {/* Container for timeline items */}
                       <div className="space-y-6 relative">
                         {/* Continuous vertical line that runs through the middle of all circles */}
                         <div className="absolute left-[5px] top-[6px] bottom-[6px] w-0.5 bg-paan-red"></div>
                         
                         {/* Timeline item 1 */}
                         <div className="flex items-center relative">
                           <div className="relative">
                             <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                             <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                           </div>
                           <div className="ml-6">
                             <div className="text-sm font-bold text-paan-blue mb-1">09:00 - 10:00</div>
                             <h5 className="text-paan-dark-blue">Opening Keynote: Future of African Tech</h5>
                           </div>
                         </div>
                         
                         {/* Timeline item 2 */}
                         <div className="flex items-center relative">
                           <div className="relative">
                             <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                             <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                           </div>
                           <div className="ml-6">
                             <div className="text-sm font-bold text-paan-blue mb-1">10:15 - 11:30</div>
                             <h5 className="text-paan-dark-blue"><span className="font-bold">AI & Machine Learning</span> in Creative Industries</h5>
                           </div>
                         </div>
                         
                         {/* Timeline item 3 */}
                         <div className="flex items-center relative">
                           <div className="relative">
                             <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                             <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                           </div>
                           <div className="ml-6">
                             <div className="text-sm font-bold text-paan-blue mb-1">11:45 - 13:00</div>
                             <h5 className="text-paan-dark-blue"><span className="font-bold">Deal Rooms:</span> Tech Partnerships & Investment</h5>
                           </div>
                         </div>
                         
                         {/* Timeline item 4 */}
                         <div className="flex items-center relative">
                           <div className="relative">
                             <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                             <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                           </div>
                           <div className="ml-6">
                             <div className="text-sm font-bold text-paan-blue mb-1">13:00 - 14:00</div>
                             <h5 className="font-bold text-paan-dark-blue">Networking Lunch</h5>
                           </div>
                         </div>
                         
                         {/* Timeline item 5 */}
                         <div className="flex items-center relative">
                           <div className="relative">
                             <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                             <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                           </div>
                           <div className="ml-6">
                             <div className="text-sm font-bold text-paan-blue mb-1">14:00 - 15:30</div>
                             <h5 className="text-paan-dark-blue"><span className="font-bold">Workshops:</span> Digital Transformation</h5>
                           </div>
                         </div>
                         
                         {/* Timeline item 6 */}
                         <div className="flex items-center relative">
                           <div className="relative">
                             <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                             <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                           </div>
                           <div className="ml-6">
                             <div className="text-sm font-bold text-paan-blue mb-1">15:45 - 17:00</div>
                             <h5 className="text-paan-dark-blue">Closing Plenary & Commitments</h5>
                           </div>
                         </div>
                         
                         {/* Timeline item 7 */}
                         <div className="flex items-center relative">
                           <div className="relative">
                             <div className="w-3 h-3 bg-paan-red rounded-full shadow-lg shadow-paan-red/50 flex-shrink-0 z-10 relative"></div>
                             <div className="absolute inset-0 w-3 h-3 bg-paan-red rounded-full opacity-30 animate-ping"></div>
                           </div>
                           <div className="ml-6">
                             <div className="text-sm font-bold text-paan-blue mb-1">17:30 - Late</div>
                             <h5 className="font-bold text-paan-dark-blue">Summit Closing Reception</h5>
                           </div>
                         </div>
                       </div>
                     </div>
                   </>
                 )}
               </div>
            </div>
          </section>
        </div>

        <div className="bg-white relative mt-10 py-20" isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
              <div className="text-left mb-12 space-y-4">
               <h2 className="text-xs w-fit text-paan-dark-blue mb-4 bg-paan-blue text-white rounded-full px-4 py-2">Why Attend</h2>
               <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Do business, not just talk.</h3>
               <p className="text-xl font-normal text-paan-dark-blue mb-4">Walk away with meaningful connections, matched partners, and real deals.</p>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
                  <div className="p-6 pt-8 text-left">
                    <div className="flex justify-start mb-6">
                      <Image
                        src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/030-idea%201.svg"
                        alt="Who Should Attend"
                        width={80}
                        height={80}
                        className="w-20 h-20"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Do Business, Not Just Talk</h4>
                    <p className="text-white mb-8">Investor connections, signed NDAs, and draft term sheets.</p>
                  </div>
                  <div className="w-full h-[20px] sm:h-[30px] md:h-[40px]">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/PAAN/footer-pattern.svg"
                      width={400}
                      height={40}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
                  <div className="p-6 pt-8 text-left">
                    <div className="flex justify-start mb-6">
                      <Image
                        src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/007-puzzle%201.svg"
                        alt="Who Should Attend"
                        width={80}
                        height={80}
                        className="w-20 h-20"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Cross-Border Enablement</h4>
                    <p className="text-white mb-8">How AfCFTA, PAPSS, and digital rails help you scale across Africa.</p>
                  </div>
                  <div className="w-full h-[20px] sm:h-[30px] md:h-[40px]">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/PAAN/footer-pattern.svg"
                      width={400}
                      height={40}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
                  <div className="p-6 pt-8 text-left">
                    <div className="flex justify-start mb-6">
                      <Image
                        src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/040-user%201.svg"
                        alt="Who Should Attend"
                        width={80}
                        height={80}
                        className="w-20 h-20"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Hands-On Clinics</h4>
                    <p className="text-white mb-8">Solve payments, IP rights, residency, and AI tooling with experts at your side.</p>
                  </div>
                  <div className="w-full h-[20px] sm:h-[30px] md:h-[40px]">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/PAAN/footer-pattern.svg"
                      width={400}
                      height={40}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
             </div>
          </section>
        </div>

        {/* Stats Section */}
        <div className="bg-paan-red relative py-20" id="stats-section" isFixed={isFixed}>
          {/* Background clip art */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/clip-art.svg" 
              alt="Background clip art" 
              className="w-full h-full object-cover"
            />
          </div>
          <section className="relative mx-auto max-w-6xl flex items-center justify-center min-h-[400px]">
            <div className="text-center grid grid-cols-1 lg:grid-cols-4 gap-8">
             <div className="text-white">
               <div className="p-6 pt-8 text-center">
                 <h4 className="text-5xl font-bold mb-2 text-white">{counts.investorMeetings}+</h4>
                 <p className="text-white mb-8 text-xl">Curated 1:1 investor meetings</p>
               </div>
             </div>
             <div className="text-white">
               <div className="p-6 pt-8 text-center">
                 <h4 className="text-5xl font-bold mb-2 text-white">{counts.ndasSigned}+</h4>
                 <p className="text-white mb-8 text-xl">NDAs signed during Deal Rooms</p>
               </div>
             </div>
             <div className="text-white">
               <div className="p-6 pt-8 text-center">
                 <h4 className="text-5xl font-bold mb-2 text-white">${counts.termSheets}M+</h4>
                 <p className="text-white mb-8 text-xl">In term sheets & MoUs within 90 days</p>
               </div>
             </div>
             <div className="text-white">
               <div className="p-6 pt-8 text-center">
                 <div className="flex justify-center mb-2">
                   <Icon icon="mdi:user-group" className="text-white" width="72" height="72" />
                 </div>
                 <p className="text-white mb-8 text-xl">Dozens of freelancers & creators onboarded to cross-border systems</p>
               </div>
             </div>
            </div>
          </section>
        </div>
        
         {/* speakers section */}
         <div className="bg-white relative py-20" id="speakers-section" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <h2 className="text-sm w-fit text-paan-dark-blue mb-4 bg-paan-blue text-white rounded-full px-4 py-1">Our Speakers</h2>
                 <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Meet the speakers</h3>
                 <p className="text-xl font-normal text-paan-dark-blue mb-4">Africa's top creators, innovators, and enablers.</p>
               </div>
               {/* Navigation arrows */}
               <div className="flex gap-2">
                 <button 
                   onClick={prevSpeakers}
                   className="w-12 h-12 border border-paan-dark-blue text-paan-dark-blue rounded-full flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors duration-300 shadow-lg"
                   disabled={currentSpeakerIndex === 0}
                 >
                   <Icon icon="mdi:chevron-left" width="24" height="24" />
                 </button>
                 <button 
                   onClick={nextSpeakers}
                   className="w-12 h-12 border border-paan-dark-blue text-paan-dark-blue rounded-full flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors duration-300 shadow-lg"
                   disabled={currentSpeakerIndex + visibleSpeakers >= speakers.length}
                 >
                   <Icon icon="mdi:chevron-right" width="24" height="24" />
                 </button>
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {getVisibleSpeakers().map((speaker) => (
                 <div key={speaker.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-96">
                   <Image
                     src={speaker.image}
                     alt={speaker.name}
                     width={400}
                     height={500}
                     className="w-full h-full object-cover"
                   />
                   {/* White overlay on hover */}
                   <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="text-center p-6">
                       <h4 className="text-2xl font-bold text-paan-dark-blue mb-2">{speaker.name}</h4>
                       <p className="text-paan-dark-blue mb-4">{speaker.title}</p>
                       <div className="flex justify-center">
                         <a 
                           href={speaker.linkedin} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="hover:scale-110 transition-transform duration-200"
                         >
                           <Icon icon="mdi:linkedin" className="text-paan-dark-blue" width="32" height="32" />
                         </a>
                       </div>
                     </div>
                   </div>
                   {/* Speaker info at bottom */}
                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                     <div className="flex justify-between items-center">
                       <div>
                         <h4 className="text-xl font-bold text-white mb-1">{speaker.name}</h4>
                         <p className="text-white/90 text-sm">{speaker.title}</p>
                       </div>
                       <div className="flex-shrink-0">
                         <a 
                           href={speaker.linkedin} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="hover:scale-110 transition-transform duration-200"
                         >
                           <Icon icon="mdi:linkedin" className="text-white" width="24" height="24" />
                         </a>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
              <div className="flex justify-start gap-2 mt-8">
                <button 
                  onClick={() => window.location.href = '#speakers-section'} 
                  className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
                >
                  View All Speakers
                </button>
                <button 
                  onClick={() => window.location.href = '#speakers-section'} 
                  className="bg-transparent border border-paan-dark-blue text-paan-dark-blue px-8 py-3 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
                >
                  Apply to Speak
                </button>
              </div>
          </section>
        </div>

           {/* Marquee Section */}
         <div className="bg-[#DAECF3] relative py-20" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl">
             <div className="flex justify-center mb-12">
               <h2 className="text-sm w-fit border border-paan-dark-blue text-paan-dark-blue mb-4 bg-paan-blue rounded-full px-4 py-1">Who's in the room</h2>
             </div>
             
             {/* First Marquee - Right Direction */}
             <div className="w-full overflow-hidden whitespace-nowrap py-5 bg-white/20 rounded-lg mb-4">
               <div className="inline-flex animate-marquee-right">
                 <div className="flex space-x-8 whitespace-nowrap">
                   {[...Array(4)].map((_, i) => (
                     <div key={`right-${i}`} className="flex items-center space-x-8">
                       <span className="text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Music Producers</span>
                       <span className="text-3xl text-paan-red">•</span>
                       <span className="text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Fashion Designers</span>
                       <span className="text-3xl text-paan-blue">•</span>
                       <span className="text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Gaming Studions</span>
                       <span className="text-3xl text-paan-dark-blue">•</span>
                       <span className="text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">SaaS Founders</span>
                       <span className="text-3xl text-paan-yellow">•</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>

             {/* Second Marquee - Left Direction */}
             <div className="w-full overflow-hidden whitespace-nowrap py-5 bg-white/20 rounded-lg">
               <div className="inline-flex animate-marquee-left">
                 <div className="flex space-x-8 whitespace-nowrap">
                   {[...Array(4)].map((_, i) => (
                     <div key={`left-${i}`} className="flex items-center space-x-8">
                       <span className="text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Film Directors</span>
                       <span className="text-3xl text-paan-red">•</span>
                       <span className="text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Brand Strategists</span>
                       <span className="text-3xl text-paan-blue">•</span>
                       <span className="text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">UX/UI Designers</span>
                       <span className="text-3xl text-paan-maroon">•</span>
                       <span className="text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Marketing Leaders</span>
                       <span className="text-3xl text-paan-yellow">•</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </section>
         </div>

         {/* Session section */}
         <div className="bg-paan-dark-blue relative py-20" id="sessions-section" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <h2 className="text-sm w-fit text-white border border-white mb-4 bg-transparent text-white rounded-full px-4 py-1">Special Features</h2>
                 <h3 className="text-3xl text-white font-bold uppercase">Beyond the sessions</h3>
                 <p className="text-xl font-normal text-white mb-4">Experience Nairobi and make connections that last.</p>
               </div>
               {/* Navigation arrows */}
               <div className="flex gap-2">
                 <button 
                   onClick={prevSessions}
                   className="w-12 h-12 border border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-paan-dark-blue transition-colors duration-300 shadow-lg"
                   disabled={currentSessionIndex === 0}
                 >
                   <Icon icon="mdi:chevron-left" width="24" height="24" />
                 </button>
                 <button 
                   onClick={nextSessions}
                   className="w-12 h-12 border border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-paan-dark-blue transition-colors duration-300 shadow-lg"
                   disabled={currentSessionIndex + visibleSessions >= sessions.length}
                 >
                   <Icon icon="mdi:chevron-right" width="24" height="24" />
                 </button>
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {getVisibleSessions().map((session) => (
                 <div key={session.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-96">
                   <Image
                     src={session.image}
                     alt={session.title}
                     width={400}
                     height={500}
                     className="w-full h-full object-cover"
                   />
                   {/* Dark overlay for content visibility */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                   
                   {/* Session info at bottom */}
                   <div className="absolute bottom-0 left-0 right-0 p-6">
                     <div className="space-y-3">
                       <div>
                         <h4 className="text-xl font-bold text-white mb-2">{session.title}</h4>
                         <p className="text-white/90 text-sm leading-relaxed">{session.description}</p>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="inline-block bg-paan-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                           {session.category}
                         </span>
                     </div>
                   </div>
                       </div>
                       </div>
               ))}
                     </div>
          </section>
        </div>

         {/* PAAN AWARDS SECTION */}
         <div className="bg-[#DAECF3] relative py-20" id="paan-awards-section" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl">
             <div className="text-left mb-12">
               <h2 className="text-sm w-fit text-white mb-4 bg-paan-blue text-white rounded-full px-4 py-1">Awards</h2>        
               <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Pan-African Creative Awards</h3>
               <p className="text-xl font-normal text-paan-dark-blue mb-8">Celebrating Africa's boldest agencies and creators.</p>
              </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
               {/* Award Card 1 */}
               <div className="bg-paan-dark-blue w-80 h-80 rounded-full shadow-xl overflow-hidden relative flex items-center justify-center">
                 {/* Ring image inside the circle with padding */}
                 <div className="absolute inset-4 flex items-center justify-center">
                   <img 
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/awards-ring.svg?updatedAt=1757757368902" 
                     alt="Awards Ring" 
                     className="w-full h-full object-contain"
                   />
                 </div>
                 
                 <div className="text-center relative z-10 max-w-48">
                   <h4 className="text-lg font-bold text-white mb-3">Pan African<br/>Agency of the Year</h4>
                   <p className="text-white font-light text-xs leading-relaxed">Honoring the agency pushing creative boundaries across markets.</p>
                 </div>
               </div>

               {/* Award Card 2 */}
               <div className="bg-paan-dark-blue w-80 h-80 rounded-full shadow-xl overflow-hidden relative flex items-center justify-center">
                 {/* Ring image inside the circle with padding */}
                 <div className="absolute inset-4 flex items-center justify-center">
                   <img 
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/awards-ring.svg?updatedAt=1757757368902" 
                     alt="Awards Ring" 
                     className="w-full h-full object-contain"
                   />
                 </div>
                 
                 <div className="text-center relative z-10 max-w-48">
                   <h4 className="text-lg font-bold text-white mb-3">Creative<br/>Innovation Award</h4>
                   <p className="text-white font-light text-xs leading-relaxed">Recognizing breakthrough creative solutions and innovative approaches.</p>
                 </div>
               </div>

               {/* Award Card 3 */}
               <div className="bg-paan-dark-blue w-80 h-80 rounded-full shadow-xl overflow-hidden relative flex items-center justify-center">
                 {/* Ring image inside the circle with padding */}
                 <div className="absolute inset-4 flex items-center justify-center">
                   <img 
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/awards-ring.svg?updatedAt=1757757368902" 
                     alt="Awards Ring" 
                     className="w-full h-full object-contain"
                   />
                 </div>
                 
                 <div className="text-center relative z-10 max-w-48">
                   <h4 className="text-lg font-bold text-white mb-3">Digital Excellence<br/>Award</h4>
                   <p className="text-white font-light text-xs leading-relaxed">Celebrating outstanding digital campaigns and tech integration.</p>
                 </div>
               </div>
             </div>
             <div className="flex justify-center gap-2 mt-12">
                <button 
                  onClick={() => window.location.href = '#paan-awards-section'} 
                  className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
                >
                  Explore All Categories
                </button>
                       </div>
          </section>
                     </div>

         {/* Parallax Section */}
         <div className="relative py-20 overflow-hidden h-[500px]" id="parallax-section" isFixed={isFixed}>
           {/* Parallax Background Image */}
           <div 
             className="absolute inset-0 bg-cover bg-center bg-fixed"
             style={{
               backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/exhibitor.png')",
               filter: "brightness(0.8)"
             }}
           />
           
           {/* Dark overlay for better text readability */}
           <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
           
           <section className="relative mx-auto max-w-6xl">
             <div className="w-3/4">
               <div className="flex flex-col justify-start mb-12">
                 <h2 className="text-sm w-fit text-white border border-white mb-4 bg-transparent text-white rounded-full px-4 py-1">Exhibition Opportunities</h2>
                 <h3 className="text-3xl text-white font-bold uppercase">Showcase your brand at Africa's Borderless Creative Economy Summit.</h3>
                 <p className="text-xl font-normal text-white mb-4">Join leading agencies, startups, and creative innovators in the Exhibition Zone. Share your work, connect with investors and partners, and stand out at Africa's most influential creative economy gathering.</p>
                   </div>
               <div className="flex justify-start">
                 <button 
                   onClick={() => window.location.href = '#parallax-section'} 
                   className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
                 >
                   Apply to Exhibit
                 </button>
                 </div>
             </div>
           </section>
         </div>

          {/* Tickets Section */}
          <div className="bg-white relative py-20" id="tickets-section" isFixed={isFixed}>
            <section className="relative mx-auto max-w-6xl">
              <div className="flex flex-col text-center mb-12">
                <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Secure Your Spot</h3>
                <p className="text-xl font-normal text-paan-dark-blue mb-8">Join leading agencies, startups, and creative innovators in the Exhibition Zone. Share your work, connect with investors and partners, and stand out at Africa's most influential creative economy gathering.</p>
              </div>
              
              {/* Ticket Badge */}
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/ticket.svg" 
                    alt="PAAN Summit Ticket" 
                    className="w-full h-auto"
                  />
                  
                  {/* Content overlay on ticket */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-paan-dark-blue w-full flex items-center">
                      {/* Left part */}
                        <div className="flex-1 text-left pl-8 text-white">
                          <h4 className="text-3xl font-bold mb-3">PAAN SUMMIT 2026</h4>
                          <p className="text-6xl font-semibold mb-6">Ticket Options</p>
                          <div className="flex gap-4 mb-6">
                            <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-4 py-3 w-40">
                              <h4 className="text-sm font-light">Members: </h4>
                              <p className="text-3xl font-bold">$100</p>
                            </div>
                            <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-4 py-3 w-40">
                              <h4 className="text-sm font-light">Non-Members: </h4>
                              <p className="text-3xl font-bold">$150</p>
                            </div>
                          </div>
                          <ul className="text-sm font-light space-y-2">
                            <li className="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                              </svg>
                              Access to all sessions & workshops.
                            </li>
                            <li className="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                              </svg>
                              Deal Rooms priority (Business/Investor pass).
                            </li> 
                            <li className="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                              </svg>
                              Networking events, including Creator Crawl
                            </li>
                            <li className="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                              </svg>
                              Select recordings post‑event
                            </li>
                          </ul>
                        </div>
                      
                      {/* White vertical dotted line at center */}
                      <div className="mx-6 self-center" style={{
                        width: '2px',
                        height: '500px',
                        background: 'repeating-linear-gradient(to bottom, white 0px, white 4px, transparent 4px, transparent 8px)'
                      }}></div>
                      
                      {/* Right part */}
                      <div className="flex-1 text-left text-white space-y-3 text-sm pl-8">
                        <p className="font-semibold text-lg">Admit One</p>
                        <p className="font-bold text-3xl">PAAN Summit 2026</p>
                        <p className="font-semibold text-lg">Seat . TBA</p>

                        <div className="flex flex-col gap-3 mt-6">
                          <button className="bg-paan-yellow text-paan-dark-blue px-3 py-2 rounded-full hover:bg-paan-yellow/90 transition-all duration-300 font-medium text-sm shadow-lg flex items-center justify-center w-fit">April 23-24, 2026</button>
                          <button className="bg-transparent border border-white text-white px-3 py-2 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-sm shadow-lg flex items-center justify-center w-fit">Nairobi, Kenya</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Registration Button */}
              <div className="flex justify-center">
                <button 
                  onClick={() => window.location.href = '#tickets-section'} 
                  className="bg-paan-red text-white px-12 py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-lg shadow-lg flex items-center gap-3"
                >
                  <Icon icon="mdi:ticket" width="24" height="24" />
                  Register Now
                </button>
             </div>
          </section>
        </div>

         {/* Our Partners */}
         <div className="bg-[#D1D3D4] relative py-20">
           <section className="relative mx-auto max-w-6xl">
             <div className="flex flex-col text-center mb-12 space-y-4">
               <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Our Partners</h3>
               <p className="text-xl font-normal text-paan-dark-blue mb-8">Join leading agencies, startups, and creative innovators in the Exhibition Zone. Share your work, connect with investors and partners, and stand out at Africa's most influential creative economy gathering.</p>
             </div>
             
             {/* Sliding Partners Logos */}
             <div className="w-full overflow-hidden whitespace-nowrap py-5">
               <div className="inline-flex animate-marquee-right">
                 <div className="flex space-x-8 whitespace-nowrap">
                   {[...Array(3)].map((_, i) => (
                     <div key={`partners-${i}`} className="flex items-center space-x-8">
                       <div className="bg-white w-32 h-32 rounded-lg shadow-xl overflow-hidden relative flex items-center justify-center flex-shrink-0">
                         <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/partner-1.svg" alt="Partner 1" className="w-full h-full object-contain" />
                       </div>
                       <div className="bg-white w-32 h-32 rounded-lg shadow-xl overflow-hidden relative flex items-center justify-center flex-shrink-0">
                         <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/partner-2.svg" alt="Partner 2" className="w-full h-full object-contain" />
                       </div>
                       <div className="bg-white w-32 h-32 rounded-lg shadow-xl overflow-hidden relative flex items-center justify-center flex-shrink-0">
                         <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/partner-3.svg" alt="Partner 3" className="w-full h-full object-contain" />
                       </div>
                       <div className="bg-white w-32 h-32 rounded-lg shadow-xl overflow-hidden relative flex items-center justify-center flex-shrink-0">
                         <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/partner-4.svg" alt="Partner 4" className="w-full h-full object-contain" />
                       </div>
                       <div className="bg-white w-32 h-32 rounded-lg shadow-xl overflow-hidden relative flex items-center justify-center flex-shrink-0">
                         <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/partner-5.svg" alt="Partner 5" className="w-full h-full object-contain" />
                       </div>
                       <div className="bg-white w-32 h-32 rounded-lg shadow-xl overflow-hidden relative flex items-center justify-center flex-shrink-0">
                         <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/partner-6.svg" alt="Partner 6" className="w-full h-full object-contain" />
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </section>
         </div>

         {/* Plan Your Trip */}
         <div className="bg-white relative py-20" id="plan-your-trip">
           <section className="relative mx-auto max-w-6xl">
             <div className="text-left mb-12">
               <h3 className="text-sm w-fit text-white font-light bg-paan-blue rounded-full px-4 py-2 mb-4">Plan Your Trip</h3>
               <h2 className="text-3xl text-paan-dark-blue font-bold uppercase mb-4">Plan Your Trip</h2>
               <p className="text-xl font-normal text-paan-dark-blue">Smooth logistics, unforgettable Nairobi experience.</p>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
               {/* Venue Information Card */}
               <div className="bg-gradient-to-br from-[#DAECF4] to-[#F3F9FB] rounded-xl p-6 shadow-lg">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="bg-paan-red rounded-full p-2">
                     <Icon icon="mdi:map-marker" className="text-white" width="24" height="24" />
                   </div>
                   <h3 className="text-xl font-bold text-paan-dark-blue">Venue Information</h3>
                 </div>
                 <p className="text-paan-dark-blue mb-6 leading-relaxed">
                   Final venue details will be announced soon. Expect world‑class facilities, breakout rooms for deal‑making, and easy access to Nairobi's creative hubs.
                 </p>
                 
                 <div className="space-y-4">
                   <div className="bg-white rounded-lg p-4 shadow-md">
                     <div className="flex items-center gap-3 mb-2">
                       <Icon icon="mdi:map-marker" className="text-paan-red" width="20" height="20" />
                       <h4 className="font-semibold text-paan-dark-blue">Sarit Centre, Nairobi</h4>
                     </div>
                     <a 
                       href="https://www.google.com/maps/dir/?api=1&destination=Sarit+Centre+Nairobi" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-paan-blue hover:text-paan-red transition-colors text-sm"
                     >
                       View Directions →
                     </a>
                   </div>
                   
                   <div className="bg-white rounded-lg p-4 shadow-md">
                     <div className="flex items-center gap-3 mb-2">
                       <Icon icon="mdi:calendar" className="text-paan-red" width="20" height="20" />
                       <h4 className="font-semibold text-paan-dark-blue">Event Dates</h4>
                     </div>
                     <p className="text-paan-dark-blue">April 23-24, 2026</p>
                   </div>
                 </div>
               </div>

               {/* Travel Support Card */}
               <div className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF4] rounded-xl p-6 shadow-lg">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="bg-paan-blue rounded-full p-2">
                     <Icon icon="mdi:help-circle" className="text-white" width="24" height="24" />
                   </div>
                   <h3 className="text-xl font-bold text-paan-dark-blue">Travel Support</h3>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="bg-white rounded-lg p-4 shadow-md">
                     <h4 className="font-semibold text-paan-dark-blue mb-2">Need Assistance?</h4>
                     <p className="text-paan-dark-blue text-sm mb-3">
                       Our travel team is here to help with logistics, accommodation, and any questions you might have.
                     </p>
                     <a 
                       href="mailto:travel@paan.africa" 
                       className="text-paan-blue hover:text-paan-red transition-colors font-medium"
                     >
                       travel@paan.africa
                     </a>
                   </div>
                   
                   <button className="w-full bg-paan-dark-blue text-white px-6 py-3 rounded-lg hover:bg-paan-red transition-all duration-300 font-medium shadow-lg flex items-center justify-center gap-2">
                     <Icon icon="mdi:book-open" width="20" height="20" />
                     Open Travel Guide
                   </button>
                 </div>
               </div>
             </div>
                 
             {/* Accordion */}
             <div className="w-full">
               <h3 className="text-2xl font-bold text-paan-dark-blue mb-6">Frequently Asked Questions</h3>
               <Accordion 
                     items={[
                       {
                         title: "Who Should Attend?",
                         content: "Creators, freelancers, agencies, tech founders, investors, and policy makers."
                       },
                       {
                         title: "Accommodation",
                         content: "We've secured special rates at partner hotels near the venue. Options range from luxury hotels to budget-friendly accommodations. All partner hotels offer complimentary airport transfers and are within walking distance of the summit venue."
                       },
                       {
                         title: "Visa Requirements",
                         content: "Most African citizens can enter Kenya visa-free or with visa-on-arrival. International visitors should check visa requirements based on their nationality. We can provide invitation letters to support visa applications if needed."
                       },
                       {
                         title: "Transportation",
                         content: "Nairobi has a reliable network of taxis, ride-sharing services, and public transport. We'll provide detailed transportation guides and can arrange group transfers from the airport to the venue for registered attendees."
                       },
                       {
                         title: "Safety & Security",
                         content: "Nairobi is generally safe for visitors, especially in the central business district where our venue is located. We work with local security partners to ensure a safe environment. Basic safety precautions are recommended as in any major city."
                       }
                     ]}
                   />
             </div>
           </section>
         </div>
         <div className="bg-paan-dark-blue relative">
           <div className="w-full h-[20px] sm:h-[30px] md:h-[40px] relative">
              <Image
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-pattern.svg"
                fill
                alt=""
               className="object-cover w-full h-full"
                loading="lazy"
                sizes="100vw"
              />
            </div>
         </div>
        <SummitFooter />
        <ScrollToTop />
      </main>
    </>
  );
};

const Hero = ({ sectionRefs, handleScroll, isFixed, timeLeft }) => {

  return (
    <>
      <div
        className="absolute top-0 left-0 h-screen w-full" 
        id="home"
        ref={sectionRefs.home}
      >
        {/* Full background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932')",
            filter: "brightness(0.5)" // Darkening the image
          }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-end pb-48">
          <div className="mx-auto max-w-6xl w-full">
            <div className="max-w-2xl">
            <p className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit border border-white">Africa Borderless Creative Economy Summit 2026</p>
              <h1 className="text-3xl md:text-3xl font-semibold uppercase text-yellow-400 mb-8">
                Create. Connect. Commercialize.
              </h1>
              <div className="flex md:flex-row flex-col gap-4 mb-10">
                <SeminarLocationAndDate />
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={() => window.location.href = '#tickets'} 
                  className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2 mx-auto"
                >
                  Register Now
                </button>
                <button 
                  onClick={() => window.location.href = '#tickets'} 
                  className="bg-transparent border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2 mx-auto"
                >
                  Partner With Us
                </button>
                <button 
                  onClick={() => window.location.href = '#tickets'} 
                  className="bg-transparent border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2 mx-auto"
                >
                  View Agenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

const SeminarLocationAndDate = ()=> {
    
  return (
    <div className="flex md:flex-row flex-col gap-4">
      <div className="flex items-center gap-2 text-white text-sm whitespace-nowrap">
        <Icon icon="mdi:map-marker" className="text-red-500" width="24" height="24" />
        <span>Sarit Centre, Nairobi, Kenya - <strong>23–24 April 2026</strong></span>
      </div>
      
      <div className="flex items-center gap-2 text-white text-sm whitespace-nowrap">
        <Icon icon="mdi:user-group" className="text-red-500" width="24" height="24" />
        <span>300+ In Person</span>
      </div>
      <div className="flex items-center gap-2 text-white text-sm whitespace-nowrap">
        <Icon icon="mdi:globe" className="text-red-500" width="24" height="24" />
        <span>1,000+ Streaming</span>
      </div>
    </div>
  );
}

export default SummitPage;