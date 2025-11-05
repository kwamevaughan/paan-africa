import SEO from "@/components/SEO";
import TravelGuideHeader from "@/layouts/travel-guide-header";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SummitFooter from "@/layouts/summit-footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../../utils/scrollUtils';
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";
import TicketPurchaseButton from "@/components/TicketPurchaseButton";
import { motion } from "framer-motion";

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

const slideInFromLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const slideInFromRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: 0.6, 
    ease: [0.68, -0.55, 0.265, 1.55],
    type: "spring",
    stiffness: 100
  }
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const Exhibitors = () => {
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
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState(null);
  
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

  // Booth data
  const boothData = {
    1: { id: 1, number: 1, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    2: { id: 2, number: 2, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    3: { id: 3, number: 3, status: 'Reserved', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    4: { id: 4, number: 4, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    5: { id: 5, number: 5, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    6: { id: 6, number: 6, status: 'Available', size: '3×6', price: 'USD 1,800', type: 'Standard' },
    7: { id: 7, number: 7, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    8: { id: 8, number: 8, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    9: { id: 9, number: 9, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    10: { id: 10, number: 10, status: 'Available', size: 'Pavilion', price: 'RFQ', type: 'Pavilion' },
    11: { id: 11, number: 11, status: 'Booked', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    12: { id: 12, number: 12, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    13: { id: 13, number: 13, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    14: { id: 14, number: 14, status: 'Available', size: '3×6', price: 'USD 1,800', type: 'Standard' },
    15: { id: 15, number: 15, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    16: { id: 16, number: 16, status: 'Booked', size: '3×6', price: 'USD 1,800', type: 'Standard' },
    17: { id: 17, number: 17, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    18: { id: 18, number: 18, status: 'Available', size: '3×6', price: 'USD 1,800', type: 'Standard' },
    19: { id: 19, number: 19, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    20: { id: 20, number: 20, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    21: { id: 21, number: 21, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    22: { id: 22, number: 22, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    23: { id: 23, number: 23, status: 'Reserved', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    24: { id: 24, number: 24, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    25: { id: 25, number: 25, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    26: { id: 26, number: 26, status: 'Booked', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    27: { id: 27, number: 27, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    28: { id: 28, number: 28, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    29: { id: 29, number: 29, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    30: { id: 30, number: 30, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    31: { id: 31, number: 31, status: 'Booked', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    32: { id: 32, number: 32, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    33: { id: 33, number: 33, status: 'Available', size: 'Pavilion', price: 'RFQ', type: 'Pavilion' },
    34: { id: 34, number: 34, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    35: { id: 35, number: 35, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    36: { id: 36, number: 36, status: 'Booked', size: '3×6', price: 'USD 1,800', type: 'Standard' },
    37: { id: 37, number: 37, status: 'Available', size: 'Pavilion', price: 'RFQ', type: 'Pavilion' },
    38: { id: 38, number: 38, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    39: { id: 39, number: 39, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' },
    40: { id: 40, number: 40, status: 'Available', size: '3×3', price: 'USD 1,000', type: 'Standard' }
  };

  // Play click sound
  const playClickSound = () => {
    try {
      // Create a simple click sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle booth click
  const handleBoothClick = (boothNumber) => {
    playClickSound();
    const booth = boothData[boothNumber];
    if (booth) {
      setSelectedBooth(booth);
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooth(null);
  };

  // Booth Button Component
  const BoothButton = ({ boothNumber, className, children }) => {
    const booth = boothData[boothNumber];
    const getButtonClass = (status) => {
      switch (status) {
        case 'Available': return 'bg-white border-2 border-gray-300 hover:bg-gray-50 hover:scale-105';
        case 'Reserved': return 'bg-paan-yellow border-2 border-paan-yellow hover:bg-paan-yellow/80 hover:scale-105';
        case 'Booked': return 'bg-paan-red border-2 border-paan-red hover:bg-paan-red/80 hover:scale-105';
        default: return 'bg-white border-2 border-gray-300 hover:bg-gray-50 hover:scale-105';
      }
    };

    return (
      <button 
        onClick={() => handleBoothClick(boothNumber)}
        className={`${getButtonClass(booth?.status)} rounded-lg p-2 transition-all duration-200 aspect-square w-full h-20 sm:h-24 ${className || ''}`}
      >
        {children}
      </button>
    );
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
        title="PAAN Summit 2026 Exhibition Floor Plan | Book Your Booth Space"
        description="Explore the PAAN Summit 2026 exhibition floor plan with live booth availability. Book standard 3×3m booths (USD 1,000), 3×6m booths (USD 1,800), or custom pavilions. Connect with 500+ industry leaders at Africa's premier creative and tech conference."
        keywords="PAAN Summit exhibition, exhibition floor plan, booth booking, PAAN Summit 2026 exhibitors, Nairobi conference exhibition, creative tech conference, African business exhibition, summit booth space, exhibition packages, PAAN Summit booths"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/exhibition.png"
        ogTitle="PAAN Summit 2026 Exhibition Floor Plan | Book Your Booth Space"
        ogDescription="Explore the PAAN Summit 2026 exhibition floor plan with live booth availability. Book standard 3×3m booths (USD 1,000), 3×6m booths (USD 1,800), or custom pavilions. Connect with 500+ industry leaders at Africa's premier creative and tech conference."
        twitterTitle="PAAN Summit 2026 Exhibition Floor Plan | Book Your Booth Space"
        twitterDescription="Explore the PAAN Summit 2026 exhibition floor plan with live booth availability. Book standard 3×3m booths (USD 1,000), 3×6m booths (USD 1,800), or custom pavilions. Connect with 500+ industry leaders at Africa's premier creative and tech conference."
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "PAAN Summit 2026 Exhibition Floor Plan | Book Your Booth Space",
              "description": "Explore the PAAN Summit 2026 exhibition floor plan with live booth availability. Book standard 3×3m booths (USD 1,000), 3×6m booths (USD 1,800), or custom pavilions. Connect with 500+ industry leaders at Africa's premier creative and tech conference.",
              "url": "https://paan.africa/summit/exhibitors",
              "image": [
                "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/exhibition.png",
                "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932"
              ],
              "mainEntity": {
              "@type": "Event",
                "name": "PAAN Summit 2026 - Africa's Premier Creative & Tech Leadership Conference",
              "startDate": "2026-10-22T09:00:00+03:00",
              "endDate": "2026-10-24T17:00:00+03:00",
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
                "organizer": { 
                  "@type": "Organization", 
                  "name": "Pan-African Agency Network (PAAN)", 
                  "url": "https://paan.africa"
                }
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://paan.africa"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Summit",
                    "item": "https://paan.africa/summit"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Exhibitors",
                    "item": "https://paan.africa/summit/exhibitors"
                  }
                ]
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "Exhibition Floor Plan",
                  "description": "Interactive floor plan showing booth availability and pricing"
                },
                {
                  "@type": "Thing", 
                  "name": "Booth Booking",
                  "description": "Standard and premium booth packages for PAAN Summit 2026"
                },
                {
                  "@type": "Thing",
                  "name": "Exhibition Packages",
                  "description": "Physical and virtual exhibition options with pricing"
                }
              ],
              "keywords": "PAAN Summit exhibition, exhibition floor plan, booth booking, PAAN Summit 2026 exhibitors, Nairobi conference exhibition, creative tech conference, African business exhibition, summit booth space, exhibition packages, PAAN Summit booths"
            }),
          }}
        />
      </Head>

       <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
         <TravelGuideHeader navLinkColor='text-white' />

        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} timeLeft={timeLeft} />

        {/* Spacer to maintain layout flow */}
        <div className="h-[75vh]"></div>


         {/* Floor plan section */}
         <motion.div 
           className="bg-[#DAECF3] relative py-12 sm:py-16 md:py-20 pt-20 sm:pt-24 md:pt-32" 
           id="visa-requirements" 
           isFixed={isFixed}
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
         >
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div 
              className="text-left mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >

            {/* Filter and Legend Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              {/* Booth Filter */}
              <div className="flex flex-wrap gap-2">
                <button className="bg-paan-blue text-white px-4 py-2 rounded-lg text-sm font-medium">
                  All Booths
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">
                  Available
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">
                  Reserved
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">
                  Booked
                </button>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border border-gray-300 rounded-full"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-paan-yellow rounded-full"></div>
                  <span>Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-paan-red rounded-full"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
            
            {/* Floor Plan Container */}
            <div className="bg-white border border-paan-dark-blue rounded-lg p-6 relative">
              {/* Exit Indicator - Top Middle */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-paan-red text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <Icon icon="mdi:exit-run" className="w-4 h-4" />
                EXIT
              </div>
              
              {/* Entrance Indicator - Bottom Middle */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-paan-blue text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <Icon icon="mdi:login" className="w-4 h-4" />
                ENTRANCE
              </div>
              
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Left Section - Standard Booths */}
                <div>
                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                          {/* Booth 1 */}
                        <button 
                          onClick={() => handleBoothClick(1)}
                          className="bg-white border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors aspect-square w-full h-20 sm:h-24"
                        >
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 1</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </button>
                        
                        {/* Booth 2 */}
                        <button 
                          onClick={() => handleBoothClick(2)}
                          className="bg-white border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors aspect-square w-full h-20 sm:h-24"
                        >
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 2</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </button>
                        
                        {/* Booth 3 */}
                        <button 
                          onClick={() => handleBoothClick(3)}
                          className="bg-paan-yellow border-2 border-paan-yellow rounded-lg p-2 hover:bg-paan-yellow/80 transition-colors aspect-square w-full h-20 sm:h-24"
                        >
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 3</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </button>
                        
                        {/* Booth 4 */}
                        <button 
                          onClick={() => handleBoothClick(4)}
                          className="bg-white border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors aspect-square w-full h-20 sm:h-24"
                        >
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 4</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </button>

                        {/* Booth 5 */}
                        <button 
                          onClick={() => handleBoothClick(5)}
                          className="bg-white border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors aspect-square w-full h-20 sm:h-24"
                        >
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 5</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                      {/* Booth 6 */}
                    <BoothButton boothNumber={6}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 6</h4>
                        <p className="text-sm text-gray-600">USD 1,800</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                      </div>
                    </BoothButton>
                    
                    {/* Booth 7 */}
                    <BoothButton boothNumber={7}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 7</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 8 */}
                    <BoothButton boothNumber={8}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 8</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 9 */}
                    <BoothButton boothNumber={9}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 9</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 10 */}
                    <BoothButton boothNumber={10}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 10</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">Pavilion</p>
                      </div>
                    </BoothButton>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                      {/* Booth 11 */}
                    <BoothButton boothNumber={11}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 11</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>
                    
                    {/* Booth 12 */}
                    <BoothButton boothNumber={12}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 12</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 13 */}
                    <BoothButton boothNumber={13}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 13</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 14 */}
                    <BoothButton boothNumber={14}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 14</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                      </div>
                    </BoothButton>

                    {/* Booth 15 */}
                    <BoothButton boothNumber={15}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 15</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
                      {/* Booth 16 */}
                    <BoothButton boothNumber={16}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 16</h4>
                        <p className="text-sm text-gray-600">USD 1,800</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                      </div>
                    </BoothButton>
                    
                    {/* Booth 17 */}
                    <BoothButton boothNumber={17}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 17</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 18 */}
                    <BoothButton boothNumber={18}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 18</h4>
                        <p className="text-sm text-gray-600">USD 1,800</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                      </div>
                    </BoothButton>

                    {/* Booth 19 */}
                    <BoothButton boothNumber={19}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 19</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 20 */}
                    <BoothButton boothNumber={20}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 20</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>
                    </div>
                  </div>
                </div>

                {/* Right Section - Premium Booths & Pavilions */}
                <div>
                <div>
                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                          {/* Booth 21 */}
                        <BoothButton boothNumber={21}>
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 21</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </BoothButton>
                        
                        {/* Booth 22 */}
                        <BoothButton boothNumber={22}>
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 22</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </BoothButton>
                        
                        {/* Booth 23 */}
                        <BoothButton boothNumber={23}>
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 23</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </BoothButton>
                        
                        {/* Booth 24 */}
                        <BoothButton boothNumber={24}>
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 24</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </BoothButton>

                        {/* Booth 25 */}
                        <BoothButton boothNumber={25}>
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 25</h4>
                            <p className="text-xs text-gray-600">USD 1,000</p>
                            <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                          </div>
                        </BoothButton>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                      {/* Booth 26 */}
                    <BoothButton boothNumber={26}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 26</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>
                    
                    {/* Booth 27 */}
                    <BoothButton boothNumber={27}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 27</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 28 */}
                    <BoothButton boothNumber={28}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 28</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 29 */}
                    <BoothButton boothNumber={29}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 29</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 30 */}
                    <BoothButton boothNumber={30}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 30</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                      {/* Booth 31 */}
                    <BoothButton boothNumber={31}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 31</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>
                    
                    {/* Booth 32 */}
                    <BoothButton boothNumber={32}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 32</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 33 */}
                    <BoothButton boothNumber={33}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 33</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">Pavillion</p>
                      </div>
                    </BoothButton>

                    {/* Booth 34 */}
                    <BoothButton boothNumber={34}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 34</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 35 */}
                    <BoothButton boothNumber={35}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 35</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
                      {/* Booth 36 */}
                    <BoothButton boothNumber={36}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 36</h4>
                        <p className="text-sm text-gray-600">USD 1,800</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                      </div>
                    </BoothButton>
                    
                    {/* Booth 37 */}
                    <BoothButton boothNumber={37}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 37</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">Pavilion</p>
                      </div>
                    </BoothButton>

                    {/* Booth 38 */}
                    <BoothButton boothNumber={38}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 38</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 39 */}
                    <BoothButton boothNumber={39}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 39</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>

                    {/* Booth 40 */}
                    <BoothButton boothNumber={40}>
                      <div className="flex flex-col items-center text-center">
                        <h4 className="font-bold text-paan-dark-blue">Booth 40</h4>
                        <p className="text-sm text-gray-600">USD 1,000</p>
                        <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                      </div>
                    </BoothButton>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

              
            </motion.div>
          </section>
        </motion.div>

        {/* Pricing & Information Cards */}
        <div 
          className="bg-[#DAECF3] py-12 sm:py-16 md:py-20"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-paan-dark-blue mb-4 sm:mb-6">
                Exhibition Packages & Pricing
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the perfect exhibition package for your business needs and budget.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Standard Pricing Card */}
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon icon="mdi:currency-usd" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-paan-dark-blue mb-2">Standard Pricing</h3>
                  <p className="text-gray-600">Physical booth spaces</p>
                      </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue">3×3 m Booth</h4>
                      <p className="text-sm text-gray-600">Standard size</p>
                      </div>
                    <span className="text-xl font-bold text-paan-blue">USD 1,000</span>
                      </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue">3×6 m Booth</h4>
                      <p className="text-sm text-gray-600">Double size</p>
                  </div>
                    <span className="text-xl font-bold text-paan-blue">USD 1,800</span>
                </div>

                  <div className="flex justify-between items-center py-3">
                    <div>
                      <h4 className="font-semibold text-paan-dark-blue">Pavilion</h4>
                      <p className="text-sm text-gray-600">Custom size</p>
                  </div>
                    <span className="text-lg font-semibold text-gray-600">RFQ</span>
                  </div>
                  </div>
              </motion.div>

              {/* What's Included Card */}
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon icon="mdi:check-circle" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-paan-dark-blue mb-2">What's Included</h3>
                  <p className="text-gray-600">Standard package features</p>
                </div>

                <div className="space-y-4">
                  <div className="mb-6">
                    <h4 className="font-semibold text-paan-dark-blue mb-3">Standard Package</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Standard table setup</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Brand logo printing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Two seats</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Power provision</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Basic lighting</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-paan-dark-blue mb-3">Popular Add-ons</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                        <span className="text-gray-700">Potted plant</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                        <span className="text-gray-700">55" LED screen</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                        <span className="text-gray-700">Full branding</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                        <span className="text-gray-700">Custom booth design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                        <span className="text-gray-700">Interactive screens</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Virtual Exhibition Card */}
              <motion.div 
                className="bg-paan-blue rounded-xl shadow-lg p-6 sm:p-8 text-paan-dark-blue"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon icon="mdi:monitor" className="w-8 h-8 text-paan-dark-blue" />
            </div>
                  <h3 className="text-2xl font-bold mb-2">Virtual Exhibition</h3>
                  <p className="text-dark-blue">Digital showcase option</p>
            </div>
                
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold">USD 200</span>
                    <span className="text-dark-blue ml-2">per brand</span>
        </div>

                  <p className="text-dark-blue mb-4">
                    Showcase to remote attendees with your logo, image, description, website link, and contact button. Optional 30-60s video.
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                      <span className="text-sm">Company logo display</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                      <span className="text-sm">Product image showcase</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                      <span className="text-sm">Company description</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                      <span className="text-sm">Website link</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                      <span className="text-sm">Contact button</span>
                    </li>
                  </ul>
        </div>

                <button 
                  onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Virtual Exhibition Booking&body=Hello PAAN Team,%0D%0A%0D%0AI would like to book a virtual exhibition slot for the PAAN Summit 2026.%0D%0A%0D%0ACompany details:%0D%0A- Company name: _________________%0D%0A- Contact person: _________________%0D%0A- Email: _________________%0D%0A- Phone: _________________%0D%0A%0D%0AAdditional requirements:%0D%0A- [ ] Video content (30-60s)%0D%0A- [ ] Special branding requests%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards'}
                  className="w-full bg-paan-red text-white py-3 px-6 rounded-full hover:bg-gray-100 transition-all hover:text-paan-dark-blue duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:calendar-check" className="w-5 h-5" />
                  Book Virtual Slot
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Exhibition Benefits Section */}
        <motion.div 
          className="bg-white py-12 sm:py-16 md:py-20" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-paan-dark-blue mb-4 sm:mb-6">
                Why Exhibit at PAAN Summit 2026?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Connect with Africa's leading creative and tech professionals, showcase your innovations, and build lasting partnerships in the continent's premier industry gathering.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <motion.div 
                className="bg-paan-blue/10 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="mdi:account-group" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Network with Leaders</h3>
                <p className="text-gray-600">Connect with 500+ industry leaders, investors, and decision-makers from across Africa.</p>
              </motion.div>

              <motion.div 
                className="bg-paan-blue/10 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="mdi:bullhorn" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Showcase Innovation</h3>
                <p className="text-gray-600">Present your latest products and services to a highly engaged audience of industry professionals.</p>
              </motion.div>

              <motion.div 
                className="bg-paan-blue/10 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="mdi:handshake" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Build Partnerships</h3>
                <p className="text-gray-600">Forge strategic partnerships and explore collaboration opportunities with like-minded organizations.</p>
              </motion.div>
            </div>
          </section>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
           className="relative py-12 sm:py-16 md:py-20 overflow-hidden h-[400px] sm:h-[450px] md:h-[500px]" 
          id="cta-section" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
         >
           {/* Parallax Background Image */}
           <div 
             className="absolute inset-0 bg-cover bg-center bg-fixed"
             style={{
              backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/travel-guide-parallax-image.png')",
               filter: "brightness(0.8)"
             }}
           />
           
           {/* Dark overlay for better text readability */}
           <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
           
           <section className="relative mx-auto max-w-6xl px-4 sm:px-6 h-full flex items-center justify-center">
             <div className="text-center w-full max-w-4xl">
               <div className="mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl text-white font-bold uppercase mb-4 sm:mb-6">Ready to Exhibit?</h3>
                <p className="text-lg sm:text-xl font-normal text-white">Secure your booth space and join Africa's premier creative and tech conference.</p>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
                 <button 
                  onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Exhibition Booth Inquiry&body=Hello PAAN Team,%0D%0A%0D%0AI am interested in exhibiting at the PAAN Summit 2026 in Nairobi.%0D%0A%0D%0APlease provide information about:%0D%0A- [ ] Available booth spaces%0D%0A- [ ] Pricing and packages%0D%0A- [ ] Exhibition guidelines%0D%0A- [ ] Setup and logistics%0D%0A- [ ] Marketing opportunities%0D%0A%0D%0ACompany: _________________%0D%0AContact: _________________%0D%0A%0D%0AThank you for your assistance.%0D%0A%0D%0ABest regards'}
                   className="bg-paan-blue text-paan-dark-blue px-6 sm:px-8 py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
                 >
                  <Icon icon="mdi:email" className="w-5 h-5" />
                  Request Information
                 </button>
                 <button 
                  onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Booth Booking&body=Hello PAAN Team,%0D%0A%0D%0AI would like to book a booth for the PAAN Summit 2026.%0D%0A%0D%0ABooth preferences:%0D%0A- Preferred booth number: _________________%0D%0A- Booth size: [ ] 3x3m (USD 1,000) [ ] 3x6m (USD 1,800) [ ] Pavilion (RFQ)%0D%0A- Company name: _________________%0D%0A- Contact person: _________________%0D%0A- Email: _________________%0D%0A- Phone: _________________%0D%0A%0D%0AAdditional requirements:%0D%0A%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards'}
                   className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
                 >
                  <Icon icon="mdi:calendar-check" className="w-5 h-5" />
                  Book Your Booth
                 </button>
               </div>
             </div>
           </section>
        </motion.div>
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
        <SummitFooter />
        <ScrollToTop />
        
        {/* Booth Info Modal */}
        {isModalOpen && selectedBooth && (
          <BoothInfoModal 
            booth={selectedBooth} 
            onClose={closeModal} 
          />
        )}
      </main>
    </>
  );
};

const Hero = ({ sectionRefs }) => {

  return (
    <>
      <div
        className="absolute top-0 left-0 h-[75vh] w-full" 
        id="home"
        ref={sectionRefs.home}
      >
        {/* Full background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/exhibitors/paan-summit-2026-exhibitors.png')",
            filter: "brightness(0.5)" // Darkening the image
          }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-center justify-center pt-16 sm:pt-24 md:pt-32">
          <div className="mx-auto max-w-6xl w-full px-4">
            <motion.div 
              className="max-w-2xl"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >              
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase text-yellow-400 mb-6 sm:mb-8 leading-tight"
                variants={fadeInUp}
              >
                PAAN Summit - Exhibition Floor Plan
              </motion.h1>
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-10"
                variants={fadeInUp}
              >
                <p className="text-white">Explore live booth availability. Standard shell schemes (3×3 at USD 1,000, 3×6 at USD 1,800) and Pavilions (RFQ). Click a booth to see details, inclusions, and add‑ons, then request a booking.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

    </>
  );
};

const BoothInfoModal = ({ booth, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-100';
      case 'Reserved': return 'text-yellow-600 bg-yellow-100';
      case 'Booked': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available': return 'mdi:check-circle';
      case 'Reserved': return 'mdi:clock-outline';
      case 'Booked': return 'mdi:close-circle';
      default: return 'mdi:help-circle';
    }
  };
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
            {/* Header */}
        <div className="bg-gradient-to-r from-paan-blue to-paan-dark-blue text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Booth #{booth.number}</h2>
              <div className="flex items-center gap-2">
                <Icon icon={getStatusIcon(booth.status)} className="w-5 h-5" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booth.status)}`}>
                  {booth.status}
                </span>
                </div>
                </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
                </div>
                </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booth Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="mdi:ruler" className="w-5 h-5 text-paan-blue" />
                <h3 className="font-semibold text-paan-dark-blue">Size</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{booth.size}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="mdi:currency-usd" className="w-5 h-5 text-paan-blue" />
                <h3 className="font-semibold text-paan-dark-blue">Price</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{booth.price}</p>
            </div>
          </div>

          {/* What's Included */}
            <div>
            <h3 className="text-xl font-bold text-paan-dark-blue mb-4 flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500" />
              What's Included
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Standard table setup',
                'Brand logo printing',
                'Two seats',
                'Power provision',
                'Basic lighting',
                'WiFi access'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
              </div>
            </div>

          {/* Popular Add-ons */}
            <div>
            <h3 className="text-xl font-bold text-paan-dark-blue mb-4 flex items-center gap-2">
              <Icon icon="mdi:plus-circle" className="w-6 h-6 text-paan-blue" />
              Popular Add-ons
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Potted plant',
                '55" LED screen',
                'Full branding',
                'Interactive screen',
                'Custom design',
                'Cube/Tall boxes',
                'Additional seating',
                'Premium lighting'
              ].map((addon, index) => (
                <span 
                  key={index}
                  className="bg-paan-blue/10 text-paan-dark-blue px-3 py-2 rounded-full text-sm font-medium"
                >
                  {addon}
                </span>
              ))}
              </div>
            </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
                  Close
              </button>
            {booth.status === 'Available' && (
              <button 
                onClick={() => {
                  window.location.href = `/summit/exhibition-application?booth=${booth.number}&size=${booth.size}&price=${booth.price}&type=${booth.type}`;
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-paan-blue text-white rounded-lg hover:bg-paan-blue/90 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:calendar-check" className="w-5 h-5" />
                Request to Book
              </button>
            )}
            {booth.status === 'Reserved' && (
              <button 
                onClick={() => {
                  window.location.href = `mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Booth ${booth.number} Waitlist Request&body=Hello PAAN Team,%0D%0A%0D%0AI am interested in Booth ${booth.number} which is currently reserved.%0D%0A%0D%0APlease add me to the waitlist in case it becomes available.%0D%0A%0D%0ABooth Details:%0D%0A- Booth Number: ${booth.number}%0D%0A- Size: ${booth.size}%0D%0A- Price: ${booth.price}%0D%0A%0D%0ACompany Details:%0D%0A- Company name: _________________%0D%0A- Contact person: _________________%0D%0A- Email: _________________%0D%0A- Phone: _________________%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards`; 
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:clock-outline" className="w-5 h-5" />
                Join Waitlist
              </button>
            )}
            {booth.status === 'Booked' && (
              <button 
                onClick={() => {
                  window.location.href = `mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Alternative Booth Request&body=Hello PAAN Team,%0D%0A%0D%0AI am interested in exhibiting at the PAAN Summit 2026.%0D%0A%0D%0APreferred booth size: ${booth.size}%0D%0APreferred price range: ${booth.price}%0D%0A%0D%0APlease suggest alternative available booths.%0D%0A%0D%0ACompany Details:%0D%0A- Company name: _________________%0D%0A- Contact person: _________________%0D%0A- Email: _________________%0D%0A- Phone: _________________%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards`; 
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:search" className="w-5 h-5" />
                Find Alternatives
              </button>
            )}
            </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Exhibitors;