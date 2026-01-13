import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import TicketPurchaseButton from './TicketPurchaseButton';

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

  // Early Bird countdown timer state
  const [earlyBirdTimeLeft, setEarlyBirdTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Check if reCAPTCHA site key is available
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaSiteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local"
    );
  }

  // Early Bird countdown timer
  useEffect(() => {
    const targetDate = new Date('2026-02-21T23:59:59+03:00'); // February 21, 2026 at 11:59 PM EAT
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        setEarlyBirdTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setEarlyBirdTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

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
              <h2 className="text-3xl font-bold text-gray-800">Secure Your Spot at PAAN Summit 2026</h2>
            </div>
            
            <div className="bg-[#F25849] rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Ticket Options</h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-medium text-lg">Early Bird Pass: $65</h4>
                  <p className="text-sm opacity-90">Only 100 slots available</p>
                  
                  {/* Early Bird Countdown Timer */}
                  {earlyBirdTimeLeft.days > 0 || earlyBirdTimeLeft.hours > 0 || earlyBirdTimeLeft.minutes > 0 || earlyBirdTimeLeft.seconds > 0 ? (
                    <div className="mt-2 p-2 bg-white/20 rounded">
                      <div className="text-center">
                        <p className="text-xs font-medium opacity-90 mb-1">Early Bird Offer Ends In:</p>
                        <div className="flex justify-center gap-1 text-xs">
                          <div className="bg-white/30 rounded px-1 py-0.5 min-w-[30px]">
                            <div className="font-bold">{earlyBirdTimeLeft.days}</div>
                            <div className="text-xs opacity-75">D</div>
                          </div>
                          <div className="bg-white/30 rounded px-1 py-0.5 min-w-[30px]">
                            <div className="font-bold">{earlyBirdTimeLeft.hours}</div>
                            <div className="text-xs opacity-75">H</div>
                          </div>
                          <div className="bg-white/30 rounded px-1 py-0.5 min-w-[30px]">
                            <div className="font-bold">{earlyBirdTimeLeft.minutes}</div>
                            <div className="text-xs opacity-75">M</div>
                          </div>
                          <div className="bg-white/30 rounded px-1 py-0.5 min-w-[30px]">
                            <div className="font-bold">{earlyBirdTimeLeft.seconds}</div>
                            <div className="text-xs opacity-75">S</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 p-2 bg-red-500/30 rounded">
                      <p className="text-center text-xs font-medium">Early Bird Offer Has Ended</p>
                    </div>
                  )}
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-medium text-lg">General Admission: $95</h4>
                  <p className="text-sm opacity-90">Most Popular Standard</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-medium text-lg">VIP Delegate Pass: $220</h4>
                  <p className="text-sm opacity-90">Exclusive Access</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-medium text-lg">Student & Young Creatives: $50</h4>
                  <p className="text-sm opacity-90">For students and young professionals</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-medium text-lg">Virtual Access Pass: $15</h4>
                  <p className="text-sm opacity-90">Join from anywhere</p>
                </div>
               
                <div className="pt-3">
                  <p className="text-md text-left">Choose the ticket that best fits your needs. All tickets include access to keynotes, panels, and networking opportunities.</p>
                </div>
              </div>
            </div>
            
            {/* Benefits Overview */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Included in Your Ticket</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F25849] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">Full Summit Access</h4>
                      <p className="text-sm text-gray-600">2-day access to all keynotes, panels, and workshops</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F25849] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">Networking Opportunities</h4>
                      <p className="text-sm text-gray-600">Connect with industry leaders and fellow creatives</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F25849] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">Digital Certificate</h4>
                      <p className="text-sm text-gray-600">Certificate of participation for your portfolio</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F25849] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">Exhibition Access</h4>
                      <p className="text-sm text-gray-600">Explore innovative projects and connect with exhibitors</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F25849] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">Post-Event Access</h4>
                      <p className="text-sm text-gray-600">Digital recordings and speaker presentations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F25849] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">Refreshments</h4>
                      <p className="text-sm text-gray-600">Lunch and refreshments during the summit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F25849] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">Welcome Kit</h4>
                      <p className="text-sm text-gray-600">Exclusive summit materials and branded items</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F25849] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">Business Opportunities</h4>
                      <p className="text-sm text-gray-600">Access to deal rooms and partnership opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium Benefits Note */}
              <div className="mt-4 p-3 bg-[#F25849]/10 border border-[#F25849]/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F25849] rounded-full"></div>
                  <h4 className="font-medium text-gray-800">Premium Benefits</h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  VIP, Agency Growth, and International Delegate passes include additional perks like priority seating, 
                  exclusive networking events, premium lounges, and access to the PAAN Awards Gala.
                </p>
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
                <TicketPurchaseButton 
                  variant="primary" 
                  size="md"
                  className="bg-[#F2B706] text-[#172840] py-3 px-6 rounded-full hover:bg-orange-600 transition duration-300 font-medium ml-auto"
                >
                  Register Now
                </TicketPurchaseButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}