import SEO from "@/components/SEO";
import Header from "../layouts/summit-header";
import SummitAgenda from "@/components/SummitAgenda";
import SummitFooter from "@/layouts/summit-footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";
import PartnerWithUsModal from "@/components/PartnerWithUsModal";
import ExhibitionApplicationModal from "@/components/ExhibitionApplicationModal";
import PaystackScript from "@/components/PaystackScript";
import { generateEventSchema } from '@/utils/structuredData';

// Import summit section components
import Hero from '@/components/summit/Hero';
import CountdownBanner from '@/components/summit/CountdownBanner';
import AboutSection from '@/components/summit/AboutSection';
import ObjectivesSection from '@/components/summit/ObjectivesSection';
import AtAGlanceSection from '@/components/summit/AtAGlanceSection';
import TracksSection from '@/components/summit/TracksSection';
import SpeakersSection from '@/components/summit/SpeakersSection';
import SessionsSection from '@/components/summit/SessionsSection';
import StatsSection from '@/components/summit/StatsSection';
import WhoShouldJoinSection from '@/components/summit/WhoShouldJoinSection';
import AwardsSection from '@/components/summit/AwardsSection';
import PartnersSection from '@/components/summit/PartnersSection';

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
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showExhibitionModal, setShowExhibitionModal] = useState(false);
  
  // Count up animation state
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    investorMeetings: 0,
    ndasSigned: 0,
    termSheets: 0
  });

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
    const targetDate = new Date('2026-04-21T00:00:00+03:00');
    
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
    const targetDate = new Date('2026-01-25T23:59:59+03:00');
    
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

      <main className="px-3 pt-20 sm:px-0 sm:pt-0 relative">
        <Header navLinkColor='text-white' />

        <Hero 
          sectionRefs={sectionRefs} 
          handleScroll={handleScroll} 
          isFixed={isFixed} 
          scrollToSection={scrollToSection} 
          timeLeft={timeLeft} 
          onPartnerClick={() => setShowPartnerModal(true)} 
        />

        {/* Spacer to maintain layout flow */}
        <div className="h-screen"></div>

        <CountdownBanner timeLeft={timeLeft} />
        
        <AboutSection sectionRef={sectionRefs.about} />
        
        <ObjectivesSection sectionRef={sectionRefs.objectives} />
        
        <AtAGlanceSection onPartnerClick={() => setShowPartnerModal(true)} />
        
        <TracksSection sectionRef={sectionRefs.program} />

        {/* Summit Agenda Section */}
        <SummitAgenda 
          sectionRefs={sectionRefs} 
          handleScroll={handleScroll} 
          isFixed={isFixed} 
          id="agenda" 
        />

        <SpeakersSection sectionRef={sectionRefs.speakers} />
        
        <SessionsSection sectionRef={sectionRefs.sessions} />
        
        <StatsSection 
          counts={counts} 
          sectionRef={sectionRefs.stats} 
        />
        
        <WhoShouldJoinSection />
        
        <AwardsSection sectionRef={sectionRefs.awards} />
        
        <PartnersSection />

        <SummitFooter />
        <ScrollToTop />
      </main>

      {/* Modals */}
      {showPartnerModal && (
        <PartnerWithUsModal onClose={() => setShowPartnerModal(false)} />
      )}
      {showExhibitionModal && (
        <ExhibitionApplicationModal onClose={() => setShowExhibitionModal(false)} />
      )}
      <PaystackScript />
    </>
  );
};

export default SummitPage;
