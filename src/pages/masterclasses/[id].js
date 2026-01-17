import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Icon } from "@iconify/react";
import Header from "@/layouts/standard-header";
import Footer from "@/layouts/footer";
import PaystackScript from "@/components/PaystackScript";
import jsPDF from 'jspdf';
import { validateMasterclassPromoCode } from "@/lib/masterclassPromoCodeService";

const MasterclassDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedPricing, setSelectedPricing] = useState('member');
  const [isLoading, setIsLoading] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);
  const [seatCount, setSeatCount] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
    organization: ''
  });
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [isValidatingPromoCode, setIsValidatingPromoCode] = useState(false);

  // Check if Paystack is ready
  useEffect(() => {
    const checkPaystackReady = () => {
      if (typeof window !== "undefined" && window.PaystackPop) {
        setPaystackReady(true);
      } else {
        setPaystackReady(false);
      }
    };

    // Check immediately
    checkPaystackReady();

    // Check periodically until ready
    const interval = setInterval(checkPaystackReady, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

   const handleShare = async () => {
    const shareData = {
      title: "Masterclass",
      text: "Check out this masterclass!",
      url: window.location.href, // current page URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // fallback: copy link to clipboard
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };


  // Masterclasses data - this would come from database
  const masterclasses = {
    // 1: {
    //   id: 1,
    //   title: "Bid to Win: The Agency Masterclass on Tenders & RFPs",
    //   description: "For agencies in Africa, tendering and responding to RFPs can be game-changing pathways to winning bigger clients, securing multi-year contracts, and proving credibility in a competitive marketplace.",
    //   fullDescription: "This 2.5-hour intensive masterclass, hosted by PAAN, is designed to equip agencies with the clarity, strategy, and confidence to master tendering and RFP responses — turning what feels like a complex process into a repeatable business growth engine.",
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
    //   image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/bid-to-win.jpg",
    //   instructor: {
    //     name: "Ms. Muthoni",
    //     title: "Procurement Specialist with 14+ years experience",
    //     bio: "Ms. Muthoni is a seasoned Procurement Specialist with over 14 years experience in senior managerial roles spanning the private sector, foundations, and international non-governmental organizations.",
    //     expertise: [
    //       "Procurement Systems",
    //       "Tender Evaluation",
    //       "Compliance & Risk Management",
    //       "Contract Management"
    //     ]
    //   },
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
    //     "Understanding Tendering Basics – breaking down the language and flow of tenders and RFPs",
    //     "Finding the Right Tenders – identifying opportunities aligned with your agency's strengths",
    //     "Analyzing Tender Documents – extracting critical client needs and evaluation criteria",
    //     "Planning Your Bid Response – structuring clear, strategic, and compelling responses",
    //     "Compliance and Documentation – avoiding common mistakes that instantly disqualify bids",
    //     "Writing a Winning Proposal – positioning your agency as the obvious choice",
    //     "Pricing Strategies – being competitive without undercutting your value",
    //     "Post-Submission Process – engaging with clients and staying visible beyond submission"
    //   ],
    //   whyAttend: [
    //     "Business Growth Advantage: Learn how to consistently win bigger contracts and diversify revenue streams",
    //     "Agency-Specific Focus: Tailored to the realities of African agencies competing in local and cross-border markets",
    //     "Hands-On Learning: Practical frameworks, checklists, and examples you can apply immediately",
    //     "Expert Guidance: Delivered by seasoned practitioners with proven success in winning tenders and RFPs across Africa"
    //   ],
    //   outcome: "By the end of this session, agencies will have a clear roadmap to confidently approach tenders and RFPs, improve win rates, and embed tendering into their long-term growth strategy.",
    //   status: "upcoming"
    // },
    2: {
      id: 2,
      title: "Managing Challenging Clients",
      description: "Managing client relationships is at the heart of every successful agency. Yet, even the most seasoned teams encounter difficult clients, shifting expectations, or tense conversations — especially in today's fast-paced hybrid and remote work environments.",
      fullDescription: "This masterclass is designed to equip agency professionals with practical, proven strategies to turn challenging client situations into opportunities for stronger partnerships and long-term retention. Through interactive exercises, real-world scenarios, and expert insights, participants will walk away with a refreshed toolkit for handling difficult conversations, building trust, and maintaining healthy client relationships.",
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
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/challenging-clients.jpg",
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      instructor: {
        name: "Niki Hurst Smith",
        title: "HR Consultant & Former Agency Leader with 15+ years experience",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/niki-hurst-smith.jpg",
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
      status: "completed"
    },
    3: {
      id: 3,
      title: "Financial Management, Tax & Transfer Pricing for Agencies",
      description: "Creative agencies often struggle with irregular income, multi-currency projects, and tax complexity. This session equips agency leaders and finance managers with the tools to stabilize growth, remain compliant, and make informed financial decisions.",
      fullDescription: "African agencies are brimming with creativity and innovation, yet they often face challenges in scaling sustainably, competing for global projects, and retaining talent. This module of the Agency Growth & Leadership Masterclass equips agency leaders with practical, Africa-relevant skills to build financially resilient, people-centered, and globally competitive businesses.",
      format: "3-Hour Interactive Online Workshop",
      date: "November 26th, 2025",
      time: "2 pm EAT",
      memberPrice: 60,
      memberOriginalPrice: 100,
      nonMemberPrice: 100,
      nonMemberOriginalPrice: 120,
      currency: "USD",
      category: "Financial Management",
      level: "Intermediate",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/finance-management.jpg",
      series: "Agency Growth & Leadership Masterclass Series",
      moduleNumber: 1,
      instructor: {
        name: "Jotham Wadongo",
        title: "Financial Management & Business Advisory Professional",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/jotham-wadongo.jpg",
        bio: "Jotham Wadongo is an experienced financial management and business advisory professional with a strong track record of supporting private sector organizations to grow sustainably and strengthen their financial operations. He holds a Bachelor of Commerce (Finance) from the University of Nairobi and professional certifications including PRINCE2 (Practitioner) and Lean Six Sigma Yellow Belt. Over the past decade, Jotham has worked with a wide range of businesses, financial institutions, and corporates across Africa, advising them on financial systems design, compliance, pricing strategies, and performance management.",
        expertise: [
          "Tax and compliance management",
          "Transfer pricing",
          "Business financial planning",
          "Process improvement"
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
        "Build robust agency budgets and cash flow systems",
        "Understand corporate tax, VAT, withholding, and digital service tax obligations",
        "Gain practical insight into transfer pricing for cross-border assignments",
        "Apply smart pricing models (hourly, retainers, value-based)"
      ],
      takeawayToolkit: "Budgeting template + Tax & Transfer Pricing cheat sheet",
      whyAttend: [
        "Practical Application: Get templates and tools you can use immediately in your agency",
        "Africa-Focused: Tailored specifically for African agencies and their unique challenges",
        "Expert Guidance: Learn from a seasoned financial professional with extensive African market experience",
        "Comprehensive Coverage: From basic budgeting to complex transfer pricing scenarios"
      ],
      outcome: "By attending this masterclass, you will get 5% off on PAAN Summit 2026 tickets & 10% off on the Africa Creative Excellence Awards entry.",
      status: "upcoming"
    },
    4: {
      id: 4,
      title: "Proposal Writing & Bidding for Global Clients",
      description: "Winning international contracts requires more than great ideas—it requires compelling proposals that showcase professionalism and global readiness. This session helps agencies sharpen their proposal writing and bidding strategies.",
      fullDescription: "This module focuses on helping African agencies compete effectively in the global marketplace through superior proposal writing and strategic bidding. Learn how to position your African creativity as a competitive advantage while meeting international standards of professionalism and delivery.",
      format: "2.5-Hour Interactive Online Workshop",
      date: "November 13th, 2025",
      time: "2 pm EAT",
      memberPrice: 60,
      memberOriginalPrice: 100,
      nonMemberPrice: 100,
      nonMemberOriginalPrice: 120,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/proposal-writing.jpg",
      series: "Agency Growth & Leadership Masterclass Series",
      moduleNumber: 2,
      instructor: {
        name: "Expert Trainer",
        title: "International Business Development Specialist",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/expert-trainer.jpg",
        bio: "Our expert trainer brings extensive experience in international business development, having helped numerous African agencies successfully compete for and win global contracts. With a deep understanding of both African creative strengths and international client expectations, they provide practical guidance for agencies looking to expand their global footprint.",
        expertise: [
          "International Business Development",
          "Proposal Writing & Strategy",
          "Global Client Relations",
          "Cross-Cultural Communication"
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
        "Structure winning proposals that stand out in competitive RFPs",
        "Use storytelling to position African creativity on the global stage",
        "Price proposals strategically for profitability and competitiveness",
        "Peer-review and refine proposals with expert guidance"
      ],
      takeawayToolkit: "Proposal template + Proposal evaluation checklist",
      whyAttend: [
        "Global Perspective: Learn how to compete effectively in international markets",
        "Practical Tools: Get templates and frameworks you can use immediately",
        "Peer Learning: Share experiences with agencies across Africa",
        "Strategic Positioning: Learn to showcase African creativity as a competitive advantage"
      ],
      outcome: "By attending this masterclass, you will get 5% off on PAAN Summit 2026 tickets & 10% off on the Africa Creative Excellence Awards entry.",
      status: "upcoming"
    },
    5: {
      id: 5,
      title: "Agency Leadership & Talent Retention",
      description: "Great agencies depend on great people—but retaining them is tough. This session develops leadership capacity while equipping managers to inspire, grow, and retain top creative talent.",
      fullDescription: "This final module of the Agency Growth & Leadership Masterclass focuses on the human side of agency growth. Learn how to build leadership capacity, create compelling workplace cultures, and develop strategies that keep your best talent engaged and committed to your agency's success.",
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
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/agency-leadership.jpg",
      series: "Agency Growth & Leadership Masterclass Series",
      moduleNumber: 3,
      instructor: {
        name: "Mercy Murigi",
        title: "Organizational Capacity & People Development Expert",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/mercy-murigi.jpg",
        bio: "Mercy Murigi is a highly experienced organizational development and people management professional with over 15 years of practice helping businesses and enterprises across Africa strengthen their structures, teams, and leadership systems. She is passionate about creating workplaces that prioritize ethics, safeguarding, and inclusive growth while enabling organizations to attract and retain top talent. Mercy has advised and trained organizations ranging from start-ups and MSMEs to established enterprises, guiding them in areas such as safeguarding, human capital development, leadership coaching, and organizational strengthening.",
        expertise: [
          "Safeguarding & Workplace Ethics",
          "People & Talent Development",
          "Organizational Capacity Building",
          "Training & Facilitation"
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
        "Identify leadership styles that fit creative industries",
        "Develop strategies for attracting and retaining high-performing teams",
        "Build succession plans and nurture next-generation leaders",
        "Share talent retention challenges and solutions with peers",
        "Plan your talent pipeline for 2026 growth"
      ],
      takeawayToolkit: "Leadership self-assessment + Talent retention strategy canvas",
      whyAttend: [
        "People-Centered Approach: Learn to build agencies that prioritize human development",
        "Practical Strategies: Get actionable frameworks for talent retention and leadership development",
        "Peer Learning: Share challenges and solutions with fellow agency leaders",
        "Future Planning: Develop your talent pipeline for sustainable growth"
      ],
      outcome: "By attending this masterclass, you will get 5% off on PAAN Summit 2026 tickets & 10% off on the Africa Creative Excellence Awards entry.",
      status: "completed"
    },
    6: {
      id: 6,
      title: "How To Develop Winning Pitches and Retain Clients",
      description: "In today's competitive agency landscape, winning a pitch is only half the battle — retaining the client and growing the relationship is where agencies truly thrive. Too often, weak or incomplete briefs set agencies up for failure, leading to missed opportunities and frustrated clients.",
      fullDescription: "This masterclass is designed to equip agency professionals with the tools, frameworks, and confidence to transform briefs into powerful pitches — and pitches into long-term client partnerships. Participants will learn how to interrogate client briefs, ask the right questions, and structure proposals that not only demonstrate understanding but also position their agency as a trusted business partner. Through practical exercises and proven methodologies, you'll leave with a clear playbook for winning new business and deepening client trust.",
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
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/winning-pitches.jpg",
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      instructor: {
        name: "Abigail Dixon",
        title: "Chartered Marketer and Fellow, CIM Consultant & Trainer",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/abigail-dixon.jpg",
        bio: "Abigail Dixon is a Chartered Marketer and Fellow, an approved and accredited CIM (Chartered Institute of Marketing) consultant and trainer. Throughout her 20 year career she has gained an extensive track record for delivering profitable brand growth both client-side at Bosch, Premier Foods, Burger King and Britvic and, latterly, in a consultancy capacity through her consultancy Labyrinth Marketing which strive to step change brands, peoples and agencies growth through consultancy, mentoring, training and coaching. This is done across multiple categories and sectors whose clients GSK, TBK, Ferrero, SHS group to name a few. Abby is passionate about improving the client and agency relationship and works with both relevant professional bodies CIM/IPM to step change the capability and competencies required through training and mentoring.",
        expertise: [
          "Strategic Planning & Brand Growth",
          "Client-Agency Relationship Management",
          "Marketing Consultancy & Training",
          "Pitch Development & Brief Analysis"
        ]
      },
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
      whyAttend: [
        "Practical Application: Learn proven methodologies you can apply immediately",
        "Expert Guidance: 20+ years of experience in both client-side and agency environments",
        "Comprehensive Framework: Get a complete playbook for winning pitches and retaining clients",
        "Industry Recognition: Training from an accredited CIM consultant and trainer"
      ],
      outcome: "Through practical exercises and proven methodologies, you'll leave with a clear playbook for winning new business and deepening client trust.",
      status: "completed"
    },
    7: {
      id: 7,
      title: "How To Be The Best Account Handler In Your Agency",
      description: "Account Handlers are a positive and competitive lot by nature. But the transition from lively pup to 'Top Dog' often seems a difficult and frustrating process. The problem is that 'on the job training' is only as good as 'that particular job'. This course provides an ideal opportunity to really focus on what makes a good Account Handler GREAT.",
      fullDescription: "This 90-minute training course is aimed at developing tried and trusted methods of the art of Account Handling, a timely refresher for some, a lifesaver for others. Designed specifically for junior-level agency Account Handlers with 1-3 years of experience who now know how to do the basics but want to step up a level. Learn how to take control of your time, lead with confidence, and balance client demands with agency realities.",
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
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/account-handler.jpg",
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      instructor: {
        name: "Paul Burns",
        title: "Former Training Director at Saatchi & Saatchi, Co-founder of Rock and a Hardplace",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/paul-burns.jpg",
        bio: "Paul Burns spent 25 very successful and exciting years at Saatchi & Saatchi, looking after client business. He became their Training Director and first Director of Knowledge Practices, sitting on the main Management Board of the Agency. He is recognised to have passion and skill in developing people and has won several industry awards for Learning and Development. He has run accounts across a wide variety of businesses, from the hugely successful bid and launch of the National Lottery, to fast turnaround business on News International. He has led teams on large and complex financial brands and has run countless Blue Chip FMCG brands. In 2015, he became a co-founder of Rock and a Hardplace, a new and award-winning eLearning program for the Marcoms industry.",
        expertise: [
          "Account Management & Client Relations",
          "Team Leadership & Development",
          "Training & Knowledge Management",
          "Agency Operations & Strategy"
        ]
      },
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
      courseObjectives: [
        "Master time management and productivity techniques for account handlers",
        "Develop leadership skills to inspire colleagues and guide teams effectively",
        "Learn to balance client expectations with agency capabilities professionally",
        "Gain confidence in handling difficult client conversations and situations"
      ],
      whyAttend: [
        "Proven Experience: Learn from 25+ years of successful agency account management",
        "Practical Tools: Get actionable techniques for time management and leadership",
        "Industry Recognition: Training from an award-winning Learning & Development expert",
        "Career Development: Perfect for account handlers ready to step up to the next level"
      ],
      outcome: "This course provides an ideal opportunity to really focus on what makes a good Account Handler GREAT, with tried and trusted methods of the art of Account Handling.",
      status: "completed"
    },
    8: {
      id: 8,
      title: "How To Present Creative Work to Clients",
      description: "Creative presentations are make-or-break moments. Yet most teams rarely pause to consider what the experience feels like on the client side — the pressure, the uncertainty, the fear of making the wrong call in the room. When these dynamics aren't understood, feedback becomes scattered, key decisions happen offline, and strong ideas lose momentum.",
      fullDescription: "This masterclass helps you reshape how you present creative work by stepping inside your clients' world. Led by former agency MD turned Unilever Global Brand Director James Hayhurst, this session equips you with practical tools to present ideas clearly, build empathy, and create presentation environments where great work can genuinely thrive. Through real-world examples and interactive exercises, you'll learn how to structure presentations that reduce anxiety, improve feedback quality, and increase the chance of clients buying your strongest ideas.",
      format: "90-minute Interactive Training Course",
      date: "December 4th, 2025",
      time: "10:00 am EAT",
      memberPrice: 174,
      memberOriginalPrice: 250,
      nonMemberPrice: 250,
      nonMemberOriginalPrice: 320,
      currency: "USD",
      category: "Creative Strategy",
      level: "Junior to Mid-Level",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/how-to-present-creative-work-to-clients-2.jpg",
      partnership: "PAAN, in collaboration with the Alliance of Independent Agencies, UK",
      instructor: {
        name: "James Hayhurst",
        title: "Former Agency MD & Unilever Global Brand Director",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/james-hayhurst.jpg",
        bio: "James Hayhurst began his career agency-side at BMP DDB (now Adam&Eve DDB), contributing to award-winning work for brands such as Volkswagen, Channel 4, and the Teacher Training Agency. He later became Managing Director at Leagas Delaney, overseeing brands including Glenfiddich, Patek Philippe, and Timberland. In 2014, James moved client-side to Unilever as Global Brand Equity Director for OMO/Persil, gaining firsthand insight into client culture, decision-making, and the often-unspoken challenges agencies rarely see. Recognising the empathy gap between agencies and clients, he created The Magic Sauce, a programme designed to bridge that gap by improving understanding, collaboration, and creative outcomes across both sides of the industry.",
        expertise: [
          "Creative presentation strategy",
          "Client-agency collaboration",
          "Brand equity management",
          "Award-winning creative work"
        ]
      },
      benefits: [
        "5% off on PAAN Summit 2026 tickets",
        "6% off Africa Creative Excellence Awards entry"
      ],
      whoShouldAttend: [
        "Junior to mid-level agency teams",
        "Creative professionals presenting to clients",
        "Account handlers and client-facing staff",
        "Creative directors and team leads"
      ],
      learningOutcomes: [
        "What it feels like to be on the receiving end of creative presentations and the pressures clients face",
        "How to present ideas clearly - distinguishing the core idea, the execution, and what truly matters",
        "How to design a gamified presentation format that is engaging, structured, and more enjoyable for all",
        "How to ask stronger feedback questions that help clients feel heard and lead to better solutions",
        "How to plan stakeholder management in partnership with your client teams"
      ],
      courseObjectives: [
        "Master the art of presenting creative work with clarity and confidence",
        "Build empathy and understanding of client perspectives during presentations",
        "Create presentation environments where great work can genuinely thrive",
        "Improve feedback quality and increase the chance of clients buying your strongest ideas"
      ],
      whyAttend: [
        "Client Perspective: Step inside your clients' world and understand their pressures and decision-making process",
        "Expert Guidance: Learn from someone who's been on both sides - agency MD and global brand director",
        "Practical Tools: Get actionable frameworks and techniques you can apply immediately",
        "Real-World Examples: Learn through interactive exercises and live creative presentation practice"
      ],
      outcome: "By attending this masterclass, you will get 5% off on PAAN Summit 2026 tickets & 6% off on the Africa Creative Excellence Awards entry.",
      status: "upcoming"
    },
    9: {
      id: 9,
      title: "Agency Positioning That Cuts Through the Noise",
      description: "Learn how to sharpen your agency's positioning so clients understand your value quickly, clearly, and confidently. This session focuses on differentiation, clarity, and how to move away from being seen as \"just another agency.\"",
      fullDescription: "\"Creative-led,\" \"customer-focused,\" \"insight-driven\". Clients see these statements daily, yet none explain why an agency is unique or worth a premium price. Stuart Dunk will break down proven frameworks used by agencies across multiple countries to build sharp, differentiated positioning rooted in client value, competitive advantage, and strategic clarity. You'll learn how top-performing agencies craft value propositions that challenge assumptions, stand out in pitch rooms, and attract the right clients.",
      format: "90-minute Interactive Training Course",
      date: "January 28th, 2026",
      time: "12PM EAT",
      memberPrice: 150,
      memberOriginalPrice: 250,
      nonMemberPrice: 170,
      nonMemberOriginalPrice: 320,
      currency: "USD",
      category: "Business Development",
      level: "Intermediate",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/positioning.jpg",
      partnership: "PAAN, in collaboration with agency growth experts",
      instructor: {
        name: "Stuart Dunk",
        title: "Founder & Managing Director, Don't Forget to Look",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/stuart-dunk.jpg",
        bio: "After starting his career agency-side, Stuart worked in Marketing Procurement for 14 years at global brands like Reckitt, Nike, and Danone. For the last 6 years, he has been taking that knowledge of how brands buy, with the mission of \"Helping Agency Leaders Sleep Better at Night.\" He is one of the very few consultants who understands both sides of the table, agency and procurement, giving him unmatched insight into how agencies can differentiate, influence buyers, and win high-value deals. Stu runs workshops on various aspects of agency growth, provides pitch and proposal-writing support, and also runs bespoke programs on agency marketing, sales, positioning, and outreach for his clients. His work is designed to increase margin, conversion, and retention, and create more capability and confidence for both agency leaders and their teams.",
        expertise: [
          "Marketing Procurement & Buyer Psychology",
          "Agency Positioning & Differentiation",
          "Pitching & Proposal Writing",
          "Pricing Models"
        ]
      },
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
        "The \"3C Framework\" + \"The Benefit Ladder:\"  2 frameworks for building great agency positioning",
        "How to craft a value proposition that cuts through the noise",
        "How to avoid generic position that undermines client perception",
        "How to build a \"client value map\" to influence perception and buying decisions",
        "Examples of exceptional agency positioning and why they work"
      ],
      courseObjectives: [
        "Define a differentiated positioning that influences targets and clients to see you as rare, rather than one of many",
        "Build a strong, repeatable value proposition for pitches and website copy",
        "Identify and eliminate weak, generic messaging",
        "Align service offerings, marketing, and BD processes to the new positioning"
      ],
      whyAttend: [
        "Agencies who are well-positioned win more, and increase their margin",
        "Stand out across marketing + sales touchpoints like web, creds and proposals",
        "Attract better-fit clients who already see your agency as 'the right choice'",
        "Build messaging that increases lead quality",
        "Move from \"service provider\" to \"strategic partner\" in the eyes of clients"
      ],
      outcome: "By attending this masterclass, you will get 5% off on PAAN Summit 2026 tickets & 6% off on the Africa Creative Excellence Awards entry.",
      status: "upcoming",
      series: "Mastering Agency Growth in 2026",
      seriesOrder: 1
    },
    11: {
      id: 11,
      title: "Pricing for Maximum Profit Margin & Conversion",
      description: "Pricing is one of the most emotional and misunderstood parts of agency life. Most teams default to hourly or blended rates, under-valuing their work value and undermining their position as the expert, because they feel \"safe\" in doing it \"how it's always been done.\" Meanwhile, clients are under pressure to justify spending and prove ROI, creating tension in negotiations that agencies often don't know how to navigate. Armed with a wider pricing toolkit, pricing signals expertise and confidence to clients. Agencies finally claim power in the commercial conversation.",
      fullDescription: "This masterclass will show you how to shift pricing from being about you (your time and effort) to the client (deliverables and outcomes). By understanding how to build and land pricing in a progressive way, with value-based pricing principles at the centre, you'll learn how to present fees with confidence, defend your worth, and structure pricing that profit margins and gives the client more ways to say yes. From performance-based structures to pricing psychology, Stuart will teach you exactly how to navigate pricing conversations so you win more high margin deals.",
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
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/masterclass-pricing.jpg",
      partnership: "PAAN, in collaboration with agency growth experts",
      instructor: {
        name: "Stuart Dunk",
        title: "Founder & Managing Director, Don't Forget to Look",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/stuart-dunk.jpg",
        bio: "After starting his career agency-side, Stuart worked in Marketing Procurement for 14 years at global brands like Reckitt, Nike, and Danone. For the last 6 years, he has been taking that knowledge of how brands buy, with the mission of \"Helping Agency Leaders Sleep Better at Night.\" He is one of the very few consultants who understands both sides of the table, agency and procurement, giving him unmatched insight into how agencies can differentiate, influence buyers, and win high-value deals. Stu runs workshops on various aspects of agency growth, provides pitch and proposal-writing support, and also runs bespoke programs on agency marketing, sales, positioning, and outreach for his clients. His work is designed to increase margin, conversion, and retention, and create more capability and confidence for both agency leaders and their teams.",
        expertise: [
          "Marketing Procurement & Buyer Psychology",
          "Agency Positioning & Differentiation",
          "Pitching & Proposal Writing",
          "Pricing Models",
          "Value-based selling",
          "Negotiation & Influence"
        ]
      },
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
      outcome: "By attending this masterclass, you will get 5% off on PAAN Summit 2026 tickets.",
      status: "upcoming",
      series: "Mastering Agency Growth in 2026",
      seriesOrder: 2
    },
    12: {
      id: 12,
      title: "How to Navigate Procurement Processes & People",
      description: "Procurement is often seen as an obstacle — the department that cuts budgets, tightens scopes, and pushes for discounts. But behind the scenes, procurement is driven by specific pressures, performance metrics, and risk factors that agencies rarely understand. By understanding how procurement think, are trained, and incentivised, you'll be able to influence decisions earlier, avoid price-led conversations, and win business with far more confidence.",
      fullDescription: "Procurement can be one of the biggest barriers, or biggest allies, in agency growth. When agencies fear procurement, or allow past experiences to shape their thinking and approach, we undermine our own power. By better knowing procurement, their goals, language, and how to navigate them, we enter pitches and negotiations at a disadvantage. In this masterclass, Stuart will demystify procurement and give agencies the tools to influence commercial decisions confidently and effectively. You'll uncover how procurement prepares for negotiations, how buyers categorize agencies in a way that often leads to price negotiations, (and how you can avoid that!), how to identify and navigate the buyer type you're dealing with, and how to optimise communication to win trust and close deals.",
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
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/masterclass-procurement.jpg",
      partnership: "PAAN, in collaboration with agency growth experts",
      instructor: {
        name: "Stuart Dunk",
        title: "Founder & Managing Director, Don't Forget to Look",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/stuart-dunk.jpg",
        bio: "After starting his career agency-side, Stuart worked in Marketing Procurement for 14 years at global brands like Reckitt, Nike, and Danone. For the last 6 years, he has been taking that knowledge of how brands buy, with the mission of \"Helping Agency Leaders Sleep Better at Night.\" He is one of the very few consultants who understands both sides of the table, agency and procurement, giving him unmatched insight into how agencies can differentiate, influence buyers, and win high-value deals. Stu runs workshops on various aspects of agency growth, provides pitch and proposal-writing support, and also runs bespoke programs on agency marketing, sales, positioning, and outreach for his clients. His work is designed to increase margin, conversion, and retention, and create more capability and confidence for both agency leaders and their teams.",
        expertise: [
          "Marketing Procurement & Buyer Psychology",
          "Agency Positioning & Differentiation",
          "Pitching & Proposal Writing",
          "Pricing Models",
          "Value-based selling",
          "Negotiation & Influence"
        ]
      },
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
      outcome: "By attending this masterclass, you will get 5% off on PAAN Summit 2026 tickets.",
      status: "upcoming",
      series: "Mastering Agency Growth in 2026",
      seriesOrder: 3
    },
    13: {
      id: 13,
      title: "Effective Time Management",
      description: "Learn how to take control of your time in hybrid and remote agency environments without burning out or working longer hours.",
      fullDescription: "Working patterns have changed, but many of our habits haven't. In hybrid and remote setups, boundaries blur, priorities compete, and time pressure quietly builds. This practical session helps agency professionals step back, reassess how they work, and adopt clearer, calmer approaches to managing time, tasks, and energy. You'll leave with tools you can apply immediately.",
      format: "Live Online | 60 mins",
      date: "January 27th, 2026",
      time: "12:15 pm – 1:15 pm EAT",
      memberPrice: 174,
      nonMemberPrice: 250,
      currency: "USD",
      category: "Leadership",
      level: "Junior to Mid-Level",
      image: "https://ik.imagekit.io/nkmvdjnna/PAAN/masterclasses/effective-time-management.jpg?updatedAt=1768544129255",
      instructor: {
        name: "Fran Longford",
        title: "Founder & Lead Trainer, FL Training",
        image: "https://ik.imagekit.io/nkmvdjnna/PAAN/instructors/fran-longford.jpg",
        bio: "Fran spent 15 years leading client business at top agencies before becoming Joint MD of Triangle Communications, where she focused on client retention and people development. She later founded FL Training to pursue her passion for helping managers and teams perform at their best. Fran works across the marcoms industry, delivering practical training and coaching that empowers people to work smarter, not harder.",
        expertise: [
          "Time Management",
          "Productivity & Focus",
          "Team Development",
          "Agency Operations"
        ]
      },
      benefits: [
        "5% off on PAAN Summit 2026 tickets",
        "10% off ACE awards"
      ],
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
      courseObjectives: [
        "Have a clearer understanding of how they currently use their time",
        "Identify key behaviours that undermine productivity",
        "Understand how to plan work more realistically",
        "Recognise how time management supports wellbeing and performance"
      ],
      whyAttend: [
        "Regain a sense of control over your workload",
        "Reduce stress caused by poor planning and constant interruptions",
        "Improve focus and consistency in day-to-day work",
        "Work more effectively in hybrid and remote settings"
      ],
      outcome: "By attending this masterclass, you will get 5% off on PAAN Summit 2026 tickets & 10% off ACE awards.",
      status: "upcoming"
    }
  };

  // Add loading state for router query
  if (!id) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  const masterclass = masterclasses[id] || masterclasses[1];

  // Generate meta data
  const pageTitle = `${masterclass.title} - PAAN Masterclass`;
  const pageDescription = masterclass.description;
  const pageUrl = `https://paan.africa/masterclasses/${id}`;
  const pageImage = masterclass.image;
  const instructorName = masterclass.instructor.name;
  const instructorTitle = masterclass.instructor.title;
  const masterclassDate = masterclass.date;
  const masterclassTime = masterclass.time;
  const masterclassFormat = masterclass.format;
  const memberPrice = masterclass.memberPrice;
  const nonMemberPrice = masterclass.nonMemberPrice;
  const currency = masterclass.currency;

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": masterclass.title,
    "description": masterclass.description,
    "provider": {
      "@type": "Organization",
      "name": "Pan-African Advertising Network (PAAN)",
      "url": "https://paan.africa"
    },
    "instructor": {
      "@type": "Person",
      "name": instructorName,
      "jobTitle": instructorTitle,
      "description": masterclass.instructor.bio
    },
    "courseMode": "online",
    "educationalLevel": masterclass.level,
    "coursePrerequisites": "Professional experience in advertising and marketing",
    "syllabusSections": masterclass.learningOutcomes?.map(outcome => ({
      "@type": "Syllabus",
      "description": outcome
    })),
    "offers": [
      {
        "@type": "Offer",
        "name": "PAAN Member Price",
        "price": memberPrice,
        "priceCurrency": currency,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      },
      {
        "@type": "Offer", 
        "name": "Non-Member Price",
        "price": nonMemberPrice,
        "priceCurrency": currency,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      }
    ],
    "image": pageImage,
    "url": pageUrl,
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };

  const handlePromoCodeValidation = async () => {
    if (!promoCode.trim()) {
      setPromoCodeError('');
      setAppliedPromoCode(null);
      return;
    }

    setIsValidatingPromoCode(true);
    setPromoCodeError('');

    const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
    const totalPrice = basePrice * seatCount;

    const validation = await validateMasterclassPromoCode(promoCode.trim(), masterclass.id, totalPrice);
    
    setIsValidatingPromoCode(false);

    if (validation.valid) {
      setAppliedPromoCode(validation.promoCode);
      setPromoCodeError('');
    } else {
      setAppliedPromoCode(null);
      setPromoCodeError(validation.error || 'Invalid promo code');
    }
  };

  const handlePaystackPayment = async () => {
    if (!customerInfo.email || !customerInfo.name) {
      alert('Please fill in your email and name to proceed.');
      return;
    }

    // Check if Paystack is ready
    if (!paystackReady) {
      alert("Payment system is loading. Please wait a moment and try again.");
      return;
    }

    setIsLoading(true);

    const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
    const totalPrice = basePrice * seatCount;
    
    // Apply discount if promo code is valid
    const discountAmount = appliedPromoCode ? appliedPromoCode.discountAmount : 0;
    const finalPrice = totalPrice - discountAmount;
    
    const currency = "USD";
    const amountInCents = Math.max(0, Math.round(finalPrice * 100));

    // Check if Paystack key is configured
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      alert("Payment system not configured. Please contact support.");
      setIsLoading(false);
      return;
    }

    // Generate a unique reference
    const reference = `PAAN_MASTERCLASS_${masterclass.id}_${selectedPricing}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Paystack configuration
    const paystackConfig = {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: customerInfo.email,
      amount: amountInCents,
      currency: currency,
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: customerInfo.name
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: customerInfo.phone
          },
          {
            display_name: "Organization",
            variable_name: "organization",
            value: customerInfo.organization
          },
          {
            display_name: "Masterclass",
            variable_name: "masterclass",
            value: masterclass.title
          },
          {
            display_name: "Pricing Type",
            variable_name: "pricing_type",
            value: selectedPricing
          },
          {
            display_name: "Seat Count",
            variable_name: "seat_count",
            value: seatCount.toString()
          },
          {
            display_name: "Base Price",
            variable_name: "base_price",
            value: basePrice.toString()
          },
          {
            display_name: "Total Price",
            variable_name: "total_price",
            value: totalPrice.toString()
          },
          {
            display_name: "Masterclass ID",
            variable_name: "masterclass_id",
            value: masterclass.id.toString()
          }
        ]
      },
      callback: function(response) {
        if (response.status === 'success') {
          // Send masterclass purchase data to backend
          fetch('/api/send-masterclass-purchase', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentData: {
                reference: response.reference,
                amount: amountInCents,
                currency: currency,
                status: 'success',
                paidAt: new Date().toISOString()
              },
              masterclassData: {
                name: customerInfo.name,
                email: customerInfo.email,
                phone: customerInfo.phone,
                organization: customerInfo.organization,
                masterclassId: masterclass.id,
                masterclassTitle: masterclass.title,
                pricingType: selectedPricing,
                seatCount: seatCount,
                basePrice: basePrice,
                totalAmount: totalPrice,
                discountAmount: discountAmount,
                finalAmount: finalPrice,
                promoCode: appliedPromoCode ? appliedPromoCode.code : null,
                amount: finalPrice,
                currency: currency,
                date: masterclass.date,
                time: masterclass.time,
                format: masterclass.format,
                instructor: masterclass.instructor.name
              },
              reference: response.reference
            }),
          })
          .then(emailResponse => emailResponse.json())
          .then(emailResult => {
            if (emailResult.success) {
              console.log('Masterclass purchase email sent successfully');
            } else {
              console.error('Failed to send masterclass purchase email:', emailResult.message);
            }
          })
          .catch(emailError => {
            console.error('Error sending masterclass purchase email:', emailError);
            // Don't block the payment success flow if email fails
          });

          // Redirect to success page with reference
          window.location.href = `/payment/success?reference=${response.reference}&type=masterclass`;
        } else {
          alert('Payment failed. Please try again.');
          setIsLoading(false);
        }
      },
      onClose: function() {
        // Redirect to failure page
        window.location.href = `/payment/failure?error=${encodeURIComponent('Payment was cancelled by user')}&reference=${reference}`;
        setIsLoading(false);
      }
    };

    // Initialize Paystack
    try {
      const handler = window.PaystackPop.setup(paystackConfig);
      handler.openIframe();
    } catch (error) {
      console.error('Error initializing Paystack:', error);
      alert('Payment system error. Please refresh the page and try again.');
      setIsLoading(false);
    }
  };

  const generateProfessionalPDFInvoice = () => {
    if (!customerInfo.email || !customerInfo.name) {
      alert('Please fill in your email and name to generate invoice.');
      return;
    }
    
    const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
    const totalPrice = basePrice * seatCount;
    const invoiceNumber = `INV-MC-${Date.now()}`;
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create PDF
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Header - PAAN Logo area (we'll add text for now, logo can be added later)
    doc.setFontSize(24);
    doc.setTextColor(23, 40, 64); // PAAN dark blue
    doc.text('PAAN', 20, 30);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Pan-African Advertising Network', 20, 38);
    
    // Invoice title
    doc.setFontSize(28);
    doc.setTextColor(242, 88, 73); // PAAN red
    doc.text('INVOICE', 140, 30);
    
    // Invoice details
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice #: ${invoiceNumber}`, 140, 45);
    doc.text(`Date: ${currentDate}`, 140, 52);
    doc.text(`Due Date: ${currentDate}`, 140, 59);
    
    // Horizontal line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 70, 190, 70);
    
    // Bill To section
    doc.setFontSize(12);
    doc.setTextColor(23, 40, 64);
    doc.text('BILL TO:', 20, 85);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    let yPos = 95;
    doc.text(customerInfo.name, 20, yPos);
    yPos += 7;
    doc.text(customerInfo.email, 20, yPos);
    if (customerInfo.phone) {
      yPos += 7;
      doc.text(customerInfo.phone, 20, yPos);
    }
    if (customerInfo.organization) {
      yPos += 7;
      doc.text(customerInfo.organization, 20, yPos);
    }
    
    // Masterclass details section
    yPos += 20;
    doc.setFontSize(12);
    doc.setTextColor(23, 40, 64);
    doc.text('MASTERCLASS DETAILS:', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Title: ${masterclass.title}`, 20, yPos);
    yPos += 7;
    doc.text(`Date: ${masterclass.date}`, 20, yPos);
    yPos += 7;
    doc.text(`Time: ${masterclass.time}`, 20, yPos);
    yPos += 7;
    doc.text(`Format: ${masterclass.format}`, 20, yPos);
    yPos += 7;
    doc.text(`Instructor: ${masterclass.instructor.name}`, 20, yPos);
    
    // Items table
    yPos += 20;
    
    // Table header
    doc.setFillColor(242, 88, 73); // PAAN red background
    doc.rect(20, yPos, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('DESCRIPTION', 25, yPos + 7);
    doc.text('PRICING TYPE', 100, yPos + 7);
    doc.text('QTY', 140, yPos + 7);
    doc.text('AMOUNT', 160, yPos + 7);
    
    // Table row
    yPos += 10;
    doc.setFillColor(248, 249, 250);
    doc.rect(20, yPos, 170, 15, 'F');
    doc.setTextColor(0, 0, 0);
    
    // Wrap long masterclass title
    const splitTitle = doc.splitTextToSize(masterclass.title, 70);
    doc.text(splitTitle, 25, yPos + 7);
    
    doc.text(selectedPricing === 'member' ? 'Member' : 'Non-Member', 100, yPos + 7);
    doc.text(seatCount.toString(), 140, yPos + 7);
    doc.text(`$${totalPrice}`, 160, yPos + 7);
    
    // Total section
    yPos += 25;
    doc.setDrawColor(200, 200, 200);
    doc.line(120, yPos, 190, yPos);
    
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(23, 40, 64);
    doc.text('SUBTOTAL:', 120, yPos);
    doc.text(`$${totalPrice} USD`, 160, yPos);
    
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(242, 88, 73);
    doc.text('TOTAL:', 120, yPos);
    doc.text(`$${totalPrice} USD`, 160, yPos);
    
    // Footer
    yPos += 30;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for choosing PAAN Masterclasses!', 20, yPos);
    yPos += 7;
    doc.text('For questions, contact: support@paan.africa', 20, yPos);
    yPos += 7;
    doc.text('Website: www.paan.africa', 20, yPos);
    
    // Benefits section
    if (masterclass.benefits && masterclass.benefits.length > 0) {
      yPos += 15;
      doc.setFontSize(12);
      doc.setTextColor(23, 40, 64);
      doc.text('BONUS BENEFITS INCLUDED:', 20, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      masterclass.benefits.forEach((benefit) => {
        doc.text(`• ${benefit}`, 25, yPos);
        yPos += 7;
      });
    }
    
    // Save the PDF
    doc.save(`PAAN-Masterclass-Invoice-${invoiceNumber}.pdf`);
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`PAAN, masterclass, ${masterclass.category}, ${instructorName}, advertising, marketing, professional development, ${masterclass.level}`} />
        <meta name="author" content="Pan-African Advertising Network" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="PAAN - Pan-African Advertising Network" />
        <meta property="og:locale" content="en_US" />

        {/* Course-specific Open Graph tags */}
        <meta property="course:instructor" content={instructorName} />
        <meta property="course:instructor_title" content={instructorTitle} />
        <meta property="course:date" content={masterclassDate} />
        <meta property="course:time" content={masterclassTime} />
        <meta property="course:format" content={masterclassFormat} />
        <meta property="course:level" content={masterclass.level} />
        <meta property="course:category" content={masterclass.category} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PAAN_Africa" />
        <meta name="twitter:creator" content="@PAAN_Africa" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Pricing Information */}
        <meta name="price:member" content={`${memberPrice} ${currency}`} />
        <meta name="price:non-member" content={`${nonMemberPrice} ${currency}`} />
        <meta name="currency" content={currency} />

        {/* Event Information */}
        <meta name="event:date" content={masterclassDate} />
        <meta name="event:time" content={masterclassTime} />
        <meta name="event:format" content={masterclassFormat} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#172840" />
        <meta name="msapplication-TileColor" content="#172840" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PAAN Masterclass" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://js.paystack.co" />
      </Head>
      <PaystackScript />
      <Header navLinkColor="text-gray-950" />
      <div className="relative">
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 pt-40 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Content */}
                <div className="space-y-6">
                  <button
                    onClick={() => (window.location.href = "/masterclasses")}
                    className="inline-flex items-center text-cyan-400 hover:text-white transition-colors text-sm"
                  >
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
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      masterclass.status === 'upcoming' ? 'bg-red-500 text-white' :
                      masterclass.status === 'completed' ? 'bg-gray-500 text-white' :
                      masterclass.status === 'not-accepting-bookings' ? 'bg-gray-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {masterclass.status === 'upcoming' ? 'UPCOMING' :
                       masterclass.status === 'completed' ? 'COMPLETED' :
                       masterclass.status === 'not-accepting-bookings' ? 'NOT ACCEPTING BOOKINGS' :
                       'UPCOMING'}
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
                    alt={`${masterclass.title} masterclass`}
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
                        <p className="text-gray-700 text-sm leading-relaxed">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Objectives */}
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

                {/* Pricing & Purchase Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Register Now</h2>
                  
                  {/* Seat Selection */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-900 text-sm mb-3">Number of Seats</h3>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
                        disabled={seatCount <= 1}
                      >
                        <Icon icon="mdi:minus" className="w-5 h-5" />
                      </button>
                      <div className="flex-1 max-w-20">
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={seatCount}
                          onChange={(e) => setSeatCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <button
                        onClick={() => setSeatCount(Math.min(50, seatCount + 1))}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
                        disabled={seatCount >= 50}
                      >
                        <Icon icon="mdi:plus" className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {seatCount === 1 ? 'Individual registration' : `Group registration for ${seatCount} participants`}
                    </p>
                  </div>
                  
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
                      <div className="flex items-center gap-3 mb-1">
                        <div className="text-3xl font-bold text-slate-900">
                          ${(() => {
                            const basePrice = masterclass.memberPrice * seatCount;
                            const discount = (appliedPromoCode && selectedPricing === 'member') ? appliedPromoCode.discountAmount : 0;
                            return (basePrice - discount).toFixed(2);
                          })()}
                        </div>
                        {masterclass.memberOriginalPrice && (
                          <div className="text-lg text-gray-500 line-through">
                            ${masterclass.memberOriginalPrice * seatCount}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-gray-600 text-sm">
                          ${masterclass.memberPrice} × {seatCount} seat{seatCount > 1 ? 's' : ''}
                        </p>
                        {masterclass.memberOriginalPrice && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold self-start">
                            Save ${(masterclass.memberOriginalPrice - masterclass.memberPrice) * seatCount}
                          </span>
                        )}
                      </div>
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
                      <div className="flex items-center gap-3 mb-1">
                        <div className="text-3xl font-bold text-slate-900">
                          ${(() => {
                            const basePrice = masterclass.nonMemberPrice * seatCount;
                            const discount = (appliedPromoCode && selectedPricing === 'non-member') ? appliedPromoCode.discountAmount : 0;
                            return (basePrice - discount).toFixed(2);
                          })()}
                        </div>
                        {masterclass.nonMemberOriginalPrice && (
                          <div className="text-lg text-gray-500 line-through">
                            ${masterclass.nonMemberOriginalPrice * seatCount}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-gray-600 text-sm">
                          ${masterclass.nonMemberPrice} × {seatCount} seat{seatCount > 1 ? 's' : ''}
                        </p>
                        {masterclass.nonMemberOriginalPrice && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold self-start">
                            Save ${(masterclass.nonMemberOriginalPrice - masterclass.nonMemberPrice) * seatCount}
                          </span>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Promo Code Section */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-900 text-sm mb-3">Have a Discount Code?</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value.toUpperCase());
                          setPromoCodeError('');
                          setAppliedPromoCode(null);
                        }}
                        onBlur={handlePromoCodeValidation}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
                      />
                      <button
                        onClick={handlePromoCodeValidation}
                        disabled={isValidatingPromoCode || !promoCode.trim()}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {isValidatingPromoCode ? (
                          <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                    {promoCodeError && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <Icon icon="mdi:alert-circle" className="w-4 h-4" />
                        {promoCodeError}
                      </p>
                    )}
                    {appliedPromoCode && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:check-circle" className="text-green-600 w-5 h-5" />
                            <span className="text-green-800 text-sm font-medium">
                              {appliedPromoCode.code} applied
                            </span>
                          </div>
                          <span className="text-green-800 text-sm font-semibold">
                            -${appliedPromoCode.discountAmount.toFixed(2)}
                          </span>
                        </div>
                        {appliedPromoCode.description && (
                          <p className="text-green-700 text-xs mt-1">{appliedPromoCode.description}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 text-sm">Primary Contact Information</h3>
                      {seatCount > 1 && (
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          Group Registration
                        </span>
                      )}
                    </div>
                    {seatCount > 1 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <Icon icon="mdi:information" className="text-blue-600 w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-blue-700">
                            <p className="font-medium mb-1">Group Registration for {seatCount} participants</p>
                            <p>Please provide the primary contact details below. After payment, you'll receive instructions on how to register additional participants.</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                      onClick={handlePaystackPayment}
                      disabled={isLoading || !paystackReady || !customerInfo.email || !customerInfo.name}
                      className="w-full bg-red-500 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : !paystackReady ? (
                        <>
                          <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                          Loading Payment System...
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:credit-card" className="w-5 h-5" />
                          Register Now - ${(() => {
                            const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
                            const totalPrice = basePrice * seatCount;
                            const discountAmount = appliedPromoCode ? appliedPromoCode.discountAmount : 0;
                            const finalPrice = totalPrice - discountAmount;
                            return finalPrice.toFixed(2);
                          })()}
                        </>
                      )}
                    </button>
                    
                    {/* <button
                      onClick={generateProfessionalPDFInvoice}
                      disabled={!customerInfo.email || !customerInfo.name}
                      className="w-full bg-gray-100 text-gray-700 px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-3"
                    >
                      <Icon icon="mdi:download" className="w-5 h-5" />
                      Generate PDF Invoice
                    </button> */}
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

              </div>

              {/* Sidebar */}
              <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                {/* Instructor Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Your Instructor</h3>
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden border-2 border-red-100">
                      {masterclass.instructor.image ? (
                        <img
                          src={masterclass.instructor.image}
                          alt={masterclass.instructor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center ${masterclass.instructor.image ? 'hidden' : 'flex'}`}>
                        <Icon icon="mdi:account" className="w-10 h-10 text-white" />
                      </div>
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
                    <button
                      onClick={handleShare}
                      className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 text-sm border border-gray-200"
                    >
                      <Icon icon="mdi:share" className="w-4 h-4" />
                      Share This
                    </button>

                    <button
                      onClick={() => (window.location.href = "/masterclasses")}
                      className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm border border-gray-200"
                    >
                      Browse More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MasterclassDetailPage;