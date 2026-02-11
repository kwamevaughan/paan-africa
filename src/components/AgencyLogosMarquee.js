"use client";

import Image from 'next/image';
import styles from './AgencyLogosMarquee.module.css';

const AgencyLogosMarquee = () => {
  // Agency logos array for left-sliding marquee
  const agencyLogosLeft = [
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
      name: 'Penquin',
      logo: '/assets/images/agencies/penquin.png',
    },
    {
      id: 6,
      name: 'Xperia Agency',
      logo: '/assets/images/agencies/Xperia-agency.png',
    },
    {
      id: 7,
      name: 'Omni Options',
      logo: '/assets/images/agencies/omni-options.avif',
    },
  ];

  // Agency logos array for right-sliding marquee
  const agencyLogosRight = [
    {
      id: 20,
      name: '1117',
      logo: '/assets/images/agencies/free-members/1117-logo-website.png',
    },
    {
      id: 21,
      name: 'Alien Nation',
      logo: '/assets/images/agencies/free-members/alien-nation-white.png',
      isWhite: true,
    },
    {
      id: 22,
      name: 'Amethyst',
      logo: '/assets/images/agencies/free-members/amethyst.png',
    },
    {
      id: 23,
      name: 'Carillons Marketing',
      logo: '/assets/images/agencies/free-members/carillons.ma.png',
    },
    {
      id: 24,
      name: 'fisheye',
      logo: '/assets/images/agencies/free-members/fisheye.svg',
    },
    {
      id: 25,
      name: 'Isel',
      logo: '/assets/images/agencies/free-members/isel-BLACK-LOGO.png',
    },
    {
      id: 26,
      name: 'KWETU Marketing',
      logo: '/assets/images/agencies/free-members/KWETU.png',
      isWhite: true,
    },
    {
      id: 27,
      name: 'Lebu Media',
      logo: '/assets/images/agencies/free-members/Lebu-Logo-Dark-BG.png',
      isWhite: true,
    },
    {
      id: 28,
      name: 'ONYX AFRICA',
      logo: '/assets/images/agencies/free-members/ONYXAFRICAvectorblack.jpg',
    },
    {
      id: 29,
      name: 'Softlitic',
      logo: '/assets/images/agencies/free-members/Softlitic.avif',
    },
    {
      id: 30,
      name: 'Zilojo',
      logo: '/assets/images/agencies/free-members/zilojo-small-logo-white.png',
      isWhite: true,
    },
    {
      id: 31,
      name: 'Recruitement Room',
      logo: '/assets/images/agencies/free-members/recruitement-room.png',
      isWhite: false,
    },
    {
      id: 32,
      name: 'African Elite Group',
      logo: '/assets/images/agencies/free-members/african-elite-group.webp',
      isWhite: true,
    },
    {
      id: 33,
      name: 'Research 8020',
      logo: '/assets/images/agencies/free-members/reserch-8020.png',
      isWhite: false,
    },
    {
      id: 34,
      name: 'Nibble Africa',
      logo: '/assets/images/agencies/free-members/nibble-africa.png',
      isWhite: false,
    },
    {
      id: 34,
      name: 'Batou Digital',
      logo: '/assets/images/agencies/free-members/batou-digital.webp',
      isWhite: false,
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
            className={`${styles.logo} ${agency.isWhite ? styles.logoInverted : ''}`}
          />
        </div>
      </div>
    ));

  // Duplicate logos for seamless loop
  const logosLeftDuplicated = [...agencyLogosLeft, ...agencyLogosLeft, ...agencyLogosLeft];
  const logosRightDuplicated = [...agencyLogosRight, ...agencyLogosRight, ...agencyLogosRight];

  return (
    <section className={styles.section}>
      {/* Top Marquee - Moving Left */}
      <div className={styles.marqueeContainer}>
        <div className={`${styles.marquee} ${styles.marqueeLeft}`}>
          {renderLogoItems(logosLeftDuplicated)}
        </div>
      </div>

      {/* Bottom Marquee - Moving Right */}
      <div className={styles.marqueeContainer}>
        <div className={`${styles.marquee} ${styles.marqueeRight}`}>
          {renderLogoItems(logosRightDuplicated)}
        </div>
      </div>
    </section>
  );
};

export default AgencyLogosMarquee;

