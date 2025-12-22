"use client";

import Image from 'next/image';
import styles from './AgencyLogosMarquee.module.css';

const AgencyLogosMarquee = () => {
  // Agency logos array
  const agencyLogos = [
    {
      id: 1,
      name: 'Aquila East Africa',
      logo: '/assets/images/agencies/aquila.svg',
    },
    {
      id: 2,
      name: 'Lyftup Agency',
      logo: '/assets/images/agencies/lyftup.png',
    },
    {
      id: 3,
      name: 'Media Seal',
      logo: '/assets/images/agencies/media-seal.png',
    },
    {
      id: 4,
      name: 'Nitro 21',
      logo: '/assets/images/agencies/nitro-21.png',
    },
    {
      id: 5,
      name: 'Omni Options',
      logo: '/assets/images/agencies/omni-options.avif',
    },
    {
      id: 6,
      name: 'Penguin Agency',
      logo: '/assets/images/agencies/penquin.svg',
    },
    {
      id: 7,
      name: 'Xperia-agency',
      logo: '/assets/images/agencies/xperia-agency.png',
    },
  ];

  // Create logo items for rendering
  const renderLogoItems = (logos) => 
    logos.map((agency) => (
      <div key={agency.id} className={styles.logoItem}>
        <div className={styles.logoContainer}>
          <Image
            src={agency.logo}
            alt={agency.name}
            width={120}
            height={60}
            className={styles.logo}
          />
        </div>
      </div>
    ));

  // Duplicate logos for seamless loop
  const logosDuplicated = [...agencyLogos, ...agencyLogos, ...agencyLogos];

  return (
    <section className={styles.section}>
      {/* Top Marquee - Moving Left */}
      <div className={styles.marqueeContainer}>
        <div className={`${styles.marquee} ${styles.marqueeLeft}`}>
          {renderLogoItems(logosDuplicated)}
        </div>
      </div>

      {/* Bottom Marquee - Moving Right */}
      <div className={styles.marqueeContainer}>
        <div className={`${styles.marquee} ${styles.marqueeRight}`}>
          {renderLogoItems(logosDuplicated)}
        </div>
      </div>
    </section>
  );
};

export default AgencyLogosMarquee;

