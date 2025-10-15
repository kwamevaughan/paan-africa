import SEO from "@/components/SEO";
import Header from "@/layouts/standard-header";
import Image from "next/image";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import AmbassadorPageParallax from "@/components/AmbassadorPageParallax";
import BecomeAmbassadorModal from "@/components/BecomeAmbassadorModal";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import { useAppTranslations } from '../hooks/useTranslations';
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react"

const PAANAmbassador = () => {
  const { t } = useAppTranslations();
  
  const sectionRefs = {
    home: useRef(null),
    aboutUs: useRef(null),
    ourMission: useRef(null),
    whyJoinUs: useRef(null),
    membership: useRef(null),
    services: useRef(null),
    events: useRef(null),
    contactUs: useRef(null),
  };

  const isFixed = useFixedHeader();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Ambassador data
  const ambassadors = [
    {
      name: t('homepage.ambassador.ambassadors.mahlodi.name'),
      title: t('homepage.ambassador.ambassadors.mahlodi.title'),
      country: t('homepage.ambassador.ambassadors.mahlodi.country'),
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/Mahlodi%20Legodi%20-%20image%201.png?updatedAt=1756715640453",
      flag: "https://flagcdn.com/w40/za.png",
      linkedin: "https://linkedin.com/in/mahlodi-legodi-a907b54b?originalSubdomain=za",
      description: t('homepage.ambassador.ambassadors.mahlodi.description'),
      fullDescription: t('homepage.ambassador.ambassadors.mahlodi.fullDescription'),
      achievements: t('homepage.ambassador.ambassadors.mahlodi.achievements'),
      expertise: t('homepage.ambassador.ambassadors.mahlodi.expertise'),
      color: "red"
    },
    {
      name: t('homepage.ambassador.ambassadors.stephen.name'),
      title: t('homepage.ambassador.ambassadors.stephen.title'),
      country: t('homepage.ambassador.ambassadors.stephen.country'),
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/Stephen%20Ekomu.jpeg?updatedAt=1756887596834",
      flag: "https://flagcdn.com/w40/ug.png",
      linkedin: "https://www.linkedin.com/in/stephen-ekomu/",
      description: t('homepage.ambassador.ambassadors.stephen.description'),
      fullDescription: t('homepage.ambassador.ambassadors.stephen.fullDescription'),
      achievements: t('homepage.ambassador.ambassadors.stephen.achievements'),
      expertise: t('homepage.ambassador.ambassadors.stephen.expertise'),
      color: "yellow"
    },
    {
      name: "William Lehong",
      title: "Founder & Managing Director",
      country: "South Africa",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/lehong.jpeg",
      flag: "https://flagcdn.com/w40/za.png",
      linkedin: "https://www.linkedin.com/in/williamlehong",
      description:
        "Seasoned media and communications professional with 15+ years of experience leading strategic campaigns that shape brand narratives and drive measurable success.",
      fullDescription:
        "William Lehong is a seasoned media and communications professional with more than 15 years of experience leading strategic campaigns that shape brand narratives and drive measurable success. As Founder and Managing Director of Lehong Media Communications, he specialises in marketing strategy, public relations, and digital storytelling that elevate brand visibility and influence consumer behaviour. His leadership blends creativity with strategic insight, guiding teams to deliver innovative, high-impact media solutions.",
      achievements: [
        "Founded and leads Lehong Media Communications",
        "15+ years in media and communications strategy",
        "Expert in brand narrative development and consumer behavior influence",
        "Specialized in high-impact digital storytelling and PR campaigns"
      ],
      expertise: [
        "Media Strategy",
        "Public Relations",
        "Digital Storytelling",
        "Brand Development",
        "Marketing Communications"
      ],
      color: "blue"
    },
    {
      name: "Aramide Pearce",
      title: "Public Relations & Communications Professional",
      country: "Nigeria",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/aramide.jpg",
      flag: "https://flagcdn.com/w40/ng.png",
      linkedin: "https://www.linkedin.com/in/aramide-pearce-3bb6b2a1",
      description: "Public relations and communications professional passionate about bringing stories to life and connecting audiences with African creativity.",
      fullDescription: "Aramide Pearce is a public relations and communications professional who loves bringing stories to life. At Filmhouse Group, she creates and executes PR, digital, and experiential campaigns that connect audiences with African creativity across film, culture, and brands. With experience spanning entertainment, lifestyle, and social impact, she champions local voices, sparks conversation, and builds collaborations that help African talent shine on both local and global stages.",
      achievements: [
        "Developed impactful PR and experiential campaigns at Filmhouse Group",
        "Promotes African creativity and storytelling across film and culture",
        "Advocates for local voices and collaborations within the African creative industry"
      ],
      expertise: [
        "Public Relations",
        "Digital Marketing",
        "Brand Communications",
        "Event Campaigns",
        "Creative Strategy"
      ],
      color: "green"
    },
    {
      name: "Lydia Shangu",
      title: "CEO, SBS Clean Energy | Petroleum Africa Liaison (Well Integrity Section)",
      country: "South Africa",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/lydia.jpg",
      flag: "https://flagcdn.com/w40/za.png",
      linkedin: "https://www.linkedin.com/in/queen-lydia-55972b1aa",
      description:
        "Experienced leader with a background in communication, marketing, events, petroleum, and mining sectors; currently CEO of SBS Clean Energy.",
      fullDescription:
        "My name is Lydia Shangu. I have a background in communication, marketing, event organization, the petroleum sector, and mining. I am currently the CEO of SBS Clean Energy, located in Cape Town, South Africa. I also serve as the Society Petroleum Africa liaison in the Well Integrity section, driving collaboration and innovation within the energy and petroleum sectors.",
      achievements: [
        "CEO of SBS Clean Energy in Cape Town, South Africa",
        "Serves as Petroleum Africa Liaison (Well Integrity Section)",
        "Extensive experience across communication, marketing, and energy industries"
      ],
      expertise: [
        "Energy Leadership",
        "Petroleum & Mining",
        "Corporate Communication",
        "Event Organization",
        "Marketing Strategy"
      ],
      color: "teal"
    },
    {
      name: "Isaac Tumelo Kgosiyareng",
      title: "CEO, Malakana Enterprises | International Trade Analyst, TradeAtlas GmbH",
      country: "Botswana",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/Isaac.png",
      flag: "https://flagcdn.com/w40/bw.png",
      linkedin: "https://www.linkedin.com/in/isaac-tumelo-kgosiyareng-599754138",
      description:
        "Dynamic business leader and international trade analyst leveraging over a decade of expertise in sales, marketing, and strategic business expansion.",
      fullDescription:
        "Isaac Tumelo Kgosiyareng is a dynamic business leader, mentor, and international trade analyst based in Gaborone, Botswana. He is the CEO of Malakana Enterprises, where he focuses on spearheading innovative strategies for business expansion, contract negotiation, and profitability, leveraging over a decade of expertise in sales and marketing. In parallel with his CEO role, Isaac serves as an International Trade Analyst for TradeAtlas GmbH in Germany, providing valuable market intelligence for strategic international alignments. His commitment to economic growth extends to his role as a Business Mentor at the CEDA (Citizen Entrepreneurial Development Agency), where he coaches and consults emerging enterprises. Isaac holds an Executive Master of Business Administration (EMBA) with a focus on Business Analytics from Eaton Business School and a Bachelor of Business Administration (BBA) in Marketing from the University of Botswana. He also possesses numerous professional certifications, including expertise in Satellite Communication (Intelsat Global VSAT Training) and various topics on leadership, governance, and analytics.",
      achievements: [
        "CEO of Malakana Enterprises in Gaborone, Botswana",
        "International Trade Analyst for TradeAtlas GmbH, Germany",
        "Business Mentor at CEDA (Citizen Entrepreneurial Development Agency)",
        "Holds an EMBA in Business Analytics and a BBA in Marketing",
        "Certified in Satellite Communication, Leadership, and Governance"
      ],
      expertise: [
        "International Trade Analysis",
        "Business Development",
        "Sales & Marketing Strategy",
        "Leadership & Mentorship",
        "Data-Driven Decision Making"
      ],
      color: "orange"
    },
    {
      name: t('homepage.ambassador.ambassadors.khensani.name'),
      title: t('homepage.ambassador.ambassadors.khensani.title'),
      country: t('homepage.ambassador.ambassadors.khensani.country'),
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/Mabunda.jpg",
      flag: "https://flagcdn.com/w40/za.png",
      linkedin: "https://www.linkedin.com/in/khensani-mabunda-4967181a0?originalSubdomain=za",
      description: t('homepage.ambassador.ambassadors.khensani.description'),
      fullDescription: t('homepage.ambassador.ambassadors.khensani.fullDescription'),
      achievements: t('homepage.ambassador.ambassadors.khensani.achievements'),
      expertise: t('homepage.ambassador.ambassadors.khensani.expertise'),
      color: "purple"
    }
  ];
  
  

  // Calculate total slides based on number of ambassadors (2 per slide)
  const slidesPerView = 2;
  const totalSlides = Math.ceil(ambassadors.length / slidesPerView);

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

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
  };

  // Slider navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Profile modal functions
  const openProfileModal = (ambassador) => {
    setSelectedAmbassador(ambassador);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setSelectedAmbassador(null);
    setIsProfileModalOpen(false);
  };

  // Get ambassadors for current slide
  const getCurrentSlideAmbassadors = () => {
    const startIndex = currentSlide * slidesPerView;
    return ambassadors.slice(startIndex, startIndex + slidesPerView);
  };

  return (
    <>
      <SEO
        title="PAAN Ambassador Program | Become a Leader in Africa's Creative Economy | Pan-African Agency Network"
        description="Join the exclusive PAAN Ambassador Program and become a trusted leader in Africa's creative, digital, and strategic industries. Represent the future of African agencies and unlock exclusive benefits, VIP access, and thought leadership opportunities across 20+ African countries."
        keywords="PAAN Ambassador Program, African creative leaders, African marketing ambassadors, African digital leaders, African strategic leadership, PAAN network ambassadors, African creative economy, African marketing network leadership, African agency representatives, African industry leaders, African creative professionals, African digital professionals, African strategic professionals, African marketing leadership, African creative leadership, African digital leadership, African strategic leadership, African industry ambassadors, African creative ambassadors, African digital ambassadors, African strategic ambassadors, African marketing ambassadors, African creative economy leaders, African digital economy leaders, African strategic economy leaders, African marketing economy leaders, African creative industry leaders, African digital industry leaders, African strategic industry leaders, African marketing industry leaders"
      />
      <main className="sm:px-0 sm:pt-0 relative">
        <Header />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <Hero openModal={openModal} />
        </motion.div>
        <motion.div className="bg-paan-blue relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <section className="relative mx-auto max-w-6xl mt-8 sm:mt-12 md:mt-20 px-4 sm:px-6 pb-16 sm:pb-20">
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
                <motion.div className="space-y-6" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <div className="space-y-4">
                    <h2 className="text-l sm:text-xl lg:text-2xl font-bold text-paan-dark-blue uppercase">
                        {t('homepage.ambassador.leadership.badge')}
                    </h2>
                    <h3 className="text-paan-dark-blue text-2xl sm:text-4xl font-normal leading-relaxed">
                        {t('homepage.ambassador.leadership.title')}
                    </h3>
                    </div>
                    
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed">
                    {t('homepage.ambassador.leadership.description1')}
                    </p>
                    
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed">
                        {t('homepage.ambassador.leadership.description2')}
                    </p>
                    <button 
                    onClick={openModal}
                    className="bg-paan-red border border-paan-red mt-10 text-white py-3 px-8 sm:px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-full sm:w-auto"
                    >
                        {t('homepage.ambassador.leadership.ctaButton')}
                    </button>
                </motion.div>
                
                <motion.div className="flex justify-center lg:justify-end" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <div className="w-full max-w-md lg:max-w-lg">
                    <Image
                        src="https://ik.imagekit.io/nkmvdjnna/PAAN/ambassador%20page/leadership-img.webp"
                        width={400}
                        height={400}
                        alt="Leadership illustration"
                    />
                    </div>
                </motion.div>
                </motion.div>
            </section>
        </motion.div>   
       

        <motion.div className="relative bg-[#172840]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
                <section className="relative">
                {/* Header Section */}
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
                    <motion.div className="space-y-4" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <h2 className="text-paan-yellow uppercase text-sm font-semibold tracking-wider">
                        {t('homepage.ambassador.whyMatters.badge')}
                    </h2>
                    <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light leading-tight">
                        {t('homepage.ambassador.whyMatters.title')}
                    </h3>
                    </motion.div>
                    <motion.div className="flex items-center" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <p className="text-white text-lg leading-relaxed">
                        {t('homepage.ambassador.whyMatters.description')}
                    </p>
                    </motion.div>
                </motion.div>

                {/* Feature Cards */}
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 lg:mb-16" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                    <motion.div className="bg-white rounded-xl px-4 py-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 min-h:[280px]" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <div className="mb-6">
                        <img
                        src="/assets/images/icons/open-doors.svg"
                        width="80"
                        height="80"
                        className="w-20 h-20"
                        alt="Open doors"
                        />
                    </div>
                    <p className="text-paan-dark-blue text-lg font-medium leading-relaxed">
                        {t('homepage.ambassador.whyMatters.features.openDoors')}
                    </p>
                    </motion.div>

                    <motion.div className="bg-white rounded-xl px-4 py-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 min-h-[280px]" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <div className="mb-6">
                        <img
                        src="/assets/images/icons/collaborate.svg"
                        width="80"
                        height="80"
                        className="w-20 h-20"
                        alt="Collaborate"
                        />
                    </div>
                    <p className="text-paan-dark-blue text-lg font-medium leading-relaxed">
                        {t('homepage.ambassador.whyMatters.features.represent')}
                    </p>
                    </motion.div>

                    <motion.div className="bg-white rounded-xl px-4 py-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 min-h-[280px]" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <div className="mb-6">
                        <img
                        src="/assets/images/icons/insights.svg"
                        width="80"
                        height="80"
                        className="w-20 h-20"
                        alt="Insights"
                        />
                    </div>
                    <p className="text-paan-dark-blue text-lg font-medium leading-relaxed">
                        {t('homepage.ambassador.whyMatters.features.insights')}
                    </p>
                    </motion.div>

                    <motion.div className="bg-white rounded-xl px-4 py-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 min-h-[280px]" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <div className="mb-6">
                        <img
                        src="/assets/images/icons/ecosystem.svg"
                        width="80"
                        height="80"
                        className="w-20 h-20"
                        alt="Ecosystem"
                        />
                    </div>
                    <p className="text-paan-dark-blue text-lg font-medium leading-relaxed">
                        {t('homepage.ambassador.whyMatters.features.ecosystem')}
                    </p>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
                    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <p className="text-white text-2xl sm:text-3xl font-light leading-tight">
                        {t('homepage.ambassador.whyMatters.cta')}
                    </p>
                    </motion.div>
                    <motion.div className="flex justify-start lg:justify-end" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                    <button 
                        onClick={openModal}
                        className="bg-paan-red border border-paan-red text-white py-4 px-8 sm:px-12 rounded-full hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg font-medium text-base"
                    >
                        {t('homepage.ambassador.whyMatters.ctaButton')}
                    </button>  
                    </motion.div>
                </motion.div>
                </section>
            </div>
        </motion.div>
        <div className="bg-white relative overflow-hidden">
          <section className="relative mx-auto max-w-6xl mt-16 sm:mt-24 md:mt-40 px-4 sm:px-6 pb-16 sm:pb-20">
            <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-10">
              <div className="flex flex-col gap-4 order-2 md:order-1">
                <Image 
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/ambassador%20page/influence-in-action.webp" 
                  width={300} 
                  height={200} 
                  alt="PAAN Summit" 
                  className="w-full h-auto object-cover rounded-lg" 
                />
              </div>
              
              <div className="flex flex-col order-1 md:order-2">
                <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl text-dark uppercase font-semibold">{t('homepage.ambassador.influence.badge')}</h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-dark font-normal leading-tight">
                {t('homepage.ambassador.influence.title')}
              </h2>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {t('homepage.ambassador.influence.description')}
                  </p>
                  
                  <div className="mt-6 sm:mt-8">
                    <ul className="space-y-3 sm:space-y-4">
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>            
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{t('homepage.ambassador.influence.responsibilities.resources')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg> 
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{t('homepage.ambassador.influence.responsibilities.engage')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>  
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{t('homepage.ambassador.influence.responsibilities.share')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>  
                        </span>
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{t('homepage.ambassador.influence.responsibilities.join')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="relative bg-paan-blue">
          <section className="relative mx-auto max-w-6xl mt-0 px-4 sm:px-6 pb-16 sm:pb-20">
            <div className="space-y-3 sm:space-y-4 text-center md:text-left pt-10">
              <h2 className="text-paan-dark-blue text-sm sm:text-md md:text-xl font-bold uppercase">{t('homepage.ambassador.rewards.badge')}</h2>
              <p className="text-paan-dark-blue text-xl sm:text-2xl mb-6 font-normal max-w-lg">{t('homepage.ambassador.rewards.subtitle')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-left text-left hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                  <div className="mb-6">
                    <img src="/assets/images/icons/recognition.svg" width="80" height="80" className="w-20 h-20" alt="Open doors" />
                  </div>
                  <h4 className="text-paan-dark-blue text-lg font-medium leading-relaxed text-left">{t('homepage.ambassador.rewards.benefits.recognition.title')}</h4>
                  <p className="text-paan-dark-blue text-md font-light leading-relaxed text-left">{t('homepage.ambassador.rewards.benefits.recognition.description')}</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-left text-left hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                  <div className="mb-6">
                    <img src="/assets/images/icons/vip.svg" width="80" height="80" className="w-20 h-20" alt="Open doors" />
                  </div>
                  <h4 className="text-paan-dark-blue text-lg font-medium leading-relaxed text-left">{t('homepage.ambassador.rewards.benefits.vipAccess.title')}</h4>
                  <p className="text-paan-dark-blue text-md font-light leading-relaxed text-left">{t('homepage.ambassador.rewards.benefits.vipAccess.description')}</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-left text-left hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                  <div className="mb-6">
                    <img src="/assets/images/icons/leadership.svg" width="80" height="80" className="w-20 h-20" alt="Open doors" />
                  </div>
                  <h4 className="text-paan-dark-blue text-lg font-medium leading-relaxed text-left">{t('homepage.ambassador.rewards.benefits.thoughtLeadership.title')}</h4>
                  <p className="text-paan-dark-blue text-md font-light leading-relaxed text-left">{t('homepage.ambassador.rewards.benefits.thoughtLeadership.description')}</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-8 flex flex-col items-left text-left hover:shadow-lg transition-shadow duration-300 min-h-[280px]">
                  <div className="mb-6">
                    <img src="/assets/images/icons/finance.svg" width="80" height="80" className="w-20 h-20" alt="Open doors" />
                  </div>
                  <h4 className="text-paan-dark-blue text-lg font-medium leading-relaxed text-left">{t('homepage.ambassador.rewards.benefits.financial.title')}</h4>
                  <p className="text-paan-dark-blue text-md font-light leading-relaxed text-left">{t('homepage.ambassador.rewards.benefits.financial.description')}</p>
                </div>
              </div>
            </div>            
          </section>
        </div>

        <AmbassadorPageParallax openModal={openModal} />
        {/* Ambassadors section */}
        <section className="relative bg-paan-dark-blue">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
            {/* Header */}
            <div className="flex items-start justify-between mb-12">
              <div className="text-left flex-1">
                <h2 className="text-paan-yellow uppercase text-xl font-light leading-tight mb-4">
                  {t('homepage.ambassador.ambassadors.badge')}
              </h2>
                <h3 className="text-white text-3xl sm:text-4xl font-medium mb-4">
                  {t('homepage.ambassador.ambassadors.title')}
              </h3>
                <p className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-3xl text-left">
                  {t('homepage.ambassador.ambassadors.description')}
                </p>
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 ml-8">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 border-2 border-white/30 text-white rounded-full hover:border-paan-yellow hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 border-2 border-white/30 text-white rounded-full hover:border-paan-yellow hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                  disabled={currentSlide === totalSlides - 1}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Leadership Cards Slider */}
            <div className="relative overflow-hidden">
              <div 
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      {ambassadors
                        .slice(slideIndex * slidesPerView, slideIndex * slidesPerView + slidesPerView)
                        .map((ambassador, index) => (
                          <AmbassadorCard 
                            key={`${slideIndex}-${index}`}
                            ambassador={ambassador}
                            onViewProfile={openProfileModal}
                          />
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-paan-yellow' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
        <div className="relative bg-gradient-to-b from-white to-gray-50">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-paan-dark-blue text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide mb-4">
                {t('homepage.ambassador.getStarted.badge')}
              </h2>
              <p className="text-paan-dark-blue text-2xl sm:text-3xl md:text-4xl font-light leading-tight">
                {t('homepage.ambassador.getStarted.title')}
              </p>
            </div>
            
            <div className="grid gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="group relative bg-white border-2 border-paan-dark-blue rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-paan-red/10 to-paan-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-1 -left-1 w-0 h-0 bg-gradient-to-br from-paan-red/20 to-transparent group-hover:w-32 group-hover:h-32 transition-all duration-700 ease-out rounded-br-full"></div>
                <div className="relative z-10">
                  <div className="absolute top-4 right-4 bg-paan-dark-blue text-white text-xs font-bold px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                    01
                  </div>
                  <div className="pr-12">
                    <h3 className="text-paan-dark-blue text-lg sm:text-xl font-bold uppercase mb-3 tracking-wide group-hover:text-paan-red transition-colors duration-300">
                      {t('homepage.ambassador.getStarted.steps.step1.title')}
                    </h3>
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed group-hover:text-paan-red transition-colors duration-300">
                      {t('homepage.ambassador.getStarted.steps.step1.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white border-2 border-paan-dark-blue rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-paan-yellow/10 to-paan-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-1 -right-1 w-0 h-0 bg-gradient-to-bl from-paan-yellow/20 to-transparent group-hover:w-32 group-hover:h-32 transition-all duration-700 ease-out rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="absolute top-4 right-4 bg-paan-dark-blue text-white text-xs font-bold px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                    02
                  </div>
                  <div className="pr-12">
                    <h3 className="text-paan-dark-blue text-lg sm:text-xl font-bold uppercase mb-3 tracking-wide group-hover:text-paan-yellow transition-colors duration-300">
                      {t('homepage.ambassador.getStarted.steps.step2.title')}
                    </h3>
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed group-hover:text-paan-yellow transition-colors duration-300">
                      {t('homepage.ambassador.getStarted.steps.step2.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white border-2 border-paan-dark-blue rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-paan-blue/10 to-paan-dark-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-1 -left-1 w-0 h-0 bg-gradient-to-tr from-paan-blue/20 to-transparent group-hover:w-32 group-hover:h-32 transition-all duration-700 ease-out rounded-tr-full"></div>
                <div className="absolute -bottom-1 -right-1 w-0 h-0 bg-gradient-to-tl from-paan-dark-blue/10 to-transparent group-hover:w-24 group-hover:h-24 transition-all duration-500 ease-out rounded-tl-full"></div>
                <div className="relative z-10">
                  <div className="absolute top-4 right-4 bg-paan-dark-blue text-white text-xs font-bold px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                    03
                  </div>
                  <div className="pr-12">
                    <h3 className="text-paan-dark-blue text-lg sm:text-xl font-bold uppercase mb-3 tracking-wide group-hover:text-paan-blue transition-colors duration-300">
                      {t('homepage.ambassador.getStarted.steps.step3.title')}
                    </h3>
                    <p className="text-paan-dark-blue text-base sm:text-lg leading-relaxed group-hover:text-paan-blue transition-colors duration-300">
                      {t('homepage.ambassador.getStarted.steps.step3.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ContactSection />
        <Footer />
        <BecomeAmbassadorModal isOpen={isModalOpen} onClose={closeModal} />
        <ScrollToTop />
        
        {/* Ambassador Profile Modal */}
        {isProfileModalOpen && selectedAmbassador && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] relative overflow-hidden flex flex-col">
              {/* Close button */}
              <button
                onClick={closeProfileModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-[#172840] hover:text-[#F25849] transition-all duration-300 z-10 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal content */}
              <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={selectedAmbassador.image} 
                    alt={selectedAmbassador.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-paan-red/20"
                  />
                  <div className="flex-grow">
                    <h2 className="text-2xl sm:text-3xl font-bold text-paan-dark-blue mb-2">
                      {selectedAmbassador.name}
                    </h2>
                    <p className="text-lg text-paan-dark-blue/80 font-medium mb-1">
                      {selectedAmbassador.title}
                    </p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={selectedAmbassador.flag} 
                        alt={`${selectedAmbassador.country} flag`}
                        className="w-6 h-4 rounded-sm"
                      />
                      <span className="text-paan-dark-blue/60 text-sm">
                        {selectedAmbassador.country}
                      </span>
                      <a
                        href={selectedAmbassador.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                          <g fill="none"><rect width="256" height="256" fill="#fff" rx="60"/><rect width="256" height="256" fill="#0a66c2" rx="60"/><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"/></g>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-paan-dark-blue mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {selectedAmbassador.fullDescription}
                  </p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    {selectedAmbassador.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                          </svg>
                        </span>
                        <span className="text-gray-700 text-sm sm:text-base">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expertise */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAmbassador.expertise.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-paan-red/10 text-paan-red px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

// Ambassador Card Component
const AmbassadorCard = ({ ambassador, onViewProfile }) => {
  const getButtonStyles = (color) => {
    switch (color) {
      case 'red':
        return 'bg-paan-red border-2 border-paan-red text-white hover:bg-paan-red/90 hover:border-paan-red/90';
      case 'yellow':
        return 'bg-paan-yellow border-2 border-paan-yellow text-paan-dark-blue hover:bg-paan-yellow/90 hover:border-paan-yellow/90';
      case 'blue':
        return 'bg-paan-blue border-2 border-paan-blue text-white hover:bg-paan-blue/90 hover:border-paan-blue/90';
      case 'green':
        return 'bg-paan-green border-2 border-paan-green text-white hover:bg-paan-green/90 hover:border-paan-green/90';
      case 'teal':
        return 'bg-paan-green border-2 border-paan-green text-white hover:bg-paan-green/90 hover:border-paan-green/90';
      case 'orange':
        return 'bg-paan-yellow border-2 border-paan-yellow text-paan-dark-blue hover:bg-paan-yellow/90 hover:border-paan-yellow/90';
      case 'purple':
        return 'bg-paan-purple border-2 border-paan-purple text-white hover:bg-paan-purple/90 hover:border-paan-purple/90';
      default:
        return 'bg-paan-red border-2 border-paan-red text-white hover:bg-paan-red/90 hover:border-paan-red/90';
    }
  };

  const getBorderColor = (color) => {
    switch (color) {
      case 'red':
        return 'border-paan-red/20 group-hover:border-paan-red/40';
      case 'yellow':
        return 'border-paan-yellow/20 group-hover:border-paan-yellow/40';
      case 'blue':
        return 'border-paan-blue/20 group-hover:border-paan-blue/40';
      case 'green':
        return 'border-paan-green/20 group-hover:border-paan-green/40';
      case 'teal':
        return 'border-paan-green/20 group-hover:border-paan-green/40';
      case 'orange':
        return 'border-paan-yellow/20 group-hover:border-paan-yellow/40';
      case 'purple':
        return 'border-paan-purple/20 group-hover:border-paan-purple/40';
      default:
        return 'border-paan-red/20 group-hover:border-paan-red/40';
    }
  };

  const getTextColor = (color) => {
    switch (color) {
      case 'red':
        return 'group-hover:text-paan-red';
      case 'yellow':
        return 'group-hover:text-paan-yellow';
      case 'blue':
        return 'group-hover:text-paan-blue';
      case 'green':
        return 'group-hover:text-paan-green';
      case 'teal':
        return 'group-hover:text-paan-green';
      case 'orange':
        return 'group-hover:text-paan-yellow';
      case 'purple':
        return 'group-hover:text-paan-purple';
      default:
        return 'group-hover:text-paan-red';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
      <div className="flex flex-col h-full">
        {/* Header with image and basic info */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            <img 
              src={ambassador.image} 
              width="80" 
              height="80" 
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 ${getBorderColor(ambassador.color)} transition-all duration-300`} 
              alt={ambassador.name} 
            />
          </div>
          
          <div className="flex-grow">
            <h3 className={`text-paan-dark-blue text-lg sm:text-xl font-bold mb-2 ${getTextColor(ambassador.color)} transition-colors duration-300`}>
              {ambassador.name}
            </h3>
            <p className={`text-paan-dark-blue/80 text-sm sm:text-base font-medium ${getTextColor(ambassador.color)}/80 transition-colors duration-300`}>
              {ambassador.title}
            </p>
            <p className="text-paan-dark-blue/60 text-sm mt-1">
              {ambassador.country}
            </p>
          </div>

          {/* Country Flag */}
          <div className="flex-shrink-0 w-8 h-6 rounded-sm overflow-hidden">
            <img 
              src={ambassador.flag} 
              alt={`${ambassador.country} flag`} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex-grow mb-6">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {ambassador.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onViewProfile(ambassador)}
            className={`${getButtonStyles(ambassador.color)} py-2.5 px-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 font-medium text-sm`}
          >
            View Profile
          </button>
          
          <a 
            href={ambassador.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
              <g fill="none"><rect width="256" height="256" fill="#fff" rx="60"/><rect width="256" height="256" fill="#0a66c2" rx="60"/><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"/></g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ openModal }) => {
  const { t } = useAppTranslations();
  
  return (
    <div
      className="relative h-screen w-full bg-gray-900 overflow-visible" 
      id="home"
    >
      {/* Background image positioned to cover full container */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/ambassador%20page/ambassador-hero.webp')"
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative h-full flex mx-auto max-w-6xl">
        <div className="w-full px-4 sm:px-6 md:px-8 pb-0 sm:pb-24 flex flex-col justify-center sm:justify-end h-full">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
            <h1 className="text-4xl text-white font-bold uppercase">
                {t('homepage.ambassador.hero.title')}
            </h1>
            <p className="text-white text-base sm:text-lg mb-6 font-light w-full leading-relaxed">
                {t('homepage.ambassador.hero.subtitle')}
            </p>  
            <button 
              onClick={openModal}
              className="bg-paan-red border border-paan-red text-white py-3 px-8 sm:px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-full sm:w-auto"
            >
                {t('homepage.ambassador.hero.ctaButton')}
            </button>             
          </div>
        </div>
      </div>
    </div>
  );
};

export default PAANAmbassador;