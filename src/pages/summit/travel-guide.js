import SEO from "@/components/SEO";
import TravelGuideHeader from "../../layouts/travel-guide-header";
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

const TravelGuide = () => {
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
         <TravelGuideHeader navLinkColor='text-white' />

        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} timeLeft={timeLeft} />

        {/* Spacer to maintain layout flow */}
        <div className="h-screen"></div>


         {/* Visa requirements section */}
         <motion.div 
           className="bg-[#DAECF3] relative py-20 pt-32" 
           id="visa-requirements" 
           isFixed={isFixed}
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
         >
          <section className="relative mx-auto max-w-6xl">
            <motion.div 
              className="text-left mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
                <motion.h2 
                  className="text-3xl lg:text-4xl uppercase font-bold leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  Visa & Entry Requirements
                </motion.h2>
                <motion.p 
                  className="text-lg font-light leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  Most international visitors require an Electronic Travel Authorization (eTA) to enter Kenya.
                </motion.p>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Section */}
              <div className="flex flex-col justify-center space-y-8">                                
                <div className="space-y-4">            
                  <ul className="space-y-3 font-light">
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Passport valid for at least 6 months</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Recent passport photo (digital)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Return/onward flight ticket</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Proof of accommodation (hotel booking or invitation)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Visa invitation letter (if needed — request from <a href="mailto:travel@paan.africa" className="font-bold hover:text-paan-red transition-colors font-medium">travel@paan.africa</a>)</span>
                    </li>
                  </ul>
                </div>
                <div>
                    <p>Applications are processed in <span className="font-bold">3–5 working days</span>. Apply at least <span className="font-bold">2–3 weeks</span> before travel.</p>
                </div>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <motion.button 
                    className="bg-paan-red text-white px-8 py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Apply for eTA
                  </motion.button>
                  <motion.button 
                    className="bg-transparent border-2 border-paan-dark-blue text-paan-dark-blue px-8 py-4 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Request Invitation Letter
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Image Section */}
              <motion.div 
                className="flex justify-center lg:justify-end order-first lg:order-last"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div 
                  className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg w-full"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/visa-req.png" 
                    alt="PAAN Awards Categories" 
                    width={500} 
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </motion.div>

         {/* Accommodation section */}
         <motion.div 
           className="bg-white py-20 pt-24" 
           id="accommodation"
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
         >
            <section className="mx-auto max-w-6xl px-4">
                <div className="text-left mb-16">
                    <h2 className="text-3xl lg:text-4xl uppercase font-bold leading-tight mb-6 text-paan-dark-blue">Accommodation</h2>
                    <p className="text-lg font-light leading-relaxed mb-8 text-gray-600 max-w-3xl">
                        We've secured special rates at partner hotels near the venue. Options range from luxury hotels to budget-friendly accommodations.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="relative rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-64">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/sankara.png"
                                alt="Sankara Nairobi"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="text-xl font-bold text-paan-dark-blue mb-2">Sankara Nairobi</h4>
                            <p className="text-gray-600">Luxury • 6 min drive</p>
                        </div>
                    </div>
                    
                    <div className="relative rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-64">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/park-inn.png"
                                alt="Park Inn by Radisson"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="text-xl font-bold text-paan-dark-blue mb-2">Park Inn by Radisson</h4>
                            <p className="text-gray-600">Mid-range • 5 min drive</p>
                        </div>
                    </div>
                    
                    <div className="relative rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-64">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/ibis.png"
                                alt="Ibis Styles Nairobi"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="text-xl font-bold text-paan-dark-blue mb-2">Ibis Styles Nairobi</h4>
                            <p className="text-gray-600">Budget • 10 min drive</p>
                        </div>
                    </div>
                    
                    <div className="relative rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-64">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/trademark.png"
                                alt="Trademark Hotel"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="text-xl font-bold text-paan-dark-blue mb-2">Trademark Hotel</h4>
                            <p className="text-gray-600">Village Market • 12 min drive</p>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>

         {/* Arrival & Transport */}
        <motion.div 
          className="bg-paan-dark-blue py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
            <section className="mx-auto max-w-6xl px-4">
                <div className="text-left mb-2">
                    <h2 className="text-3xl lg:text-4xl uppercase font-bold leading-tight text-white">Arrival & Transport</h2>                    
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="p-8 transition-all duration-300">
                        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/airport.png"
                                alt="Airport to Sarit Center"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white mb-3">Airport → Sarit Center</h3>
                            <p className="text-white">Arrive via Jomo Kenyatta International (NBO). The venue is 25–40 minutes by car. Options include Uber, Bolt, Little Cab, or hotel transfers. Complimentary shuttles will run at set times.</p>
                        </div>
                    </div>
                    
                    <div className="p-8 transition-all duration-300">
                        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/city.png"
                                alt="Around the City"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white mb-3">Around the City</h3>
                            <p className="text-white">Ride-hailing is the easiest way to move around Nairobi. Hotel concierges can arrange taxis or private transfers for VIPs and speakers.</p>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
      
         {/* Travel Essentials section */}
         <motion.div 
           className="bg-white py-20 pt-24" 
           id="travel-essentials"
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
         >
            <section className="mx-auto max-w-6xl px-4">
                <div className="text-left mb-12">
                    <h2 className="text-3xl lg:text-4xl uppercase font-bold leading-tight text-paan-dark-blue">Travel Essentials</h2>
                    <p className="text-lg font-light leading-relaxed mb-8 text-gray-600 max-w-3xl">
                        Everything you need to know for a smooth trip to Nairobi.
                    </p>
                </div>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Currency Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/ksh(1).svg"
                                alt="Currency"
                                width={72}
                                height={72}
                                className="w-18 h-18"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Currency</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Kenyan Shilling (KES). ATMs are common. Cards accepted in hotels and restaurants. Carry small cash for taxis and tips.
                        </p>
                    </motion.div>

                    {/* Weather Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/weather.svg"
                                alt="Weather"
                                width={72}
                                height={72}
                                className="w-18 h-18"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Weather</h3>
                        <p className="text-gray-600 leading-relaxed">
                            April is warm and dry. Pack light layers, comfortable shoes, and a light jacket for evenings. Sunscreen recommended.
                        </p>
                    </motion.div>

                    {/* Connectivity Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/sim(1).svg"
                                alt="Connectivity"
                                width={72}
                                height={72}
                                className="w-18 h-18"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Connectivity</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Free WiFi at venue and most hotels. Local SIM cards available at airport. Mobile money (M-Pesa) widely accepted.
                        </p>
                    </motion.div>

                    {/* Language Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/chat(1).svg"
                                alt="Language"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Language</h3>
                        <p className="text-gray-600 leading-relaxed">
                            English is widely spoken. Local languages include Swahili and Kiswahili.
                        </p>
                    </motion.div>

                    {/* Time Zone Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/clock(1).svg"
                                alt="Time Zone"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Time Zone</h3>
                        <p className="text-gray-600 leading-relaxed">
                            East Africa Time (EAT). UTC+3.
                        </p>
                    </motion.div>

                    {/* Safety Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/lock.svg"
                                alt="Visa"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Safety</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Nairobi is safe in busy areas. Use ride apps, avoid empty streets at night, keep valuables secure.
                        </p>
                    </motion.div>
                </motion.div>
            </section>
        </motion.div>

         {/* pack smart section */}
         <motion.div 
           className="bg-white py-20 pt-24" 
           id="pack-smart"
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
         >
            <section className="mx-auto max-w-6xl px-4">
                <div className="text-left mb-12">
                    <h2 className="text-3xl lg:text-4xl uppercase font-bold leading-tight text-paan-dark-blue">Pack Smart</h2>
                    <p className="text-lg font-light leading-relaxed mb-8 text-gray-600 max-w-3xl">
                        Pack light, stay comfortable, and enjoy your trip to Nairobi.
                    </p>
                </div>
                <motion.div 
                  className="grid grid-cols-2 gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Delegates Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/delegates.svg"
                                alt="Currency"
                                width={72}
                                height={72}
                                className="w-18 h-18"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">All Delegates</h3>
                        <ol className="text-gray-600 leading-relaxed">
                            <li>Passport + e-Visa</li>
                            <li>Summit badge confirmation</li>
                            <li>Business cards</li>
                            <li>Type G plug adapter</li>
                            <li>Light clothes + jackets + umbrella</li>
                        </ol>
                    </motion.div>

                    {/* Speakers Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/microphone.svg"
                                alt="Weather"
                                width={72}
                                height={72}
                                className="w-18 h-18"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Speakers</h3>
                        <ol className="text-gray-600 leading-relaxed"> <li>Passport + e-Visa</li>
                            <li>All delegate items</li>
                            <li>Presentation slides + USB backup</li>
                            <li>Clicker & HDMI adapter</li>
                            <li>Formal attir for stage presentations</li>
                        </ol>
                    </motion.div>

                    {/* Exhibitors Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/exhibitor.svg"
                                alt="Connectivity"
                                width={72}
                                height={72}
                                className="w-18 h-18"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Exhibitors</h3>
                        <ol className="text-gray-600 leading-relaxed">
                            <li>All delegate items</li>
                            <li>Booth Signage & promo materials</li>
                            <li>Extension cables/ power strips</li>
                            <li>Demo kits / samples</li>
                        </ol>
                    </motion.div>

                    {/* Digital Nomads Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-end mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/laptop.svg"
                                alt="Language"
                                width={72}
                                height={72}
                                className="w-18 h-18"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Digital Nomads</h3>
                        <ol className="text-gray-600 leading-relaxed">
                            <li>All delegate items</li>
                            <li>Portable WIFI/eSIM</li>
                            <li>Laptop stand + mouse</li>
                            <li>Travel insurance</li>
                            <li>Coworking Pass</li>
                        </ol>
                    </motion.div>

                </motion.div>
            </section>
        </motion.div>

         <motion.div 
           className="bg-paan-dark-blue relative pt-24" 
           id="explore-nairobi"
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
         >
             <section className="mx-auto max-w-6xl py-20 justify-start">
              <div className="flex justify-between gap-8">
                <div className="text-left">
                    <h2 className="text-3xl font-bold mx-auto uppercase text-white mb-2">EXPLORE NAIROBI</h2>
                    <h3 className="text-2xl font-light text-white">Make the most of your stay before or after the Summit.</h3>
                </div>
              </div>
               <motion.div 
                 className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
                 variants={staggerContainer}
                 initial="initial"
                 whileInView="animate"
                 viewport={{ once: true, margin: "-50px" }}
               >
                 <motion.div 
                   className="relative rounded-xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300"
                   variants={fadeInUp}
                   whileHover={{ scale: 1.02, y: -5 }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="relative h-64">
                     <Image
                       src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/rhinos.png"
                       alt="Morning Safari"
                       fill
                       className="object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   </div>
                   <div className="p-6">
                     <h4 className="text-xl font-bold text-paan-dark-blue mb-3">Morning Safari</h4>
                     <p className="text-gray-600 leading-relaxed">Nairobi National Park — wildlife just 20 minutes from the city.</p>
                   </div>
                 </motion.div>

                 <motion.div 
                   className="relative rounded-xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300"
                   variants={fadeInUp}
                   whileHover={{ scale: 1.02, y: -5 }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="relative h-64">
                     <Image
                       src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/nairobi-town.png"
                       alt="Creative Crawl"
                       fill
                       className="object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   </div>
                   <div className="p-6">
                     <h4 className="text-xl font-bold text-paan-dark-blue mb-3">Creative Crawl</h4>
                     <p className="text-gray-600 leading-relaxed">Explore galleries, pop-ups, and music in Westlands.</p>
                   </div>
                 </motion.div>

                 <motion.div 
                   className="relative rounded-xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300"
                   variants={fadeInUp}
                   whileHover={{ scale: 1.02, y: -5 }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="relative h-64">
                     <Image
                       src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/nairobi.png"
                       alt="Dining & Rooftops"
                       fill
                       className="object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   </div>
                   <div className="p-6">
                     <h4 className="text-xl font-bold text-paan-dark-blue mb-3">Dining & Rooftops</h4>
                     <p className="text-gray-600 leading-relaxed">Award-winning restaurants and vibrant nightlife.</p>
                   </div>
                 </motion.div>
               </motion.div>
          </section>
         </motion.div>

         {/* Parallax Section */}
         <motion.div 
           className="relative py-20 overflow-hidden h-[500px]" 
           id="parallax-section" 
           isFixed={isFixed}
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
           
           <section className="relative mx-auto max-w-6xl">
             <div className="w-3/4">
               <div className="flex flex-col justify-start mb-12">
                 <h3 className="text-3xl text-white font-bold uppercase">Need Assistance?</h3>
                 <p className="text-xl font-normal text-white mb-4">Our logistics team can help with visas, hotels, and transport.</p>
                   </div>
               <div className="flex gap-8 justify-start">
                 <button 
                   onClick={() => window.location.href = '#parallax-section'} 
                   className="bg-paan-blue text-paan-dark-blue px-8 py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
                 >
                   Talk to Us
                 </button>
                 <button 
                   onClick={() => window.location.href = '#parallax-section'} 
                   className="bg-transparent border border-white text-white px-8 py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
                 >
                   Visa Quick Check
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
            <motion.div 
              className="max-w-2xl"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.p 
                className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit border border-white"
                variants={fadeInUp}
              >
                Travel Guide
              </motion.p>
              
              <motion.h1 
                className="text-3xl md:text-3xl font-semibold uppercase text-yellow-400 mb-8"
                variants={fadeInUp}
              >
                Travel Guide — Nairobi 2026
              </motion.h1>
              <motion.p 
                className="font-normal text-white mb-8"
                variants={fadeInUp}
              >
                Your complete guide to visas, venue, hotels, transport, and what to pack for the PAAN Summit.
              </motion.p>
              <motion.div 
                className="flex md:flex-row flex-col gap-4 mb-10"
                variants={fadeInUp}
              >
                <SeminarLocationAndDate />
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row justify-start gap-8"
                variants={scaleIn}
              >
                <button 
                  onClick={(e) => handleScroll(e, '#tickets-section')}
                  className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
                >
                  Register Now
                </button>             
              </motion.div>
            </motion.div>
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

export default TravelGuide;