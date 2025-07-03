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
      title: "Exclusive Discounts",
      description: [
        "Up to 30% off on additional services",
        "Preferred pricing on renewals",
        "Special rates for bulk purchases"
      ]
    },
    {
      title: "Advanced Analytics",
      description: [
        "Real-time performance dashboards",
        "Custom reporting solutions",
        "Data-driven insights and recommendations"
      ]
    },
    {
      title: "Marketing Resources",
      description: [
        "Co-branded marketing materials",
        "Access to partner marketing fund",
        "Joint promotional opportunities"
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