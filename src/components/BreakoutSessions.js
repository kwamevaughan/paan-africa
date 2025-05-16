// BreakoutSessions.js
import { useState } from 'react';
import { Icon } from "@iconify/react";

const BreakoutSessions = () => {
  // State to manage which section is expanded
  const [expandedSection, setExpandedSection] = useState('business-development');

  // Function to toggle the expanded section
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Winning African Consumers */}
      <div className="w-full border-gray-200 border rounded-md overflow-hidden">
        <div
          className={`flex justify-between items-center cursor-pointer p-4 w-full ${
            expandedSection === 'business-development' ? 'bg-[#84C1D9]' : 'bg-white'
          }`}
          onClick={() => toggleSection('business-development')}
        >
          <h3 className="text-md font-bold">
            Winning African Consumers
          </h3>
          <Icon
            icon={expandedSection === 'business-development' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'business-development' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 p-4">
            What Brands Are Looking For by 2030.
          </p>
        </div>
      </div>

      {/* Collaboration Across Borders */}
      <div className="w-full border-gray-200 border rounded-md overflow-hidden">
        <div
          className={`flex justify-between items-center cursor-pointer p-4 w-full ${
            expandedSection === 'knowledge-hub' ? 'bg-[#84C1D9]' : 'bg-white'
          }`}
          onClick={() => toggleSection('knowledge-hub')}
        >
          <h3 className="text-md font-bold">
            Collaboration Across Borders
          </h3>
          <Icon
            icon={expandedSection === 'knowledge-hub' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'knowledge-hub' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 p-4">
            
          </p>
        </div>
      </div>

      {/* Data, Culture & Digital */}
      <div className="w-full border-gray-200 border rounded-md overflow-hidden">
        <div
          className={`flex justify-between items-center cursor-pointer p-4 w-full ${
            expandedSection === 'capacity-building' ? 'bg-[#84C1D9]' : 'bg-white'
          }`}
          onClick={() => toggleSection('capacity-building')}
        >
          <h3 className="text-md font-bold">
            Data, Culture & Digital
          </h3>
          <Icon
            icon={expandedSection === 'capacity-building' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'capacity-building' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 p-4">
            
          </p>
        </div>
      </div>

      {/* From Freelancer to Founder */}
      <div className="w-full border-gray-200 border rounded-md overflow-hidden">
        <div
          className={`flex justify-between items-center cursor-pointer p-4 w-full ${
            expandedSection === 'freelancer-founder' ? 'bg-[#84C1D9]' : 'bg-white'
          }`}
          onClick={() => toggleSection('freelancer-founder')}
        >
          <h3 className="text-md font-bold">
            From Freelancer to Founder
          </h3>
          <Icon
            icon={expandedSection === 'freelancer-founder' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'freelancer-founder' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 p-4">
            
          </p>
        </div>
      </div>

      {/* The Future of Work*/}
      <div className="w-full border-gray-200 border rounded-md overflow-hidden">
        <div
          className={`flex justify-between items-center cursor-pointer p-4 w-full ${
            expandedSection === 'future-of-work' ? 'bg-[#84C1D9]' : 'bg-white'
          }`}
          onClick={() => toggleSection('future-of-work')}
        >
          <h3 className="text-md font-bold">
            The Future of Work
          </h3>
          <Icon
            icon={expandedSection === 'future-of-work' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'future-of-work' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 p-4">
            
          </p>
        </div>
      </div>

      {/* Money Talks */}
      <div className="w-full border-gray-200 border rounded-md overflow-hidden">
        <div
          className={`flex justify-between items-center cursor-pointer p-4 w-full ${
            expandedSection === 'money-talks' ? 'bg-[#84C1D9]' : 'bg-white'
          }`}
          onClick={() => toggleSection('money-talks')}
        >
          <h3 className="text-md font-bold">
            Money Talks
          </h3>
          <Icon
            icon={expandedSection === 'money-talks' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'money-talks' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 p-4">
            
          </p>
        </div>
      </div>

      {/* The Brand View */}
      <div className="w-full border-gray-200 border rounded-md overflow-hidden">
        <div
          className={`flex justify-between items-center cursor-pointer p-4 w-full ${
            expandedSection === 'brand-view' ? 'bg-[#84C1D9]' : 'bg-white'
          }`}
          onClick={() => toggleSection('brand-view')}
        >
          <h3 className="text-md font-bold">
            The Brand View
          </h3>
          <Icon
            icon={expandedSection === 'brand-view' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'brand-view' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 p-4">
            
          </p>
        </div>
      </div>

      {/* African Campaigns & Global Standards */}
      <div className="w-full border-gray-200 border rounded-md overflow-hidden">
        <div
          className={`flex justify-between items-center cursor-pointer p-4 w-full ${
            expandedSection === 'african-campaigns' ? 'bg-[#84C1D9]' : 'bg-white'
          }`}
          onClick={() => toggleSection('african-campaigns')}
        >
          <h3 className="text-md font-bold">
            African Campaigns & Global Standards
          </h3>
          <Icon
            icon={expandedSection === 'african-campaigns' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'african-campaigns' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 p-4">
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakoutSessions;