// components/Marquee.js
"use client";

import styles from "./Marquee.module.css";

const Marquee = () => {
  const words = [
    "Motion Designers",
    "Copywriters",
    "Frontend Developers",
    "Brand Strategists",
    "UX/UI Designers",
  ];

  // Define an array of colors for the dots
  const dotColors = [
    "#172840", // Motion Designers
    "#FFFFFF", // Copywriters
    "#F2B706", // Frontend Developers
    "#F25849", // Brand Strategists
    "#84C1D9", // UX/UI Designers
  ];

  // Create a single array with dots for rendering
  const renderItems = words.map((word, index) => (
    <span key={index} className={styles.item}>
      <span className={styles.word}>{word}</span>
      <span
        className={styles.dot}
        style={{ color: dotColors[index % dotColors.length] }}
      >
        •
      </span>
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

export default Marquee;