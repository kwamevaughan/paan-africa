// OfferingTab.js
import { useState } from 'react';
import { Icon } from "@iconify/react";

const OfferingTab = () => {
  // State to manage which section is expanded
  const [expandedSection, setExpandedSection] = useState('business-development');

  // Function to toggle the expanded section
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* Business Development */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('business-development')}
        >
          <h3 className="text-2xl">
            Business Development
          </h3>
          <Icon
            icon={expandedSection === 'business-development' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="text-[#172840] transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'business-development' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 mt-2">
            Unlock new growth through co-bidding opportunities, a client referral system, and collaborative access to multinational campaigns.
          </p>
        </div>
      </div>

      {/* Knowledge Hub */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('knowledge-hub')}
        >
          <h3 className="text-2xl">
            Knowledge Hub
          </h3>
          <Icon
            icon={expandedSection === 'knowledge-hub' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="text-[#172840] transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'knowledge-hub' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 mt-2">
            Access a centralized platform for sharing insights, best practices, and resources to drive innovation and growth.
          </p>
        </div>
      </div>

      {/* Capacity Building */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('capacity-building')}
        >
          <h3 className="text-2xl">
            Capacity Building
          </h3>
          <Icon
            icon={expandedSection === 'capacity-building' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="text-[#172840] transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'capacity-building' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 mt-2">
            Participate in training programs, workshops, and mentorship to enhance skills and operational excellence.
          </p>
        </div>
      </div>

      {/* Advocacy & Visibility */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('advocacy-visibility')}
        >
          <h3 className="text-2xl">
            Advocacy & Visibility
          </h3>
          <Icon
            icon={expandedSection === 'advocacy-visibility' ? 'mdi:minus' : 'mdi:plus'}
            width="24"
            height="24"
            className="text-[#172840] transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'advocacy-visibility' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-500 mt-2">
            Gain increased visibility through collective advocacy efforts and representation on a global stage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferingTab;