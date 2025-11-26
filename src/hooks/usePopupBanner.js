import { useState, useEffect } from 'react';

/**
 * Custom hook to manage popup banner visibility with 7-day cooldown
 * @param {string} bannerKey - Unique key for the banner (e.g., 'consultation-modal', 'ambassador-modal')
 * @param {number} cooldownDays - Number of days before banner can show again (default: 7)
 * @returns {object} - { shouldShow, markAsShown }
 */
export const usePopupBanner = (bannerKey, cooldownDays = 7) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if banner should be shown based on localStorage
    const checkBannerVisibility = () => {
      try {
        const lastShown = localStorage.getItem(`banner_${bannerKey}_lastShown`);
        
        if (!lastShown) {
          // First time visiting - show the banner
          setShouldShow(true);
          return;
        }

        const lastShownDate = new Date(lastShown);
        const now = new Date();
        const daysSinceLastShown = (now - lastShownDate) / (1000 * 60 * 60 * 24);

        // Show banner if cooldown period has passed
        if (daysSinceLastShown >= cooldownDays) {
          setShouldShow(true);
        } else {
          setShouldShow(false);
        }
      } catch (error) {
        // If localStorage is not available or there's an error, show the banner
        console.warn('Error checking banner visibility:', error);
        setShouldShow(true);
      }
    };

    checkBannerVisibility();
  }, [bannerKey, cooldownDays]);

  /**
   * Mark the banner as shown and update localStorage
   */
  const markAsShown = () => {
    try {
      const now = new Date().toISOString();
      localStorage.setItem(`banner_${bannerKey}_lastShown`, now);
      setShouldShow(false);
    } catch (error) {
      console.warn('Error saving banner state:', error);
      setShouldShow(false);
    }
  };

  /**
   * Reset the banner state (for testing purposes)
   */
  const resetBanner = () => {
    try {
      localStorage.removeItem(`banner_${bannerKey}_lastShown`);
      setShouldShow(true);
    } catch (error) {
      console.warn('Error resetting banner state:', error);
    }
  };

  return {
    shouldShow,
    markAsShown,
    resetBanner
  };
};
