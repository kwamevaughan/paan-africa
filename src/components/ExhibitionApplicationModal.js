import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';

const ExhibitionApplicationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    country: '',
    industry: '',
    companySize: '',
    boothSize: '',
    exhibitionGoals: '',
    addons: [],
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

  const industries = [
    'Creative Agency',
    'Tech Startup',
    'Design Studio',
    'Marketing Agency',
    'Digital Platform',
    'Investment Firm',
    'Government/Policy',
    'Educational Institution',
    'Non-Profit',
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  const boothSizes = [
    'Standard Booth (3m x 3m)',
    'Large Booth (6m x 3m)',
    'Premium Booth (9m x 3m)',
    'Custom Space (Please specify)'
  ];

  const countries = [
    'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Egypt', 'Morocco', 
    'Tunisia', 'Algeria', 'Ethiopia', 'Uganda', 'Tanzania', 'Rwanda',
    'Senegal', 'Ivory Coast', 'Cameroon', 'Angola', 'Zambia', 'Zimbabwe',
    'Botswana', 'Namibia', 'Mauritius', 'Seychelles', 'Other'
  ];

  const addons = [
    { id: 'power', label: 'Power Supply', icon: 'mdi:power' },
    { id: 'internet', label: 'Internet Connection / WiFi', icon: 'mdi:wifi' },
    { id: 'display', label: 'Display Equipment', icon: 'mdi:monitor' },
    { id: 'audio', label: 'Audio/Visual Equipment', icon: 'mdi:speaker' },
    { id: 'furniture', label: 'Furniture Rental', icon: 'mdi:sofa' },
    { id: 'printing', label: 'Printing Services', icon: 'mdi:printer' },
    { id: 'demo', label: 'Demo Equipment', icon: 'mdi:presentation-play' },
    { id: 'storage', label: 'Storage Space', icon: 'mdi:archive' },
    { id: 'lighting', label: 'Extra Lighting', icon: 'mdi:lightbulb' },
    { id: 'accessibility', label: 'Accessibility Accommodations', icon: 'mdi:wheelchair-accessibility' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'consent') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      } else {
        // Handle addons checkboxes
        setFormData(prev => ({
          ...prev,
          addons: checked
            ? [...prev.addons, name]
            : prev.addons.filter(addon => addon !== name)
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
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.companySize) newErrors.companySize = 'Company size is required';
    if (!formData.boothSize) newErrors.boothSize = 'Booth size is required';
    if (!formData.exhibitionGoals.trim()) {
      newErrors.exhibitionGoals = 'Exhibition goals are required';
    } else if (formData.exhibitionGoals.trim().split(' ').length < 20) {
      newErrors.exhibitionGoals = 'Please provide at least 20 words about your exhibition goals';
    }
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
    const toastId = toast.loading('Submitting your exhibition application...');

    try {
      const response = await fetch('/api/send-exhibition-application', {
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
        toast.success('Exhibition application submitted successfully!', { id: toastId });
        // Reset form
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          website: '',
          country: '',
          industry: '',
          companySize: '',
          boothSize: '',
          exhibitionGoals: '',
          addons: [],
          consent: false
        });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
        onClose();
      } else {
        toast.error(data.message || 'Failed to submit exhibition application.', { id: toastId });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-paan-dark-blue text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Exhibition Application</h2>
                <p className="text-white/90 mt-1">PAAN Summit 2026 - Showcase Your Brand</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-paan-dark-blue border-b border-gray-200 pb-2">
                Company Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Company Name <span className="text-paan-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                      errors.companyName ? 'border-red-500' : ''
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Contact Person <span className="text-paan-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                      errors.contactPerson ? 'border-red-500' : ''
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                    placeholder="Enter contact person name"
                  />
                  {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
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
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : ''
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-paan-dark-blue mb-2">
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
                    placeholder="e.g., +234 123 456 7890"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Website
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

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Country <span className="text-paan-red">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
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
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-paan-dark-blue border-b border-gray-200 pb-2">
                Business Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Industry <span className="text-paan-red">*</span>
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                      errors.industry ? 'border-red-500' : ''
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                </div>

                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Company Size <span className="text-paan-red">*</span>
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    required
                    value={formData.companySize}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                      errors.companySize ? 'border-red-500' : ''
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                  >
                    <option value="">Select company size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
                </div>
              </div>
            </div>

            {/* Exhibition Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-paan-dark-blue border-b border-gray-200 pb-2">
                Exhibition Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="boothSize" className="block text-sm font-medium text-paan-dark-blue mb-2">
                    Preferred Booth Size <span className="text-paan-red">*</span>
                  </label>
                  <select
                    id="boothSize"
                    name="boothSize"
                    required
                    value={formData.boothSize}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors ${
                      errors.boothSize ? 'border-red-500' : ''
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                  >
                    <option value="">Select booth size</option>
                    {boothSizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {errors.boothSize && <p className="text-red-500 text-sm mt-1">{errors.boothSize}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="exhibitionGoals" className="block text-sm font-medium text-paan-dark-blue mb-2">
                  Exhibition Goals & Objectives <span className="text-paan-red">*</span>
                </label>
                <textarea
                  id="exhibitionGoals"
                  name="exhibitionGoals"
                  required
                  value={formData.exhibitionGoals}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows="4"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none ${
                    errors.exhibitionGoals ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="Describe your goals for exhibiting at the PAAN Summit. What do you hope to achieve? Who is your target audience? (Minimum 20 words)"
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.exhibitionGoals && <p className="text-red-500 text-sm">{errors.exhibitionGoals}</p>}
                  <p className="text-sm text-gray-500 ml-auto">
                    {formData.exhibitionGoals.trim().split(' ').length} words
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information - Addons */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-paan-dark-blue border-b border-gray-200 pb-2">
                Additional Services & Addons
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select any additional services or addons you would like for your booth:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className={`flex items-start space-x-3 p-4 border-2 rounded-lg transition-all cursor-pointer ${
                      formData.addons.includes(addon.id)
                        ? 'border-paan-blue bg-paan-blue/5'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                    onClick={() => !isSubmitting && handleChange({
                      target: {
                        name: addon.id,
                        type: 'checkbox',
                        checked: !formData.addons.includes(addon.id)
                      }
                    })}
                  >
                    <input
                      type="checkbox"
                      id={addon.id}
                      name={addon.id}
                      checked={formData.addons.includes(addon.id)}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-5 h-5 text-paan-blue border-gray-300 rounded focus:ring-paan-blue mt-0.5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={addon.id}
                        className="flex items-center gap-2 text-sm font-medium text-paan-dark-blue cursor-pointer"
                      >
                        <Icon icon={addon.icon} className="w-5 h-5 text-paan-blue" />
                        {addon.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-4">
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
                  <span className="text-paan-red">*</span> I confirm the information provided is accurate, and I agree to be contacted by PAAN regarding my exhibition application. I understand that exhibition space is limited and subject to approval.
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
                className={`bg-paan-red text-white px-8 py-4 rounded-xl hover:bg-paan-red/90 transition-all duration-300 font-medium text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
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
                    <Icon icon="mdi:store" className="w-6 h-6" />
                    Submit Exhibition Application
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ExhibitionApplicationModal;
