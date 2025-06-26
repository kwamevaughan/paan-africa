import SEO from "@/components/SEO";
import Header from "../layouts/clients-header"; 
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import FAQs from "@/components/FAQs";
import Link from "next/link";


const FAQsPage = () => {
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
        title="Partner with PAAN | Unlock Growth Across Africa's Creative & Tech Markets"
        description="Join PAAN's Partnership Program to connect with 200+ vetted agencies across Africa. Accelerate your market entry, build trust, and scale with local expertise."
        keywords="PAAN partnerships, Africa agency network, tech partnerships Africa, creative agency Africa, expand in Africa, African market entry, local tech partners Africa, scale in African markets"
      />
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />
        <Hero />

        <FAQs/>
        <div className="mx-auto max-w-6xl relative mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Still Have Questions? Let's Talk.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We know every agency is unique — and sometimes you need answers that aren't in the FAQs. If you're still unsure about membership, benefits, or how PAAN can support your growth, we're here to help.
              </p>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 uppercase">
                  Reach Out to us
                </h3>
              </div>
              
              <div className="flex flex-col items-center lg:items-start space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-[#F2B706] flex-shrink-0" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zM20 8l-7.475 4.675q-.125.075-.262.113t-.263.037t-.262-.037t-.263-.113L4 8v10h16zm-8 3l8-5H4zM4 8v.25v-1.475v.025V6v.8v-.012V8.25zv10z"/></svg>
                  <span className="font-medium">support@paan.africa</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Schedule a call
                </p>
                <Link 
                  href="https://calendly.com/antony-paan/45min"
                  className="inline-block bg-[#F25849] text-[#172840] px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-[#6FA1B7] hover:shadow-lg transform hover:-translate-y-0.5 text-center w-full sm:w-auto"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

const Hero = () => {
  return (
    <div
      className="relative min-h-[90vh] w-full bg-[#84C1D9] overflow-hidden flex items-center" 
      id="home"
    >  
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-center mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 gap-6 lg:gap-8">

        {/* Left side - Text Content */}
        <div className="flex-1 max-w-xl text-center lg:text-left space-y-4 z-10 order-2 lg:order-1">
          <h1 className="text-dark font-bold mb-2 relative uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
            Got Questions About PAAN? We've Got You Covered.
          </h1>
          <p className="text-dark text-base sm:text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed">
            Find quick answers to common questions about PAAN membership, collaboration, tools, and growth.
          </p>             
        </div>

        {/* Right side - Image */}
        <div className="flex-1 flex items-center justify-center relative order-1 lg:order-2 w-full">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-2xl">
            <video
              className="w-full h-auto rounded-3xl"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 80px) 0%, 100% 80px, 100% 100%, 80px 100%, 0% calc(100% - 80px))'
              }}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/assets/videos/faqs-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};



export default FAQsPage;