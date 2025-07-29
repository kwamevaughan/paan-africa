import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const AgencyEnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');

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

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors(prev => ({
        ...prev,
        recaptcha: ''
      }));
    }
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
    if (!formData.message.trim()) newErrors.message = 'Message is required';
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
      const response = await fetch('/api/send-agency-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Enquiry sent successfully!', { id: toastId });
        // Google Ads conversion tracking
        if (typeof window !== 'undefined' && typeof gtag_report_conversion === 'function') {
          gtag_report_conversion();
        }
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });
        setRecaptchaToken('');
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] sm:max-h-[85vh] relative overflow-hidden shadow-xl flex flex-col">
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
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#172840] mb-2">Enquire About PAAN</h2>
            <p className="text-gray-600 text-sm sm:text-base">Send us a message and we'll get back to you shortly</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                className={`w-full px-3 py-2 sm:px-4 sm:py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
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
                className={`w-full px-3 py-2 sm:px-4 sm:py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
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
                className={`w-full px-3 py-2 sm:px-4 sm:py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 text-sm sm:text-base ${
                  errors.company ? 'border-red-500' : ''
                } ${isSubmitting ? 'opacity-50' : ''}`}
              />
              {errors.company && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.company}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#172840] mb-1">
                Message/ Enquiry <span className="text-[#F25849]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows="3"
                className={`w-full px-3 py-2 sm:px-4 sm:py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 resize-none text-sm sm:text-base ${
                  errors.message ? 'border-red-500' : ''
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Tell us how we can help you..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
            </div>

            <div className="flex justify-center">
              <div className="transform scale-75 sm:scale-90 md:scale-100">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {errors.recaptcha && (
              <p className="text-red-500 text-xs sm:text-sm text-center">{errors.recaptcha}</p>
            )}

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#F25849] text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] hover:shadow-lg font-medium text-sm ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgencyEnquiryModal; 