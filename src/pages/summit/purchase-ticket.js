import SEO from "@/components/SEO";
import Header from "@/layouts/ticket-purchase-header";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SummitFooter from "@/layouts/summit-footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../../utils/scrollUtils';
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";
import Script from "next/script";
import PartnerWithUsModal from "@/components/PartnerWithUsModal";
import ExhibitionApplicationModal from "@/components/ExhibitionApplicationModal";
import { motion } from "framer-motion";
import { useAppTranslations } from '../../hooks/useTranslations';
import { toast } from "react-hot-toast";
import { completePurchase, verifyAndCompletePayment } from '../../lib/ticketService';
import { initializePayment, generatePaymentReference } from '../../lib/paystack';
import { validatePromoCode } from '../../lib/promoCodeService';

// Animation variants - defined outside component for global access
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const StepBar = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Select Tickets' },
    { id: 2, name: 'Attendee Details' },
    { id: 3, name: 'Payment' }
  ];

  return (
    <motion.div 
      className="w-full py-4 sm:py-6 px-3 sm:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Line connecting steps - runs from first to last circle */}
          <motion.div 
            className="absolute top-4 sm:top-5 left-[12px] sm:left-[24px] right-[12px] sm:right-[24px] h-1 bg-paan-dark-blue rounded-full origin-left hidden sm:block"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: currentStep > 1 ? 1 : 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              className="flex flex-col items-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold border-2 ${
                    step.id <= currentStep
                    ? 'bg-paan-dark-blue text-white border-paan-dark-blue'
                    : 'bg-white text-gray-500 border-gray-300'
                  }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                >
                  {step.id}
              </motion.div>
              <motion.span
                  className={`mt-1 sm:mt-2 text-xs font-medium text-center max-w-[80px] sm:max-w-none ${
                    step.id <= currentStep ? 'text-paan-dark-blue' : 'text-gray-500'
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  {step.name}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SummitPage = () => {
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    highlights: useRef(null),
    themes: useRef(null),
    sessions: useRef(null),
    whoShouldAttend: useRef(null),
    tickets: useRef(null),
    events: useRef(null),
    contactUs: useRef(null),
  };

  const isFixed = useFixedHeader();
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showExhibitionModal, setShowExhibitionModal] = useState(false);
  const [attendeeSelected, setAttendeeSelected] = useState(2);
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useAppTranslations();
  const [filteredTickets, setFilteredTickets] = useState();
  const [seatCount, setSeatCount] = useState(1);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // 1: Select Tickets, 2: Attendee Details, 3: Payment
  
  // Form state management
  const [purchaserInfo, setPurchaserInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    country: '',
    attending: false
  });
  
  const [attendees, setAttendees] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    promoCode: '',
    invoiceDetails: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeValidation, setPromoCodeValidation] = useState(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Form validation
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (selectedTickets.length === 0) {
        newErrors.tickets = "Please select at least one ticket";
      }
    } else if (step === 2) {
      if (!purchaserInfo.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!purchaserInfo.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(purchaserInfo.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!purchaserInfo.phone.trim()) {
        newErrors.phone = "Phone number is required";
      }
      if (!purchaserInfo.organization.trim()) {
        newErrors.organization = "Organization is required";
      }
      if (!purchaserInfo.country.trim()) {
        newErrors.country = "Country is required";
      }
      
      // Validate attendees
      const totalAttendees = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
      if (attendees.length !== totalAttendees) {
        newErrors.attendees = "Please fill in all attendee information";
      }
      
      attendees.forEach((attendee, index) => {
        if (!attendee.name?.trim()) {
          newErrors[`attendee${index}Name`] = "Attendee name is required";
        }
        if (!attendee.email?.trim()) {
          newErrors[`attendee${index}Email`] = "Attendee email is required";
        } else if (!/\S+@\S+\.\S+/.test(attendee.email)) {
          newErrors[`attendee${index}Email`] = "Attendee email is invalid";
        }
        if (!attendee.role?.trim()) {
          newErrors[`attendee${index}Role`] = "Attendee role is required";
        }
        if (!attendee.organization?.trim()) {
          newErrors[`attendee${index}Org`] = "Attendee organization is required";
        }
      });
      
      // Validate terms acceptance
      if (!termsAccepted) {
        newErrors.terms = "You must accept the terms and conditions to proceed";
      }
    } else if (step === 3) {
      if (paymentInfo.method === 'bank') {
        if (!paymentInfo.invoiceDetails.trim()) {
          newErrors.invoiceDetails = "Invoice details are required for bank transfer";
        }
      }
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    
    setErrors({});
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      handleFinalSubmission();
    }
  };

  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Processing your purchase...");

    try {
      // Calculate total amount
      const totalAmount = selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
      
      // Prepare purchase data
      const purchaseData = {
        purchaserInfo: {
          full_name: purchaserInfo.fullName,
          email: purchaserInfo.email,
          phone: purchaserInfo.phone,
          organization: purchaserInfo.organization,
          country: purchaserInfo.country,
          is_attending: purchaserInfo.attending,
          terms_accepted: termsAccepted,
          updates_consent: false // Default to false unless user opts in
        },
        selectedTickets,
        attendees,
        totalAmount,
        paymentMethod: paymentInfo.method,
        promoCode: promoCodeValidation?.valid ? promoCode : null
      };

      // Complete the purchase (save to database)
      const { purchase, purchaser, totalAmount: finalAmount } = await completePurchase(purchaseData);
      
      if (paymentInfo.method === 'bank') {
        // For bank transfer, just show success message
        toast.dismiss(toastId);
        toast.success("Purchase registered successfully! Please complete bank transfer and send proof to secretariat@paan.africa", { id: 'bank-success' });
        
        // Reset form after successful registration
        setTimeout(() => {
          setSelectedTickets([]);
          setPurchaserInfo({
            fullName: '',
            email: '',
            phone: '',
            organization: '',
            country: '',
            attending: false
          });
          setAttendees([]);
              setPaymentInfo({
                method: 'card',
                promoCode: '',
                invoiceDetails: ''
              });
          setCurrentStep(1);
          setErrors({});
        }, 3000);
      } else {
        // For card payments, proceed with Paystack
        toast.dismiss(toastId);
        toast.loading("Initializing payment...", { id: 'payment-init' });

        // Initialize payment with Paystack
        const paymentReference = generatePaymentReference();
        
        const paymentHandler = await initializePayment({
          email: purchaserInfo.email,
          amount: finalAmount,
          currency: 'USD',
          reference: paymentReference,
          metadata: {
            purchase_id: purchase.id,
            purchaser_id: purchaser.id,
            ticket_count: selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0)
          },
          onSuccess: async (response) => {
            try {
              toast.dismiss('payment-init');
              toast.loading("Verifying payment...", { id: 'payment-verify' });
              
              // Verify payment and complete the process
              const result = await verifyAndCompletePayment(purchase.id, response.reference);
              
              toast.dismiss('payment-verify');
              toast.success("Payment completed successfully! You will receive a confirmation email shortly.", { id: 'success' });
              
              // Reset form after successful payment
              setTimeout(() => {
                setSelectedTickets([]);
                setPurchaserInfo({
                  fullName: '',
                  email: '',
                  phone: '',
                  organization: '',
                  country: '',
                  attending: false
                });
                setAttendees([]);
              setPaymentInfo({
                method: 'card',
                promoCode: '',
                invoiceDetails: ''
              });
                setCurrentStep(1);
                setErrors({});
              }, 3000);
              
            } catch (error) {
              console.error('Payment verification error:', error);
              toast.dismiss('payment-verify');
              toast.error("Payment verification failed. Please contact support.", { id: 'verify-error' });
            }
          },
          onClose: () => {
            toast.dismiss('payment-init');
            toast.error("Payment was cancelled. You can try again.", { id: 'payment-cancelled' });
          }
        });

        // Open Paystack payment modal
        paymentHandler.openIframe();
      }
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast.dismiss(toastId);
      toast.error(error.message || "Purchase failed. Please try again.", { id: 'purchase-error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Promo code validation
  const handlePromoCodeValidation = async (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    
    if (!promoCode.trim()) {
      setPromoCodeValidation(null);
      return;
    }

    setIsValidatingPromo(true);
    try {
      const validation = await validatePromoCode(promoCode, selectedTickets);
      setPromoCodeValidation(validation);
      
      if (validation.valid) {
        toast.success(`Promo code applied! You save $${validation.promoCode.discountAmount}`);
      } else {
        toast.error(validation.error);
      }
    } catch (error) {
      console.error('Promo code validation error:', error);
      toast.error('Error validating promo code');
    } finally {
      setIsValidatingPromo(false);
    }
  };

  // Input handlers
  const handlePurchaserChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPurchaserInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAttendeeChange = (index, field, value) => {
    setAttendees(prev => {
      const newAttendees = [...prev];
      if (!newAttendees[index]) {
        newAttendees[index] = { name: '', email: '', role: '', organization: '' };
      }
      newAttendees[index][field] = value;
      return newAttendees;
    });
    // Clear error when user starts typing
    const errorKey = `attendee${index}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : (type === 'checkbox' ? checked : value)
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Countdown timer effect
  useEffect(() => {
    // Set the target date (November 14th, 2025)
    const targetDate = new Date('2025-11-14T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize attendees when tickets are selected
  useEffect(() => {
    const totalAttendees = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
    setAttendeeSelected(totalAttendees);
    
    // Initialize attendees array
    const newAttendees = [];
    selectedTickets.forEach(ticket => {
      for (let i = 0; i < ticket.quantity; i++) {
        newAttendees.push({
          name: '',
          email: '',
          role: '',
          organization: '',
          ticketType: ticket.name
        });
      }
    });
    setAttendees(newAttendees);
  }, [selectedTickets]);
  
  // Count up animation state
  const [isVisible, setIsVisible] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

  // Intersection observer for stats animation
  useEffect(() => {
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(statsSection);
      
      return () => observer.unobserve(statsSection);
    }
  }, [isVisible]);
  
  useEffect(() => {
      let tickets;
      if (activeTab === 'upcoming') {
        tickets = '';
      } else if (activeTab === 'past') {
        tickets = '';
      } else {
        
      }
      
      setFilteredTickets(tickets);
    }, [activeTab, t]);
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setSelectedCategory(t('events.filters.allEvents'));
      setSelectedLocation(t('events.filters.allLocations'));
    };  
  

  return (
    <>
      <SEO
        title="PAAN Summit 2026 | Africa's Premier Creative & Tech Leadership Conference"
        description="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth. Connect with industry leaders, explore cutting-edge trends, and shape the future of African creativity and technology."
        keywords="PAAN Summit 2026, African creative summit, tech conference Africa, Nairobi summit, Pan-African events, African innovation, creative tech Africa, agency summit Africa, creative leadership, tech leadership, African business summit, innovation conference"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932"
        ogTitle="PAAN Summit 2026 | Africa's Premier Creative & Tech Leadership Conference"
        ogDescription="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth."
        twitterTitle="PAAN Summit 2026 | Africa's Premier Creative & Tech Leadership Conference"
        twitterDescription="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth."
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "PAAN Summit 2026 - Africa's Premier Creative & Tech Leadership Conference",
              "alternateName": "PAAN Inaugural Summit 2026",
              "startDate": "2026-04-21T09:00:00+03:00",
              "endDate": "2026-04-23T17:00:00+03:00",
              "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "Sarit Centre",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Sarit Centre, Westlands",
                  "addressLocality": "Nairobi",
                  "addressRegion": "Nairobi County",
                  "postalCode": "00100",
                  "addressCountry": "KE"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "-1.2921",
                  "longitude": "36.8219"
                }
              },
              "image": [
                "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932",
                "https://paan.africa/assets/images/hero.webp"
              ],
              "description": "Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth. Connect with industry leaders, explore cutting-edge trends, and shape the future of African creativity and technology.",
              "offers": {
                "@type": "Offer",
                "url": "https://paan.africa/summit",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-09-01T00:00:00+03:00",
                "description": "Free registration for PAAN Summit 2026"
              },
              "performer": { 
                "@type": "Organization", 
                "name": "PAAN Africa",
                "url": "https://paan.africa"
              },
              "organizer": { 
                "@type": "Organization", 
                "name": "Pan-African Agency Network (PAAN)", 
                "url": "https://paan.africa",
                "logo": "https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Creative and tech professionals, agency leaders, entrepreneurs, innovators"
              },
              "eventSchedule": {
                "@type": "Schedule",
                "startTime": "09:00",
                "endTime": "17:00",
                "repeatFrequency": "P1D",
                "duration": "P3D"
              },
              "keywords": "PAAN Summit 2026, African creative summit, tech conference Africa, Nairobi summit, Pan-African events, African innovation, creative tech Africa, agency summit Africa"
            }),
          }}
        />
      </Head>

      <main className="px-3 sm:px-0 relative">
        <Header navLinkColor='text-white' />

        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} timeLeft={timeLeft} />

          {/* Main Section */}
          <div className="bg-[#DAECF3]">
              {/* Progress bar */}
              <StepBar currentStep={currentStep} />
              {/* Main Content Area */}
              <div className="mx-auto max-w-7xl ">
                {/* Header */}
                <div className="text-paan-dark-blue text-center py-4">
                    <h2 className="font-bold text-2xl">
                      {currentStep === 1 && 'Select Your Tickets'}
                      {currentStep === 2 && 'Attendee Details'}
                      {currentStep === 3 && 'Payment'}
                    </h2>
                    <p className="font-normal">
                      {currentStep === 1 && 'Choose the tickets that best fit your needs for PAAN Summit 2026.'}
                      {currentStep === 2 && `You’re registering ${attendeeSelected} attendee(s) for PAAN Summit 2026.`}
                      {currentStep === 3 && 'Complete your payment to secure your tickets.'}
                    </p>
                </div>

                {/* Step Content */}
                {currentStep === 1 && <Tickets selectedTickets={selectedTickets} setSelectedTickets={setSelectedTickets} onNext={handleNext} errors={errors} />}
                {currentStep === 2 && <Attendees onNext={handleNext} onPrev={handlePrev} purchaserInfo={purchaserInfo} handlePurchaserChange={handlePurchaserChange} attendees={attendees} handleAttendeeChange={handleAttendeeChange} errors={errors} selectedTickets={selectedTickets} promoCodeValidation={promoCodeValidation} termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} />}
                {currentStep === 3 && <Payment onNext={handleNext} onPrev={handlePrev} paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange} selectedTickets={selectedTickets} errors={errors} isSubmitting={isSubmitting} promoCode={promoCode} setPromoCode={setPromoCode} promoCodeValidation={promoCodeValidation} setPromoCodeValidation={setPromoCodeValidation} handlePromoCodeValidation={handlePromoCodeValidation} isValidatingPromo={isValidatingPromo} />}
                
              </div>
          </div>
         
          {/* Parallax Section */}
          <div 
           className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]" 
           id="parallax-section" 
         >
           {/* Parallax Background Image */}
           <div 
             className="absolute inset-0 bg-cover bg-center bg-fixed"
             style={{
               backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/travel-guide-parallax-image.png')",
               filter: "brightness(0.8)"
             }}
           />
           
           {/* Dark overlay for better text readability */}
           <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
           
           <section className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 h-full flex items-center justify-center">
             <div className="text-left w-full max-w-4xl">
               <div className="mb-6 sm:mb-8 md:mb-12">
                 <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-bold uppercase mb-3 sm:mb-4 md:mb-6">Need Assistance?</h3>
                 <p className="text-base sm:text-lg md:text-xl font-normal text-white">Our logistics team can help with visas, hotels, and transport.</p>
               </div>
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8 justify-left">
                 <button 
                   onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Travel Assistance Request&body=Hello PAAN Travel Team,%0D%0A%0D%0AI need assistance with my travel arrangements for the PAAN Summit 2026 in Nairobi.%0D%0A%0D%0APlease help me with:%0D%0A- [ ] Visa requirements and application%0D%0A- [ ] Hotel recommendations and bookings%0D%0A- [ ] Transportation arrangements%0D%0A- [ ] General travel advice%0D%0A- [ ] Other: _________________%0D%0A%0D%0AAdditional details:%0D%0A%0D%0A%0D%0AThank you for your assistance.%0D%0A%0D%0ABest regards'}
                   className="bg-paan-blue text-paan-dark-blue px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base shadow-lg flex items-center justify-center gap-2"
                 >
                   Talk to Us
                 </button>
                 <button 
                   onClick={() => window.open('https://www.etakenya.go.ke/check-requirements', '_blank')}
                   className="bg-transparent border border-white text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base shadow-lg flex items-center justify-center gap-2"
                 >
                   Visa Quick Check
                 </button>
               </div>
             </div>
           </section>
         </div>     

         
         <div className="bg-paan-dark-blue relative">
           <div className="w-full h-[20px] sm:h-[30px] md:h-[40px] relative">
              <Image
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-pattern.svg"
                fill
                alt=""
               className="object-cover w-full h-full"
                loading="lazy"
                sizes="100vw"
              />
            </div>
         </div>
        <SummitFooter />
        <ScrollToTop />
        
        {/* Paystack Script */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="beforeInteractive"
          onLoad={() => {
            console.log('Paystack script loaded');
          }}
        />
        
        {/* Partner With Us Modal */}
        <PartnerWithUsModal 
          isOpen={showPartnerModal} 
          onClose={() => setShowPartnerModal(false)} 
        />
        
        {/* Exhibition Application Modal */}
        <ExhibitionApplicationModal 
          isOpen={showExhibitionModal} 
          onClose={() => setShowExhibitionModal(false)} 
        />
      </main>
    </>
  );
};

const Tickets = ({ selectedTickets, setSelectedTickets, onNext, errors }) => {
  const ticketTypes = [
    {
      name: 'General Admission',
      description: 'Access all keynotes, panels, exhibition & networking app.',
      price: 65,
      originalPrice: 95,
      bg: 'bg-gradient-to-r from-paan-yellow to-paan-red',
      border: 'border-paan-yellow',
      features: ['Full 2-day access', 'Exhibitions & keynotes', 'Digital certificate'],
      category: 'in-person'
    },
    {
      name: 'VIP Delegate',
      description: 'Premium access with exclusive networking opportunities.',
      price: 220,
      originalPrice: 250,
      bg: 'bg-white',
      border: 'border-paan-blue',
      features: ['Full 2-day access', 'VIP networking lounge', 'Exclusive workshops', 'Digital certificate'],
      category: 'vip'
    },
    {
      name: 'Agency/Team Pass',
      description: 'Special pricing for creative agencies and teams.',
      price: 145,
      originalPrice: 180,
      bg: 'bg-paan-green/10',
      border: 'border-paan-green',
      features: ['Full 2-day access', 'Team networking zone', 'Agency showcase', 'Digital certificate'],
      category: 'in-person'
    },
    {
      name: 'Students & Young Creatives',
      description: 'Special discounted access for students and emerging creatives.',
      price: 50,
      originalPrice: 60,
      bg: 'bg-paan-maroon/10',
      border: 'border-paan-maroon',
      features: ['Full 2-day access', 'Student networking', 'Career development sessions', 'Digital certificate'],
      category: 'student'
    },
    {
      name: 'International Delegate',
      description: 'Special pricing for international attendees.',
      price: 250,
      originalPrice: 280,
      bg: 'bg-paan-purple/10',
      border: 'border-paan-purple',
      features: ['Full 2-day access', 'International networking', 'Global insights sessions', 'Digital certificate'],
      category: 'in-person'
    },
    {
      name: 'Virtual Access',
      description: 'Online access to all summit sessions and content.',
      price: 10,
      originalPrice: 15,
      bg: 'bg-gray-50',
      border: 'border-gray-300',
      features: ['Live stream access', 'On-demand recordings', 'Virtual networking', 'Digital certificate'],
      category: 'virtual'
    }
  ];

  const [quantities, setQuantities] = useState(ticketTypes.reduce((acc, t) => ({ ...acc, [t.name]: 1 }), {}));
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'in-person', label: 'In-Person' },
    { id: 'virtual', label: 'Virtual' },
    { id: 'student', label: 'Student' },
    { id: 'vip', label: 'VIP' }
  ];

  const filteredTickets = activeTab === 'all' 
    ? ticketTypes 
    : ticketTypes.filter(ticket => ticket.category === activeTab);

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-3 sm:px-4 pb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Tab Navigation */}
      <motion.div 
        className="flex flex-wrap justify-left py-4 gap-2 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${
              activeTab === tab.id
                ? 'bg-paan-dark-blue text-white shadow-lg'
                : 'bg-transparent text-paan-dark-blue border-2 border-paan-dark-blue hover:bg-paan-dark-blue hover:text-white'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Ticket Selection */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        key={activeTab} // Re-trigger animation when tab changes
      >
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket, index) => {
            const isSelected = selectedTickets.find(s => s.name === ticket.name);
            return (
            <motion.div 
              key={ticket.name} 
              className={`p-4 sm:p-6 rounded-lg border-2 shadow-sm hover:shadow-lg transition-all duration-300 relative ${
                isSelected 
                  ? 'bg-gradient-to-r from-paan-yellow to-paan-red border-paan-yellow' 
                  : 'bg-white border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
            {/* Category Badge */}
            <motion.div
              className={`absolute -top-2 right-2 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                ticket.name === 'General Admission'
                  ? 'bg-paan-red text-white'
                  : 'bg-paan-blue text-white'
              }`}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              {ticket.name === 'General Admission'
                ? 'MOST POPULAR'
                : ticket.name === 'Agency/Team Pass'
                ? 'MEMBER PRICE'
                : ticket.name === 'Students & Young Creatives'
                ? 'STUDENT'
                : ticket.name === 'International Delegate'
                ? 'PRIORITY'
                : ticket.name === 'Virtual Access'
                ? 'ONLINE'
                : ticket.category === 'vip' 
                ? 'VIP' 
                : 'IN-PERSON'
              }
            </motion.div>


            <div className="flex flex-col h-full">
              <motion.div 
                className="mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <h2 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-2">{ticket.name}</h2>
                <p className="text-paan-dark-blue/80 text-xs sm:text-sm">{ticket.description}</p>
              </motion.div>
              <motion.div 
                className="mb-3 sm:mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-gray-500 line-through text-xs sm:text-sm">${ticket.originalPrice}</span>
                  <span className="text-xs text-paan-red font-medium">Save {Math.round((1 - ticket.price / ticket.originalPrice) * 100)}%</span>
              </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-paan-dark-blue">${ticket.price}</h3>
                </div>
                <p className="text-xs text-paan-red mt-1">Early bird pricing (until Nov 14th 2025)</p>
              </motion.div>
              <motion.div 
                className="mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <ul className="space-y-1 text-paan-dark-blue text-xs sm:text-sm">
                  {ticket.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                    >
                      <Icon icon="mdi:check" className="w-3 h-3 sm:w-4 sm:h-4 text-paan-green mr-2 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-between mt-auto gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.button
                    onClick={() => setQuantities(prev => ({ ...prev, [ticket.name]: Math.max(1, prev[ticket.name] - 1) }))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-paan-dark-blue flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantities[ticket.name] <= 1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon icon="mdi:minus" className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  <motion.span 
                    className="font-semibold text-paan-dark-blue min-w-6 sm:min-w-8 text-center text-sm sm:text-base"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {quantities[ticket.name]}
                  </motion.span>
                  <motion.button
                    onClick={() => setQuantities(prev => ({ ...prev, [ticket.name]: Math.min(50, prev[ticket.name] + 1) }))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-paan-dark-blue flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantities[ticket.name] >= 50}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon icon="mdi:plus" className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>
                <motion.button
                  onClick={() => {
                    const qty = quantities[ticket.name];
                    if (qty > 0) {
                      setSelectedTickets(prev => {
                        const existingIndex = prev.findIndex(s => s.name === ticket.name);
                        if (existingIndex >= 0) {
                          const newPrev = [...prev];
                          newPrev[existingIndex] = { name: ticket.name, quantity: qty, price: ticket.price };
                          return newPrev;
                        } else {
                          return [...prev, { name: ticket.name, quantity: qty, price: ticket.price }];
                        }
                      });
                    }
                  }}
                  className={`rounded-full px-4 sm:px-6 py-2 font-medium transition-colors text-sm sm:text-base ${
                    selectedTickets.find(s => s.name === ticket.name) 
                      ? 'bg-paan-green text-white hover:bg-green-600' 
                      : 'bg-paan-dark-blue text-white hover:bg-paan-blue'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedTickets.find(s => s.name === ticket.name) ? 'Update' : 'Select Ticket'}
                </motion.button>
              </motion.div>
              </div>
          </motion.div>
            );
          })
        ) : (
          <motion.div 
            className="col-span-full text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-500 text-lg">
              No tickets found for this category.
            </div>
          </motion.div>
        )}
      </motion.div>

      {errors.tickets && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-4xl mx-auto">
          <p className="text-red-600 text-center">{errors.tickets}</p>
          </div>
      )}

      {selectedTickets.length > 0 && (
        <motion.div 
          className="mt-4 sm:mt-6 p-4 sm:p-6 bg-white border border-paan-blue rounded-lg max-w-4xl mx-auto shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-3 sm:mb-4">Ticket Summary</h3>
          <div className="space-y-2">
          {selectedTickets.map(ticket => (
              <div key={ticket.name} className="flex justify-between items-center py-2 text-sm sm:text-base">
                <span className="font-medium">{ticket.name} × {ticket.quantity}</span>
                <span className="font-semibold">${ticket.price * ticket.quantity}</span>
            </div>
          ))}
          </div>
          <hr className="my-3 sm:my-4" />
          <div className="flex justify-between font-bold text-base sm:text-lg">
            <span>Total</span>
            <span>${selectedTickets.reduce((sum, t) => sum + t.price * t.quantity, 0)}</span>
          </div>
          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={onNext}
              className="bg-paan-dark-blue text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-paan-blue transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Proceed to Attendee Details
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Attendees = ({ onNext, onPrev, purchaserInfo, handlePurchaserChange, attendees, handleAttendeeChange, errors, selectedTickets, promoCodeValidation, termsAccepted, setTermsAccepted }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-6 pb-8 sm:pb-10 max-w-7xl mx-auto px-3 sm:px-4">
        <div>
            <div className="flex flex-col gap-4">
                <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
                    <h2 className="text-lg sm:text-xl font-semibold text-paan-dark-blue mb-2">Purchaser Information</h2>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">The purchaser receives the receipt and support emails.</p>
                    <form className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                                <label htmlFor="fullName" className="block text-[#172840] text-sm font-medium mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={purchaserInfo.fullName}
                                    onChange={handlePurchaserChange}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                        errors.fullName ? 'border-red-500' : 'border-paan-blue'
                                    }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-[#172840] text-sm font-medium mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={purchaserInfo.email}
                                    onChange={handlePurchaserChange}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                        errors.email ? 'border-red-500' : 'border-paan-blue'
                                    }`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                                <label htmlFor="phone" className="block text-[#172840] text-sm font-medium mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={purchaserInfo.phone}
                                    onChange={handlePurchaserChange}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                        errors.phone ? 'border-red-500' : 'border-paan-blue'
                                    }`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="organization" className="block text-[#172840] text-sm font-medium mb-2">
                                    Company / Organization <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    value={purchaserInfo.organization}
                                    onChange={handlePurchaserChange}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                        errors.organization ? 'border-red-500' : 'border-paan-blue'
                                    }`}
                                    placeholder="Enter your organization"
                                />
                                {errors.organization && (
                                    <p className="text-red-500 text-sm mt-1">{errors.organization}</p>
                                )}
                            </div>
                        </div>
                        <div>
                                <label htmlFor="country" className="block text-[#172840] text-sm font-medium mb-2">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={purchaserInfo.country}
                                    onChange={handlePurchaserChange}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                        errors.country ? 'border-red-500' : 'border-paan-blue'
                                    }`}
                                    placeholder="Enter your country"
                                />
                                {errors.country && (
                                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                                )}
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="attending"
                                    name="attending"
                                    checked={purchaserInfo.attending}
                                    onChange={handlePurchaserChange}
                                    className="mr-2"
                                />
                                <label htmlFor="attending" className="text-[#172840] text-sm font-medium">
                                    I'm also attending
                                </label>
                            </div>
                    </form>
                </div>
                <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
                    <h2 className="text-lg sm:text-xl font-semibold text-paan-dark-blue mb-2">Attendees</h2>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Each ticket must be assigned to a person. You can edit names later from your confirmation email.</p>
                    
                    {attendees.map((attendee, index) => (
                        <motion.div 
                            key={index} 
                            className="py-3 sm:py-4 my-3 sm:my-4 border border-paan-blue p-3 sm:p-4 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <h3 className="font-semibold text-paan-dark-blue py-1 sm:py-2 text-sm sm:text-base">Attendee {index + 1} — {attendee.ticketType}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                                    <label htmlFor={`attendee${index}Name`} className="block text-[#172840] text-sm font-medium mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                        id={`attendee${index}Name`}
                                        value={attendee.name || ''}
                                        onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                            errors[`attendee${index}Name`] ? 'border-red-500' : 'border-paan-blue'
                                        }`}
                                    placeholder="Enter attendee's full name"
                                />
                                    {errors[`attendee${index}Name`] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[`attendee${index}Name`]}</p>
                                    )}
                            </div>
                            <div>
                                    <label htmlFor={`attendee${index}Email`} className="block text-[#172840] text-sm font-medium mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                        id={`attendee${index}Email`}
                                        value={attendee.email || ''}
                                        onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                            errors[`attendee${index}Email`] ? 'border-red-500' : 'border-paan-blue'
                                        }`}
                                    placeholder="Enter attendee's email"
                                />
                                    {errors[`attendee${index}Email`] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[`attendee${index}Email`]}</p>
                                    )}
                            </div>
                        </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                          <div>
                                    <label htmlFor={`attendee${index}Role`} className="block text-[#172840] text-sm font-medium mb-2">
                                    Job/ Role <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                        id={`attendee${index}Role`}
                                        value={attendee.role || ''}
                                        onChange={(e) => handleAttendeeChange(index, 'role', e.target.value)}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                            errors[`attendee${index}Role`] ? 'border-red-500' : 'border-paan-blue'
                                        }`}
                                    placeholder="Enter job/role"
                                />
                                    {errors[`attendee${index}Role`] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[`attendee${index}Role`]}</p>
                                    )}
                            </div>
                            <div>
                                    <label htmlFor={`attendee${index}Org`} className="block text-[#172840] text-sm font-medium mb-2">
                                    Company / Organization <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                        id={`attendee${index}Org`}
                                        value={attendee.organization || ''}
                                        onChange={(e) => handleAttendeeChange(index, 'organization', e.target.value)}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
                                            errors[`attendee${index}Org`] ? 'border-red-500' : 'border-paan-blue'
                                        }`}
                                    placeholder="Enter organization"
                                />
                                    {errors[`attendee${index}Org`] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[`attendee${index}Org`]}</p>
                                    )}
                            </div>
                        </div>
                            </motion.div>
                    ))}
                            </div>
                <div className="p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-paan-dark-blue mb-2">Documents & Support (optional)</h2>
                    <p className="text-gray-600 mb-4">The purchaser receives the receipt and support emails.</p>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                                <label htmlFor="visaLetter" className="block text-[#172840] text-sm font-medium mb-2">
                                    Need a visa letter?
                                </label>
                                <input
                                    type="text"
                                    id="visaLetter"
                                    name="visaLetter"
                                    className="w-full px-4 py-3 border border-paan-blue rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label htmlFor="passportName" className="block text-[#172840] text-sm font-medium mb-2">
                                    Passport Name
                                </label>
                                <input
                                    type="text"
                                    id="passportName"
                                    name="passportName"
                                    className="w-full px-4 py-3 border border-paan-blue rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300"
                                    placeholder="Enter passport name"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                                <label htmlFor="nationality" className="block text-[#172840] text-sm font-medium mb-2">
                                    Nationality
                                </label>
                                <input
                                    type="text"
                                    id="nationality"
                                    name="nationality"
                                    className="w-full px-4 py-3 border border-paan-blue rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your nationality"
                                />
                            </div>
                            <div>
                                <label htmlFor="invoiceDetails" className="block text-[#172840] text-sm font-medium mb-2">
                                    Invoice details (optional)
                                </label>
                                <input
                                    type="text"
                                    id="invoiceDetails"
                                    name="invoiceDetails"
                                    className="w-full px-4 py-3 border border-paan-blue rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300"
                                    placeholder="Enter invoice details"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-paan-dark-blue mb-4">Terms & Preferences</h2>
                    <form>
                        <div className="space-y-3">
                            <div className="flex items-start">
                              <input 
                                type="checkbox" 
                                id="terms" 
                                name="terms" 
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className={`mr-3 mt-1 ${errors.terms ? 'border-red-500' : ''}`}
                              />
                              <label htmlFor="terms" className="text-sm text-gray-700">
                                I accept the <a href="/terms-and-conditions" className="text-paan-blue hover:underline">terms & conditions</a> and <a href="/privacy-policy" className="text-paan-blue hover:underline">privacy policy</a> <span className="text-red-500">*</span>
                              </label>
                            </div>
                            {errors.terms && (
                              <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
                            )}
                            <div className="flex items-start">
                              <input type="checkbox" id="updates" name="updates" className="mr-3 mt-1" />
                              <label htmlFor="updates" className="text-sm text-gray-700">
                                Send me summit updates (optional)
                              </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-6 gap-3 sm:gap-0">
                  <button
                    onClick={onPrev}
                    className="bg-paan-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-paan-blue/90 transition-colors text-sm sm:text-base"
                  >
                    Back to Tickets
                  </button>
                  <button
                    onClick={onNext}
                    className="bg-paan-dark-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-paan-blue transition-colors text-sm sm:text-base"
                  >
                    Continue to Payment
                  </button>
                </div>
            </div>
        </div>
        <div>
            <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm sticky top-4">
                   <div className="flex justify-between mb-3 sm:mb-4">
                       <h2 className="text-lg sm:text-xl font-semibold text-paan-dark-blue">Your Selection</h2>
                        <p className="font-normal text-paan-red text-xs sm:text-sm">Early Bird active</p>
                   </div>
                   <div className="space-y-2 mb-3 sm:mb-4">
                   {selectedTickets.map((ticket, index) => (
                     <div key={index} className="flex justify-between text-sm sm:text-base">
                        <span>{ticket.name} × {ticket.quantity}</span>
                        <span>${ticket.price * ticket.quantity}</span>
                     </div>
                   ))}
                     <hr className="my-2"/>
                    <div className="flex justify-between text-sm sm:text-base">
                        <span>Subtotal</span>
                        <span>${selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                        <span>Promo</span>
                        <span className="text-green-600">
                          {promoCodeValidation?.valid ? `-$${promoCodeValidation.promoCode.discountAmount}` : '-$0'}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                        <span>Taxes & Fees</span>
                        <span>$0</span>
                    </div>
                      <div className="flex justify-between font-bold text-base sm:text-lg">
                        <span>Total</span>
                        <span>${promoCodeValidation?.valid 
                          ? selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0) - promoCodeValidation.promoCode.discountAmount
                          : selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0)
                        }</span>
                      </div>
                   </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-paan-dark-blue mb-2">Payment Method</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="radio" id="card" name="payment" value="card" className="mr-2" defaultChecked />
                          <label htmlFor="card" className="text-sm">Credit/Debit Card</label>
                    </div>
                        <div className="flex items-center">
                          <input type="radio" id="bank" name="payment" value="bank" className="mr-2" />
                          <label htmlFor="bank" className="text-sm">Bank Transfer/Invoice</label>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

  const Hero = ({ sectionRefs, handleScroll, timeLeft }) => {

  return (
    <>
      <motion.div
        className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] w-full" 
        id="home"
        ref={sectionRefs.home}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Full background image with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.png')",
            filter: "brightness(0.5)"
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Gradient overlay for better text readability */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-end pb-4 sm:pb-6 md:pb-8 lg:pb-10">
          <div className="mx-auto max-w-6xl w-full px-3 sm:px-4">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h1 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase text-paan-yellow mb-3 sm:mb-4 md:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Register for PAAN Summit 2026
              </motion.h1>            
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                  <SeminarLocationAndDate />
                </motion.div>
              </motion.div>
              <motion.p 
                className="text-xs sm:text-sm md:text-base font-semibold text-paan-red mb-2 sm:mb-3 md:mb-4 leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Limited early-bird discounts available.
              </motion.p>
              <motion.div 
                className="text-xs sm:text-sm md:text-base font-normal text-white mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="mb-2">Early-bird price increases in:</p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="bg-paan-dark-blue/80 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-lg sm:text-xl font-bold">{timeLeft.days}</div>
                    <div className="text-xs">days</div>
                  </div>
                  <div className="bg-paan-dark-blue/80 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-lg sm:text-xl font-bold">{timeLeft.hours}</div>
                    <div className="text-xs">hours</div>
                  </div>
                  <div className="bg-paan-dark-blue/80 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-lg sm:text-xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-xs">mins</div>
                  </div>
                  <div className="bg-paan-dark-blue/80 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-lg sm:text-xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-xs">secs</div>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </motion.div>

    </>
  );
};

const Payment = ({ onNext, onPrev, paymentInfo, handlePaymentChange, selectedTickets, errors, isSubmitting, promoCode, setPromoCode, promoCodeValidation, setPromoCodeValidation, handlePromoCodeValidation, isValidatingPromo }) => {
  const totalAmount = selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
  
  const generateInvoice = () => {
    const invoiceData = {
      totalAmount,
      selectedTickets,
      paymentInfo,
      bankDetails: {
        payableTo: "KCB Bank Ltd",
        accountNo: "1340474921",
        accountName: "Zidipay Africa Limited",
        branch: "Sarit Centre",
        swiftCode: "KCBLKENX",
        bankCode: "01291",
        country: "Kenya",
        city: "Nairobi"
      }
    };
    
    // Create a new window with invoice content
    const invoiceWindow = window.open('', '_blank', 'width=900,height=700');
    invoiceWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>PAAN Summit 2026 - Invoice</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: #f8fafc; 
            color: #1a202c; 
            line-height: 1.6;
          }
          .invoice-container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
            border-radius: 12px;
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #172840 0%, #84C1D9 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center;
            position: relative;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          .logo-container { 
            position: relative; 
            z-index: 1;
            margin-bottom: 20px;
          }
          .logo { 
            width: 120px; 
            height: 60px; 
            margin: 0 auto 15px;
            background: white;
            border-radius: 8px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo img { 
            max-width: 100%; 
            max-height: 100%; 
            object-fit: contain;
          }
          .company-name { 
            font-size: 28px; 
            font-weight: 700; 
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .invoice-title { 
            font-size: 24px; 
            font-weight: 600; 
            margin-bottom: 8px;
            opacity: 0.95;
          }
          .invoice-date { 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { padding: 40px 30px; }
          .section { margin-bottom: 30px; }
          .section-title { 
            font-size: 20px; 
            font-weight: 600; 
            color: #84C1D9; 
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e2e8f0;
          }
          .bank-details { 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 25px; 
            border-radius: 12px; 
            border-left: 4px solid #172840;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          }
          .bank-details h4 { 
            color: #84C1D9; 
            font-size: 18px; 
            margin-bottom: 15px;
            font-weight: 600;
          }
          .bank-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 8px 0; 
            border-bottom: 1px solid #e2e8f0;
          }
          .bank-row:last-child { border-bottom: none; }
          .bank-label { font-weight: 600; color: #4a5568; }
          .bank-value { color: #2d3748; font-weight: 500; }
          .ticket-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .ticket-table th { 
            background: linear-gradient(135deg, #84C1D9 0%, #172840 100%);
            color: white; 
            padding: 15px 12px; 
            text-align: left; 
            font-weight: 600;
            font-size: 14px;
          }
          .ticket-table td { 
            padding: 12px; 
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
          }
          .ticket-table tr:hover { background: #f8fafc; }
          .ticket-table tr:last-child td { border-bottom: none; }
          .total-section { 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px; 
            border-radius: 8px; 
            margin-top: 20px;
            border-left: 4px solid #10b981;
          }
          .total-amount { 
            font-size: 24px; 
            font-weight: 700; 
            color: #84C1D9;
            text-align: center;
          }
          .footer { 
            background: #172840; 
            color: white; 
            padding: 30px; 
            text-align: center;
          }
          .footer h3 { 
            font-size: 20px; 
            margin-bottom: 10px;
            font-weight: 600;
          }
          .footer p { 
            opacity: 0.9; 
            margin-bottom: 5px;
          }
          .contact-info { 
            margin-top: 15px; 
            padding-top: 15px; 
            border-top: 1px solid rgba(255,255,255,0.2);
          }
          .contact-info a { 
            color: #60a5fa; 
            text-decoration: none;
            font-weight: 500;
          }
          .contact-info a:hover { text-decoration: underline; }
          @media print {
            body { background: white; }
            .invoice-container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
        <div class="header">
            <div class="logo-container">
              <div class="logo">
                <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/paan-summit-logo.svg?updatedAt=1757505542572" alt="PAAN Summit Logo" />
              </div>
              <div class="company-name">PAAN AFRICA</div>
              <div class="invoice-title">PAAN Summit 2026 - Invoice</div>
              <div class="invoice-date">Invoice Date: ${new Date().toLocaleDateString()}</div>
            </div>
        </div>
        
          <div class="content">
            <div class="section">
              <h3 class="section-title">Payment Instructions</h3>
              <p style="margin-bottom: 20px; color: #4a5568;">Please make payment to the following bank account to complete your registration:</p>
          
          <div class="bank-details">
                <h4>Bank Transfer Details</h4>
                <div class="bank-row">
                  <span class="bank-label">Bill Payable to:</span>
                  <span class="bank-value">${invoiceData.bankDetails.payableTo}</span>
                </div>
                <div class="bank-row">
                  <span class="bank-label">Account No:</span>
                  <span class="bank-value">${invoiceData.bankDetails.accountNo}</span>
                </div>
                <div class="bank-row">
                  <span class="bank-label">Account Name:</span>
                  <span class="bank-value">${invoiceData.bankDetails.accountName}</span>
                </div>
                <div class="bank-row">
                  <span class="bank-label">Branch:</span>
                  <span class="bank-value">${invoiceData.bankDetails.branch}</span>
                </div>
                <div class="bank-row">
                  <span class="bank-label">Swift Code:</span>
                  <span class="bank-value">${invoiceData.bankDetails.swiftCode}</span>
                </div>
                <div class="bank-row">
                  <span class="bank-label">Bank Code:</span>
                  <span class="bank-value">${invoiceData.bankDetails.bankCode}</span>
                </div>
                <div class="bank-row">
                  <span class="bank-label">Country:</span>
                  <span class="bank-value">${invoiceData.bankDetails.country}</span>
                </div>
                <div class="bank-row">
                  <span class="bank-label">City:</span>
                  <span class="bank-value">${invoiceData.bankDetails.city}</span>
                </div>
          </div>
        </div>
        
            <div class="section">
              <h3 class="section-title">Ticket Details</h3>
        <table class="ticket-table">
          <thead>
            <tr>
              <th>Ticket Type</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${selectedTickets.map(ticket => `
              <tr>
                <td>${ticket.name}</td>
                <td>${ticket.quantity}</td>
                <td>$${ticket.price}</td>
                <td>$${ticket.price * ticket.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
              <div class="total-section">
                <div class="total-amount">Total Amount: $${totalAmount}</div>
              </div>
            </div>
        </div>
        
        <div class="footer">
            <h3>Thank you for registering for PAAN Summit 2026!</h3>
            <p>We look forward to seeing you at Africa's premier creative and tech leadership conference.</p>
            <div class="contact-info">
              <p>For any questions or support, contact us at:</p>
              <p><a href="mailto:secretariat@paan.africa">secretariat@paan.africa</a></p>
              <p>Visit us at: <a href="https://paan.africa">paan.africa</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.print();
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-6 pb-8 sm:pb-10 max-w-7xl mx-auto px-3 sm:px-4">
      <div>
        <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-3 sm:mb-4">Payment Method</h2>
          <form>
            <div className="space-y-4">
              <div>
                <input 
                  type="radio" 
                  id="card" 
                  name="method" 
                  value="card" 
                  checked={paymentInfo.method === 'card'}
                  onChange={handlePaymentChange}
                  className="mr-2" 
                />
                <label htmlFor="card" className="font-medium text-paan-dark-blue text-sm sm:text-base">Credit/Debit Card</label>
                {paymentInfo.method === 'card' && (
                <div className="ml-4 sm:ml-6 mt-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    You will be redirected to Paystack's secure payment page to enter your card details.
                  </p>
                </div>
                )}
              </div>
              <div>
                <input 
                  type="radio" 
                  id="bank" 
                  name="method" 
                  value="bank" 
                  checked={paymentInfo.method === 'bank'}
                  onChange={handlePaymentChange}
                  className="mr-2" 
                />
                <label htmlFor="bank" className="font-medium text-paan-dark-blue text-sm sm:text-base">Bank Transfer/Invoice</label>
                {paymentInfo.method === 'bank' && (
                <div className="ml-4 sm:ml-6 mt-2 space-y-2">
                  <textarea
                    name="invoiceDetails"
                    value={paymentInfo.invoiceDetails}
                    onChange={handlePaymentChange}
                    placeholder="Enter any additional invoice details or reference"
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent ${
                      errors.invoiceDetails ? 'border-red-500' : 'border-paan-blue'
                    }`}
                  />
                  {errors.invoiceDetails && (
                    <p className="text-red-500 text-sm mt-1">{errors.invoiceDetails}</p>
                  )}
                  <button
                    type="button"
                    onClick={generateInvoice}
                    className="mt-2 px-4 py-2 bg-paan-blue text-white rounded-lg hover:bg-paan-dark-blue transition-colors"
                  >
                    Generate Invoice
                  </button>
                </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="p-4 sm:p-6 bg-white border border-paan-blue rounded-lg shadow-sm">
          <div className="flex justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-paan-dark-blue">Order Summary</h2>
            <p className="font-normal text-paan-red text-xs sm:text-sm">Early Bird active</p>
          </div>
          <div className="space-y-2 mb-3 sm:mb-4">
            {selectedTickets.map((ticket, index) => (
              <div key={index} className="flex justify-between text-sm sm:text-base">
                <span>{ticket.name} × {ticket.quantity}</span>
                <span>${ticket.price * ticket.quantity}</span>
            </div>
            ))}
            <hr />
            <div className="flex justify-between text-sm sm:text-base">
              <span>Subtotal</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Promo</span>
              <span className="text-green-600">
                {promoCodeValidation?.valid ? `-$${promoCodeValidation.promoCode.discountAmount}` : '-$0'}
              </span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Taxes & Fees</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between font-bold text-base sm:text-lg">
              <span>Total</span>
              <span>${promoCodeValidation?.valid ? totalAmount - promoCodeValidation.promoCode.discountAmount : totalAmount}</span>
            </div>
          </div>
          
          {/* Promo Code Section */}
          <div className="mb-3 sm:mb-4">
            <form onSubmit={handlePromoCodeValidation}>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handlePromoCodeValidation(e);
                    }
                  }}
                  placeholder="Have a promo code?"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-paan-blue rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent text-sm sm:text-base"
                />
                <div className="flex gap-2">
                <button 
                  type="submit"
                  disabled={isValidatingPromo || !promoCode.trim()}
                    className="bg-paan-dark-blue text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-paan-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isValidatingPromo ? 'Validating...' : 'Apply'}
                </button>
                {promoCode.trim() && (
                  <button 
                    type="button"
                    onClick={() => {
                      setPromoCode('');
                      setPromoCodeValidation(null);
                    }}
                      className="bg-gray-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
                    title="Clear promo code"
                  >
                    Clear
                  </button>
                )}
                </div>
              </div>
            </form>
            {promoCodeValidation && (
              <div className={`mt-2 p-3 rounded-lg ${
                promoCodeValidation.valid 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center">
                  <div className={`mr-2 ${
                    promoCodeValidation.valid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {promoCodeValidation.valid ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${
                    promoCodeValidation.valid ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {promoCodeValidation.valid 
                    ? `${promoCodeValidation.promoCode.description} - Save $${promoCodeValidation.promoCode.discountAmount}`
                    : promoCodeValidation.error
                  }
                  </p>
                </div>
                {!promoCodeValidation.valid && promoCodeValidation.error === 'Promo code does not exist' && (
                  <p className="text-xs text-red-600 mt-1">
                    Please check the code and try again, or contact support if you believe this is an error.
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <button
              onClick={onPrev}
              className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Back to Details
            </button>
            <button
              onClick={onNext}
              disabled={isSubmitting}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-paan-red text-white hover:bg-red-600'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SeminarLocationAndDate = ()=> {
    
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:map-marker" className="text-red-500 flex-shrink-0" width="16" height="16" />
        <span className="break-words sm:whitespace-nowrap">Sarit Centre, Nairobi, Kenya - <strong>21–22 April 2026</strong></span>
      </div>
      
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:user-group" className="text-red-500 flex-shrink-0" width="16" height="16" />
        <span className="whitespace-nowrap">500+ In Person</span>
      </div>
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:globe" className="text-red-500 flex-shrink-0" width="16" height="16" />
        <span className="whitespace-nowrap">2,000+ Streaming</span>
      </div>
    </div>
  );
}

export default SummitPage;