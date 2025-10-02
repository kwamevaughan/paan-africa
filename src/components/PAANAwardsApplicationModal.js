"use client";

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import PaystackScript from './PaystackScript';

const PAANAwardsApplicationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    country: '',
    
    // Professional Information
    applicantType: 'agency', // 'agency' or 'freelancer'
    companyName: '',
    website: '',
    portfolio: '',
    yearsExperience: '',
    
    // Award Category Selection
    selectedCategories: [],
    
    // Project/Work Information
    projectTitle: '',
    projectDescription: '',
    projectUrl: '',
    projectImages: [],
    
    // Additional Information
    whyApply: '',
    previousAwards: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      instagram: ''
    },
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToDataProcessing: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [paystackReady, setPaystackReady] = useState(false);
  const recaptchaRef = useRef(null);

  // Check if reCAPTCHA site key is available
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaSiteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local"
    );
  }

  // Award categories - New structure with grouped categories
  const awardCategories = [
    {
      id: 'campaign-excellence',
      name: 'Campaign Excellence Awards',
      description: 'Celebrating the power of ideas, creativity, and execution across Africa\'s most impactful campaigns. These categories honor the campaigns that moved audiences, shaped perceptions, and delivered results across PR, communications, digital, and brand activations.',
      subcategories: [
        {
          id: 'pr-campaign-year',
          name: 'PR Campaign of the Year',
          description: 'Outstanding public relations campaigns that shaped public perception and delivered measurable impact.'
        },
        {
          id: 'communication-campaign-year',
          name: 'Communication Campaign of the Year',
          description: 'Exceptional communication strategies that effectively reached and engaged target audiences.'
        },
        {
          id: 'ooh-campaign-year',
          name: 'OOH (Out-of-Home) Campaign of the Year',
          description: 'Creative and impactful outdoor advertising campaigns that captured attention and drove results.'
        },
        {
          id: 'social-media-campaign-year',
          name: 'Social Media Campaign of the Year',
          description: 'Innovative social media campaigns that engaged communities and achieved remarkable reach.'
        },
        {
          id: 'content-marketing-campaign-year',
          name: 'Content Marketing Campaign of the Year',
          description: 'Strategic content campaigns that educated, entertained, and converted audiences effectively.'
        },
        {
          id: 'influencer-marketing-campaign-year',
          name: 'Influencer Marketing Campaign of the Year',
          description: 'Successful influencer partnerships that authentically connected brands with their audiences.'
        },
        {
          id: 'csr-impact-campaign-year',
          name: 'CSR/Impact Campaign of the Year',
          description: 'Purpose-driven campaigns that created positive social or environmental impact.'
        },
        {
          id: 'integrated-marketing-campaign-year',
          name: 'Integrated Marketing Campaign of the Year',
          description: 'Seamlessly coordinated multi-channel campaigns that delivered consistent messaging and results.'
        },
        {
          id: 'b2b-marketing-campaign-year',
          name: 'B2B Marketing Campaign of the Year',
          description: 'Business-to-business campaigns that effectively reached and converted professional audiences.'
        },
        {
          id: 'experiential-brand-activation-year',
          name: 'Experiential/Brand Activation of the Year',
          description: 'Immersive brand experiences that created memorable connections with consumers.'
        }
      ]
    },
    {
      id: 'agency-excellence',
      name: 'Agency Excellence Awards',
      description: 'Recognizing the agencies that set the benchmark for innovation, growth, and client success. These awards spotlight agencies of all sizes and specialties that have demonstrated vision, creativity, and measurable impact in building brands across Africa.',
      subcategories: [
        {
          id: 'digital-agency-year',
          name: 'Digital Agency of the Year',
          description: 'Leading digital agencies that excel in online strategy, execution, and innovation.'
        },
        {
          id: 'creative-agency-year',
          name: 'Creative Agency of the Year',
          description: 'Creative agencies that consistently deliver outstanding creative solutions and campaigns.'
        },
        {
          id: 'design-branding-agency-year',
          name: 'Design & Branding Agency of the Year',
          description: 'Agencies specializing in visual identity, brand design, and creative brand development.'
        },
        {
          id: 'media-planning-buying-agency-year',
          name: 'Media Planning & Buying Agency of the Year',
          description: 'Agencies that excel in strategic media planning, buying, and optimization.'
        },
        {
          id: 'production-house-year',
          name: 'Production House of the Year',
          description: 'Production companies delivering exceptional video, audio, and multimedia content.'
        },
        {
          id: 'specialist-agency-year',
          name: 'Specialist Agency of the Year',
          description: 'Agencies with specialized expertise in sectors like healthcare, fintech, agriculture, etc.'
        },
        {
          id: 'rising-agency-year',
          name: 'Rising Agency of the Year',
          description: 'Emerging agencies showing exceptional growth, innovation, and potential.'
        },
        {
          id: 'regional-agency-year',
          name: 'Regional Agency of the Year',
          description: 'Outstanding agencies representing East, West, Southern, or North Africa regions.'
        }
      ]
    },
    {
      id: 'innovation-technology',
      name: 'Innovation & Technology Awards',
      description: 'Celebrating the pioneers redefining the future of marketing through data, technology, and new platforms. These categories honor agencies that harness innovation to deliver smarter, more engaging, and more measurable results.',
      subcategories: [
        {
          id: 'tech-innovation-marketing',
          name: 'Tech Innovation in Marketing Award',
          description: 'Groundbreaking use of technology to create innovative marketing solutions and experiences.'
        },
        {
          id: 'creative-use-data',
          name: 'Creative Use of Data Award',
          description: 'Innovative application of data analytics and insights to drive creative and strategic decisions.'
        },
        {
          id: 'ecommerce-marketing-campaign-year',
          name: 'E-Commerce Marketing Campaign of the Year',
          description: 'Outstanding marketing campaigns that drove e-commerce growth and online sales success.'
        }
      ]
    },
    {
      id: 'sector-excellence',
      name: 'Sector Excellence Awards',
      description: 'Honoring outstanding campaigns in industries that play a vital role in Africa\'s growth and development. These awards highlight work that has transformed communication in specific, high-impact sectors.',
      subcategories: [
        {
          id: 'public-sector-campaign-year',
          name: 'Public Sector Campaign of the Year',
          description: 'Exceptional campaigns for government and public sector organizations that served the public interest.'
        },
        {
          id: 'financial-services-campaign-year',
          name: 'Financial Services Campaign of the Year',
          description: 'Outstanding marketing campaigns in banking, insurance, fintech, and financial services.'
        }
      ]
    },
    {
      id: 'special-honors',
      name: 'Special Honors',
      description: 'Reserved for the highest level of recognition, these awards celebrate visionary leadership and overall excellence. These honors recognize the individuals and agencies that embody the best of Africa\'s independent creative ecosystem.',
      subcategories: [
        {
          id: 'agency-leader-year',
          name: 'Agency Leader of the Year',
          description: 'Visionary leaders who have driven exceptional growth, innovation, and industry impact.'
        },
        {
          id: 'grand-prix-agency-year',
          name: 'Grand Prix: Agency of the Year',
          description: 'The highest honor - recognizing the top overall agency demonstrating excellence across all areas.'
        }
      ]
    }
  ];

  const countries = [
    'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Egypt', 'Morocco', 
    'Tunisia', 'Algeria', 'Ethiopia', 'Uganda', 'Tanzania', 'Rwanda',
    'Senegal', 'Ivory Coast', 'Cameroon', 'Angola', 'Zambia', 'Zimbabwe',
    'Botswana', 'Namibia', 'Mauritius', 'Seychelles', 'Other'
  ];

  const experienceLevels = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '11-15 years',
    '16+ years'
  ];

  // Pricing configuration
  const pricing = {
    agency: {
      pricePerCategory: 200,
      currency: 'USD',
      description: 'Agency Application Fee per Category'
    },
    freelancer: {
      pricePerCategory: 30,
      currency: 'USD',
      description: 'Freelancer Application Fee per Category'
    }
  };

  // Calculate total price with multi-category discount
  const calculateTotalPrice = () => {
    const selectedPricing = pricing[formData.applicantType];
    const categoryCount = formData.selectedCategories.length;
    
    if (categoryCount === 0) return 0;
    
    const basePrice = selectedPricing.pricePerCategory * categoryCount;
    
    // Apply 25% discount for multiple categories
    if (categoryCount > 1) {
      return basePrice * 0.75; // 25% discount
    }
    
    return basePrice;
  };

  const getDiscountAmount = () => {
    const selectedPricing = pricing[formData.applicantType];
    const categoryCount = formData.selectedCategories.length;
    
    if (categoryCount <= 1) return 0;
    
    const basePrice = selectedPricing.pricePerCategory * categoryCount;
    return basePrice * 0.25; // 25% discount amount
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('socialMedia.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      projectImages: [...prev.projectImages, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    
    if (formData.applicantType === 'agency' && !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required for agencies';
    }
    
    if (!formData.website.trim()) newErrors.website = 'Website/Portfolio URL is required';
    if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
    if (formData.selectedCategories.length === 0) {
      newErrors.selectedCategories = 'Please select at least one award category';
    }
    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project title is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    if (!formData.whyApply.trim()) newErrors.whyApply = 'Please explain why you should win this award';
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    if (!formData.agreeToDataProcessing) newErrors.agreeToDataProcessing = 'You must agree to data processing';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaystackPayment = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    // Calculate total price
    const totalPrice = calculateTotalPrice();
    const selectedPricing = pricing[formData.applicantType];
    
    // Check if Paystack key is configured
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      toast.error('Payment system not configured. Please contact support.');
      setIsSubmitting(false);
      return;
    }

    // Generate a unique reference
    const reference = `PAAN_AWARDS_${formData.applicantType.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Paystack configuration
    const paystackConfig = {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: totalPrice * 100, // Convert to cents
      currency: selectedPricing.currency,
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Applicant Type",
            variable_name: "applicant_type",
            value: formData.applicantType
          },
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: formData.fullName
          },
          {
            display_name: "Company/Organization",
            variable_name: "company_name",
            value: formData.companyName || 'N/A'
          },
          {
            display_name: "Selected Categories",
            variable_name: "selected_categories",
            value: formData.selectedCategories.join(', ')
          },
          {
            display_name: "Project Title",
            variable_name: "project_title",
            value: formData.projectTitle
          },
          {
            display_name: "Country",
            variable_name: "country",
            value: formData.country
          }
        ]
      },
      callback: function(response) {
        if (response.status === 'success') {
          // Send application data to secretariat
          fetch('/api/send-awards-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentData: {
                reference: response.reference,
                amount: totalPrice * 100,
                currency: selectedPricing.currency,
                status: 'success',
                paidAt: new Date().toISOString()
              },
              applicationData: formData,
              reference: response.reference
            }),
          })
          .then(emailResponse => emailResponse.json())
          .then(emailResult => {
            if (emailResult.success) {
              console.log('Application email sent successfully');
            } else {
              console.error('Failed to send application email:', emailResult.message);
            }
          })
          .catch(emailError => {
            console.error('Error sending application email:', emailError);
            // Don't block the payment success flow if email fails
          });

          // Redirect to success page with reference
          window.location.href = `/payment/success?reference=${response.reference}&type=awards`;
        } else {
          toast.error('Payment failed. Please try again.');
          setIsSubmitting(false);
        }
      },
      onClose: function() {
        // Redirect to failure page
        window.location.href = `/payment/failure?error=${encodeURIComponent('Payment was cancelled by user')}&reference=${reference}`;
        setIsSubmitting(false);
      }
    };

    // Initialize Paystack
    if (window.PaystackPop) {
      try {
        const handler = window.PaystackPop.setup(paystackConfig);
        handler.openIframe();
      } catch (error) {
        console.error('Paystack initialization error:', error);
        toast.error('Payment system error. Please try again.');
        setIsSubmitting(false);
      }
    } else {
      console.error('Paystack not loaded. Attempting to reload...');
      toast.error('Payment system is loading. Please wait a moment and try again.');
      setIsSubmitting(false);
      
      // Try to reload the Paystack script
      setTimeout(() => {
        if (window.PaystackPop) {
          toast.success('Payment system is now ready. Please try again.');
          setPaystackReady(true);
        } else {
          toast.error('Payment system failed to load. Please refresh the page.');
          setPaystackReady(false);
        }
      }, 3000);
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  // Check if Paystack is ready
  useEffect(() => {
    const checkPaystack = () => {
      if (typeof window !== 'undefined' && window.PaystackPop) {
        console.log('Paystack is ready!');
        setPaystackReady(true);
      } else {
        console.log('Paystack not ready yet, checking again...');
        setPaystackReady(false);
        // Check again after a short delay
        setTimeout(checkPaystack, 1000);
      }
    };

    checkPaystack();
  }, []);

  if (!isOpen) return null;

  // All categories are now available to both agencies and freelancers
  const currentPricing = pricing[formData.applicantType];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <PaystackScript />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-paan-dark-blue text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">PAAN Awards Application</h2>
              <p className="text-white/80 mt-1">
                {formData.applicantType === 'agency' ? 'Agency Application' : 'Freelancer Application'} - ${currentPricing.pricePerCategory} USD per category
                {formData.selectedCategories.length > 1 && (
                  <span className="text-yellow-400 ml-2">(25% discount applied!)</span>
                )}
              </p>
              {!paystackReady && (
                <div className="flex items-center gap-2 mt-2">
                  <Icon icon="mdi:loading" className="w-4 h-4 animate-spin text-yellow-400" />
                  <span className="text-yellow-400 text-sm">Loading payment system...</span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Applicant Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              I am applying as:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, applicantType: 'agency' }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.applicantType === 'agency'
                    ? 'border-paan-red bg-paan-red/10 text-paan-red'
                    : 'border-gray-300 hover:border-paan-red/50'
                }`}
              >
                <div className="text-center">
                  <Icon icon="mdi:office-building" className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold">Agency</h3>
                  <p className="text-sm text-gray-600">$200 USD per category</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, applicantType: 'freelancer' }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.applicantType === 'freelancer'
                    ? 'border-paan-red bg-paan-red/10 text-paan-red'
                    : 'border-gray-300 hover:border-paan-red/50'
                }`}
              >
                <div className="text-center">
                  <Icon icon="mdi:account" className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold">Freelancer</h3>
                  <p className="text-sm text-gray-600">$30 USD per category</p>
                </div>
              </button>
            </div>
          </div>

          {/* Conversion Boosters */}
          {
             formData.applicantType === 'agency' && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Apply for PAAN Awards?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:trophy-variant" className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Pan African Recognition</h4>
                      <p className="text-sm text-gray-600">Opportunity for Pan African recognition of your work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:newspaper" className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Media Coverage</h4>
                      <p className="text-sm text-gray-600">Winning work will be featured on PAAN Publications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:glass-cocktail" className="w-6 h-6 text-pink-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Gala Awards Dinner</h4>
                      <p className="text-sm text-gray-600">Access to prestigious Gala Awards Dinner</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:handshake" className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dual Recognition</h4>
                      <p className="text-sm text-gray-600">Every win = 1 award for your agency + 1 award for your client</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:earth" className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Pan African Reach</h4>
                      <p className="text-sm text-gray-600">Entries coming from over 25+ African countries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:account-group" className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Premium Networking</h4>
                      <p className="text-sm text-gray-600">Network with leading brands in Africa</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
             )
          }
          

          <form className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.country ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.applicantType === 'agency' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your company name"
                    />
                    {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website/Portfolio URL *
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.website ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://your-website.com"
                  />
                  {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience *
                  </label>
                  <select
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.yearsExperience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.yearsExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsExperience}</p>}
                </div>
              </div>
            </div>

            {/* Award Categories */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Award Categories * (Choose all that apply)
              </h3>
              
              <div className="space-y-6">
                {awardCategories.map(categoryGroup => (
                  <div key={categoryGroup.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-paan-dark-blue mb-2">
                        {categoryGroup.name}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {categoryGroup.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryGroup.subcategories.map(subcategory => (
                        <div
                          key={subcategory.id}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.selectedCategories.includes(subcategory.id)
                              ? 'border-paan-red bg-paan-red/10'
                              : 'border-gray-300 hover:border-paan-red/50'
                          }`}
                          onClick={() => handleCategoryToggle(subcategory.id)}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={formData.selectedCategories.includes(subcategory.id)}
                              onChange={() => handleCategoryToggle(subcategory.id)}
                              className="mt-1"
                            />
                            <div>
                              <h5 className="font-medium text-gray-900 text-sm">{subcategory.name}</h5>
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{subcategory.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {errors.selectedCategories && <p className="text-red-500 text-xs mt-2">{errors.selectedCategories}</p>}
              
              {/* Important Award Information */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:trophy" className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Important Award Information</h4>
                    <p className="text-sm text-blue-800">
                      <strong>In every category, both the agency and client are honored with their own award as a mark of shared achievement.</strong>
                      This means when you win, both your organization and your client receive recognition, celebrating the collaborative success of your partnership.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project/Work Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.projectTitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your project title"
                  />
                  {errors.projectTitle && <p className="text-red-500 text-xs mt-1">{errors.projectTitle}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description *
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your project, its impact, and why it deserves recognition"
                  />
                  {errors.projectDescription && <p className="text-red-500 text-xs mt-1">{errors.projectDescription}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="projectUrl"
                    value={formData.projectUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
                    placeholder="https://your-project.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Images (Optional)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
                  />
                  {formData.projectImages.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {formData.projectImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Project ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why should you win this award? *
                  </label>
                  <textarea
                    name="whyApply"
                    value={formData.whyApply}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.whyApply ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us why you deserve to win this award..."
                  />
                  {errors.whyApply && <p className="text-red-500 text-xs mt-1">{errors.whyApply}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previous Awards/Recognition (Optional)
                  </label>
                  <textarea
                    name="previousAwards"
                    value={formData.previousAwards}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
                    placeholder="List any previous awards or recognition you've received"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="socialMedia.linkedin"
                      value={formData.socialMedia.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter Handle
                    </label>
                    <input
                      type="text"
                      name="socialMedia.twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
                      placeholder="@yourhandle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      name="socialMedia.instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
                      placeholder="@yourhandle"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the <a href="/paan-awards-terms" target="_blank" className="text-paan-red hover:underline">Terms and Conditions</a> and <a href="/paan-awards-terms" target="_blank" className="text-paan-red hover:underline">Award Guidelines</a> *
                  </label>
                </div>
                {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToDataProcessing"
                    checked={formData.agreeToDataProcessing}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <label className="text-sm text-gray-700">
                    I consent to the processing of my personal data for the purpose of this award application *
                  </label>
                </div>
                {errors.agreeToDataProcessing && <p className="text-red-500 text-xs">{errors.agreeToDataProcessing}</p>}
              </div>
            </div>

            {/* reCAPTCHA */}
            {recaptchaSiteKey && (
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={handleRecaptchaChange}
                />
              </div>
            )}            

            {/* Payment Summary */}
            <div className="bg-paan-dark-blue text-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/80">
                      {formData.applicantType === 'agency' ? 'Agency Application Fee' : 'Freelancer Application Fee'}
                    </p>
                    <p className="text-sm text-white/60">
                      {formData.selectedCategories.length} category(ies) × ${currentPricing.pricePerCategory} USD
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${currentPricing.pricePerCategory * formData.selectedCategories.length} USD</p>
                  </div>
                </div>
                
                {formData.selectedCategories.length > 1 && (
                  <div className="flex justify-between items-center border-t border-white/20 pt-3">
                    <div>
                      <p className="text-yellow-400 font-medium">Multi-Category Discount (25%)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-semibold">-${getDiscountAmount()} USD</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center border-t border-white/20 pt-3">
                  <div>
                    <p className="text-white font-medium">Total Amount</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${calculateTotalPrice()} USD</p>
                    <p className="text-sm text-white/60">One-time payment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePaystackPayment}
                disabled={isSubmitting || !paystackReady}
                className="flex-1 bg-paan-red text-white px-6 py-3 rounded-xl hover:bg-paan-red/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
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
                    Pay ${calculateTotalPrice()} USD
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PAANAwardsApplicationModal;
