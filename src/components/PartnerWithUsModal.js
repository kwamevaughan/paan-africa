"use client";

import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const PartnerWithUsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    partnershipType: '',
    message: '',
    region: '',
    website: ''
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

  const partnershipTypes = [
    'Sponsorship',
    'Media Partner',
    'Venue Partner',
    'Technology Partner',
    'Content Partner',
    'Exhibition Partner',
    'Networking Partner',
    'Other'
  ];

  const regions = [
    'West Africa',
    'East Africa',
    'South Africa',
    'North Africa',
    'Central Africa',
    'Multiple Regions',
    'Global'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.partnershipType) newErrors.partnershipType = 'Please select a partnership type';
    if (!formData.region) newErrors.region = 'Please select a region';
    if (!formData.message.trim()) newErrors.message = 'Partnership details are required';
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
    const toastId = toast.loading('Sending your partnership enquiry...');

    try {
      const response = await fetch('/api/send-partner-enquiry', {
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
        toast.success('Partnership enquiry sent successfully!', { id: toastId });
        // Google Ads conversion tracking
        if (typeof window !== 'undefined' && typeof gtag_report_conversion === 'function') {
          gtag_report_conversion();
        }
        // Reset form and reCAPTCHA
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          partnershipType: '',
          message: '',
          region: '',
          website: ''
        });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
        onClose();
      } else {
        toast.error(data.message || 'Failed to send partnership enquiry.', { id: toastId });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto mx-auto my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-paan-dark-blue">Partner With Us</h2>
              <p className="text-gray-600 mt-1">Join Africa's premier creative summit as a partner</p>
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-paan-dark-blue mb-1">
                  Full Name <span className="text-paan-red">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-paan-dark-blue mb-1">
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-paan-dark-blue mb-1">
                  Company/Organization <span className="text-paan-red">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                    errors.company ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="Enter your company name"
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-paan-dark-blue mb-1">
                  Phone Number <span className="text-paan-red">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                    errors.phone ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Partnership Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="partnershipType" className="block text-sm font-medium text-paan-dark-blue mb-1">
                  Partnership Type <span className="text-paan-red">*</span>
                </label>
                <select
                  id="partnershipType"
                  name="partnershipType"
                  required
                  value={formData.partnershipType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                    errors.partnershipType ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <option value="">Select partnership type</option>
                  {partnershipTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.partnershipType && <p className="text-red-500 text-sm mt-1">{errors.partnershipType}</p>}
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-paan-dark-blue mb-1">
                  Target Region <span className="text-paan-red">*</span>
                </label>
                <select
                  id="region"
                  name="region"
                  required
                  value={formData.region}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                    errors.region ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <option value="">Select target region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
              </div>
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-paan-dark-blue mb-1">
                Website (Optional)
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                  isSubmitting ? 'opacity-50' : ''
                }`}
                placeholder="https://yourcompany.com"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-paan-dark-blue mb-1">
                Partnership Proposal <span className="text-paan-red">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows="4"
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none ${
                  errors.message ? 'border-red-500' : ''
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Tell us about your partnership proposal, what you can offer, and how you'd like to collaborate..."
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
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

            {/* Partnership Benefits Info */}
            <div className="bg-gradient-to-r from-paan-blue/10 to-paan-red/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-paan-dark-blue mb-3">Partnership Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-paan-dark-blue">
                <div className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-paan-red mt-0.5 flex-shrink-0" width="16" height="16" />
                  <span>Brand visibility across all marketing materials</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-paan-red mt-0.5 flex-shrink-0" width="16" height="16" />
                  <span>Access to exclusive networking events</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-paan-red mt-0.5 flex-shrink-0" width="16" height="16" />
                  <span>Speaking opportunities at the summit</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-paan-red mt-0.5 flex-shrink-0" width="16" height="16" />
                  <span>Direct access to 300+ industry leaders</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-paan-red text-white px-6 py-3 rounded-xl hover:bg-paan-red/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:handshake" className="w-5 h-5" />
                    Submit Partnership Proposal
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerWithUsModal;
