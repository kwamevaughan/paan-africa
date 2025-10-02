import { useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Header from "@/layouts/standard-header";
import Footer from "@/layouts/footer";

const MasterclassDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedPricing, setSelectedPricing] = useState('member');
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
    organization: ''
  });

  // Masterclasses data - this would come from your database
  const masterclasses = {
    1: {
      id: 1,
      title: "Bid to Win: The Agency Masterclass on Tenders & RFPs",
      description: "For agencies in Africa, tendering and responding to RFPs can be game-changing pathways to winning bigger clients, securing multi-year contracts, and proving credibility in a competitive marketplace.",
      fullDescription: "This 2.5-hour intensive masterclass, hosted by PAAN, is designed to equip agencies with the clarity, strategy, and confidence to master tendering and RFP responses — turning what feels like a complex process into a repeatable business growth engine.",
      format: "2.5-Hour Live Interactive Masterclass",
      date: "November 25th, 2025",
      time: "2 pm EAT",
      memberPrice: 60,
      nonMemberPrice: 80,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      image: "/assets/images/masterclass/bid-t0-win.webp",
      instructor: {
        name: "Ms. Muthoni",
        title: "Procurement Specialist with 14+ years experience",
        bio: "Ms. Muthoni is a seasoned Procurement Specialist with over 14 years experience in senior managerial roles spanning the private sector, foundations, and international non-governmental organizations.",
        expertise: [
          "Procurement Systems",
          "Tender Evaluation",
          "Compliance & Risk Management",
          "Contract Management"
        ]
      },
      benefits: [
        "5% off on PAAN Summit 2026 tickets",
        "10% off Africa Creative Excellence Awards entry"
      ],
      whoShouldAttend: [
        "Agency founders & partners",
        "Finance managers & business leads",
        "Account directors & business development leads",
        "HR & operations managers in agencies"
      ],
      learningOutcomes: [
        "Understanding Tendering Basics – breaking down the language and flow of tenders and RFPs",
        "Finding the Right Tenders – identifying opportunities aligned with your agency's strengths",
        "Analyzing Tender Documents – extracting critical client needs and evaluation criteria",
        "Planning Your Bid Response – structuring clear, strategic, and compelling responses",
        "Compliance and Documentation – avoiding common mistakes that instantly disqualify bids",
        "Writing a Winning Proposal – positioning your agency as the obvious choice",
        "Pricing Strategies – being competitive without undercutting your value",
        "Post-Submission Process – engaging with clients and staying visible beyond submission"
      ],
      whyAttend: [
        "Business Growth Advantage: Learn how to consistently win bigger contracts and diversify revenue streams",
        "Agency-Specific Focus: Tailored to the realities of African agencies competing in local and cross-border markets",
        "Hands-On Learning: Practical frameworks, checklists, and examples you can apply immediately",
        "Expert Guidance: Delivered by seasoned practitioners with proven success in winning tenders and RFPs across Africa"
      ],
      outcome: "By the end of this session, agencies will have a clear roadmap to confidently approach tenders and RFPs, improve win rates, and embed tendering into their long-term growth strategy.",
      status: "upcoming"
    },
    2: {
      id: 2,
      title: "Managing Challenging Clients",
      description: "Managing client relationships is at the heart of every successful agency. Yet, even the most seasoned teams encounter difficult clients, shifting expectations, or tense conversations — especially in today's fast-paced hybrid and remote work environments.",
      fullDescription: "This masterclass is designed to equip agency professionals with practical, proven strategies to turn challenging client situations into opportunities for stronger partnerships and long-term retention. Through interactive exercises, real-world scenarios, and expert insights, participants will walk away with a refreshed toolkit for handling difficult conversations, building trust, and maintaining healthy client relationships.",
      format: "90-minute Interactive Training Course",
      date: "October 15th, 2025",
      time: "10 am GMT / 12 pm EAT",
      memberPrice: 174,
      nonMemberPrice: 250,
      currency: "USD",
      category: "Client Management",
      level: "All Levels",
      image: "/assets/images/masterclass/challenging-clients.webp",
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      instructor: {
        name: "Niki Hurst Smith",
        title: "HR Consultant & Former Agency Leader with 15+ years experience",
        bio: "Niki Hurst Smith spent 15+ years working in a number of highly regarded independent agencies servicing a range of blue chip clients and managing large teams. After this Niki transferred into senior positions within the People Team at two highly regarded agencies. For the last 10 years Niki set up her own consultancy supporting agency and business leaders to create an environment where high performing teams can deliver exceptional work, grow the business and build healthy, happy teams balancing her HR expertise with her knowledge and experience of working as a senior client handler.",
        expertise: [
          "Client Relationship Management",
          "Team Leadership & Development",
          "HR Consulting",
          "Agency Operations"
        ]
      },
      benefits: [
        "5% off on PAAN Summit 2026 tickets",
        "6% off Africa Creative Excellence Awards entry"
      ],
      whoShouldAttend: [
        "Client-facing professionals in agencies",
        "Junior to mid-level staff who interact directly with clients",
        "Agency leaders and managers",
        "Account managers and project managers"
      ],
      learningOutcomes: [
        "Raising the Standard: What clients truly expect from agencies and how to consistently exceed those expectations",
        "Decoding Difficult Clients: Why some clients seem challenging and how to identify underlying causes",
        "Client-Centric Thinking: Practical frameworks for uncovering what clients really need (not just what they say)",
        "Turning Tension into Trust: Approaches for navigating tough conversations and reframing conflict into collaboration",
        "From Dissatisfaction to Loyalty: Proven strategies to manage dissatisfied clients and rebuild strong relationships"
      ],
      courseObjectives: [
        "Confidently recognize and respond to the root causes of client dissatisfaction",
        "Apply practical strategies for transforming challenging situations into positive outcomes",
        "Strengthen client relationships through proactive communication and trust-building",
        "Gain a ready-to-use toolkit of tips, scripts, and techniques for managing difficult clients in real agency contexts"
      ],
      whyAttend: [
        "Practical Application: Interactive exercises with real-world scenarios you can apply immediately",
        "Expert Guidance: Learn from someone with both agency leadership and HR consulting experience",
        "Comprehensive Toolkit: Get ready-to-use scripts, techniques, and frameworks",
        "Professional Development: Reduce client churn and strengthen your agency's reputation for professionalism"
      ],
      outcome: "By the end of this masterclass, participants will be able to confidently handle challenging client situations and transform them into opportunities for stronger, more profitable relationships.",
      status: "upcoming"
    }
  };

  const masterclass = masterclasses[id] || masterclasses[1];


  const handlePurchase = () => {
    if (!customerInfo.email || !customerInfo.name) {
      alert('Please fill in your email and name to proceed.');
      return;
    }
    alert('Processing payment...');
  };

  const handleGenerateInvoice = () => {
    if (!customerInfo.email || !customerInfo.name) {
      alert('Please fill in your email and name to generate invoice.');
      return;
    }
    
    const price = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      customer: customerInfo,
      items: [{
        title: masterclass.title,
        pricingType: selectedPricing,
        quantity: 1,
        price: price
      }],
      subtotal: price,
      total: price,
      reference: `PAAN_MASTERCLASS_${selectedPricing.toUpperCase()}_${Date.now()}`
    };

    // Create invoice content
    const invoiceContent = `
PAAN MASTERCLASSES INVOICE
==========================

Invoice #: ${invoiceData.invoiceNumber}
Date: ${invoiceData.date}
Reference: ${invoiceData.reference}

BILL TO:
${customerInfo.name}
${customerInfo.email}
${customerInfo.organization || ''}
${customerInfo.phone || ''}

ITEMS:
${masterclass.title} (${selectedPricing} pricing) - Qty: 1 - $${price} each = $${price}

TOTAL: $${price}

Thank you for choosing PAAN Masterclasses!
For questions, contact: support@paan.africa
    `;

    // Create and download the invoice
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PAAN-Invoice-${invoiceData.invoiceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
    <Header navLinkColor="text-gray-950" />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 pt-40 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Content */}
            <div className="space-y-6">
              <button className="inline-flex items-center text-cyan-400 hover:text-white transition-colors text-sm">
                <Icon icon="mdi:arrow-left" className="w-4 h-4 mr-2" />
                Back to Masterclasses
              </button>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold">
                  {masterclass.category}
                </span>
                <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {masterclass.level}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  UPCOMING
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {masterclass.title}
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                {masterclass.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-3 text-white text-sm">
                  <Icon icon="mdi:calendar" className="text-red-400 w-5 h-5" />
                  <span>{masterclass.date}</span>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <Icon icon="mdi:clock" className="text-red-400 w-5 h-5" />
                  <span>{masterclass.time}</span>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <Icon icon="mdi:play-circle" className="text-red-400 w-5 h-5" />
                  <span>{masterclass.format}</span>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <Icon icon="mdi:account-tie" className="text-red-400 w-5 h-5" />
                  <span>{masterclass.instructor.name}</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={masterclass.image}
                alt={masterclass.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pricing & Purchase Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Register Now</h2>
              
              {/* Pricing Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setSelectedPricing('member')}
                  className={`p-5 rounded-lg border-2 transition-all text-left ${
                    selectedPricing === 'member' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-slate-900">PAAN Members</h3>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPricing === 'member' 
                        ? 'border-red-500 bg-red-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedPricing === 'member' && (
                        <Icon icon="mdi:check" className="text-white w-3 h-3" />
                      )}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    ${masterclass.memberPrice}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Exclusive member pricing
                  </p>
                </button>

                <button
                  onClick={() => setSelectedPricing('non-member')}
                  className={`p-5 rounded-lg border-2 transition-all text-left ${
                    selectedPricing === 'non-member' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-slate-900">Non-Members</h3>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPricing === 'non-member' 
                        ? 'border-red-500 bg-red-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedPricing === 'non-member' && (
                        <Icon icon="mdi:check" className="text-white w-3 h-3" />
                      )}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    ${masterclass.nonMemberPrice}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Standard pricing
                  </p>
                </button>
              </div>

              {/* Customer Information */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-slate-900 text-sm">Your Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Organization/Agency"
                    value={customerInfo.organization}
                    onChange={(e) => setCustomerInfo({...customerInfo, organization: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handlePurchase}
                  disabled={isLoading || !customerInfo.email || !customerInfo.name}
                  className="w-full bg-red-500 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                  ) : (
                    <Icon icon="mdi:credit-card" className="w-5 h-5" />
                  )}
                  Purchase Now - ${selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice}
                </button>
                
                <button
                  onClick={handleGenerateInvoice}
                  disabled={!customerInfo.email || !customerInfo.name}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-3"
                >
                  <Icon icon="mdi:download" className="w-5 h-5" />
                  Get Invoice
                </button>
              </div>

              {/* Benefits */}
              {masterclass.benefits && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2 text-sm">
                    <Icon icon="mdi:gift" className="w-4 h-4" />
                    Bonus Benefits:
                  </h4>
                  <div className="space-y-1">
                    {masterclass.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-green-700 text-sm">
                        <Icon icon="mdi:check-circle" className="text-green-500 w-4 h-4 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Masterclass</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{masterclass.fullDescription}</p>
                <p>{masterclass.outcome}</p>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {masterclass.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Icon icon="mdi:check-circle" className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Attend */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Attend?</h2>
              <div className="space-y-3">
                {masterclass.whyAttend.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
                    <Icon icon="mdi:star" className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
            {/* Course Objectives (for Managing Challenging Clients) */}
            {masterclass.courseObjectives && (
              <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Objectives</h2>
                <div className="space-y-3">
                  {masterclass.courseObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                      <Icon icon="mdi:target" className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm leading-relaxed">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

                    <p className="text-gray-700 text-sm leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who Should Attend */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Who Should Attend?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {masterclass.whoShouldAttend.map((attendee, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                    <Icon icon="mdi:account-tie" className="text-cyan-600 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">{attendee}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {/* Instructor Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Your Instructor</h3>
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-orange-500 mx-auto mb-3 flex items-center justify-center">
                  <Icon icon="mdi:account" className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900">{masterclass.instructor.name}</h4>
                <p className="text-gray-600 text-sm">{masterclass.instructor.title}</p>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {masterclass.instructor.bio}
              </p>
              <div>
                <h5 className="font-semibold text-slate-900 mb-2 text-sm">Expertise:</h5>
                <div className="flex flex-wrap gap-2">
                  {masterclass.instructor.expertise.map((skill, index) => (
                    <span key={index} className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="bg-slate-800 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Session Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:calendar" className="text-red-400 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{masterclass.date}</div>
                    <div className="text-xs text-gray-300">Date</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:clock" className="text-red-400 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{masterclass.time}</div>
                    <div className="text-xs text-gray-300">Time</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:play-circle" className="text-red-400 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{masterclass.format}</div>
                    <div className="text-xs text-gray-300">Format</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:web" className="text-red-400 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Interactive Online Live</div>
                    <div className="text-xs text-gray-300">Platform</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-amber-50 rounded-xl shadow-lg p-6 border border-amber-200">
              <h3 className="text-base font-bold text-slate-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 text-sm border border-gray-200">
                  <Icon icon="mdi:share" className="w-4 h-4" />
                  Share This
                </button>
                <button className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 text-sm border border-gray-200">
                  <Icon icon="mdi:bookmark" className="w-4 h-4" />
                  Save for Later
                </button>
                <button className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm border border-gray-200">
                  Browse More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default MasterclassDetailPage;