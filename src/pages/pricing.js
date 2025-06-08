// pages/index.js
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Footer from "@/layouts/footer";
import { useEffect, useRef } from "react";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import MemberTiers from "@/components/MemberTiers";

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
        <MemberTiers/>
        <Footer />
      </main>
    </>
  );
};

export default HomePage;