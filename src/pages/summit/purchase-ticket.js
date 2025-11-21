import SEO from "@/components/SEO";
import Header from "@/layouts/ticket-purchase-header";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SummitFooter from "@/layouts/summit-footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../../utils/scrollUtils';
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";
import PartnerWithUsModal from "@/components/PartnerWithUsModal";
import ExhibitionApplicationModal from "@/components/ExhibitionApplicationModal";
import { motion } from "framer-motion";
import { useAppTranslations } from '../../hooks/useTranslations';
import { toast } from "react-hot-toast";
import { completePurchase, verifyAndCompletePayment } from '../../lib/ticketService';
import { initializePayment, generatePaymentReference } from '../../lib/paystack';
import { validatePromoCode } from '../../lib/promoCodeService';
import { convertUSDToKES, formatCurrency } from '../../utils/currencyConverter';
import { saveLeadContact, updateLeadStatus } from '../../lib/leadService';
import ContactInfoStep from '@/components/summit/ContactInfoStep';
import TicketsStep from '@/components/summit/TicketsStep';
import AttendeesStep from '@/components/summit/AttendeesStep';
import PaymentStep from '@/components/summit/PaymentStep';
import StepBar from '@/components/summit/StepBar';
import Hero from '@/components/summit/Hero';

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
      // Validate contact information
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
      if (!purchaserInfo.country.trim()) {
        newErrors.country = "Country is required";
      }
    } else if (step === 2) {
      if (selectedTickets.length === 0) {
        newErrors.tickets = "Please select at least one ticket";
      }
    } else if (step === 3) {
      if (!purchaserInfo.organization.trim()) {
        newErrors.organization = "Organization is required";
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
    } else if (step === 4) {
      if (paymentInfo.method === 'bank') {
        if (!paymentInfo.invoiceDetails.trim()) {
          newErrors.invoiceDetails = "Invoice details are required for bank transfer";
        }
      }
    }
    
    return newErrors;
  };

  const handleNext = async () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    
    setErrors({});
    
    // Save lead contact on step 1 completion
    if (currentStep === 1) {
      try {
        const leadData = await saveLeadContact({
          fullName: purchaserInfo.fullName,
          email: purchaserInfo.email,
          phone: purchaserInfo.phone,
          country: purchaserInfo.country
        });
        console.log('✅ Lead saved successfully:', leadData);
        toast.success("Contact information saved!");
      } catch (error) {
        console.error('❌ Error saving lead:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        // Don't block progression if lead save fails
        toast.error("Note: Contact info couldn't be saved, but you can continue.");
      }
    }
    
    // Update lead status when they select tickets
    if (currentStep === 2 && selectedTickets.length > 0) {
      try {
        await updateLeadStatus(purchaserInfo.email, 'tickets_selected', {
          tickets: selectedTickets
        });
      } catch (error) {
        console.error('Error updating lead status:', error);
      }
    }
    
    if (currentStep < 4) {
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
        // For card or mpesa payments, proceed with Paystack
        toast.dismiss(toastId);
        toast.loading("Initializing payment...", { id: 'payment-init' });

        // Initialize payment with Paystack
        const paymentReference = generatePaymentReference();
        
        // Determine currency and amount based on payment method
        let currency = 'USD';
        let paymentAmount = finalAmount;
        
        if (paymentInfo.method === 'mpesa') {
          // Convert USD to KES for Mpesa payments
          currency = 'KES';
          paymentAmount = convertUSDToKES(finalAmount);
        }
        
        const paymentHandler = await initializePayment({
          email: purchaserInfo.email,
          amount: paymentAmount,
          currency: currency,
          reference: paymentReference,
          metadata: {
            purchase_id: purchase.id,
            purchaser_id: purchaser.id,
            ticket_count: selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0),
            payment_method: paymentInfo.method,
            original_amount_usd: paymentInfo.method === 'mpesa' ? finalAmount : null,
            converted_amount_kes: paymentInfo.method === 'mpesa' ? paymentAmount : null
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
        title="Purchase Tickets - PAAN Summit 2026"
        description="Secure your spot at PAAN Summit 2026. Choose from various ticket options including General Admission, VIP Delegate, Agency Pass, and more."
        keywords="PAAN Summit tickets, buy summit tickets, conference registration, PAAN 2026 tickets"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932"
      />

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
                      {currentStep === 1 && 'Your Contact Information'}
                      {currentStep === 2 && 'Select Your Tickets'}
                      {currentStep === 3 && 'Attendee Details'}
                      {currentStep === 4 && 'Payment'}
                    </h2>
                    <p className="font-normal">
                      {currentStep === 1 && "Let's start with your basic information to secure your registration."}
                      {currentStep === 2 && 'Choose the tickets that best fit your needs for PAAN Summit 2026.'}
                      {currentStep === 3 && `You're registering ${attendeeSelected} attendee(s) for PAAN Summit 2026.`}
                      {currentStep === 4 && 'Complete your payment to secure your tickets.'}
                    </p>
                </div>

                {/* Step Content */}
                {currentStep === 1 && <ContactInfoStep onNext={handleNext} purchaserInfo={purchaserInfo} handlePurchaserChange={handlePurchaserChange} errors={errors} />}
                {currentStep === 2 && <TicketsStep selectedTickets={selectedTickets} setSelectedTickets={setSelectedTickets} onNext={handleNext} onPrev={handlePrev} errors={errors} />}
                {currentStep === 3 && <AttendeesStep onNext={handleNext} onPrev={handlePrev} purchaserInfo={purchaserInfo} handlePurchaserChange={handlePurchaserChange} attendees={attendees} handleAttendeeChange={handleAttendeeChange} errors={errors} selectedTickets={selectedTickets} promoCodeValidation={promoCodeValidation} termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange} />}
                {currentStep === 4 && <PaymentStep onNext={handleNext} onPrev={handlePrev} paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange} selectedTickets={selectedTickets} errors={errors} isSubmitting={isSubmitting} promoCode={promoCode} setPromoCode={setPromoCode} promoCodeValidation={promoCodeValidation} setPromoCodeValidation={setPromoCodeValidation} handlePromoCodeValidation={handlePromoCodeValidation} isValidatingPromo={isValidatingPromo} />}
                
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


export default SummitPage;