import { useState } from 'react';
import { Check } from 'lucide-react';

export default function BenefitsToggle() {
  const [activeTab, setActiveTab] = useState('tech');

  // Partner type data
  const partnerData = {
    tech: {
      image: '/assets/images/tech-partner.png',
      title: 'For Tech Partners',
      benefits: [
        'Access to exclusive API integrations',
        'Technical documentation and support',
        'Early access to new features',
        'Developer community events',
        'Priority bug fixes and updates'
      ]
    },
    agency: {
      image: '/assets/images/tech-partner.png',
      title: 'Agency Members',
      benefits: [
        'White-label solutions for clients',
        'Bulk account management tools',
        'Agency-specific training resources',
        'Co-marketing opportunities',
        'Multi-client reporting dashboard'
      ]
    },
    brand: {
      image: '/assets/images/tech-partner.png',
      title: 'Brand Representatives',
      benefits: [
        'Brand-specific analytics',
        'Custom branding options',
        'Campaign management tools',
        'Strategic brand consultation',
        'Competitor analysis reports'
      ]
    }
  };

  return (
    <div>
      {/* Partner Selector Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
              activeTab === 'tech' 
                ? 'bg-[#172840] text-white border-[#172840]' 
                : 'bg-[#84C1D9] text-gray-700 border-[#172840] hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('tech')}
          >
            Tech Partners
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              activeTab === 'agency' 
                ? 'bg-[#172840] text-white border-[#172840]' 
                : 'bg-[#84C1D9] text-gray-700 border-[#172840] hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('agency')}
          >
            Agency Members
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${
              activeTab === 'brand' 
                ? 'bg-[#172840] text-white border-[#172840]' 
                : 'bg-[#84C1D9] text-gray-700 border-[#172840] hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('brand')}
          >
            Brand Representatives
          </button>
        </div>
      </div>

      {/* Partner Details Section */}
      <div className="flex flex-col md:flex-row gap-8 p-6 rounded-lg">
        <div className="md:w-2/5">
          <img
            src={partnerData[activeTab].image}
            alt={`${partnerData[activeTab].title} illustration`}
            className="w-full h-64 rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="md:w-3/5">
          <h3 className="text-3xl font-normal mb-4">{partnerData[activeTab].title}</h3>
          <ul className="space-y-3">
            {partnerData[activeTab].benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1">
                  <Check size={16} className="text-green-500 bg-[#F2B706] rounded-full" />
                </span>
                <span className='text-xl'>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}