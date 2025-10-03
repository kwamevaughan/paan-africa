import SEO from "@/components/SEO";
import Header from "../../layouts/standard-header";
import Footer from "../../layouts/footer";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const MasterclassesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample masterclasses data - this would come from your database
  const masterclasses = [
    {
      id: 1,
      title: "Bid to Win: The Agency Masterclass on Tenders & RFPs",
      description: "For agencies in Africa, tendering and responding to RFPs can be game-changing pathways to winning bigger clients, securing multi-year contracts, and proving credibility in a competitive marketplace.",
      format: "2.5-Hour Live Interactive Masterclass",
      date: "November 25th, 2025",
      time: "2 pm EAT",
      memberPrice: 60,
      nonMemberPrice: 80,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      instructor: "Ms. Muthoni",
      instructorTitle: "Procurement Specialist with 14+ years experience",
      image: "/assets/images/masterclass/bid-t0-win.webp",
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
        "Understanding Tendering Basics",
        "Finding the Right Tenders",
        "Analyzing Tender Documents",
        "Planning Your Bid Response",
        "Compliance and Documentation",
        "Writing a Winning Proposal",
        "Pricing Strategies",
        "Post-Submission Process",
        "Dealing with Unsuccessful Bids",
        "Building a Tendering Strategy"
      ],
      featured: true,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Managing Challenging Clients",
      description: "Managing client relationships is at the heart of every successful agency. Yet, even the most seasoned teams encounter difficult clients, shifting expectations, or tense conversations — especially in today's fast-paced hybrid and remote work environments.",
      format: "90-minute Interactive Training Course",
      date: "October 15th, 2025",
      time: "10 am GMT / 12 pm EAT",
      memberPrice: 174,
      nonMemberPrice: 250,
      currency: "USD",
      category: "Client Management",
      level: "All Levels",
      instructor: "Niki Hurst Smith",
      instructorTitle: "HR Consultant & Former Agency Leader with 15+ years experience",
      image: "/assets/images/masterclass/challenging-clients.webp",
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
        "Raising the Standard: What clients truly expect from agencies",
        "Decoding Difficult Clients: Why some clients seem challenging",
        "Client-Centric Thinking: Practical frameworks for uncovering client needs",
        "Turning Tension into Trust: Approaches for navigating tough conversations",
        "From Dissatisfaction to Loyalty: Strategies to manage dissatisfied clients"
      ],
      courseObjectives: [
        "Confidently recognize and respond to the root causes of client dissatisfaction",
        "Apply practical strategies for transforming challenging situations into positive outcomes",
        "Strengthen client relationships through proactive communication and trust-building",
        "Gain a ready-to-use toolkit of tips, scripts, and techniques for managing difficult clients"
      ],
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      featured: false,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Financial Management, Tax & Transfer Pricing for Agencies",
      description: "Creative agencies often struggle with irregular income, multi-currency projects, and tax complexity. This session equips agency leaders and finance managers with the tools to stabilize growth, remain compliant, and make informed financial decisions.",
      format: "3-Hour Interactive Online Workshop",
      date: "October 23rd, 2025",
      time: "2 pm EAT",
      memberPrice: 60,
      nonMemberPrice: 80,
      currency: "USD",
      category: "Financial Management",
      level: "Intermediate",
      instructor: "Jotham Wadongo",
      instructorTitle: "Financial Management & Business Advisory Professional",
      image: "/assets/images/masterclass/financial-management.webp",
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
        "Build robust agency budgets and cash flow systems",
        "Understand corporate tax, VAT, withholding, and digital service tax obligations",
        "Gain practical insight into transfer pricing for cross-border assignments",
        "Apply smart pricing models (hourly, retainers, value-based)"
      ],
      takeawayToolkit: "Budgeting template + Tax & Transfer Pricing cheat sheet",
      series: "Agency Growth & Leadership Masterclass Series",
      moduleNumber: 1,
      featured: false,
      status: "upcoming"
    },
    {
      id: 4,
      title: "Proposal Writing & Bidding for Global Clients",
      description: "Winning international contracts requires more than great ideas—it requires compelling proposals that showcase professionalism and global readiness. This session helps agencies sharpen their proposal writing and bidding strategies.",
      format: "2.5-Hour Interactive Online Workshop",
      date: "November 13th, 2025",
      time: "2 pm EAT",
      memberPrice: 60,
      nonMemberPrice: 80,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      instructor: "Expert Trainer",
      instructorTitle: "International Business Development Specialist",
      image: "/assets/images/masterclass/proposal-writing.webp",
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
        "Structure winning proposals that stand out in competitive RFPs",
        "Use storytelling to position African creativity on the global stage",
        "Price proposals strategically for profitability and competitiveness",
        "Peer-review and refine proposals with expert guidance"
      ],
      takeawayToolkit: "Proposal template + Proposal evaluation checklist",
      series: "Agency Growth & Leadership Masterclass Series",
      moduleNumber: 2,
      featured: false,
      status: "upcoming"
    },
    {
      id: 5,
      title: "Agency Leadership & Talent Retention",
      description: "Great agencies depend on great people—but retaining them is tough. This session develops leadership capacity while equipping managers to inspire, grow, and retain top creative talent.",
      format: "2.5-Hour Interactive Online Workshop",
      date: "December 10th, 2025",
      time: "2 pm EAT",
      memberPrice: 60,
      nonMemberPrice: 80,
      currency: "USD",
      category: "Leadership",
      level: "Intermediate",
      instructor: "Mercy Murigi",
      instructorTitle: "Organizational Capacity & People Development Expert",
      image: "/assets/images/masterclass/leadership-talent.webp",
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
        "Identify leadership styles that fit creative industries",
        "Develop strategies for attracting and retaining high-performing teams",
        "Build succession plans and nurture next-generation leaders",
        "Share talent retention challenges and solutions with peers",
        "Plan your talent pipeline for 2026 growth"
      ],
      takeawayToolkit: "Leadership self-assessment + Talent retention strategy canvas",
      series: "Agency Growth & Leadership Masterclass Series",
      moduleNumber: 3,
      featured: false,
      status: "upcoming"
    },
    {
      id: 6,
      title: "How To Develop Winning Pitches and Retain Clients",
      description: "In today's competitive agency landscape, winning a pitch is only half the battle — retaining the client and growing the relationship is where agencies truly thrive. Too often, weak or incomplete briefs set agencies up for failure, leading to missed opportunities and frustrated clients.",
      format: "90-minute Interactive Training Course",
      date: "October 23rd, 2025",
      time: "10 am GMT / 12 pm EAT",
      memberPrice: 174,
      nonMemberPrice: 250,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      instructor: "Abigail Dixon",
      instructorTitle: "Chartered Marketer and Fellow, CIM Consultant & Trainer",
      image: "/assets/images/masterclass/winning-pitches.webp",
      benefits: [
        "5% off on PAAN Summit 2026 tickets",
        "6% off Africa Creative Excellence Awards entry"
      ],
      whoShouldAttend: [
        "Account Managers",
        "Business Development professionals",
        "Planners",
        "Agency leaders"
      ],
      learningOutcomes: [
        "Clarity on the quality of the brief that should be received, including briefing template examples",
        "Client-side perspective of what the brief indicates and author interpretation",
        "'Red pen' methodology to interrogate brief and draft Q&A questions",
        "How to draft 'Push back' questions for comprehensive client information",
        "Structure proposals to demonstrate understanding of brand/business challenges",
        "Empowerment on questions to ask for clarity in proposal development",
        "Structure and flow to demonstrate understanding and proposed approach"
      ],
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      featured: false,
      status: "upcoming"
    },
    {
      id: 7,
      title: "How To Be The Best Account Handler In Your Agency",
      description: "Account Handlers are a positive and competitive lot by nature. But the transition from lively pup to 'Top Dog' often seems a difficult and frustrating process. The problem is that 'on the job training' is only as good as 'that particular job'. This course provides an ideal opportunity to really focus on what makes a good Account Handler GREAT.",
      format: "90-minute Interactive Training Course",
      date: "November 6th, 2025",
      time: "10 am GMT / 12 pm EAT",
      memberPrice: 174,
      nonMemberPrice: 250,
      currency: "USD",
      category: "Account Management",
      level: "Junior to Mid-Level",
      instructor: "Paul Burns",
      instructorTitle: "Former Training Director at Saatchi & Saatchi, Co-founder of Rock and a Hardplace",
      image: "/assets/images/masterclass/account-handler.webp",
      benefits: [
        "5% off on PAAN Summit 2026 tickets",
        "6% off Africa Creative Excellence Awards entry"
      ],
      whoShouldAttend: [
        "Junior-level agency Account Handlers with 1-3 years of experience",
        "Account Managers looking to step up",
        "Client service professionals",
        "Agency team leads"
      ],
      learningOutcomes: [
        "How to take control of your time with practical tools to prioritize, plan, and deliver without overwhelm",
        "How to lead with confidence — inspiring colleagues, guiding teams, and keeping projects on track",
        "How to balance client demands with agency realities — understanding what clients truly value",
        "Master the art of saying 'no' professionally and constructively",
        "Techniques for planning workload and avoiding procrastination traps",
        "Practical tools to inspire colleagues and collaborate across teams",
        "Navigate client relationships and handle difficult conversations confidently"
      ],
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      featured: false,
      status: "upcoming"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Masterclasses', count: masterclasses.length },
    { id: 'business-development', name: 'Business Development', count: 3 },
    { id: 'client-management', name: 'Client Management', count: 1 },
    { id: 'account-management', name: 'Account Management', count: 1 },
    { id: 'financial-management', name: 'Financial Management', count: 1 },
    { id: 'leadership', name: 'Leadership', count: 1 },
    { id: 'creative-strategy', name: 'Creative Strategy', count: 0 },
    { id: 'digital-marketing', name: 'Digital Marketing', count: 0 }
  ];

  const filteredMasterclasses = masterclasses.filter(masterclass => {
    const matchesCategory = selectedCategory === 'all' || 
      masterclass.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesSearch = masterclass.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      masterclass.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="PAAN Masterclasses | Professional Development for African Agencies"
        description="Join expert-led masterclasses designed specifically for African agencies. Learn from industry leaders, gain practical skills, and accelerate your agency's growth with PAAN's professional development programs."
        keywords="PAAN masterclasses, agency training, professional development Africa, business skills, tender training, RFP masterclass, agency growth, African agencies"
      />
      
      <div className="relative">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#172840] via-[#2a4a6b] to-[#172840] pt-32 sm:pt-40 pb-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/assets/images/bg-pattern.svg"
              fill
              alt=""
              className="object-cover"
            />
          </div>
          
          
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div 
              className="text-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-block bg-[#F2B706] text-[#172840] px-6 py-2 rounded-full text-sm font-semibold mb-6">
                  Professional Development
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                variants={fadeInUp}
              >
                PAAN Masterclasses
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Expert-led training programs designed specifically for African agencies. 
                Learn from industry leaders, gain practical skills, and accelerate your agency's growth.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <button 
                  onClick={() => document.getElementById('masterclasses-grid').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#F25849] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#D6473C] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Browse Masterclasses
                </button>
                <button 
                  onClick={() => document.getElementById('upcoming-masterclass').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#172840] transition-all duration-300"
                >
                  View Featured
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gradient-to-br from-[#F25849]/10 to-[#F25849]/5 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#F25849] mb-2">50+</div>
                <div className="text-gray-600">Expert Instructors</div>
              </div>
              <div className="bg-gradient-to-br from-[#84C1D9]/10 to-[#84C1D9]/5 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#84C1D9] mb-2">1,200+</div>
                <div className="text-gray-600">Agencies Trained</div>
              </div>
              <div className="bg-gradient-to-br from-[#F2B706]/10 to-[#F2B706]/5 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#F2B706] mb-2">25+</div>
                <div className="text-gray-600">Countries Reached</div>
              </div>
              <div className="bg-gradient-to-br from-[#172840]/10 to-[#172840]/5 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#172840] mb-2">95%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Masterclass */}
        <section id="upcoming-masterclass" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#F25849] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                Featured Masterclass
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-4">
                Don't Miss Our Next Session
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our upcoming masterclass and take your agency to the next level
              </p>
            </div>

            {masterclasses.filter(m => m.featured).map(masterclass => (
              <div key={masterclass.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 lg:h-full min-h-[400px]">
                    <Image
                      src={masterclass.image}
                      fill
                      alt={masterclass.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-[#F2B706] text-[#172840] px-4 py-2 rounded-full text-sm font-bold">
                        {masterclass.status === 'upcoming' ? 'UPCOMING' : 'LIVE'}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12">
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-[#84C1D9] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {masterclass.category}
                        </span>
                        <span className="text-gray-500 text-sm">{masterclass.level}</span>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#172840] mb-4 leading-tight">
                        {masterclass.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {masterclass.description}
                      </p>
                    </div>

                    {/* Session Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:calendar" className="text-[#F25849] w-5 h-5" />
                        <span className="text-gray-700">{masterclass.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:clock" className="text-[#F25849] w-5 h-5" />
                        <span className="text-gray-700">{masterclass.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:play-circle" className="text-[#F25849] w-5 h-5" />
                        <span className="text-gray-700">{masterclass.format}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:account-tie" className="text-[#F25849] w-5 h-5" />
                        <span className="text-gray-700">{masterclass.instructor}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Members</div>
                          <div className="text-2xl font-bold text-[#172840]">
                            ${masterclass.memberPrice}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Non-Members</div>
                          <div className="text-2xl font-bold text-[#172840]">
                            ${masterclass.nonMemberPrice}
                          </div>
                        </div>
                      </div>
                      
                      {masterclass.benefits && (
                        <div className="border-t pt-4">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Bonus Benefits:</div>
                          {masterclass.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <Icon icon="mdi:check-circle" className="text-green-500 w-4 h-4" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        href={`/masterclasses/${masterclass.id}`}
                        className="flex-1 bg-[#F25849] text-white px-6 py-4 rounded-full font-semibold text-center hover:bg-[#D6473C] transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Register Now
                      </Link>
                      <Link 
                        href={`/masterclasses/${masterclass.id}`}
                        className="flex-1 bg-transparent border-2 border-[#172840] text-[#172840] px-6 py-4 rounded-full font-semibold text-center hover:bg-[#172840] hover:text-white transition-all duration-300"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Masterclasses */}
<section id="masterclasses-grid" className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-4">
        All Masterclasses
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Explore our comprehensive library of professional development programs
      </p>
    </div>

    {/* Filters */}
    <div className="mb-12">
      <div className="flex flex-col gap-6">
        {/* Search */}
        <div className="relative w-full max-w-2xl mx-auto">
          <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search masterclasses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#F25849] focus:border-transparent outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#F25849] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Masterclasses Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredMasterclasses.length > 0 ? (
        filteredMasterclasses.map(masterclass => (
          <div key={masterclass.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
            <div className="relative h-48 flex-shrink-0">
              <Image
                src={masterclass.image}
                fill
                alt={masterclass.title}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="bg-[#F2B706] text-[#172840] px-3 py-1 rounded-full text-xs font-bold">
                  {masterclass.status === 'upcoming' ? 'UPCOMING' : 'LIVE'}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white text-sm">
                  <span className="font-medium">{masterclass.date}</span>
                  <span className="font-medium">{masterclass.time}</span>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-[#84C1D9] text-white px-3 py-1 rounded text-xs font-medium">
                  {masterclass.category}
                </span>
                <span className="text-gray-500 text-xs font-medium">{masterclass.level}</span>
              </div>

              <h3 className="text-lg font-bold text-[#172840] mb-3 line-clamp-2 group-hover:text-[#F25849] transition-colors duration-300 min-h-[3.5rem]">
                {masterclass.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                {masterclass.description}
              </p>

              <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
                <div className="text-sm text-gray-600 font-medium">
                  By {masterclass.instructor}
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#172840]">
                    ${masterclass.memberPrice}
                  </div>
                  <div className="text-xs text-gray-500">Members</div>
                </div>
              </div>

              <Link 
                href={`/masterclasses/${masterclass.id}`}
                className="block w-full bg-[#F25849] text-white text-center py-3 rounded-full font-semibold hover:bg-[#D6473C] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-16">
          <Icon icon="mdi:book-open-variant" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No masterclasses found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  </div>
</section>

        {/* Why Choose PAAN Masterclasses */}
        <section className="bg-[#172840] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose PAAN Masterclasses?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Designed specifically for African agencies with real-world applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#F25849] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:account-group" className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Expert Instructors</h3>
                <p className="text-gray-300">
                  Learn from seasoned professionals with proven track records in African markets
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#84C1D9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:lightbulb" className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Practical Learning</h3>
                <p className="text-gray-300">
                  Hands-on sessions with real case studies and actionable frameworks
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#F2B706] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:certificate" className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Certification</h3>
                <p className="text-gray-300">
                  Receive recognized certificates to showcase your professional development
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#F25849] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:network" className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Networking</h3>
                <p className="text-gray-300">
                  Connect with fellow agency leaders and build valuable professional relationships
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#84C1D9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:play-circle" className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Flexible Format</h3>
                <p className="text-gray-300">
                  Live interactive sessions with recordings available for later review
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#F2B706] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:star" className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Member Benefits</h3>
                <p className="text-gray-300">
                  Exclusive discounts and additional perks for PAAN network members
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#F25849] to-[#D6473C] py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Elevate Your Agency?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of African agencies who have transformed their businesses through PAAN Masterclasses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('masterclasses-grid').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#F25849] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Browse All Masterclasses
              </button>
              <Link 
                href="/contact-us"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#F25849] transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default MasterclassesPage;