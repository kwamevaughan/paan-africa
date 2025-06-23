import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQs = () => {
  const [activeButton, setActiveButton] = useState("About PAAN");
  const [openFAQ, setOpenFAQ] = useState(null);

  const buttons = [
    "About PAAN",
    "Collaboration", 
    "Tools & Resources",
    "Mentorship",
    "Marketing",
    "Governance"
  ];

  const faqData = {
    "About PAAN": [
      {
        question: "What is PAAN?",
        answer: "PAAN connects you to cross-border deals, shared tools, mentorship, increased visibility, and revenue growth — while keeping your agency fully independent."
      },
      {
        question: "Who can join PAAN?",
        answer: "PAAN is open to all African professionals, alumni from African institutions, and members of the African diaspora who are committed to contributing to Africa's development and growth."
      },
      {
        question: "What are the main benefits of joining?",
        answer: "Members gain access to a vast network of professionals, mentorship opportunities, business collaboration platforms, career development resources, and exclusive events across Africa and internationally."
      },
      {
        question: "How do I become a member?",
        answer: "You can join PAAN by completing our online application form, providing your professional background, and paying the annual membership fee. Applications are reviewed within 5-7 business days."
      }
    ],
    "Collaboration": [
      {
        question: "What types of collaboration opportunities are available?",
        answer: "PAAN facilitates business partnerships, joint ventures, research collaborations, startup incubation programs, and cross-border investment opportunities among members."
      },
      {
        question: "How do I find collaboration partners?",
        answer: "Use our advanced member directory with filters for industry, location, expertise, and interests. You can also participate in sector-specific forums and attend networking events."
      },
      {
        question: "Are there collaboration success stories?",
        answer: "Yes! We've facilitated over 200 successful partnerships, including tech startups securing funding, agricultural ventures expanding across borders, and professional service firms establishing regional offices."
      },
      {
        question: "What support does PAAN provide for collaborations?",
        answer: "We offer legal framework guidance, due diligence support, partnership agreement templates, and ongoing mediation services to ensure successful long-term collaborations."
      }
    ],
    "Tools & Resources": [
      {
        question: "What digital tools are available to members?",
        answer: "Members have access to our proprietary networking platform, project management tools, document sharing systems, video conferencing facilities, and mobile app for on-the-go connectivity."
      },
      {
        question: "Are there educational resources available?",
        answer: "Yes! We provide access to online courses, webinar libraries, industry reports, market research, policy briefs, and expert-led masterclasses on various topics relevant to African business."
      },
      {
        question: "How can I access funding resources?",
        answer: "Our platform includes a comprehensive database of funding opportunities, grant applications, investor networks, and crowdfunding platforms specifically curated for African entrepreneurs and businesses."
      },
      {
        question: "What technical support is available?",
        answer: "We offer 24/7 technical support through our help desk, video tutorials, user guides, and regular training sessions to help members maximize their use of platform tools."
      }
    ],
    "Mentorship": [
      {
        question: "How does the mentorship program work?",
        answer: "Our structured mentorship program matches experienced professionals with emerging leaders based on industry, goals, and compatibility. Programs run for 6-12 months with regular check-ins."
      },
      {
        question: "Can I be both a mentor and mentee?",
        answer: "Absolutely! Many members participate in both roles, mentoring in areas of their expertise while receiving guidance in new areas of interest or career development."
      },
      {
        question: "What qualifications do I need to become a mentor?",
        answer: "Mentors should have at least 5 years of professional experience, demonstrated leadership, and a commitment to supporting others. We provide mentor training and ongoing support."
      },
      {
        question: "How are mentor-mentee matches made?",
        answer: "Our algorithm considers professional background, industry expertise, career goals, personality assessments, and geographic preferences to create optimal matches for successful relationships."
      }
    ],
    "Marketing": [
      {
        question: "What marketing support does PAAN provide?",
        answer: "We offer brand visibility through our newsletter, social media channels, website features, event speaking opportunities, and access to our member directory for business promotion."
      },
      {
        question: "Can I advertise my business to other members?",
        answer: "Yes! Members can post business opportunities, job openings, and service offerings in our marketplace. Premium members get enhanced visibility and promotional features."
      },
      {
        question: "Are there marketing collaboration opportunities?",
        answer: "We facilitate joint marketing campaigns, co-branding opportunities, cross-promotional partnerships, and group participation in trade shows and conferences across Africa."
      },
      {
        question: "How can I improve my personal brand through PAAN?",
        answer: "Participate in our thought leadership program, contribute to our blog, speak at events, engage in forums, and showcase your expertise through our member spotlight features."
      }
    ],
    "Governance": [
      {
        question: "How is PAAN governed?",
        answer: "PAAN is governed by a Board of Directors elected by members, with representation from all African regions. We also have advisory committees for different sectors and functional areas."
      },
      {
        question: "How can I get involved in PAAN's governance?",
        answer: "Members can participate through committee memberships, board elections, policy working groups, and regional chapter leadership. Nominations are held annually with transparent voting processes."
      },
      {
        question: "What is PAAN's accountability framework?",
        answer: "We publish annual reports, conduct member surveys, hold regular town halls, maintain financial transparency, and have an independent audit committee to ensure accountability to our members."
      },
      {
        question: "How are decisions made within PAAN?",
        answer: "Major decisions go through member consultation, committee review, and board approval. We use a consensus-building approach that considers input from all stakeholder groups and regional perspectives."
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-6xl mt-20 pb-20">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => setActiveButton(button)}
            className={`
              px-4 py-2 md:px-6 md:py-3 rounded-full font-medium text-sm md:text-base
              transition-all duration-200 ease-in-out
              whitespace-nowrap border border-gray-700
              ${activeButton === button
                ? 'bg-[#172840] text-white border-[#D1D3D4] transform scale-105'
                : 'bg-[#D1D3D4] text-gray-700 hover:text-white'
              }
            `}
          >
            {button}
          </button>
        ))}
      </div>
      
      {/* FAQ Accordion Section */}
      <div className="mt-8">
                
        <div className="space-y-4">
          {faqData[activeButton]?.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
              >
                <h4 className="font-semibold text-gray-800 text-lg">
                  {faq.question}
                </h4>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;