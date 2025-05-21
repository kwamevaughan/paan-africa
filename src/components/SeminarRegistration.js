import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

export default function SeminarRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    isPaanMember: '',
    recaptchaToken: ''
  });

  const [errors, setErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Check if reCAPTCHA site key is available
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaSiteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local"
    );
  }

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Organization validation
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    // PAAN Member validation
    if (!formData.isPaanMember) {
      newErrors.isPaanMember = 'Please select if you are a PAAN member';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      recaptcha: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    // Show immediate toast for user feedback
    const toastId = toast.loading("Message being sent...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken, // Include the reCAPTCHA token
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!", { id: toastId });
        // Reset form and reCAPTCHA
        setFormData({
          firstName: "",
          secondName: "",
          email: "",
          phone: "",
          organization: "",
          message: "",
        });
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
        // Redirect to thank-you page
        router.push("/thank-you");
      } else {
        toast.error(data.message || "Failed to send message.", { id: toastId });
        setIsSubmitting(false);
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { id: toastId });
      setIsSubmitting(false);
      recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
  };

  return (
    <div className="py-10 relative">
      <section className="relative mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Title and Ticket Options */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Secure Your Spot at PAAN Summit 2025</h2>
            </div>
            
            <div className="bg-[#F25849] rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Ticket Options</h3>
              <div className="">
                <div className="border-orange-400">
                  <h4 className="font-medium text-xl">Members: $100</h4>
                </div>
                <div className="pb-6">
                  <h4 className="font-medium text-xl">Non-Members: $150</h4>
                </div>
               
                <div>
                  <p className="text-md text-left">Includes access to all sessions, workshops, and networking events during the summit.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/*  Registration Form */}
          <div className="rounded-lg p-6">
            <p className="text-gray-700 mb-6">Join Africa's top creative and tech leaders for three days of inspiration, connection, and transformation. Choose your ticket and register below.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Official Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border-0 border-b ${errors.name ? 'border-red-500' : 'border-[#172840]'} focus:border-orange-500 bg-transparent outline-none py-2`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border-0 border-b ${errors.email ? 'border-red-500' : 'border-[#172840]'} focus:border-orange-500 bg-transparent outline-none py-2`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="organization" className="block text-gray-700 mb-1">Organization*</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className={`w-full border-0 border-b ${errors.organization ? 'border-red-500' : 'border-[#172840]'} focus:border-orange-500 bg-transparent outline-none py-2`}
                  />
                  {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Are you a PAAN Member?*</label>
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isPaanMember"
                        value="yes"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isPaanMember"
                        value="no"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {errors.isPaanMember && <p className="text-red-500 text-sm mt-1">{errors.isPaanMember}</p>}
                </div>
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
              
              <div className="flex w-full">
                <button
                  type="submit"
                  className="bg-[#F2B706] text-[#172840] py-3 px-6 rounded-full hover:bg-orange-600 transition duration-300 font-medium ml-auto"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}