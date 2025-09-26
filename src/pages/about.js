import SEO from "@/components/SEO";
import Header from "../layouts/standard-header";
import Image from "next/image";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import Parallax from "@/components/AboutParallax";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import { useAppTranslations } from '../hooks/useTranslations';

const about = () => {
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
    setCurrentSlide((prev) => (prev + 1) % 1); // Only 1 slide since we have 2 cards
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 1) % 1); // Only 1 slide since we have 2 cards
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
        <div className="bg-[#E6F3F7] relative">
          <section className="relative text-center mx-auto max-w-6xl py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-3">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"> 
                    <img 
                      src="assets/images/icons/book.svg" 
                      alt="Book Icon" 
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>
                </div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold">200+</h4> 
                <h5 className="text-sm sm:text-base font-normal">Independent Agencies</h5>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-3">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                      <img src="https://flagcdn.com/w40/ke.png" alt="Kenya" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                      <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                      <img src="https://flagcdn.com/w40/za.png" alt="South Africa" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                      <img src="https://flagcdn.com/w40/tz.png" alt="Tanzania" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                      <img src="https://flagcdn.com/w40/ug.png" alt="Uganda" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                      <img src="https://flagcdn.com/w40/gh.png" alt="Ghana" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold">20+</h4> 
                <h5 className="text-sm sm:text-base font-normal">Countries</h5>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-3">
                  <div className="flex items-center justify-center w-28">
                    <img 
                      src="assets/images/icons/users.png" 
                      alt="Users Icon" 
                      className="w-auto h-auto"
                    />
                  </div>
                </div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold">2,000+</h4> 
                <h5 className="text-sm sm:text-base font-normal">Freelancers</h5>
              </div>  
              
              <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-3">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                    <img 
                      src="assets/images/icons/infinite.png" 
                      alt="Infinite Icon" 
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>
                </div>
                <h5 className="text-sm sm:text-base font-normal">Collaboration Potential</h5>
              </div>               
            </div>           
          </section>
        </div>

        {/* Our Solution */}
        <div className="bg-paan-dark-blue py-20 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content Column */}
              <div className="flex flex-col gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-3xl lg:text-4xl text-white leading-tight">
                    The Challenge We're Solving
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Africa has over 30,000 agencies and millions of freelancers. Yet many operate in isolation, 
                    with minimal cross-border collaboration. The result? A continent overflowing with creativity 
                    but underrepresented on the global stage.
                  </p>
                </div>
                
                {/* Challenge Points */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/10">
                    <div className="flex-shrink-0">
                      <Image
                        src="/assets/images/icons/pan-african-reach.svg"
                        width={48}
                        height={48}
                        alt="Pan-African Reach"
                        className="w-12 h-12"
                      />
                    </div>
                    <p className="text-lg font-medium text-white">
                      Agencies Compete in Silos
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/10">
                    <div className="flex-shrink-0">
                      <Image
                        src="/assets/images/icons/strategic-collaboration.svg"
                        width={48}
                        height={48}
                        alt="Strategic Collaboration"
                        className="w-12 h-12"
                      />
                    </div>
                    <p className="text-lg font-medium text-white">
                      Freelancers Hustle Alone
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/10">
                    <div className="flex-shrink-0">
                      <Image
                        src="/assets/images/icons/innovation-driven.svg"
                        width={48}
                        height={48}
                        alt="Innovation-Driven"
                        className="w-12 h-12"
                      />
                    </div>
                    <p className="text-lg font-medium text-white">
                      Knowledge-Sharing is Limited
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Image Column */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute transform scale-105"></div>
                  <Image
                    src="/assets/images/challenges-image.png"
                    width={500}
                    height={500}
                    alt="Pan-African Creative Challenges"
                    className="relative w-full max-w-md lg:max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Our Vision */}
        <div className="relative py-20" id="stats-section" isFixed={isFixed}>
          {/* Background video */}
          <div className="absolute inset-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-30"
            >
              <source src="/assets/videos/2.webm" type="video/webm" />
            </video>
          </div>
          
          {/* Background clip art overlay */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://ik.imagekit.io/nkmvdjnna/PAAN/about/clip-art.png" 
              alt="Background clip art" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Yellow overlay */}
          <div className="absolute inset-0 bg-paan-yellow opacity-[20%]"></div>
          
          <section className="relative mx-auto max-w-6xl flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-bold">Our Vision</h3>
                    <p className="text-xl font-normal">
                        A borderless African creative economy where ideas and talent flow freely, agencies and freelancers collaborate seamlessly, and Africa exports world-class work to the globe.
                        PAAN is building the infrastructure, relationships, and platforms to make this a reality.
                    </p>
                </div>             
            </div>
          </section>
        </div>

        {/* Our ecosystem */}
        <div className="bg-white relative mt-10 py-20" isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
            <div className="text-left mb-12 space-y-4">
              <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Our Ecosystem</h3>
              <p className="text-xl font-normal text-paan-dark-blue mb-4">We connect the dots across Africa's creative economy.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="rounded-xl shadow-xl overflow-hidden relative h-80 bg-cover bg-center" style={{backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/about/agencies.png')"}}>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
                
                {/* Text overlay at bottom */}
                <div className="absolute bottom-0 mb-2 left-0 right-0 p-6 text-left">
                  <h4 className="text-xl font-bold text-white mb-2">Agencies</h4>
                  <p className="text-white mb-4">200+ firms in marketing, PR, design, digital & more.</p>
                </div>
                
                {/* Pattern at very bottom */}
                <div className="absolute bottom-0 left-0 right-0 w-full h-[20px] sm:h-[30px] md:h-[40px]">
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
              
              <div className="rounded-xl shadow-xl overflow-hidden relative h-80 bg-cover bg-center" style={{backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/about/freelancers.png')"}}>
                <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
                <div className="absolute bottom-0  mb-2 left-0 right-0 p-6 text-left">
                  <h4 className="text-xl font-bold text-white mb-2">Freelancers</h4>
                  <p className="text-white mb-4">Millions of creatives empowered through collaboration.</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 w-full h-[20px] sm:h-[30px] md:h-[40px]">
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
              
              <div className="rounded-xl shadow-xl overflow-hidden relative h-80 bg-cover bg-center" style={{backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/about/clients.png')"}}>
                <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
                <div className="absolute bottom-0 mb-2 left-0 right-0 p-6 text-left">
                  <h4 className="text-xl font-bold text-white mb-2">Clients</h4>
                  <p className="text-white mb-4">Trusted, scalable solutions across markets.</p>
                </div>
                <div className="absolute bottom-0 mb-2 left-0 right-0 w-full h-[20px] sm:h-[30px] md:h-[40px]">
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
              
              <div className="rounded-xl shadow-xl overflow-hidden relative h-80 bg-cover bg-center" style={{backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/about/partners.png')"}}>
                <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
                <div className="absolute bottom-0 mb-2 left-0 right-0 p-6 text-left">
                  <h4 className="text-xl font-bold text-white mb-2">Partners</h4>
                  <p className="text-white mb-4">Tech, education & innovation enablers strengthening the landscape.</p>
                </div>
                <div className="absolute bottom-0 mb-2 left-0 right-0 w-full h-[20px] sm:h-[30px] md:h-[40px]">
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

       {/*Our partners*/}       
        <div className="bg-[#E6F3F7] relative overflow-hidden">
          <section className="relative mx-auto max-w-6xl mt-10 sm:mt-20 md:mt-20 px-4 sm:px-6 pb-20 sm:pb-28">
            <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-bold">Our Partners</h3>
                <div className="flex justify-between">
                    <p className="text-lg">We collaborate with organizations across Africa and beyond to<br/> strengthen the creative economy.</p>
                    <button 
                    className="bg-paan-red border border-paan-red text-white py-3 px-8 sm:px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-full sm:w-auto"
                    >
                        Become a Partner
                    </button> 
                </div>
            </div>            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-10">
              {/* Partner 1 */}
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow duration-300">
                <img 
                  src="/assets/images/partners/ICCO.png" 
                  alt="Partner 1"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Partner 2 */}
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow duration-300">
                <img 
                  src="/assets/images/partners/ams.png" 
                  alt="Partner 2"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Partner 3 */}
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow duration-300">
                <img 
                  src="/assets/images/partners/digitech.png" 
                  alt="Partner 3"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Partner 4 */}
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow duration-300">
                <img 
                  src="/assets/images/partners/IAN.png" 
                  alt="Partner 4"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Partner 5 */}
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow duration-300">
                <img 
                  src="/assets/images/partners/PRCA.png" 
                  alt="Partner 5"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Partner 6 */}
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow duration-300">
                <img 
                  src="/assets/images/partners/aia.svg" 
                  alt="Partner 6"
                  className="max-h-full max-w-full object-contain invert"
                />
              </div>
              
              {/* Partner 7 */}
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow duration-300">
                <img 
                  src="/assets/images/partners/bluehalo.svg" 
                  alt="Partner 7"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Partner 8 */}
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow duration-300">
                <img 
                  src="/assets/images/partners/cevent.png" 
                  alt="Partner 8"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Our theory of change */}
        <div className="bg-white">
            <section className="relative mx-auto max-w-6xl py-10">
                <div className="flex flex-col gap-4 py-10">
                    <h3 className="font-bold text-4xl">Our Theory of Change</h3>
                    <p className="text-xl">We believe Africa’s creative economy can thrive through unity, collaboration, and shared growth. PAAN’s theory of change is built on three pillars:</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-10">
                    <div className="bg-paan-red rounded-xl shadow-xl overflow-hidden relative">
                    <div className="p-6 pt-8 text-left">
                        <div className="flex justify-start mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/about/integration.png"
                            alt="Who Should Attend"
                            width={80}
                            height={80}
                            className="w-20 h-20"
                        />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Integration</h4>
                        <p className="text-white mb-8">Breaking borders between agencies, freelancers, and markets.</p>
                    </div>
                    </div>
                    <div className="bg-paan-red rounded-xl shadow-xl overflow-hidden relative">
                        <div className="p-6 pt-8 text-left">
                            <div className="flex justify-start mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/about/capacity-building.png"
                                alt="Who Should Attend"
                                width={80}
                                height={80}
                                className="w-20 h-20"
                            />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Capacity Building</h4>
                            <p className="text-white mb-8">Upskilling via PAAN Academy and shared learning.</p>
                        </div>
                    </div>
                    <div className="bg-paan-red rounded-xl shadow-xl overflow-hidden relative">
                        <div className="p-6 pt-8 text-left">
                            <div className="flex justify-start mb-6">
                            <Image
                                src="https://ik.imagekit.io/nkmvdjnna/PAAN/about/market-access.png"
                                alt="Who Should Attend"
                                width={80}
                                height={80}
                                className="w-20 h-20"
                            />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Market Access & Collaboration</h4>
                            <p className="text-white mb-8">Market Access & Collaboration Co-create, pitch, and deliver regional & global projects.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
       

        <Parallax />
        <Footer />
        <ScrollToTop />
      </main>
    </>
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
          backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/about/hero.webp?updatedAt=1758798216765')"
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative h-full flex mx-auto max-w-6xl">
        <div className="w-full px-4 sm:px-6 md:px-8 pb-0 sm:pb-24 flex flex-col justify-center sm:justify-end h-full">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
            <h1 className="text-4xl text-white font-bold uppercase">
                Borderless Creativity.<br/> One Africa. Global Impact.
            </h1>
            <p className="text-white text-base sm:text-lg mb-6 font-light w-full leading-relaxed">
                The Pan-African Agency Network (PAAN) is a collaborative ecosystem bringing together agencies, freelancers, clients, and partners across Africa. 
                We exist to transform a fragmented industry into a united creative force capable of shaping global markets.
            </p>  
            <div className="flex gap-4">
                <button 
                onClick={openModal}
                className="bg-paan-red border border-paan-red text-white py-3 px-8 sm:px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-full sm:w-auto"
                >
                    Join the Network
                </button> 
                <button 
                onClick={openModal}
                className="bg-paan-blue border border-paan-blue text-paan-dark-blue py-3 px-8 sm:px-10 rounded-full hover:bg-paan-dark-blue hover:text-white hover:border-paan-dark-blue transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm w-full sm:w-auto"
                >
                    See the challenge
                </button> 
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;