// Paystack configuration and utility functions

export const PAYSTACK_CONFIG = {
  // Test keys (replace with live keys in production)
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  secretKey: process.env.PAYSTACK_SECRET_KEY,
  
  // API endpoints
  baseUrl: 'https://api.paystack.co',
  
  // Currency settings
  defaultCurrency: 'USD',
  supportedCurrencies: ['USD', 'NGN', 'GHS', 'ZAR', 'KES'],
  
  // Exchange rates (update regularly in production)
  exchangeRates: {
    USD: 1,
    NGN: 1500, // 1 USD = 1500 NGN
    GHS: 12,   // 1 USD = 12 GHS
    ZAR: 18,   // 1 USD = 18 ZAR
    KES: 130   // 1 USD = 130 KES
  }
};

// Payment types and their configurations
export const PAYMENT_TYPES = {
  AWARDS_APPLICATION: {
    agency: {
      amount: 300,
      currency: 'USD',
      description: 'PAAN Awards Agency Application Fee'
    },
    freelancer: {
      amount: 50,
      currency: 'USD',
      description: 'PAAN Awards Freelancer Application Fee'
    }
  },
  SUMMIT_TICKET: {
    members: {
      amount: 100,
      currency: 'USD',
      description: 'PAAN Summit Members Ticket'
    },
    'non-members': {
      amount: 150,
      currency: 'USD',
      description: 'PAAN Summit Non-Members Ticket'
    }
  }
};

// Generate unique payment reference
export const generatePaymentReference = (type, subtype, customId = null) => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substr(2, 9);
  const id = customId || randomId;
  
  return `PAAN_${type.toUpperCase()}_${subtype.toUpperCase()}_${timestamp}_${id}`;
};

// Convert amount to Paystack format (kobo for NGN, cents for USD)
export const convertToPaystackAmount = (amount, currency) => {
  const amountInCents = amount * 100;
  return Math.round(amountInCents);
};

// Convert amount from Paystack format
export const convertFromPaystackAmount = (amount, currency) => {
  return amount / 100;
};

// Get currency symbol
export const getCurrencySymbol = (currency) => {
  const symbols = {
    USD: '$',
    NGN: '₦',
    GHS: '₵',
    ZAR: 'R',
    KES: 'KSh'
  };
  return symbols[currency] || currency;
};

// Format amount with currency
export const formatAmount = (amount, currency) => {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount.toLocaleString()}`;
};

// Validate Paystack configuration
export const validatePaystackConfig = () => {
  const errors = [];
  
  if (!PAYSTACK_CONFIG.publicKey) {
    errors.push('NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not set');
  }
  
  if (!PAYSTACK_CONFIG.secretKey) {
    errors.push('PAYSTACK_SECRET_KEY is not set');
  }
  
  if (errors.length > 0) {
    console.error('Paystack configuration errors:', errors);
    return false;
  }
  
  return true;
};

// Create Paystack payment configuration
export const createPaystackConfig = (paymentData) => {
  const {
    email,
    amount,
    currency = PAYSTACK_CONFIG.defaultCurrency,
    reference,
    metadata = {},
    callback,
    onClose
  } = paymentData;

  if (!validatePaystackConfig()) {
    throw new Error('Paystack configuration is invalid');
  }

  return {
    key: PAYSTACK_CONFIG.publicKey,
    email,
    amount: convertToPaystackAmount(amount, currency),
    currency,
    ref: reference,
    metadata,
    callback: (response) => {
      if (response.status === 'success') {
        callback?.(response);
      } else {
        console.error('Payment failed:', response);
        onClose?.(response);
      }
    },
    onClose: (response) => {
      onClose?.(response);
    }
  };
};

// Initialize Paystack payment
export const initializePayment = (config) => {
  if (typeof window === 'undefined' || !window.PaystackPop) {
    throw new Error('Paystack script not loaded');
  }

  try {
    const handler = window.PaystackPop.setup(config);
    handler.openIframe();
    return handler;
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw new Error('Failed to initialize payment');
  }
};

// Verify payment with Paystack API
export const verifyPayment = async (reference) => {
  if (!PAYSTACK_CONFIG.secretKey) {
    throw new Error('Paystack secret key not configured');
  }

  try {
    const response = await fetch(`/api/paystack/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reference }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Payment verification failed');
    }

    return result;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

// Get payment status from reference
export const getPaymentStatus = (reference) => {
  // This would typically check your database
  // For now, return a mock status
  return {
    reference,
    status: 'pending',
    amount: 0,
    currency: 'USD',
    timestamp: new Date().toISOString()
  };
};

// Payment analytics helpers
export const getPaymentAnalytics = async (dateRange = {}) => {
  // This would typically fetch from your analytics API
  // For now, return mock data
  return {
    totalPayments: 0,
    totalRevenue: 0,
    successRate: 0,
    averageAmount: 0,
    topCountries: [],
    paymentMethods: [],
    recentPayments: []
  };
};

// Error handling utilities
export const handlePaymentError = (error) => {
  console.error('Payment error:', error);
  
  // Common error messages
  const errorMessages = {
    'insufficient_funds': 'Insufficient funds in your account',
    'card_declined': 'Your card was declined',
    'expired_card': 'Your card has expired',
    'invalid_cvv': 'Invalid CVV code',
    'invalid_card': 'Invalid card number',
    'network_error': 'Network error. Please try again',
    'timeout': 'Payment timed out. Please try again'
  };

  const message = errorMessages[error.code] || error.message || 'Payment failed. Please try again';
  
  return {
    success: false,
    message,
    code: error.code,
    originalError: error
  };
};

// Success handling utilities
export const handlePaymentSuccess = (response) => {
  console.log('Payment successful:', response);
  
  return {
    success: true,
    reference: response.reference,
    amount: response.amount,
    currency: response.currency,
    status: response.status,
    timestamp: new Date().toISOString()
  };
};

export default {
  PAYSTACK_CONFIG,
  PAYMENT_TYPES,
  generatePaymentReference,
  convertToPaystackAmount,
  convertFromPaystackAmount,
  getCurrencySymbol,
  formatAmount,
  validatePaystackConfig,
  createPaystackConfig,
  initializePayment,
  verifyPayment,
  getPaymentStatus,
  getPaymentAnalytics,
  handlePaymentError,
  handlePaymentSuccess
};
