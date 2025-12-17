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
import TracksSection from "@/components/summit/TracksSection";

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
    program: useRef(null),
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

  // Set target date to February 21, 2026 for Early Bird deadline
  useEffect(() => {
    const targetDate = new Date('2026-02-21T23:59:59+03:00'); // February 21, 2026 at 11:59 PM EAT
    
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
        <TracksSection 
          sectionRefs={sectionRefs} 
          handleScroll={handleScroll} 
          isFixed={isFixed} 
        />

        {/* Summit Agenda Section */}
        <SummitAgenda sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} id="agenda" />

        {/* Who to Join Section */}
        <div className="bg-white py-12 sm:py-16 md:py-20" id="participants">
          <section className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-normal text-paan-dark-blue mb-3 sm:mb-4">Who Should Join</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">Connect with diverse professionals shaping Africa's creative economy</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {/* Creative Industry Leaders */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_4578507.webp" alt="Creative Industry Leaders" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Creative Industry Leaders</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Artists, directors, producers, and creative visionaries driving innovation across Africa's entertainment and media landscape.</p>
                </div>
              </div>

              {/* Tech & Platform Innovators */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_4657328.webp" alt="Tech & Platform Innovators" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Tech & Platform Innovators</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Technology entrepreneurs, platform builders, and digital innovators creating the infrastructure for creative commerce.</p>
                </div>
              </div>

              {/* Policy makers & trade stakeholders */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_8206224.webp" alt="Policy Makers & Trade Stakeholders" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Policy Makers & Trade Stakeholders</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Government officials, trade representatives, and policy experts shaping regulatory frameworks for creative industries.</p>
                </div>
              </div>

              {/* Agencies */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_9453411.webp" alt="Agencies & Service Providers" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Agencies & Service Providers</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Marketing, creative, advertising, IT, and tech agencies providing specialized services to creative businesses.</p>
                </div>
              </div>

              {/* Freelancers */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_2408265.webp" alt="Freelancers" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Freelancers</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Independent creative professionals, digital nomads, and gig economy participants building scalable creative careers.</p>
                </div>
              </div>

              {/* Investors & Financial Institutions */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_9601394.webp" alt="Investors & Financial Institutions" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Investors & Financial Institutions</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">VCs, angel investors, banks, and fintech companies providing capital and financial services to creative ventures.</p>
                </div>
              </div>

              {/* Marketing & creative teams */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_596092.webp" alt="Marketing & Creative Teams" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Marketing & Creative Teams</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">In-house marketing departments and creative teams from brands and corporations seeking innovative partnerships.</p>
                </div>
              </div>

              {/* Hubs & Ecosystem Builders */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_957980.webp" alt="Hubs & Ecosystem Builders" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Hubs & Ecosystem Builders</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Innovation hubs, incubators, accelerators, and community builders fostering creative entrepreneurship across Africa.</p>
                </div>
              </div>

              {/* Academia & research */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_19025369.webp" alt="Academia & Research" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Academia & Research</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Researchers, academics, and educational institutions studying and teaching creative economy, digital transformation, and innovation.</p>
                </div>
              </div>

              {/* Corporate & Brand Partners */}
              <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
                {/* Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '200px 200px'
                  }}
                ></div>
                {/* Content */}
                <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_951681.webp" alt="Corporate & Brand Partners" width={48} height={48} className="w-full h-full" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Corporate & Brand Partners</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Large corporations, multinational brands, and enterprise clients seeking to engage with Africa's creative talent and markets.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Do business */}
        <div className="bg-white relative mt-10 py-12 sm:py-16 md:py-20" isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-left mb-8 sm:mb-10 md:mb-12 space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-paan-dark-blue font-normal">Do business, not just talk.</h2>
              <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-4">Walk away with meaningful connections, matched partners, and real deals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
              <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-paan-blue to-paan-blue/60 rounded-xl z-0"></div>
                <div className="p-5 sm:p-6 pt-6 sm:pt-8 text-left relative z-10">
                  <div className="flex justify-start mb-4 sm:mb-6">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/030-idea%201.svg"
                      alt="Who Should Attend"
                      width={80}
                      height={80}
                      className="w-16 h-16 sm:w-20 sm:h-20"
                    />
                  </div>
                  <h4 className="text-lg sm:text-xl font-normal text-white mb-2">Do Business, Not Just Talk</h4>
                  <p className="text-white text-sm sm:text-base mb-6 sm:mb-8">Investor connections, signed NDAs, and draft term sheets.</p>
                </div>
              </div>
              <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-paan-yellow to-paan-yellow/60 rounded-xl z-0"></div>
                <div className="p-5 sm:p-6 pt-6 sm:pt-8 text-left relative z-10">
                  <div className="flex justify-start mb-4 sm:mb-6">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/007-puzzle%201.svg"
                      alt="Who Should Attend"
                      width={80}
                      height={80}
                      className="w-16 h-16 sm:w-20 sm:h-20"
                    />
                  </div>
                  <h4 className="text-lg sm:text-xl font-normal text-white mb-2">Cross-Border Enablement</h4>
                  <p className="text-white text-sm sm:text-base mb-6 sm:mb-8">How AfCFTA, PAPSS, and digital rails help you scale across Africa.</p>
                </div>
              </div>
              <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-paan-red to-paan-red/60 rounded-xl z-0"></div>
                <div className="p-5 sm:p-6 pt-6 sm:pt-8 text-left relative z-10">
                  <div className="flex justify-start mb-4 sm:mb-6">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/040-user%201.svg"
                      alt="Who Should Attend"
                      width={80}
                      height={80}
                      className="w-16 h-16 sm:w-20 sm:h-20"
                    />
                  </div>
                  <h4 className="text-lg sm:text-xl font-normal text-white mb-2">Hands-On Clinics</h4>
                  <p className="text-white text-sm sm:text-base mb-6 sm:mb-8">Solve payments, IP rights, residency, and AI tooling with experts at your side.</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 sm:mt-10 relative rounded-xl overflow-hidden p-6 sm:p-8 md:p-12">
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 rounded-xl z-0"
                style={{
                  background: 'linear-gradient(to bottom right, #172840, #F25849)'
                }}
              ></div>
              {/* Pattern Background */}
              <div 
                className="absolute inset-0 opacity-50 z-[1]"
                style={{
                  backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/stats-pattern.webp')",
                  backgroundRepeat: 'repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '100% 100%'
                }}
              ></div>
              {/* Content */}
              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center items-center">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">150+</h2>
                      <p className="text-white text-xs sm:text-sm md:text-base leading-tight">Curated 1:1 investor meetings</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center items-center">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">50+</h2>
                      <p className="text-white text-xs sm:text-sm md:text-base leading-tight">NDAs signed during Deal Rooms</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center items-center">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">$10M+</h2>
                      <p className="text-white text-xs sm:text-sm md:text-base leading-tight">In term sheets & MoUs within 90 days</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center items-center">
                      <Icon icon="mdi:user-group" className="text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[72px] lg:h-[72px]" />
                      <p className="text-white text-xs sm:text-sm md:text-base leading-tight">Dozens of freelancers & creators onboarded to cross-border systems</p>
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
                 <h3 className="text-3xl sm:text-4xl text-paan-dark-blue font-normal">Meet the speakers</h3>
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
               {getVisibleSpeakers().map((speaker, index) => {
                 // Cycle through PAAN colors: yellow, red, blue, dark-blue
                 const colors = ['#F2B706', '#F25849', '#84C1D9', '#172840']; // paan-yellow, paan-red, paan-blue, paan-dark-blue
                 const hoverColor = colors[index % 4];
                 
                 return (
                   <div key={speaker.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-80 sm:h-96">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                     {/* Speaker info at bottom with PAAN colors overlay on hover */}
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent group-hover:bg-gradient-to-t group-hover:from-black/0 group-hover:to-transparent transition-all duration-300 p-4 sm:p-6">
                       {/* PAAN color overlay with fade to top on hover */}
                       <div 
                         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{ 
                           background: `linear-gradient(to top, ${hoverColor} 0%, ${hoverColor} 40%, rgba(0,0,0,0) 100%)`
                         }}
                       ></div>
                       <div className="relative z-10 flex justify-between items-center">
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
                 );
               })}
             </div>
              <div className="flex justify-center sm:justify-start gap-2 mt-6 sm:mt-8">
                <button 
                  onClick={() => window.location.href = '/summit/speaker-application'} 
                  className="bg-gradient-to-r from-paan-yellow to-paan-blue border border-transparent text-white px-6 sm:px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
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
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Film Director</span>
                       <span className="text-2xl sm:text-3xl text-paan-red">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Music Producers</span>
                       <span className="text-2xl sm:text-3xl text-paan-blue">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Fashion Designers</span>
                       <span className="text-2xl sm:text-3xl text-paan-dark-blue">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Gaming Studios</span>
                       <span className="text-2xl sm:text-3xl text-paan-yellow">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">SaaS Founders</span>
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
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Producers</span>
                       <span className="text-2xl sm:text-3xl text-paan-red">•</span>
                       <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Fashion Designers</span>
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
         <div className="relative py-12 sm:py-16 md:py-20 overflow-hidden" id="sessions-section" isFixed={isFixed}>
           {/* Gradient Background */}
           <div 
             className="absolute inset-0 z-0"
             style={{
               background: 'linear-gradient(to bottom right, #172840, #F25849)'
             }}
           ></div>
           {/* Pattern Background */}
           <div 
             className="absolute inset-0 z-[1]"
             style={{
               backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/beyond-session-pattern.webp?updatedAt=1765954397048')",
               backgroundRepeat: 'repeat',
               backgroundPosition: 'center',
               backgroundSize: 'cover',
               opacity: 0.3
             }}
           ></div>
           <section className="relative mx-auto max-w-6xl px-4 sm:px-6 z-10">
             <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:mb-8 gap-4">
               <div>                 
                 <h3 className="text-3xl sm:text-4xl text-white font-normal">Beyond the sessions</h3>
                 <p className="text-base sm:text-lg md:text-xl font-normal text-white mb-4">Experience Nairobi and make connections that last.</p>
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               {sessions.slice(0, 3).map((session) => (
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
                   <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 group-hover:bg-white transition-all duration-300 rounded-t-xl flex flex-col">
                     <div className="flex-1"></div>
                     <div>
                       <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-paan-dark-blue transition-colors duration-300">{session.title}</h4>
                       <p className="hidden group-hover:block transition-all duration-300 text-paan-dark-blue text-xs sm:text-sm leading-relaxed mt-2">{session.description}</p>
                     </div>
                   </div>
                       </div>
               ))}
                     </div>
          </section>
        </div>

         {/* PAAN AWARDS SECTION */}
         <div className="bg-[#DAECF3] relative py-10 sm:py-16 md:py-20 px-4 sm:px-6" id="paan-awards-section" isFixed={isFixed}>
           <section className="relative mx-auto max-w-6xl">
             <div className="text-center mb-8 sm:mb-12">     
               <h3 className="text-2xl sm:text-3xl md:text-4xl text-paan-dark-blue">Pan-African Creative Awards</h3>
               <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-6 sm:mb-8 mt-2">Celebrating Africa's boldest agencies and creators.</p>
              </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center md:justify-items-left">
               {/* Award Card 1 */}
              <div className="w-full max-w-80 h-64 sm:h-72 md:h-80 rounded-md shadow-xl overflow-hidden relative flex flex-col items-left justify-center p-4 sm:p-6" style={{background: 'linear-gradient(to bottom right, #172840, #84C1D9)'}}>
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/paan-award-pattern.svg')",
                    backgroundSize: '40%',
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat',
                    marginRight: '30px'
                  }}
                />
                <div className="relative z-10 flex flex-col items-left">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/new-paan-award.svg" 
                    alt="PAAN Award" 
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 sm:mb-4 flex-shrink-0"
                  />
                  <div className="flex flex-col text-left">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Creative Innovation Award</h4>
                    <p className="text-white font-light text-xs leading-relaxed">Recognizing breakthrough creative solutions and innovative approaches.</p>
                  </div>
                </div>
               </div>

               {/* Award Card 2 */}
              <div className="w-full max-w-80 h-64 sm:h-72 md:h-80 rounded-md shadow-xl overflow-hidden relative flex flex-col items-left justify-center p-4 sm:p-6" style={{background: 'linear-gradient(to bottom right, #172840, #84C1D9)'}}>
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/paan-award-pattern.svg')",
                    backgroundSize: '40%',
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat',
                    marginRight: '30px'
                  }}
                />
                <div className="relative z-10 flex flex-col items-left">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/new-paan-award.svg" 
                    alt="PAAN Award" 
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 sm:mb-4 flex-shrink-0"
                  />
                  <div className="flex flex-col text-left">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Pan African Agency of the Year</h4>
                    <p className="text-white font-light text-xs leading-relaxed">Honoring the agency pushing creative boundaries across markets.</p>
                  </div>
                </div>
               </div>

               {/* Award Card 3 */}
              <div className="w-full max-w-80 h-64 sm:h-72 md:h-80 rounded-md shadow-xl overflow-hidden relative flex flex-col items-left justify-center p-4 sm:p-6" style={{background: 'linear-gradient(to bottom right, #172840, #84C1D9)'}}>
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/paan-award-pattern.svg')",
                    backgroundSize: '40%',
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat',
                    marginRight: '30px'
                  }}
                />
                <div className="relative z-10 flex flex-col items-left">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/new-paan-award.svg" 
                    alt="PAAN Award" 
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 sm:mb-4 flex-shrink-0"
                  />
                  <div className="flex flex-col text-left">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Digital Excellence Award</h4>
                    <p className="text-white font-light text-xs leading-relaxed">Celebrating outstanding digital campaigns and tech integration.</p>
               </div>
             </div>
              </div>
             </div>
             <div className="flex justify-center gap-2 mt-8 sm:mt-12">
                <button 
                  onClick={() => window.location.href = '/paan-awards'} 
                  className="bg-paan-red text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center gap-2"
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
            
            {/* Paan-yellow gradient overlay from right to left */}
            <div className="absolute inset-0 bg-gradient-to-l from-paan-yellow/30 to-transparent"></div>
            
            <section className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 h-full flex items-center">
              <div className="w-full">
                <div className="flex flex-col justify-center items-center text-center sm:text-left sm:items-start space-y-4 sm:space-y-6 md:space-y-8">
                  
                  {/* Main Heading */}
                  <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white font-normal leading-tight max-w-3xl">
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
                <h3 className="text-xl sm:text-3xl md:text-4xl text-paan-dark-blue font-bold">Secure Your Spot</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-paan-dark-blue mb-4 sm:mb-6 md:mb-8 leading-relaxed">Deal rooms, clinics, awards. Register now.</p>
              </div>
              
              {/* Ticket Card */}
              <div className="bg-[#F3F9FB] rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Left part */}
                  <div className="flex-1 text-paan-dark-blue">
                    <div className="p-4 sm:p-5 md:p-6" style={{background: 'linear-gradient(to bottom, #CA983C, #F9EC97, #CA983C)'}}>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-paan-dark-blue">PAAN SUMMIT 2026</h2>
                      <p className="text-base text-paan-dark-blue/90">Africa Borderless Creative Economy Summit</p>
                      </div>
                      
                    {/* Location and Date */}
                    <div className="bg-[#F3F9FB] p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 border-b-2 border-paan-dark-blue ml-4 sm:ml-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Icon icon="mdi:calendar" className="text-paan-red w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        <span className="text-sm sm:text-base font-normal text-paan-dark-blue">April 21-22, 2026</span>
                              </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Icon icon="mdi:map-marker" className="text-paan-red w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        <span className="text-sm sm:text-base font-normal text-paan-dark-blue">Sarit Centre, Nairobi, Kenya</span>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8 text-paan-dark-blue/90 ml-4">
                      <ul className="space-y-3 sm:space-y-4">
                        <li className="flex items-start gap-3">
                          <Icon icon="mdi:check-circle" className="text-paan-dark-blue w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base md:text-lg">Actionable sessions & workshops</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon icon="mdi:check-circle" className="text-paan-dark-blue w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base md:text-lg">Investor & partnership deal rooms</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon icon="mdi:check-circle" className="text-paan-dark-blue w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base md:text-lg">High-level networking experiences</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon icon="mdi:check-circle" className="text-paan-dark-blue w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base md:text-lg">Creator Crawl & cultural immersions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-[#F25849] to-[#172840] p-4 sm:p-6">
                      <p className="text-xs text-white/80 italic">This preview shows standard event access. Final benefits vary by pass type.</p>
                      </div>
                    </div>

                  {/* Right Part */}
                  <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/20" style={{background: 'linear-gradient(to bottom, #CA983C, #F9EC97, #CA983C)'}}>
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-paan-dark-blue mb-2 sm:mb-3">Summit Access Pass</h3>
                      <p className="text-sm sm:text-base text-paan-dark-blue/80">Seat: To be Assigned</p>
                    </div>

                    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs mb-6 sm:mb-8">
                    <button 
                      onClick={() => window.location.href = '/summit/purchase-ticket'}
                        className="bg-paan-dark-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-paan-dark-blue/90 transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg shadow-lg flex items-center justify-center gap-2"
                    >
                      <Icon icon="mdi:ticket" width="20" height="20" />
                        View Tickets
                      </button>
                      <button 
                        onClick={() => window.location.href = '/summit/purchase-ticket'}
                        className="bg-transparent border-2 border-paan-dark-blue text-paan-dark-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2"
                      >
                        Learn More
                    </button>
              </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm md:text-base text-paan-dark-blue/90 font-medium">Early Bird • General • VIP • Virtual +More</p>
                            </div>
                            </div>
                            </div>
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