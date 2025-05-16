import SEO from "@/components/SEO";
import Header from "../layouts/header";
import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { Globe, Users, Cpu, BarChart3 } from "lucide-react";
import BreakoutSessions from "@/components/BreakoutSessions";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import BenefitsToggle from "@/components/BenefitsToggle";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import SeminarRegistration from "@/components/SeminarRegistration";

const FreelancersPage = () => {
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
        title="Pan-African Agency Network (PAAN) | Redefining Africa's Creative & Tech Footprint"
        description="Discover the Pan-African Agency Network (PAAN), a dynamic alliance of creative and tech agencies across Africa and the diaspora. Join us to unlock global opportunities, access exclusive resources, and collaborate with top talent to redefine Africa's creative and technological footprint. Explore our membership tiers, services, and upcoming events today!"
        keywords="Pan-African Agency Network, PAAN, African agencies, creative network, tech network, collaboration, innovation, global influence"
      />
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />

        <Hero/>

        <div className="bg-[#172840] relative">
        <section className="relative z-10 mx-auto max-w-6xl">
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
              <img src="/assets/images/mission.jpg" alt="PAAN Summit" className="h-96 object-cover rounded shadow-lg" />
            </div>
          </div>
        </section>
        <Image
          src="/assets/images/bg-pattern.svg"
          width={0}
          height={0}
          alt="Background Pattern"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-10"
        />
      </div>

        <div
          className="mx-auto max-w-6xl mt-20 mb-20 relative"
        >
          <section className="relative z-10">
          </section>
          <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6">
              <Image
                src="/assets/images/about-paan-1.png"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-64"
              />
              <Image
                src="/assets/images/about-paan-2.png"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl uppercase font-bold">About PAAN</h2>
              <h3 className="text-md text-left font-normal">PAAN is a bold alliance of independent agencies across Africa and the diaspora.
                Empowering African agencies through partnerships, shared resources and advocacy to deliver world-class solutions.</h3>
              <h4 className="font-normal">Summit Highlights</h4>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={40}
                  height={40}
                  alt="Pan-African Reach"
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
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={40}
                  height={40}
                  alt="Pan-African Reach"
                />
                <div>
                  <h4 className="text-sm text-red-500 font-bold mb-2">Networking Opportunities</h4>
                  <p className="text-sm font-base">
                    Attendees will have the chance to connect with peers, potential collaborators, and industry leaders.​
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={40}
                  height={40}
                  alt="Pan-African Reach"
                />
                <div>
                  <h4 className="text-sm text-red-500 font-bold mb-2">Workshops & Panels</h4>
                  <p className="text-sm font-base">
                    Interactive sessions designed to equip agencies with practical strategies for scaling, winning global clients, and building sustainable operations.​​
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-[#F25849] -z-10 relative">
          <section className="relative z-10 mx-auto max-w-6xl">
            <KeynotePanels/>
          </section>
        </div>

        <div className="mx-auto max-w-6xl mt-20">          
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">            
            <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
              <h2 className="text-3xl uppercase font-bold text-left text-black mb-12">Breakout Sessions</h2>
              <BreakoutSessions />
            </div>
            <div className="relative col-span-1 sm:col-span-1 flex flex-col gap-6">
              <img 
                src="/assets/images/breakout-session-1.png" 
                alt="Breakout session 1" 
                className="rounded-lg object-cover w-full h-64"
              />
              <img 
                src="/assets/images/breakout-session-2.png" 
                alt="Breakout session 2" 
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
          </section>
        </div>

        <div className="bg-[#84C1D9] -z-10 relative mt-10 py-10">
          <section className="relative z-10 mx-auto max-w-6xl">
            <h2 className="text-3xl uppercase font-bold text-center text-black mb-12">WHAT TO LOOK FORWARD TO</h2>
            <BenefitsToggle />
          </section>
        </div>

        <div className="bg-[#D1D3D4] -z-10 relative py-10">
          <section className="relative z-10 mx-auto max-w-6xl">
            <SeminarRegistration />
          </section>
        </div>
        
        <Footer />
      </main>
    </>
  );
};

const Hero = () => {

  return (
    <div
      className="relative h-screen w-full bg-white" 
      id="home"
    >
      {/* Background image as an overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: "url('/assets/images/freelancer-hero.png')"
        }}
      />
             
      {/* Content overlay */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-6xl px-6 md:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-[#172840] text-4xl md:text-5xl font-bold mb-4 relative">
              <span className="relative inline-block">
                <span className="text-[#F25849] relative z-10">Freelance</span>
                <img 
                  src="/assets/images/sketch-1.png" 
                  alt="" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto z-0"
                  style={{ width: '120%', height: 'auto' }}
                />
              </span> with Purpose. Grow with Structure & Scale
            </h2>
            
            <p className="text-[#172840] text-lg mb-8">
              Join Africa's premier network of vetted creative, technical, and strategic talent—powering high-impact campaigns across the continent.
            </p>
            
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-[#172840] text-sm flex items-center whitespace-nowrap">
                <div className="flex items-center justify-center bg-[#F2B706] rounded-full p-1 mr-2">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.92 14.05L6.5 12.38l1.41-1.41 2.17 2.17 5.84-5.84 1.41 1.41-7.25 7.34z" />
                  </svg>
                </div>
                <p>Trusted by agencies in <span className="font-bold">20+ African countries</span></p>
              </div>
              <div className="text-[#172840] text-sm flex items-center whitespace-nowrap">
                <div className="flex items-center justify-center bg-[#F2B706] rounded-full p-1 mr-2">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.92 14.05L6.5 12.38l1.41-1.41 2.17 2.17 5.84-5.84 1.41 1.41-7.25 7.34z" />
                  </svg>
                </div>
                <p>Backed by the <span className="font-bold">Pan-African Agency Network (PAAN)</span></p>
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-[#F25849] text-white py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 font-medium text-lg"
            >
              Become a Certified PAAN Freelancer
            </button>            
          </div>
          <div className="relative">
              <div className="flex flex-row w-full h-64 gap-5 overflow-hidden">
              <img 
                src="/assets/images/freelancer-1.png" 
                alt="Hero image 1"
                className="w-1/5 h-full object-cover"
              />
              <img 
                src="/assets/images/freelancer-2.png" 
                alt="Hero image 2"
                className="w-1/5 h-full object-cover"
              />
              <img 
                src="/assets/images/freelancer-3.png" 
                alt="Hero image 3"
                className="w-1/5 h-full object-cover"
              />
              <img 
                src="/assets/images/freelancer-4.png" 
                alt="Hero image 4"
                className="w-1/5 h-full object-cover"
              />
              <img 
                src="/assets/images/freelancer-5.png" 
                alt="Hero image 5"
                className="w-1/5 h-full object-cover"
              />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const  KeynotePanels =()=> {
  const themes = [
    {
      title: "Africa's Creative Future",
      description: "Where Brands, Tech & Talent Collide- Opening keynote setting the tone for collaboration and innovation.",
      icon: <Globe className="text-black w-10 h-10" />,
    },
    {
      title: "The Power of Partnership",
      description: "How African agencies and brands are building together — real stories co-presented by agency and client leaders.",
      icon: <Users className="text-black w-10 h-10" />,
    },
    {
      title: "Tech Meets Creativity",
      description: "Driving results through innovation with Africa’s top tech and martech partners.",
      icon: <Cpu className="text-black w-10 h-10" />,
    },
    {
      title: "The World Of Data",
      description: "How data is transforming strategy and innovation across African markets and industries.",
      icon: <BarChart3 className="text-black w-10 h-10" />,
    },
  ];

  return (
    <div>
      <section className="relative z-10 mx-auto max-w-6xl py-20">
        <h2 className="text-3xl uppercase font-bold text-center text-white mb-12">MAIN THEMES AND KEYNOTE PANELS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {themes.map((theme, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg flex">
              {/* left margin */}
              <div className="w-2 bg-[#84C1D9]"></div>
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

export default FreelancersPage;