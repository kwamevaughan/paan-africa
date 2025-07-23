import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Footer from "@/layouts/footer";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const initialFormData = {
  name: "",
  email: "",
  agencyName: "",
  country: "",
  website: "",
  experience: "",
  motivation: "",
  credentialsFiles: [],
  agree: false,
};

const BurundiEOI = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      credentialsFiles: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("You must agree to the terms and privacy policy.");
      return;
    }
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("agencyName", formData.agencyName);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("website", formData.website);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("motivation", formData.motivation);
      if (formData.credentialsFiles && formData.credentialsFiles.length > 0) {
        formData.credentialsFiles.forEach((file) => {
          formDataToSend.append("credentialsFiles", file);
        });
      }
      const response = await fetch("/api/send-burundi-eoi", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        toast.success("Your Expression of Interest has been submitted!");
        router.push("/thank-you");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit EOI");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Expression of Interest | Burundi Nation Branding Project"
        description="Submit your Expression of Interest to co-bid with a PAAN Client on the Burundi nation branding and marketing strategy project."
        noindex={true}
      />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Decorative background */}
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
              <Icon icon="mdi:earth" className="w-4 h-4 text-white/80 mr-2" />
              <span className="text-white/80 text-sm font-medium">
                International Co-Bid Opportunity
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Expression Of Interest: Burundi Nation Branding
            </h1>
            <p className="text-slate-200 text-lg max-w-3xl mx-auto leading-relaxed">
              Burundi is entering a transformative phase of economic and institutional reform, aiming to reposition itself as a vibrant, investment-ready nation on the global stage. As part of the PRETE-NYUNGANIRA initiative, funded by the World Bank, the government has prioritized the development of a clear national brand and a 4-year country marketing strategy. This effort aligns with Burundi's Vision 2040 and 2060 and responds to the pressing need to reshape international perceptions, highlight the country's rich assets, and catalyze foreign investment, tourism, and development partnerships.
            </p>
            <div className="mt-6 inline-flex items-center bg-paan-yellow rounded-full px-6 py-3 text-paan-dark-blue font-semibold">
              <Icon icon="mdi:clock-outline" className="w-4 h-4 mr-2" />
              Submission Deadline: August 1, 2025
            </div>
          </div>
        </div>
        {/* Mission Overview */}
        <div className="relative max-w-3xl mx-auto px-4 -mt-10 pb-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden p-8">
            <h2 className="text-2xl font-bold text-paan-dark-blue mb-4 flex items-center">
              <span className="w-8 h-8 bg-paan-yellow rounded-lg flex items-center justify-center mr-3">
                <Icon icon="mdi:target" className="w-4 h-4 text-white" />
              </span>
              Mission Overview
            </h2>
            <p className="text-slate-700 mb-2">
              To develop a cohesive and compelling brand identity for Burundi that enhances its global attractiveness to investors, tourists, and development partners. The international agency will lead strategic direction and methodology, drawing on proven experience in national branding campaigns similar to Visit Rwanda and Magical Kenya.
            </p>
            <p className="text-slate-700">
              A PAAN agency member, a pan-African creative and strategic firm deeply rooted in Burundi's cultural context, seeks to collaborate with another international agency possessing extensive experience in defining country brands and executing long-term marketing strategies across multiple geographies. Together, the consortium will combine the PAAN member's cultural fluency and stakeholder engagement capacity with the international agency's strategic depth and global perspective.
            </p>
          </div>
        </div>
        {/* EOI Form */}
        <div className="relative max-w-3xl mx-auto px-4 pb-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 sm:p-12">
              <div className="grid grid-cols-1 gap-8">
                {/* Name */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    Full Name <span className="text-paan-red ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${focusedField === "name" ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]" : "border-slate-200 hover:border-slate-300"}`}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                {/* Email */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    Email Address <span className="text-paan-red ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${focusedField === "email" ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]" : "border-slate-200 hover:border-slate-300"}`}
                    required
                    placeholder="Enter your email address"
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    autoComplete="email"
                  />
                </div>
                {/* Agency Name */}
                <div className="group">
                  <label htmlFor="agencyName" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    Agency/Organization Name <span className="text-paan-red ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="agencyName"
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("agencyName")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${focusedField === "agencyName" ? "border-paan-yellow bg-white shadow-lg shadow-paan-yellow/10 scale-[1.02]" : "border-slate-200 hover:border-slate-300"}`}
                    required
                    placeholder="Enter your agency or organization name"
                  />
                </div>
                {/* Country */}
                <div className="group">
                  <label htmlFor="country" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    Country <span className="text-paan-red ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("country")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${focusedField === "country" ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]" : "border-slate-200 hover:border-slate-300"}`}
                    required
                    placeholder="Enter your country"
                  />
                </div>
                {/* Website */}
                <div className="group">
                  <label htmlFor="website" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    Website/Portfolio Link <span className="text-paan-red ml-1">*</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("website")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${focusedField === "website" ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]" : "border-slate-200 hover:border-slate-300"}`}
                    required
                    placeholder="https://youragency.com"
                  />
                </div>
                {/* Experience */}
                <div className="group">
                  <label htmlFor="experience" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    Relevant Experience in Nation Branding <span className="text-paan-red ml-1">*</span>
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("experience")}
                    onBlur={() => setFocusedField(null)}
                    rows="4"
                    className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none ${focusedField === "experience" ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]" : "border-slate-200 hover:border-slate-300"}`}
                    required
                    placeholder="Describe your agency's relevant experience in nation branding, country marketing, or similar projects."
                  />
                </div>
                {/* Motivation */}
                <div className="group">
                  <label htmlFor="motivation" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    Motivation for Co-bidding <span className="text-paan-red ml-1">*</span>
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("motivation")}
                    onBlur={() => setFocusedField(null)}
                    rows="4"
                    className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none ${focusedField === "motivation" ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]" : "border-slate-200 hover:border-slate-300"}`}
                    required
                    placeholder="Why are you interested in collaborating on this project? What unique value can your agency bring?"
                  />
                </div>
                {/* Credentials Files */}
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    Credentials/Case Studies (Optional)
                  </label>
                  <input
                    id="credentialsFiles"
                    name="credentialsFiles"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-paan-blue file:text-white hover:file:bg-paan-yellow"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  {formData.credentialsFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {Array.from(formData.credentialsFiles).map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-paan-blue/10 rounded border border-paan-blue text-slate-700 text-sm">
                          <span className="truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newFiles = Array.from(formData.credentialsFiles);
                              newFiles.splice(idx, 1);
                              setFormData({ ...formData, credentialsFiles: newFiles });
                            }}
                            className="ml-2 w-6 h-6 bg-paan-red hover:bg-paan-red/80 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                          >
                            <Icon icon="mdi:close" className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Agreement */}
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="w-5 h-5 mr-2 rounded border border-slate-300 focus:ring-paan-blue"
                    required
                  />
                  <label htmlFor="agree" className="text-slate-700 text-sm">
                    I agree to the <a href="/privacy-policy" target="_blank" className="underline text-paan-blue">privacy policy</a> and terms.
                  </label>
                </div>
                {/* Submit Button */}
                <div className="flex justify-center pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative overflow-hidden bg-paan-red text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-paan-yellow hover:to-paan-red hover:scale-105 hover:-translate-y-1"}`}
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
                          <span>Submit EOI</span>
                          <Icon icon="mdi:arrow-right" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default BurundiEOI; 