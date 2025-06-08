// components/Marquee.js
"use client";

import styles from "./Marquee.module.css";

const AgenciesMarquee = () => {
  const words = [
    "Advertising",
    "Research",
    "Marketing",
    "Tech & IT services agencies",
    "Digital Agencies",
  ];

  // Create a single array with dots for rendering
  const renderItems = words.map((word, index) => (
    <span key={index} className={styles.item}>
      <span className={styles.word}>{word}</span>
      <span className={styles.dot}>•</span>
    </span>
  ));

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        {renderItems}
        {renderItems} {/* Duplicate for seamless loop */}
      </div>
    </div>
  );
};

export default AgenciesMarquee;
