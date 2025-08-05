// components/Marquee.js
"use client";

import styles from "./PAANacademyMarquee.module.css";

const Marquee = () => {
  const words = [
    "Learn",
    "Grow", 
    "Lead",
    "Create",
    "Train",
  ];

  // Define an array of colors for the dots
  const dotColors = [
    "#172840",
    "#6A4C93", 
    "#F2B706", 
    "#84C1D9", 
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
        {renderItems}
        {renderItems}
        {renderItems}
      </div>
    </div>
  );
};

export default Marquee;