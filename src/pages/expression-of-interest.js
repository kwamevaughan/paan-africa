import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Footer from "@/layouts/footer";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import countriesData from "../../public/assets/misc/countries.json";

const ExpressionOfInterest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agencyName: "",
    country: "",
    opportunities: [],
    credentials: "",
    credentialsFiles: [],
    experience: [],
  });

  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const router = useRouter();

  const [filteredCountries, setFilteredCountries] = useState(countriesData);

  useEffect(() => {
    setFilteredCountries(
      countriesData.filter((country) =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase())
      )
    );
  }, [countrySearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");
    setIsSubmitting(true);

    try {
      console.log("Creating FormData...");
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("agencyName", formData.agencyName);
      formDataToSend.append("country", formData.country);
      formDataToSend.append(
        "opportunities",
        JSON.stringify(formData.opportunities)
      );
      formDataToSend.append("credentials", formData.credentials);

      if (formData.credentialsFiles && formData.credentialsFiles.length > 0) {
        console.log(
          "Appending credentials files:",
          formData.credentialsFiles.length
        );
        formData.credentialsFiles.forEach((file) => {
          formDataToSend.append("credentialsFiles", file);
        });
      }

      if (formData.experience && formData.experience.length > 0) {
        console.log("Appending experience files:", formData.experience.length);
        formData.experience.forEach((file) => {
          formDataToSend.append("experience", file);
        });
      }

      const response = await fetch("/api/send-eoi", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Your application is being processed!");
        router.push("/thank-you");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      setFormData({
        name: "",
        email: "",
        agencyName: "",
        country: "",
        opportunities: [],
        credentials: "",
        credentialsFiles: [],
        experience: [],
      });
      setCountrySearch("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Failed to submit Expression of Interest");
    } finally {
      console.log("Form submission completed");
      setIsSubmitting(false);
    }
  };

  const handleOpportunityChange = (opportunity) => {
    setFormData((prev) => {
      const opportunities = prev.opportunities.includes(opportunity)
        ? prev.opportunities.filter((opt) => opt !== opportunity)
        : prev.opportunities.length < 2
          ? [...prev.opportunities, opportunity]
          : prev.opportunities;
      return { ...prev, opportunities };
    });
  };

  const opportunityIcons = {
    SEO: "mdi:magnify",
    SAO: "mdi:cellphone",
  };

  return (
    <>
      <SEO
        title="Expression of Interest | PAAN"
        description="Apply to become a partner agency with the Pan-African Agency Network (PAAN). Submit your Expression of Interest to join exclusive opportunities in SEO, and App Store Optimization across Africa."
        keywords="Expression of Interest, PAAN, opportunities, submit, application, Africa, agency, SEO, ASO"
        noindex={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        </div>

        <Header />

        {/* Hero Section */}
        <div className="relative bg-paan-dark-blue pt-40 pb-20 overflow-hidden">
          {/* Hero background pattern */}
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
              <Icon
                icon="mdi:rocket-launch"
                className="w-4 h-4 text-white/80 mr-2"
              />
              <span className="text-white/80 text-sm font-medium">
                Partnership Opportunity
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Expression Of Interest
            </h1>
            <p className="text-slate-200 text-lg max-w-3xl mx-auto leading-relaxed">
              A global crypto investment platform is seeking{" "}
              <span className="font-semibold text-paan-blue">
                3 agency partners
              </span>{" "}
              to support its expansion in Africa. The project focuses on{" "}
              <span className="font-semibold text-paan-yellow">
                SEO, and App Store Optimization
              </span>{" "}
              across Nigeria, Ghana, Ethiopia, South Africa, and Kenya.
            </p>
            <div className="mt-6 inline-flex items-center bg-paan-yellow rounded-full px-6 py-3 text-paan-dark-blue font-semibold">
              <Icon icon="mdi:clock-outline" className="w-4 h-4 mr-2" />
              Deadline: June 20, 10:00 PM EAT
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="relative max-w-5xl mx-auto px-4 -mt-10 pb-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Form header */}
            <div className="bg-paan-dark-blue px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="w-8 h-8 bg-paan-yellow rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="mdi:sparkles" className="w-4 h-4 text-white" />
                </span>
                Submit Your Application
              </h2>
              <p className="text-slate-300 mt-2">
                Fill out the form below to express your interest in our
                partnership program
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Name Field */}
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
                    >
                      Full Name
                      <span className="text-paan-red ml-1">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${
                          focusedField === "name"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  {/* Email Field */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
                    >
                      Email Address
                      <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${
                          focusedField === "email"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                        placeholder="Enter your email address"
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Agency Name Field */}
                  <div className="group">
                    <label
                      htmlFor="agencyName"
                      className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
                    >
                      Agency Name
                      <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="agencyName"
                        value={formData.agencyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            agencyName: e.target.value,
                          })
                        }
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

                  {/* Country Field */}
                  <div className="group">
                    <label
                      htmlFor="country"
                      className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
                    >
                      Country of Operation
                      <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="country"
                        value={countrySearch}
                        onChange={(e) => {
                          setCountrySearch(e.target.value);
                          setShowCountryDropdown(true);
                        }}
                        onFocus={() => {
                          setShowCountryDropdown(true);
                          setFocusedField("country");
                        }}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 ${
                          focusedField === "country"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        placeholder="Search for your country"
                        required
                        autoComplete="off"
                      />

                      {showCountryDropdown && (
                        <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <div
                                key={country.code}
                                className="flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 cursor-pointer transition-all duration-200 border-b border-slate-100 last:border-b-0"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    country: country.name,
                                  });
                                  setCountrySearch(country.name);
                                  setShowCountryDropdown(false);
                                }}
                              >
                                <img
                                  src={country.image}
                                  alt={country.code}
                                  className="w-6 h-6 mr-3 rounded-full border border-slate-200"
                                />
                                <span className="text-slate-700 font-medium">
                                  {country.name}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="px-6 py-4 text-slate-500 text-center">
                              No countries found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Opportunities */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center">
                      Choose Opportunities{" "}
                      <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {["SEO", "SAO"].map((opportunity) => (
                        <label
                          key={opportunity}
                          className="group relative cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.opportunities.includes(
                              opportunity
                            )}
                            onChange={() =>
                              handleOpportunityChange(opportunity)
                            }
                            className="sr-only"
                          />
                          <div
                            className={`flex items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                              formData.opportunities.includes(opportunity)
                                ? "border-paan-yellow bg-paan-yellow shadow-lg shadow-paan-yellow/10"
                                : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-4 transition-all duration-300 ${
                                formData.opportunities.includes(opportunity)
                                  ? "border-paan-yellow bg-paan-yellow text-paan-dark-blue"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {formData.opportunities.includes(opportunity) && (
                                <Icon icon="mdi:check" className="w-4 h-4" />
                              )}
                            </div>
                            <Icon
                              icon={opportunityIcons[opportunity]}
                              className="w-6 h-6 text-slate-600 mr-3"
                            />
                            <span className="text-slate-700 font-semibold">
                              {opportunity}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="group">
                    <label
                      htmlFor="credentials"
                      className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
                    >
                      Project Credentials
                      <span className="text-paan-red ml-1">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="credentials"
                        value={formData.credentials}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            credentials: e.target.value,
                          })
                        }
                        onFocus={() => setFocusedField("credentials")}
                        onBlur={() => setFocusedField(null)}
                        rows="4"
                        className={`w-full px-6 py-4 bg-slate-50/50 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none ${
                          focusedField === "credentials"
                            ? "border-paan-blue bg-white shadow-lg shadow-paan-blue/10 scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                        placeholder="Describe your relevant credentials and expertise..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                {/* Credentials Files */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center">
                    Credentials Files{" "}
                    <span className="text-slate-500 ml-2">(Optional)</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="credentials-files"
                      name="credentialsFiles"
                      type="file"
                      multiple
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          credentialsFiles: [...e.target.files],
                        })
                      }
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="credentials-files"
                      className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 group-hover:scale-[1.02]"
                    >
                      <div className="w-16 h-16 bg-paan-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon
                          icon="mdi:cloud-upload"
                          className="w-8 h-8 text-white"
                        />
                      </div>
                      <p className="text-slate-600 font-medium mb-2">
                        Drop files here or click to upload
                      </p>
                      <p className="text-sm text-slate-500">
                        PDF, DOC, DOCX, JPG, PNG up to 10MB
                      </p>
                    </label>
                    {formData.credentialsFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {Array.from(formData.credentialsFiles).map(
                          (file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-paan-blue rounded-xl border border-paan-blue"
                            >
                              <span className="text-slate-700 text-sm font-medium truncate">
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newFiles = Array.from(
                                    formData.credentialsFiles
                                  );
                                  newFiles.splice(index, 1);
                                  setFormData({
                                    ...formData,
                                    credentialsFiles: newFiles,
                                  });
                                }}
                                className="w-6 h-6 bg-paan-red hover:bg-paan-red/80 text-paan-dark-blue rounded-full flex items-center justify-center transition-colors duration-200"
                              >
                                <Icon icon="mdi:close" className="w-4 h-4" />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience Files */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center">
                    Experience & Portfolio Files{" "}
                    <span className="text-paan-red ml-1">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="experience"
                      name="experience"
                      type="file"
                      multiple
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience: [...e.target.files],
                        })
                      }
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      required
                    />
                    <label
                      htmlFor="experience"
                      className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 group-hover:scale-[1.02]"
                    >
                      <div className="w-16 h-16 bg-paan-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon
                          icon="mdi:file-document-multiple"
                          className="w-8 h-8 text-white"
                        />
                      </div>
                      <p className="text-slate-600 font-medium mb-2">
                        Upload your portfolio & case studies
                      </p>
                      <p className="text-sm text-slate-500">
                        PDF, DOC, DOCX, JPG, PNG up to 10MB
                      </p>
                    </label>
                    {formData.experience && formData.experience.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {Array.from(formData.experience).map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-paan-yellow rounded-xl border border-paan-yellow"
                          >
                            <span className="text-slate-700 text-sm font-medium truncate">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const newFiles = Array.from(
                                  formData.experience
                                );
                                newFiles.splice(index, 1);
                                setFormData({
                                  ...formData,
                                  experience: newFiles,
                                });
                              }}
                              className="w-6 h-6 bg-paan-red hover:bg-paan-red/80 text-paan-dark-blue rounded-full flex items-center justify-center transition-colors duration-200"
                            >
                              <Icon icon="mdi:close" className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative flex items-center space-x-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Icon
                          icon="mdi:arrow-right"
                          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                        />
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

export default ExpressionOfInterest;
