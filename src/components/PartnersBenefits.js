import { useState } from 'react';

export default function PartnerBenefits() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  
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
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
        {/* Benefits Column */}
        <div className="flex flex-col space-y-4 md:pr-0">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                index === activeBenefit 
                  ? 'bg-[#F25849] text-white border-none rounded-r-none' 
                  : 'bg-transparent hover:bg-[#F25849] border border-gray-200 rounded-lg'
              }`}
              onClick={() => setActiveBenefit(index)}
            >
              <h3 className={`text-md font-semibold ${index === activeBenefit ? 'text-white' : 'text-white'}`}>
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>
        
        {/* Description Column */}
        <div 
          className={`p-6 rounded-md rounded-l-none ${
            activeBenefit !== null ? 'bg-[#F25849] text-white' : 'bg-transparent'
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">
            {benefits[activeBenefit].title}
          </h3>
          <ul className="space-y-3">
            {benefits[activeBenefit].description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clip-rule="evenodd"/></svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}