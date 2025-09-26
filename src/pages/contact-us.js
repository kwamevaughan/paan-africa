import SEO from "@/components/SEO";
import Header from "../layouts/standard-header";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState, useMemo } from "react";
import Parallax from "@/components/ContactParallax";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";


const contact = () => {
    const recaptchaRef = useRef(null);
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

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    
    // FIXED: Add missing state variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedAmbassador, setSelectedAmbassador] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Check if reCAPTCHA site key is available
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!recaptchaSiteKey) {
        console.error(
            "reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local"
        );
    }

    // Handle reCAPTCHA change
    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
        setErrors((prevErrors) => ({
            ...prevErrors,
            recaptcha: "",
        }));
    };

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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleVideoPlay = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
            } else {
                videoRef.current.play();
                setIsVideoPlaying(true);
            }
        }
    };

    const handleVideoEnded = () => {
        setIsVideoPlaying(false);
    };

    // Slider navigation functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % 1);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + 1) % 1);
    };

    // Profile modal functions
    const openProfileModal = (ambassador) => {
        setSelectedAmbassador(ambassador);
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setSelectedAmbassador(null);
        setIsProfileModalOpen(false);
    };

    // FIXED: Social media links using Lucide React icons
    const socialLinks = [
        {
            href: "https://www.facebook.com/panafricanagencynetwork",
            icon: "Facebook",
            label: "Facebook",
            hoverColor: "#1877F2"
        },
        {
            href: "https://www.linkedin.com/company/pan-african-agency-network",
            icon: "Linkedin",
            label: "LinkedIn",
            hoverColor: "#0077B5"
        },
        {
            href: "https://instagram.com/pan_african_agency_network",
            icon: "Instagram",
            label: "Instagram",
            hoverColor: "#E4405F"
        },
        {
            href: "https://x.com/paan_network",
            icon: "Twitter",
            label: "X",
            hoverColor: "#000000"
        }
    ];

    return (
        <>
            <SEO
                title="PAAN Ambassador Program | Become a Leader in Africa's Creative Economy | Pan-African Agency Network"
                description="Join the exclusive PAAN Ambassador Program and become a trusted leader in Africa's creative, digital, and strategic industries. Represent the future of African agencies and unlock exclusive benefits, VIP access, and thought leadership opportunities across 20+ African countries."
                keywords="PAAN Ambassador Program, African creative leaders, African marketing ambassadors, African digital leaders, African strategic leadership, PAAN network ambassadors, African creative economy, African marketing network leadership, African agency representatives, African industry leaders, African creative professionals, African digital professionals, African strategic professionals, African marketing leadership, African creative leadership, African digital leadership, African strategic leadership, African industry ambassadors, African creative ambassadors, African digital ambassadors, African strategic ambassadors, African marketing ambassadors, African creative economy leaders, African digital economy leaders, African strategic economy leaders, African marketing economy leaders, African creative industry leaders, African digital industry leaders, African strategic industry leaders, African marketing industry leaders"
            />
            <main className="sm:px-0 sm:pt-0 relative">
                <Header />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                    <Hero openModal={openModal} />
                </motion.div>

                {/* UPDATED: Contact Section with modified layout */}
                <div className="bg-[#E6F3F7] relative">
                    <section className="relative mx-auto max-w-7xl py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
                            {/* Contact Form - Takes up 2 columns (more space) */}
                            <div className="lg:col-span-2 bg-transparent rounded-lg p-6 sm:p-8">
                                <h3 className="text-2xl sm:text-3xl font-bold text-[#172840] mb-6">Send us a message</h3>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-[#172840] text-sm font-medium mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-[#172840] text-sm font-medium mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="organization" className="block text-[#172840] text-sm font-medium mb-2">
                                                Organization <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="organization"
                                                name="organization"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your organization"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-[#172840] text-sm font-medium mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="helpWith" className="block text-[#172840] text-sm font-medium mb-2">
                                                What do you need help with <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="helpWith"
                                                name="helpWith"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-300"
                                                placeholder="Describe what you need help with"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="hearAbout" className="block text-[#172840] text-sm font-medium mb-2">
                                                How did you hear about PAAN
                                            </label>
                                            <input
                                                type="text"
                                                id="hearAbout"
                                                name="hearAbout"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-300"
                                                placeholder="How did you hear about us?"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-[#172840] text-sm font-medium mb-2">
                                            Additional Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="Enter your message here..."
                                        />
                                    </div>

                                    {/* reCAPTCHA */}
                                    <div className="flex justify-center">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={recaptchaSiteKey}
                                            onChange={handleRecaptchaChange}
                                        />
                                        {errors.recaptcha && (
                                            <p className="text-red-500 text-sm mt-1">{errors.recaptcha}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-8 items-center pt-4">
                                        {/* Submit Button */}
                                        <div className="text-left">
                                            <button
                                                type="submit"
                                                className="bg-[#F25849] hover:bg-[#E04538] text-white px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                        <p className="text-sm">We aim to respond within 2 business days.</p>
                                    </div>
                                </form>
                            </div>

                            {/* Contact Information - Takes up 1 column (less space, far right) */}
                            <div className="lg:col-span-1 bg-white rounded-lg p-6 sm:p-8 shadow-lg h-fit">
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#172840] mb-8">Direct Contact</h2>
                                
                                <div className="space-y-6">
                                    {/* Membership Section */}
                                    <div className="pb-4 border-b border-gray-200">
                                        <h3 className="text-lg font-semibold text-[#172840] mb-3">Membership & Join PAAN</h3>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-[#F25849] flex-shrink-0">
                                                <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/>
                                            </svg>
                                            <a href="mailto:membership@paan.africa" className="hover:text-[#F25849] transition-colors duration-300">
                                                membership@paan.africa
                                            </a>
                                        </div>
                                    </div>

                                    {/* Partners Section */}
                                    <div className="pb-4 border-b border-gray-200">
                                        <h3 className="text-lg font-semibold text-[#172840] mb-3">Partners</h3>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-[#F25849] flex-shrink-0">
                                                <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/>
                                            </svg>
                                            <a href="mailto:secretariat@paan.africa" className="hover:text-[#F25849] transition-colors duration-300">
                                                secretariat@paan.africa
                                            </a>
                                        </div>
                                    </div>

                                    {/* General Enquiries Section */}
                                    <div className="pb-4 border-b border-gray-200">
                                        <h3 className="text-lg font-semibold text-[#172840] mb-3">General Enquiries</h3>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-[#F25849] flex-shrink-0">
                                                <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/>
                                            </svg>
                                            <a href="mailto:secretariat@paan.africa" className="hover:text-[#F25849] transition-colors duration-300">
                                                secretariat@paan.africa
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone Section */}
                                    <div className="pb-4 border-b border-gray-200">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-[#F25849] flex-shrink-0">
                                                <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"/>
                                            </svg>
                                            <a href="tel:+254701850850" className="hover:text-[#F25849] transition-colors duration-300">
                                                +254 701 850 850
                                            </a>
                                        </div>
                                    </div>

                                    {/* Address Section */}
                                    <div className="pb-6 border-b border-gray-200">
                                        <div className="flex items-start gap-3 text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-[#F25849] flex-shrink-0 mt-1">
                                                <path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/>
                                            </svg>
                                            <span className="leading-relaxed">
                                                7th Floor, Mitsumi Business Park,<br />
                                                Westlands, Nairobi, Kenya
                                            </span>
                                        </div>
                                    </div>

                                    {/* Social Media Section */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#172840] mb-4">Follow Us</h3>
                                        <div className="flex gap-4">
                                            {/* Facebook */}
                                            <a
                                                href="https://www.facebook.com/panafricanagencynetwork"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Facebook"
                                                className="group p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-gray-600 group-hover:text-[#F25849] transition-colors duration-300">
                                                    <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/>
                                                </svg>
                                            </a>

                                            {/* LinkedIn */}
                                            <a
                                                href="https://www.linkedin.com/company/pan-african-agency-network"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="LinkedIn"
                                                className="group p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-gray-600 group-hover:text-[#F25849] transition-colors duration-300">
                                                    <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/>
                                                </svg>
                                            </a>

                                            {/* Instagram */}
                                            <a
                                                href="https://instagram.com/pan_african_agency_network"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Instagram"
                                                className="group p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-gray-600 group-hover:text-[#F25849] transition-colors duration-300">
                                                    <path fill="currentColor" d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"/>
                                                </svg>
                                            </a>

                                            {/* X (Twitter) */}
                                            <a
                                                href="https://x.com/paan_network"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="X"
                                                className="group p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" className="text-gray-600 group-hover:text-[#F25849] transition-colors duration-300">
                                                    <path fill="currentColor" d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07l-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Parallax />
                <Footer />
                <ScrollToTop />
            </main>
        </>
    );
};

// FIXED: Hero component to accept props
const Hero = ({ openModal }) => {
    return (
        <div
            className="relative h-screen w-full bg-gray-900 overflow-visible" 
            id="home"
        >
            {/* Background image positioned to cover full container */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/contact/hero.webp')"
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            <div className="relative h-full flex mx-auto max-w-6xl">
                <div className="w-full px-4 sm:px-6 md:px-8 pb-0 sm:pb-24 flex flex-col justify-center sm:justify-end h-full">
                    <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
                        <h1 className="text-4xl text-white font-bold">
                            Let's Talk
                        </h1>
                        <p className="text-white text-base sm:text-lg mb-6 font-light w-full leading-relaxed">
                            Have a project, partnership idea, or membership question? We'll connect you with the right person.
                        </p>              
                    </div>
                </div>
            </div>
        </div>
    );
};

export default contact;