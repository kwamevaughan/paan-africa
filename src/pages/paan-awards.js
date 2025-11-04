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
import Hero from "@/components/PaanAwardsHero";

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

  // Award categories - Matching structure from PAANAwardsApplicationModal
  const awardCategories = [
    {
      id: 'campaign-excellence',
      name: 'Campaign Excellence Awards',
      description: 'Celebrating the power of ideas, creativity, and execution across Africa\'s most impactful campaigns. These categories honor the campaigns that moved audiences, shaped perceptions, and delivered results across PR, communications, digital, and brand activations.',
      subcategories: [
        {
          id: 'pr-campaign-year',
          name: 'PR Campaign of the Year',
          description: 'Outstanding public relations campaigns that shaped public perception and delivered measurable impact.'
        },
        {
          id: 'communication-campaign-year',
          name: 'Communication Campaign of the Year',
          description: 'Exceptional communication strategies that effectively reached and engaged target audiences.'
        },
        {
          id: 'ooh-campaign-year',
          name: 'OOH (Out-of-Home) Campaign of the Year',
          description: 'Creative and impactful outdoor advertising campaigns that captured attention and drove results.'
        },
        {
          id: 'social-media-campaign-year',
          name: 'Social Media Campaign of the Year',
          description: 'Innovative social media campaigns that engaged communities and achieved remarkable reach.'
        },
        {
          id: 'content-marketing-campaign-year',
          name: 'Content Marketing Campaign of the Year',
          description: 'Strategic content campaigns that educated, entertained, and converted audiences effectively.'
        },
        {
          id: 'influencer-marketing-campaign-year',
          name: 'Influencer Marketing Campaign of the Year',
          description: 'Successful influencer partnerships that authentically connected brands with their audiences.'
        },
        {
          id: 'csr-impact-campaign-year',
          name: 'CSR/Impact Campaign of the Year',
          description: 'Purpose-driven campaigns that created positive social or environmental impact.'
        },
        {
          id: 'integrated-marketing-campaign-year',
          name: 'Integrated Marketing Campaign of the Year',
          description: 'Seamlessly coordinated multi-channel campaigns that delivered consistent messaging and results.'
        },
        {
          id: 'b2b-marketing-campaign-year',
          name: 'B2B Marketing Campaign of the Year',
          description: 'Business-to-business campaigns that effectively reached and converted professional audiences.'
        },
        {
          id: 'experiential-brand-activation-year',
          name: 'Experiential/Brand Activation of the Year',
          description: 'Immersive brand experiences that created memorable connections with consumers.'
        }
      ]
    },
    {
      id: 'agency-excellence',
      name: 'Agency Excellence Awards',
      description: 'Recognizing the agencies that set the benchmark for innovation, growth, and client success. These awards spotlight agencies of all sizes and specialties that have demonstrated vision, creativity, and measurable impact in building brands across Africa.',
      subcategories: [
        {
          id: 'digital-agency-year',
          name: 'Digital Agency of the Year',
          description: 'Leading digital agencies that excel in online strategy, execution, and innovation.'
        },
        {
          id: 'creative-agency-year',
          name: 'Creative Agency of the Year',
          description: 'Creative agencies that consistently deliver outstanding creative solutions and campaigns.'
        },
        {
          id: 'design-branding-agency-year',
          name: 'Design & Branding Agency of the Year',
          description: 'Agencies specializing in visual identity, brand design, and creative brand development.'
        },
        {
          id: 'media-planning-buying-agency-year',
          name: 'Media Planning & Buying Agency of the Year',
          description: 'Agencies that excel in strategic media planning, buying, and optimization.'
        },
        {
          id: 'production-house-year',
          name: 'Production House of the Year',
          description: 'Production companies delivering exceptional video, audio, and multimedia content.'
        },
        {
          id: 'specialist-agency-year',
          name: 'Specialist Agency of the Year',
          description: 'Agencies with specialized expertise in sectors like healthcare, fintech, agriculture, etc.'
        },
        {
          id: 'rising-agency-year',
          name: 'Rising Agency of the Year',
          description: 'Emerging agencies showing exceptional growth, innovation, and potential.'
        },
        {
          id: 'regional-agency-year',
          name: 'Regional Agency of the Year',
          description: 'Outstanding agencies representing East, West, Southern, or North Africa regions.'
        }
      ]
    },
    {
      id: 'innovation-technology',
      name: 'Innovation & Technology Awards',
      description: 'Celebrating the pioneers redefining the future of marketing through data, technology, and new platforms. These categories honor agencies that harness innovation to deliver smarter, more engaging, and more measurable results.',
      subcategories: [
        {
          id: 'tech-innovation-marketing',
          name: 'Tech Innovation in Marketing Award',
          description: 'Groundbreaking use of technology to create innovative marketing solutions and experiences.'
        },
        {
          id: 'creative-use-data',
          name: 'Creative Use of Data Award',
          description: 'Innovative application of data analytics and insights to drive creative and strategic decisions.'
        },
        {
          id: 'ecommerce-marketing-campaign-year',
          name: 'E-Commerce Marketing Campaign of the Year',
          description: 'Outstanding marketing campaigns that drove e-commerce growth and online sales success.'
        }
      ]
    },
    {
      id: 'sector-excellence',
      name: 'Sector Excellence Awards',
      description: 'Honoring outstanding campaigns in industries that play a vital role in Africa\'s growth and development. These awards highlight work that has transformed communication in specific, high-impact sectors.',
      subcategories: [
        {
          id: 'public-sector-campaign-year',
          name: 'Public Sector Campaign of the Year',
          description: 'Exceptional campaigns for government and public sector organizations that served the public interest.'
        },
        {
          id: 'financial-services-campaign-year',
          name: 'Financial Services Campaign of the Year',
          description: 'Outstanding marketing campaigns in banking, insurance, fintech, and financial services.'
        }
      ]
    },
    {
      id: 'special-honors',
      name: 'Special Honors',
      description: 'Reserved for the highest level of recognition, these awards celebrate visionary leadership and overall excellence. These honors recognize the individuals and agencies that embody the best of Africa\'s independent creative ecosystem.',
      subcategories: [
        {
          id: 'agency-leader-year',
          name: 'Agency Leader of the Year',
          description: 'Visionary leaders who have driven exceptional growth, innovation, and industry impact.'
        },
        {
          id: 'grand-prix-agency-year',
          name: 'Grand Prix: Agency of the Year',
          description: 'The highest honor - recognizing the top overall agency demonstrating excellence across all areas.'
        }
      ]
    }
  ];

  // Define category IDs for agency awards
  const agencyCategoryIds = ['campaign-excellence', 'agency-excellence', 'innovation-technology', 'sector-excellence', 'special-honors'];
  
  // Select 9 specific agency award categories from different parent categories
  const selectedAgencyCategoryIds = [
    // Campaign Excellence (3)
    'pr-campaign-year',
    'social-media-campaign-year',
    'integrated-marketing-campaign-year',
    // Agency Excellence (3)
    'digital-agency-year',
    'creative-agency-year',
    'design-branding-agency-year',
    // Innovation & Technology (1)
    'tech-innovation-marketing',
    // Sector Excellence (1)
    'financial-services-campaign-year',
    // Special Honors (1)
    'agency-leader-year'
  ];
  
  // Filter agency categories and extract selected subcategories
  const agencyAwards = awardCategories
    .filter(category => agencyCategoryIds.includes(category.id))
    .flatMap(category => 
      category.subcategories
        .filter(subcat => selectedAgencyCategoryIds.includes(subcat.id))
        .map(subcat => ({
          id: subcat.id,
          title: subcat.name,
          description: subcat.description
        }))
    );

  const freelancerAwards = [
    {
      id: 'creative-excellence',
      name: 'Creative Excellence Awards',
      description: 'Celebrating mastery in design, branding, and visual storytelling.',
      subcategories: [
        {
          id: 'freelancer-year',
          title: 'Freelancer of the Year Award',
          description: 'The highest individual honour, celebrating an outstanding freelancer who demonstrated creativity, leadership, and measurable business impact across multiple projects.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/healthicons_award-trophy.svg"
        },
        {
          id: 'brand-identity',
          title: 'Excellence in Brand Identity & Visual Design Award',
          description: 'For exceptional brand, graphic, or visual design work that elevated client positioning, storytelling, and recognition.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_leaf-circle.svg"
        },
        {
          id: 'ui-ux',
          title: 'UI/UX & Product Design Innovation Award',
          description: 'Recognizing exceptional freelancers in app, web, or product experience design that enhanced usability and digital engagement.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ri_speak-ai-fill.svg"
        },
        {
          id: 'photography',
          title: 'Photography & Visual Storytelling Award',
          description: 'For photographers and visual storytellers whose imagery powerfully communicates emotion, culture, and brand narrative.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/material-symbols_target.svg"
        }
      ]
    },
    {
      id: 'digital-performance',
      name: 'Digital Performance Awards',
      description: 'Recognizing freelancers driving measurable results and ROI for brands in the digital economy.',
      subcategories: [
        {
          id: 'website-dev',
          title: 'Website & No-Code Development Excellence Award',
          description: 'Celebrating freelancers who have delivered high-performance websites or e-commerce platforms using modern or no-code tools.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/heroicons_user-solid.svg"
        },
        {
          id: 'seo-content',
          title: 'SEO Content & Copywriting Excellence Award',
          description: 'Honouring writers whose strategic, high-quality content drives visibility, engagement, and organic growth.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg"
        },
        {
          id: 'performance-marketing',
          title: 'Performance Marketing Specialist Award',
          description: 'For freelancers who excel in digital ad strategy, campaign optimization, and conversion-focused creative execution.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_leaf-circle.svg"
        },
        {
          id: 'email-crm',
          title: 'Email, CRM & Lifecycle Marketing Award',
          description: 'Recognizing top freelancers crafting high-performing retention and automation campaigns through email, SMS, or WhatsApp.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ri_speak-ai-fill.svg"
        }
      ]
    },
    {
      id: 'innovation-storytelling',
      name: 'Innovation & Storytelling Awards',
      description: 'Showcasing freelancers leading the way in modern storytelling, video, and digital innovation.',
      subcategories: [
        {
          id: 'short-form-video',
          title: 'Short-Form Video & Editing Mastery Award',
          description: 'For creative editors and storytellers mastering short-form platforms like TikTok, YouTube Shorts, and Reels.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/material-symbols_target.svg"
        },
        {
          id: 'motion-graphics',
          title: 'Motion Graphics & 3D Creativity Award',
          description: 'Honouring motion designers and 3D/AR specialists who elevate visual storytelling through technology and innovation.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/healthicons_award-trophy.svg"
        },
        {
          id: 'ugc-creator',
          title: 'UGC Creator of the Year Award',
          description: 'For independent creators producing authentic, high-impact user-generated content that amplifies brands across Africa.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/heroicons_user-solid.svg"
        },
        {
          id: 'social-media',
          title: 'Social Media Strategy & Community Growth Award',
          description: 'Recognizing freelancers who\'ve built thriving, engaged digital communities through smart content strategy and audience insight.',
          icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg"
        }
      ]
    }
  ];

  // Select 9 specific freelancer award categories from different parent categories
  const selectedFreelancerCategoryIds = [
    // Creative Excellence (3)
    'freelancer-year',
    'brand-identity',
    'ui-ux',
    // Digital Performance (3)
    'website-dev',
    'seo-content',
    'performance-marketing',
    // Innovation & Storytelling (3)
    'short-form-video',
    'motion-graphics',
    'ugc-creator'
  ];

  // Filter freelancer awards to only include selected categories
  const filteredFreelancerAwards = freelancerAwards.flatMap(award => 
    award.subcategories
      .filter(subcat => selectedFreelancerCategoryIds.includes(subcat.id))
  );

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
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png"
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
                "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png",
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

      <main className="relative">
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
        <section className="relative mx-auto max-w-6xl px-6 sm:px-0">
          <div className="grid lg:grid-cols-2 gap-4 py-20 items-center">
            <div className="flex flex-col gap-8 z-0">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl lg:text-5xl text-[#172840] uppercase font-bold leading-tight">20+ Categories. One Continental Stage.</h2>
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
      <div className="bg-white relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8" id="paan-awards-section" isFixed={isFixed}>
        <section className="relative mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-10 lg:mb-12 gap-4 lg:gap-6">
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl text-paan-dark-blue font-bold uppercase leading-tight">
                {awardType === 'freelancer' ? 'PAAN Freelancer Excellence Awards 2026' : 'PAAN Agency Awards 2026'}
              </h3>
            </div>
            
            {/* Toggle Switch */}
            <div className="flex items-center justify-start lg:justify-end">
              <button
                onClick={() => setAwardType(awardType === 'agency' ? 'freelancer' : 'agency')}
                className="relative inline-flex h-10 sm:h-12 w-full max-w-[280px] sm:max-w-[320px] lg:w-80 items-center rounded-full bg-[#C2E0EC] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-paan-blue focus:ring-offset-2 overflow-hidden"
              >
                {/* Agency Label */}
                <span className={`absolute left-3 sm:left-4 lg:left-6 text-xs sm:text-sm font-medium transition-colors duration-300 z-10 ${
                  awardType === 'agency' ? 'text-white' : 'text-[#172840]'
                }`} style={{ pointerEvents: 'none' }}>
                  Agency Awards
                </span>

                {/* Freelancer Label */}
                <span className={`absolute right-3 sm:right-4 lg:right-6 text-xs sm:text-sm font-medium transition-colors duration-300 z-10 ${
                  awardType === 'freelancer' ? 'text-white' : 'text-[#172840]'
                }`} style={{ pointerEvents: 'none' }}>
                  Freelancer Awards
                </span>
                
                {/* Sliding Background */}
                <span
                  className={`absolute h-8 sm:h-10 transform rounded-full bg-[#172840] transition-all duration-300 ${
                    awardType === 'freelancer' 
                      ? 'w-[45%] translate-x-[calc(100%-8px)] sm:translate-x-[calc(112%-8px)] lg:w-[200px] lg:translate-x-[120px]' 
                      : 'w-[42%] translate-x-2 sm:w-[140px]'
                  }`}
                />
              </button>
            </div>
          </div>

          {awardType === 'freelancer' && (
            <p className="text-base sm:text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto mt-4 mb-8 sm:mb-10 text-center lg:text-left px-2">
              Honouring Africa's top independent creative talent redefining work, creativity, and innovation across borders.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center mt-8 sm:mt-10 lg:mt-12">
            {(awardType === 'agency' ? agencyAwards : filteredFreelancerAwards).map((award) => (
              <div key={award.id} className="bg-paan-dark-blue w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full shadow-xl overflow-hidden relative flex items-center justify-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Ring image inside the circle with padding */}
                <div className="absolute inset-3 sm:inset-4 flex items-center justify-center">
                  <img
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/awards-ring.svg?updatedAt=1757757368902"
                    alt="Awards Ring"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="text-center relative mt-8 sm:mt-10 lg:mt-12 max-w-[11rem] sm:max-w-[12rem] px-4">
                  <h4 className="text-sm sm:text-md font-bold text-white mb-2 sm:mb-3">{award.title || award.name}</h4>
                  <p className="text-white font-light text-xs leading-relaxed">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
        
        {/* Transparency Section */}
        <div className="bg-[#FEEEED] relative py-12 md:py-16 lg:py-20" id="transparency-section">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#172840] uppercase font-bold leading-tight mb-4 md:mb-6 px-4">
            Fair. Transparent. Prestigious.
          </h2>
          <p className="text-base sm:text-lg text-[#172840] font-light leading-relaxed max-w-4xl mx-auto px-4">
            Entries will be scored on creativity, impact, collaboration, and authenticity by an independent jury of African industry leaders.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Section */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1 px-4 sm:px-0">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-md w-full">
              <img 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-2.png" 
                alt="PAAN Awards Transparency" 
                className="h-[350px] sm:h-[450px] md:h-[500px] w-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Criteria Cards Section */}
          <div className="flex flex-col gap-6 order-1 lg:order-2 px-4 sm:px-0">
            <div className="mb-2 md:mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#172840] mb-2">Judging Criteria</h3>
              <p className="text-sm sm:text-base text-[#172840] font-light">
                Our independent panel evaluates entries across four key dimensions:
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-paan-dark-blue rounded-xl shadow-lg p-5 md:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ic_outline-color-lens.svg" 
                    alt="Creativity" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-white leading-tight mb-2">Creativity</h4>  
                <p className="text-white font-light text-xs md:text-sm leading-relaxed">
                  Original thinking, craft, and storytelling excellence.
                </p>
              </div>
              
              <div className="bg-paan-red rounded-xl shadow-lg p-5 md:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/tabler_bulb.svg" 
                    alt="Impact" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-white leading-tight mb-2">Impact</h4>  
                <p className="text-white font-light text-xs md:text-sm leading-relaxed">
                  Measurable results and cultural relevance.
                </p>
              </div>
              
              <div className="bg-paan-yellow rounded-xl shadow-lg p-5 md:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg" 
                    alt="Authenticity" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-[#172840] leading-tight mb-2">Authenticity</h4>  
                <p className="text-[#172840] font-light text-xs md:text-sm leading-relaxed">
                  African context, voice, and integrity.
                </p>
              </div>
              
              <div className="bg-paan-blue rounded-xl shadow-lg p-5 md:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_world.svg" 
                    alt="Collaboration" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-white leading-tight mb-2">Collaboration</h4>  
                <p className="text-white font-light text-xs md:text-sm leading-relaxed">
                  Cross-discipline and cross-border teamwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#172840" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)"/>
        </svg>
      </div>
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
        <div className="bg-[#172840] relative py-12 md:py-16 lg:py-20" id="categories-section">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Content Section */}
              <div className="flex flex-col justify-center space-y-6 md:space-y-8 order-2 lg:order-1">
                <div className="text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white uppercase font-bold leading-tight mb-4 md:mb-6">
                    Your Work. Africa's Spotlight.
                  </h2>
                  <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed mb-6 md:mb-8">
                    Join Africa's most prestigious creative awards and showcase your talent to a continental audience.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 md:mb-4">Why Participate?</h3>
                  <ul className="space-y-3 text-white font-light text-sm sm:text-base">
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#FFC857] mt-0.5 sm:mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Gain continental recognition and credibility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#FFC857] mt-0.5 sm:mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Strengthen your brand and professional reputation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#FFC857] mt-0.5 sm:mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Connect with top agencies, clients & collaborators</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#FFC857] mt-0.5 sm:mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                      </svg>
                      <span>Inspire and be part of Africa's creative future</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                  <button 
                    className="bg-paan-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#E63946]/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                    onClick={() => setIsApplicationModalOpen(true)}
                  >
                    Apply Now
                  </button>
                  <button 
                    className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:text-[#172840] transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                    onClick={() => scrollToSection('paan-awards-section')}
                  >
                    Explore Categories
                  </button>
                </div>
              </div>
              
              {/* Image Section */}
              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg w-full">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-3.png" 
                    alt="PAAN Awards Categories" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Modal Placeholder */}
          {isApplicationModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsApplicationModalOpen(false)}>
              <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold text-[#172840] mb-4">Apply Now</h3>
                <p className="text-[#172840] mb-6">Application form would appear here.</p>
                <button 
                  className="bg-[#E63946] text-white px-6 py-3 rounded-full hover:bg-[#E63946]/90 transition-all duration-300 w-full"
                  onClick={() => setIsApplicationModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Key Dates Section */}
        <div className="bg-[#F3F9FB] relative py-12 md:py-20 px-4" id="key-dates-section" isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-paan-dark-blue uppercase font-bold leading-tight mb-4 md:mb-6 px-4">
                Key Dates 2025/2026
              </h2>
              <p className="text-base md:text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto px-4">
                Mark your calendar for the PAAN Summit & Creative Excellence Awards 2026.
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block w-full overflow-x-auto">
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
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">5 November 2025</td>
                    <td className="py-6 px-6 text-paan-red font-medium">Entries Open</td>
                    <td className="py-6 px-6 text-paan-dark-blue font-light">Submit your entries starting November 5. Showcase your agency, brand, or freelance work to a continental jury.</td>
                  </tr>
                  <tr className="border-t border-paan-dark-blue/20">
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">25 November 2025</td>
                    <td className="py-6 px-6 text-paan-red font-medium">Early Bird Deadline</td>
                    <td className="py-6 px-6 text-paan-dark-blue font-light">Take advantage of reduced entry fees and priority review for submissions received by this date.</td>
                  </tr>
                  <tr className="border-t border-paan-dark-blue/20">
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">10 February 2026</td>
                    <td className="py-6 px-6 text-paan-red font-medium">Final Entry Deadline</td>
                    <td className="py-6 px-6 text-paan-dark-blue font-light">All award entries must be submitted by midnight EAT. Late submissions will not be accepted.</td>
                  </tr>
                  <tr className="border-t border-paan-dark-blue/20">
                    <td className="py-6 px-6 text-paan-dark-blue font-medium">15 March 2026</td>
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

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden space-y-6 px-4">
              {/* Card 1 */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
                <div className="text-paan-dark-blue font-medium text-sm mb-2">10 October 2025</div>
                <div className="text-paan-red font-semibold text-xl mb-3">Entries Open</div>
                <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
                  Submit your entries starting March 10. Showcase your agency, brand, or freelance work to a continental jury.
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
                <div className="text-paan-dark-blue font-medium text-sm mb-2">15 November 2025</div>
                <div className="text-paan-red font-semibold text-xl mb-3">Early Bird Deadline</div>
                <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
                  Take advantage of reduced entry fees and priority review for submissions received by this date.
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
                <div className="text-paan-dark-blue font-medium text-sm mb-2">30 November 2025</div>
                <div className="text-paan-red font-semibold text-xl mb-3">Final Entry Deadline</div>
                <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
                  All award entries must be submitted by midnight EAT. Late submissions will not be accepted.
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
                <div className="text-paan-dark-blue font-medium text-sm mb-2">15 January 2026</div>
                <div className="text-paan-red font-semibold text-xl mb-3">Finalists Announced</div>
                <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
                  The shortlisted entries will be revealed across all categories. Finalists will be notified directly.
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
                <div className="text-paan-dark-blue font-medium text-sm mb-2">22 April 2026</div>
                <div className="text-paan-red font-semibold text-xl mb-3">Awards Ceremony</div>
                <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
                  Join us at the PAAN Summit in Nairobi for the prestigious awards ceremony celebrating Africa's creative excellence.
                </div>
              </div>
            </div>
          </section>
        </div>         

        {/* Parallax Section */}
        <div className="relative py-12 md:py-16 lg:py-20 overflow-hidden min-h-[400px] md:min-h-[450px] lg:h-[500px]" id="parallax-section" isFixed={isFixed}>
          {/* Parallax Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center lg:bg-fixed"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-4.png')",
              filter: "brightness(0.8)"
            }}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
          
          <section className="relative mx-auto max-w-6xl h-full flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8 md:mb-10 lg:mb-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold uppercase leading-tight mb-4 md:mb-6 px-2">
                  Are You Africa's Next Creative Leader?
                </h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white leading-relaxed px-4">
                  Join the most prestigious celebration of creativity in Africa. Showcase your impact, inspire the industry, and own the stage at the PAAN Summit Awards.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                <button 
                  onClick={() => setIsApplicationModalOpen(true)} 
                  className="w-full sm:w-auto bg-paan-red text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                >
                  Apply Now
                </button>
                
                <button 
                  onClick={() => window.location.href = '/summit'} 
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                >
                  Join 2026 Summit
                </button>
                
                <a 
                  href="/paan-awards-terms"
                  target="_blank"
                  className="w-full sm:w-auto bg-white/10 border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Icon icon="mdi:gavel" className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Terms & Conditions</span>
                  <span className="sm:hidden">Terms</span>
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


export default SummitPage;