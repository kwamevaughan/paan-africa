import { useState, useRef } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const MaConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    agencySize: '',
    interest: '',
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
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.agencySize) newErrors.agencySize = 'Please select your agency size';
    if (!formData.interest) newErrors.interest = 'Please select your primary interest';
    if (!formData.region) newErrors.region = 'Please select a region';
    if (!formData.message.trim()) newErrors.message = 'Please tell us about your goals';
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
    const toastId = toast.loading('Sending your consultation request...');

    try {
      const response = await fetch('/api/send-ma-consultation', {
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
        toast.success('Consultation request sent successfully! We\'ll be in touch soon.', { id: toastId });
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
          agencySize: '',
          interest: '',
          message: '',
          region: '',
        });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
        onClose();
      } else {
        toast.error(data.message || 'Failed to send consultation request.', { id: toastId });
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
      <div className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl relative overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-[#172840] hover:text-[#F25849] transition-colors duration-300 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#172840] mb-2">Book Your Confidential Consultation</h2>
            <p className="text-sm sm:text-base text-gray-600">Tell us about your agency and M&A goals for a personalized consultation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-[#172840] mb-1">
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
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.name ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-[#172840] mb-1">
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
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.email ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-[#172840] mb-1">
                  Agency Name <span className="text-[#F25849]">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.company ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.company && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-[#172840] mb-1">
                  Phone Number <span className="text-[#F25849]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.phone ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                />
                {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="agencySize" className="block text-xs sm:text-sm font-medium text-[#172840] mb-1">
                  Agency Size <span className="text-[#F25849]">*</span>
                </label>
                <select
                  id="agencySize"
                  name="agencySize"
                  required
                  value={formData.agencySize}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.agencySize ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <option value="">Select agency size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-25">11-25 employees</option>
                  <option value="26-50">26-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="100+">100+ employees</option>
                </select>
                {errors.agencySize && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.agencySize}</p>}
              </div>

              <div>
                <label htmlFor="interest" className="block text-xs sm:text-sm font-medium text-[#172840] mb-1">
                  Primary Interest <span className="text-[#F25849]">*</span>
                </label>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                    errors.interest ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <option value="">Select your interest</option>
                  <option value="acquire">Acquire another agency</option>
                  <option value="merge">Merge with another agency</option>
                  <option value="sell">Sell my agency</option>
                  <option value="expand">Expand capabilities</option>
                  <option value="invest">Invest in agencies</option>
                  <option value="explore">Explore options</option>
                </select>
                {errors.interest && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.interest}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="region" className="block text-xs sm:text-sm font-medium text-[#172840] mb-1">
                Operating Region(s) <span className="text-[#F25849]">*</span>
              </label>
              <select
                id="region"
                name="region"
                required
                value={formData.region}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
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
                <option value="pan-african">Pan-African</option>
              </select>
              {errors.region && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.region}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-[#172840] mb-1">
                Your Goals & Timeline <span className="text-[#F25849]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows="4"
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 resize-none ${
                  errors.message ? 'border-red-500' : ''
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Tell us about your M&A goals, timeline, and any specific requirements..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                onChange={handleRecaptchaChange}
                size="normal"
              />
            </div>
            {errors.recaptcha && (
              <p className="text-red-500 text-xs sm:text-sm mt-1 text-center">{errors.recaptcha}</p>
            )}

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#F25849] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] hover:shadow-lg font-medium text-xs sm:text-sm ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Book Consultation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaConsultationModal;
