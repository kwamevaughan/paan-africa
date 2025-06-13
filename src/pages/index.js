// pages/index.js
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import CustomSlider from "../components/CustomSlider";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Tier1 from "@/components/Tier1";
import Tier2 from "@/components/Tier2";
import Tier3 from "@/components/Tier3";
import OfferingTab from "@/components/OfferingTab";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import ContactSection from "@/components/ContactSection";
import AgencyEnquiryModal from "@/components/AgencyEnquiryModal";
import AgenciesMarquee from "@/components/AgenciesMarquee";
import AgencyLogosGrid from "@/components/AgencyLogosGrid";
import ScrollToTop from "@/components/ScrollToTop";

const HomePage = () => {
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        <Header/>

        <div
          className="mx-auto max-w-6xl section pt-0 mt-32 sm:mt-0"
          id="home"
          ref={sectionRefs.home}
        >
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl md:text-5xl font-semibold uppercase text-[#172840]">
                Redefining Africa's Global Creative & Tech Footprint
              </h2>
              <p className="text-gray-500 font-normal">
                The Pan-African Agency Network (PAAN) is a bold alliance of
                independent agencies across Africa and the diaspora. We're on a
                mission to transform fragmentation into unity and potential into
                global influence.
              </p>
              <div className="flex md:flex-row flex-col gap-4">
                <button                  
                  className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300"
                  onClick={openModal}
                >
                  Join The Network
                </button>
                <Link href="https://member-portal.paan.africa/"
                  className="bg-[#84C1D9] text-[#172840] px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7]"
                >
                  Members Portal
                </Link>
              </div>
            </div>
            <div>
              <CustomSlider />
            </div>
          </section>
        </div>

        <div className="relative h-64 mt-[-10em] top-10 z-[-1]">
          <Image
            src="/assets/images/bg-pattern.svg"
            width={0}
            height={0}
            alt="bg-pattern"
            className="absolute top-0 left-0 w-screen h-full object-cover z-[-1]"
          />
        </div>

        <div
          className="mx-auto max-w-6xl relative section mb-10"
          id="about-us"
          ref={sectionRefs.aboutUs}
        >
          <div className="absolute -top-36 -left-36 w-28 h-28 bg-[#F2B706] rounded-full z-0"></div>
          {/* <div className="absolute -top-10 -right-20 w-16 h-16 bg-[#F25849] rounded-full z-0"></div> */}
          <div className="absolute bottom-60 -left-20 w-11 h-11 bg-[#D1D3D4] rounded-full z-0"></div>
          {/* <div className="absolute bottom-0 -right-10 w-11 h-11 bg-[#172840] rounded-full z-0"></div> */}
          <section className="relative z-10">
            <p className="uppercase font-semibold mb-4">2. Who We Are</p>
            <p className="text-2xl">
              The Pan-African Agency Network (PAAN) is a bold alliance of
              <span className="relative inline-block">
                <span className="text-[#F25849] font-semibold relative ml-2 z-0">independent</span>
                <Image
                                  src="/assets/images/sketch-1.png"
                  width={400}
                  height={0}
                  alt=""
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto z-[-2]"
                />
              </span>{" "} agencies across Africa and the diaspora. We're on a
              mission to <span className="relative inline-block">
                <span className="text-[#F2B706] font-semibold relative z-0">transform</span>
                <Image
                                  src="/assets/images/sketch-3.png"
                  width={400}
                  height={0}
                  alt=""
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto z-[-2]"
                />
              </span> fragmentation into unity and potential into
              global influence.
            </p>
          </section>
          <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mt-20">
            <div className="relative">
              <Image
                src="/assets/images/team.png"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-auto"
              />
              <div className="absolute top-100 bottom-0 bg-white flex flex-col gap-4 rounded-tr-[30px] rounded-br-[30px] pl-0 pt-4 pb-4 pr-4">
                <button
                  onClick={(e) => {
                    handleScroll(e, "#our-mission", isFixed);
                  }}
                  className="bg-[#F25849] text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300"
                >
                  Discover More
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={50}
                  height={50}
                  alt="Pan-African Reach"
                />
                <p className="text-xl font-base">Pan-African Reach</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/strategic-collaboration.svg"
                  width={50}
                  height={50}
                  alt="Strategic Collaboration"
                />
                <p className="text-xl font-base">Strategic Collaboration</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/innovation-driven.svg"
                  width={50}
                  height={50}
                  alt="Innovation-Driven"
                />
                <p className="text-xl font-base">Innovation-Driven</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={50}
                  height={50}
                  alt="Shared Knowledge & Growth"
                />
                <p className="text-xl font-base">Shared Knowledge & Growth</p>
              </div>
            </div>
          </section>
        </div>
        <AgenciesMarquee />
        
        <div
          className="bg-[#172840] relative section px-4 sm:px-6 lg:px-8"
          id="our-mission"
          ref={sectionRefs.ourMission}
        >
          {/* Decorative Circles */}
          <div className="hidden md:block absolute top-4 left-28 w-28 h-28 bg-[#F25849] rounded-full z-20"></div>
          <div className="hidden sm:block absolute bottom-40 right-10 w-16 h-16 bg-[#F25849] rounded-full z-0"></div>
          <div className="hidden sm:block absolute top-10 right-10 w-16 h-16 bg-[#D1D3D4] rounded-full z-0"></div>

          {/* Main Section */}
          <section className="relative z-10 mt-0 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center py-16">
              {/* Image */}
              <div className="relative">
                <Image
                  src="/assets/images/mission.png"
                  width={500}
                  height={300}
                  alt="Team collaboration"
                  className="rounded-lg object-cover w-full h-auto"
                />
              </div>

              {/* Vision & Mission Text */}
              <div className="flex flex-col gap-10">
                {/* Vision */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 transform transition-transform duration-300 hover:-translate-y-1">
                  <Image
                    src="/assets/images/icons/vision.svg"
                    width={112}
                    height={112}
                    alt="Vision Statement"
                    className="bg-[#172840] p-4 rounded-full w-24 sm:w-28"
                  />
                  <div>
                    <p className="text-xl sm:text-2xl font-semibold text-white">
                      Vision Statement
                    </p>
                    <span className="text-white font-light text-sm sm:text-base">
                      To become Africa's foremost collaborative network, shaping
                      global narratives through creativity and technology.
                    </span>
                  </div>
                </div>

                {/* Mission */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 transform transition-transform duration-300 hover:-translate-y-1">
                  <Image
                    src="/assets/images/icons/mission.svg"
                    width={112}
                    height={112}
                    alt="Mission Statement"
                    className="bg-[#172840] p-4 rounded-full w-24 sm:w-28"
                  />
                  <div>
                    <p className="text-xl sm:text-2xl font-semibold text-white">
                      Mission Statement
                    </p>
                    <span className="text-white font-light text-sm sm:text-base">
                      Empowering African agencies through partnerships, shared
                      resources, and advocacy to deliver world-class solutions.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>


        <div
          className="mx-auto max-w-6xl mt-20 mb-20 relative section"
          id="why-join-us"
          ref={sectionRefs.whyJoinUs}
        >
          <div className="absolute -top-24 -left-10 w-14 h-14 bg-yellow-400 rounded-full z-0"></div>
          <div className="hidden md:block absolute -top-14 right-52 w-16 h-16 bg-[#84C1D9] rounded-full z-0"></div>
          <div className="absolute -bottom-28 left-4 w-20 h-20 bg-[#F25849] rounded-full z-10"></div>
          <div className="absolute -bottom-14 right-4 w-11 h-11 bg-[#172840] rounded-full z-0"></div>
          <section className="relative z-10">
            <p className="uppercase font-semibold mb-4">3. Why Join PAAN?</p>
          </section>
          <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-20">
              <p className="text-2xl">
                PAAN membership opens doors to global opportunities, exclusive
                resources, and a thriving network of Africa's top creative and
                tech minds.
              </p>
              <div className="flex md:flex-row flex-col gap-4">
                <button
                  onClick={(e) => {
                    handleScroll(e, "#contact-us", isFixed);
                  }}
                  className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300"
                >
                  Join us Today
                </button>
                <button
                  onClick={(e) => {
                    handleScroll(e, "#services", isFixed);
                  }}
                  className="bg-[#172840] text-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7]"
                >
                  Discover More
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={40}
                  height={40}
                  alt="Pan-African Reach"
                />
                <p className="text-lg font-base">
                  Access to Global Brands & Markets
                </p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/strategic-collaboration.svg"
                  width={40}
                  height={40}
                  alt="Strategic Collaboration"
                />
                <p className="text-lg font-base">Shared Resources & Tools</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/innovation-driven.svg"
                  width={40}
                  height={40}
                  alt="Innovation-Driven"
                />
                <p className="text-xl font-base">
                  PAAN Certification Credibility
                </p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={40}
                  height={40}
                  alt="Shared Knowledge & Growth"
                />
                <p className="text-lg font-base">Knowledge Hubs & Webinars</p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={40}
                  height={40}
                  alt="Shared Knowledge & Growth"
                />
                <p className="text-lg font-base">
                  Collaborative Revenue Opportunities
                </p>
              </div>
            </div>
          </section>
        </div>

        <div
          className="bg-[#D1D3D4] relative section"
          id="membership"
          ref={sectionRefs.membership}
        >
          <div className="absolute -bottom-8 right-32 w-16 h-16 bg-[#84C1D9] rounded-full z-0"></div>
          <section className="relative z-10 mx-auto max-w-6xl py-20">
            <div className="flex flex-col mb-10 mx-auto w-3/4">
              <h2 className="text-2xl text-center mb-4">
                Our Structure & Tiers
              </h2>
              <p className="text-center">
                Whether you're a bold startup or a seasoned agency, PAAN offers
                a tier that fits your<br/> journey. Join a network designed to
                elevate, empower, and connect.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Tier1 />
              <Tier2 />
              <Tier3 />
            </div>
            <div className="flex justify-center">
              <button onClick={() => window.location.href = 'https://calendly.com/antony-paan/45min'} className="bg-[#F26522] hover:bg-[#D6473C] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group">
                <Icon icon="mdi:calendar-clock" className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Schedule a call to explore full benefits
              </button>
            </div>
          </section>
        </div>

        <AgencyLogosGrid />

        <div
          className="mx-auto max-w-6xl mt-20 section"
          id="services"
          ref={sectionRefs.services}
        >
          <section>
            <p className="uppercase font-semibold mb-4">4. What We Offer</p>
            <p className="text-2xl">
              At PAAN, we go beyond networking. Our core services are built to
              empower, elevate, and connect agencies across Africa and the
              diaspora. Explore what we offer.
            </p>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mt-10">
            <div className="relative col-span-1 sm:col-span-1">
              <Image
                src="/assets/images/offer.png"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
              <OfferingTab />
            </div>
          </section>
        </div>

        <div
          className="mx-auto max-w-6xl mt-20 pb-20 section"
          id="events"
          ref={sectionRefs.events}
        >
          <section>
            <p className="uppercase font-semibold mb-4">4. Summit & Events</p>
            <p className="text-2xl">
              Experience collaboration in action. Our signature events bring
              together brands, agencies, and thought leaders to shape Africa's
              creative future.
            </p>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mt-10">
            
            <div className="col-span-1 pattern-bg-2 rounded-lg transform transition-transform duration-300 hover:translate-y-[-5px]">
              <Link
                href="/summit"
                target="_blank" // Opens in new tab
                rel="noopener noreferrer" // Security best practice for external links
              >
                <Image
                  src="/assets/images/oct-summit.jpg"
                  width={900}
                  height={0}
                  alt="Webinar"
                  className="rounded-lg object-cover w-full h-full"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="network-bg relative" id="join-network">
          <div className="absolute -top-3 left-4 w-6 h-6 bg-[#84C1D9] rounded-full z-0"></div>
          <div className="absolute -top-8 right-4 w-16 h-16 bg-yellow-400 rounded-full z-0"></div>
          <div className="absolute -bottom-12 right-4 w-28 h-28 bg-red-500 rounded-full z-0"></div>
          <section className="relative mx-auto max-w-6xl py-28 px-6">
            <div className="flex flex-col mb-10 w-full md:w-3/4">
              <h2 className="text-3xl font-medium mb-4 text-[#F2B706]">
                Join the Network That's Redefining Africa's Creative Future
              </h2>
              <p className="text-white font-light">
                Step into a powerful alliance of agencies shaping the future of
                communication, marketing, and tech across Africa and beyond.
                Whether you're just starting or scaling fast — PAAN is your
                platform for global impact.
              </p>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <button
                onClick={(e) => {
                  handleScroll(e, "#contact-us", isFixed);
                }}
                className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300"
              >
                Join us Today
              </button>
              <button
                onClick={(e) => {
                  handleScroll(e, "#events", isFixed);
                }}
                className="bg-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7]"
              >
                Register for Summit
              </button>
            </div>
          </section>
        </div>

        <div
          className="mx-auto max-w-6xl mt-20 relative section"
          id="contact-us"
          ref={sectionRefs.contactUs}
        >
          {/* <div className="absolute top-4 -right-5 w-12 h-12 bg-[#172840] rounded-full z-20"></div> */}
          <div className="absolute -bottom-9 -left-6 w-20 h-20 bg-[#F2B706] rounded-full z-0"></div>
          <div className="absolute bottom-4 left-50 w-11 h-11 bg-[#F25849] rounded-full z-0"></div>
          
          <ContactSection />
        </div>
        <Footer />
        <AgencyEnquiryModal isOpen={isModalOpen} onClose={closeModal} />
        <ScrollToTop />
      </main>
    </>
  );
};

export default HomePage;