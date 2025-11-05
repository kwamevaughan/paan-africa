import { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import SEO from "@/components/SEO";
import Header from "@/layouts/standard-header";
import Footer from "@/layouts/footer";
import ScrollToTop from "@/components/ScrollToTop";
import AIBusinessPlanGenerator from "@/components/AIBusinessPlanGenerator";

const AIBusinessPlanGeneratorPage = () => {
  return (
    <>
      <SEO
        title="PAAN FREE AI Business Plan Generator | Create Professional Business Plans Instantly"
        description="Generate comprehensive, investor-ready business plans in seconds with PAAN's free AI-powered business plan generator. Perfect for entrepreneurs, startups, and businesses across Africa."
        keywords="AI business plan generator, professional business plans, business plan template, startup business plan, PAAN AI tools, African business tools, free business plan generator, investor-ready business plan"
      />

      <Header navLinkColor="text-white" />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
        {/* Hero Section */}
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
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Icon icon="fa-solid:briefcase" className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                Generate <span className='text-paan-red'>Professional Business Plans</span> in <span className='text-paan-yellow'>Seconds</span>
              </h1>
              <p className="text-md md:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
                Create comprehensive, investor-ready business plans with AI. Perfect for entrepreneurs,<br/> startups, and businesses across Africa.
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
          <AIBusinessPlanGenerator />
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Use Our AI Business Plan Generator?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to create a professional, comprehensive business plan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-[#F25849]/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Icon icon="fa-solid:file-alt" className="w-8 h-8 text-[#F25849]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Comprehensive Structure</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get a complete business plan with all essential sections including executive summary, market analysis, financial projections, and more.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-[#F2B706]/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Icon icon="fa-solid:rocket" className="w-8 h-8 text-[#F2B706]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Investor-Ready</h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate professional business plans that are ready to present to investors, banks, and stakeholders.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-[#84C1D9]/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Icon icon="fa-solid:clock" className="w-8 h-8 text-[#84C1D9]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Save Time</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create a comprehensive business plan in minutes instead of days. Focus on your business while AI handles the documentation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
};

export default AIBusinessPlanGeneratorPage;

