import SEO from "@/components/SEO";
import Header from "../../layouts/header";
import Image from "next/image";
import Footer from "../../layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../../utils/scrollUtils';
import ScrollToTop from "@/components/ScrollToTop";
import ConnectingDots from "@/components/ConnectingDots";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';


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
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '', recaptchaToken: '' });
  const [contactStatus, setContactStatus] = useState(null); // 'success' | 'error' | null
  const [isSending, setIsSending] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Hide overlay when playing, show when paused or ended
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => setIsPlaying(false);
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

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

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setContactStatus(null);
    // TODO: Integrate reCAPTCHA and set recaptchaToken in contactForm
    try {
      const res = await fetch('/api/send-agency-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, agency: 'Aquila East Africa' }),
      });
      if (res.ok) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', company: '', message: '', recaptchaToken: '' });
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
    setIsSending(false);
  };

  return (
    <>
    <SEO
        title="Aquila East Africa | Certified PAAN Agency in Nairobi, Kenya"
        description="Aquila East Africa is a certified member of the Pan-African Agency Network (PAAN), specializing in digital campaigns, media planning, and market localization across Africa. Connect with us for creative marketing, advertising, and brand activation."
        keywords="Aquila East Africa, PAAN, certified agency, Nairobi, Kenya, digital campaigns, media planning, market localization, creative marketing, advertising, brand activation, Africa"
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
          <section className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 sm:px-8 lg:px-16">
            <div className="text-center max-w-4xl mx-auto w-full">
              <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 w-full">
                <motion.div
                  initial={{ x: 150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, type: "spring" }}
                >
                  <Image 
                    src="/assets/images/certified-members/aquila-logo.svg" 
                    width={400} 
                    height={280} 
                    alt="AQCILLA Logo" 
                    className="mx-auto w-40 sm:w-64 h-auto object-contain" 
                  />
                </motion.div>
                <motion.div
                  initial={{ x: -150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, type: "spring" }}
                >
                  <Image 
                    src="/assets/images/certified-members/badge.svg" 
                    width={110} 
                    height={70} 
                    alt="AQuiLLA DIGITAL Badge" 
                    className="mx-auto w-16 sm:w-20 h-auto object-contain" 
                  />
                </motion.div>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl uppercase font-bold text-gray-900 mb-2 sm:mb-4">
                Aquila East Africa
              </h1>
              <p className="text-sm sm:text-md lg:text-lg text-gray-600 max-w-2xl mx-auto mb-2 sm:mb-4">
                An official member of the PAAN Network, delivering with insight, speed, and local expertise
              </p>
            </div>
            {/* Location and Flags at the bottom of hero */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center items-center gap-2 sm:gap-3 bg-white/80 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-md w-[95vw] max-w-md text-xs sm:text-base">
              <Icon icon="mdi:map-marker" className="w-4 h-4 sm:w-5 sm:h-5 text-paan-blue" />
              <span className="font-medium text-gray-700">Kenya</span>
              <span title="Kenya">
                <svg width="20" height="14" viewBox="0 0 24 16"><rect width="24" height="16" fill="#fff"/><rect y="0" width="24" height="5.33" fill="#060"/><rect y="5.33" width="24" height="5.33" fill="#fff"/><rect y="10.66" width="24" height="5.34" fill="#f00"/><rect y="5.33" width="24" height="5.33" fill="#000"/><ellipse cx="12" cy="8" rx="3" ry="8" fill="#fff"/><ellipse cx="12" cy="8" rx="2.2" ry="7.2" fill="#f00"/></svg>
              </span>
              <span className="font-medium text-gray-700">Uganda</span>
              <span title="Uganda">
                <svg width="20" height="14" viewBox="0 0 24 16"><rect width="24" height="16" fill="#fff"/><rect y="0" width="24" height="2.67" fill="#ff0"/><rect y="2.67" width="24" height="2.67" fill="#000"/><rect y="5.34" width="24" height="2.66" fill="#f00"/><rect y="8" width="24" height="2.67" fill="#ff0"/><rect y="10.67" width="24" height="2.66" fill="#000"/><rect y="13.33" width="24" height="2.67" fill="#f00"/></svg>
              </span>
              <span className="font-medium text-gray-700">Rwanda</span>
              <span title="Rwanda">
                <svg width="20" height="14" viewBox="0 0 24 16"><rect width="24" height="16" fill="#338af3"/><rect y="10.67" width="24" height="5.33" fill="#ffda44"/><rect y="8" width="24" height="2.67" fill="#496e2d"/><circle cx="20" cy="4" r="2" fill="#ffda44"/></svg>
              </span>
            </div>
          </section>
        </div>
        
        <div className="bg-paan-blue relative">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Content Column */}
              <div className="order-2 md:order-1">
                <div className="space-y-8">
                  {/* Main Heading */}
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-paan-dark-blue leading-tight">
                      About Aquila East Africa
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-paan-dark-blue to-paan-dark-blue/60"></div>
                  </div>
                  {/* Member Since Badge */}
                  <div className="inline-flex items-center bg-paan-dark-blue/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-paan-dark-blue/20">
                    <span className="text-sm font-medium text-paan-dark-blue/90">
                      Member Since 2025
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-lg sm:text-xl leading-relaxed text-paan-dark-blue/90 font-light">
                    Aquila East Africa is a creative agency based in Nairobi, Kenya, specializing in 
                    pan-African digital campaigns, media planning, and market localization. As a certified 
                    PAAN Partner, they bring cultural fluency, regional insight, and consistent results 
                    to brands expanding across the continent.
                  </p>

                  {/* Areas of Specialization */}
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-paan-dark-blue mb-4">
                      Areas of Specialization
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Creative Marketing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Advertising Solutions</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Brand Activation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">PR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Column */}
              <div className="order-1 md:order-2">
                <div className="relative group">
                  {/* Video Container */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                    <iframe
                      className="w-full h-auto aspect-video object-cover"
                      src="https://www.youtube.com/embed/zJd1akSivAw"
                      title="Aquila East Africa"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>
                </div>
              </div>
              
            </div>
          </section>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20"></div>
            
            <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                  {/* Quote icon - large and on the left */}
                  <div className="flex-shrink-0">           
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" className="text-paan-red opacity-80">
                      <path fill="currentColor" d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10m11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10"/>
                    </svg>
                  </div>
                  
                  {/* Content on the right */}
                  <div className="flex-1">
                    {/* Testimonial text */}
                    <blockquote className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed mb-8 italic">
                      "PAAN has enabled us to access new business opportunities across Africa and has also played a pivotal role in upskilling our teams through training programs & webinars tailored to agencies."
                    </blockquote>
                    
                    {/* Attribution */}
                    <div className="flex flex-col items-start space-y-2">
                      <div className="w-16 h-px bg-gradient-to-r from-paan-dark-blue to-paan-purple"></div>
                      <cite className="not-italic">
                        <div className="font-semibold text-lg text-gray-900">Kester Muhanji</div>
                        <div className="text-gray-600 text-sm">CEO, Aquila East Africa</div>
                      </cite>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>

        {/* Contact Agency Button Section */}
      <section className="relative mx-auto max-w-2xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center">
          <button
            className="bg-paan-blue text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-paan-dark-blue transition-colors duration-200 text-lg"
            onClick={() => setIsContactModalOpen(true)}
          >
            Contact Agency
          </button>
        </div>
      </section>
      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-paan-blue text-2xl"
              onClick={() => { setIsContactModalOpen(false); setContactStatus(null); }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-paan-dark-blue mb-4 text-center">Contact Aquila East Africa</h2>
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="contact-name" name="name" required value={contactForm.name} onChange={handleContactChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-paan-blue focus:border-paan-blue" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="contact-email" name="email" required value={contactForm.email} onChange={handleContactChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-paan-blue focus:border-paan-blue" />
              </div>
              <div>
                <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" id="contact-company" name="company" required value={contactForm.company} onChange={handleContactChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-paan-blue focus:border-paan-blue" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="contact-message" name="message" rows={4} required value={contactForm.message} onChange={handleContactChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-paan-blue focus:border-paan-blue"></textarea>
              </div>
              {/* Placeholder for reCAPTCHA integration */}
              <input type="hidden" name="recaptchaToken" value={contactForm.recaptchaToken} />
              <button type="submit" className="w-full bg-paan-blue text-white font-semibold py-3 rounded-lg hover:bg-paan-dark-blue transition-colors duration-200 shadow-md disabled:opacity-60" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
              {contactStatus === 'success' && <div className="text-green-600 text-center font-medium mt-2">Message sent successfully!</div>}
              {contactStatus === 'error' && <div className="text-red-600 text-center font-medium mt-2">Failed to send. Please try again.</div>}
            </form>
          </div>
        </div>
      )}
      {/* Contact Agency */}
        

      <div className="bg-paan-red relative mb-10 sm:mb-0">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-paan-dark-blue mb-6 sm:mb-8">
                Want to <span className="font-bold">Join</span> the <span className="font-bold">PAAN Network</span>?
              </h3>
              <p className="text-paan-dark-blue text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Become part of our professional community and unlock exclusive opportunities for growth and collaboration.
              </p>
              <button                  
                className="bg-paan-dark-blue text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-normal text-base sm:text-lg hover:bg-[#D6473C] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto min-w-[280px]"
                onClick={(e) => {
                  handleScroll(e, "https://membership.paan.africa/", isFixed);
                }}
              >
                Become a Certified Member
              </button>
            </div>
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