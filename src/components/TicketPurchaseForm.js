"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const TicketPurchaseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "",
    role: "",
    company: "",
    email: "",
    ticketType: "general-admission",
    extraDelegates: 0,
    // Student & Young Creatives specific fields
    studentId: "",
    institution: "",
    graduationYear: "",
    // Corporate Group specific fields
    teamSize: 5,
    teamMembers: [],
    // International Delegate specific fields
    passportNumber: "",
    visaRequired: "",
    accommodationNeeded: "",
    arrivalDate: "",
    departureDate: "",
    // Virtual Access specific fields
    timezone: "",
    preferredLanguage: "",
    // Agency Growth specific fields
    agencySize: "",
    yearsInBusiness: "",
    // VIP Delegate specific fields
    dietaryRequirements: "",
    accessibilityNeeds: "",
    // Early Bird specific fields
    heardAbout: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [paystackReady, setPaystackReady] = useState(false);

  // Early Bird countdown timer state
  const [earlyBirdTimeLeft, setEarlyBirdTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Check if Paystack is ready
  useEffect(() => {
    const checkPaystackReady = () => {
      if (typeof window !== "undefined" && window.PaystackPop) {
        setPaystackReady(true);
      } else {
        setPaystackReady(false);
      }
    };

    // Check immediately
    checkPaystackReady();

    // Check periodically until ready
    const interval = setInterval(checkPaystackReady, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Early Bird countdown timer
  useEffect(() => {
    const targetDate = new Date('2026-01-25T23:59:59+03:00'); // January 25, 2026 at 11:59 PM EAT
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        setEarlyBirdTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setEarlyBirdTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Ticket options
  const ticketOptions = [
    {
      id: "early-bird",
      name: "Early Bird Pass",
      price: 65,
      currency: "USD",
      description: "Only 100 slots, until Jan 25th 2026",
      validUntil: "January 25th, 2026",
      features: [
        "Full 2-day summit access",
        "Exhibition showcase & networking lounge",
        "Digital speaker presentations post-event",
        "Save 30% before January 25th, 2026"
      ]
    },
    {
      id: "vip-delegate",
      name: "VIP Delegate Pass",
      price: 220,
      currency: "USD",
      description: "Exclusive Access",
      features: [
        "All Agency Growth benefits",
        "VIP Networking Cocktail",
        "Premium lounge w/ WiFi & refreshments",
        "Reserved front-row seating",
        "Recognition as a VIP delegate",
        "PAAN Awards Gala"
      ]
    },
    {
      id: "agency-growth",
      name: "Agency Growth Pass",
      price: 145,
      currency: "USD",
      description: "For Leaders & Teams",
      features: [
        "All General Admission benefits",
        "Agency Leaders Roundtable",
        "Agency Growth Workshop",
        "Priority seating at keynotes",
        "PAAN Awards Gala"
      ]
    },
    {
      id: "general-admission",
      name: "General Admission",
      price: 95,
      currency: "USD",
      description: "Most Popular Standard",
      features: [
        "Full 2-day summit access",
        "Networking app & exhibition",
        "Digital certificate of participation",
        "Access to all keynotes & panels"
      ]
    },
    {
      id: "corporate-group",
      name: "Corporate Group Pass",
      price: 390,
      currency: "USD",
      description: "5+ delegates",
      extraPrice: 70,
      features: [
        "5 Full General Admission tickets",
        "Reserved team seating",
        "Optional group branding mention",
        "Best for teams & agencies"
      ]
    },
    {
      id: "student-creatives",
      name: "Student & Young Creatives Pass",
      price: 50,
      currency: "USD",
      description: "For students and young professionals",
      features: [
        "Full 2 Day access",
        "Exhibition & networking sessions",
        "Student-only networking with recruiters",
        "Certificate of participation"
      ]
    },
    {
      id: "international-delegate",
      name: "International Delegate Pass",
      price: 250,
      currency: "USD",
      description: "For international attendees",
      features: [
        "All General Admission benefits",
        "Concierge support (visa & accommodation)",
        "Welcome kit w/ African-inspired gifts",
        "Priority registration & help desk",
        "PAAN Awards Gala"
      ]
    },
    {
      id: "virtual-access",
      name: "Virtual Access Pass",
      price: 10,
      currency: "USD",
      description: "Join from anywhere",
      features: [
        "Live streaming of keynotes & panels",
        "Access to a networking platform",
        "30-day access to recordings",
        "Join from anywhere"
      ]
    }
  ];

  // Country options
  const countries = [
    "Nigeria", "Kenya", "South Africa", "Ghana", "Egypt", "Morocco", 
    "Tunisia", "Algeria", "Ethiopia", "Uganda", "Tanzania", "Rwanda",
    "Senegal", "Ivory Coast", "Cameroon", "Angola", "Zambia", "Zimbabwe",
    "Botswana", "Namibia", "Mauritius", "Seychelles", "Other"
  ];

  // Role options
  const roles = [
    "Agency Owner/CEO",
    "Creative Director",
    "Account Manager",
    "Brand Manager",
    "Marketing Manager",
    "Freelancer",
    "Student",
    "Investor",
    "Startup Founder",
    "Corporate Executive",
    "Other"
  ];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaystackPayment = async () => {
    if (!validateForm()) {
      return;
    }

    // Check if Paystack is ready
    if (!paystackReady) {
      alert("Payment system is loading. Please wait a moment and try again.");
      return;
    }

    setIsLoading(true);

    // Get selected ticket
    const selectedTicket = ticketOptions.find(ticket => ticket.id === formData.ticketType);
    
    // Use USD currency for all payments
    const currency = "USD";
    
    // Calculate total amount including extra delegates for corporate group
    let totalAmount = selectedTicket.price;
    if (formData.ticketType === "corporate-group" && formData.teamSize > 5) {
      const extraMembers = formData.teamSize - 5;
      totalAmount += (selectedTicket.extraPrice * extraMembers);
    }
    
    // Convert to cents
    const amountInCents = totalAmount * 100;

    // Check if Paystack key is configured
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      alert("Payment system not configured. Please contact support.");
      setIsLoading(false);
      return;
    }

    // Validate required fields
    if (!formData.email || !formData.name) {
      alert("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    // Generate a unique reference
    const reference = `PAAN_SUMMIT_${formData.ticketType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Paystack configuration
    const paystackConfig = {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: amountInCents,
      currency: currency,
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
            display_name: "Country",
            variable_name: "country",
            value: formData.country
          },
          {
            display_name: "Role",
            variable_name: "role",
            value: formData.role
          },
          {
            display_name: "Company",
            variable_name: "company",
            value: formData.company
          },
          {
            display_name: "Ticket Type",
            variable_name: "ticket_type",
            value: formData.ticketType
          },
          {
            display_name: "Team Size",
            variable_name: "team_size",
            value: formData.teamSize.toString()
          },
          {
            display_name: "Student ID",
            variable_name: "student_id",
            value: formData.studentId
          },
          {
            display_name: "Institution",
            variable_name: "institution",
            value: formData.institution
          },
          {
            display_name: "Graduation Year",
            variable_name: "graduation_year",
            value: formData.graduationYear
          },
          {
            display_name: "Passport Number",
            variable_name: "passport_number",
            value: formData.passportNumber
          },
          {
            display_name: "Visa Required",
            variable_name: "visa_required",
            value: formData.visaRequired
          },
          {
            display_name: "Accommodation Needed",
            variable_name: "accommodation_needed",
            value: formData.accommodationNeeded
          },
          {
            display_name: "Arrival Date",
            variable_name: "arrival_date",
            value: formData.arrivalDate
          },
          {
            display_name: "Departure Date",
            variable_name: "departure_date",
            value: formData.departureDate
          },
          {
            display_name: "Timezone",
            variable_name: "timezone",
            value: formData.timezone
          },
          {
            display_name: "Preferred Language",
            variable_name: "preferred_language",
            value: formData.preferredLanguage
          },
          {
            display_name: "Agency Size",
            variable_name: "agency_size",
            value: formData.agencySize
          },
          {
            display_name: "Years in Business",
            variable_name: "years_in_business",
            value: formData.yearsInBusiness
          },
          {
            display_name: "Dietary Requirements",
            variable_name: "dietary_requirements",
            value: formData.dietaryRequirements
          },
          {
            display_name: "Accessibility Needs",
            variable_name: "accessibility_needs",
            value: formData.accessibilityNeeds
          },
          {
            display_name: "Heard About",
            variable_name: "heard_about",
            value: formData.heardAbout
          }
        ]
      },
      callback: function(response) {
        if (response.status === 'success') {
          // Send ticket purchase data to secretariat
          fetch('/api/send-summit-ticket', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentData: {
                reference: response.reference,
                amount: amountInCents,
                currency: currency,
                status: 'success',
                paidAt: new Date().toISOString()
              },
              ticketData: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                country: formData.country,
                role: formData.role,
                company: formData.company,
                ticketType: formData.ticketType,
                teamSize: formData.teamSize,
                teamMembers: formData.teamMembers,
                studentId: formData.studentId,
                institution: formData.institution,
                graduationYear: formData.graduationYear,
                passportNumber: formData.passportNumber,
                visaRequired: formData.visaRequired,
                accommodationNeeded: formData.accommodationNeeded,
                arrivalDate: formData.arrivalDate,
                departureDate: formData.departureDate,
                timezone: formData.timezone,
                preferredLanguage: formData.preferredLanguage,
                agencySize: formData.agencySize,
                yearsInBusiness: formData.yearsInBusiness,
                dietaryRequirements: formData.dietaryRequirements,
                accessibilityNeeds: formData.accessibilityNeeds,
                heardAbout: formData.heardAbout,
                amount: totalAmount,
                currency: currency,
                features: selectedTicket.features
              },
              reference: response.reference
            }),
          })
          .then(emailResponse => emailResponse.json())
          .then(emailResult => {
            if (emailResult.success) {
              console.log('Ticket purchase email sent successfully');
            } else {
              console.error('Failed to send ticket purchase email:', emailResult.message);
            }
          })
          .catch(emailError => {
            console.error('Error sending ticket purchase email:', emailError);
            // Don't block the payment success flow if email fails
          });

          // Redirect to success page with reference
          window.location.href = `/payment/success?reference=${response.reference}&type=summit`;
        } else {
          alert('Payment failed. Please try again.');
          setIsLoading(false);
        }
      },
      onClose: function() {
        // Redirect to failure page
        window.location.href = `/payment/failure?error=${encodeURIComponent('Payment was cancelled by user')}&reference=${reference}`;
        setIsLoading(false);
      }
    };

    // Initialize Paystack
    try {
      const handler = window.PaystackPop.setup(paystackConfig);
      handler.openIframe();
    } catch (error) {
      console.error('Error initializing Paystack:', error);
      alert('Payment system error. Please refresh the page and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-paan-dark-blue">Purchase Summit Ticket</h2>
              <p className="text-gray-600 mt-1">Join Africa's premier creative summit</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon icon="mdi:close" className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Ticket Selection */}
          <div>
            <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Select Your Ticket</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ticketOptions.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    formData.ticketType === ticket.id
                      ? "border-paan-red bg-paan-red/5"
                      : "border-gray-200 hover:border-paan-blue"
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, ticketType: ticket.id, extraDelegates: 0 }))}
                >
                  <div className="text-center">
                    <h4 className="font-bold text-paan-dark-blue mb-2">{ticket.name}</h4>
                    <div className="mb-3">
                      <span className="text-3xl font-bold text-paan-red">
                        ${ticket.price}
                      </span>
                      <span className="text-gray-500 ml-1">
                        USD
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                    {ticket.validUntil && (
                      <p className="text-xs text-paan-red font-medium mb-3">Valid until {ticket.validUntil}</p>
                    )}
                    {ticket.extraPrice && (
                      <p className="text-xs text-gray-500 mb-2">
                        +${ticket.extraPrice} per extra delegate
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Ticket Benefits */}
          {formData.ticketType && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">
                {ticketOptions.find(t => t.id === formData.ticketType)?.name} - What's Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {ticketOptions.find(t => t.id === formData.ticketType)?.features.slice(0, Math.ceil(ticketOptions.find(t => t.id === formData.ticketType)?.features.length / 2)).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {ticketOptions.find(t => t.id === formData.ticketType)?.features.slice(Math.ceil(ticketOptions.find(t => t.id === formData.ticketType)?.features.length / 2)).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Special Notes */}
              {formData.ticketType === "early-bird" && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon icon="mdi:clock-alert" className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Limited Time Offer</span>
                  </div>
                  
                  {/* Early Bird Countdown Timer */}
                  {earlyBirdTimeLeft.days > 0 || earlyBirdTimeLeft.hours > 0 || earlyBirdTimeLeft.minutes > 0 || earlyBirdTimeLeft.seconds > 0 ? (
                    <div className="mb-3 p-3 bg-yellow-100 rounded-lg">
                      <div className="text-center">
                        <p className="text-xs font-medium text-yellow-800 mb-2">Early Bird Offer Ends In:</p>
                        <div className="flex justify-center gap-2 text-sm">
                          <div className="bg-yellow-200 rounded px-2 py-1 min-w-[40px]">
                            <div className="font-bold text-yellow-900">{earlyBirdTimeLeft.days}</div>
                            <div className="text-xs text-yellow-700">Days</div>
                          </div>
                          <div className="bg-yellow-200 rounded px-2 py-1 min-w-[40px]">
                            <div className="font-bold text-yellow-900">{earlyBirdTimeLeft.hours}</div>
                            <div className="text-xs text-yellow-700">Hrs</div>
                          </div>
                          <div className="bg-yellow-200 rounded px-2 py-1 min-w-[40px]">
                            <div className="font-bold text-yellow-900">{earlyBirdTimeLeft.minutes}</div>
                            <div className="text-xs text-yellow-700">Min</div>
                          </div>
                          <div className="bg-yellow-200 rounded px-2 py-1 min-w-[40px]">
                            <div className="font-bold text-yellow-900">{earlyBirdTimeLeft.seconds}</div>
                            <div className="text-xs text-yellow-700">Sec</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3 p-3 bg-red-100 rounded-lg">
                      <p className="text-center text-sm font-medium text-red-800">Early Bird Offer Has Ended</p>
                    </div>
                  )}
                  
                  <p className="text-sm text-yellow-700">
                    Only 100 Early Bird passes available. Save 30% compared to regular pricing!
                  </p>
                </div>
              )}
              
              {formData.ticketType === "corporate-group" && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:account-group" className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Perfect for Teams</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Base package includes 5 General Admission tickets. Add more delegates at $70 each for additional team members.
                  </p>
                </div>
              )}
              
              {formData.ticketType === "virtual-access" && (
                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:monitor" className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Remote Access</span>
                  </div>
                  <p className="text-sm text-purple-700 mt-1">
                    Join from anywhere in the world! Perfect for international attendees or those who can't travel to Nairobi.
                  </p>
                </div>
              )}
              
              {formData.ticketType === "international-delegate" && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:airplane" className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">International Support</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    We'll help with visa applications, accommodation recommendations, and provide a welcome kit with African-inspired gifts.
                  </p>
                </div>
              )}
            </div>
          )}



          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                Country *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                Role/Position *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select your role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                Company/Organization *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your company name"
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>
          </div>

          {/* Ticket-Specific Input Fields */}
          {formData.ticketType === "student-creatives" && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Student ID / Registration Number
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                    placeholder="Enter your student ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Institution/University
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                    placeholder="Enter your institution name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Expected Graduation Year
                  </label>
                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select graduation year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="graduated">Already Graduated</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {formData.ticketType === "corporate-group" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Team Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Total Team Size (including yourself)
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        teamSize: Math.max(5, prev.teamSize - 1) 
                      }))}
                      className="w-10 h-10 bg-paan-blue text-white rounded-lg hover:bg-paan-blue/90 transition-colors flex items-center justify-center"
                    >
                      <Icon icon="mdi:minus" className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold text-paan-dark-blue min-w-[3rem] text-center">
                      {formData.teamSize}
                    </span>
                    <button
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        teamSize: prev.teamSize + 1 
                      }))}
                      className="w-10 h-10 bg-paan-blue text-white rounded-lg hover:bg-paan-blue/90 transition-colors flex items-center justify-center"
                    >
                      <Icon icon="mdi:plus" className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Minimum 5 team members. Each additional member costs $70 USD.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Team Members Names (Optional)
                  </label>
                  <textarea
                    name="teamMembers"
                    value={formData.teamMembers.join('\n')}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      teamMembers: e.target.value.split('\n').filter(name => name.trim()) 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                    placeholder="Enter team member names (one per line)"
                    rows={3}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    You can add team member names now or provide them later via email.
                  </p>
                </div>
              </div>
            </div>
          )}

          {formData.ticketType === "international-delegate" && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">International Travel Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                    placeholder="Enter your passport number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Do you need a visa for Kenya?
                  </label>
                  <select
                    name="visaRequired"
                    value={formData.visaRequired}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select option</option>
                    <option value="yes">Yes, I need a visa</option>
                    <option value="no">No, I don't need a visa</option>
                    <option value="unsure">I'm not sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Do you need accommodation assistance?
                  </label>
                  <select
                    name="accommodationNeeded"
                    value={formData.accommodationNeeded}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select option</option>
                    <option value="yes">Yes, I need help finding accommodation</option>
                    <option value="no">No, I'll arrange my own accommodation</option>
                    <option value="recommendations">Just recommendations please</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Arrival Date
                  </label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.ticketType === "virtual-access" && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Virtual Access Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select your timezone</option>
                    <option value="GMT+3">GMT+3 (East Africa Time)</option>
                    <option value="GMT+1">GMT+1 (West Africa Time)</option>
                    <option value="GMT+2">GMT+2 (Central Africa Time)</option>
                    <option value="GMT+0">GMT+0 (Greenwich Mean Time)</option>
                    <option value="GMT-5">GMT-5 (Eastern Time)</option>
                    <option value="GMT-8">GMT-8 (Pacific Time)</option>
                    <option value="GMT+5:30">GMT+5:30 (India Standard Time)</option>
                    <option value="GMT+8">GMT+8 (China Standard Time)</option>
                    <option value="GMT+9">GMT+9 (Japan Standard Time)</option>
                    <option value="GMT+10">GMT+10 (Australian Eastern Time)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Preferred Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select preferred language</option>
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="arabic">Arabic</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="swahili">Swahili</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {formData.ticketType === "agency-growth" && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Agency Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Agency Size
                  </label>
                  <select
                    name="agencySize"
                    value={formData.agencySize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select agency size</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-20">6-20 employees</option>
                    <option value="21-50">21-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="100+">100+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Years in Business
                  </label>
                  <select
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select years in business</option>
                    <option value="0-1">0-1 years (Startup)</option>
                    <option value="2-5">2-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-20">11-20 years</option>
                    <option value="20+">20+ years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {formData.ticketType === "vip-delegate" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">VIP Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Dietary Requirements
                  </label>
                  <select
                    name="dietaryRequirements"
                    value={formData.dietaryRequirements}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select dietary requirements</option>
                    <option value="none">No special requirements</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="halal">Halal</option>
                    <option value="kosher">Kosher</option>
                    <option value="gluten-free">Gluten-free</option>
                    <option value="allergies">Food allergies (specify in notes)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Accessibility Needs
                  </label>
                  <select
                    name="accessibilityNeeds"
                    value={formData.accessibilityNeeds}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                  >
                    <option value="">Select accessibility needs</option>
                    <option value="none">No special needs</option>
                    <option value="wheelchair">Wheelchair access required</option>
                    <option value="hearing">Hearing assistance needed</option>
                    <option value="visual">Visual assistance needed</option>
                    <option value="mobility">Mobility assistance needed</option>
                    <option value="other">Other (specify in notes)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {formData.ticketType === "early-bird" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Early Bird Information</h3>
              <div>
                <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                  How did you hear about PAAN Summit 2026?
                </label>
                <select
                  name="heardAbout"
                  value={formData.heardAbout}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                >
                  <option value="">Select option</option>
                  <option value="social-media">Social Media</option>
                  <option value="email">Email Newsletter</option>
                  <option value="website">PAAN Website</option>
                  <option value="referral">Friend/Colleague Referral</option>
                  <option value="partner">Partner Organization</option>
                  <option value="search">Search Engine</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Icon icon="mdi:information" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-paan-dark-blue mb-1">Important Information:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Tickets are non-refundable but transferable</li>
                  <li>• Confirmation email will be sent after payment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handlePaystackPayment}
              disabled={isLoading || !paystackReady}
              className="flex-1 bg-paan-red text-white px-6 py-3 rounded-xl hover:bg-paan-red/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : !paystackReady ? (
                <>
                  <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                  Loading Payment System...
                </>
              ) : (
                <>
                  <Icon icon="mdi:credit-card" className="w-5 h-5" />
                  Pay {(() => {
                    const selectedTicket = ticketOptions.find(t => t.id === formData.ticketType);
                    let totalAmount = selectedTicket.price;
                    if (formData.ticketType === "corporate-group" && formData.teamSize > 5) {
                      const extraMembers = formData.teamSize - 5;
                      totalAmount += (selectedTicket.extraPrice * extraMembers);
                    }
                    return `$${totalAmount} USD`;
                  })()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseForm;
