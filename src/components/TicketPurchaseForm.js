"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

const TicketPurchaseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "",
    role: "",
    company: "",
    email: "",
    ticketType: "members",
    membershipVerification: {
      method: "",
      value: ""
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  // Ticket options
  const ticketOptions = [
    {
      id: "members",
      name: "Members",
      price: 100,
      currency: "USD",
      priceKes: 13000, // 100 USD * 130 KES
      description: "PAAN Members pricing",
      features: [
        "Full 3-day summit access",
        "Networking sessions",
        "Digital certificate",
        "Lunch & refreshments",
        "Welcome kit",
        "Member-only sessions"
      ]
    },
    {
      id: "non-members",
      name: "Non-Members",
      price: 150,
      currency: "USD",
      priceKes: 19500, // 150 USD * 130 KES
      description: "General public pricing",
      features: [
        "Full 3-day summit access",
        "Networking sessions",
        "Digital certificate",
        "Lunch & refreshments",
        "Welcome kit"
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

  // Membership verification methods
  const verificationMethods = [
    {
      id: "member-id",
      name: "PAAN Member ID",
      placeholder: "Enter your PAAN Member ID (e.g., PAAN2024001)",
      description: "Your unique PAAN membership identifier"
    },
    {
      id: "email-domain",
      name: "Company Email Domain",
      placeholder: "Enter your company email (e.g., john@company.com)",
      description: "Email from a registered PAAN member company"
    }
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

  const handleVerificationMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      membershipVerification: {
        method: method,
        value: ""
      }
    }));
    setVerificationStatus(null);
  };

  const handleVerificationValueChange = (value) => {
    setFormData(prev => ({
      ...prev,
      membershipVerification: {
        ...prev.membershipVerification,
        value: value
      }
    }));
    setVerificationStatus(null);
  };

  // Simulate membership verification (replace with actual API call)
  const verifyMembership = async () => {
    if (!formData.membershipVerification.method || !formData.membershipVerification.value) {
      setErrors(prev => ({
        ...prev,
        membershipVerification: "Please select a verification method and enter the required information"
      }));
      return;
    }

    setIsVerifying(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock verification logic (replace with actual verification)
    const { method, value } = formData.membershipVerification;
    let isValid = false;
    
    switch (method) {
      case "member-id":
        // Check if member ID format is valid (PAAN + year + 3 digits)
        isValid = /^PAAN\d{4}\d{3}$/.test(value.toUpperCase());
        break;
      case "email-domain":
        // Check if email domain is in member companies list
        const memberDomains = ["paan.africa", "membercompany.com", "agency.com"];
        const domain = value.split('@')[1]?.toLowerCase();
        isValid = memberDomains.includes(domain);
        break;
    }
    
    setVerificationStatus(isValid ? "verified" : "failed");
    setIsVerifying(false);
    
    if (isValid) {
      setFormData(prev => ({ ...prev, ticketType: "members" }));
    } else {
      setFormData(prev => ({ ...prev, ticketType: "non-members" }));
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

    // If user selected members ticket but hasn't verified membership
    if (formData.ticketType === "members" && verificationStatus !== "verified") {
      newErrors.membershipVerification = "Please verify your PAAN membership to access member pricing";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaystackPayment = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Get selected ticket
    const selectedTicket = ticketOptions.find(ticket => ticket.id === formData.ticketType);
    
    // Support both USD and KES currencies
    const currency = formData.country === "Kenya" ? "KES" : "USD";
    
    // Convert amount based on currency
    let amountInCents;
    if (currency === "KES") {
      // Use KES pricing directly
      amountInCents = selectedTicket.priceKes * 100; // Convert to cents
    } else {
      // USD amount
      amountInCents = selectedTicket.price * 100; // Convert to cents
    }

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
      amount: amountInCents, // Amount in cents
      currency: "KES",
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
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
            value: selectedTicket.name
          }
        ]
      },
      callback: function(response) {
        // Handle successful payment
        console.log("Payment successful:", response);
        setIsLoading(false);
        // You can redirect to a success page or show a success message
        alert(`Payment successful! You have purchased a ${selectedTicket.name} ticket. You will receive a confirmation email shortly.`);
        onClose();
      },
      onClose: function() {
        // Handle payment cancellation
        console.log("Payment cancelled");
        setIsLoading(false);
      }
    };

    // Debug: Log configuration
    console.log("Paystack Configuration:", {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ? "Present" : "Missing",
      email: formData.email,
      amount: amountInCents,
      currency: currency,
      ref: reference,
      country: formData.country,
      originalPrice: selectedTicket.price,
      convertedPrice: currency === "KES" ? selectedTicket.priceKes : selectedTicket.price
    });

    // Initialize Paystack
    if (typeof window !== "undefined" && window.PaystackPop) {
      try {
        const handler = window.PaystackPop.setup(paystackConfig);
        handler.openIframe();
      } catch (error) {
        console.error("Paystack initialization error:", error);
        console.error("Paystack config:", paystackConfig);
        alert(`Payment initialization failed: ${error.message || 'Unknown error'}. Please check your internet connection and try again.`);
        setIsLoading(false);
      }
    } else {
      console.error("Paystack not loaded");
      alert("Payment system is not ready. Please refresh the page and try again.");
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
                  onClick={() => setFormData(prev => ({ ...prev, ticketType: ticket.id }))}
                >
                  <div className="text-center">
                    <h4 className="font-bold text-paan-dark-blue mb-2">{ticket.name}</h4>
                    <div className="mb-3">
                      <span className="text-3xl font-bold text-paan-red">
                        {formData.country === "Kenya" 
                          ? `KSh ${ticket.priceKes?.toLocaleString()}` 
                          : `$${ticket.price}`
                        }
                      </span>
                      <span className="text-gray-500 ml-1">
                        {formData.country === "Kenya" ? "KES" : "USD"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                    {ticket.validUntil && (
                      <p className="text-xs text-paan-red font-medium mb-3">Valid until {ticket.validUntil}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Membership Verification - Only show for members ticket */}
          {formData.ticketType === "members" && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">PAAN Membership Verification</h3>
              <p className="text-sm text-gray-600 mb-4">
                Verify your PAAN membership to access member pricing ($100 vs $150 for non-members)
              </p>
              
              {/* Verification Method Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                  Verification Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {verificationMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleVerificationMethodChange(method.id)}
                      className={`p-3 text-left border rounded-lg transition-all ${
                        formData.membershipVerification.method === method.id
                          ? "border-paan-blue bg-paan-blue/10"
                          : "border-gray-200 hover:border-paan-blue"
                      }`}
                    >
                      <div className="font-medium text-sm">{method.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{method.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verification Input */}
              {formData.membershipVerification.method && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                    {verificationMethods.find(m => m.id === formData.membershipVerification.method)?.name}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.membershipVerification.value}
                      onChange={(e) => handleVerificationValueChange(e.target.value)}
                      placeholder={verificationMethods.find(m => m.id === formData.membershipVerification.method)?.placeholder}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
                    />
                    <button
                      onClick={verifyMembership}
                      disabled={isVerifying || !formData.membershipVerification.value}
                      className="px-6 py-3 bg-paan-blue text-white rounded-xl hover:bg-paan-blue/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:check-circle" className="w-4 h-4" />
                          Verify
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Verification Status */}
              {verificationStatus && (
                <div className={`p-3 rounded-lg flex items-center gap-2 ${
                  verificationStatus === "verified" 
                    ? "bg-green-50 border border-green-200" 
                    : "bg-red-50 border border-red-200"
                }`}>
                  <Icon 
                    icon={verificationStatus === "verified" ? "mdi:check-circle" : "mdi:close-circle"} 
                    className={`w-5 h-5 ${
                      verificationStatus === "verified" ? "text-green-600" : "text-red-600"
                    }`} 
                  />
                  <span className={`text-sm font-medium ${
                    verificationStatus === "verified" ? "text-green-800" : "text-red-800"
                  }`}>
                    {verificationStatus === "verified" 
                      ? "✅ Membership verified! You qualify for member pricing." 
                      : "❌ Membership not verified. You will be charged non-member pricing."}
                  </span>
                </div>
              )}

              {errors.membershipVerification && (
                <p className="text-red-500 text-sm mt-2">{errors.membershipVerification}</p>
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

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Icon icon="mdi:information" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-paan-dark-blue mb-1">Important Information:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Tickets are non-refundable but transferable</li>
                  <li>• Confirmation email will be sent after payment</li>
                  <li>• Member pricing available for PAAN members</li>
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
              disabled={isLoading}
              className="flex-1 bg-paan-red text-white px-6 py-3 rounded-xl hover:bg-paan-red/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Icon icon="mdi:credit-card" className="w-5 h-5" />
                  Pay {formData.country === "Kenya" 
                    ? `KSh ${ticketOptions.find(t => t.id === formData.ticketType)?.priceKes?.toLocaleString()}` 
                    : `$${ticketOptions.find(t => t.id === formData.ticketType)?.price} USD`
                  }
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
