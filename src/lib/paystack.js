import { supabase } from './supabase';

// Paystack configuration
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;

// Initialize Paystack
export const initializePaystack = () => {
  if (typeof window !== 'undefined' && window.PaystackPop) {
    return window.PaystackPop.setup;
  }
  return null;
};

// Wait for Paystack to load
export const waitForPaystack = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window not available'));
      return;
    }

    if (window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }

    // Wait for script to load
    const checkPaystack = () => {
      if (window.PaystackPop) {
        resolve(window.PaystackPop);
      } else {
        setTimeout(checkPaystack, 100);
      }
    };

    checkPaystack();
  });
};

// Create payment reference
export const generatePaymentReference = () => {
  return `PAAN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initialize payment with Paystack
export const initializePayment = async (paymentData) => {
  const {
    email,
    amount,
    currency = 'USD',
    reference,
    metadata = {},
    callback_url,
    onSuccess,
    onClose
  } = paymentData;

  try {
    // Wait for Paystack to load
    const PaystackPop = await waitForPaystack();
    
    if (!PaystackPop || !PaystackPop.setup) {
      throw new Error('Paystack not properly loaded');
    }

    // Paystack expects all amounts in the smallest unit (cents)
    // For USD: amount * 100 (dollars to cents)
    // For KES: amount * 100 (shillings to cents)
    const amountInSmallestUnit = Math.round(amount * 100);

    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: amountInSmallestUnit,
      currency,
      ref: reference,
      metadata,
      callback: callback_url,
      onClose: onClose || (() => console.log('Payment cancelled')),
      onSuccess: onSuccess || (() => console.log('Payment successful'))
    });

    return handler;
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw new Error('Failed to initialize Paystack payment');
  }
};

// Verify payment with Paystack API
export const verifyPayment = async (reference) => {
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Payment verification failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

// Save payment transaction to database
export const savePaymentTransaction = async (transactionData) => {
  const {
    purchaseId,
    paystackReference,
    amount,
    currency = 'USD',
    status,
    paymentMethod,
    gatewayResponse
  } = transactionData;

  try {
    const { data, error } = await supabase
      .from('payment_transactions')
      .insert({
        purchase_id: purchaseId,
        paystack_reference: paystackReference,
        amount,
        currency,
        status,
        payment_method: paymentMethod,
        gateway_response: gatewayResponse
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error saving payment transaction:', error);
    throw error;
  }
};

// Update purchase status
export const updatePurchaseStatus = async (purchaseId, status, paymentReference = null) => {
  try {
    const updateData = {
      status,
      payment_status: status === 'paid' ? 'completed' : 'pending',
      updated_at: new Date().toISOString()
    };

    if (paymentReference) {
      updateData.payment_reference = paymentReference;
      updateData.paystack_transaction_id = paymentReference;
    }

    if (status === 'paid') {
      updateData.paid_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('ticket_purchases')
      .update(updateData)
      .eq('id', purchaseId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating purchase status:', error);
    throw error;
  }
};

// Get payment status
export const getPaymentStatus = async (reference) => {
  try {
    const { data, error } = await supabase
      .from('payment_transactions')
      .select('status, amount, currency, created_at')
      .eq('paystack_reference', reference)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};
