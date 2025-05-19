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
import ContactForm from "@/components/ContactForm";

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
        <Hero />

        <div className="bg-[#172840] relative">
          <section className="relative mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8 py-10 items-center">
              <div className="flex flex-col gap-4 z-0 pr-6">
                <h2 className="text-l text-yellow-400 uppercase font-semibold">WHY JOIN?</h2>
                <h3 className="text-white text-xl text-left font-normal">
                  You&apos;re <span className="relative inline-block">
                    <span className="relative z-10">great</span>
                    <img
                      src="/assets/images/red-vector.png"
                      alt=""
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full h-auto"
                    />
                  </span> at what you do.<br/>
                  <img 
                    src="/assets/images/why-join-1.png" 
                    alt=""
                    className="inline-block align-middle mx-1 h-10"
                  /> 
                  Now join a <br/>network that helps you do it at scale.<br/><br/> PAAN Certified Freelancers get<br/> more than 
                  <span className="relative inline-block">
                    <span className="relative z-10">access to briefs</span>
                    <img
                      src="/assets/images/yellow-vector.png"
                      alt=""
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full h-auto"
                    />
                  </span><br/>
                  <img 
                    src="/assets/images/why-join-2.png" 
                    alt=""
                    className="inline-block align-middle mx-1 h-10"
                  />
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
                <div className="absolute -top-30 -left-30 w-28 h-28 bg-[#84C1D9] rounded-full z-0"></div>
                <div className="absolute -top-30 -right-20 w-16 h-16 bg-[#F25849] rounded-full z-0"></div>
                <div className="absolute bottom-60 -left-100 w-11 h-11 bg-[#F2B706] rounded-full z-0"></div>
                <img src="/assets/images/africa-map.png" alt="PAAN Summit" className="h-auto object-cover rounded shadow-lg" />
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

        <div className="mx-auto max-w-6xl mt-20 mb-20 relative">
          <section className="relative">
            <h2 className="text-l uppercase font-bold text-left text-black mb-4">What you Get</h2>
            <h3 className="text-left text-black">You Bring the Talent. We Unlock the Opportunity.</h3>
            <FreelanceBenefitsSlider/ >
          </section>
        </div>

        <ReadyToApplySection />
        <div className="mb-20 relative bg-[#D1D3D4]">
          <section className="relative">
            <div className="flex items-center justify-center h-32">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-800 font-medium">Motion Designers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#F25849] rounded-full"></div>
                  <span className="text-gray-800 font-medium">Copywriters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#F2B706] rounded-full"></div>
                  <span className="text-gray-800 font-medium">Frontend Developers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#FFFFFF] rounded-full"></div>
                  <span className="text-gray-800 font-medium">Brand Strategists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#172840] rounded-full"></div>
                  <span className="text-gray-800 font-medium">UX/UI Designers</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="mx-auto max-w-6xl mt-20 relative">
          <div className="absolute top-4 -right-5 w-12 h-12 bg-[#172840] rounded-full z-20"></div>
          <div className="absolute -bottom-9 -left-6 w-20 h-20 bg-[#F2B706] rounded-full z-0"></div>
          <div className="absolute bottom-4 left-56 w-11 h-11 bg-[#F25849] rounded-full z-0"></div>
          <section className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mt-10">
            <div className="relative col-span-1 sm:col-span-1 flex flex-col gap-10">
              <div>
                <h2 className="text-3xl font-medium mb-4">Get in Touch</h2>
                <p className="text-gray-500">
                  Have questions about PAAN, membership, or upcoming events?
                  Reach out — we’re here to connect and support your journey.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-medium mb-4">
                  Direct Contact Info
                </h2>
                <div className="flex items-center gap-2 pb-4">
                  <Link
                    href="mailto:secretariat@paan.africa"
                    className="flex items-center gap-2 transform translate-y-[-5px] hover:translate-y-[-5px] transition-transform duration-200"
                  >
                    <Icon
                      icon="material-symbols:call"
                      width="32"
                      height="32"
                      className="flex-shrink-0 bg-[#F25849] p-2 rounded-full text-white"
                    />
                    <p className="font-medium text-gray-500">
                      secretariat@paan.africa
                    </p>
                  </Link>
                </div>
                <div className="flex items-center gap-2 pb-4">
                  <Link
                    href="https://www.google.com/maps?q=7th+Floor,+Mitsumi+Business+Park,+Westlands,+Nairobi,+Kenya"
                    target="_blank"
                    className="flex items-center gap-2 transform translate-y-[-5px] hover:translate-y-[-10px] transition-transform duration-200"
                  >
                    <Icon
                      icon="mdi:location"
                      width="32"
                      height="32"
                      className="flex-shrink-0 bg-[#F25849] p-2 rounded-full text-white"
                    />
                    <p className="font-medium text-gray-500">
                      7th Floor, Mitsumi Business Park, Westlands, Nairobi,
                      Kenya
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
              <ContactForm />
            </div>
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
      className="relative h-screen w-full bg-[#F25849] overflow-hidden" 
      id="home"
    >
      {/* Background image as an overlay */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: "url('/assets/images/bg-pattern.png')"
        }}
      />
             
      {/* Content overlay - Added pt-24 to prevent header overlap */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-6xl px-6 md:px-8 pt-24 pb-8 flex flex-col justify-between h-full">
          {/* Main content section with improved spacing */}
          <div className="max-w-2xl mx-auto text-center space-y-6 mt-4">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 relative uppercase">
              PAAN Partnership Program
            </h2>
            
            <p className="text-white text-md mb-6">
                Power Your Growth Across AfricaUnlock Africa’s Potential with PAAN’s Agency Network.
            </p>
            
        
                        
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancersPage;