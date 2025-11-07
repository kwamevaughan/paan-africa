import SEO from "@/components/SEO";
import PAANAwardsHeader from "@/layouts/paan-awards-header";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../../utils/scrollUtils';
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

  // Search and accordion state
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [expandedCategories, setExpandedCategories] = useState(new Set());

 
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
          description: 'The highest honor - recognizing the top overall agency demonstrating excellence across all areas. (Top Overall Award)'
        }
      ]
    }
  ];

  // Define category IDs for agency awards
  const agencyCategoryIds = ['campaign-excellence', 'agency-excellence', 'innovation-technology', 'sector-excellence', 'special-honors'];
  
  // Include ALL subcategories from all agency award categories
  const agencyAwards = awardCategories
    .filter(category => agencyCategoryIds.includes(category.id))
    .flatMap(category => 
      category.subcategories.map(subcat => ({
        id: subcat.id,
        title: subcat.name,
        description: subcat.description,
        categoryName: category.name,
        categoryId: category.id
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

  // Include ALL freelancer award subcategories (no filtering)
  const filteredFreelancerAwards = freelancerAwards.flatMap(award => 
    award.subcategories.map(subcat => ({
      id: subcat.id,
      title: subcat.title,
      description: subcat.description,
      categoryName: award.name,
      categoryId: award.id
    }))
  );

  // Get current awards list based on awardType
  const currentAwards = awardType === 'agency' ? agencyAwards : filteredFreelancerAwards;

  // Filter awards based on search query
  const filteredAwards = currentAwards.filter(award => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      award.title?.toLowerCase().includes(query) ||
      award.description?.toLowerCase().includes(query) ||
      award.name?.toLowerCase().includes(query) ||
      award.categoryName?.toLowerCase().includes(query)
    );
  });

  // Group agency awards by category for better organization
  const groupedAgencyAwards = awardType === 'agency' && !searchQuery.trim() 
    ? awardCategories
        .filter(category => agencyCategoryIds.includes(category.id))
        .map(category => ({
          categoryId: category.id,
          categoryName: category.name,
          categoryDescription: category.description,
          awards: category.subcategories.map(subcat => ({
            id: subcat.id,
            title: subcat.name,
            description: subcat.description,
            categoryName: category.name,
            categoryId: category.id
          }))
        }))
    : null;

  // Group freelancer awards by category for better organization
  const groupedFreelancerAwards = awardType === 'freelancer' && !searchQuery.trim()
    ? freelancerAwards.map(award => ({
        categoryId: award.id,
        categoryName: award.name,
        categoryDescription: award.description,
        awards: award.subcategories.map(subcat => ({
          id: subcat.id,
          title: subcat.title,
          description: subcat.description,
          categoryName: award.name,
          categoryId: award.id
        }))
      }))
    : null;

  // Toggle category group expansion
  const toggleCategory = (categoryId) => {
    const newExpandedCategories = new Set(expandedCategories);
    if (newExpandedCategories.has(categoryId)) {
      newExpandedCategories.delete(categoryId);
    } else {
      newExpandedCategories.add(categoryId);
    }
    setExpandedCategories(newExpandedCategories);
  };

  // Expand/Collapse all functionality
  const expandAll = () => {
    if (groupedAgencyAwards) {
      // Expand all category groups
      const allCategoryIds = new Set(groupedAgencyAwards.map(group => group.categoryId));
      setExpandedCategories(allCategoryIds);
      
      // Expand all award items within all groups
      const allIds = new Set(
        groupedAgencyAwards.flatMap(group => 
          group.awards.map(award => award.id || award.title || award.name)
        )
      );
      setExpandedItems(allIds);
    } else if (groupedFreelancerAwards) {
      // Expand all freelancer category groups
      const allCategoryIds = new Set(groupedFreelancerAwards.map(group => group.categoryId));
      setExpandedCategories(allCategoryIds);
      
      // Expand all award items within all groups
      const allIds = new Set(
        groupedFreelancerAwards.flatMap(group => 
          group.awards.map(award => award.id || award.title || award.name)
        )
      );
      setExpandedItems(allIds);
    } else {
      // For flat view (search results)
      const allIds = new Set(filteredAwards.map(award => award.id || award.title || award.name));
      setExpandedItems(allIds);
    }
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
    setExpandedCategories(new Set());
  };

  const toggleItem = (awardId) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(awardId)) {
      newExpandedItems.delete(awardId);
    } else {
      newExpandedItems.add(awardId);
    }
    setExpandedItems(newExpandedItems);
  };

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

        <div className="relative bg-[#F3F9FB]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* top header */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
                    {/* Left side: Expand/Collapse buttons */}
                    <div className="flex gap-3">
                        <button 
                            onClick={expandAll}
                            className="bg-paan-dark-blue rounded-full py-2.5 px-4 sm:px-6 text-white text-sm font-medium hover:bg-paan-dark-blue/90 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <Icon icon="mdi:unfold-more-horizontal" className="w-4 h-4" />
                            <span className="hidden sm:inline">Expand All</span>
                            <span className="sm:hidden">Expand</span>
                        </button>
                        <button 
                            onClick={collapseAll}
                            className="bg-paan-dark-blue rounded-full py-2.5 px-4 sm:px-6 text-white text-sm font-medium hover:bg-paan-dark-blue/90 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <Icon icon="mdi:unfold-less-horizontal" className="w-4 h-4" />
                            <span className="hidden sm:inline">Collapse All</span>
                            <span className="sm:hidden">Collapse</span>
                        </button>
                    </div>

                    {/* Right side: Search and Tabs */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1 lg:justify-end">
                        {/* Search input */}
                        <div className="relative flex-1 sm:max-w-xs lg:max-w-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <Icon icon="mdi:close-circle" className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Tab between Agency awards and Freelancer Awards */}
                        <div className="flex gap-2 bg-white rounded-full p-1 shadow-md border border-gray-200">
                            <button
                                onClick={() => {
                                    setAwardType('agency');
                                    setExpandedItems(new Set());
                                    setExpandedCategories(new Set());
                                    setSearchQuery('');
                                }}
                                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                    awardType === 'agency'
                                        ? 'bg-paan-dark-blue text-white shadow-md'
                                        : 'text-gray-600 hover:text-paan-dark-blue hover:bg-gray-50'
                                }`}
                            >
                                Agency Awards
                            </button>
                            <button
                                onClick={() => {
                                    setAwardType('freelancer');
                                    setExpandedItems(new Set());
                                    setExpandedCategories(new Set());
                                    setSearchQuery('');
                                }}
                                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                    awardType === 'freelancer'
                                        ? 'bg-paan-dark-blue text-white shadow-md'
                                        : 'text-gray-600 hover:text-paan-dark-blue hover:bg-gray-50'
                                }`}
                            >
                                Freelancer Awards
                            </button>
                        </div>
                    </div>
                </div>

                {/* Accordions Section */}
                <div className="mt-10">
                    <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm">
                        {filteredAwards.length > 0 ? (
                            <div className="space-y-6">
                                {(groupedAgencyAwards || groupedFreelancerAwards) ? (
                                    // Grouped view for agency or freelancer awards (when no search)
                                    (groupedAgencyAwards || groupedFreelancerAwards).map((group) => {
                                        const isCategoryExpanded = expandedCategories.has(group.categoryId);
                                        return (
                                        <div key={group.categoryId} className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
                                            {/* Category Group Header - Accordion */}
                                            <button
                                                onClick={() => toggleCategory(group.categoryId)}
                                                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left bg-gradient-to-r from-paan-dark-blue to-paan-dark-blue/90 hover:from-paan-dark-blue/90 hover:to-paan-dark-blue transition-all duration-300 flex justify-between items-center gap-4"
                                                aria-expanded={isCategoryExpanded}
                                            >
                                                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                                    {/* Category Icon */}
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="bg-white/20 rounded-lg p-2 sm:p-2.5 backdrop-blur-sm">
                                                            <Icon 
                                                                icon="mdi:trophy-variant" 
                                                                className="w-6 h-6 sm:w-7 sm:h-7 text-white" 
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 sm:gap-3 mb-1">
                                                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                                                {group.categoryName}
                                                            </h2>
                                                            {/* Award Count Badge */}
                                                            <span className="bg-white/30 text-white text-xs sm:text-sm font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                                                                <Icon icon="mdi:format-list-bulleted" className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                {group.awards.length}
                                                            </span>
                                                        </div>
                                                        <p className="text-white/90 text-xs sm:text-sm mt-1 line-clamp-2">
                                                            {group.categoryDescription}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex-shrink-0">
                                                    {isCategoryExpanded ? (
                                                        <Icon icon="mdi:chevron-up" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                                    ) : (
                                                        <Icon icon="mdi:chevron-down" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                                    )}
                                                </div>
                                            </button>
                                            
                                            {/* Category Awards - Collapsible Content */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                    isCategoryExpanded
                                                        ? 'max-h-[5000px] opacity-100' 
                                                        : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <div className="p-4 sm:p-6 space-y-3 bg-gray-50">
                                                    {group.awards.map((award) => {
                                                        const awardId = award.id || award.title || award.name;
                                                        const isExpanded = expandedItems.has(awardId);
                                                        return (
                                                            <div key={awardId} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                                                                <button
                                                                    onClick={() => toggleItem(awardId)}
                                                                    className="w-full px-4 sm:px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center gap-4"
                                                                    aria-expanded={isExpanded}
                                                                >
                                                                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg pr-4 flex-1">
                                                                        {award.title || award.name}
                                                                    </h3>
                                                                    <div className="flex-shrink-0">
                                                                        {isExpanded ? (
                                                                            <Icon icon="mdi:minus-circle" className="w-6 h-6 text-paan-dark-blue" />
                                                                        ) : (
                                                                            <Icon icon="mdi:plus-circle" className="w-6 h-6 text-paan-dark-blue" />
                                                                        )}
                                                                    </div>
                                                                </button>
                                                                
                                                                <div
                                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                                        isExpanded
                                                                            ? 'max-h-96 opacity-100' 
                                                                            : 'max-h-0 opacity-0'
                                                                    }`}
                                                                >
                                                                    <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100">
                                                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                                                            {award.description}
                                                                        </p>
                                                                        <button
                                                                            onClick={() => setIsApplicationModalOpen(true)}
                                                                            className="mt-4 bg-paan-red text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-paan-red/90 transition-all duration-300 flex items-center gap-2"
                                                                        >
                                                                            <Icon icon="mdi:send" className="w-4 h-4" />
                                                                            Apply for this Award
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    })
                                ) : (
                                    // Flat view when searching or for freelancer awards
                                    filteredAwards.map((award, index) => {
                                        const awardId = award.id || award.title || award.name || index;
                                        const isExpanded = expandedItems.has(awardId);
                                        return (
                                            <div key={awardId} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                                <button
                                                    onClick={() => toggleItem(awardId)}
                                                    className="w-full px-4 sm:px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center gap-4"
                                                    aria-expanded={isExpanded}
                                                >
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-800 text-base sm:text-lg pr-4">
                                                            {award.title || award.name}
                                                        </h3>
                                                        {award.categoryName && (
                                                            <p className="text-xs text-gray-500 mt-1">{award.categoryName}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        {isExpanded ? (
                                                            <Icon icon="mdi:minus-circle" className="w-6 h-6 text-paan-dark-blue" />
                                                        ) : (
                                                            <Icon icon="mdi:plus-circle" className="w-6 h-6 text-paan-dark-blue" />
                                                        )}
                                                    </div>
                                                </button>
                                                
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                        isExpanded
                                                            ? 'max-h-96 opacity-100' 
                                                            : 'max-h-0 opacity-0'
                                                    }`}
                                                >
                                                    <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100">
                                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                                            {award.description}
                                                        </p>
                                                        <button
                                                            onClick={() => setIsApplicationModalOpen(true)}
                                                            className="mt-4 bg-paan-red text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-paan-red/90 transition-all duration-300 flex items-center gap-2"
                                                        >
                                                            <Icon icon="mdi:send" className="w-4 h-4" />
                                                            Apply for this Award
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Icon icon="mdi:file-search-outline" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg font-medium mb-2">No categories found</p>
                                <p className="text-gray-500 text-sm">Try adjusting your search query</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
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

const Hero = ({ sectionRefs, onApplyNowClick }) => {

    return (
      <>
        <motion.div
          className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] w-full" 
          id="home"
          ref={sectionRefs.home}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Full background image with parallax effect */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/agency-categories.png')",
              filter: "brightness(0.5)"
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
  
          {/* Gradient overlay for better text readability */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
                 
          {/* Content overlay */}
          <div className="relative h-full flex items-end pb-4 sm:pb-6 md:pb-8 lg:pb-10">
            <div className="mx-auto max-w-6xl w-full px-3 sm:px-4">
              <motion.div 
                className="max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.h1 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Explore Award Categories
                </motion.h1>            
                <motion.p 
                  className="text-xs sm:text-sm md:text-base font-normal text-white mb-2 sm:mb-3 md:mb-4 leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  Discover all categories open for entry this year. Whether you're an independent creator or a leading agency, each award celebrates the creativity, impact, and innovation driving Africa's creative industry forward.
                </motion.p>
                <motion.button 
                  onClick={onApplyNowClick}
                  className="text-white bg-paan-red px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <Icon icon="mdi:message-text" className="w-5 h-5" />
                    Apply Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
  
      </>
    );
  };


export default SummitPage;