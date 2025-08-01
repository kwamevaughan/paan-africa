import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function BecomeAmbassadorModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    country: '',
    city: '',
    experience: '',
    motivation: '',
    network: '',
    expectations: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send form data to your API endpoint
      const response = await fetch('/api/send-ambassador-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            position: '',
            country: '',
            city: '',
            experience: '',
            motivation: '',
            network: '',
            expectations: ''
          });
        }, 3000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 mx-2">
        {/* Header */}
        <div className="bg-gradient-to-r from-paan-dark-blue via-paan-blue to-paan-dark-blue text-white p-4 sm:p-6 md:p-8 rounded-t-xl sm:rounded-t-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-16 h-16 sm:w-32 sm:h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 bg-paan-yellow rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-24 sm:h-24 bg-paan-red rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-paan-yellow rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                    <Icon icon="mdi:account-star" className="w-5 h-5 sm:w-6 sm:h-6 text-paan-dark-blue" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">Become a PAAN Ambassador</h2>
                    <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">Join Africa's most influential creative leaders</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-blue-200 space-y-1 sm:space-y-0">
                  <div className="flex items-center">
                    <Icon icon="mdi:map-marker" className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">Pan-African Agency Network</span>
                  </div>
                  <span className="hidden sm:inline mx-2">•</span>
                  <div className="flex items-center">
                    <Icon icon="mdi:account-group" className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">Leadership Program</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-paan-yellow transition-colors p-1 sm:p-2 hover:bg-white hover:bg-opacity-10 rounded-full flex-shrink-0 ml-2"
              >
                <Icon icon="mdi:close" className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-4 sm:p-6 md:p-8">
          {submitSuccess ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Icon icon="mdi:check-circle" className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Application Submitted Successfully!</h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-md mx-auto">
                Thank you for your interest in becoming a PAAN Ambassador. We'll review your application and be in touch within 48 hours.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 max-w-md mx-auto">
                <p className="text-blue-800 text-xs sm:text-sm">
                  <Icon icon="mdi:information" className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  You'll receive a confirmation email shortly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-paan-blue rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Icon icon="mdi:account" className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-paan-dark-blue rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Icon icon="mdi:briefcase" className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Professional Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Company/Organization *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Position/Title *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                      placeholder="Your job title"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                      placeholder="Your country"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                      placeholder="Your city"
                    />
                  </div>
                </div>
              </div>

              {/* Experience & Motivation */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-paan-red rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Icon icon="mdi:star" className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Experience & Motivation</h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Years of Experience in Creative/Digital Industry *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors"
                    >
                      <option value="">Select your experience level</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Why do you want to become a PAAN Ambassador? *
                    </label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none"
                      placeholder="Share your motivation and how you can contribute to PAAN's mission..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Describe your professional network and influence *
                    </label>
                    <textarea
                      name="network"
                      value={formData.network}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your connections, influence, and reach in your industry..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      What do you hope to achieve as a PAAN Ambassador? *
                    </label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-colors resize-none"
                      placeholder="Share your goals and what you hope to accomplish..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-paan-red to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="mdi:loading" className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:send" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 