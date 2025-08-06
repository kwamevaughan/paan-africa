import SEO from "@/components/SEO";
import Header from "../../layouts/paan-academy-header";
import Image from "next/image";
import Footer from "./footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../../utils/scrollUtils';
import PAAacademyMarquee from "@/components/PAAacademyMarquee";
import ScrollToTop from "@/components/ScrollToTop";
import ConnectingDots from "@/components/ConnectingDots";
import AcademyEnquiryModal from "@/components/AcademyEnquiryModal";


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
  const canvasRef = useRef(null);
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
      <main className="sm:px-0 sm:pt-0 relative">
        <div className="hidden sm:block">
          <ConnectingDots 
            starCount={80}
            connectionDistance={120}
            dotColor="#84C1D9"
            lineColor="#84C1D9"
            lineWidth={0.5}
          />
        </div>
        <Header openModal={openModal}/>

        <div className="relative w-full min-h-screen bg-[#172840]" id="home" ref={sectionRefs.home}>
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
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center px-4 sm:px-8 lg:px-16 pt-0 relative z-10 max-w-6xl mx-auto min-h-screen flex items-center">
                <div className="flex flex-col gap-4 sm:gap-8 text-center sm:text-left w-full">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white leading-tight">
                    Upskill Your Marketing & Comms Teams with Africa's Top Creative Minds
                </h1>
                <p className="text-gray-300 font-normal text-sm sm:text-base">
                    PAAN Academy offers practical, African-context training for brand teams — helping your in-house talent sharpen their skills, stay ahead of trends, and deliver breakthrough campaigns.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                    <button                  
                    className="bg-[#F25849] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300 w-full sm:w-auto"
                    onClick={openModal}
                    >
                    Explore Programs
                    </button>
                    <button
                    className="bg-paan-green text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7] text-center w-full sm:w-auto"
                    onClick={() => {
                        gtag_report_conversion('https://calendly.com/njue-duncan-growthpad/paan-partners-introduction');
                    }}
                    >
                    Schedule a Free Consultation
                    </button>
                </div>
                </div>
                <div className="hidden sm:block">
                <Image
                    src="/assets/images/paan-academy/hero-image.png"
                    width={400}
                    height={300}
                    alt="Hero Image"
                    className="absolute right-0 rounded-lg object-cover w-full h-auto max-w-sm mx-auto bottom-0"
                />
                </div>
            </section>
        </div>
        <AcademyEnquiryModal isOpen={isModalOpen} onClose={closeModal} />
        <div className="relative">
        <PAAacademyMarquee/>
        </div>
        
        <div className="bg-[#F3F9FB]" id="why-join-us">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:pb-28">
            {/* Decorative element */}
            <div 
                className="hidden sm:block absolute top-4 right-80 w-5 h-16 bg-paan-blue z-0"
                style={{
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(15deg)'
                }}
            >
            </div>
            <div 
                className="hidden sm:block absolute bottom-0 right-80 w-5 h-16 bg-paan-yellow z-0"
                style={{
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(60deg)'
                }}
            >
            </div>
          <div className="inline-flex items-center justify-center mb-6">
            {/* Badge */}
          <div className="bg-paan-purple text-white px-6 py-1 rounded-full text-sm font-medium">
            <span className="uppercase tracking-wide flex items-center gap-1"><span className="text-paan-blue text-4xl animate-pulse">&bull;</span>Why Train with PAAN Academy</span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-normal leading-tight mb-8 sm:mb-10 max-w-4xl">
          Practical, results-driven training led by Africa's most experienced creative professionals.
        </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-10">              
              <div className="flex flex-col">
                <div className="space-y-4 sm:space-y-6">              
                  <div className="mt-6 sm:mt-8">
                    <ul className="space-y-3 sm:space-y-4">
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-paan-red" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>            
                        </span>
                        <div className="flex flex-col">
                            <h3 className="font-bold">Pan-African Expertise</h3>
                            <span className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                Led by top-tier strategists, creatives, and media specialists from 200+ agencies across 20+ countries
                            </span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-paan-red" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg> 
                        </span>
                        <div className="flex flex-col">
                            <h3 className="font-bold">Custom Curriculum</h3>
                            <span className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                 Tailored training modules for your brand’s goals — from campaign development to media execution
                            </span>
                        </div>
                        </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-paan-red" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>  
                        </span>
                        <div className="flex flex-col">
                            <h3 className="font-bold">Real-World Learning</h3>
                            <span className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                Hands-on workshops, case studies, and toolkits your team can apply immediately
                            </span>
                        </div>
                        </li>
                      <li className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-paan-red" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>  
                        </span>
                        <div className="flex flex-col">
                            <h3 className="font-bold">Stronger Results</h3>
                            <span className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                Boost ROI from your marketing spend by empowering internal teams to brief better, manage agencies, and build strategic campaigns
                            </span>
                        </div>
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Image 
                  src="/assets/images/paan-academy/img-1.svg" 
                  width={300} 
                  height={200} 
                  alt="PAAN Summit" 
                  className="w-full h-auto object-cover rounded-lg" 
                />
              </div>
            </div>
          </section>
        </div>
        
        <div className="bg-paan-purple rounded-xl mx-4 lg:mx-10" id="training">
            <section className="relative mx-auto max-w-6xl px-6 sm:px-8 py-12 sm:py-16 lg:py-20">
            <div 
                className="hidden sm:block absolute top-5 right-0 w-5 h-16 bg-paan-blue z-0"
                style={{
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(20deg)'
                }}
            >
            </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">              
                {/* Images Column */}
                <div className="flex flex-col gap-6 order-2 lg:order-1 h-full">
                    <div className="flex-1">
                    <Image 
                        src="/assets/images/paan-academy/img-2.png" 
                        width={400} 
                        height={280} 
                        alt="PAAN Summit" 
                        className="w-full h-full object-cover" 
                    />
                    </div>
                    <div className="flex-1">
                    <Image 
                        src="/assets/images/paan-academy/img-3.png" 
                        width={400} 
                        height={280} 
                        alt="PAAN Summit" 
                        className="w-full h-full object-cover" 
                    />
                    </div>
                </div>

                {/* Content Column */}
                <div className="flex flex-col order-1 lg:order-2">
                    <div className="space-y-6 lg:space-y-8">              
                    {/* Badge */}
                    <div className="flex justify-center lg:justify-start">
                        <div className="bg-paan-yellow text-paan-dark-blue px-6 rounded-full">
                        <span className="text-xs font-semibold uppercase flex items-center gap-2">
                            <span className="text-paan-purple text-3xl">&bull;</span>Focus Area                          
                        </span>
                        </div>
                    </div>

                    {/* Headings */}
                    <div className="space-y-4 text-center lg:text-left">
                        <h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight">
                        Built for Africa's Marketing Landscape
                        </h2>
                        <h3 className="text-white text-lg lg:text-xl font-normal opacity-90">
                            Your team gains strategic, technical, and creative skills across:
                        </h3>
                    </div>

                    {/* Skills List */}
                    <ul className="space-y-4 lg:space-y-5 text-white mt-8">
                        <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>            
                        </span>
                        <h4 className="text-base lg:text-lg font-medium leading-relaxed">
                            Strategic Brand Thinking
                        </h4>
                        </li>
                        
                        <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>            
                        </span>
                        <h4 className="text-base lg:text-lg font-medium leading-relaxed">
                            Mastering the Marketing Brief
                        </h4>
                        </li>

                        <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>            
                        </span>
                        <h4 className="text-base lg:text-lg font-medium leading-relaxed">
                            AI in Content & Creative Production
                        </h4>
                        </li>

                        <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>            
                        </span>
                        <h4 className="text-base lg:text-lg font-medium leading-relaxed">
                            Performance Marketing
                        </h4>
                        </li>

                        <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>            
                        </span>
                        <h4 className="text-base lg:text-lg font-medium leading-relaxed">
                            Cross-Channel Campaign Management
                        </h4>
                        </li>

                        <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>            
                        </span>
                        <h4 className="text-base lg:text-lg font-medium leading-relaxed">
                            Internal Creative Capacity Building
                        </h4>
                        </li>

                        <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>            
                        </span>
                        <h4 className="text-base lg:text-lg font-medium leading-relaxed">
                            Collaborating with Agencies & Freelancers
                        </h4>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </section>
        </div>
        
        <div className="bg-white" id="formats">
            <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
                <div 
                    className="hidden sm:block absolute top-5 right-0 w-5 h-16 bg-paan-purple z-0"
                    style={{
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        transform: 'rotate(-50deg)'
                    }}
                >
                </div>
                <div 
                    className="hidden sm:block absolute top-5 left-0 w-5 h-16 bg-paan-red z-0"
                    style={{
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        transform: 'rotate(90deg)'
                    }}
                >
                </div>
                <div 
                    className="hidden sm:block absolute bottom-5 right-0 w-5 h-16 bg-paan-green z-0"
                    style={{
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    }}
                >
                </div>
                <div className="text-center mb-16">
                {/* Badge */}
                <div className="inline-flex items-center justify-center mb-8">
                    <div className="bg-paan-green text-paan-dark-blue px-8 py-1 rounded-full text-sm font-semibold shadow-sm">
                    <span className="uppercase tracking-wider flex items-center gap-2">
                        <span className="text-paan-yellow text-2xl">&bull;</span>
                        Training Formats
                    </span>
                    </div>
                </div>
                
                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 font-bold leading-tight mb-6 max-w-4xl mx-auto">
                    Flexible Formats for Any Team
                </h2>
                
                {/* Subheading */}
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Train your team your way, virtually or on-site with expert-led sessions tailored to your needs.
                </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">              
                {/* Image Section */}
                <div className="order-2 lg:order-1">
                    <div className="relative">
                    <Image 
                        src="/assets/images/paan-academy/img-4.png" 
                        width={600} 
                        height={400} 
                        alt="PAAN Academy Training Session" 
                        className="w-full h-auto object-cover" 
                    />
                    </div>
                </div>
                
                {/* Content Section */}
                <div className="order-1 lg:order-2">
                    <div className="space-y-8">
                    {/* Training Topics */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Our Core Training Formats
                        </h3>
                        
                        <ul className="space-y-5">
                        <li className="flex items-start group">
                            <span className="mr-4 mt-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>            
                            </span>
                            <div>
                            <h4 className="font-normal text-lg text-gray-900 mb-1">Onsite or Virtual Team Workshops</h4>
                            </div>
                        </li>
                        
                        <li className="flex items-start group">
                            <span className="mr-4 mt-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg> 
                            </span>
                            <div>
                            <h4 className="font-normal text-lg text-gray-900 mb-1">Half-Day, Full-Day or 3-Week Sprints</h4>
                            </div>
                        </li>
                        
                        <li className="flex items-start group">
                            <span className="mr-4 mt-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>  
                            </span>
                            <div>
                            <h4 className="font-normal text-lg text-gray-900 mb-1">Executive Bootcamps for CMOs and Marketing Leads</h4>
                            </div>
                        </li>
                        
                        <li className="flex items-start group">
                            <span className="mr-4 mt-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                            </svg>  
                            </span>
                            <div>
                            <h4 className="font-normal text-lg text-gray-900 mb-1">Ongoing Learning Subscriptions</h4>
                            </div>
                        </li>
                        </ul>
                    </div>
                    
                    {/* Call to Action */}
                    <div className="pt-8 border-t border-gray-200">
                        <p className="text-gray-700 font-medium mb-6 text-lg">
                        Ready to empower your team with Africa-specific, industry-relevant skills?
                        </p>
                        <button
                        className="bg-paan-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
                        onClick={() => {
                            gtag_report_conversion('https://calendly.com/njue-duncan-growthpad/paan-partners-introduction');
                        }}
                        >
                        Schedule a Free Training Consultation
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>

        <div className="bg-[#F3F9FB] relative" id="freelancers">
            <div 
                className="hidden sm:block absolute -top-5 left-60 w-5 h-16 bg-paan-maroon z-0"
                style={{
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(15deg)'
                }}
            >
            </div>
            <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
                <div className="text-center mb-16">
                {/* Badge */}
                <div className="inline-flex items-center justify-center mb-8">
                    <div className="bg-paan-green text-paan-dark-blue px-8 py-1 rounded-full text-sm font-semibold shadow-sm">
                    <span className="uppercase tracking-wider flex items-center gap-2">
                        <span className="text-paan-yellow text-2xl">&bull;</span>
                        Pan-African Creatives + Freelancers
                    </span>
                    </div>
                </div>
                
                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal leading-tight mb-6 max-w-4xl mx-auto">
                    Learn the Skills. Get Certified. Get Hired.
                </h2>
                
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">              
                    <div className="bg-white border border-paan-dark-blue rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        {/* Header Badge */}
                        <div className="p-6 pb-4 text-center">
                            <div className="inline-flex items-center gap-2 bg-paan-maroon backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="w-2 h-2 bg-paan-yellow rounded-full"></span>
                                <span className="text-white text-sm font-semibold uppercase tracking-wider">
                                    For Individuals
                                </span>
                            </div>
                        </div>

                        <h3 className="text-center text-xl">Grow Your Skills. Get Hired.</h3>
                        
                        {/* Content */}
                        <div className="p-6 pt-4">
                            {/* Description */}
                            <div className="mb-8">
                                <p className="text-gray-700 leading-relaxed text-base">
                                    Join PAAN Academy — the official training arm of the Pan African Agency Network — built to upskill African creatives, marketers, and freelancers with real-world skills, tools, and certifications.
                                </p>
                            </div>
                            
                            {/* Features List */}
                            <div className="mb-8">
                                <ul className="space-y-4">
                                    <li className="flex items-start group cursor-pointer">
                                        <span className="mr-4 mt-0.5 flex-shrink-0 text-paan-maroon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                            </svg>            
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-base group-hover:text-paan-maroon transition-colors duration-200">
                                                Courses starting from $29
                                            </h4>
                                        </div>
                                    </li>
                                    
                                    <li className="flex items-start group cursor-pointer">
                                        <span className="mr-4 mt-0.5 flex-shrink-0 text-paan-maroon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                            </svg> 
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-base group-hover:text-paan-maroon transition-colors duration-200">
                                                 Learn AI tools, digital media, branding
                                            </h4>
                                        </div>
                                    </li>
                                    
                                    <li className="flex items-start group cursor-pointer">
                                        <span className="mr-4 mt-0.5 flex-shrink-0 text-paan-maroon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                            </svg>  
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-base group-hover:text-paan-maroon transition-colors duration-200">
                                                PAAN Certification recognized continent-wide
                                            </h4>
                                        </div>
                                    </li>
                                    
                                    <li className="flex items-start group cursor-pointer">
                                        <span className="mr-4 mt-0.5 flex-shrink-0 text-paan-maroon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                            </svg>  
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-base group-hover:text-paan-maroon transition-colors duration-200">
                                                Join our Africa-wide freelance hiring network
                                            </h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* CTA Button */}
                            <div className="pt-4 border-t border-gray-100">
                                <button
                                    className="w-full bg-gradient-to-r from-paan-red to-paan-red/90 hover:from-paan-red/90 hover:to-paan-red text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-paan-red/50 focus:ring-offset-2"
                                    onClick={openModal}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Explore Mini Courses
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7"/>
                                            <path d="M7 7h10v10"/>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-paan-dark-blue text-white border border-gray-200 rounded-2xl hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        {/* Header Badge */}
                        <div className="bg-paan-dark-blue p-6 pb-4 text-center">
                            <div className="inline-flex items-center gap-2 bg-paan-maroon backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="w-2 h-2 bg-paan-dark-blue rounded-full"></span>
                                <span className="text-white text-sm font-semibold uppercase tracking-wider">
                                    For Teams
                                </span>
                            </div>
                        </div>
                        <h3 className="text-center text-xl">Upskill Your Team. Win More Work.</h3>
                        
                        {/* Content */}
                        <div className="p-6 pt-4">
                            {/* Description */}
                            <div className="mb-8">
                                <p className="leading-relaxed text-base">
                                PAAN Academy helps your agency stay sharp and competitive with tailored training programs for African agency teams — from creatives and strategists to account managers and new hires.
                                </p>
                            </div>
                            
                            {/* Features List */}
                            <div className="mb-8">
                                <ul className="space-y-4">
                                    <li className="flex items-start group cursor-pointer">
                                        <span className="mr-4 mt-0.5 flex-shrink-0 text-paan-yellow">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                            </svg>            
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-base group-hover:text-paan-blue transition-colors duration-200">
                                                Custom training for agency staff
                                            </h4>
                                        </div>
                                    </li>
                                    
                                    <li className="flex items-start group cursor-pointer">
                                        <span className="mr-4 mt-0.5 flex-shrink-0 text-paan-yellow">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                            </svg> 
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-base group-hover:text-paan-blue transition-colors duration-200">
                                                Improve client service, pitching, execution
                                            </h4>
                                        </div>
                                    </li>
                                    
                                    <li className="flex items-start group cursor-pointer">
                                        <span className="mr-4 mt-0.5 flex-shrink-0 text-paan-yellow">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                            </svg>  
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-base group-hover:text-paan-blue transition-colors duration-200">
                                                Get prioritized for cross-border campaigns
                                            </h4>
                                        </div>
                                    </li>
                                    
                                    <li className="flex items-start group cursor-pointer">
                                        <span className="mr-4 mt-0.5 flex-shrink-0 text-paan-yellow">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                            </svg>  
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-base group-hover:text-paan-blue transition-colors duration-200">
                                                Learn from Africa's top independent agencies
                                            </h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* CTA Button */}
                            <div className="pt-4 border-t border-gray-100">
                                <button
                                    className="w-full bg-paan-yellow text-paan-dark-blue px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-2"
                                    onClick={() => {
                                        gtag_report_conversion('https://calendly.com/njue-duncan-growthpad/paan-partners-introduction');
                                    }}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Schedule Team Consultation
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7"/>
                                            <path d="M7 7h10v10"/>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <PAAacademyMarquee />

        <ScrollToTop />
      </main>
      <Footer />
      </div>
    </>
  );
};

export default HomePage;