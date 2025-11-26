import { supabase } from './supabase';

// Validate and get promo code details
export const validatePromoCode = async (code, selectedTickets) => {
  try {
    if (!code || !code.trim()) {
      return { valid: false, error: 'Promo code is required' };
    }

    const { data: promoCode, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { valid: false, error: 'Promo code does not exist' };
      }
      return { valid: false, error: 'Error validating promo code' };
    }

    if (!promoCode) {
      return { valid: false, error: 'Promo code does not exist' };
    }

    // Check if promo code is still valid
    const now = new Date();
    const validFrom = new Date(promoCode.valid_from);
    const validUntil = promoCode.valid_until ? new Date(promoCode.valid_until) : null;

    if (now < validFrom) {
      return { valid: false, error: 'Promo code is not yet active' };
    }

    if (validUntil && now > validUntil) {
      return { valid: false, error: 'Promo code has expired' };
    }

    // Check usage limit
    if (promoCode.usage_limit && promoCode.used_count >= promoCode.usage_limit) {
      return { valid: false, error: 'Promo code usage limit reached' };
    }

    // Check if applicable to selected tickets
    if (promoCode.applicable_ticket_types && promoCode.applicable_ticket_types.length > 0) {
      const selectedTicketNames = selectedTickets.map(ticket => ticket.name);
      const hasApplicableTicket = selectedTicketNames.some(name => 
        promoCode.applicable_ticket_types.includes(name)
      );
      
      if (!hasApplicableTicket) {
        return { valid: false, error: 'Promo code not applicable to selected tickets' };
      }
    }

    // Calculate total amount
    const totalAmount = selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);

    // Check minimum amount requirement
    if (totalAmount < promoCode.minimum_amount) {
      return { 
        valid: false, 
        error: `Minimum purchase amount of $${promoCode.minimum_amount} required for this promo code` 
      };
    }

    // Calculate discount
    let discountAmount = 0;
    if (promoCode.discount_type === 'percentage') {
      discountAmount = (totalAmount * promoCode.discount_value) / 100;
      if (promoCode.maximum_discount && discountAmount > promoCode.maximum_discount) {
        discountAmount = promoCode.maximum_discount;
      }
    } else if (promoCode.discount_type === 'fixed') {
      discountAmount = promoCode.discount_value;
      if (promoCode.maximum_discount && discountAmount > promoCode.maximum_discount) {
        discountAmount = promoCode.maximum_discount;
      }
    }

    // Ensure discount doesn't exceed total amount
    if (discountAmount > totalAmount) {
      discountAmount = totalAmount;
    }

    return {
      valid: true,
      promoCode: {
        id: promoCode.id,
        code: promoCode.code,
        description: promoCode.description,
        discountType: promoCode.discount_type,
        discountValue: promoCode.discount_value,
        discountAmount: Math.round(discountAmount * 100) / 100, // Round to 2 decimal places
        minimumAmount: promoCode.minimum_amount,
        maximumDiscount: promoCode.maximum_discount
      }
    };

  } catch (error) {
    console.error('Error validating promo code:', error);
    return { valid: false, error: 'Error validating promo code' };
  }
};

// Apply promo code to purchase
export const applyPromoCode = async (purchaseId, promoCodeId) => {
  try {
    // Update used count
    const { error: updateError } = await supabase
      .from('promo_codes')
      .update({ 
        used_count: supabase.raw('used_count + 1'),
        updated_at: new Date().toISOString()
      })
      .eq('id', promoCodeId);

    if (updateError) {
      throw updateError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error applying promo code:', error);
    throw error;
  }
};

// Get all active promo codes (for admin use)
export const getActivePromoCodes = async () => {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    throw error;
  }
};

// Create new promo code (for admin use)
export const createPromoCode = async (promoCodeData) => {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .insert({
        code: promoCodeData.code.toUpperCase(),
        description: promoCodeData.description,
        discount_type: promoCodeData.discountType,
        discount_value: promoCodeData.discountValue,
        minimum_amount: promoCodeData.minimumAmount || 0,
        maximum_discount: promoCodeData.maximumDiscount,
        usage_limit: promoCodeData.usageLimit,
        valid_from: promoCodeData.validFrom || new Date().toISOString(),
        valid_until: promoCodeData.validUntil,
        applicable_ticket_types: promoCodeData.applicableTicketTypes || null
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating promo code:', error);
    throw error;
  }
};

// Update promo code (for admin use)
export const updatePromoCode = async (id, promoCodeData) => {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .update({
        code: promoCodeData.code?.toUpperCase(),
        description: promoCodeData.description,
        discount_type: promoCodeData.discountType,
        discount_value: promoCodeData.discountValue,
        minimum_amount: promoCodeData.minimumAmount,
        maximum_discount: promoCodeData.maximumDiscount,
        usage_limit: promoCodeData.usageLimit,
        valid_from: promoCodeData.validFrom,
        valid_until: promoCodeData.validUntil,
        applicable_ticket_types: promoCodeData.applicableTicketTypes,
        is_active: promoCodeData.isActive,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating promo code:', error);
    throw error;
  }
};

// Deactivate promo code (for admin use)
export const deactivatePromoCode = async (id) => {
  try {
    const { error } = await supabase
      .from('promo_codes')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error deactivating promo code:', error);
    throw error;
  }
};
