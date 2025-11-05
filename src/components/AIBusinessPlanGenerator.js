import { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

const AIBusinessPlanGenerator = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    industry: '',
    location: '',
    businessDescription: '',
    targetMarket: '',
    valueProposition: '',
    businessModel: '',
    competition: '',
    competitiveAdvantage: '',
    startupCosts: '',
    revenueProjections: '',
    fundingNeeds: '',
    marketingStrategy: '',
    operationsPlan: '',
    managementTeam: '',
    goals: '',
    timeline: '',
    additionalDetails: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('form');
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'Limited Liability Company (LLC)',
    'Corporation',
    'Non-profit',
    'Cooperative',
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
    'Agriculture',
    'Manufacturing',
    'Entertainment & Media',
    'Automotive',
    'Energy & Utilities',
    'Creative & Advertising',
    'Consulting',
    'Other'
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
    
    if (!formData.businessName || !formData.industry || !formData.businessDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('Generating your professional business plan...');

    try {
      const response = await fetch('/api/ai-business-plan-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedPlan(data);
        setActiveTab('plan');
        toast.success('Business plan generated successfully!', { id: toastId });
      } else {
        throw new Error(data.message || 'Failed to generate business plan');
      }
    } catch (error) {
      console.error('Error generating business plan:', error);
      toast.error(error.message || 'Failed to generate business plan. Please try again.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      businessName: '',
      businessType: '',
      industry: '',
      location: '',
      businessDescription: '',
      targetMarket: '',
      valueProposition: '',
      businessModel: '',
      competition: '',
      competitiveAdvantage: '',
      startupCosts: '',
      revenueProjections: '',
      fundingNeeds: '',
      marketingStrategy: '',
      operationsPlan: '',
      managementTeam: '',
      goals: '',
      timeline: '',
      additionalDetails: ''
    });
    setGeneratedPlan(null);
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

  const downloadPlan = () => {
    if (!generatedPlan) return;

    const content = `PAAN AI Generated Business Plan

Business: ${generatedPlan.planDetails.businessName}
Industry: ${generatedPlan.planDetails.industry}
Generated on: ${new Date(generatedPlan.timestamp).toLocaleDateString()}

${generatedPlan.businessPlan}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PAAN_BusinessPlan_${formData.businessName || 'BusinessPlan'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = () => {
    if (!generatedPlan) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    const lineHeight = 7;
    let y = margin;

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredSpace) => {
      if (y + requiredSpace > pageHeight - margin) {
        doc.addPage();
        y = margin;
        return true;
      }
      return false;
    };

    // Helper function to add text with wrapping
    const addText = (text, fontSize, isBold = false, align = 'left') => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? 'bold' : 'normal');
      const lines = doc.splitTextToSize(text, maxWidth);
      checkPageBreak(lines.length * lineHeight);
      doc.text(lines, align === 'center' ? pageWidth / 2 : margin, y, { align, maxWidth });
      y += lines.length * lineHeight + 2;
    };

    // Title
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('BUSINESS PLAN', pageWidth / 2, y, { align: 'center' });
    y += lineHeight * 2;

    // Business Information Header
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(generatedPlan.planDetails.businessName || 'Business Name', pageWidth / 2, y, { align: 'center' });
    y += lineHeight;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Industry: ${generatedPlan.planDetails.industry}`, pageWidth / 2, y, { align: 'center' });
    y += lineHeight;
    if (generatedPlan.planDetails.location && generatedPlan.planDetails.location !== 'Not specified') {
      doc.text(`Location: ${generatedPlan.planDetails.location}`, pageWidth / 2, y, { align: 'center' });
      y += lineHeight;
    }
    y += lineHeight;

    // Parse the business plan text and add sections
    const planText = generatedPlan.businessPlan;
    const lines = planText.split('\n');
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines but add small spacing
      if (!trimmedLine) {
        y += lineHeight * 0.3;
        return;
      }

      // Detect section headers (numbered sections like "1. EXECUTIVE SUMMARY" or all caps headers)
      const isNumberedSection = /^\d+\.\s+[A-Z]/.test(trimmedLine);
      const isAllCapsHeader = /^[A-Z\s]{5,}$/.test(trimmedLine) && trimmedLine.length < 60 && !trimmedLine.includes('│');
      
      if (isNumberedSection || isAllCapsHeader) {
        // Add spacing before section headers (except first one)
        if (index > 0) {
          checkPageBreak(lineHeight * 3);
          y += lineHeight;
        }
        addText(trimmedLine, 14, true);
        // Add underline for section headers
        checkPageBreak(lineHeight);
        doc.line(margin, y - lineHeight, pageWidth - margin, y - lineHeight);
        y += lineHeight * 0.5;
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        // Bold text (markdown style)
        const cleanText = trimmedLine.replace(/\*\*/g, '');
        checkPageBreak(lineHeight * 1.5);
        addText(cleanText, 11, true);
      } else if (trimmedLine.startsWith('┌') || trimmedLine.startsWith('│') || trimmedLine.startsWith('└') || trimmedLine.startsWith('╔') || trimmedLine.startsWith('║') || trimmedLine.startsWith('╚')) {
        // Skip ASCII art boxes
        return;
      } else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
        // Bullet points
        const cleanText = trimmedLine.replace(/^[-•]\s*/, '• ');
        checkPageBreak(lineHeight);
        addText(cleanText, 10, false);
      } else {
        // Regular text
        const cleanText = trimmedLine.replace(/\*\*/g, '').replace(/^[-•]\s*/, '');
        checkPageBreak(lineHeight);
        addText(cleanText, 10, false);
      }
    });

    // Add footer on all pages
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setTextColor(128, 128, 128);
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text(
        `Generated with PAAN AI Business Plan Generator | paan.africa | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Save the PDF
    const fileName = `PAAN_BusinessPlan_${formData.businessName || 'BusinessPlan'}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    toast.success('Business plan exported as PDF!');
  };

  const handleExport = (type) => {
    setShowExportDropdown(false);
    if (type === 'pdf') {
      exportAsPDF();
    } else if (type === 'word') {
      toast('Export to Word coming soon!');
    } else if (type === 'txt') {
      downloadPlan();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F25849] to-[#F2B706] p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Icon icon="fa-solid:briefcase" className="w-8 h-8" />
          <h2 className="text-2xl font-bold">PAAN AI Business Plan Generator</h2>
        </div>
        <p className="text-white/90">
          Generate comprehensive business plans powered by AI. Create professional, investor-ready business plans in seconds.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
            activeTab === 'form'
              ? 'bg-[#F25849] text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon icon="fa-solid:edit" className="w-5 h-5 inline mr-2" />
          Business Details
        </button>
        {generatedPlan && (
          <button
            onClick={() => setActiveTab('plan')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'plan'
                ? 'bg-[#F25849] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon icon="fa-solid:file-alt" className="w-5 h-5 inline mr-2" />
            Generated Plan
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Business Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:building" className="w-5 h-5 mr-2 text-[#F25849]" />
                Basic Business Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none"
                  rows="4"
                  placeholder="Describe what your business does, its mission, and vision"
                  required
                />
              </div>
            </div>

            {/* Value Proposition & Business Model */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:lightbulb" className="w-5 h-5 mr-2 text-[#84C1D9]" />
                Value Proposition & Business Model
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value Proposition
                  </label>
                  <textarea
                    name="valueProposition"
                    value={formData.valueProposition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent resize-none"
                    rows="3"
                    placeholder="What unique value does your business provide to customers?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Model
                  </label>
                  <textarea
                    name="businessModel"
                    value={formData.businessModel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#84C1D9] focus:border-transparent resize-none"
                    rows="3"
                    placeholder="How does your business make money?"
                  />
                </div>
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:chart-line" className="w-5 h-5 mr-2 text-[#F2B706]" />
                Market Analysis
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Market
                  </label>
                  <textarea
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2B706] focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Who are your target customers? Describe demographics, psychographics, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Competition
                  </label>
                  <textarea
                    name="competition"
                    value={formData.competition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2B706] focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Who are your main competitors? What are their strengths and weaknesses?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Competitive Advantage
                  </label>
                  <textarea
                    name="competitiveAdvantage"
                    value={formData.competitiveAdvantage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2B706] focus:border-transparent resize-none"
                    rows="3"
                    placeholder="What makes your business unique? Why will customers choose you?"
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:dollar-sign" className="w-5 h-5 mr-2 text-green-600" />
                Financial Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Startup Costs
                  </label>
                  <textarea
                    name="startupCosts"
                    value={formData.startupCosts}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Initial investment required, equipment, inventory, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Revenue Projections
                  </label>
                  <textarea
                    name="revenueProjections"
                    value={formData.revenueProjections}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Expected revenue for first year, growth projections, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funding Needs
                  </label>
                  <textarea
                    name="fundingNeeds"
                    value={formData.fundingNeeds}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="How much funding do you need? What will it be used for?"
                  />
                </div>
              </div>
            </div>

            {/* Strategy & Operations */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:cogs" className="w-5 h-5 mr-2 text-purple-600" />
                Strategy & Operations
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marketing Strategy
                  </label>
                  <textarea
                    name="marketingStrategy"
                    value={formData.marketingStrategy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="How will you market your business? Marketing channels, strategies, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operations Plan
                  </label>
                  <textarea
                    name="operationsPlan"
                    value={formData.operationsPlan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Day-to-day operations, processes, suppliers, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Management Team
                  </label>
                  <textarea
                    name="managementTeam"
                    value={formData.managementTeam}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Key team members, their roles, experience, and qualifications"
                  />
                </div>
              </div>
            </div>

            {/* Goals & Timeline */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon icon="fa-solid:flag-checkered" className="w-5 h-5 mr-2 text-gray-600" />
                Goals & Timeline
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goals & Objectives
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Short-term and long-term business goals"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <textarea
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Launch timeline, milestones, key dates"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Any other important information about your business"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-[#F25849] text-white py-3 px-6 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                  Generating Business Plan...
                </>
              ) : (
                <>
                  <Icon icon="fa-solid:briefcase" className="w-5 h-5" />
                  Generate Professional Business Plan
                </>
              )}
            </button>
          </form>
        )}

        {activeTab === 'plan' && generatedPlan && (
          <div className="space-y-6">
            {/* Plan Summary */}
            <div className="bg-[#84C1D9]/10 p-4 rounded-lg border-l-4 border-[#84C1D9]">
              <h3 className="font-semibold text-[#172840] mb-2">Business Plan Summary</h3>
              <p className="text-gray-700">{generatedPlan.summary}</p>
            </div>

            {/* Plan Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Plan Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><strong>Business:</strong> {generatedPlan.planDetails.businessName}</div>
                <div><strong>Industry:</strong> {generatedPlan.planDetails.industry}</div>
                <div><strong>Location:</strong> {generatedPlan.planDetails.location || 'Not specified'}</div>
                <div><strong>Generated:</strong> {new Date(generatedPlan.timestamp).toLocaleDateString()}</div>
              </div>
            </div>

            {/* Generated Business Plan */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Complete Business Plan</h3>
                <div className="flex gap-2 relative">
                  <button
                    onClick={() => copyToClipboard(generatedPlan.businessPlan)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1"
                  >
                    <Icon icon="mdi:content-copy" className="w-4 h-4" />
                    Copy
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowExportDropdown((prev) => !prev)}
                      className="px-3 py-1 text-sm bg-[#F2B706] hover:bg-[#E6A800] text-white rounded-md transition-colors flex items-center gap-1"
                    >
                      <Icon icon="mdi:download" className="w-4 h-4" />
                      Export
                      <Icon icon="mdi:chevron-down" className="w-4 h-4 ml-1" />
                    </button>
                    {showExportDropdown && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => handleExport('pdf')}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          PDF
                        </button>
                        <button
                          onClick={() => handleExport('word')}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Word
                        </button>
                        <button
                          onClick={() => handleExport('txt')}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          TXT
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {generatedPlan.businessPlan}
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Create New Plan
              </button>
              <button
                onClick={() => setActiveTab('form')}
                className="flex-1 bg-[#172840] text-white py-2 px-4 rounded-lg hover:bg-[#0F1A2A] transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBusinessPlanGenerator;

