import SEO from "@/components/SEO";
import Header from "../layouts/clients-header"; 
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader } from '../../utils/scrollUtils';
import FAQs from "@/components/FAQs";


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
        <div className="relative w-full flex items-center justify-center mx-auto max-w-6xl px-6 md:px-8 py-12">

          <div className="flex-1 max-w-xl text-left space-y-4 z-10">
            <h1 className="text-dark font-bold mb-2 relative uppercase text-xl md:text-2xl lg:text-3xl">
                Got Questions About PAAN? We've Got You Covered.
            </h1>
            <p className="text-dark text-lg md:text-xl lg:text-2xl mb-4 leading-tight">
                Find quick answers to common questions about PAAN membership, collaboration, tools, and growth.
            </p>             
          </div>
  
          {/* Right side - Image */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-full max-w-2xl">
                <img 
                    src="/assets/images/faqs-hero.png" 
                    alt="Professional woman" 
                    className="rounded-lg w-full h-auto object-cover" 
                />
            </div>
          </div>
        </div>
      </div>
    );
  };


export default FAQsPage;