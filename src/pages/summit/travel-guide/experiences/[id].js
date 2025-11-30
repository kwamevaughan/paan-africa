import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SEO from "@/components/SEO";
import TravelGuideHeader from "@/layouts/travel-guide-header";
import SummitFooter from "@/layouts/summit-footer";
import ScrollToTop from "@/components/ScrollToTop";
import PaystackScript from "@/components/PaystackScript";
import { motion } from "framer-motion";
import { summitExperiences } from "../../travel-guide";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

const ExperienceDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [experience, setExperience] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 1,
    preferredDate: '',
    preferredTime: '',
    specialRequests: '',
    hotel: '',
    dietaryRequirements: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [paystackReady, setPaystackReady] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    if (id) {
      const found = summitExperiences.find(exp => exp.id === id);
      setExperience(found);
    }
  }, [id]);

  // Check if Paystack is ready
  useEffect(() => {
    const checkPaystackReady = () => {
      if (typeof window !== "undefined" && window.PaystackPop) {
        setPaystackReady(true);
      } else {
        setPaystackReady(false);
      }
    };

    checkPaystackReady();
    const interval = setInterval(checkPaystackReady, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setErrors(prev => ({
      ...prev,
      recaptcha: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!recaptchaToken) newErrors.recaptcha = 'Please complete the reCAPTCHA';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Booking your experience...');

    try {
      // First, create the booking in the database
      const response = await fetch('/api/create-experience-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience: experience.title,
          experienceId: experience.id,
          category: experience.category,
          ...formData,
          pricePerPerson: experience.price,
          currency: experience.priceUnit,
          totalAmount: experience.price * formData.numberOfGuests,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.bookingId) {
        setBookingId(data.bookingId);
        setShowPayment(true);
        setIsSubmitting(false); // Reset submitting state so payment button is enabled
        toast.success('Booking created! Please proceed to payment.', { id: toastId });
        console.log('✅ Booking created successfully:', data.bookingId);
      } else {
        console.error('❌ Booking creation failed:', data);
        console.error('Response status:', response.status);
        console.error('Error details:', data.error || data.details);
        
        // Show detailed error message
        const errorMessage = data.message || 'Failed to create booking. Please try again.';
        const errorDetails = data.error ? ` Error: ${data.error}` : '';
        toast.error(errorMessage + errorDetails, { id: toastId, duration: 5000 });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('An error occurred. Please try again later.', { id: toastId });
      setIsSubmitting(false);
    }
  };

  const handlePaystackPayment = async () => {
    if (!paystackReady) {
      toast.error('Payment system is loading. Please wait a moment and try again.');
      return;
    }

    if (!bookingId) {
      toast.error('Booking not found. Please try again.');
      return;
    }

    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      toast.error('Payment system not configured. Please contact support.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Initializing payment...');

    try {
      const totalAmount = experience.price * formData.numberOfGuests;
      const amountInCents = Math.round(totalAmount * 100);

      // Generate a unique reference
      const reference = `PAAN_EXP_${experience.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // First, update booking with payment reference
      try {
        await fetch('/api/update-booking-payment-reference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookingId: bookingId,
            paymentReference: reference,
          }),
        });
      } catch (updateError) {
        console.error('Error updating booking with payment reference:', updateError);
        // Continue with payment even if update fails
      }

      // Paystack configuration
      const paystackConfig = {
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: amountInCents,
        currency: experience.priceUnit || 'USD',
        ref: reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: formData.name
            },
            {
              display_name: "Phone",
              variable_name: "phone",
              value: formData.phone
            },
            {
              display_name: "Experience",
              variable_name: "experience",
              value: experience.title
            },
            {
              display_name: "Experience ID",
              variable_name: "experience_id",
              value: experience.id
            },
            {
              display_name: "Number of Guests",
              variable_name: "number_of_guests",
              value: formData.numberOfGuests.toString()
            },
            {
              display_name: "Booking ID",
              variable_name: "booking_id",
              value: bookingId
            }
          ]
        },
        onSuccess: async (response) => {
          console.log('Paystack payment successful:', response);
          // Handle successful payment
          try {
            const verifyResponse = await fetch('/api/verify-experience-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                reference: response.reference,
                bookingId: bookingId,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              toast.success('Payment successful! Your booking is confirmed.', { id: toastId });
              // Redirect to success page or show confirmation
              setTimeout(() => {
                router.push(`/summit/travel-guide/experiences/${experience.id}/success?booking=${bookingId}`);
              }, 2000);
            } else {
              toast.error(verifyData.message || 'Payment verification failed. Please contact support.', { id: toastId });
              setIsSubmitting(false);
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error('Payment verification error. Please contact support.', { id: toastId });
            setIsSubmitting(false);
          }
        },
        onClose: function() {
          toast.error('Payment cancelled', { id: toastId });
          setIsSubmitting(false);
        }
      };

      if (typeof window !== 'undefined' && window.PaystackPop) {
        console.log('Initializing Paystack payment with config:', {
          email: formData.email,
          amount: amountInCents,
          currency: experience.priceUnit || 'USD',
          reference: reference
        });
        const handler = window.PaystackPop.setup(paystackConfig);
        handler.openIframe();
      } else {
        toast.error('Payment system not available. Please refresh the page.', { id: toastId });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      toast.error('Failed to initialize payment. Please try again.', { id: toastId });
      setIsSubmitting(false);
    }
  };

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${experience.title} - PAAN Summit 2026 Travel Experiences`}
        description={experience.description}
        keywords={`${experience.title}, PAAN Summit 2026, Nairobi tours, travel experiences`}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristTrip",
              "name": experience.title,
              "description": experience.description,
              "image": experience.image,
              "offers": {
                "@type": "Offer",
                "price": experience.price,
                "priceCurrency": experience.priceUnit
              }
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-white">
        <TravelGuideHeader navLinkColor="text-[#172840]" />

        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <div className="absolute inset-0">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
          </div>
          <div className="relative h-full flex items-end pb-12">
            <div className="mx-auto max-w-6xl w-full px-4">
              <div className="mb-4">
                <span className="bg-paan-red text-white px-4 py-2 rounded-full text-sm font-semibold uppercase">
                  {experience.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {experience.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
                {experience.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold text-paan-dark-blue mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {experience.description}
                </p>
              </section>

              {/* Features/Highlights */}
              {(experience.features || experience.highlights) && (
                <section>
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-4">
                    {experience.features ? "What's Included" : 'Highlights'}
                  </h2>
                  <ul className="space-y-3">
                    {(experience.features || experience.highlights).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon icon="mdi:check-circle" className="text-paan-red mt-1 flex-shrink-0" width="24" height="24" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Detailed Itinerary - Add based on experience type */}
              {experience.id === 'purple-tea-farm' && (
                <section>
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-4">Tour Summary</h2>
                  <div className="bg-[#DAECF3] rounded-lg p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-paan-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">8:00</div>
                      <div>
                        <h3 className="font-semibold text-paan-dark-blue">Pick up from your city hotel / Residence</h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-paan-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">9:30</div>
                      <div>
                        <h3 className="font-semibold text-paan-dark-blue">Arrive in Gatura Greens, Gatanga</h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-paan-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">10:00</div>
                      <div>
                        <h3 className="font-semibold text-paan-dark-blue">Purple Tea Farm Tour</h3>
                        <p className="text-gray-600 text-sm mt-1">Learn about the history of Purple Tea, how it's grown and harvested. Get a chance to pick tea and make your own specialty orthodox tea.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-paan-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">11:00</div>
                      <div>
                        <h3 className="font-semibold text-paan-dark-blue">Waterfall Trek and Swimming</h3>
                        <p className="text-gray-600 text-sm mt-1">Trek through a beautiful bamboo forest and enjoy a refreshing dip at the waterfall.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-paan-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">12:30</div>
                      <div>
                        <h3 className="font-semibold text-paan-dark-blue">Lunch and relaxation</h3>
                        <p className="text-gray-600 text-sm mt-1">Enjoy a farm-fresh 3-course meal with a bonfire in the gardens.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-paan-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2:00</div>
                      <div>
                        <h3 className="font-semibold text-paan-dark-blue">Tea Tasting</h3>
                        <p className="text-gray-600 text-sm mt-1">Experience an expansive tea tasting of all the delicious variants made at the cottage tea factory.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-paan-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3:30</div>
                      <div>
                        <h3 className="font-semibold text-paan-dark-blue">Drop off at your residence</h3>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Things to Note */}
              {experience.id === 'purple-tea-farm' && (
                <section>
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-4">Things to Note</h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 space-y-2">
                    <p className="text-gray-700"><strong>Dress code:</strong> Wear comfortable sneakers with a decent grip for the waterfall trek.</p>
                    <p className="text-gray-700"><strong>What to carry:</strong> Long pants for tea-picking, swimsuit & towel, change of clothing, warm sweater, sunscreen, and hat.</p>
                    <p className="text-gray-700"><strong>Note:</strong> The waterfall force is very strong during the rainy season and swimming may not be possible.</p>
                    <p className="text-gray-700"><strong>Weekday tours:</strong> Require a minimum of 6 pax per group.</p>
                  </div>
                </section>
              )}

              {/* Pricing Details */}
              <section>
                <h2 className="text-2xl font-bold text-paan-dark-blue mb-4">Pricing</h2>
                <div className="bg-[#DAECF3] rounded-lg p-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-paan-dark-blue">${experience.price}</span>
                    <span className="text-gray-600">{experience.priceUnit}</span>
                    {experience.priceNote && (
                      <span className="text-sm text-gray-500 italic ml-2">{experience.priceNote}</span>
                    )}
                  </div>
                  {experience.id === 'purple-tea-farm' && (
                    <div className="space-y-2 mt-4">
                      <p className="text-gray-700"><strong>Adult Rate:</strong> USD {experience.price} Per Person (Minimum 2 pax)</p>
                      <p className="text-gray-700"><strong>Child Rate:</strong> USD 101 (Under 12 Years)</p>
                      <p className="text-gray-700"><strong>Child Rate:</strong> USD 55 (Under 5 Years)</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Inclusions/Exclusions */}
              {experience.id === 'purple-tea-farm' && (
                <section>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Inclusions</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:check" className="text-green-600 mt-1" width="20" height="20" />
                          <span>Pick Up and drop off from the City Center Hotels /Residence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:check" className="text-green-600 mt-1" width="20" height="20" />
                          <span>Transport</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:check" className="text-green-600 mt-1" width="20" height="20" />
                          <span>Professional English – Speaking Guide</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:check" className="text-green-600 mt-1" width="20" height="20" />
                          <span>Entry Fees</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:check" className="text-green-600 mt-1" width="20" height="20" />
                          <span>Tea Picking, processing, and tasting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:check" className="text-green-600 mt-1" width="20" height="20" />
                          <span>Waterfall Trek</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:check" className="text-green-600 mt-1" width="20" height="20" />
                          <span>3-course Lunch & soft drink</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:check" className="text-green-600 mt-1" width="20" height="20" />
                          <span>Bottled Water</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Exclusions</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:close" className="text-red-600 mt-1" width="20" height="20" />
                          <span>Pocket Money & Tips</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="mdi:close" className="text-red-600 mt-1" width="20" height="20" />
                          <span>Anything not mentioned</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Booking Form Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-paan-dark-blue mb-6">Book This Experience</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      id="numberOfGuests"
                      name="numberOfGuests"
                      min="1"
                      value={formData.numberOfGuests}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent ${
                        errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="hotel" className="block text-sm font-medium text-gray-700 mb-1">
                      Hotel/Accommodation
                    </label>
                    <input
                      type="text"
                      id="hotel"
                      name="hotel"
                      value={formData.hotel}
                      onChange={handleChange}
                      placeholder="Where are you staying?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="dietaryRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Dietary Requirements
                    </label>
                    <textarea
                      id="dietaryRequirements"
                      name="dietaryRequirements"
                      value={formData.dietaryRequirements}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Any special dietary needs?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Any additional requests or questions?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent"
                    />
                  </div>

                  {/* Price Summary */}
                  <div className="bg-[#DAECF3] rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Price per person</span>
                      <span className="font-bold text-paan-dark-blue">${experience.price} {experience.priceUnit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total ({formData.numberOfGuests} {formData.numberOfGuests === 1 ? 'guest' : 'guests'})</span>
                      <span className="text-xl font-bold text-paan-dark-blue">
                        ${(experience.price * formData.numberOfGuests).toLocaleString()} {experience.priceUnit}
                      </span>
                    </div>
                  </div>

                  {/* reCAPTCHA */}
                  {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                    <div className="mb-4">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={handleRecaptchaChange}
                      />
                      {errors.recaptcha && <p className="text-red-500 text-xs mt-1">{errors.recaptcha}</p>}
                    </div>
                  )}

                  {!showPayment ? (
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-paan-red text-white px-6 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Icon icon="mdi:loading" className="animate-spin" width="20" height="20" />
                          Creating Booking...
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:calendar-check" width="20" height="20" />
                          Book Now & Pay
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handlePaystackPayment}
                      disabled={isSubmitting || !paystackReady}
                      className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Icon icon="mdi:loading" className="animate-spin" width="20" height="20" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:credit-card" width="20" height="20" />
                          Pay ${(experience.price * formData.numberOfGuests).toLocaleString()} {experience.priceUnit}
                        </>
                      )}
                    </motion.button>
                  )}

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our terms and conditions. We'll contact you within 24 hours to confirm your booking.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <motion.button
              onClick={() => router.push('/summit/travel-guide#summit-experiences')}
              className="bg-paan-dark-blue text-white px-8 py-3 rounded-full hover:bg-paan-dark-blue/90 transition-all duration-300 font-medium flex items-center justify-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="mdi:arrow-left" width="20" height="20" />
              Back to All Experiences
            </motion.button>
          </div>
        </div>

        <SummitFooter />
        <ScrollToTop />
        <PaystackScript />
        <Toaster position="top-right" />
      </main>
    </>
  );
};

export default ExperienceDetailPage;

