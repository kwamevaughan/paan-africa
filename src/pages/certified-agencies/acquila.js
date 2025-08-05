import SEO from "@/components/SEO";
import Header from "../../layouts/header";
import Image from "next/image";
import Footer from "../../layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../../utils/scrollUtils';
import PAAacademyMarquee from "@/components/PAAacademyMarquee";
import ScrollToTop from "@/components/ScrollToTop";
import ConnectingDots from "@/components/ConnectingDots";


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
  const canvasRef = useRef(null);

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

  useEffect(() => {
    const cnvs = canvasRef.current;
    if (!cnvs) return;
    let animationId;
    let running = true;
    let mx = 0;
    let my = 0;
    let dots = [];
    let c;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Responsive parameters
    function getParams() {
      const isMobile = width < 640;
      return {
        dots_num: isMobile ? 30 : 70,
        r: 1,
        mouse_ol: isMobile ? 80 : 150,
        dots_ol: isMobile ? 80 : 150,
        max_speed: 1,
        max_ms_opac: 1,
        max_dots_opac: 1,
        uni_divs: isMobile ? 10 : 30,
      };
    }

    function resizeCanvas() {
      // Use parent container's size
      const parent = cnvs.parentElement;
      width = parent ? parent.offsetWidth : window.innerWidth;
      height = parent ? parent.offsetHeight : window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      cnvs.width = width * dpr;
      cnvs.height = height * dpr;
      cnvs.style.width = width + 'px';
      cnvs.style.height = height + 'px';
      c = cnvs.getContext('2d');
      c.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      c.scale(dpr, dpr);
    }

    function updtMouse(e) {
      // Get mouse position relative to canvas
      const rect = cnvs.getBoundingClientRect();
      mx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      my = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    }

    function init() {
      dots = [];
      const { dots_num, uni_divs } = getParams();
      for(let i=0; i<dots_num; i++) {
        let x = Math.floor((Math.random()*width/uni_divs)+(parseInt(i/(dots_num/uni_divs))*(width/uni_divs)));
        let y = Math.floor(Math.random()*height);
        let dx = Math.random()*1+0.1;
        let dy = Math.random()*1+0.1;
        if(i%2==0) {
          dx*=-1;
          dy*=-1;
        }
        dots.push({x, y, dx, dy});
      }
    }

    function update() {
      if (!running) return;
      c.clearRect(0, 0, width, height);
      const { dots_num, mouse_ol, dots_ol, max_ms_opac, max_dots_opac } = getParams();
      for(let i=0; i<dots_num; i++) {
        let dot = dots[i];
        dot.x += dot.dx;
        dot.y += dot.dy;
        if(dot.x>width || dot.x<0) dot.dx *= -1;
        if(dot.y>height || dot.y<0) dot.dy *= -1;
        let x = dot.x;
        let y = dot.y;
        let d = Math.sqrt((x-mx)*(x-mx)+(y-my)*(y-my));
        if(d<mouse_ol) {
          c.strokeStyle = `rgba(100, 180, 255, ${max_ms_opac*(mouse_ol-d)/mouse_ol})`;
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(x, y);
          c.lineTo(mx, my);
          c.stroke();
        }
        for(let j=i+1; j<dots_num; j++) {
          let x1 = dots[j].x;
          let y1 = dots[j].y;
          let d2 = Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
          if(d2<dots_ol) {
            c.strokeStyle = `rgba(157, 210, 255, ${max_dots_opac*(dots_ol-d2)/dots_ol})`;
            c.lineWidth = 1;
            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x, y);
            c.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(update);
    }

    function handleResize() {
      resizeCanvas();
      init();
    }

    resizeCanvas();
    init();
    update();
    window.addEventListener('mousemove', updtMouse);
    window.addEventListener('touchmove', updtMouse, { passive: false });
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      running = false;
      window.removeEventListener('mousemove', updtMouse);
      window.removeEventListener('touchmove', updtMouse);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
    <SEO
        title="PAAN Academy | Empowering Africa's Creative & Tech Talent"
        description="Join PAAN Academy - the premier learning platform for Africa's creative and tech professionals. Access exclusive courses, industry insights, mentorship programs, and certification tracks designed to accelerate your career and agency growth."
        keywords="PAAN Academy, creative education, tech training, African talent development, agency skills, professional certification, mentorship programs"
      />
    <div className="relative">
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <ConnectingDots 
          starCount={80}
          connectionDistance={120}
          dotColor="#84C1D9"
          lineColor="#84C1D9"
          lineWidth={0.5}
        />
        <Header/>

        <div className="relative w-full min-h-screen bg-white" id="home" ref={sectionRefs.home}>
          {/* Canvas covers full hero section */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'block',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
          <section className="flex items-center justify-center min-h-screen relative z-10 px-4 sm:px-8 lg:px-16">
            <div className="text-center max-w-4xl mx-auto">
                <div className="mb-8">
                    <Image 
                        src="/assets/images/certified-members/badge.svg" 
                        width={300} 
                        height={210} 
                        alt="AQCILLA DIGITAL Badge" 
                        className="mx-auto w-48 h-auto object-contain" 
                    />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl uppercase font-bold text-gray-900 mb-4">
                    Aquila East Africa
                </h1>
                <p className="text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    An official member of the PAAN Network, delivering with insight, speed, and local expertise
                </p>
            </div>
          </section>
        </div>
        
        <div className="bg-paan-blue relative">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-10">              
              <div className="flex flex-col">
                <div className="space-y-4 sm:space-y-6">              
                  <div className="mt-6 sm:mt-8">
                    <ul className="space-y-3 sm:space-y-4">
                      <li className="flex items-start">
                        <div className="flex flex-col">
                            <h3 className="font-bold uppercase">ABOUT Aquila East Africa</h3>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Aquila East Africa is a creative agency based in Nairobi, Kenya, specializing in pan-African digital campaigns, media planning, and market localization. As a certified PAAN Partner, they bring cultural fluency, 
                            regional insight, and consistent results to brands expanding across the continent.
                            </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Image 
                  src="/assets/images/certified-members/about-img.png" 
                  width={300} 
                  height={200} 
                  alt="PAAN Summit" 
                  className="w-full h-auto object-cover rounded-lg" 
                />
              </div>
            </div>
          </section>
        </div>
        
        <div className="bg-white relative">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:pb-20">
            <p>Joining the PAAN network gave us access to opportunities we couldn’t have unlocked on our own. We've been able to collaborate on cross-border campaigns, work with global brands, and scale our services beyond our home market — all while staying true to our local creative roots.</p>
            <h3>David N., Founder, CreativLab Agency (Kenya)</h3>
          </section>
        </div>

        <div className="bg-paan-red relative">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:pb-20">
            <h3>Want to Join the PAAN Network?</h3>
            <button                  
                  className="bg-paan-dark-blue text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300 w-full sm:w-auto"
                  onClick={(e) => {
                    handleScroll(e, "#courses", isFixed);
                  }}
                >
                  Become a certified Member
                </button>
          </section>
        </div>
    
        

        <ScrollToTop />
      </main>
      <Footer />
      </div>
    </>
  );
};

export default HomePage;