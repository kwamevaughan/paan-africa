import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useAppTranslations } from '../hooks/useTranslations';
import styles from './StrategicPartnersMarquee.module.css';

const StrategicPartners = () => {
  const { t } = useAppTranslations();

  const partners = [
    {
      name: "AIA",
      logo: "/assets/images/partners/aia.svg",
      alt: "AIA Logo",
      hasWhiteLogo: true
    },
    {
      name: "IAN",
      logo: "/assets/images/partners/IAN.png",
      alt: "IAN Logo"
    },
    {
      name: "ICCO",
      logo: "/assets/images/partners/ICCO.png",
      alt: "ICCO Logo"
    },
    {
      name: "PRCA",
      logo: "/assets/images/partners/PRCA.png",
      alt: "PRCA Logo"
    }
  ];

  // Create a single array with logos for rendering
  const renderItems = partners.map((partner, index) => (
    <div key={index} className={styles.logoItem}>
      <div 
        className={styles.logoContainer}
        style={partner.hasWhiteLogo ? { backgroundColor: '#1a1a1a' } : {}}
      >
        <Image
          src={partner.logo}
          alt={partner.alt}
          width={120}
          height={60}
          className={styles.logo}
          onError={(e) => {
            // Fallback to placeholder if logo doesn't exist
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback placeholder */}
        <div className={styles.logoPlaceholder} style={{ display: 'none' }}>
          <Icon icon="mdi:domain" className={styles.placeholderIcon} />
          <span className={styles.placeholderText}>{partner.name}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="bg-gray-50 py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#84C1D9] rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-[#F2B706] rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-[#F25849] rounded-full opacity-15"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#172840] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Icon icon="mdi:handshake" className="w-4 h-4" />
            Strategic Partnerships
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#172840] mb-6">
            {t('homepage.strategicPartners.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('homepage.strategicPartners.description')}
          </p>
        </div>

        {/* Partners Marquee */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            {renderItems}
            {renderItems} {/* Duplicate for seamless loop */}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#172840] mb-4">
              {t('homepage.strategicPartners.benefitsTitle')}
            </h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t('homepage.strategicPartners.benefitsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#84C1D9] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon="mdi:eye" className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-[#172840] mb-2">{t('partners.benefits.amplifyVisibility.title')}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Showcase your solutions to agencies in our exclusive online directory</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F2B706] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon="mdi:rocket-launch" className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-[#172840] mb-2">{t('partners.benefits.accelerateAdoption.title')}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Offer discounted rates to PAAN agencies and scale your user base</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F25849] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon="mdi:currency-usd" className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-[#172840] mb-2">{t('partners.benefits.driveRevenue.title')}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Connect with top-tier agencies serving multinational clients</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#172840] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon="mdi:crown" className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-[#172840] mb-2">{t('partners.benefits.exclusivePrivileges.title')}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">VIP Summit access and private networking with agency leaders</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-[#172840] rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('homepage.strategicPartners.ctaTitle')}
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              {t('homepage.strategicPartners.ctaDescription')}
            </p>
            <div className="flex justify-center">
              <a 
                href="/partners" 
                className="bg-white text-[#172840] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:email" className="w-5 h-5" />
                Become a Partner
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicPartners;
