// OfferingTab.js
import { useState } from 'react';
import { Icon } from "@iconify/react";
import { useAppTranslations } from '../hooks/useTranslations';

const OfferingTab = () => {
  const { t } = useAppTranslations();
  
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
            {t('homepage.offerings.businessDevelopment.title')}
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
            {t('homepage.offerings.businessDevelopment.description')}
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
            {t('homepage.offerings.knowledgeHub.title')}
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
            {t('homepage.offerings.knowledgeHub.description')}
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
            {t('homepage.offerings.capacityBuilding.title')}
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
            {t('homepage.offerings.capacityBuilding.description')}
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
            {t('homepage.offerings.advocacyVisibility.title')}
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
            {t('homepage.offerings.advocacyVisibility.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferingTab;