"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const CareerApplicationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    coverLetter: "",
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Check if reCAPTCHA site key is available
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaSiteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local"
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.position || !formData.experience || !formData.coverLetter) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare form data
      const submitData = {
        ...formData,
        recaptchaToken,
      };

      // Submit to API
      const response = await fetch("/api/send-career-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse response JSON:", jsonError);
        throw new Error("Server returned invalid response. Please try again.");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          location: "",
          coverLetter: "",
          resume: null
        });
        setRecaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }, 2000);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-1 sm:p-4 pt-4 sm:pt-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-[#172840] pr-2">
              Apply for a Position
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
            >
              <Icon icon="ic:baseline-close" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 lg:p-6">
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="bg-[#34B6A7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="ic:baseline-check" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#172840] mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600">
                  Thank you for your interest in joining PAAN. We'll review your application and get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3 sm:mb-4 lg:mb-6">
                    <div className="flex items-start">
                      <Icon icon="ic:baseline-error" className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-red-700 text-xs sm:text-sm leading-relaxed">{error}</p>
                    </div>
                  </div>
                )}
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Position Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                      Position of Interest *
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                    >
                      <option value="">Select a position</option>
                      <option value="commercial-manager">Commercial Manager (Accra, Ghana)</option>
                      <option value="business-development-intern">Business Development Intern (South Africa)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="4-5">4-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Lagos, Nigeria or Remote"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-[#84C1D9] transition-colors duration-200">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Icon icon="ic:baseline-cloud-upload" className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2" />
                      <span className="text-xs sm:text-sm text-gray-600">
                        {formData.resume ? formData.resume.name : "Click to upload your resume"}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PDF, DOC, or DOCX (Max 5MB)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#172840] mb-1 sm:mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    placeholder="Tell us why you're interested in joining PAAN and what you can bring to our team..."
                    className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent transition-colors duration-200 resize-none text-sm sm:text-base min-h-[100px]"
                  />
                </div>

                {/* reCAPTCHA */}
                {recaptchaSiteKey && (
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSiteKey}
                      onChange={handleRecaptchaChange}
                      onExpired={() => setRecaptchaToken(null)}
                      onError={() => setRecaptchaToken(null)}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 sm:px-6 py-3 bg-[#F25849] text-white rounded-lg hover:bg-[#D6473C] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon icon="ic:baseline-refresh" className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CareerApplicationModal;
