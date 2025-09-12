import SEO from "@/components/SEO";
import Header from "../layouts/summit-header";
import Image from "next/image";
import BreakoutSessions from "@/components/BreakoutSessions";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import BenefitsToggle from "@/components/BenefitsToggle";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import SeminarRegistration from "@/components/SeminarRegistration";
import { ctaButton } from "../data/summitMenu";
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";


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

  // Countdown timer state and logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date to April 23, 2026
  useEffect(() => {
    const targetDate = new Date('April 23, 2026 00:00:00');
    
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

        {/* Floating Countdown Box */}
        <div className="relative -mt-48 z-10">
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

        <div className="bg-[#172840] relative" id="about-us" ref={sectionRefs.about} handleScroll={handleScroll} isFixed={isFixed}>
        <section className="relative mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8 py-20 items-center">
            <div className="flex flex-col gap-4 z-0 pr-6">
              <h2 className="text-4xl text-yellow-400 uppercase font-semibold">About the Summit</h2>
              <h3 className="text-white text-xl text-left font-normal">The Pan-African Agency Network PAAN is set to host its inaugural summit in Nairobi, Kenya, 
                bringing together creative and tech leaders from across Africa and the diaspora.<br/><br/> 
                The summit promises to be a landmark event focused on collaboration, innovation, 
                and empowerment within Africa's creative and technology sectors.
              </h3>
            </div>
            <div className="flex justify-end">
              <img src="/assets/images/about-summit.webp" alt="PAAN Summit" className="h-[30rem] object-cover rounded shadow-lg" />
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

        <div className="mx-auto max-w-6xl my-20 relative">
          <section className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            {/* Image column - taking 1/3 of the space */}
            <div className="flex flex-col gap-4">
              <div className="w-full relative overflow-hidden rounded-lg">
                <img 
                  src="/assets/images/about-paan-1.webp" 
                  alt="Breakout session 1" 
                  className="object-cover w-full h-64"
                />
              </div>
              <div className="w-full relative overflow-hidden rounded-lg">
                <img 
                  src="/assets/images/about-paan-2.webp" 
                  alt="Breakout session 2" 
                  className="object-cover w-full h-64"
                />
              </div>
            </div>
            
            {/* Content column - taking 2/3 of the space */}
            <div className="flex flex-col gap-4 col-span-2" id="highlights" ref={sectionRefs.highlights} handleScroll={handleScroll} isFixed={isFixed}>
              <h2 className="text-4xl uppercase font-bold">About PAAN</h2>
              <h3 className="text-md text-left font-normal">PAAN is a bold alliance of independent agencies across Africa and the diaspora.
                Empowering African agencies through partnerships, shared resources and advocacy to deliver world-class solutions.</h3>
              <h4 className="font-normal">Summit Highlights</h4>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icon-1.webp"
                  width={60}
                  height={60}
                  alt="Keynotes & Showcases"
                />
                <div>
                  <h4 className="text-sm text-red-500 font-bold mb-2">Keynotes & Showcases</h4>
                  <p className="text-sm font-base">
                    The summit will feature powerful keynotes and showcases from Africa's brightest creative and tech minds.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icon-2.webp"
                  width={60}
                  height={60}
                  alt="Networking Opportunities"
                />
                <div>
                  <h4 className="text-sm text-red-500 font-bold mb-2">Networking Opportunities</h4>
                  <p className="text-sm font-base">
                    Attendees will have the chance to connect with peers, potential collaborators, and industry leaders.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icon-3.webp"
                  width={60}
                  height={60}
                  alt="Workshops & Panels"
                />
                <div>
                  <h4 className="text-sm text-red-500 font-bold mb-2">Workshops & Panels</h4>
                  <p className="text-sm font-base">
                    Interactive sessions designed to equip agencies with practical strategies for scaling, winning global clients, and building sustainable operations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-[#F25849] -z-10 relative" id="themes" ref={sectionRefs.themes} handleScroll={handleScroll} isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
            <KeynotePanels/>
          </section>
        </div>

        <div className="mx-auto max-w-6xl mt-20" id="sessions" ref={sectionRefs.sessions} handleScroll={handleScroll} isFixed={isFixed}>          
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">            
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl uppercase font-bold text-left text-black mb-12">Breakout Sessions</h2>
              <BreakoutSessions />
            </div>
            <div className="relative flex flex-col gap-6 h-full">
              <img 
                src="/assets/images/breakout-session-1.webp" 
                alt="Breakout session 1" 
                className="rounded-lg object-cover w-full h-64 sm:h-1/2"
              />
              <img 
                src="/assets/images/breakout-session-2.webp" 
                alt="Breakout session 2" 
                className="rounded-lg object-cover w-full h-64 sm:h-1/2"
              />
            </div>
          </section>
        </div>

        <div className="bg-[#84C1D9] relative mt-10 py-10" id="whoShouldAttend" ref={sectionRefs.whoShouldAttend} handleScroll={handleScroll} isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
            <h2 className="text-3xl uppercase font-bold text-center text-black mb-12">WHAT TO LOOK FORWARD TO</h2>
            <BenefitsToggle />
          </section>
        </div>

        <div className="bg-[#D1D3D4] relative py-10" id="tickets" ref={sectionRefs.tickets} handleScroll={handleScroll} isFixed={isFixed}>
          <section className="relative mx-auto max-w-6xl">
            <SeminarRegistration />
          </section>
        </div>
        
        <Footer />
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

const  KeynotePanels =()=> {
  const themes = [
    {
      title: "Africa's Creative Future",
      description: "Where Brands, Tech & Talent Collide- Opening keynote setting the tone for collaboration and innovation.",
      icon: <Image
      src="/assets/images/icons/brain-icon.webp"
      width={100}
      height={100}
      alt="Pan-African Reach"
    />,
    },
    {
      title: "The Power of Partnership",
      description: "How African agencies and brands are building together — real stories co-presented by agency and client leaders.",
      icon: <Image
      src="/assets/images/icons/hands-icon.webp"
      width={120}
      height={120}
      alt="Pan-African Reach"
    />,
    },
    {
      title: "Tech Meets Creativity",
      description: "Driving results through innovation with Africa's top tech and martech partners.",
      icon: <Image
      src="/assets/images/icons/tech-icon.webp"
      width={100}
      height={100}
      alt="Pan-African Reach"
    />,
    },
    {
      title: "The World Of Data",
      description: "How data is transforming strategy and innovation across African markets and industries.",
      icon: <Image
      src="/assets/images/icons/graph-icon.webp"
      width={100}
      height={100}
      alt="Pan-African Reach"
    />,
    },
  ];

  return (
    <div>
      <section className="relative mx-auto max-w-6xl py-20">
        <h2 className="text-3xl uppercase font-bold text-center text-white mb-12">MAIN THEMES AND KEYNOTE PANELS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {themes.map((theme, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg flex">
              {/* left margin */}
              <div className="w-4 bg-[#84C1D9]"></div>
              {/* Content container */}
              <div className="flex p-6 flex-1">
                {/* Icon */}
                <div className="mr-6 flex items-start">
                  {theme.icon}
                </div>
                
                {/* Title and description */}
                <div className="flex flex-col">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{theme.title}</h3>
                  <p className="text-gray-600">{theme.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SummitPage;