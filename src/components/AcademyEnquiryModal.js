import { useState, useRef } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const AcademyEnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    trainingNeeds: '',
    message: '',
    region: '',
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
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.teamSize) newErrors.teamSize = 'Please select team size';
    if (!formData.trainingNeeds) newErrors.trainingNeeds = 'Please select training needs';
    if (!formData.region) newErrors.region = 'Please select a region';
    if (!formData.message.trim()) newErrors.message = 'Training requirements are required';
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
    const toastId = toast.loading('Sending your enquiry...');

    try {
      const response = await fetch('/api/send-academy-enquiry', {
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
        toast.success('Enquiry sent successfully! We will get back to you soon.', { id: toastId });
        // Google Ads conversion tracking
        if (typeof window !== 'undefined' && typeof gtag_report_conversion === 'function') {
          gtag_report_conversion();
        }
        // Reset form and reCAPTCHA
        setFormData({
          name: '',
          email: '',
          company: '',
          role: '',
          teamSize: '',
          trainingNeeds: '',
          message: '',
          region: '',
        });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
        onClose();
      } else {
        toast.error(data.message || 'Failed to send academy enquiry.', { id: toastId });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#172840] hover:text-[#F25849] transition-colors duration-300 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Image
                src="/assets/images/paan-academy/dark-logo.svg"
                width={100}
                height={100}
                alt="PAAN Academy"
                className="mr-2 sm:mr-3 sm:w-[100px] sm:h-[100px]"
              />
            </div>
            <p className="text-gray-600 text-sm sm:text-base px-2 sm:px-0">Tell us about your training needs and we'll help you get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#172840] mb-1">
                  Full Name <span className="text-[#F25849]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
                    errors.name ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#172840] mb-1">
                  Email Address <span className="text-[#F25849]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
                    errors.email ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#172840] mb-1">
                  Company Name <span className="text-[#F25849]">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
                    errors.company ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.company && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-[#172840] mb-1">
                  Your Role <span className="text-[#F25849]">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="e.g., Marketing Manager, Creative Director"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
                    errors.role ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.role && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.role}</p>}
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-[#172840] mb-1">
                  Team Size <span className="text-[#F25849]">*</span>
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  required
                  value={formData.teamSize}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
                    errors.teamSize ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <option value="">Select team size</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-15">6-15 people</option>
                  <option value="16-50">16-50 people</option>
                  <option value="51-100">51-100 people</option>
                  <option value="100+">100+ people</option>
                </select>
                {errors.teamSize && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.teamSize}</p>}
              </div>

              <div>
                <label htmlFor="trainingNeeds" className="block text-sm font-medium text-[#172840] mb-1">
                  Training Needs <span className="text-[#F25849]">*</span>
                </label>
                <select
                  id="trainingNeeds"
                  name="trainingNeeds"
                  required
                  value={formData.trainingNeeds}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
                    errors.trainingNeeds ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <option value="">Select training needs</option>
                  <option value="creative-strategy">Creative Strategy</option>
                  <option value="campaign-development">Campaign Development</option>
                  <option value="media-planning">Media Planning & Buying</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="brand-strategy">Brand Strategy</option>
                  <option value="account-management">Account Management</option>
                  <option value="pitching">Pitching & Presentation</option>
                  <option value="leadership">Leadership & Management</option>
                  <option value="custom">Custom Training Program</option>
                </select>
                {errors.trainingNeeds && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.trainingNeeds}</p>}
              </div>

              <div className="lg:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium text-[#172840] mb-1">
                  Region <span className="text-[#F25849]">*</span>
                </label>
                <select
                  id="region"
                  name="region"
                  required
                  value={formData.region}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
                    errors.region ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <option value="">Select a region</option>
                  <option value="west-africa">West Africa</option>
                  <option value="east-africa">East Africa</option>
                  <option value="south-africa">South Africa</option>
                  <option value="north-africa">North Africa</option>
                  <option value="central-africa">Central Africa</option>
                  <option value="multiple">Multiple Regions</option>
                </select>
                {errors.region && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.region}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#172840] mb-1">
                Training Requirements <span className="text-[#F25849]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows="4"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 resize-none text-sm sm:text-base ${
                  errors.message ? 'border-red-500' : ''
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Tell us about your specific training needs, challenges, and goals..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <div className="transform scale-75 sm:scale-90 lg:scale-100">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={handleRecaptchaChange}
                />
              </div>
              {errors.recaptcha && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 text-center w-full">{errors.recaptcha}</p>
              )}
            </div>

            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#F25849] text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] hover:shadow-lg font-medium text-sm sm:text-base w-full sm:w-auto ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Submit Academy Enquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcademyEnquiryModal; 