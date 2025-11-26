"use client";

import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';

const CategoryNominationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    country: '',
    
    // Professional Information
    applicantType: 'agency', // 'agency', 'freelancer', 'client', 'other'
    companyName: '',
    website: '',
    yearsExperience: '',
    
    // Nomination Information
    categoryName: '',
    categoryDescription: '',
    categoryRationale: '',
    targetAudience: '',
    similarCategories: '',
    
    // Additional Information
    whyImportant: '',
    expectedImpact: '',
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
  const recaptchaRef = useRef(null);

  // Check if reCAPTCHA site key is available
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaSiteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local"
    );
  }

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

  const applicantTypes = [
    { value: 'agency', label: 'Agency/Studio' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'client', label: 'Client/Brand' },
    { value: 'academic', label: 'Academic/Researcher' },
    { value: 'other', label: 'Other' }
  ];

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

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
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
    
    // Nomination specific validation
    if (!formData.categoryName.trim()) newErrors.categoryName = 'Category name is required';
    if (!formData.categoryDescription.trim()) newErrors.categoryDescription = 'Category description is required';
    if (!formData.categoryRationale.trim()) newErrors.categoryRationale = 'Rationale for this category is required';
    if (!formData.targetAudience.trim()) newErrors.targetAudience = 'Target audience is required';
    if (!formData.whyImportant.trim()) newErrors.whyImportant = 'Please explain why this category is important';
    if (!formData.expectedImpact.trim()) newErrors.expectedImpact = 'Expected impact is required';
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    if (!formData.agreeToDataProcessing) newErrors.agreeToDataProcessing = 'You must agree to data processing';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-category-nomination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Category nomination submitted successfully!');
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: '',
          applicantType: 'agency',
          companyName: '',
          website: '',
          yearsExperience: '',
          categoryName: '',
          categoryDescription: '',
          categoryRationale: '',
          targetAudience: '',
          similarCategories: '',
          whyImportant: '',
          expectedImpact: '',
          socialMedia: {
            linkedin: '',
            twitter: '',
            instagram: ''
          },
          agreeToTerms: false,
          agreeToDataProcessing: false
        });
        setRecaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        toast.error(result.message || 'Failed to submit nomination');
      }
    } catch (error) {
      console.error('Error submitting nomination:', error);
      toast.error('An error occurred while submitting your nomination');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              <h2 className="text-2xl font-bold">Nominate a New Category</h2>
              <p className="text-white/80 mt-1">Help shape the future of PAAN Awards</p>
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
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
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
                    Email Address <span className="text-red-500">*</span>
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
                    Phone Number <span className="text-red-500">*</span>
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
                    Country <span className="text-red-500">*</span>
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a: <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {applicantTypes.map(type => (
                      <label key={type.value} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="applicantType"
                          value={type.value}
                          checked={formData.applicantType === type.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-paan-red border-gray-300 focus:ring-paan-red"
                        />
                        <span className="text-sm text-gray-700">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.applicantType === 'agency' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
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
                    Website/Portfolio URL <span className="text-red-500">*</span>
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
                    Years of Experience <span className="text-red-500">*</span>
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

            {/* Category Nomination Information */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Nomination Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proposed Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.categoryName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., The Digital Innovation Excellence Award"
                  />
                  {errors.categoryName && <p className="text-red-500 text-xs mt-1">{errors.categoryName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="categoryDescription"
                    value={formData.categoryDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.categoryDescription ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe what this category would recognize and celebrate..."
                  />
                  {errors.categoryDescription && <p className="text-red-500 text-xs mt-1">{errors.categoryDescription}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rationale for This Category <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="categoryRationale"
                    value={formData.categoryRationale}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.categoryRationale ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Explain why this category is needed and how it fits into the African creative landscape..."
                  />
                  {errors.categoryRationale && <p className="text-red-500 text-xs mt-1">{errors.categoryRationale}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.targetAudience ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Agencies, Freelancers, Brands, Tech Companies, etc."
                  />
                  {errors.targetAudience && <p className="text-red-500 text-xs mt-1">{errors.targetAudience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Similar Existing Categories (if any)
                  </label>
                  <input
                    type="text"
                    name="similarCategories"
                    value={formData.similarCategories}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
                    placeholder="List any existing categories that might be similar and explain how yours differs..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why is this category important? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="whyImportant"
                    value={formData.whyImportant}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.whyImportant ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Explain the significance and importance of recognizing this type of work..."
                  />
                  {errors.whyImportant && <p className="text-red-500 text-xs mt-1">{errors.whyImportant}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Impact <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="expectedImpact"
                    value={formData.expectedImpact}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                      errors.expectedImpact ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe the positive impact this category would have on the African creative industry..."
                  />
                  {errors.expectedImpact && <p className="text-red-500 text-xs mt-1">{errors.expectedImpact}</p>}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media (Optional)</h3>
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

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-paan-red border-gray-300 rounded focus:ring-paan-red"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the <a href="/paan-awards-terms" target="_blank" className="text-paan-red hover:underline">Terms and Conditions</a> and understand that my nomination will be reviewed by the PAAN Awards committee.
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToDataProcessing"
                    checked={formData.agreeToDataProcessing}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-paan-red border-gray-300 rounded focus:ring-paan-red"
                  />
                  <span className="text-sm text-gray-700">
                    I consent to the processing of my personal data for the purpose of this category nomination and understand that my information may be used to contact me regarding the nomination.
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.agreeToDataProcessing && <p className="text-red-500 text-xs mt-1">{errors.agreeToDataProcessing}</p>}
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
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-paan-red text-white px-6 py-3 rounded-xl hover:bg-paan-red/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:send" className="w-5 h-5" />
                    Submit Nomination
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

export default CategoryNominationModal;
