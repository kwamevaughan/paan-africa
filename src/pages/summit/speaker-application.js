import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Header from '@/layouts/speaker-application-header';
import Footer from '@/layouts/footer';
import Image from 'next/image';

// Animation variants - defined outside component for global access
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
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

const SpeakerApplicationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    country: '',
    bio: '',
    sessionTitle: '',
    sessionType: '',
    summitTracks: [],
    sessionDescription: '',
    keyTakeaways: '',
    whyThisMatters: '',
    targetAudience: [],
    pastTalks: '',
    specialRequirements: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Check if reCAPTCHA site key is available
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaSiteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local"
    );
  }

  const sessionTypes = [
    'Keynote (15–20 mins)',
    'Panel Discussion',
    'Workshop/Clinic (interactive, hands-on)',
    'Fireside Chat',
    'Tech Demo/Case Study'
  ];

  const summitTracks = [
    'IP, Capital & Content Exports',
    'Payments, Market Entry & Nomad Work',
    'AI, Data & Discovery',
    'Hubs, Talent & Cross-Border Operations',
    'Leadership & Talent Futures in the creative sector',
    'Agency Growth & Client Partnerships'
  ];

  const targetAudienceOptions = [
    'Creators & Freelancers',
    'Agencies & Studios',
    'Tech Platforms',
    'Investors & Accelerators',
    'Policy & Enablers (AfCFTA, DFIs, etc.)'
  ];

  const countries = [
    'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Egypt', 'Morocco', 
    'Tunisia', 'Algeria', 'Ethiopia', 'Uganda', 'Tanzania', 'Rwanda',
    'Senegal', 'Ivory Coast', 'Cameroon', 'Angola', 'Zambia', 'Zimbabwe',
    'Botswana', 'Namibia', 'Mauritius', 'Seychelles', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'summitTracks' || name === 'targetAudience') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setErrors(prev => ({
      ...prev,
      recaptcha: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.trim().split(' ').length < 30) {
      newErrors.bio = 'Bio must be at least 150 words';
    } else if (formData.bio.trim().split(' ').length > 200) {
      newErrors.bio = 'Bio must not exceed 200 words';
    }
    if (!formData.sessionTitle.trim()) newErrors.sessionTitle = 'Session title is required';
    if (!formData.sessionType) newErrors.sessionType = 'Session type is required';
    if (formData.summitTracks.length === 0) newErrors.summitTracks = 'Please select at least one summit track';
    if (!formData.sessionDescription.trim()) {
      newErrors.sessionDescription = 'Session description is required';
    } else if (formData.sessionDescription.trim().split(' ').length < 20) {
      newErrors.sessionDescription = 'Session description must be at least 100 words';
    } else if (formData.sessionDescription.trim().split(' ').length > 150) {
      newErrors.sessionDescription = 'Session description must not exceed 150 words';
    }
    if (!formData.keyTakeaways.trim()) newErrors.keyTakeaways = 'Key takeaways are required';
    if (!formData.whyThisMatters.trim()) newErrors.whyThisMatters = 'Why this session matters is required';
    if (formData.targetAudience.length === 0) newErrors.targetAudience = 'Please select at least one target audience';
    if (!formData.consent) newErrors.consent = 'You must agree to the terms';
    if (!recaptchaToken) newErrors.recaptcha = 'Please complete the reCAPTCHA';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Submitting your speaker application...');

    try {
      const response = await fetch('/api/send-speaker-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Speaker application submitted successfully!', { id: toastId });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          organization: '',
          jobTitle: '',
          country: '',
          bio: '',
          sessionTitle: '',
          sessionType: '',
          summitTracks: [],
          sessionDescription: '',
          keyTakeaways: '',
          whyThisMatters: '',
          targetAudience: [],
          pastTalks: '',
          specialRequirements: '',
          consent: false
        });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
      } else {
        toast.error(data.message || 'Failed to submit speaker application.', { id: toastId });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Speaker Application - PAAN Summit 2026 | Africa's Premier Creative & Tech Leadership Conference"
        description="Apply to speak at the Africa Borderless Creative Economy Summit 2026. Share your insights and help advance Africa's creative and digital economies."
        keywords="PAAN Summit 2026, speaker application, African creative summit, tech conference Africa, speaking opportunities"
      />
      
      <Header navLinkColor='text-paan-dark-blue' />
      
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Hero />
        
        {/* Spacer to maintain layout flow */}
        <div className="h-screen"></div>

        {/* Form Description */}
        <div className="bg-white py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                We're excited that you're interested in speaking at the Africa Borderless Creative Economy Summit 2026, 
                hosted by the Pan-African Agency Network (PAAN).
              </p>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                The Summit is a deal-first platform where creators, agencies, tech leaders, and investors come together 
                to make Africa's creative economy more connected, commercial, and competitive.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                We're looking for speakers who bring bold insights, practical strategies, and live lessons that can help 
                agencies, creators, and platforms create, connect, and commercialize at scale.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Please complete this form with as much detail as possible. Selected speakers will be contacted by the 
                PAAN team for the next steps.
              </p>
            </div>
          </div>
        </div>

        {/* Speaker Requirements */}
        <div id="requirements" className="bg-white py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-paan-dark-blue mb-3 sm:mb-4">Speaker Requirements</h2>
              <p className="text-base sm:text-lg text-gray-600">What we're looking for in our speakers</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-gradient-to-br from-paan-blue/10 to-paan-red/10 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="bg-paan-red rounded-full p-2 flex-shrink-0">
                    <Icon icon="mdi:lightbulb" className="text-white" width="20" height="20" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue">Bold Insights</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">Share innovative perspectives and cutting-edge ideas that challenge conventional thinking in Africa's creative economy.</p>
              </div>
              
              <div className="bg-gradient-to-br from-paan-red/10 to-paan-yellow/10 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="bg-paan-blue rounded-full p-2 flex-shrink-0">
                    <Icon icon="mdi:tools" className="text-white" width="20" height="20" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue">Practical Strategies</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">Provide actionable frameworks and real-world solutions that attendees can implement immediately in their work.</p>
              </div>
              
              <div className="bg-gradient-to-br from-paan-yellow/10 to-paan-blue/10 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="bg-paan-dark-blue rounded-full p-2 flex-shrink-0">
                    <Icon icon="mdi:school" className="text-white" width="20" height="20" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue">Live Lessons</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">Share experiences, case studies, and lessons learned from building and scaling creative businesses across Africa.</p>
              </div>
              
              <div className="bg-gradient-to-br from-paan-blue/10 to-paan-dark-blue/10 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="bg-paan-red rounded-full p-2 flex-shrink-0">
                    <Icon icon="mdi:target" className="text-white" width="20" height="20" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue">Relevant Expertise</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">Demonstrate deep knowledge and experience in areas that directly impact Africa's creative and digital economies.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Speaker Benefits */}
        <div id="benefits" className="bg-gray-50 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-paan-dark-blue mb-3 sm:mb-4">Speaker Benefits</h2>
              <p className="text-base sm:text-lg text-gray-600">What you'll gain as a PAAN Summit speaker</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
                <div className="bg-paan-red rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon icon="mdi:microphone" className="text-white" width="24" height="24" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-2 sm:mb-3">Platform & Visibility</h3>
                <p className="text-gray-600 text-sm sm:text-base">Reach 300+ industry leaders and 1,000+ virtual attendees with your message and expertise.</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
                <div className="bg-paan-blue rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon icon="mdi:handshake" className="text-white" width="24" height="24" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-2 sm:mb-3">Networking Opportunities</h3>
                <p className="text-gray-600 text-sm sm:text-base">Connect with investors, agencies, creators, and policymakers during exclusive networking sessions.</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center sm:col-span-2 lg:col-span-1">
                <div className="bg-paan-yellow rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon icon="mdi:certificate" className="text-white" width="24" height="24" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue mb-2 sm:mb-3">Thought Leadership</h3>
                <p className="text-gray-600 text-sm sm:text-base">Establish yourself as a key voice in Africa's creative economy and gain recognition in the industry.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="form" className="bg-gray-50 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Personal Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-paan-dark-blue border-b border-gray-200 pb-2">
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-paan-dark-blue mb-2">
                        Full Name <span className="text-paan-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors text-sm sm:text-base ${
                          errors.fullName ? 'border-red-500' : ''
                        } ${isSubmitting ? 'opacity-50' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-paan-dark-blue mb-2">
                        Email Address <span className="text-paan-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors text-sm sm:text-base ${
                          errors.email ? 'border-red-500' : ''
                        } ${isSubmitting ? 'opacity-50' : ''}`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-paan-dark-blue mb-2">
                        Phone Number (with country code) <span className="text-paan-red">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors text-sm sm:text-base ${
                          errors.phone ? 'border-red-500' : ''
                        } ${isSubmitting ? 'opacity-50' : ''}`}
                        placeholder="e.g., +234 123 456 7890"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-paan-dark-blue mb-2">
                        Organization/Company <span className="text-paan-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors text-sm sm:text-base ${
                          errors.organization ? 'border-red-500' : ''
                        } ${isSubmitting ? 'opacity-50' : ''}`}
                        placeholder="Enter your organization"
                      />
                      {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                    </div>

                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-paan-dark-blue mb-2">
                        Job Title/Role <span className="text-paan-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        required
                        value={formData.jobTitle}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors text-sm sm:text-base ${
                          errors.jobTitle ? 'border-red-500' : ''
                        } ${isSubmitting ? 'opacity-50' : ''}`}
                        placeholder="Enter your job title"
                      />
                      {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-paan-dark-blue mb-2">
                        Country of Residence <span className="text-paan-red">*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors text-sm sm:text-base ${
                          errors.country ? 'border-red-500' : ''
                        } ${isSubmitting ? 'opacity-50' : ''}`}
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Your Bio (150–200 words) <span className="text-paan-red">*</span>
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      required
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows="6"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none text-sm sm:text-base ${
                        errors.bio ? 'border-red-500' : ''
                      } ${isSubmitting ? 'opacity-50' : ''}`}
                      placeholder="Tell us about your background, experience, and expertise (150-200 words)"
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                      <p className="text-sm text-gray-500 ml-auto">
                        {formData.bio.trim().split(' ').length} words
                      </p>
                    </div>
                  </div>
                </div>

                {/* Session Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-paan-dark-blue border-b border-gray-200 pb-2">
                    Session Information
                  </h2>

                  <div>
                    <label htmlFor="sessionTitle" className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Proposed Session Title <span className="text-paan-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="sessionTitle"
                      name="sessionTitle"
                      required
                      value={formData.sessionTitle}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                        errors.sessionTitle ? 'border-red-500' : ''
                      } ${isSubmitting ? 'opacity-50' : ''}`}
                      placeholder="Enter your proposed session title"
                    />
                    {errors.sessionTitle && <p className="text-red-500 text-sm mt-1">{errors.sessionTitle}</p>}
                  </div>

                  <div>
                    <label htmlFor="sessionType" className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Session Type <span className="text-paan-red">*</span>
                    </label>
                    <select
                      id="sessionType"
                      name="sessionType"
                      required
                      value={formData.sessionType}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                        errors.sessionType ? 'border-red-500' : ''
                      } ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                      <option value="">Select session type</option>
                      {sessionTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.sessionType && <p className="text-red-500 text-sm mt-1">{errors.sessionType}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Which Summit Track Does Your Topic Fit Best? <span className="text-paan-red">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {summitTracks.map((track) => (
                        <label key={track} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="summitTracks"
                            value={track}
                            checked={formData.summitTracks.includes(track)}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-4 h-4 text-paan-blue border-gray-300 rounded focus:ring-paan-blue"
                          />
                          <span className="text-sm text-gray-700">{track}</span>
                        </label>
                      ))}
                    </div>
                    {errors.summitTracks && <p className="text-red-500 text-sm mt-1">{errors.summitTracks}</p>}
                  </div>

                  <div>
                    <label htmlFor="sessionDescription" className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Proposed Session Description (100–150 words) <span className="text-paan-red">*</span>
                    </label>
                    <textarea
                      id="sessionDescription"
                      name="sessionDescription"
                      required
                      value={formData.sessionDescription}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows="4"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none text-sm sm:text-base ${
                        errors.sessionDescription ? 'border-red-500' : ''
                      } ${isSubmitting ? 'opacity-50' : ''}`}
                      placeholder="What's the core idea? What will attendees take away? (100-150 words)"
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.sessionDescription && <p className="text-red-500 text-sm">{errors.sessionDescription}</p>}
                      <p className="text-sm text-gray-500 ml-auto">
                        {formData.sessionDescription.trim().split(' ').length} words
                      </p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="keyTakeaways" className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Key Takeaways (3–5 bullet points) <span className="text-paan-red">*</span>
                    </label>
                    <textarea
                      id="keyTakeaways"
                      name="keyTakeaways"
                      required
                      value={formData.keyTakeaways}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows="4"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none text-sm sm:text-base ${
                        errors.keyTakeaways ? 'border-red-500' : ''
                      } ${isSubmitting ? 'opacity-50' : ''}`}
                      placeholder="• Key takeaway 1&#10;• Key takeaway 2&#10;• Key takeaway 3&#10;• Key takeaway 4&#10;• Key takeaway 5"
                    />
                    {errors.keyTakeaways && <p className="text-red-500 text-sm mt-1">{errors.keyTakeaways}</p>}
                  </div>

                  <div>
                    <label htmlFor="whyThisMatters" className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Why This Session Matters <span className="text-paan-red">*</span>
                    </label>
                    <textarea
                      id="whyThisMatters"
                      name="whyThisMatters"
                      required
                      value={formData.whyThisMatters}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows="4"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none text-sm sm:text-base ${
                        errors.whyThisMatters ? 'border-red-500' : ''
                      } ${isSubmitting ? 'opacity-50' : ''}`}
                      placeholder="How does your session help advance Africa's creative/digital economies?"
                    />
                    {errors.whyThisMatters && <p className="text-red-500 text-sm mt-1">{errors.whyThisMatters}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Target Audience for Your Session <span className="text-paan-red">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {targetAudienceOptions.map((audience) => (
                        <label key={audience} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="targetAudience"
                            value={audience}
                            checked={formData.targetAudience.includes(audience)}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-4 h-4 text-paan-blue border-gray-300 rounded focus:ring-paan-blue"
                          />
                          <span className="text-sm text-gray-700">{audience}</span>
                        </label>
                      ))}
                    </div>
                    {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-paan-dark-blue border-b border-gray-200 pb-2">
                    Additional Information
                  </h2>

                  <div>
                    <label htmlFor="pastTalks" className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Links to Past Talks, Panels, or Content (if available)
                    </label>
                    <input
                      type="url"
                      id="pastTalks"
                      name="pastTalks"
                      value={formData.pastTalks}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                        isSubmitting ? 'opacity-50' : ''
                      }`}
                      placeholder="https://example.com/past-talk"
                    />
                  </div>

                  <div>
                    <label htmlFor="specialRequirements" className="block text-sm font-medium text-paan-dark-blue mb-2">
                      Any Special Requirements?
                    </label>
                    <textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows="3"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none text-sm sm:text-base ${
                        isSubmitting ? 'opacity-50' : ''
                      }`}
                      placeholder="Tech, accessibility, materials, co-speakers, etc."
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-4 h-4 text-paan-blue border-gray-300 rounded focus:ring-paan-blue mt-1 ${
                        isSubmitting ? 'opacity-50' : ''
                      }`}
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700">
                      <span className="text-paan-red">*</span> I confirm the information provided is accurate, and I agree to be contacted by PAAN regarding my application.
                    </label>
                  </div>
                  {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={recaptchaSiteKey}
                    onChange={handleRecaptchaChange}
                  />
                </div>
                {errors.recaptcha && (
                  <p className="text-red-500 text-sm text-center">{errors.recaptcha}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto bg-paan-red text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl hover:bg-paan-red/90 transition-all duration-300 font-medium text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon icon="mdi:loading" className="w-6 h-6 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:microphone" className="w-6 h-6" />
                        Submit Speaker Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-paan-dark-blue py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Questions About Speaking?</h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              Have questions about the speaker application process or need more information?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="mailto:secretariat@paan.africa"
                className="bg-paan-red text-white px-6 sm:px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Icon icon="mdi:email" className="w-4 h-4 sm:w-5 sm:h-5" />
                secretariat@paan.africa
              </a>
              <a 
                href="/summit"
                className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Icon icon="mdi:arrow-left" className="w-4 h-4 sm:w-5 sm:h-5" />
                Back to Summit
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

const Hero = () => {
  return (
    <>
      <div
        className="absolute top-0 left-0 h-screen w-full" 
        id="home"
      >
        {/* Full background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932')",
            filter: "brightness(0.5)" // Darkening the image
          }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-end pb-16 sm:pb-24 md:pb-48">
          <div className="mx-auto max-w-6xl w-full px-4">
            <motion.div 
              className="max-w-2xl"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.p 
                className="bg-white/20 text-white px-3 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 w-fit border border-white"
                variants={fadeInUp}
              >
                PAAN Summit 2026 – Speaker Application
              </motion.p>
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase text-yellow-400 mb-6 sm:mb-8 leading-tight"
                variants={fadeInUp}
              >
                Share Your Voice. Shape the Future.
              </motion.h1>
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-10"
                variants={fadeInUp}
              >
                <SpeakerLocationAndDate />
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8"
                variants={scaleIn}
              >
                <button 
                  onClick={() => {
                    const element = document.getElementById('form');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-paan-red text-white px-6 sm:px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Apply to Speak
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('requirements');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  View Requirements
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('benefits');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Speaker Benefits
                </button>                
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const SpeakerLocationAndDate = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:map-marker" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="break-words sm:whitespace-nowrap">Sarit Centre, Nairobi, Kenya - <strong>23–24 April 2026</strong></span>
      </div>
      
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:microphone" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="whitespace-nowrap">30+ Industry Leaders</span>
      </div>
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:users" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="whitespace-nowrap">500+ Attendees</span>
      </div>
    </div>
  );
};

export default SpeakerApplicationPage;
