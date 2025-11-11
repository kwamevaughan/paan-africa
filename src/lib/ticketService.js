import { supabase } from './supabase';
import { verifyPayment, savePaymentTransaction, updatePurchaseStatus } from './paystack';
import { validatePromoCode, applyPromoCode } from './promoCodeService';

// Save purchaser information
export const savePurchaser = async (purchaserData) => {
  try {
    const { data, error } = await supabase
      .from('purchasers')
      .insert(purchaserData)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error saving purchaser:', error);
    throw error;
  }
};

// Save ticket purchase
export const saveTicketPurchase = async (purchaseData) => {
  try {
    const { data, error } = await supabase
      .from('ticket_purchases')
      .insert(purchaseData)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error saving ticket purchase:', error);
    throw error;
  }
};

// Save purchase items
export const savePurchaseItems = async (items) => {
  try {
    const { data, error } = await supabase
      .from('purchase_items')
      .insert(items)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error saving purchase items:', error);
    throw error;
  }
};

// Save attendees
export const saveAttendees = async (attendees) => {
  try {
    const { data, error } = await supabase
      .from('attendees')
      .insert(attendees)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error saving attendees:', error);
    throw error;
  }
};

// Get ticket types
export const getTicketTypes = async () => {
  try {
    const { data, error } = await supabase
      .from('ticket_types')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching ticket types:', error);
    throw error;
  }
};

// Complete purchase process
export const completePurchase = async (purchaseData) => {
  const {
    purchaserInfo,
    selectedTickets,
    attendees,
    totalAmount,
    paymentMethod,
    promoCode = null
  } = purchaseData;

  try {
    // Start transaction
    const { data: purchaser, error: purchaserError } = await supabase
      .from('purchasers')
      .insert(purchaserInfo)
      .select()
      .single();

    if (purchaserError) {
      throw purchaserError;
    }

    // Calculate totals
    const subtotal = totalAmount;
    let discountAmount = 0;
    let promoCodeId = null;

    // Validate and apply promo code if provided
    if (promoCode && promoCode.trim()) {
      const promoValidation = await validatePromoCode(promoCode, selectedTickets);
      if (promoValidation.valid) {
        discountAmount = promoValidation.promoCode.discountAmount;
        promoCodeId = promoValidation.promoCode.id;
      } else {
        throw new Error(promoValidation.error);
      }
    }

    const taxAmount = 0; // Implement tax calculation here
    const finalAmount = subtotal - discountAmount + taxAmount;

    // Map payment method to database enum values
    // Database enum: 'card' or 'bank_transfer'
    // For mpesa, we'll use 'card' since it's processed through Paystack like card payments
    const dbPaymentMethod = paymentMethod === 'bank' || paymentMethod === 'bank_transfer' 
      ? 'bank_transfer' 
      : 'card'; // 'card' or 'mpesa' both map to 'card' for database
    
    // Create purchase record
    // Always store amounts in USD (base currency), even if payment is made in KES
    const purchaseRecord = {
      purchaser_id: purchaser.id,
      total_amount: subtotal,
      currency: 'USD', // Always USD for purchase records
      status: paymentMethod === 'bank' || paymentMethod === 'bank_transfer' ? 'pending' : 'pending',
      payment_method: dbPaymentMethod,
      payment_status: paymentMethod === 'bank' || paymentMethod === 'bank_transfer' ? 'pending' : 'pending',
      promo_code: promoCode,
      discount_amount: discountAmount,
      tax_amount: taxAmount,
      final_amount: finalAmount
    };

    const { data: purchase, error: purchaseError } = await supabase
      .from('ticket_purchases')
      .insert(purchaseRecord)
      .select()
      .single();

    if (purchaseError) {
      throw purchaseError;
    }

    // Save purchase items
    const purchaseItems = selectedTickets.map(ticket => ({
      purchase_id: purchase.id,
      ticket_name: ticket.name,
      quantity: ticket.quantity,
      unit_price: ticket.price,
      total_price: ticket.price * ticket.quantity
    }));

    const { error: itemsError } = await supabase
      .from('purchase_items')
      .insert(purchaseItems);

    if (itemsError) {
      throw itemsError;
    }

    // Save attendees
    const attendeesData = attendees.map((attendee, index) => ({
      purchase_id: purchase.id,
      purchaser_id: purchaser.id,
      ticket_type: attendee.ticketType,
      full_name: attendee.name,
      email: attendee.email,
      role: attendee.role,
      organization: attendee.organization,
      is_primary_attendee: index === 0 && purchaserInfo.is_attending
    }));

    const { error: attendeesError } = await supabase
      .from('attendees')
      .insert(attendeesData);

    if (attendeesError) {
      throw attendeesError;
    }

    return {
      purchase,
      purchaser,
      totalAmount: finalAmount,
      discountAmount,
      promoCodeId
    };

  } catch (error) {
    console.error('Error completing purchase:', error);
    throw error;
  }
};

// Verify and complete payment
export const verifyAndCompletePayment = async (purchaseId, paymentReference) => {
  try {
    // Verify payment with Paystack
    const verificationResult = await verifyPayment(paymentReference);

    if (verificationResult.status !== 'success') {
      throw new Error('Payment verification failed');
    }

    // Convert amount from Paystack response
    // Paystack returns all amounts in the smallest unit (cents)
    // So we need to divide by 100 for both USD and KES to get the actual amount
    const currency = verificationResult.data.currency || 'USD';
    const amount = verificationResult.data.amount / 100; // Convert from cents to dollars/shillings

    // Save payment transaction
    await savePaymentTransaction({
      purchaseId,
      paystackReference: paymentReference,
      amount: amount,
      currency: currency,
      status: 'completed',
      paymentMethod: 'card', // Both card and mpesa map to 'card' in database
      gatewayResponse: verificationResult
    });

    // Update purchase status
    const updatedPurchase = await updatePurchaseStatus(purchaseId, 'paid', paymentReference);

    return {
      success: true,
      purchase: updatedPurchase,
      transaction: verificationResult
    };

  } catch (error) {
    console.error('Error verifying payment:', error);
    
    // Update purchase status to failed
    await updatePurchaseStatus(purchaseId, 'cancelled');
    
    throw error;
  }
};

// Get purchase details
export const getPurchaseDetails = async (purchaseId) => {
  try {
    const { data, error } = await supabase
      .from('ticket_purchases')
      .select(`
        *,
        purchasers(*),
        purchase_items(*),
        attendees(*)
      `)
      .eq('id', purchaseId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching purchase details:', error);
    throw error;
  }
};

// Get user's purchases
export const getUserPurchases = async (email) => {
  try {
    const { data, error } = await supabase
      .from('ticket_purchases')
      .select(`
        *,
        purchasers(*),
        purchase_items(*),
        attendees(*)
      `)
      .eq('purchasers.email', email)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    throw error;
  }
};
