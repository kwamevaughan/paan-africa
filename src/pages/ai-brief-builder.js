import { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import SEO from "@/components/SEO";
import Header from "@/layouts/standard-header";
import Footer from "@/layouts/footer";
import ScrollToTop from "@/components/ScrollToTop";
import jsPDF from 'jspdf';

const AIBriefBuilderPage = () => {
  const [formData, setFormData] = useState({
    projectType: '',
    industry: '',
    targetAudience: '',
    projectGoals: '',
    budget: '',
    timeline: '',
    additionalDetails: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState(null);
  const [activeTab, setActiveTab] = useState('form');

  const projectTypes = [
    'Brand Identity & Logo Design',
    'Digital Marketing Campaign',
    'Social Media Strategy',
    'Website Design & Development',
    'Content Marketing',
    'Video Production',
    'Print Advertising',
    'Event Marketing',
    'PR & Communications',
    'Market Research',
    'Product Launch',
    'Rebranding',
    'Other'
  ];

  const industries = [
    'Technology & SaaS',
    'Financial Services',
    'Healthcare',
    'Education',
    'E-commerce & Retail',
    'Food & Beverage',
    'Fashion & Beauty',
    'Real Estate',
    'Travel & Tourism',
    'Non-profit',
    'Manufacturing',
    'Entertainment & Media',
    'Automotive',
    'Energy & Utilities',
    'Other'
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'Not specified'
  ];

  const timelineOptions = [
    '1-2 weeks',
    '3-4 weeks',
    '1-2 months',
    '3-6 months',
    '6+ months',
    'Not specified'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.projectType || !formData.industry || !formData.targetAudience || !formData.projectGoals) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('Generating your creative brief...');

    try {
      const response = await fetch('/api/ai-brief-builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedBrief(data);
        setActiveTab('brief');
        toast.success('Brief generated successfully!', { id: toastId });
      } else {
        throw new Error(data.message || 'Failed to generate brief');
      }
    } catch (error) {
      console.error('Error generating brief:', error);
      toast.error(error.message || 'Failed to generate brief. Please try again.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      projectType: '',
      industry: '',
      targetAudience: '',
      projectGoals: '',
      budget: '',
      timeline: '',
      additionalDetails: ''
    });
    setGeneratedBrief(null);
    setActiveTab('form');
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadBrief = () => {
    if (!generatedBrief) return;

    const content = `PAAN AI Creative Brief

Project Details:
- Project Type: ${generatedBrief.projectDetails.projectType}
- Industry: ${generatedBrief.projectDetails.industry}
- Target Audience: ${generatedBrief.projectDetails.targetAudience}
- Project Goals: ${generatedBrief.projectDetails.projectGoals}
- Budget: ${generatedBrief.projectDetails.budget || 'Not specified'}
- Timeline: ${generatedBrief.projectDetails.timeline || 'Not specified'}

Generated on: ${new Date(generatedBrief.timestamp).toLocaleDateString()}

${generatedBrief.brief}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PAAN_Creative_Brief_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = () => {
    if (!generatedBrief) return;
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 10;

    doc.setFontSize(16);
    doc.text('PAAN AI Creative Brief', 10, y);
    y += lineHeight * 2;

    doc.setFontSize(12);
    doc.text('Project Details:', 10, y);
    y += lineHeight;
    doc.text(`- Project Type: ${generatedBrief.projectDetails.projectType}`, 10, y);
    y += lineHeight;
    doc.text(`- Industry: ${generatedBrief.projectDetails.industry}`, 10, y);
    y += lineHeight;
    doc.text(`- Target Audience: ${generatedBrief.projectDetails.targetAudience}`, 10, y);
    y += lineHeight;
    doc.text(`- Project Goals: ${generatedBrief.projectDetails.projectGoals}`, 10, y);
    y += lineHeight;
    doc.text(`- Budget: ${generatedBrief.projectDetails.budget || 'Not specified'}`, 10, y);
    y += lineHeight;
    doc.text(`- Timeline: ${generatedBrief.projectDetails.timeline || 'Not specified'}`, 10, y);
    y += lineHeight * 2;
    doc.text(`Generated on: ${new Date(generatedBrief.timestamp).toLocaleDateString()}`, 10, y);
    y += lineHeight * 2;

    // Split the brief into lines that fit the page width
    const briefLines = doc.splitTextToSize(generatedBrief.brief, 180);
    doc.text(briefLines, 10, y);

    doc.save(`PAAN_Creative_Brief_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportAsWord = () => {
    if (!generatedBrief) return;
    // Simple Word export using Blob
    const content = `PAAN AI Creative Brief\n\nProject Details:\n- Project Type: ${generatedBrief.projectDetails.projectType}\n- Industry: ${generatedBrief.projectDetails.industry}\n- Target Audience: ${generatedBrief.projectDetails.targetAudience}\n- Project Goals: ${generatedBrief.projectDetails.projectGoals}\n- Budget: ${generatedBrief.projectDetails.budget || 'Not specified'}\n- Timeline: ${generatedBrief.projectDetails.timeline || 'Not specified'}\n\nGenerated on: ${new Date(generatedBrief.timestamp).toLocaleDateString()}\n\n${generatedBrief.brief}`;
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PAAN_Creative_Brief_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO
        title="PAAN AI Brief Builder | Generate Professional Creative Briefs"
        description="Use PAAN's AI-powered brief builder to generate comprehensive, professional creative briefs in seconds. Streamline your creative process with our intelligent brief generator."
        keywords="AI brief builder, creative brief generator, marketing brief, project brief, PAAN AI tools"
      />

      <Header navLinkColor="text-white" />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
        {/* Hero Section - Moved to top for transparent header */}
        <div className="relative bg-paan-dark-blue text-white pt-24 pb-16 overflow-hidden z-10">
          {/* Background Pattern Overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-8">
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  Create Your <span className='text-paan-red'>Project Brief</span> in <span className='text-paan-yellow'>Minutes</span>
              </h1>
              <p className="text-md md:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
                Just answer a few quick questions and get a professional brief you<br/> can download and share instantly.
              </p>
            </div>
          </div>
        </div>

        {/* AI Bot Image between hero and main content */}
        <div className="mx-auto max-w-full md:max-w-5xl flex justify-start md:justify-left -mt-24 md:-mt-40 relative z-20 px-4 md:px-0">
          <Image
            src="/assets/images/ai-bot.svg"
            width={220}
            height={220}
            alt="PAAN AI Bot"
            className="drop-shadow-xl w-[120px] h-[120px] md:w-[220px] md:h-[220px]"
          />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-full md:max-w-5xl px-2 md:px-4 mb-10 md:mb-20 mt-2 md:mt-4">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
            {/* Tabs */}
            <div className="flex flex-col md:flex-row border-b border-gray-100">
              <button
                onClick={() => setActiveTab("form")}
                className={`flex-1 py-4 md:py-6 px-4 md:px-8 text-left transition-all duration-300 cursor-default ${
                  activeTab === "form"
                    ? "bg-paan-blue text-paan-dark-blue shadow-lg"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <h4 className='font-semibold'>Let's Start With the Basics</h4>
                <p className='font-light text-sm'>Tell us a little about your project so we can guide the rest.</p>
              </button>
              {generatedBrief && (
                <button
                  onClick={() => setActiveTab("brief")}
                  className={`flex-1 py-4 md:py-6 px-4 md:px-8 text-center font-semibold text-base md:text-lg transition-all duration-300 ${
                    activeTab === "brief"
                      ? "bg-gradient-to-r from-paan-red to-paan-yellow text-white shadow-lg"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  <Icon
                    icon="fa-solid:file-alt"
                    className="w-5 h-5 md:w-6 md:h-6 inline mr-3"
                  />
                  Generated Brief
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-4 md:p-12">
              {activeTab === "form" && (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                  {/* Project Type */}
                  <div className="relative group">
                    <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                      Project Type <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none text-base md:text-md bg-white transition-all duration-300 appearance-none  hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        required
                      >
                        <option value="">Choose your project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <Icon
                        icon="fa-solid:chevron-down"
                        className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="relative group">
                    <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                      Industry <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F2B706]/20 focus:border-[#F2B706] focus:outline-none text-base md:text-md bg-white transition-all duration-300 appearance-none hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        required
                      >
                        <option value="">Select your industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                      <Icon
                        icon="fa-solid:chevron-down"
                        className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="relative group">
                    <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                      Target Audience{" "}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                      placeholder="Describe your target audience (demographics, behaviors, interests, etc.)"
                      className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#84C1D9]/20 focus:border-[#84C1D9] focus:outline-none resize-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl min-h-[120px]"
                      rows="4"
                      required
                    />
                  </div>

                  {/* Project Goals */}
                  <div className="relative group">
                    <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                      Project Goals <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      name="projectGoals"
                      value={formData.projectGoals}
                      onChange={handleInputChange}
                      placeholder="What do you want to achieve with this project? (increase brand awareness, drive sales, etc.)"
                      className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none resize-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl min-h-[120px]"
                      rows="4"
                      required
                    />
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="relative group">
                      <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                        Budget Range
                      </label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F2B706]/20 focus:border-[#F2B706] focus:outline-none text-base md:text-md bg-white transition-all duration-300 appearance-none hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                        <Icon
                          icon="fa-solid:chevron-down"
                          className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                        Timeline
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#84C1D9]/20 focus:border-[#84C1D9] focus:outline-none text-base md:text-md bg-white transition-all duration-300 appearance-none hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl"
                        >
                          <option value="">Select timeline</option>
                          {timelineOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <Icon
                          icon="fa-solid:chevron-down"
                          className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="relative group">
                    <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4 flex items-center">
                      Additional Details
                    </label>
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleInputChange}
                      placeholder="Any additional context, requirements, or specific details about your project"
                      className="w-full px-4 md:px-6 py-3 md:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#F25849]/20 focus:border-[#F25849] focus:outline-none resize-none text-base md:text-md bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg group-hover:shadow-xl min-h-[120px]"
                      rows="4"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 md:pt-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-start">
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full md:w-auto bg-paan-red text-white py-3 md:py-4 px-6 rounded-full font-semibold hover:from-[#D6473C] hover:via-[#E6A800] hover:to-[#6BA8C4] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transform active:scale-[0.98]"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating Brief...
                        </>
                      ) : (
                        <>
                          <Icon
                            icon="mingcute:ai-fill"
                            className="w-8 h-8 animate-pulse"
                          />
                          Generate Creative Brief
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "brief" && generatedBrief && (
                <div className="space-y-10">
                  {/* Summary */}
                  <div className="bg-gradient-to-r from-[#84C1D9]/10 to-[#84C1D9]/5 p-8 rounded-2xl border-l-4 border-[#84C1D9] shadow-lg">
                    <h3 className="font-bold text-[#172840] text-2xl mb-4 flex items-center">
                      <Icon
                        icon="fa-solid:lightbulb"
                        className="w-7 h-7 mr-3 text-[#84C1D9]"
                      />
                      Brief Summary
                    </h3>
                    <p className="text-gray-700 text-xl leading-relaxed">
                      {generatedBrief.summary}
                    </p>
                  </div>

                  {/* Project Details */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-2xl mb-6 flex items-center">
                      <Icon
                        icon="fa-solid:clipboard-list"
                        className="w-7 h-7 mr-3 text-[#F25849]"
                      />
                      Project Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
                      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <Icon
                          icon="fa-solid:project-diagram"
                          className="w-6 h-6 mr-3 text-[#F25849]"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Project Type
                          </div>
                          <div className="text-gray-600">
                            {generatedBrief.projectDetails.projectType}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <Icon
                          icon="fa-solid:industry"
                          className="w-6 h-6 mr-3 text-[#F2B706]"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Industry
                          </div>
                          <div className="text-gray-600">
                            {generatedBrief.projectDetails.industry}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <Icon
                          icon="fa-solid:dollar-sign"
                          className="w-6 h-6 mr-3 text-[#F2B706]"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Budget
                          </div>
                          <div className="text-gray-600">
                            {generatedBrief.projectDetails.budget ||
                              "Not specified"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <Icon
                          icon="fa-solid:clock"
                          className="w-6 h-6 mr-3 text-[#84C1D9]"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Timeline
                          </div>
                          <div className="text-gray-600">
                            {generatedBrief.projectDetails.timeline ||
                              "Not specified"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Generated Brief */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-800 text-2xl flex items-center">
                        <Icon
                          icon="fa-solid:file-alt"
                          className="w-7 h-7 mr-3 text-[#F25849]"
                        />
                        Complete Creative Brief
                      </h3>
                      <div className="flex gap-4">
                        <button
                          onClick={() => copyToClipboard(generatedBrief.brief)}
                          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
                        >
                          <Icon icon="mdi:content-copy" className="w-5 h-5" />
                          Copy
                        </button>
                        <div className="relative group">
                          <button
                            type="button"
                            className="px-6 py-3 bg-gradient-to-r from-[#F2B706] to-[#E6A800] hover:from-[#E6A800] hover:to-[#D99A00] text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
                          >
                            <Icon icon="mdi:download" className="w-5 h-5" />
                            Export
                          </button>
                          <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-all duration-300 z-10 transform scale-95 group-hover:scale-100">
                            <button
                              onClick={downloadBrief}
                              className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-3 text-gray-800 transition-colors duration-200 rounded-t-xl"
                            >
                              <Icon
                                icon="mdi:file-document-outline"
                                className="w-5 h-5"
                              />
                              Export as TXT
                            </button>
                            <button
                              onClick={exportAsPDF}
                              className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-3 text-gray-800 transition-colors duration-200"
                            >
                              <Icon
                                icon="mdi:file-pdf-box"
                                className="w-5 h-5 text-red-500"
                              />
                              Export as PDF
                            </button>
                            <button
                              onClick={exportAsWord}
                              className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-3 text-gray-800 transition-colors duration-200 rounded-b-xl"
                            >
                              <Icon
                                icon="mdi:file-word-box"
                                className="w-5 h-5 text-blue-500"
                              />
                              Export as Word
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-4 md:p-8 rounded-2xl max-h-96 overflow-y-auto overflow-x-auto shadow-lg border border-gray-100">
                      <pre className="whitespace-pre-wrap text-base md:text-xl text-gray-800 font-sans leading-relaxed">
                        {generatedBrief.brief}
                      </pre>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-6 md:pt-8">
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 md:py-4 px-6 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-base md:text-xl font-semibold shadow-lg hover:shadow-xl"
                    >
                      Create New Brief
                    </button>
                    <button
                      onClick={() => setActiveTab("form")}
                      className="flex-1 bg-gradient-to-r from-[#172840] to-[#0F1A2A] text-white py-3 md:py-4 px-6 rounded-2xl hover:from-[#0F1A2A] hover:to-[#172840] transition-all duration-300 text-base md:text-xl font-semibold shadow-lg hover:shadow-xl"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
};

export default AIBriefBuilderPage; 