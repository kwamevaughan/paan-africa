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

  // Featured masterclass series - "Mastering Agency Growth in 2026"
  const featuredMasterclassSeries = {
    id: 'series-mastering-agency-growth',
    title: "Mastering Agency Growth in 2026",
    subtitle: "Positioning. Pricing. Procurement.",
    description: "Agencies are under more pressure than ever. Clients are more cautious, competition is sharper, and margins are harder to protect. Growth today comes from clarity, capability, and commercial discipline that cuts through the competition. This three-part, bi-monthly Masterclass Series with Stuart Dunk is designed to help agency leaders and their teams strengthen the fundamentals that directly impact conversion, retention, revenue, profitability, and long-term sustainability.",
    dates: ["January 28th", "March 26th", "May 26th"],
    time: "12 PM EAT",
    format: "90-minute Interactive Training Course",
    instructor: "Stuart Dunk",
    instructorTitle: "Former global marketing procurement leader turned agency growth advisor",
    instructorBio: "Led by Stuart Dunk, a former global marketing procurement leader turned agency growth advisor, this series bridges the gap between how agencies sell and how brands actually buy. With over 20 years of experience working on both sides of the table - both agency-side and inside global brands like Nike, Reckitt, and Danone - Stu brings a rare, honest perspective on what really influences buying decisions, pricing pressure, and agency selection.",
    whyAttend: [
      "Position your agency to win and retain more high-margin deals",
      "Understand buyer behaviour and decision-making so you can influence them with confidence",
      "Build stronger, more commercial client relationships",
      "Reduce stress around pitching, pricing, and negotiations with ready-to-use best practice"
    ],
    whoShouldAttend: [
      "Agency founders & CEOs",
      "Finance and commercial leads",
      "Mid to senior-level agency teams",
      "Business development & sales leads",
      "Client service directors & account leads"
    ],
    subMasterclasses: [
      {
        id: 9,
        title: "Agency Positioning That Cuts Through The Noise",
        date: "January 28th, 2026",
        description: "Learn how to sharpen your agency's positioning so clients understand your value quickly, clearly, and confidently. This session focuses on differentiation, clarity, and how to move away from being seen as \"just another agency.\"",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/positioning.jpg"
      },
      {
        id: 11,
        title: "Pricing for Maximum Profit Margin & Conversion",
        date: "March 26th, 2026",
        description: "This session tackles one of the most uncomfortable but critical areas of agency growth: pricing. Learn how to move away from hours-based, discounted pricing and build structures that support profitability, conversion, and longer-term client relationships.",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/masterclass-pricing.jpg"
      },
      {
        id: 12,
        title: "How to Navigate Procurement Processes & People",
        date: "May 26th, 2026",
        description: "Marketing procurement can feel like a black box designed to squeeze agencies. This masterclass demystifies how procurement really works, what they care about, and how agencies can engage more effectively when the pressure is on.",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/masterclass-procurement.jpg"
      }
    ],
    image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/positioning.jpg",
    status: "upcoming",
    isSeries: true
  };

  // Sample masterclasses data - this would come from your database
  const masterclassesData = [
    {
      id: 6,
      title: "How To Develop Winning Pitches and Retain Clients",
      description: "In today's competitive agency landscape, winning a pitch is only half the battle — retaining the client and growing the relationship is where agencies truly thrive. Too often, weak or incomplete briefs set agencies up for failure, leading to missed opportunities and frustrated clients.",
      format: "90-minute Interactive Training Course",
      date: "October 23rd, 2025",
      time: "10 am GMT / 12 pm EAT",
      memberPrice: 174,
      memberOriginalPrice: 250,
      nonMemberPrice: 250,
      nonMemberOriginalPrice: 320,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      instructor: "Abigail Dixon",
      instructorTitle: "Chartered Marketer and Fellow, CIM Consultant & Trainer",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/winning-pitches.jpg",
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
      courseObjectives: [
        "Master the art of winning pitches through strategic brief analysis",
        "Develop skills to retain clients and grow long-term relationships",
        "Learn to identify and address weak briefs before they become problems",
        "Build confidence in client communication and proposal development"
      ],
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      featured: false,
      status: "completed"
    },
    {
      id: 2,
      title: "Managing Challenging Clients",
      description: "Managing client relationships is at the heart of every successful agency. Yet, even the most seasoned teams encounter difficult clients, shifting expectations, or tense conversations — especially in today's fast-paced hybrid and remote work environments.",
      format: "90-minute Interactive Training Course",
      date: "October 15th, 2025",
      time: "10 am GMT / 12 pm EAT",
      memberPrice: 174,
      memberOriginalPrice: 250,
      nonMemberPrice: 250,
      nonMemberOriginalPrice: 320,
      currency: "USD",
      category: "Client Management",
      level: "All Levels",
      instructor: "Niki Hurst Smith",
      instructorTitle: "HR Consultant & Former Agency Leader with 15+ years experience",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/challenging-clients.jpg",
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
       status: "completed"
    },
    // {
    //   id: 1,
    //   title: "Bid to Win: The Agency Masterclass on Tenders & RFPs",
    //   description: "For agencies in Africa, tendering and responding to RFPs can be game-changing pathways to winning bigger clients, securing multi-year contracts, and proving credibility in a competitive marketplace.",
    //   format: "2.5-Hour Live Interactive Masterclass",
    //   date: "November 25th, 2025",
    //   time: "2 pm EAT",
    //   memberPrice: 60,
    //   memberOriginalPrice: 80,
    //   nonMemberPrice: 80,
    //   nonMemberOriginalPrice: 120,
    //   currency: "USD",
    //   category: "Business Development",
    //   level: "Intermediate",
    //   instructor: "Ms. Muthoni",
    //   instructorTitle: "Procurement Specialist with 14+ years experience",
    //   image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/bid-to-win.jpg",
    //   benefits: [
    //     "5% off on PAAN Summit 2026 tickets",
    //     "10% off Africa Creative Excellence Awards entry"
    //   ],
    //   whoShouldAttend: [
    //     "Agency founders & partners",
    //     "Finance managers & business leads",
    //     "Account directors & business development leads",
    //     "HR & operations managers in agencies"
    //   ],
    //   learningOutcomes: [
    //     "Understanding Tendering Basics",
    //     "Finding the Right Tenders",
    //     "Analyzing Tender Documents",
    //     "Planning Your Bid Response",
    //     "Compliance and Documentation",
    //     "Writing a Winning Proposal",
    //     "Pricing Strategies",
    //     "Post-Submission Process",
    //     "Dealing with Unsuccessful Bids",
    //     "Building a Tendering Strategy"
    //   ],
    //   featured: false,
    //   status: "upcoming"
    // },
    {
      id: 5,
      title: "Agency Leadership & Talent Retention",
      description: "Great agencies depend on great people—but retaining them is tough. This session develops leadership capacity while equipping managers to inspire, grow, and retain top creative talent.",
      format: "2.5-Hour Interactive Online Workshop",
      date: "December 10th, 2025",
      time: "2 pm EAT",
      memberPrice: 60,
      memberOriginalPrice: 100,
      nonMemberPrice: 100,
      nonMemberOriginalPrice: 120,
      currency: "USD",
      category: "Leadership",
      level: "Intermediate",
      instructor: "Mercy Murigi",
      instructorTitle: "Organizational Capacity & People Development Expert",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/agency-leadership.jpg",
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
      status: "completed"
    },
    {
      id: 9,
      title: "Agency Positioning That Cuts Through the Noise",
      description: "Learn how to sharpen your agency's positioning so clients understand your value quickly, clearly, and confidently. This session focuses on differentiation, clarity, and how to move away from being seen as \"just another agency.\"",
      format: "90-minute Interactive Training Course",
      date: "January 28th, 2026",
      time: "12 PM EAT",
      memberPrice: 150,
      memberOriginalPrice: 250,
      nonMemberPrice: 170,
      nonMemberOriginalPrice: 320,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      instructor: "Stuart Dunk",
      instructorTitle: "Founder & Managing Director, Don't Forget to Look",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/positioning.jpg",
      series: "Mastering Agency Growth in 2026",
      seriesOrder: 1,
      benefits: [
        "5% off on PAAN Summit 2026 tickets",
        "6% off Africa Creative Excellence Awards entry"
      ],
      whoShouldAttend: [
        "Agency founders & CEOs",
        "Mid to senior-level agency teams",
        "Business development & sales leads",
        "Client service directors & account leads"
      ],
      learningOutcomes: [
        "The \"3C Framework\" for building world-class agency positioning",
        "How to craft a value proposition that cuts through the noise",
        "Why most positioning fails and how to avoid generic traps",
        "The Benefit Ladder: a tool for connecting client needs to agency strengths",
        "How to build a \"client value map\" to influence perception and buying decisions",
        "Examples of exceptional agency positioning and why they work"
      ],
      courseObjectives: [
        "Define a differentiated positioning that aligns with client value",
        "Build a strong, repeatable value proposition for pitches and website copy",
        "Identify and eliminate weak, generic messaging",
        "Align service offerings, marketing, and BD processes to the new positioning"
      ],
      partnership: "PAAN, in collaboration with agency growth experts",
      featured: false,
      status: "upcoming"
    },
    {
      id: 11,
      title: "Pricing for Maximum Profit Margin & Conversion",
      description: "Pricing is one of the most emotional and misunderstood parts of agency life. Most teams default to hourly or blended rates, under-valuing their work value and undermining their position as the expert, because they feel \"safe\" in doing it \"how it's always been done.\" Meanwhile, clients are under pressure to justify spending and prove ROI, creating tension in negotiations that agencies often don't know how to navigate. Armed with a wider pricing toolkit, pricing signals expertise and confidence to clients. Agencies finally claim power in the commercial conversation.",
      format: "90-minute Interactive Training Course",
      date: "March 26th, 2026",
      time: "12 PM EAT",
      memberPrice: 150,
      memberOriginalPrice: 250,
      nonMemberPrice: 170,
      nonMemberOriginalPrice: 320,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      instructor: "Stuart Dunk",
      instructorTitle: "Founder & Managing Director, Don't Forget to Look",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/masterclass-pricing.jpg",
      series: "Mastering Agency Growth in 2026",
      seriesOrder: 2,
      benefits: [
        "5% off on PAAN Summit 2026 tickets"
      ],
      whoShouldAttend: [
        "Agency founders & CEOs",
        "Finance and commercial leads",
        "Business development & sales leads",
        "Client service directors & account leads"
      ],
      learningOutcomes: [
        "How to shift from roles and rates to value & performance based pricing",
        "Total Economic Value (TEV) - how to calculate (and charge for!) the value of the work, not the time it takes to do it",
        "Pricing Psychology: tips and tricks to help clients say yes",
        "The benefits of building products and programs, and how to do it",
        "When to discount + and when not to",
        "How top agencies structure pricing to win premium clients"
      ],
      courseObjectives: [
        "Skills and frameworks to win your higher margin deals whilst being seen as the expert choice",
        "Build pricing based on outputs + outcomes, not inputs, to break free of low margin deals & having to track and report on time",
        "Build a Pricing \"stack\" or menu of programs / products that is unique to you, allowing you to charge more",
        "Increase average deal size and profitability"
      ],
      whyAttend: [
        "Learn how to land higher-margin deals consistently",
        "Reduce pushback on pricing and negotiate from a position of strength",
        "Move away from rate-card dependency",
        "Gain tools used by high-performing global agencies"
      ],
      partnership: "PAAN, in collaboration with agency growth experts",
      featured: false,
      status: "upcoming"
    },
    {
      id: 12,
      title: "How to Navigate Procurement Processes & People",
      description: "Procurement is often seen as an obstacle — the department that cuts budgets, tightens scopes, and pushes for discounts. But behind the scenes, procurement is driven by specific pressures, performance metrics, and risk factors that agencies rarely understand. By understanding how procurement think, are trained, and incentivised, you'll be able to influence decisions earlier, avoid price-led conversations, and win business with far more confidence.",
      format: "90-minute Interactive Training Course",
      date: "May 26th, 2026",
      time: "12 PM EAT",
      memberPrice: 150,
      memberOriginalPrice: 250,
      nonMemberPrice: 170,
      nonMemberOriginalPrice: 320,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      instructor: "Stuart Dunk",
      instructorTitle: "Founder & Managing Director, Don't Forget to Look",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/masterclass-procurement.jpg",
      series: "Mastering Agency Growth in 2026",
      seriesOrder: 3,
      benefits: [
        "5% off on PAAN Summit 2026 tickets"
      ],
      whoShouldAttend: [
        "Agency founders & CEOs",
        "Finance and commercial leads",
        "Business development & sales leads",
        "Client service directors & account leads"
      ],
      learningOutcomes: [
        "How marketing procurement is trained and incentivised",
        "Different buyer types and how to communicate successfully with each",
        "How to talk about savings and value to influence procurement decisions",
        "How to prepare for procurement negotiations using their own frameworks",
        "Techniques to differentiate your agency in price-focused deals"
      ],
      courseObjectives: [
        "Identify buyer types and adapt your communication to suit them",
        "Influence procurement expectations before price discussions",
        "Position your expertise to shift perception from \"vendor\" to \"strategic partner\"",
        "Increase your conversion of procurement-led deal"
      ],
      whyAttend: [
        "Increase capability and confidence to win procurement-led deals",
        "Understand the people & hidden rules of procurement-led deals",
        "Reduce the risk of being price-compared or commoditized",
        "Influence procurement before pricing becomes a barrier",
        "Improve negotiation outcomes"
      ],
      partnership: "PAAN, in collaboration with agency growth experts",
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
      memberOriginalPrice: 250,
      nonMemberPrice: 250,
      nonMemberOriginalPrice: 320,
      currency: "USD",
      category: "Account Management",
      level: "Junior to Mid-Level",
      instructor: "Paul Burns",
      instructorTitle: "Former Training Director at Saatchi & Saatchi, Co-founder of Rock and a Hardplace",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/account-handler.jpg",
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
      status: "completed"
    },
    {
      id: 13,
      title: "Effective Time Management",
      description: "Managing time in a WFH or hybrid environment brings practical challenges, competing priorities, constant interruptions, and blurred boundaries between work and personal time. This session focuses on practical ways to plan tasks, prioritise work, and manage time more effectively so participants feel more in control of their workload.",
      bannerDescription: "Learn how to take control of your time in hybrid and remote agency environments without burning out or working longer hours.",
      format: "Live Online | 60 mins",
      date: "January 27th, 2026",
      time: "12:15 pm – 1:15 pm EAT",
      memberPrice: 100,
      nonMemberPrice: 150,
      currency: "GBP",
      category: "Leadership",
      level: "Junior to Mid-Level",
      instructor: "Fran Longford",
      instructorTitle: "Founder & Lead Trainer, FL Training",
      instructorBio: "Fran spent 15 years leading client business at top agencies before becoming Joint MD of Triangle Communications, where she focused on client retention and people development. She later founded FL Training to pursue her passion for helping managers and teams perform at their best. Fran works across the marcoms industry, delivering practical training and coaching that empowers people to work smarter, not harder.",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/effective-time-management.jpg?updatedAt=1768544129255",
      benefits: [
        "5% off on PAAN Summit 2026 tickets",
        "10% off ACE awards"
      ],
      aboutThisMasterclass: "Working patterns have changed, but many of our habits haven't. In hybrid and remote setups, boundaries blur, priorities compete, and time pressure quietly builds. This practical session helps agency professionals step back, reassess how they work, and adopt clearer, calmer approaches to managing time, tasks, and energy. You'll leave with tools you can apply immediately.",
      whoShouldAttend: [
        "Junior to mid-level agency staff",
        "Client-facing teams managing multiple priorities",
        "Anyone feeling stretched or reactive in their day-to-day work"
      ],
      learningOutcomes: [
        "How to refresh and rethink your current time management habits",
        "Practical approaches to task and time planning",
        "How to prioritise work without constant urgency",
        "Techniques to improve focus and productivity",
        "How to manage time-related stress and pressure"
      ],
      whyAttend: [
        "Regain a sense of control over your workload",
        "Reduce stress caused by poor planning and constant interruptions",
        "Improve focus and consistency in day-to-day work",
        "Work more effectively in hybrid and remote settings"
      ],
      courseObjectives: [
        "Have a clearer understanding of how they currently use their time",
        "Identify key behaviours that undermine productivity",
        "Understand how to plan work more realistically",
        "Recognise how time management supports wellbeing and performance"
      ],
      featured: false,
      status: "upcoming"
    },
    
  ];

  // Helper function to parse dates for sorting
  const parseDate = (dateString) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    try {
      const parts = dateString.match(/(\w+)\s+(\d+)(?:st|nd|rd|th),\s+(\d+)/);
      if (parts && months[parts[1]] !== undefined) {
        const month = months[parts[1]];
        const day = parseInt(parts[2], 10);
        const year = parseInt(parts[3], 10);
        return new Date(year, month, day);
      }
    } catch (error) {
      console.error('Error parsing date:', dateString, error);
    }
    return new Date(); // fallback to current date
  };

  // Sort masterclasses by status first (completed last), then by date (earliest first)
  const masterclasses = [...masterclassesData].sort((a, b) => {
    // First, sort by status: completed masterclasses go to the end
    if (a.status === 'completed' && b.status !== 'completed') {
      return 1; // a comes after b
    }
    if (a.status !== 'completed' && b.status === 'completed') {
      return -1; // a comes before b
    }
    
    // If both have the same status, sort by date (earliest first)
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const categories = [
    { id: 'all', name: 'All Masterclasses', count: masterclasses.length + 1 }, // +1 for featured
    { id: 'business-development', name: 'Business Development', count: 2 },
    { id: 'client-management', name: 'Client Management', count: 1 },
    { id: 'account-management', name: 'Account Management', count: 1 },
    { id: 'financial-management', name: 'Financial Management', count: 1 },
    { id: 'leadership', name: 'Leadership', count: 1 },
    { id: 'creative-strategy', name: 'Creative Strategy', count: 1 },
    { id: 'digital-marketing', name: 'Digital Marketing', count: 0 }
  ];

  // Series masterclass IDs that are part of the featured series
  const seriesMasterclassIds = featuredMasterclassSeries.subMasterclasses.map(mc => mc.id);

  const filteredMasterclasses = masterclasses.filter(masterclass => {
    // Exclude series masterclasses from the regular list since they're shown in the featured series section
    if (seriesMasterclassIds.includes(masterclass.id)) {
      return false;
    }
    const matchesCategory = selectedCategory === 'all' || 
      masterclass.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesSearch = masterclass.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      masterclass.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const finalFilteredMasterclasses = filteredMasterclasses;

  return (
    <>
      <SEO
        title="PAAN Masterclasses | Professional Development for African Agencies"
        description="Join expert-led masterclasses designed specifically for African agencies. Learn from industry leaders, gain practical skills, and accelerate your agency's growth with PAAN's professional development programs."
        keywords="PAAN masterclasses, agency training, professional development Africa, business skills, tender training, RFP masterclass, agency growth, African agencies"
      />

      <Header />
      <div className="relative">       
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#172840] via-[#2a4a6b] to-[#172840] pt-32 sm:pt-40 pb-20 overflow-hidden">
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
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
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

              {/* Collaboration Section */}
              <motion.div 
                className="border-t border-white/20 pt-12"
                variants={fadeInUp}
              >
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-6 font-medium">
                  In Collaboration With
                </p>
                <div className="flex items-center justify-center">
                  <Link 
                    href="https://publicisteastafrica.com/alliance-of-independent-agencies-forges-landmark-partnership-with-paan-to-elevate-africas-creative-ecosystem/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-white backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/50 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="group relative">
                          <div className="relative w-full h-32 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                            <img 
                              src="/assets/images/partners/aia-2.png" 
                              alt="AIA Logo" 
                              className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gradient-to-br from-[#F25849]/10 to-[#F25849]/5 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#F25849] mb-2">20+</div>
                <div className="text-gray-600">Expert Instructors</div>
              </div>
              <div className="bg-gradient-to-br from-[#84C1D9]/10 to-[#84C1D9]/5 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#84C1D9] mb-2">100+</div>
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

        {/* Featured Masterclass Series */}
        <section id="upcoming-masterclass" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#F25849] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                Featured Masterclass Series
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-4">
                {featuredMasterclassSeries.title}
              </h2>
              <p className="text-xl text-[#F25849] font-semibold mb-2">
                {featuredMasterclassSeries.subtitle}
              </p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                {featuredMasterclassSeries.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Series Header */}
              <div className="bg-[#172840] text-white p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:calendar-multiple" className="text-[#F2B706] w-6 h-6" />
                    <div>
                      <div className="text-xs text-gray-300">Dates</div>
                      <div className="text-sm font-medium">
                        {featuredMasterclassSeries.dates.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:clock" className="text-[#F2B706] w-6 h-6" />
                    <div>
                      <div className="text-xs text-gray-300">Time</div>
                      <div className="text-sm font-medium">{featuredMasterclassSeries.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:play-circle" className="text-[#F2B706] w-6 h-6" />
                    <div>
                      <div className="text-xs text-gray-300">Duration</div>
                      <div className="text-sm font-medium">{featuredMasterclassSeries.format}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:account-tie" className="text-[#F2B706] w-6 h-6" />
                    <div>
                      <div className="text-xs text-gray-300">Trainer</div>
                      <div className="text-sm font-medium">{featuredMasterclassSeries.instructor}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Series Content */}
              <div className="p-6 lg:p-8">
                {/* About the Series */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#172840] mb-4">About the Masterclass Series</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {featuredMasterclassSeries.instructorBio}
                  </p>
                </div>

                {/* Why Attend */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#172840] mb-4">Why Attend?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {featuredMasterclassSeries.whyAttend.map((reason, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#F25849]/5 rounded-lg">
                        <Icon icon="mdi:check-circle" className="text-[#F25849] w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Who Should Attend */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#172840] mb-4">Who Should Attend</h3>
                  <div className="flex flex-wrap gap-2">
                    {featuredMasterclassSeries.whoShouldAttend.map((attendee, index) => (
                      <span key={index} className="bg-[#84C1D9] text-white px-4 py-2 rounded-full text-sm">
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>

                {/* The Three Masterclasses */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#172840] mb-6">The Three Masterclasses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredMasterclassSeries.subMasterclasses.map((masterclass, index) => (
                      <div key={masterclass.id} className="bg-gray-50 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#F25849] transition-all duration-300">
                        <Link href={`/masterclasses/${masterclass.id}`} className="block">
                          <div className="relative h-48">
                            <Image
                              src={masterclass.image}
                              fill
                              alt={masterclass.title}
                              className="object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-[#F2B706] text-[#172840] px-3 py-1 rounded-full text-xs font-bold">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-xs text-gray-500 mb-2 font-medium">{masterclass.date}</div>
                            <h4 className="text-lg font-bold text-[#172840] mb-2 leading-tight">
                              {masterclass.title}
                            </h4>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {masterclass.description}
                            </p>
                            <div className="flex items-center gap-2 text-[#F25849] font-semibold text-sm">
                              <span>Explore the {index === 0 ? 'Positioning' : index === 1 ? 'Pricing' : 'Procurement'} Masterclass</span>
                              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
              {finalFilteredMasterclasses.length > 0 ? (
                finalFilteredMasterclasses.map(masterclass => (
                  <div key={masterclass.id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col ${masterclass.status === 'not-accepting-bookings' || masterclass.status === 'completed' ? 'opacity-60' : ''}`}>
                    <Link href={`/masterclasses/${masterclass.id}`} className="relative h-48 flex-shrink-0 cursor-pointer">
                      <Image
                        src={masterclass.image}
                        fill
                        alt={masterclass.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          masterclass.status === 'upcoming' ? 'bg-[#F2B706] text-[#172840]' :
                          masterclass.status === 'not-accepting-bookings' ? 'bg-gray-500 text-white' :
                          masterclass.status === 'completed' ? 'bg-gray-500 text-white' :
                          'bg-[#F2B706] text-[#172840]'
                        }`}>
                          {masterclass.status === 'upcoming' ? 'UPCOMING' : 
                           masterclass.status === 'not-accepting-bookings' ? 'NOT ACCEPTING BOOKINGS' : 
                           masterclass.status === 'completed' ? 'COMPLETED' : 'LIVE'}
                        </span>
                      </div>
                      {masterclass.series === featuredMasterclassSeries.title && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-[#F25849] text-white px-3 py-1 rounded-full text-xs font-bold">
                            SERIES
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span className="font-medium">{masterclass.date}</span>
                          <span className="font-medium">{masterclass.time}</span>
                        </div>
                      </div>
                    </Link>

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

                      {/* <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {masterclass.description}
                      </p> */}

                      <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
                        <div className="text-sm text-gray-600 font-medium">
                          By {masterclass.instructor}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <div className="text-xl font-bold text-[#172840]">
                              ${masterclass.memberPrice}
                            </div>
                            {masterclass.memberOriginalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ${masterclass.memberOriginalPrice}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <div className="text-xs text-gray-500">Members</div>
                            {masterclass.memberOriginalPrice && (
                              <div className="text-xs text-green-600 font-semibold">
                                Save ${masterclass.memberOriginalPrice - masterclass.memberPrice}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Link 
                        href={`/masterclasses/${masterclass.id}`}
                        className={`block w-full text-center py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                          masterclass.status === 'not-accepting-bookings' || masterclass.status === 'completed'
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-[#F25849] text-white hover:bg-[#D6473C]'
                        }`}
                      >
                        {masterclass.status === 'not-accepting-bookings' ? 'Not Accepting Bookings' : 
                         masterclass.status === 'completed' ? 'Completed' : 'View Details'}
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