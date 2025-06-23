import { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const AIBriefBuilder = () => {
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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F25849] to-[#F2B706] p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Icon icon="fa-solid:magic" className="w-8 h-8" />
          <h2 className="text-2xl font-bold">PAAN AI Brief Builder</h2>
        </div>
        <p className="text-white/90">
          Generate comprehensive creative briefs powered by AI. Get professional, actionable briefs in seconds.
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
          <Icon icon="fa-solid:magic" className="w-5 h-5 inline mr-2" />
          Project Details
        </button>
        {generatedBrief && (
          <button
            onClick={() => setActiveTab('brief')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
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
      <div className="p-6">
        {activeTab === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type <span className="text-red-500">*</span>
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
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

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience <span className="text-red-500">*</span>
              </label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Describe your target audience (demographics, behaviors, interests, etc.)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none"
                rows="3"
                required
              />
            </div>

            {/* Project Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Goals <span className="text-red-500">*</span>
              </label>
              <textarea
                name="projectGoals"
                value={formData.projectGoals}
                onChange={handleInputChange}
                placeholder="What do you want to achieve with this project? (increase brand awareness, drive sales, etc.)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none"
                rows="3"
                required
              />
            </div>

            {/* Budget and Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleInputChange}
                placeholder="Any additional context, requirements, or specific details about your project"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25849] focus:border-transparent resize-none"
                rows="3"
              />
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
                  Generating Brief...
                </>
              ) : (
                <>
                  <Icon icon="fa-solid:magic" className="w-5 h-5" />
                  Generate Creative Brief
                </>
              )}
            </button>
          </form>
        )}

        {activeTab === 'brief' && generatedBrief && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-[#84C1D9]/10 p-4 rounded-lg border-l-4 border-[#84C1D9]">
              <h3 className="font-semibold text-[#172840] mb-2">Brief Summary</h3>
              <p className="text-gray-700">{generatedBrief.summary}</p>
            </div>

            {/* Project Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><strong>Project Type:</strong> {generatedBrief.projectDetails.projectType}</div>
                <div><strong>Industry:</strong> {generatedBrief.projectDetails.industry}</div>
                <div><strong>Budget:</strong> {generatedBrief.projectDetails.budget || 'Not specified'}</div>
                <div><strong>Timeline:</strong> {generatedBrief.projectDetails.timeline || 'Not specified'}</div>
              </div>
            </div>

            {/* Generated Brief */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Complete Creative Brief</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(generatedBrief.brief)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1"
                  >
                    <Icon icon="mdi:content-copy" className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={downloadBrief}
                    className="px-3 py-1 text-sm bg-[#F2B706] hover:bg-[#E6A800] text-white rounded-md transition-colors flex items-center gap-1"
                  >
                    <Icon icon="mdi:download" className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {generatedBrief.brief}
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Create New Brief
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

export default AIBriefBuilder; 