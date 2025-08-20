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
              "image": ["https://paan.africa/assets/images/hero.png"],
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

        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} />

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
              <img src="/assets/images/about-summit.png" alt="PAAN Summit" className="h-[30rem] object-cover rounded shadow-lg" />
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
                  src="/assets/images/icon-1.png"
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
                  src="/assets/images/icon-2.png"
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
                  src="/assets/images/icon-3.png"
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

const Hero = ({ sectionRefs, handleScroll, isFixed }) => {
  // Countdown timer state and logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date to October 22, 2025
  useEffect(() => {
    const targetDate = new Date('October 22, 2025 00:00:00');
    
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
            backgroundImage: "url('/assets/images/hero.webp')",
            filter: "brightness(0.5)" // Darkening the image
          }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-6xl px-4 md:px-6 w-full">
            <div className="max-w-2xl">
            <h3 className="text-md text-yellow-400 mb-1">PAAN Inaugural Summit 2025</h3>
              <h1 className="text-3xl md:text-3xl font-semibold uppercase text-yellow-400 mb-8">
                Where Africa's Creative<br/>
                and Tech Leaders Unite
              </h1>
              <p className="text-gray-100 font-normal mb-8">
                    Join the first-ever Pan-African Agency Network (PAAN) Summit — <br/>
                    a landmark gathering of bold thinkers and changemakers shaping Africa's creative and tech industries.
              </p>
              <div className="flex md:flex-row flex-col gap-4 mb-10">
                <SeminarLocationAndDate />
              </div>
              <div>
                <p className="text-white text-xs italic">Be part of history. Be part of the movement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed countdown bar at bottom of screen */}
      <div className="fixed bottom-0 left-0 right-0 w-full z-50 shadow-lg border-t border-gray-200"
          style={{ background: 'linear-gradient(to right, #87CEEB, #B0E0E6)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-3">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full">
              <div className="text-center md:text-left">
                  <h3 className="text-lg font-medium text-[#172840] mb-1">Limited Seats Available</h3>
              </div>
              <div className="flex justify-center space-x-6">
                  <div className="text-center">
                  <div className="text-2xl font-bold text-[#172840] bg-blue-100 px-3 py-1 rounded">
                      {timeLeft.days}
                      <div className="text-xs text-gray-600">DAYS</div>
                  </div>
                  </div>
                  <div className="text-center">
                  <div className="text-2xl font-bold text-[#172840] bg-blue-100 px-3 py-1 rounded">
                      {timeLeft.hours}
                      <div className="text-xs text-gray-600">HOURS</div>
                  </div>
                  </div>
                  <div className="text-center">
                  <div className="text-2xl font-bold text-[#172840] bg-blue-100 px-3 py-1 rounded">
                      {timeLeft.minutes}
                      <div className="text-xs text-gray-600">MINUTES</div>
                  </div>
                  </div>
                  <div className="text-center">
                  <div className="text-2xl font-bold text-[#172840] bg-blue-100 px-3 py-1 rounded">
                      {timeLeft.seconds}
                      <div className="text-xs text-gray-600">SECONDS</div>
                  </div>
                  </div>
              </div>
              </div>
              <div className="mt-3 md:mt-0">
              <button
                href={ctaButton.href}
                onClick={(e) => handleScroll(e, ctaButton.href, isFixed)}
                className={`bg-[#172840] text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-[#D32F2F] transition duration-300 shadow ${isFixed ? 'fixed-class' : ''}`}
                style={{ minWidth: '140px', textAlign: 'center' }}
              >
                Register Now
              </button>
              </div>
          </div>
      </div>
    </>
  );
};

const SeminarLocationAndDate = ()=> {
    
  return (
    <div className="flex md:flex-row flex-col gap-4">
      <div className="flex items-center gap-2 text-white text-sm">
<Icon icon="mdi:map-marker" className="text-red-500" width="24" height="24" />
        <span>Nairobi, Kenya</span>
      </div>
      
      <div className="flex items-center gap-2 text-white text-sm">
<Icon icon="mdi:calendar" className="text-red-500" width="24" height="24" />
        <span>22-24 October 2025</span>
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
      src="/assets/images/icons/brain-icon.png"
      width={100}
      height={100}
      alt="Pan-African Reach"
    />,
    },
    {
      title: "The Power of Partnership",
      description: "How African agencies and brands are building together — real stories co-presented by agency and client leaders.",
      icon: <Image
      src="/assets/images/icons/hands-icon.png"
      width={120}
      height={120}
      alt="Pan-African Reach"
    />,
    },
    {
      title: "Tech Meets Creativity",
      description: "Driving results through innovation with Africa's top tech and martech partners.",
      icon: <Image
      src="/assets/images/icons/tech-icon.png"
      width={100}
      height={100}
      alt="Pan-African Reach"
    />,
    },
    {
      title: "The World Of Data",
      description: "How data is transforming strategy and innovation across African markets and industries.",
      icon: <Image
      src="/assets/images/icons/graph-icon.png"
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