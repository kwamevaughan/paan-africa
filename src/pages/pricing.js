// pages/index.js
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Footer from "@/layouts/footer";
import { useEffect, useRef } from "react";
import { useFixedHeader, handleScroll } from '../../utils/scrollUtils';
import MemberTiers from "@/components/MemberTiers";
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
        title="PAAN Agency Membership Tiers | Unlock Opportunities Across Africa"
        description="Explore PAAN’s tailored agency membership tiers designed to boost your agency’s visibility, client access, and growth across Africa. Choose from Free, Associate, Full, and Gold membership options to expand your reach."
        keywords="PAAN Agency Membership, Africa Agency Network, agency growth Africa, Africa business expansion, RFPs, Cross-border projects, agency co-bidding"
        noindex={true}
      />

      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />
        <MemberTiers />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

export default HomePage;