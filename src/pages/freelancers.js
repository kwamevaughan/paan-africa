import SEO from "@/components/SEO";
import Header from "../layouts/freelancers-header";
import Image from "next/image";
import Footer from "@/layouts/footer";
import { useEffect, useRef } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import FreelanceBenefitsSlider from "@/components/FreelanceBenefitsSlider";
import ReadyToApplySection from "@/components/ReadyToApplySection";
import Marquee from "@/components/Marquee";
import ContactSection from "@/components/ContactSection";
import FreelancerHero from "@/components/FreelancerHero";
import AgencyLogosGrid from "@/components/AgencyLogosGrid";
import ScrollToTop from "@/components/ScrollToTop";


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
        <FreelancerHero />
        

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
                  <span className="relative">
                    <span className="relative z-10"> access to briefs</span>
                    <Image
                      src="/assets/images/yellow-vector.png"
                      width={100}
                      height={0}
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
                  <span className="relative">
                    <span className="relative z-10"> serious professional.</span>
                    <Image
                      src="/assets/images/blue-vector.png"
                      width={100}
                      height={0}
                      alt=""
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full h-auto"
                    />
                  </span>
                </h3>
              </div>
              <div className="flex justify-end">
                <Image src="/assets/images/africa-map.png" width={600} height={0} alt="PAAN Summit" className="h-auto object-cover rounded shadow-lg" />
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
        <AgencyLogosGrid />

        <ReadyToApplySection /> 
        <Marquee />
        <ContactSection />
        
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};


export default FreelancersPage;