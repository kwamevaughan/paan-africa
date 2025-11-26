/**
 * Currency conversion utilities
 * Converts USD to KES (Kenyan Shillings)
 */

// Current USD to KES exchange rate
// This can be updated periodically or fetched from an API
const USD_TO_KES_RATE = 130; // 1 USD = 130 KES (approximate rate)

/**
 * Convert USD amount to Kenyan Shillings (KES)
 * @param {number} usdAmount - Amount in USD
 * @returns {number} Amount in KES (rounded to 2 decimal places)
 */
export const convertUSDToKES = (usdAmount) => {
  if (typeof usdAmount !== 'number' || usdAmount < 0) {
    throw new Error('Invalid USD amount');
  }
  return Math.round(usdAmount * USD_TO_KES_RATE * 100) / 100; // Round to 2 decimal places
};

/**
 * Get the current USD to KES exchange rate
 * @returns {number} Exchange rate
 */
export const getUSDToKESRate = () => {
  return USD_TO_KES_RATE;
};

/**
 * Format currency amount with currency symbol
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (USD or KES)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (currency === 'KES') {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

