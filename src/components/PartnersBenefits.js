import { useState } from 'react';
import { useAppTranslations } from '../hooks/useTranslations';

export default function PartnerBenefits() {
  const { t } = useAppTranslations();
  const [activeBenefit, setActiveBenefit] = useState(null);
  
  const benefits = [
    {
      title: t('partners.benefits.amplifyVisibility.title'),
      description: t('partners.benefits.amplifyVisibility.items')
    },
    {
      title: t('partners.benefits.accelerateAdoption.title'),
      description: t('partners.benefits.accelerateAdoption.items')
    },
    {
      title: t('partners.benefits.driveRevenue.title'),
      description: t('partners.benefits.driveRevenue.items')
    },
    {
      title: t('partners.benefits.exclusivePrivileges.title'),
      description: t('partners.benefits.exclusivePrivileges.items')
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" className='text-paan-blue' height="20" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clipRule="evenodd"/></svg>
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