import SEO from "@/components/SEO";
import Header from "../layouts/header";
import Footer from "@/layouts/footer";
import { useState } from "react";
import { toast } from 'react-hot-toast';

const africanCountries = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon",
  "Central African Republic", "Chad", "Comoros", "Congo", "Côte d'Ivoire", "Democratic Republic of the Congo",
  "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia",
  "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
  "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger",
  "Nigeria", "Rwanda", "São Tomé and Príncipe", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
  "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
];


const ExpressionOfInterest = () => {
  const [formData, setFormData] = useState({
    name: "",
    agencyName: "",
    country: "",
    opportunities: [],
    credentials: "",
    credentialsFiles: [],
    experience: []
  });

  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCountries = africanCountries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    setIsSubmitting(true);

    try {
      console.log('Creating FormData...');
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('agencyName', formData.agencyName);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('opportunities', JSON.stringify(formData.opportunities));
      formDataToSend.append('credentials', formData.credentials);
      
      // Append credentials files
      if (formData.credentialsFiles && formData.credentialsFiles.length > 0) {
        console.log('Appending credentials files:', formData.credentialsFiles.length);
        formData.credentialsFiles.forEach(file => {
          formDataToSend.append('credentialsFiles', file);
        });
      }
      
      // Append experience files
      if (formData.experience && formData.experience.length > 0) {
        console.log('Appending experience files:', formData.experience.length);
        formData.experience.forEach(file => {
          formDataToSend.append('experience', file);
        });
      }

      console.log('Sending fetch request...');
      const controller = new AbortController();
      const fetchTimeoutId = setTimeout(() => controller.abort(), 180000); // 180 second timeout (3 minutes)
      
      const response = await fetch('/api/send-email-eoi', {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal,
      });
      
      clearTimeout(fetchTimeoutId);

      console.log('Response received:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Expression of Interest submitted successfully!');
      
      // Reset form
      setFormData({
        name: "",
        agencyName: "",
        country: "",
        opportunities: [],
        credentials: "",
        credentialsFiles: [],
        experience: []
      });
      setCountrySearch("");
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle specific abort error
      if (error.name === 'AbortError') {
        toast.error('Request timed out. Please try again or contact support if the issue persists.');
      } else {
        toast.error(error.message || 'Failed to submit Expression of Interest');
      }
    } finally {
      console.log('Form submission completed');
      setIsSubmitting(false);
    }
  };

  const handleOpportunityChange = (opportunity) => {
    setFormData(prev => {
      const opportunities = prev.opportunities.includes(opportunity)
        ? prev.opportunities.filter(opt => opt !== opportunity)
        : prev.opportunities.length < 2
          ? [...prev.opportunities, opportunity]
          : prev.opportunities;
      return { ...prev, opportunities };
    });
  };

  return (
    <>
      <SEO
        title="Expression of Interest | PAAN"
        description="Submit your Expression of Interest for PAAN opportunities"
        keywords="PAAN, Expression of Interest, Opportunities, Advertising, SEO, SAO"
      />
      <main className="min-h-screen bg-gray-50 relative">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#172840] to-[#2A3F5F] pt-40 pb-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Expression Of Interest
            </h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
                A global crypto investment platform is seeking 3 agency partners to support its expansion in Africa. The project focuses on Paid Advertising, SEO, and App Store Optimization across Nigeria, Ghana, Ethiopia, South Africa, and Kenya. 
                Agencies with proven experience in these markets are invited to express interest by submitting relevant portfolios and service capabilities before <span className="font-bold text-[#F25849]">June 19, 10:00 PM EAT</span>.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-200"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="agencyName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Agency Name
                    </label>
                    <input
                      type="text"
                      id="agencyName"
                      value={formData.agencyName}
                      onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-200"
                      required
                      placeholder="Enter your agency name"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                      Country of Operation
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
                        onFocus={() => setShowCountryDropdown(true)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-200"
                        placeholder="Search for your country"
                        required
                      />
                      {showCountryDropdown && (
                        <div className="absolute z-5 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <div
                                key={country}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                                onClick={() => {
                                  setFormData({ ...formData, country });
                                  setCountrySearch(country);
                                  setShowCountryDropdown(false);
                                }}
                              >
                                {country}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500">No countries found</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Choose Opportunities (Select up to 2)
                    </label>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      {["Paid Advertising", "SEO", "SAO"].map((opportunity) => (
                        <label key={opportunity} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
                          <input
                            type="checkbox"
                            checked={formData.opportunities.includes(opportunity)}
                            onChange={() => handleOpportunityChange(opportunity)}
                            className="h-5 w-5 text-[#F25849] focus:ring-[#F25849] border-gray-300 rounded"
                          />
                          <span className="text-gray-700 font-medium">{opportunity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="credentials" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Credentials
                    </label>
                    <textarea
                      id="credentials"
                      value={formData.credentials}
                      onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent transition-all duration-200 mb-4"
                      required
                      placeholder="Describe your relevant credentials and expertise"
                    />
                  </div>

                  <div>
                    <label htmlFor="credentials-files" className="block text-sm font-semibold text-gray-700 mb-2">
                      Credentials Files (Portfolio, Case Studies, etc.) <span className="text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-[#F25849] transition-colors duration-200">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="credentials-files" className="relative cursor-pointer rounded-md font-medium text-[#F25849] hover:text-[#D6473C] focus-within:outline-none">
                            <span>Upload credentials files</span>
                            <input
                              id="credentials-files"
                              name="credentialsFiles"
                              type="file"
                              multiple
                              onChange={(e) => setFormData({ ...formData, credentialsFiles: [...e.target.files] })}
                              className="sr-only"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                        {formData.credentialsFiles.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">Selected credentials files:</p>
                            <ul className="mt-1 text-xs text-gray-500">
                              {Array.from(formData.credentialsFiles).map((file, index) => (
                                <li key={index} className="flex items-center justify-center space-x-2">
                                  <span>{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFiles = Array.from(formData.credentialsFiles);
                                      newFiles.splice(index, 1);
                                      setFormData({ ...formData, credentialsFiles: newFiles });
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    ×
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                      Experience & Portfolio Files <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-[#F25849] transition-colors duration-200">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="experience" className="relative cursor-pointer rounded-md font-medium text-[#F25849] hover:text-[#D6473C] focus-within:outline-none">
                            <span>Upload experience files</span>
                            <input
                              id="experience"
                              name="experience"
                              type="file"
                              multiple
                              onChange={(e) => setFormData({ ...formData, experience: [...e.target.files] })}
                              className="sr-only"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                        {formData.experience && formData.experience.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">Selected experience files:</p>
                            <ul className="mt-1 text-xs text-gray-500">
                              {Array.from(formData.experience).map((file, index) => (
                                <li key={index} className="flex items-center justify-center space-x-2">
                                  <span>{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFiles = Array.from(formData.experience);
                                      newFiles.splice(index, 1);
                                      setFormData({ ...formData, experience: newFiles });
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    ×
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#F25849] text-white px-12 py-4 rounded-full font-semibold text-base transform transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-[#D6473C] hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit'
                  )}
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