import { useState } from 'react';

export default function PartnerBenefits() {
  const [activeBenefit, setActiveBenefit] = useState(null);
  
  const benefits = [
    {
      title: "Amplify Visibility",
      description: [
        "Partner Directory Listing: Showcase your solutions to agencies in our exclusive online directory.",
        "Featured Spotlight: Monthly profile in PAAN's newsletter.",
        "Co-Branded Initiatives: Collaborate quarterly on campaigns, case studies, or webinars to highlight your impact."
      ]
    },
    {
      title: "Accelerate Adoption",
      description: [
        "Bulk Licensing Opportunities: Offer discounted rates to PAAN agencies, incentivizing adoption while scaling your user base.",
        "Tailored Workshops: Train agencies on your product's value through annual hands-on sessions.",
        "Product Surveys: Gather feedback from 100+ agencies and their clients annually to refine your Africa strategy."
      ]
    },
    {
      title: "Drive Revenue",
      description: [
        "Priority Access to High-Value Agencies: Connect with top-tier agencies serving multinational clients.",
        "Joint Ventures: Co-create Africa-focused product bundles with PAAN (e.g., AI tools for local storytelling).",
        "Quarterly Strategy Sessions: Align with PAAN's leadership to identify trends, gaps, and opportunities."
      ]
    },
    {
      title: "Exclusive Privileges",
      description: [
        "VIP Summit Access: Secure a speaking slot at the annual PAAN Summit + 20% off regional workshops.",
        "Private Networking: Attend invite-only dinners with agency leaders and global brand executives.",
        "Market Insights: Receive quarterly reports on emerging tech demands across Africa."
      ]
    }
  ];

  return (
    <div className="w-full p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-2">
        {benefits.map((benefit, index) => (
          <div key={index} className="">
            <div
              className={`flex flex-col md:flex-row items-stretch cursor-pointer transition-all duration-300 border-b border-white`}
              onClick={() => setActiveBenefit(activeBenefit === index ? null : index)}
            >
              <div className={`flex-1 p-4 font-semibold flex items-center text-white`}>
                {benefit.title}
              </div>
              {activeBenefit === index && (
                <div className="flex-1 p-4 text-white flex flex-col justify-center">
                  <ul className="space-y-3">
                    {benefit.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clipRule="evenodd"/></svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}