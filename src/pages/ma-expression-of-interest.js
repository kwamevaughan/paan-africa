import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Footer from "@/layouts/footer";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const initialFormData = {
  fullName: "",
  agencyName: "",
  role: "",
  email: "", 
  phone: "",
  opportunityTypes: [],
  timeline: "",
  goals: "",
  targets: "",
  confidentialCall: "",
};

const opportunityOptions = [
  "I'm considering selling my agency",
  "I'm looking to buy another agency",
  "I'm interested in merging with another agency",
  "I'm exploring options and open to advice",
  "Not sure yet, just curious",
];

const timelineOptions = [
  "Immediately (within 3 months)",
  "Short-term (3–6 months)",
  "Mid-term (6–12 months)",
  "Long-term (1–2 years)",
  "Just exploring for now",
];

const ConfidentialMAEOI = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        opportunityTypes: checked
          ? [...prev.opportunityTypes, value]
          : prev.opportunityTypes.filter((v) => v !== value),
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-ma-eoi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Your confidential EOI has been submitted.");
        router.push("/thank-you");
      } else {
        const data = await response.json();
        toast.error(data.message || "Submission failed.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Confidential Expression of Interest | PAAN M&A" description="Confidential EOI for PAAN Members exploring M&A opportunities." />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        </div>
        <Header />
        {/* Hero Section */}
        <div className="relative bg-paan-dark-blue pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255,255,255,0.05) 2px, transparent 2px)`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
              <span className="text-white/80 text-sm font-medium">
                Confidential M&A Opportunity
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Confidential Expression Of Interest
            </h1>
            <p className="text-slate-200 text-lg max-w-3xl mx-auto leading-relaxed">
              For PAAN Members exploring <span className="font-semibold text-paan-yellow">Mergers & Acquisitions</span> opportunities. Submit this confidential form to connect with Agency Futures and explore your options.
            </p>
          </div>
        </div>
        {/* Form Section */}
        <div className="relative max-w-5xl mx-auto px-4 -mt-10 pb-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Form header */}
            <div className="bg-paan-dark-blue px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="w-8 h-8 bg-paan-yellow rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-lg font-bold">M&A</span>
                </span>
                Submit Your Confidential EOI
              </h2>
              <p className="text-slate-300 mt-2">
                Fill out the form below to express your interest in M&A opportunities
              </p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Full Name */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                      Full Name <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("fullName")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${
                          focusedField === "fullName"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  {/* Agency Name */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                      Agency Name <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="agencyName"
                        value={formData.agencyName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("agencyName")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${
                          focusedField === "agencyName"
                            ? "border-paan-yellow bg-white shadow-lg shadow-paan-yellow/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                        placeholder="Enter your agency name"
                      />
                    </div>
                  </div>
                  {/* Role at the Agency */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                      Role at the Agency <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("role")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${
                          focusedField === "role"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                        placeholder="e.g. Founder, CEO, Managing Director"
                      />
                    </div>
                  </div>
                  {/* Email Address */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                      Email Address <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${
                          focusedField === "email"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                        placeholder="Enter your email address"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  {/* Phone Number */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                      Phone Number <span className="text-slate-500 ml-1">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${
                          focusedField === "phone"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-8">
                  {/* Opportunity Types */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center">
                      What type of opportunity are you exploring? <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {opportunityOptions.map((option) => (
                        <label key={option} className="group relative cursor-pointer">
                          <input
                            type="checkbox"
                            name="opportunityTypes"
                            value={option}
                            checked={formData.opportunityTypes.includes(option)}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div
                            className={`flex items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                              formData.opportunityTypes.includes(option)
                                ? "border-paan-yellow bg-paan-yellow shadow-lg shadow-paan-yellow/10"
                                : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-4 transition-all duration-300 ${
                                formData.opportunityTypes.includes(option)
                                  ? "border-paan-yellow bg-paan-yellow text-paan-dark-blue"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {formData.opportunityTypes.includes(option) && (
                                <span className="text-paan-dark-blue font-bold">✓</span>
                              )}
                            </div>
                            <span className="text-slate-700 font-semibold">
                              {option}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Timeline */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center">
                      What is your ideal timeline? <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="space-y-2">
                      {timelineOptions.map((option) => (
                        <label key={option} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="timeline"
                            value={option}
                            checked={formData.timeline === option}
                            onChange={handleChange}
                            className="sr-only"
                            required
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-300 ${
                              formData.timeline === option
                                ? "border-paan-blue bg-paan-blue"
                                : "border-slate-300 bg-white group-hover:border-paan-blue"
                            }`}
                          >
                            {formData.timeline === option && (
                              <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>
                            )}
                          </div>
                          <span className="text-slate-700 font-semibold">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Goals */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                      What are your primary goals for this move?
                    </label>
                    <div className="relative">
                      <textarea
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("goals")}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none ${
                          focusedField === "goals"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        placeholder="You can mention growth, access to new markets, exit strategy, talent consolidation, etc."
                      />
                    </div>
                  </div>
                  {/* Targets */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center">
                      Any specific regions, agency types, or capabilities you're targeting (if any)?
                    </label>
                    <div className="relative">
                      <textarea
                        name="targets"
                        value={formData.targets}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("targets")}
                        onBlur={() => setFocusedField(null)}
                        rows={3}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none ${
                          focusedField === "targets"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        placeholder="Describe any specific regions, agency types, or capabilities you're targeting."
                      />
                    </div>
                  </div>
                  {/* Confidential Call */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center">
                      Would you like to be contacted for a confidential call with Agency Futures? <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="space-x-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="radio" name="confidentialCall" value="Yes" checked={formData.confidentialCall === "Yes"} onChange={handleChange} required className="sr-only" />
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 transition-all duration-300 ${formData.confidentialCall === "Yes" ? "border-paan-blue bg-paan-blue" : "border-slate-300 bg-white"}`}>
                          {formData.confidentialCall === "Yes" && <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>}
                        </span>
                        <span className="text-slate-700 font-semibold">Yes</span>
                      </label>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="radio" name="confidentialCall" value="No" checked={formData.confidentialCall === "No"} onChange={handleChange} required className="sr-only" />
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 transition-all duration-300 ${formData.confidentialCall === "No" ? "border-paan-blue bg-paan-blue" : "border-slate-300 bg-white"}`}>
                          {formData.confidentialCall === "No" && <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>}
                        </span>
                        <span className="text-slate-700 font-semibold">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center pt-12">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative overflow-hidden bg-paan-red text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:from-paan-yellow hover:to-paan-red hover:scale-105 hover:-translate-y-1"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Confidential EOI</span>
                        <span className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ConfidentialMAEOI; 