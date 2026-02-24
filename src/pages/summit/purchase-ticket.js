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
import { initializePayment, generatePaymentReference, updatePurchaseStatus } from '../../lib/paystack';
import { validatePromoCode } from '../../lib/promoCodeService';
import { convertUSDToKES, formatCurrency } from '../../utils/currencyConverter';
import { saveLeadContact, updateLeadStatus, shouldSkipContactStep, getLeadByEmail } from '../../lib/leadService';
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
  const [currentStep, setCurrentStep] = useState(1); // 1: Contact Info, 2: Select Tickets, 3: Attendee Details, 4: Payment
  const [isCheckingContactStep, setIsCheckingContactStep] = useState(true); // Track if we're checking whether to skip Step 1
  
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
        
        // Store submission timestamp in localStorage for 24-hour check
        if (typeof window !== 'undefined') {
          const submissionData = {
            email: purchaserInfo.email.toLowerCase().trim(),
            timestamp: new Date().toISOString()
          };
          localStorage.setItem('paan_summit_contact_submission', JSON.stringify(submissionData));
        }
        
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

  // Helper function to send confirmation email
  const sendPurchaseConfirmationEmail = async (purchase, purchaser, paymentReference, finalAmount, currency = 'USD') => {
    try {
      // Format ticket information for email
      const ticketDetails = selectedTickets.map(ticket => ({
        name: ticket.name,
        quantity: ticket.quantity,
        price: ticket.price,
        total: ticket.price * ticket.quantity
      }));

      // Prepare email data - send email for primary ticket (first ticket)
      // The email API expects single ticket format, so we'll use the first ticket
      const primaryTicket = selectedTickets[0];
      const ticketData = {
        name: purchaserInfo.fullName,
        email: purchaserInfo.email,
        phone: purchaserInfo.phone,
        country: purchaserInfo.country,
        role: attendees[0]?.role || '',
        company: purchaserInfo.organization,
        ticketType: primaryTicket.name,
        currency: currency,
        amount: finalAmount,
        features: primaryTicket.features || []
      };

      const paymentData = {
        currency: currency,
        amount: Math.round(finalAmount * 100), // Convert to cents
        status: 'success',
        paidAt: new Date().toISOString()
      };

      const response = await fetch('/api/send-summit-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentData,
          ticketData,
          reference: paymentReference
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Purchase confirmation email sent successfully');
      } else {
        console.error('Failed to send purchase confirmation email:', result.message);
      }
    } catch (error) {
      console.error('Error sending purchase confirmation email:', error);
      // Don't throw error - email failure shouldn't block purchase completion
    }
  };

  //Where the payment magic is happening
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
      
      // Check if discount is 100% (final amount is 0 or less)
      if (finalAmount <= 0) {
        // For 100% discount, mark purchase as paid directly without Paystack
        toast.dismiss(toastId);
        toast.loading("Completing purchase...", { id: 'free-purchase' });
        
        try {
          // Generate a reference for free purchases
          const paymentReference = generatePaymentReference();
          
          // Mark purchase as paid
          await updatePurchaseStatus(purchase.id, 'paid', paymentReference);
          
          // Send confirmation email
          await sendPurchaseConfirmationEmail(purchase, purchaser, paymentReference, finalAmount, 'USD');
          
          toast.dismiss('free-purchase');
          toast.success("Purchase completed successfully! Your tickets are confirmed. You will receive a confirmation email shortly.", { id: 'free-success' });
          
          // Reset form after successful purchase
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
          console.error('Error completing free purchase:', error);
          toast.dismiss('free-purchase');
          toast.error("Error completing purchase. Please contact support.", { id: 'free-error' });
        }
        return;
      }
      
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
              
              if(!result.success){
                toast.dismiss('payment-verify');
                toast.error("Payment failed. You can try again!", { id: 'payment-verification-failed'});
                return;
              }
              // Send confirmation email
              const paymentCurrency = paymentInfo.method === 'mpesa' ? 'KES' : 'USD';
              await sendPurchaseConfirmationEmail(purchase, purchaser, response.reference, finalAmount, paymentCurrency);
              
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
  
  // Check if user should skip Step 1 (Contact Information) on mount
  useEffect(() => {
    const checkAndSkipContactStep = async () => {
      if (typeof window === 'undefined') {
        setIsCheckingContactStep(false);
        return;
      }

      try {
        // Check localStorage first for quick check
        const storedData = localStorage.getItem('paan_summit_contact_submission');
        if (storedData) {
          try {
            const { email: storedEmail, timestamp } = JSON.parse(storedData);
            const submissionTime = new Date(timestamp);
            const now = new Date();
            const hoursSinceSubmission = (now - submissionTime) / (1000 * 60 * 60);
            
            // If less than 24 hours, check database and load user info
            if (hoursSinceSubmission < 24 && storedEmail) {
              const lead = await getLeadByEmail(storedEmail);
              if (lead) {
                // Pre-fill the form with previous data
                setPurchaserInfo({
                  fullName: lead.full_name || '',
                  email: lead.email || '',
                  phone: lead.phone || '',
                  organization: '',
                  country: lead.country || '',
                  attending: false
                });
                // Skip to Step 2 (Ticket Selection)
                setCurrentStep(2);
                setIsCheckingContactStep(false);
                return;
              }
            }
          } catch (e) {
            console.error('Error parsing stored contact data:', e);
          }
        }
      } catch (error) {
        console.error('Error checking contact step:', error);
      } finally {
        setIsCheckingContactStep(false);
      }
    };

    checkAndSkipContactStep();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    // (Early Bird deadline: February 21st, 2026 at 11:59 PM EAT)
    const targetDate = new Date('2026-02-21T23:59:59+03:00').getTime();
    
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

  // Intersection observer for What's Included section animation
  const [whatsIncludedVisible, setWhatsIncludedVisible] = useState(false);
  const whatsIncludedRef = useRef(null);

  useEffect(() => {
    if (whatsIncludedRef.current) {
      const element = whatsIncludedRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !whatsIncludedVisible) {
              setWhatsIncludedVisible(true);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      observer.observe(element);
      
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [whatsIncludedVisible]);
  
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
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/purchase-ticket-hero.webp"
      />

      <main className="px-3 sm:px-0 relative">
        <Header navLinkColor='text-white' />

        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} timeLeft={timeLeft} />

          {/* Main Section */}
          <div className="bg-[#DAECF3]">
              {/* What's Included */}
              <div ref={whatsIncludedRef}>
                <section className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20">
                  <motion.div 
                    className="text-center mb-6 sm:mb-8 md:mb-12 px-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={whatsIncludedVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#172840] font-bold mb-2 sm:mb-3 md:mb-4">What's Included</h2>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-[#172840] font-normal max-w-3xl mx-auto px-2">Your full access to sessions, networking, and experiences.</h3>
                  </motion.div>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                    variants={staggerContainer}
                    initial="initial"
                    animate={whatsIncludedVisible ? "animate" : "initial"}
                  >
                    {[
                      {
                        icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/keynote-panel.svg",
                        title: "Keynotes & Panels",
                        description: "Learn from top African and global leaders shaping the creative and business landscape."
                      },
                      {
                        icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/exhibition-hall.svg",
                        title: "Exhibition Hall",
                        description: "Explore tools, technologies, agencies, and brands driving innovation across the continent."
                      },
                      {
                        icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/smart-networking.svg",
                        title: "Smart Networking",
                        description: "Meet collaborators, clients, agencies, creators, and investors through the Summit app."
                      },
                      {
                        icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/career-lounge.svg",
                        title: "Career Lounge",
                        description: "Get career guidance, portfolio reviews, job leads, and mentorship opportunities."
                      },
                      {
                        icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/business-opportunity.svg",
                        title: "Business Opportunities",
                        description: "Discover cross-border projects, partnerships, co-bidding options, and new market entry paths."
                      },
                      {
                        icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/certificate.svg",
                        title: "Certificates",
                        description: "Receive a digital participation certificate and access session materials (where applicable)."
                      },
                      {
                        icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/creative-experinces.svg",
                        title: "Creative Experiences",
                        description: "Enjoy showcases, brand activations, live demos, and curated summit experiences."
                      },
                      {
                        icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/onground-support.svg",
                        title: "On-Ground Support",
                        description: "Benefit from visa letters, priority check-in, and help desk support depending on your ticket."
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="group bg-paan-dark-blue rounded-lg shadow-lg p-4 sm:p-5 md:p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                        variants={scaleIn}
                      >
                        <motion.div 
                          className="flex items-start justify-start mb-3 sm:mb-4"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={whatsIncludedVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                        >
                          <img 
                            src={item.icon} 
                            alt={`${item.title} Icon`} 
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0" 
                          />
                        </motion.div>
                        <motion.h3 
                          className="text-white text-left my-2 sm:my-3 md:my-4 font-bold text-sm sm:text-base md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={whatsIncludedVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p 
                          className="text-white text-xs sm:text-sm md:text-base font-normal text-left mt-auto leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={whatsIncludedVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.4, ease: "easeOut" }}
                        >
                          {item.description}
                        </motion.p>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              </div>
              {/* Progress bar */}
              <StepBar currentStep={currentStep} />
              {/* Main Content Area */}
              <div className="mx-auto max-w-7xl ">
                {/* Header */}
                {!isCheckingContactStep && (
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
                )}

                {/* Step Content */}
                {isCheckingContactStep ? (
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="p-6 sm:p-8 lg:p-10 bg-white border border-gray-200 rounded-2xl shadow-xl">
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-paan-blue"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {currentStep === 1 && <ContactInfoStep onNext={handleNext} purchaserInfo={purchaserInfo} handlePurchaserChange={handlePurchaserChange} errors={errors} />}
                    {currentStep === 2 && <TicketsStep selectedTickets={selectedTickets} setSelectedTickets={setSelectedTickets} onNext={handleNext} onPrev={handlePrev} errors={errors} />}
                    {currentStep === 3 && <AttendeesStep onNext={handleNext} onPrev={handlePrev} purchaserInfo={purchaserInfo} handlePurchaserChange={handlePurchaserChange} attendees={attendees} handleAttendeeChange={handleAttendeeChange} errors={errors} selectedTickets={selectedTickets} promoCodeValidation={promoCodeValidation} termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange} />}
                    {currentStep === 4 && <PaymentStep onNext={handleNext} onPrev={handlePrev} paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange} selectedTickets={selectedTickets} errors={errors} isSubmitting={isSubmitting} promoCode={promoCode} setPromoCode={setPromoCode} promoCodeValidation={promoCodeValidation} setPromoCodeValidation={setPromoCodeValidation} handlePromoCodeValidation={handlePromoCodeValidation} isValidatingPromo={isValidatingPromo} />}
                  </>
                )}
                
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