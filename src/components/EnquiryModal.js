import { useState, useRef } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
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
    if (!formData.region) newErrors.region = 'Please select a region';
    if (!formData.message.trim()) newErrors.message = 'Project details are required';
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
      const response = await fetch('/api/send-enquiry', {
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
        toast.success('Enquiry sent successfully!', { id: toastId });
        // Google Ads conversion tracking
        if (typeof window !== 'undefined' && typeof gtag_report_conversion === 'function') {
          gtag_report_conversion();
        }
        // Reset form and reCAPTCHA
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          region: '',
        });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
        onClose();
      } else {
        toast.error(data.message || 'Failed to send enquiry.', { id: toastId });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative overflow-hidden shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#172840] hover:text-[#F25849] transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-[#172840] mb-2">Find Your Delivery Partner</h2>
            <p className="text-gray-600">Tell us about your project and we'll connect you with the right partners</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.name ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                  className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.email ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                  className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.company ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-[#172840] mb-1">
                  Target Region(s) <span className="text-[#F25849]">*</span>
                </label>
                <select
                  id="region"
                  name="region"
                  required
                  value={formData.region}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
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
                {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#172840] mb-1">
                Project Details <span className="text-[#F25849]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows="4"
                className={`w-full px-4 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 resize-none ${
                  errors.message ? 'border-red-500' : ''
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Tell us about your project, goals, and requirements..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* reCAPTCHA */}
            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                onChange={handleRecaptchaChange}
              />
              {errors.recaptcha && (
                <p className="text-red-500 text-sm mt-1">{errors.recaptcha}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#F25849] text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] hover:shadow-lg font-medium text-sm ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal; 