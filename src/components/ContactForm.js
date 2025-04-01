// ContactForm.js
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm = () => {
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // Check if reCAPTCHA site key is available
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaSiteKey) {
    console.error('reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local');
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setErrors((prevErrors) => ({
      ...prevErrors,
      recaptcha: '',
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.secondName.trim()) newErrors.secondName = 'Second name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!recaptchaToken) newErrors.recaptcha = 'Please complete the reCAPTCHA';
    return newErrors;
  };

  // Handle form submission
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
    const loadingToast = toast.loading('Submitting your message...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken, // Include the reCAPTCHA token
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully!', { id: loadingToast });
        // Reset form and reCAPTCHA
        setFormData({
          firstName: '',
          secondName: '',
          email: '',
          phone: '',
          organization: '',
          message: '',
        });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
        // Redirect to thank-you page
        router.push('/thank-you');
      } else {
        toast.error(data.message || 'Failed to send message.', { id: loadingToast });
        setIsSubmitting(false);
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: loadingToast });
      setIsSubmitting(false);
      recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
  };

  return (
    <div className="bg-[#84C1D9] p-6 rounded-lg shadow-lg -mb-20">
      <Toaster position="top-right" />
      <h3 className="text-3xl font-medium mb-6">Contact Form</h3>
      {recaptchaSiteKey ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name and Second Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-[#172840] mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                  errors.firstName ? 'border-red-500' : ''
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="secondName" className="block text-[#172840] mb-1">
                Second Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="secondName"
                name="secondName"
                value={formData.secondName}
                onChange={handleChange}
                className={`w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                  errors.secondName ? 'border-red-500' : ''
                }`}
              />
              {errors.secondName && (
                <p className="text-red-500 text-sm mt-1">{errors.secondName}</p>
              )}
            </div>
          </div>

          {/* Email Address and Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-[#172840] mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-[#172840] mb-1">
                Phone number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300"
              />
            </div>
          </div>

          {/* Organization */}
          <div>
            <label htmlFor="organization" className="block text-[#172840] mb-1">
              Organization (Optional)
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-[#172840] mb-1">
              Your message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`w-full border-b border-black bg-transparent focus:outline-none focus:border-[#F25849] transition-colors duration-300 resize-none ${
                errors.message ? 'border-red-500' : ''
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
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

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#D6473C]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Join us Today'}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-red-500">
          Error: reCAPTCHA configuration is missing. Please contact support.
        </p>
      )}
    </div>
  );
};

export default ContactForm;