import { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import SEO from "@/components/SEO";
import Header from "../layouts/clients-header";
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
      
      <main className="min-h-screen bg-gray-50 relative">
        {/* Hero Section - Moved to top for transparent header */}
        <div className="relative bg-gradient-to-r from-[#F25849] to-[#F2B706] text-white pt-24 pb-16">
          {/* Background Pattern Overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full border border-white/30">
                  <Icon icon="fa-solid:magic" className="w-16 h-16" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                PAAN AI Brief Builder
              </h1>
              <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-8">
                Generate comprehensive, professional creative briefs powered by AI. 
                Get actionable insights and strategic direction in seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-[#F25849]/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon icon="fa-solid:bolt" className="w-10 h-10 text-[#F25849]" />
              </div>
              <h3 className="text-xl font-bold text-[#172840] mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Generate professional briefs in seconds, not hours. Save time and accelerate your creative process.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-[#F2B706]/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon icon="fa-solid:brain" className="w-10 h-10 text-[#F2B706]" />
              </div>
              <h3 className="text-xl font-bold text-[#172840] mb-3">AI-Powered Intelligence</h3>
              <p className="text-gray-600">Leverage advanced AI to create comprehensive briefs with strategic insights and actionable direction.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-[#84C1D9]/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon icon="fa-solid:download" className="w-10 h-10 text-[#84C1D9]" />
              </div>
              <h3 className="text-xl font-bold text-[#172840] mb-3">Easy Export</h3>
              <p className="text-gray-600">Download your briefs as text files, PDFs, or Word documents for seamless sharing with your team.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'form'
                    ? 'bg-[#F25849] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon icon="fa-solid:magic" className="w-5 h-5 inline mr-2" />
                Project Details
              </button>
              {generatedBrief && (
                <button
                  onClick={() => setActiveTab('brief')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'brief'
                      ? 'bg-[#F25849] text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon icon="fa-solid:magic" className="w-5 h-5 inline mr-2" />
                  Generated Brief
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Project Type */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent text-lg"
                      required
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent text-lg"
                      required
                    >
                      <option value="">Select industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Target Audience <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                      placeholder="Describe your target audience (demographics, behaviors, interests, etc.)"
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none text-lg"
                      rows="4"
                      required
                    />
                  </div>

                  {/* Project Goals */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Project Goals <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="projectGoals"
                      value={formData.projectGoals}
                      onChange={handleInputChange}
                      placeholder="What do you want to achieve with this project? (increase brand awareness, drive sales, etc.)"
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none text-lg"
                      rows="4"
                      required
                    />
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent text-lg"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent text-lg"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Additional Details
                    </label>
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleInputChange}
                      placeholder="Any additional context, requirements, or specific details about your project"
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none text-lg"
                      rows="4"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-[#F25849] to-[#F2B706] text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-[#D6473C] hover:to-[#E6A800] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:scale-105"
                  >
                    {isGenerating ? (
                      <>
                        <Icon icon="mdi:loading" className="w-6 h-6 animate-spin" />
                        Generating Brief...
                      </>
                    ) : (
                      <>
                        <Icon icon="fa-solid:magic" className="w-6 h-6" />
                        Generate Creative Brief
                      </>
                    )}
                  </button>
                </form>
              )}

              {activeTab === 'brief' && generatedBrief && (
                <div className="space-y-8">
                  {/* Summary */}
                  <div className="bg-[#84C1D9]/10 p-6 rounded-lg border-l-4 border-[#84C1D9]">
                    <h3 className="font-bold text-[#172840] text-xl mb-3">Brief Summary</h3>
                    <p className="text-gray-700 text-lg">{generatedBrief.summary}</p>
                  </div>

                  {/* Project Details */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-800 text-xl mb-4">Project Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                      <div><strong>Project Type:</strong> {generatedBrief.projectDetails.projectType}</div>
                      <div><strong>Industry:</strong> {generatedBrief.projectDetails.industry}</div>
                      <div><strong>Budget:</strong> {generatedBrief.projectDetails.budget || 'Not specified'}</div>
                      <div><strong>Timeline:</strong> {generatedBrief.projectDetails.timeline || 'Not specified'}</div>
                    </div>
                  </div>

                  {/* Generated Brief */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800 text-xl">Complete Creative Brief</h3>
                      <div className="flex gap-3">
                        <button
                          onClick={() => copyToClipboard(generatedBrief.brief)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Icon icon="mdi:content-copy" className="w-5 h-5" />
                          Copy
                        </button>
                        <div className="relative group">
                          <button
                            type="button"
                            className="px-4 py-2 bg-[#F2B706] hover:bg-[#E6A800] text-white rounded-lg transition-colors flex items-center gap-2 focus:outline-none"
                          >
                            <Icon icon="mdi:download" className="w-5 h-5" />
                            Export
                          </button>
                          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 z-10">
                            <button
                              onClick={downloadBrief}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-800"
                            >
                              <Icon icon="mdi:file-document-outline" className="w-5 h-5" />
                              Export as TXT
                            </button>
                            <button
                              onClick={exportAsPDF}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-800"
                            >
                              <Icon icon="mdi:file-pdf-box" className="w-5 h-5 text-red-500" />
                              Export as PDF
                            </button>
                            <button
                              onClick={exportAsWord}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-800"
                            >
                              <Icon icon="mdi:file-word-box" className="w-5 h-5 text-blue-500" />
                              Export as Word
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-lg text-gray-800 font-sans leading-relaxed">
                        {generatedBrief.brief}
                      </pre>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
                    >
                      Create New Brief
                    </button>
                    <button
                      onClick={() => setActiveTab('form')}
                      className="flex-1 bg-[#172840] text-white py-3 px-6 rounded-lg hover:bg-[#0F1A2A] transition-colors text-lg font-medium"
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