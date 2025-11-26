import { useState } from 'react';

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
        question: "What is the value of joining PAAN?",
        answer: "Joining PAAN gives you access to cross-border deals, shared tools, mentorship, increased visibility, and revenue growth — all while keeping your agency fully independent."
      },
      {
        question: "Will we lose our identity or clients?",
        answer: "Not at all. You retain your brand and clients. PAAN supports collaboration, not competition, between member agencies."
      },
      {
        question: "How are members selected?",
        answer: "Based on track record, regional relevance, capacity, and integrity. Every agency undergoes a due diligence process."
      },
      {
        question: "Is there a trial period or non-paid membership option?",
        answer: "Yes. Agencies can join as non-paying members to access key opportunities and tools before upgrading."
      },
      {
        question: "What makes PAAN different from other networks?",
        answer: "PAAN is built by agencies for agencies, focused on deal flow, innovation, and Pan-African impact — not just listings."
      },
      {
        question: "How many agencies are currently part of PAAN?",
        answer: "Over 100 agencies are already members. The goal is to reach 500 by end of 2025."
      },
      {
        question: "When was PAAN founded, and by whom?",
        answer: "Founded in 2024 by Duncan Njue in Kenya to unite and grow Africa's fragmented agency ecosystem."
      }
    ],
    "Collaboration": [
      {
        question: "How does PAAN help us get new clients?",
        answer: "PAAN sources briefs and RFPs, enables joint pitching, and increases agency visibility through network promotions."
      },
      {
        question: "What kinds of collaborations can we expect?",
        answer: "You can co-deliver services, co-bid on projects, and share resources — all matched and facilitated by the PAAN Secretariat."
      },
      {
        question: "How do collaborations within PAAN work?",
        answer: "The Secretariat identifies opportunities and matches agencies based on skills, fit, and relevance."
      },
      {
        question: "Can I contact other agencies directly?",
        answer: "No. PAAN coordinates all matches to maintain focus and alignment."
      },
      {
        question: "Can I see a list of member agencies?",
        answer: "No. PAAN protects member privacy and only connects agencies when there's a purposeful opportunity."
      },
      {
        question: "What revenue opportunities can we expect?",
        answer: "You can earn via referrals, co-bidding, subcontracting, and grants for creative innovation."
      },
      {
        question: "How does PAAN support regional expansion?",
        answer: "Through regional hubs in Nairobi, Lagos, Johannesburg, and Cairo, offering space, insights, and credibility."
      }
    ],
    "Tools & Resources": [
      {
        question: "What tools and resources are included?",
        answer: "Access to a portal with hiring tools, tender trackers, legal templates, training, and marketing kits."
      },
      {
        question: "What is PAAN Labs?",
        answer: "An innovation platform that connects agencies with global tech firms to co-create in AI, AR/VR, and more."
      },
      {
        question: "Can we access global tech companies through PAAN?",
        answer: "Yes. Members can resell, pilot, or co-develop tools from global tech partners."
      },
      {
        question: "How does PAAN help us stay ahead of trends?",
        answer: "Through trend reports, research publications, and expert-led webinars with organizations like Kantar and Meta."
      },
      {
        question: "What legal and compliance support is included?",
        answer: "Access to cross-border legal templates, contract guides, and regional compliance advice."
      },
      {
        question: "Are there tools for managing multi-agency projects?",
        answer: "Yes. The PAAN Project Management Hub helps track timelines, deliverables, and collaboration workflows."
      }
    ],
    "Mentorship": [
      {
        question: "What is the mentorship program?",
        answer: "Members receive 1:1 mentorship from Tier 1 Gold agencies on operations, growth, and creativity."
      },
      {
        question: "Can we find talent through PAAN?",
        answer: "Yes. PAAN offers access to vetted freelancers, interns, and top creative talent across Africa."
      },
      {
        question: "Does PAAN help during PR or operational crises?",
        answer: "Yes. Strategic PR support and peer guidance is available within 24–48 hours."
      },
      {
        question: "Are training programs available?",
        answer: "Yes. Members get free/subsidized access to training on leadership, account management, and private coaching for Gold tier."
      }
    ],
    "Marketing": [
      {
        question: "How does PAAN promote member agencies?",
        answer: "Via campaigns, case studies, speaking slots, and global PR initiatives."
      },
      {
        question: "Are there regional limitations to benefits?",
        answer: "No. All members benefit equally across Africa's regions."
      },
      {
        question: "How does PAAN attract global clients?",
        answer: "PAAN promotes the full network and matches multinational briefs to capable member agencies."
      },
      {
        question: "What is the PAAN Summit?",
        answer: "An annual event featuring panels, showcases, and workshops — online and in-person — to build visibility and trust."
      },
      {
        question: "Are media features or awards included?",
        answer: "Yes. Members can be featured in regional media, summit interviews, and Pan-African creative awards."
      }
    ],
    "Governance": [
      {
        question: "How is PAAN governed?",
        answer: "It is member-led, with an advisory board and a central secretariat in Nairobi, supported by regional hubs."
      },
      {
        question: "Can members influence policy?",
        answer: "Yes. Members help shape policies around African digital trade, industry standards, and creative regulation."
      },
      {
        question: "Do I need to attend in-person events?",
        answer: "No. Most PAAN events are hybrid or virtual, so all members can participate from anywhere."
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Custom SVG Icons
  const DownArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#F25849] flex-shrink-0">
      <path fill="currentColor" d="m12.02 15.385l3.288-3.289l-.689-.688l-2.1 2.1V8.596H11.5v4.912l-2.1-2.1l-.688.688zM12.002 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/>
    </svg>
  );

  const RightArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#84C1D9] flex-shrink-0">
      <path fill="currentColor" d="m15.385 12.02l-3.289 3.288l-.688-.689l2.1-2.1H8.596V11.5h4.912l-2.1-2.1l.688-.688zM12.002 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/>
    </svg>
  );

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
            <div key={index} className="border border-[#84C1D9] rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-4 text-left bg-white hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center ${
                  openFAQ === index ? 'border-b border-dotted border-[#84C1D9]' : ''
                }`}
              >
                <h4 className="font-semibold text-gray-800 text-lg">
                  {faq.question}
                </h4>
                {openFAQ === index ? (
                  <DownArrowIcon />
                ) : (
                  <RightArrowIcon />
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