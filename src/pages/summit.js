import SEO from "@/components/SEO";
import Header from "../layouts/summit-header";
import Image from "next/image";
import SummitAgenda from "@/components/SummitAgenda";
import { Icon } from "@iconify/react";
import SummitFooter from "@/layouts/summit-footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";
import Accordion from "@/components/Accordion";
import PartnerWithUsModal from "@/components/PartnerWithUsModal";
import ExhibitionApplicationModal from "@/components/ExhibitionApplicationModal";
import PaystackScript from "@/components/PaystackScript";
import { motion } from "framer-motion";
import { generateEventSchema } from '@/utils/structuredData';
import CountdownBanner from "@/components/summit/CountdownBanner";
import ObjectivesSection from "@/components/summit/ObjectivesSection";
import AtAGlanceSection from "@/components/summit/AtAGlanceSection";

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
    objectives: useRef(null),
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
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showExhibitionModal, setShowExhibitionModal] = useState(false);
  
  // Video state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  
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
      name: "Anna Ceesay",
      title: "Founder & CEO, Fabella, The Gambia",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/Anna.png",
      linkedin: "https://www.linkedin.com/in/annaceesay/?originalSubdomain=gm"
    },
    {
      id: 2,
      name: "Yannick Lefang",
      title: "CEO & Founder - Kasi Insight, Africa",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/Yannick.jpeg",
      linkedin: "https://www.linkedin.com/in/yannicklefang?originalSubdomain=ca"
    },
    {
      id: 3,
      name: "Dr. Gillian Hammah",
      title: "CMO Aya Data. Ghana",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/Hammar.jpeg",
      linkedin: "https://www.linkedin.com/in/gillian-hammah?originalSubdomain=gh"
    },
    {
      id: 4,
      name: "Craig Rodney",
      title: "Founder, The Agency Coach, South Africa",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/Craig.jpeg",
      linkedin: "https://www.linkedin.com/in/craigrodney/?originalSubdomain=za"
    },
    {
      id: 5,
      name: "Clive Mishon",
      title: "Founder, Alliance of Independent Agencies. UK",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/clive.jpeg",
      linkedin: "https://www.linkedin.com/in/clive-mishon-33b5318?originalSubdomain=uk"
    },
    {
      id: 6,
      name: "Magdalene Kariuki",
      title: "Associate director, Africa Practice. Kenya",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/Magdalene.jpeg",
      linkedin: "https://www.linkedin.com/in/magdalene-kariuki-mppa"
    },
    {
      id: 7,
      name: "Victor Simba",
      title: "International Development, PWC. Kenya",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/Victor.jpeg",
      linkedin: "https://www.linkedin.com/in/victor-simba-06502123a?originalSubdomain=ke"
    },
    {
      id: 8,
      name: "Musa Kalenga",
      title: "CEO, Brave Group, South Africa",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/speakers/musa.webp",
      linkedin: "https://www.linkedin.com/in/musa-kalenga-31b10523/?originalSubdomain=za"
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

  // Countdown timer state and logic for summit
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Early Bird countdown timer state
  const [earlyBirdTimeLeft, setEarlyBirdTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date to April 21, 2026
  useEffect(() => {
    const targetDate = new Date('2026-04-21T00:00:00+03:00'); // April 21, 2026 at midnight EAT
    
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

  // Set target date to January 25, 2026 for Early Bird deadline
  useEffect(() => {
    const targetDate = new Date('2026-01-25T23:59:59+03:00'); // January 25, 2026 at 11:59 PM EAT
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        setEarlyBirdTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setEarlyBirdTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Video play/pause toggle
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
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
        title="PAAN Summit 2026 | Africa's Premier Creative & Tech Leadership Conference"
        description="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth. Connect with industry leaders, explore cutting-edge trends, and shape the future of African creativity and technology."
        keywords="PAAN Summit 2026, African creative summit, tech conference Africa, Nairobi summit, Pan-African events, African innovation, creative tech Africa, agency summit Africa, creative leadership, tech leadership, African business summit, innovation conference"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932"
        ogTitle="PAAN Summit 2026 | Africa's Premier Creative & Tech Leadership Conference"
        ogDescription="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth."
        twitterTitle="PAAN Summit 2026 | Africa's Premier Creative & Tech Leadership Conference"
        twitterDescription="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth."
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateEventSchema({
                name: "PAAN Summit 2026 - Africa's Premier Creative & Tech Leadership Conference",
                alternateName: "PAAN Inaugural Summit 2026",
                description: "Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth. Connect with industry leaders, explore cutting-edge trends, and shape the future of African creativity and technology.",
                startDate: "2026-04-21T09:00:00+03:00",
                endDate: "2026-04-23T17:00:00+03:00",
                eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                location: {
                  name: "Sarit Centre",
                  streetAddress: "Sarit Centre, Westlands",
                  city: "Nairobi",
                  region: "Nairobi County",
                  postalCode: "00100",
                  country: "KE",
                  geo: {
                    latitude: "-1.2921",
                    longitude: "36.8219"
                  }
                },
                images: [
                  "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932",
                  "https://paan.africa/assets/images/hero.webp"
                ],
                offers: {
                  url: "https://paan.africa/summit/purchase-ticket",
                  price: "65",
                  currency: "USD",
                  availability: "https://schema.org/InStock",
                  validFrom: "2025-09-01T00:00:00+03:00",
                  description: "Early bird pricing for PAAN Summit 2026"
                },
                performer: {
                  name: "PAAN Africa",
                  url: "https://paan.africa"
                },
                organizer: {
                  name: "Pan-African Agency Network (PAAN)",
                  url: "https://paan.africa",
                  logo: "https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296"
                },
                audience: {
                  audienceType: "Creative and tech professionals, agency leaders, entrepreneurs, innovators"
                },
                keywords: "PAAN Summit 2026, African creative summit, tech conference Africa, Nairobi summit, Pan-African events, African innovation, creative tech Africa, agency summit Africa"
              })
            ),
          }}
        />
      </Head>

      <main className="relative">
        <Header navLinkColor='text-white' />

        {/* Hero section */}
        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} timeLeft={timeLeft} onPartnerClick={() => setShowPartnerModal(true)} />
        
        {/* Countdown Banner - positioned absolutely at the edge between hero and about sections */}
        <div className="absolute top-[100vh] left-0 right-0 z-10 pointer-events-none transform -translate-y-1/2">
          <div className="pointer-events-auto">
            <CountdownBanner timeLeft={timeLeft} />
          </div>
        </div>
        
        {/* About summit section */}
        <section className="relative overflow-hidden z-5 w-full" id="about-us" ref={sectionRefs.about} handleScroll={handleScroll} isFixed={isFixed}>
          {/* Pattern overlay */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/about-summit-pattern.webp')",
              backgroundRepeat: 'repeat',
              backgroundPosition: 'center',
              backgroundSize: '60%',
              backgroundBlendMode: 'overlay',
              opacity: 0.7
            }}
          ></div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-paan-dark-blue to-paan-blue/80 z-0"></div>
        <section className="relative mx-auto max-w-6xl z-10 px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 py-12 sm:py-16 md:py-28 items-center">
            <motion.div 
              className="flex flex-col gap-4 sm:gap-6 relative z-10 md:pr-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="flex flex-col gap-3 sm:gap-4"
                variants={fadeInLeft}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-normal">About the Summit</h2>
                <h3 className="text-lg sm:text-xl md:text-2xl text-white font-normal">A deal-first gathering built for action.</h3>
              </motion.div>
              
              <motion.div 
                className="space-y-3 sm:space-y-4 text-white text-sm sm:text-base md:text-lg leading-relaxed"
                variants={fadeInLeft}
              >
                <p>
                The Africa Borderless Creative Economy Summit 2026 brings together the continent’s most forward-thinking agencies, brands, freelancers, marketing teams, and technology partners to reimagine how Africa’s creative industry can scale - together.
                </p>
                <p>
                Over two days of keynotes, data-led panels, strategy labs, awards, showcases, and partnership deal rooms, the summit will unpack how innovation, technology, collaboration, and talent mobility can turn Africa’s creativity into a multi-billion-dollar borderless economy.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4 relative z-20"
                variants={scaleIn}
              >
                <button 
                  onClick={() => window.location.href = '/summit/purchase-ticket'}
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-gradient-to-r from-paan-yellow to-paan-blue text-white hover:opacity-90 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-20 w-full sm:w-auto"
                >
                  Register Now
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex justify-center lg:justify-end"
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative overflow-hidden w-full max-w-md lg:max-w-none rounded-lg">
                <video
                  ref={videoRef}
                  className="h-48 sm:h-64 md:h-80 lg:h-96 w-full object-cover rounded-lg"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  loop
                  muted
                >
                  <source src="" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Play/Pause Button */}
                {!isVideoPlaying && (
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 rounded-lg group"
                    aria-label="Play video"
                  >
                    <div className="bg-white/90 hover:bg-white rounded-full p-4 sm:p-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon icon="mdi:play" className="text-paan-dark-blue ml-1" width="32" height="32" />
                    </div>
                  </button>
                )}
                {isVideoPlaying && (
                  <button
                    onClick={toggleVideo}
                    className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-3 shadow-lg transition-all duration-300 group"
                    aria-label="Pause video"
                  >
                    <Icon icon="mdi:pause" className="text-white" width="24" height="24" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>
        <Image
            src="/assets/images/bg-pattern.svg"
            width={0}
            height={0}
            alt="Background Pattern"
            className="absolute bottom-0 left-0 w-full h-1/3 object-cover z-0 opacity-10 pointer-events-none"
          />
        </section>

        {/* Summit Objectives */}
        <ObjectivesSection 
          sectionRef={sectionRefs.objectives} 
          handleScroll={handleScroll} 
          isFixed={isFixed} 
        />

        {/* At a glance section */}
        <AtAGlanceSection onPartnerClick={() => setShowPartnerModal(true)} />
      
      
        {/* Program Section */}
        <div className="bg-paan-dark-blue relative" id="program" sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed}>
            <section className="mx-auto max-w-6xl py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
                <div className="text-left">
                    <h2 className="text-xs sm:text-sm border w-fit border-white text-white rounded-full px-3 sm:px-4 py-1 sm:py-2 text-center mb-2 sm:mb-3">Summit Tracks</h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-paan-yellow">Tracks</h3>
                </div>
                <div className="mt-2 sm:mt-0">
                  <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">Tracks and the two-day<br className="hidden sm:block"/> agenda snapshot.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                 <div className="group relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96">
                   <Image
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/tracks/1.png"
                     alt="Track 1"
                     fill
                     className="object-contain object-center -mt-20"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
                     <h4 className="text-base sm:text-lg md:text-xl font-bold text-paan-dark-blue mb-1 sm:mb-2">AI, Technology &<br/>The Future of Creative Work</h4>
                     <p className="text-paan-dark-blue text-sm sm:text-base">Operationalize AI across creative, media, and ops for real ROI.</p>
                     <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">AI Workflows</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Governance</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Productivity</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Tech</small>
                        </div>
                     </div>
                   </div>
                 </div>
                 <div className="group relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96">
                   <Image
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/tracks/2.png"
                     alt="Track 2"
                     fill
                     className="object-contain object-center -mt-20"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
                     <h4 className="text-base sm:text-lg md:text-xl font-bold text-paan-dark-blue mb-1 sm:mb-2">Creative Effectiveness,<br/>Design & Media Performance</h4>
                     <p className="text-paan-dark-blue text-sm sm:text-base">Turn bold ideas into measurable Business outcomes across channels.</p>
                     <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Design Thinking</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Brand Lift</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Story telling</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Attention Metrics</small>
                        </div>
                     </div>
                   </div>
                 </div>
                 <div className="group relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96">
                   <Image
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/tracks/3.png"
                     alt="Track 3"
                     fill
                     className="object-contain object-center -mt-20"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
                     <h4 className="text-base sm:text-lg md:text-xl font-bold text-paan-dark-blue mb-1 sm:mb-2">Data, Analytics &<br/>Measurement for Growth</h4>
                     <p className="text-paan-dark-blue text-sm sm:text-base">Build accountable growth with clean data and clear attribution.</p>
                     <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Cookieless attribution</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Audience Insights</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">collaboration</small>
                        </div>
                     </div>
                   </div>
                 </div>
                 <div className="group relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96">
                   <Image
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/tracks/4.png"
                     alt="Track 4"
                     fill
                     className="object-contain object-center -mt-20"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
                     <h4 className="text-base sm:text-lg md:text-xl font-bold text-paan-dark-blue mb-1 sm:mb-2">The Creator &<br/>Freelance Economy</h4>
                     <p className="text-paan-dark-blue text-sm sm:text-base">Power sustainable independent careers and creator-led studios.</p>
                     <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Pricing & IP</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Business Ops Martech</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">agency-freelancer</small>
                        </div>
                     </div>
                   </div>
                 </div>
                 <div className="group relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96">
                   <Image
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/tracks/5.png"
                     alt="Track 5"
                     fill
                     className="object-contain object-center -mt-20"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
                     <h4 className="text-base sm:text-lg md:text-xl font-bold text-paan-dark-blue mb-1 sm:mb-2">Communication, PR &<br/>Brand Trust</h4>
                     <p className="text-paan-dark-blue text-sm sm:text-base">Build credible brands in an era of activism and misinformation.</p>
                     <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Crisis Comms</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Media trust</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Reputation ESG Storytelling</small>
                        </div>
                     </div>
                   </div>
                 </div>
                 <div className="group relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96">
                   <Image
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/tracks/6.png"
                     alt="Track 6"
                     fill
                     className="object-contain object-center -mt-20"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
                     <h4 className="text-base sm:text-lg md:text-xl font-bold text-paan-dark-blue mb-1 sm:mb-2">Commerce, Platforms &<br/>Marketing Business</h4>
                     <p className="text-paan-dark-blue text-sm sm:text-base">Where retail media, social commerce and fintech converge.</p>
                     <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Retail media</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Chat commerce</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">D2C growth</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Conversion tech</small>
                        </div>
                     </div>
                   </div>
                 </div>
                 <div className="group relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96 sm:col-span-2 lg:col-span-1">
                   <Image
                     src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/tracks/7.png"
                     alt="Track 7"
                     fill
                     className="object-contain object-center -mt-20"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
                     <h4 className="text-base sm:text-lg md:text-l font-bold text-paan-dark-blue mb-1 sm:mb-2">Cross-Border Collaboration &<br/>Ecosystem Growth</h4>
                     <p className="text-paan-dark-blue text-sm sm:text-base">Partner across markets to scale Africa's creative economy.</p>
                     <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Multi Market Ops</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">ip & Billing Martech</small>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                              <small className="text-xs text-paan-dark-blue">Talent Mobility</small>
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
            </section>
        </div>

        {/* Summit Agenda Section */}
        <SummitAgenda sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} id="agenda" />

        {/* Who to Join Section */}
        <div className="bg-white py-12 sm:py-16 md:py-20" id="participants">
          <section className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-paan-dark-blue mb-3 sm:mb-4">Who Should Join</h2>
              <p className="text-base sm:text-lg text-gray-600">Connect with diverse professionals shaping Africa's creative economy</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Creative Industry Leaders */}
              <div className="group bg-gradient-to-br from-paan-blue/5 to-paan-red/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10">
                <div className="w-12 h-12 bg-paan-blue rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Creative Industry Leaders</h3>
                <p className="text-gray-600 text-sm">Artists, directors, producers, and creative visionaries driving innovation across Africa's entertainment and media landscape.</p>
              </div>

              {/* Tech & Platform Innovators */}
              <div className="group bg-gradient-to-br from-paan-red/5 to-paan-blue/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-red/10">
                <div className="w-12 h-12 bg-paan-red rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Tech & Platform Innovators</h3>
                <p className="text-gray-600 text-sm">Technology entrepreneurs, platform builders, and digital innovators creating the infrastructure for creative commerce.</p>
              </div>

              {/* Policy makers & trade stakeholders */}
              <div className="group bg-gradient-to-br from-paan-blue/5 to-paan-red/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10">
                <div className="w-12 h-12 bg-paan-blue rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Policy Makers & Trade Stakeholders</h3>
                <p className="text-gray-600 text-sm">Government officials, trade representatives, and policy experts shaping regulatory frameworks for creative industries.</p>
              </div>

              {/* Agencies */}
              <div className="group bg-gradient-to-br from-paan-red/5 to-paan-blue/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-red/10">
                <div className="w-12 h-12 bg-paan-red rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Agencies & Service Providers</h3>
                <p className="text-gray-600 text-sm">Marketing, creative, advertising, IT, and tech agencies providing specialized services to creative businesses.</p>
              </div>

              {/* Freelancers */}
              <div className="group bg-gradient-to-br from-paan-blue/5 to-paan-red/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10">
                <div className="w-12 h-12 bg-paan-blue rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Freelancers</h3>
                <p className="text-gray-600 text-sm">Independent creative professionals, digital nomads, and gig economy participants building scalable creative careers.</p>
              </div>

              {/* Investors & Financial Institutions */}
              <div className="group bg-gradient-to-br from-paan-red/5 to-paan-blue/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-red/10">
                <div className="w-12 h-12 bg-paan-red rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Investors & Financial Institutions</h3>
                <p className="text-gray-600 text-sm">VCs, angel investors, banks, and fintech companies providing capital and financial services to creative ventures.</p>
              </div>

              {/* Marketing & creative teams */}
              <div className="group bg-gradient-to-br from-paan-blue/5 to-paan-red/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10">
                <div className="w-12 h-12 bg-paan-blue rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v12a2 2 0 002 2h6a2 2 0 002-2V8M7 8H5a2 2 0 00-2 2v8a2 2 0 002 2h2m0-12h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Marketing & Creative Teams</h3>
                <p className="text-gray-600 text-sm">In-house marketing departments and creative teams from brands and corporations seeking innovative partnerships.</p>
              </div>

              {/* Hubs & Ecosystem Builders */}
              <div className="group bg-gradient-to-br from-paan-red/5 to-paan-blue/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-red/10">
                <div className="w-12 h-12 bg-paan-red rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Hubs & Ecosystem Builders</h3>
                <p className="text-gray-600 text-sm">Innovation hubs, incubators, accelerators, and community builders fostering creative entrepreneurship across Africa.</p>
              </div>

              {/* Academia & research */}
              <div className="group bg-gradient-to-br from-paan-blue/5 to-paan-red/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10">
                <div className="w-12 h-12 bg-paan-blue rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Academia & Research</h3>
                <p className="text-gray-600 text-sm">Researchers, academics, and educational institutions studying and teaching creative economy, digital transformation, and innovation.</p>
              </div>

              {/* Corporate & Brand Partners */}
              <div className="group bg-gradient-to-br from-paan-red/5 to-paan-blue/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-red/10">
                <div className="w-12 h-12 bg-paan-red rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V2a2 2 0 00-2-2H6a2 2 0 00-2 2v4h16z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-paan-dark-blue mb-2">Corporate & Brand Partners</h3>
                <p className="text-gray-600 text-sm">Large corporations, multinational brands, and enterprise clients seeking to engage with Africa's creative talent and markets.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-white relative mt-10 py-20" isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
              <div className="text-left mb-12 space-y-4">
               <h2 className="text-xs w-fit text-paan-dark-blue mb-4 bg-paan-blue text-white rounded-full px-4 py-2">Why Attend</h2>
               <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Crossborder  Connections</h3>
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
                    <h4 className="text-xl font-bold text-white mb-2">Connect with continental leaders</h4>
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
         <div className="bg-white relative py-12 sm:py-16 md:py-20" id="speakers-section" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
             <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
               <div>
                 <h2 className="text-xs sm:text-sm w-fit text-paan-dark-blue mb-3 sm:mb-4 bg-paan-blue text-white rounded-full px-3 sm:px-4 py-1">Our Speakers</h2>
                 <h3 className="text-2xl sm:text-3xl text-paan-dark-blue font-bold uppercase">Meet the speakers</h3>
                 <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-4">Africa's top creators, innovators, and enablers.</p>
               </div>
               {/* Navigation arrows */}
               <div className="flex gap-2 self-end">
                 <button 
                   onClick={prevSpeakers}
                   className="w-10 h-10 sm:w-12 sm:h-12 border border-paan-dark-blue text-paan-dark-blue rounded-full flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors duration-300 shadow-lg"
                   disabled={currentSpeakerIndex === 0}
                 >
                   <Icon icon="mdi:chevron-left" width="20" height="20" />
                 </button>
                 <button 
                   onClick={nextSpeakers}
                   className="w-10 h-10 sm:w-12 sm:h-12 border border-paan-dark-blue text-paan-dark-blue rounded-full flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors duration-300 shadow-lg"
                   disabled={currentSpeakerIndex + visibleSpeakers >= speakers.length}
                 >
                   <Icon icon="mdi:chevron-right" width="20" height="20" />
                 </button>
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               {getVisibleSpeakers().map((speaker) => (
                 <div key={speaker.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-80 sm:h-96">
                   <Image
                     src={speaker.image}
                     alt={speaker.name}
                     width={400}
                     height={500}
                     className="w-full h-full object-cover"
                   />
                   {/* White overlay on hover */}
                   <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="text-center p-4 sm:p-6">
                       <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-paan-dark-blue mb-2">{speaker.name}</h4>
                       <p className="text-paan-dark-blue mb-4 text-sm sm:text-base">{speaker.title}</p>
                       <div className="flex justify-center">
                         <a 
                           href={speaker.linkedin} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="hover:scale-110 transition-transform duration-200"
                         >
                           <Icon icon="mdi:linkedin" className="text-paan-dark-blue" width="28" height="28" />
                         </a>
                       </div>
                     </div>
                   </div>
                   {/* Speaker info at bottom */}
                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                     <div className="flex justify-between items-center">
                       <div>
                         <h4 className="text-lg sm:text-xl font-bold text-white mb-1">{speaker.name}</h4>
                         <p className="text-white/90 text-xs sm:text-sm">{speaker.title}</p>
                       </div>
                       <div className="flex-shrink-0">
                         <a 
                           href={speaker.linkedin} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="hover:scale-110 transition-transform duration-200"
                         >
                           <Icon icon="mdi:linkedin" className="text-white" width="20" height="20" />
                         </a>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
              <div className="flex justify-center sm:justify-start gap-2 mt-6 sm:mt-8">
                <button 
                  onClick={() => window.location.href = '/summit/speaker-application'} 
                  className="bg-transparent border border-paan-dark-blue text-paan-dark-blue px-6 sm:px-8 py-3 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Apply to Speak
                </button>
              </div>
          </section>
        </div>

           {/* Marquee Section */}
         <div className="bg-[#DAECF3] relative py-12 sm:py-16 md:py-20" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
             <div className="flex justify-center mb-8 sm:mb-12">
               <h2 className="text-xs sm:text-sm w-fit border border-paan-dark-blue text-paan-dark-blue mb-4 bg-paan-blue rounded-full px-3 sm:px-4 py-1">Who's in the room</h2>
             </div>
             
             {/* First Marquee - Right Direction */}
             <div className="w-full overflow-hidden whitespace-nowrap py-4 sm:py-5 bg-white/20 rounded-lg mb-3 sm:mb-4">
               <div className="inline-flex animate-marquee-right">
                 <div className="flex space-x-4 sm:space-x-6 md:space-x-8 whitespace-nowrap">
                   {[...Array(4)].map((_, i) => (
                     <div key={`right-${i}`} className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Creative Industry Leaders</span>
                       <span className="text-2xl sm:text-3xl text-paan-red">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Tech & Platform Innovators</span>
                       <span className="text-2xl sm:text-3xl text-paan-blue">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Policy Makers</span>
                       <span className="text-2xl sm:text-3xl text-paan-dark-blue">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Investors </span>
                       <span className="text-2xl sm:text-3xl text-paan-yellow">•</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>

             {/* Second Marquee - Left Direction */}
             <div className="w-full overflow-hidden whitespace-nowrap py-4 sm:py-5 bg-white/20 rounded-lg">
               <div className="inline-flex animate-marquee-left">
                 <div className="flex space-x-4 sm:space-x-6 md:space-x-8 whitespace-nowrap">
                   {[...Array(4)].map((_, i) => (
                     <div key={`left-${i}`} className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Brand Owners</span>
                       <span className="text-2xl sm:text-3xl text-paan-red">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Brand Strategists</span>
                       <span className="text-2xl sm:text-3xl text-paan-blue">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">UX/UI Designers</span>
                       <span className="text-2xl sm:text-3xl text-paan-maroon">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Marketing Leaders</span>
                       <span className="text-2xl sm:text-3xl text-paan-yellow">•</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </section>
         </div>

         {/* Session section */}
         <div className="bg-paan-dark-blue relative py-12 sm:py-16 md:py-20" id="sessions-section" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
             <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
               <div>
                 <h2 className="text-xs sm:text-sm w-fit text-white border border-white mb-3 sm:mb-4 bg-transparent text-white rounded-full px-3 sm:px-4 py-1">Special Features</h2>
                 <h3 className="text-2xl sm:text-3xl text-white font-bold uppercase">Beyond the sessions</h3>
                 <p className="text-base sm:text-lg md:text-xl font-normal text-white mb-4">Experience Nairobi and make connections that last.</p>
               </div>
               {/* Navigation arrows */}
               <div className="flex gap-2 self-end">
                 <button 
                   onClick={prevSessions}
                   className="w-10 h-10 sm:w-12 sm:h-12 border border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-paan-dark-blue transition-colors duration-300 shadow-lg"
                   disabled={currentSessionIndex === 0}
                 >
                   <Icon icon="mdi:chevron-left" width="20" height="20" />
                 </button>
                 <button 
                   onClick={nextSessions}
                   className="w-10 h-10 sm:w-12 sm:h-12 border border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-paan-dark-blue transition-colors duration-300 shadow-lg"
                   disabled={currentSessionIndex + visibleSessions >= sessions.length}
                 >
                   <Icon icon="mdi:chevron-right" width="20" height="20" />
                 </button>
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               {getVisibleSessions().map((session) => (
                 <div key={session.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-80 sm:h-96">
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
                   <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                     <div className="space-y-2 sm:space-y-3">
                       <div>
                         <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{session.title}</h4>
                         <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{session.description}</p>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="inline-block bg-paan-blue text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
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
                  onClick={() => window.location.href = '/paan-awards'} 
                  className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
                >
                  Explore All Categories
                </button>
                       </div>
          </section>
         </div>
          {/* Parallax Section */}
          <div className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]" id="exhibition" isFixed={isFixed}>
            {/* Parallax Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center sm:bg-fixed bg-scroll"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/exhibitor.png')",
                filter: "brightness(0.8)",
                backgroundPosition: "center center"
              }}
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-paan-dark-blue/40 sm:bg-paan-dark-blue/30"></div>
            
            <section className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 h-full flex items-center">
              <div className="w-full">
                <div className="flex flex-col justify-center items-center text-center sm:text-left sm:items-start space-y-4 sm:space-y-6 md:space-y-8">
                  {/* Badge */}
                  <h2 className="text-xs sm:text-sm w-fit text-white border border-white/80 bg-transparent rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
                    Exhibition Opportunities
                  </h2>
                  
                  {/* Main Heading */}
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold uppercase leading-tight max-w-3xl">
                    Showcase your brand at Africa's Borderless Creative Economy Summit.
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg font-normal text-white/90 leading-relaxed max-w-2xl">
                    Join leading agencies, startups, and creative innovators in the Exhibition Zone. Connect with investors and partners at Africa's most influential creative economy gathering.
                  </p>
                </div>
                
                {/* CTA Button */}
                <div className="flex justify-center sm:justify-start mt-6 sm:mt-8 md:mt-10">
                  <button 
                    onClick={()=>window.location.href='/summit/exhibitors'} 
                    className="bg-paan-red hover:bg-paan-red/90 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-2 w-full max-w-xs sm:max-w-sm md:w-auto min-h-[48px] active:scale-95"
                  >
                    <span>View Exhibition Options</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Tickets Section */}
          <div className="bg-white relative py-12 sm:py-16 md:py-20" id="tickets-section" isFixed={isFixed}>
            <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
              <div className="flex flex-col text-center mb-6 sm:mb-8 md:mb-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl text-paan-dark-blue font-bold uppercase">Secure Your Spot</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-paan-dark-blue mb-4 sm:mb-6 md:mb-8 leading-relaxed">Join leading agencies, startups, and creative innovators in the Exhibition Zone. Share your work, connect with investors and partners, and stand out at Africa's most influential creative economy gathering.</p>
              </div>
              
              {/* Mobile Ticket Section */}
              <div className="block sm:hidden">
                <div className="space-y-6">
                  {/* Mobile Ticket Cards */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* Early Bird Pass */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold mb-1">Early Bird Pass</h4>
                          <p className="text-sm opacity-90">Only 100 slots available</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">$65</div>
                          <div className="text-xs opacity-75">per ticket</div>
                        </div>
                      </div>
                      
                      {/* Early Bird Countdown Timer */}
                      {earlyBirdTimeLeft.days > 0 || earlyBirdTimeLeft.hours > 0 || earlyBirdTimeLeft.minutes > 0 || earlyBirdTimeLeft.seconds > 0 ? (
                        <div className="mb-4 p-3 bg-white/20 rounded-lg">
                          <div className="text-center">
                            <p className="text-xs font-medium mb-2 opacity-90">Early Bird Offer Ends In:</p>
                            <div className="flex justify-center gap-2 text-sm">
                              <div className="bg-white/30 rounded px-2 py-1 min-w-[40px]">
                                <div className="font-bold">{earlyBirdTimeLeft.days}</div>
                                <div className="text-xs opacity-75">Days</div>
                              </div>
                              <div className="bg-white/30 rounded px-2 py-1 min-w-[40px]">
                                <div className="font-bold">{earlyBirdTimeLeft.hours}</div>
                                <div className="text-xs opacity-75">Hrs</div>
                              </div>
                              <div className="bg-white/30 rounded px-2 py-1 min-w-[40px]">
                                <div className="font-bold">{earlyBirdTimeLeft.minutes}</div>
                                <div className="text-xs opacity-75">Min</div>
                              </div>
                              <div className="bg-white/30 rounded px-2 py-1 min-w-[40px]">
                                <div className="font-bold">{earlyBirdTimeLeft.seconds}</div>
                                <div className="text-xs opacity-75">Sec</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4 p-3 bg-red-500/30 rounded-lg">
                          <p className="text-center text-sm font-medium">Early Bird Offer Has Ended</p>
                        </div>
                      )}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Full 2-day summit access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Exhibition showcase & networking lounge</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Digital speaker presentations post-event</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Save 30% before January 25th, 2026</span>
                        </div>
                      </div>
                    </div>

                    {/* General Admission */}
                    <div className="bg-gradient-to-r from-paan-red to-paan-maroon rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold mb-1">General Admission</h4>
                          <p className="text-sm opacity-90">Most Popular Standard</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">$95</div>
                          <div className="text-xs opacity-75">per ticket</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-paan-yellow" width="16" height="16" />
                          <span>Full 2-day summit access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-paan-yellow" width="16" height="16" />
                          <span>Networking app & exhibition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-paan-yellow" width="16" height="16" />
                          <span>Digital certificate of participation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-paan-yellow" width="16" height="16" />
                          <span>Access to all keynotes & panels</span>
                        </div>
                      </div>
                    </div>

                    {/* VIP Delegate Pass */}
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold mb-1">VIP Delegate Pass</h4>
                          <p className="text-sm opacity-90">Exclusive Access</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">$220</div>
                          <div className="text-xs opacity-75">per ticket</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>All Agency Growth benefits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>VIP Networking Cocktail</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Premium lounge w/ WiFi & refreshments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Reserved front-row seating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>PAAN Awards Gala</span>
                        </div>
                      </div>
                    </div>

                    {/* Student & Young Creatives */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold mb-1">Student & Young Creatives</h4>
                          <p className="text-sm opacity-90">For students and young professionals</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">$50</div>
                          <div className="text-xs opacity-75">per ticket</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Full 2 Day access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Exhibition & networking sessions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Student-only networking with recruiters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Certificate of participation</span>
                        </div>
                      </div>
                    </div>

                    {/* Virtual Access */}
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold mb-1">Virtual Access Pass</h4>
                          <p className="text-sm opacity-90">Join from anywhere</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">$15</div>
                          <div className="text-xs opacity-75">per ticket</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Live streaming of keynotes & panels</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Access to a networking platform</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>30-day access to recordings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:check" className="text-yellow-300" width="16" height="16" />
                          <span>Join from anywhere</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Benefits Overview */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-paan-dark-blue mb-6 text-center">What's Included in Your Ticket</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:calendar-check" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-paan-dark-blue">Full Summit Access</h5>
                            <p className="text-sm text-gray-600">2-day access to all keynotes, panels, and workshops</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:account-group" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-paan-dark-blue">Networking Opportunities</h5>
                            <p className="text-sm text-gray-600">Connect with industry leaders, investors, and fellow creatives</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:certificate" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-paan-dark-blue">Digital Certificate</h5>
                            <p className="text-sm text-gray-600">Certificate of participation for your professional portfolio</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:store" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-paan-dark-blue">Exhibition Access</h5>
                            <p className="text-sm text-gray-600">Explore innovative projects and connect with exhibitors</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:play-circle" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-paan-dark-blue">Post-Event Access</h5>
                            <p className="text-sm text-gray-600">Digital recordings and speaker presentations</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:coffee" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-paan-dark-blue">Refreshments</h5>
                            <p className="text-sm text-gray-600">Lunch and refreshments during the summit</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:gift" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-paan-dark-blue">Welcome Kit</h5>
                            <p className="text-sm text-gray-600">Exclusive summit materials and branded items</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:handshake" className="w-6 h-6 text-paan-red mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-paan-dark-blue">Business Opportunities</h5>
                            <p className="text-sm text-gray-600">Access to deal rooms and partnership opportunities</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Premium Benefits Note */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-paan-red/10 to-paan-maroon/10 border border-paan-red/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:crown" className="w-6 h-6 text-paan-red" />
                        <div>
                          <h5 className="font-semibold text-paan-dark-blue">Premium Ticket Benefits</h5>
                          <p className="text-sm text-gray-600">
                            VIP, Agency Growth, and International Delegate passes include additional perks like priority seating, 
                            exclusive networking events, premium lounges, and access to the PAAN Awards Gala.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-paan-dark-blue mb-4">Event Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:calendar" className="text-paan-red" width="20" height="20" />
                        <span className="text-sm font-medium">April 21-22, 2026</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:map-marker" className="text-paan-red" width="20" height="20" />
                        <span className="text-sm font-medium">Sarit Centre, Nairobi, Kenya</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:users" className="text-paan-red" width="20" height="20" />
                        <span className="text-sm font-medium">300+ In-Person Attendees</span>
                      </div>
                    </div>
                  </div>

                  {/* Registration Button */}
                  <div className="pt-4">
                    <button 
                      onClick={() => window.location.href = '/summit/purchase-ticket'}
                      className="bg-paan-red text-white w-full py-4 text-lg font-semibold rounded-full hover:bg-paan-red/90 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                      <Icon icon="mdi:ticket" width="20" height="20" />
                      Register Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Ticket Badge */}
              <div className="hidden sm:flex justify-center mb-6 sm:mb-8 md:mb-12">
                <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/ticket.svg" 
                    alt="PAAN Summit Ticket" 
                    className="w-full h-auto"
                  />
                  
                  {/* Content overlay on ticket */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="text-paan-dark-blue w-full flex flex-col sm:flex-row items-center">
                      {/* Left part */}
                        <div className="flex-1 text-left pl-2 sm:pl-4 md:pl-6 lg:pl-8 text-white mb-3 sm:mb-4 md:mb-0">
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-3">PAAN SUMMIT 2026</h4>
                          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold mb-3 sm:mb-4 md:mb-6">Ticket Options</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                            <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                              <h4 className="text-xs sm:text-sm font-light">Early Bird: </h4>
                              <p className="text-lg sm:text-xl md:text-2xl font-bold">$65</p>
                            </div>
                            <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                              <h4 className="text-xs sm:text-sm font-light">General: </h4>
                              <p className="text-lg sm:text-xl md:text-2xl font-bold">$95</p>
                            </div>
                            <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                              <h4 className="text-xs sm:text-sm font-light">VIP: </h4>
                              <p className="text-lg sm:text-xl md:text-2xl font-bold">$220</p>
                            </div>
                            <div className="flex flex-col items-left bg-white/20 border border-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3">
                              <h4 className="text-xs sm:text-sm font-light">Virtual: </h4>
                              <p className="text-lg sm:text-xl md:text-2xl font-bold">$10</p>
                            </div>
                          </div>
                          <ul className="text-xs sm:text-sm font-light space-y-1 sm:space-y-2">
                            <li className="flex items-center gap-1 sm:gap-2 md:gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0 sm:w-4 sm:h-4">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                              </svg>
                              Access to all sessions & workshops.
                            </li>
                            <li className="flex items-center gap-1 sm:gap-2 md:gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0 sm:w-4 sm:h-4">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                              </svg>
                              Deal Rooms priority (Business/Investor pass).
                            </li> 
                            <li className="flex items-center gap-1 sm:gap-2 md:gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0 sm:w-4 sm:h-4">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                              </svg>
                              Networking events, including Creator Crawl
                            </li>
                            <li className="flex items-center gap-1 sm:gap-2 md:gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0 sm:w-4 sm:h-4">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                              </svg>
                              Select recordings post‑event
                            </li>
                          </ul>
                        </div>
                      
                      {/* White vertical dotted line at center - hidden on mobile */}
                      <div className="hidden sm:block mx-2 sm:mx-4 md:mx-6 self-center" style={{
                        width: '2px',
                        height: '300px',
                        background: 'repeating-linear-gradient(to bottom, white 0px, white 4px, transparent 4px, transparent 8px)'
                      }}></div>
                      
                      {/* Right part */}
                      <div className="flex-1 text-left text-white space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm pl-2 sm:pl-4 md:pl-6 lg:pl-8">
                        <p className="font-semibold text-xs sm:text-sm md:text-lg">Admit One</p>
                        <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">PAAN Summit 2026</p>
                        <p className="font-semibold text-xs sm:text-sm md:text-lg">Seat . TBA</p>

                        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 mt-3 sm:mt-4 md:mt-6">
                          <button className="bg-paan-yellow text-paan-dark-blue px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-paan-yellow/90 transition-all duration-300 font-medium text-xs sm:text-sm shadow-lg flex items-center justify-center w-fit">April 21-22, 2026</button>
                          <button className="bg-transparent border border-white text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-xs sm:text-sm shadow-lg flex items-center justify-center w-fit">Sarit Center, Nairobi, Kenya</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop Registration Button */}
              <div className="hidden sm:flex justify-center">
                <button 
                  onClick={() => window.location.href = '/summit/purchase-ticket'}
                  className="bg-paan-red text-white px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg w-full sm:w-auto rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium shadow-lg flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:ticket" width="16" height="16" className="sm:w-5 sm:h-5" />
                  View Tickets
                </button>
             </div>
          </section>
        </div>

         {/* Our Partners */}
         <div className="bg-[#D1D3D4] relative py-12 sm:py-16 md:py-20">
           <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
             <div className="flex flex-col text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
               <h3 className="text-2xl sm:text-3xl text-paan-dark-blue font-bold uppercase">Our Partners</h3>
               <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-6 sm:mb-8">Join leading agencies, startups, and creative innovators in the Exhibition Zone. Share your work, connect with investors and partners, and stand out at Africa's most influential creative economy gathering.</p>
             </div>
             
             {/* Sliding Partners Logos */}
             <div className="w-full overflow-hidden whitespace-nowrap py-6 sm:py-8">
               <div className="inline-flex animate-marquee-right">
                 <div className="flex space-x-6 sm:space-x-8 md:space-x-10 whitespace-nowrap">
                   {[...Array(3)].map((_, i) => (
                     <div key={`partners-${i}`} className="flex items-center space-x-6 sm:space-x-8 md:space-x-10">
                       {/* AIA Logo */}
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100" style={{ backgroundColor: '#1a1a1a' }}>
                         <img src="/assets/images/partners/aia.svg" alt="AIA Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div>
                       
                       {/* IAN Logo */}
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                         <img src="/assets/images/partners/IAN.png" alt="IAN Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div>
                       
                       {/* ICCO Logo */}
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                         <img src="/assets/images/partners/ICCO.png" alt="ICCO Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div>
                       
                       {/* PRCA Logo */}
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                         <img src="/assets/images/partners/PRCA.png" alt="PRCA Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div>
                       
                       {/* Uber Logo
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                         <img src="/assets/images/partners/uber.svg" alt="Uber Logistics Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div> */}
                       
                       {/* Viamo Logo */}
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100" style={{ backgroundColor: '#1a1a1a' }}>
                         <img src="/assets/images/partners/viamo.svg" alt="Viamo Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div>
                       
                       {/* Growthpad Logo */}
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                         <img src="/assets/images/partners/gcg.png" alt="Growthpad Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div>
                       
                       {/* Penguin Agency Logo */}
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                         <img src="/assets/images/partners/penquin.png" alt="Penguin Agency Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div>
                       
                       {/* CEvent Text Logo */}
                       <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                         <img src="/assets/images/partners/cevent.png" alt="Penguin Agency Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </section>
         </div>

         {/* Plan Your Trip */}
         <div className="bg-white relative py-12 sm:py-16 md:py-20" id="plan-your-trip">
           <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
             <div className="text-left mb-8 sm:mb-12">
               <h3 className="text-xs sm:text-sm w-fit text-white font-light bg-paan-blue rounded-full px-3 sm:px-4 py-2 mb-3 sm:mb-4">Plan Your Trip</h3>
               <h2 className="text-2xl sm:text-3xl text-paan-dark-blue font-bold uppercase mb-3 sm:mb-4">Plan Your Trip</h2>
               <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue">Smooth logistics, unforgettable Nairobi experience.</p>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
               {/* Venue Information Card */}
               <div className="bg-gradient-to-br from-[#DAECF4] to-[#F3F9FB] rounded-xl p-4 sm:p-6 shadow-lg">
                 <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                   <div className="bg-paan-red rounded-full p-2">
                     <Icon icon="mdi:map-marker" className="text-white" width="20" height="20" />
                   </div>
                   <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue">Venue Information</h3>
                 </div>
                 <p className="text-paan-dark-blue mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                   Final venue details will be announced soon. Expect world‑class facilities, breakout rooms for deal‑making, and easy access to Nairobi's creative hubs.
                 </p>
                 
                 <div className="space-y-3 sm:space-y-4">
                   <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md">
                     <div className="flex items-center gap-2 sm:gap-3 mb-2">
                       <Icon icon="mdi:map-marker" className="text-paan-red" width="16" height="16" />
                       <h4 className="font-semibold text-paan-dark-blue text-sm sm:text-base">Sarit Centre, Nairobi</h4>
                     </div>
                     <a 
                       href="https://www.google.com/maps/dir/?api=1&destination=Sarit+Centre+Nairobi" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-paan-blue hover:text-paan-red transition-colors text-xs sm:text-sm"
                     >
                       View Directions →
                     </a>
                   </div>
                   
                   <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md">
                     <div className="flex items-center gap-2 sm:gap-3 mb-2">
                       <Icon icon="mdi:calendar" className="text-paan-red" width="16" height="16" />
                       <h4 className="font-semibold text-paan-dark-blue text-sm sm:text-base">Event Dates</h4>
                     </div>
                     <p className="text-paan-dark-blue text-sm sm:text-base">April 21-22, 2026</p>
                   </div>
                 </div>
               </div>

               {/* Travel Support Card */}
               <div className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF4] rounded-xl p-4 sm:p-6 shadow-lg">
                 <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                   <div className="bg-paan-blue rounded-full p-2">
                     <Icon icon="mdi:help-circle" className="text-white" width="20" height="20" />
                   </div>
                   <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue">Travel Support</h3>
                 </div>
                 
                 <div className="space-y-3 sm:space-y-4">
                   <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md">
                     <h4 className="font-semibold text-paan-dark-blue mb-2 text-sm sm:text-base">Need Assistance?</h4>
                     <p className="text-paan-dark-blue text-xs sm:text-sm mb-3">
                       Our travel team is here to help with logistics, accommodation, and any questions you might have.
                     </p>
                     <a 
                       href="mailto:secretariat@paan.africa" 
                       className="text-paan-blue hover:text-paan-red transition-colors font-medium text-xs sm:text-sm break-all"
                     >
                       secretariat@paan.africa
                     </a>
                   </div>
                   
                   <button onClick={() => window.location.href = '/summit/travel-guide'} className="w-full bg-paan-dark-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-paan-red transition-all duration-300 font-medium shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                     <Icon icon="mdi:book-open" width="16" height="16" />
                     Open Travel Guide
                   </button>
                 </div>
               </div>
             </div>
                 
             {/* Accordion */}
             <div className="w-full">
               <h3 className="text-xl sm:text-2xl font-bold text-paan-dark-blue mb-4 sm:mb-6">Frequently Asked Questions</h3>
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
                         content: "Nairobi is generally safe for visitors, especially in Westands where our venue is located. We work with local security partners to ensure a safe environment. Basic safety precautions are recommended as in any major city."
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
        
        {/* Partner With Us Modal */}
        <PartnerWithUsModal 
          isOpen={showPartnerModal} 
          onClose={() => setShowPartnerModal(false)} 
        />
        
        {/* Exhibition Application Modal */}
        <ExhibitionApplicationModal 
          isOpen={showExhibitionModal} 
          onClose={() => setShowExhibitionModal(false)} 
        />
      </main>
      
      {/* Paystack Script */}
      <PaystackScript />
    </>
  );
};

const Hero = ({ sectionRefs, handleScroll, isFixed, timeLeft, onPartnerClick }) => {

  return (
    <>
      <div
        className="relative h-screen w-full" 
        id="home"
        ref={sectionRefs.home}
      >
        {/* Full background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero-2.webp')",
            filter: "brightness(0.5)" // Darkening the image
          }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-center justify-center pt-16 sm:pt-24 md:pt-32">
          <div className="mx-auto max-w-6xl w-full px-4 sm:px-6">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl font-normal text-yellow-400 mb-6 sm:mb-8 leading-tight"
                variants={fadeInUp}
              >
                Create. Connect. Commercialize.
              </motion.h1>
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-10 justify-center"
                variants={fadeInUp}
              >
                <SeminarLocationAndDate />
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8"
                variants={scaleIn}
              >
                <button 
                  onClick={() => window.location.href = '/summit/purchase-ticket'}
                  className="bg-gradient-to-r from-paan-yellow to-paan-blue text-white px-6 sm:px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Register Now
                </button>
                <button 
                  onClick={onPartnerClick}
                  className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Partner With Us
                </button>
                <button 
                  onClick={(e) => handleScroll(e, '#program')}
                  className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  View Track
                </button>                
              </motion.div>
              
            </motion.div>
            <motion.p 
                className="text-white/80 text-xs sm:text-sm text-center mt-4 sm:mt-6"
                variants={fadeInUp}
              >
                Organized & managed by the <span className="font-bold text-paan-red"><a href="/" className="hover:text-paan-red transition-colors">Pan African Agency Network(PAAN)</a></span>
              </motion.p>
          </div>
        </div>
      </div>

    </>
  );
};

const SeminarLocationAndDate = ()=> {
    
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:map-marker" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="break-words sm:whitespace-nowrap">Sarit Centre, Nairobi, Kenya - <strong>21 - 22 April 2026</strong></span>
      </div>
      
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:user-group" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="whitespace-nowrap">500+ In Person</span>
      </div>
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:globe" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="whitespace-nowrap">2,000+ Streaming</span>
      </div>
    </div>
  );
}

export default SummitPage;