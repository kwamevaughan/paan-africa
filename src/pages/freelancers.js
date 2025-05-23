import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import { useEffect, useRef } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import FreelanceBenefitsSlider from "@/components/FreelanceBenefitsSlider";
import ReadyToApplySection from "@/components/ReadyToApplySection";
import Marquee from "@/components/Marquee";
import ContactSection from "@/components/ContactSection";

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
        title="Join Africa’s Top Network for Freelancers | Pan-African Agency Network (PAAN)"
        description="Become a PAAN Certified Freelancer and gain access to top-tier briefs, professional structure, and visibility. Join Africa’s most trusted network for creative, technical, and strategic freelance talent."
        keywords="African freelancers, freelance network Africa, PAAN certified freelancer, join freelancer platform, vetted freelancers Africa, Pan-African creative network"
      />
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />
        <Hero />

        <div className="bg-[#172840] relative">
          <section className="relative mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8 py-10 items-center">
              <div className="flex flex-col gap-4 z-0 pr-6">
                <h2 className="text-xl text-yellow-400 uppercase font-semibold">WHY JOIN?</h2>
                <h3 className="text-white text-3xl text-left font-normal">
                  You&apos;re <span className="relative inline-block">
                    <span className="relative z-10">great</span>
                    <Image
                      src="/assets/images/red-vector.png"
                      width={100}
                      height={0}
                      alt=""
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full h-auto"
                    />
                  </span> at what you do.<br/>
                  <span 
                    className="inline-block align-middle mx-1 overflow-hidden" 
                    style={{ width: '120px', height: '40px', borderRadius: '9999px' }}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      src="/assets/videos/1.mp4"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '9999px',
                        objectFit: 'cover',
                        pointerEvents: 'none',
                      }}
                    ></video>
                  </span>
                  Now join a <br/>network that helps you do it at scale.<br/><br/> PAAN Certified Freelancers get<br/> more than 
                  <span className="relative inline-block">
                    <span className="relative z-10">access to briefs</span>
                    <img
                      src="/assets/images/yellow-vector.png"
                      alt=""
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full h-auto"
                    />
                  </span><br/>
                  <span 
                    className="inline-block align-middle mx-1 overflow-hidden" 
                    style={{ width: '120px', height: '40px', borderRadius: '9999px' }}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      src="/assets/videos/2.mp4"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '9999px',
                        objectFit: 'cover',
                        pointerEvents: 'none',
                      }}
                    ></video>
                  </span>
                  They get structure,<br/> visibility, and opportunities built<br/> for 
                  <span className="relative inline-block">
                    <span className="relative z-10"> serious professional.</span>
                    <img
                      src="/assets/images/blue-vector.png"
                      alt=""
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full h-auto"
                    />
                  </span>
                </h3>
              </div>
              <div className="flex justify-end">
                <img src="/assets/images/africa-map.png" alt="PAAN Summit" className="h-auto object-cover rounded shadow-lg" />
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

        <div className="mx-auto max-w-6xl mt-20 mb-20 relative">
          <section className="relative">
            <h2 className="text-lg uppercase font-bold text-left mb-4">What you Get</h2>
            <h3 className="text-2xl">You Bring the Talent. We Unlock the Opportunity.</h3>
            <FreelanceBenefitsSlider/ >
          </section>
        </div>

        <ReadyToApplySection /> 
        <Marquee />
        <ContactSection />
        
        <Footer />
      </main>
    </>
  );
};

const Hero = () => {
  return (
    <div
      className="relative h-screen w-full overflow-hidden pt-10 md:pt-0 "
      id="home"
    >
      {/* Content overlay with increased top padding to move away from header */}
      <div className="relative h-full flex items-center justify-center">
        <div className="w-full px-6 md:px-8 pt-16 md:pt-32 flex flex-col justify-between freelance-hero-bg">
          <div className=" mx-auto text-center space-y-8 mt-8">
            <h2 className="text-[#172840] text-xl md:text-5xl font-bold uppercase relative">
              <span className="relative inline-block">
                <span className="text-[#F25849] relative z-0">Freelance</span>
                <img
                  src="/assets/images/hero-vector.png"
                  alt=""
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto z-[-2]"
                />
              </span>{" "}
              with Purpose. <br />
              Grow with Structure & Scale.
            </h2>
            <p className="text-[#172840] text-md mb-6 px-4">
              Join Africa&apos;s premier network of vetted creative, technical,
              and strategic <br></br>talent—powering high-impact campaigns across the
              continent.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12  md:space-y-0 ">
              <div className="text-[#172840] text-sm flex items-center whitespace-nowrap">
                <Icon
                  icon="mdi:shield-check"
                  className="w-5 h-5 text-[#F2B706] mr-2"
                />
                <p className="text-xs">
                  Trusted by agencies in{" "}
                  <span className="font-bold">20+ African countries</span>
                </p>
              </div>
              <div className="text-[#172840] text-sm flex items-center whitespace-nowrap">
                <Icon
                  icon="mdi:shield-check"
                  className="w-5 h-5 text-[#F2B706] mr-2"
                />
                <p className="text-xs">
                  Backed by the{" "}
                  <span className="font-bold">
                    Pan-African Agency Network (PAAN)
                  </span>
                </p>
              </div>
            </div>

            <button className="bg-[#F25849] text-white py-3 px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm">
              <Link href="https://membership.paan.africa/freelancers" passHref>
                Become a Certified PAAN Freelancer
              </Link>
            </button>
          </div>

          {/* Freelancer images - Updated to full width */}
          <div className="mt-auto flex justify-center items-center mx-auto pt-20">
            <div className="flex flex-row w-full gap-1 md:gap-8">
              <Image
                src="/assets/images/freelancer-1.png"
                width={200}
                height={0}
                alt="Hero image 1"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
              <Image
                src="/assets/images/freelancer-2.png"
                width={200}
                height={0}
                alt="Hero image 2"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
              <Image
                src="/assets/images/freelancer-3.png"
                width={200}
                height={0}
                alt="Hero image 3"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
              <Image
                src="/assets/images/freelancer-4.png"
                width={200}
                height={0}
                alt="Hero image 4"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
              <Image
                src="/assets/images/freelancer-5.png"
                width={200}
                height={0}
                alt="Hero image 5"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FreelancersPage;