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
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';


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
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '' });
  const [contactErrors, setContactErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Check if reCAPTCHA site key is available
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaSiteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local"
    );
  }

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
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (contactErrors[name]) {
      setContactErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setContactErrors(prev => ({
      ...prev,
      recaptcha: ''
    }));
  };

  const validateContactForm = () => {
    const newErrors = {};
    if (!contactForm.name.trim()) newErrors.name = 'Name is required';
    if (!contactForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!contactForm.company.trim()) newErrors.company = 'Company name is required';
    if (!contactForm.message.trim()) newErrors.message = 'Message is required';
    if (!recaptchaToken) newErrors.recaptcha = 'Please complete the reCAPTCHA';
    return newErrors;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateContactForm();
    if (Object.keys(validationErrors).length > 0) {
      setContactErrors(validationErrors);
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    setIsSending(true);
    const toastId = toast.loading('Sending your message...');

    try {
      const res = await fetch('/api/send-agency-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...contactForm, 
          recaptchaToken,
          agency: 'LyftUp' 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Message sent successfully!', { id: toastId });
        // Reset form and reCAPTCHA
        setContactForm({ name: '', email: '', company: '', message: '' });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
        setIsContactModalOpen(false);
      } else {
        toast.error(data.message || 'Failed to send message.', { id: toastId });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
    <SEO
        title="LiftUp Agency | Certified PAAN Creative Marketing Agency | Egypt, Kuwait, UAE, Saudi Arabia"
        description="LiftUp Agency is a certified member of the Pan-African Agency Network (PAAN), specializing in strategic marketing, advertising, creative services, and event management across Egypt, Kuwait, Oman, Saudi Arabia, UAE, and United States."
        keywords="LiftUp Agency, PAAN, certified agency, Egypt, Kuwait, UAE, Saudi Arabia, creative marketing, advertising, strategic marketing, event management, communication, research, Cairo, creative services"
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
                  src="/assets/images/certified-members/lyftup/logo.png" 
                  width={400} 
                  height={280} 
                  alt="LiftUp Logo" 
                  className="mx-auto w-40 sm:w-64 h-auto object-contain" 
                />
              </motion.div>
              
              {/* Badge Container with both certification and membership level */}
              <motion.div
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="flex flex-col items-center gap-3"
              >
                <Image 
                  src="/assets/images/certified-members/badge.svg" 
                  width={110} 
                  height={70} 
                  alt="PAAN Certified Member Badge" 
                  className="mx-auto w-16 sm:w-20 h-auto object-contain" 
                />
              </motion.div>
            </div>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl uppercase font-bold text-gray-900 mb-2 sm:mb-4">
                  LiftUp Agency 
              </h1>
              <p className="text-sm sm:text-md lg:text-lg text-gray-600 max-w-2xl mx-auto mb-2 sm:mb-4">
                An official member of the PAAN Network, delivering with insight, speed, and local expertise
              </p>
            </div>
            {/* Location and Flags at the bottom of hero */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center items-center gap-2 sm:gap-3 bg-white/80 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-md w-[95vw] max-w-3xl text-xs sm:text-base">
              <Icon icon="mdi:map-marker" className="w-4 h-4 sm:w-5 sm:h-5 text-paan-blue" />
              
              <span className="font-medium text-gray-700">Egypt</span>
              <span title="Egypt">
                <Image
                  src="https://flagcdn.com/w20/eg.png"
                  alt="Egypt flag"
                  width={20}
                  height={14}
                  style={{ display: 'inline', verticalAlign: 'middle' }}
                />
              </span>
              
              <span className="font-medium text-gray-700">Kuwait</span>
              <span title="Kuwait">
                <Image
                  src="https://flagcdn.com/w20/kw.png"
                  alt="Kuwait flag"
                  width={20}
                  height={14}
                  style={{ display: 'inline', verticalAlign: 'middle' }}
                />
              </span>
              
              <span className="font-medium text-gray-700">Oman</span>
              <span title="Oman">
                <Image
                  src="https://flagcdn.com/w20/om.png"
                  alt="Oman flag"
                  width={20}
                  height={14}
                  style={{ display: 'inline', verticalAlign: 'middle' }}
                />
              </span>
              
              <span className="font-medium text-gray-700">Saudi Arabia</span>
              <span title="Saudi Arabia">
                <Image
                  src="https://flagcdn.com/w20/sa.png"
                  alt="Saudi Arabia flag"
                  width={20}
                  height={14}
                  style={{ display: 'inline', verticalAlign: 'middle' }}
                />
              </span>
              
              <span className="font-medium text-gray-700">UAE</span>
              <span title="United Arab Emirates">
                <Image
                  src="https://flagcdn.com/w20/ae.png"
                  alt="UAE flag"
                  width={20}
                  height={14}
                  style={{ display: 'inline', verticalAlign: 'middle' }}
                />
              </span>
              
              <span className="font-medium text-gray-700">United States</span>
              <span title="United States">
                <Image
                  src="https://flagcdn.com/w20/us.png"
                  alt="United States flag"
                  width={20}
                  height={14}
                  style={{ display: 'inline', verticalAlign: 'middle' }}
                />
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
                      About LiftUp Agency
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-paan-dark-blue to-paan-dark-blue/60"></div>
                  </div>

                  {/* Description */}
                  <p className="text-lg sm:text-xl leading-relaxed text-paan-dark-blue/90 font-light">
                    Liftup is a creative agency based in Egypt, focusing on strategic marketing, advertising and planning.
                    From the story you want to tell, the results you want to achieve, Liftup is here to encourage imaginative thinking. 
                    They advise, plan, and execute. LiftUp is your partner in building your brand from A to Z, offering comprehensive 360 solutions
                  </p>

                  {/* Areas of Specialization */}
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-paan-dark-blue mb-4">
                      Areas of Specialization
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Marketing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Advertising</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Creative Services</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Event management</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Research</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">Communication</span>
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
                    <video
                      ref={videoRef}
                      className="w-full h-auto aspect-video object-cover"
                      controls
                      preload="metadata"
                      poster="/assets/images/certified-members/about-img.png"
                    >
                      <source src="/assets/images/certified-members/lyftup/video.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>
                </div>
              </div>

              
            </div>
          </section>
        </div>
        <div className="bg-gradient-to-r from-paan-blue/5 to-paan-dark-blue/5 py-8 relative z-10">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              
              {/* Certification Status */}
              <div className="text-center">
                <div className="inline-flex items-center bg-white rounded-2xl px-6 py-4 shadow-lg border border-paan-blue/20">
                  <Image 
                    src="/assets/images/certified-members/badge.svg" 
                    width={40} 
                    height={40} 
                    alt="PAAN Badge" 
                    className="mr-3" 
                  />
                  <div className="text-left">
                    <div className="text-sm text-gray-600">Certification Status</div>
                    <div className="font-semibold text-paan-dark-blue">PAAN Certified</div>
                  </div>
                </div>
              </div>

              {/* Membership Level */}
              <div className="text-center">
                <div className="inline-flex items-center bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl px-6 py-4 shadow-lg">
                  <Icon icon="mdi:crown" className="w-10 h-10 text-white mr-3" />
                  <div className="text-left">
                    <div className="text-sm text-amber-100">Membership Level</div>
                    <div className="font-bold text-white">Full Member</div>
                  </div>
                </div>
              </div>

              {/* Years of Service */}
              <div className="text-center">
                <div className="inline-flex items-center bg-white rounded-2xl px-6 py-4 shadow-lg border border-paan-blue/20">
                  <Icon icon="mdi:calendar-check" className="w-10 h-10 text-paan-blue mr-3" />
                  <div className="text-left">
                    <div className="text-sm text-gray-600">Member Since</div>
                    <div className="font-semibold text-paan-dark-blue">2025</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Clients They Have Worked With Section */}
        <div className="bg-white py-16 sm:py-20 relative z-10">
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-paan-dark-blue text-center mb-10">Clients LiftUp Has Worked With</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 items-center justify-center">
              {[1,2,3,4,5,7,8,9,10,11,12,13,].map((num) => (
                <div key={num} className="flex items-center justify-center p-4 bg-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <Image
                    src={`/assets/images/certified-members/lyftup/${num}.png`}
                    alt={`Client logo ${num}`}
                    width={120}
                    height={60}
                    className="object-contain h-16 w-auto"
                  />
                </div>
              ))}
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
                      "Everything should be as simple as possible, but not simpler."
                    </blockquote>
                    
                    {/* Attribution */}
                    <div className="flex flex-col items-start space-y-2">
                      <div className="w-16 h-px bg-gradient-to-r from-paan-dark-blue to-paan-purple"></div>
                      <cite className="not-italic">
                        <div className="font-semibold text-lg text-gray-900">Islam Ismail</div>
                        <div className="text-gray-600 text-sm">LiftUp, Founder and MD</div>
                      </cite>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>

        {/* Contact Agency Button Section */}
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center space-y-8">
          {/* Main Contact Button */}
          <div>
            <button
              className="bg-paan-blue text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-paan-dark-blue transition-colors duration-200 text-lg"
              onClick={() => setIsContactModalOpen(true)}
            >
              Contact Agency
            </button>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">Follow us on social media</p>
            <div className="flex justify-center items-center gap-6">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/liftup-innovative-marketing-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Icon
                  icon="mdi:linkedin"
                  width="28"
                  height="28"
                  className="text-gray-400 group-hover:text-[#0077B5] transition-colors duration-300"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/liftupim?igsh=MXA3YjM1M2x0dWN6dw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Icon
                  icon="mingcute:instagram-fill"
                  width="28"
                  height="28"
                  className="text-gray-400 group-hover:text-[#E4405F] transition-colors duration-300"
                />
              </a>

              {/* Facebook */}
              <a
                href="https://web.facebook.com/liftupim/?_rdc=1&_rdr#"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Icon
                  icon="ic:baseline-facebook"
                  width="28"
                  height="28"
                  className="text-gray-400 group-hover:text-[#1877F2] transition-colors duration-300"
                />
              </a>

              {/* Website */}
              <a
                href="https://liftupim.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:scale-110"
                aria-label="Website"
              >
                <Icon
                  icon="mdi:web"
                  width="28"
                  height="28"
                  className="text-gray-400 group-hover:text-paan-blue transition-colors duration-300"
                />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:email" className="w-4 h-4 text-paan-blue" />
                <span>admin@liftupim.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:map-marker" className="w-4 h-4 text-paan-blue" />
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full relative overflow-hidden shadow-xl">
            {/* Close button */}
            <button
              onClick={() => { 
                setIsContactModalOpen(false); 
                setContactErrors({});
                setRecaptchaToken(null);
              }}
              className="absolute top-4 right-4 text-[#172840] hover:text-[#F25849] transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-[#172840] mb-2">Contact LyftUp</h2>
                <p className="text-gray-600">Get in touch with our team for your creative marketing needs</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[#172840] mb-1">
                      Full Name <span className="text-[#F25849]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={contactForm.name}
                      onChange={handleContactChange}
                      disabled={isSending}
                      className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                        contactErrors.name ? 'border-red-500' : ''
                      } ${isSending ? 'opacity-50' : ''}`}
                    />
                    {contactErrors.name && <p className="text-red-500 text-sm mt-1">{contactErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[#172840] mb-1">
                      Email Address <span className="text-[#F25849]">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={contactForm.email}
                      onChange={handleContactChange}
                      disabled={isSending}
                      className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                        contactErrors.email ? 'border-red-500' : ''
                      } ${isSending ? 'opacity-50' : ''}`}
                    />
                    {contactErrors.email && <p className="text-red-500 text-sm mt-1">{contactErrors.email}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="contact-company" className="block text-sm font-medium text-[#172840] mb-1">
                      Company Name <span className="text-[#F25849]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      required
                      value={contactForm.company}
                      onChange={handleContactChange}
                      disabled={isSending}
                      className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                        contactErrors.company ? 'border-red-500' : ''
                      } ${isSending ? 'opacity-50' : ''}`}
                    />
                    {contactErrors.company && <p className="text-red-500 text-sm mt-1">{contactErrors.company}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-[#172840] mb-1">
                    Message <span className="text-[#F25849]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={contactForm.message}
                    onChange={handleContactChange}
                    disabled={isSending}
                    rows="4"
                    className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 resize-none ${
                      contactErrors.message ? 'border-red-500' : ''
                    } ${isSending ? 'opacity-50' : ''}`}
                    placeholder="Tell us about your project, goals, and requirements..."
                  ></textarea>
                  {contactErrors.message && <p className="text-red-500 text-sm mt-1">{contactErrors.message}</p>}
                </div>

                {/* reCAPTCHA */}
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={recaptchaSiteKey}
                    onChange={handleRecaptchaChange}
                  />
                  {contactErrors.recaptcha && (
                    <p className="text-red-500 text-sm mt-1">{contactErrors.recaptcha}</p>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`bg-[#F25849] text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] hover:shadow-lg font-medium text-sm ${
                      isSending ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
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