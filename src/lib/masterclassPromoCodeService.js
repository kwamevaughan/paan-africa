import { supabase } from './supabase';

// Validate and get masterclass promo code details
export const validateMasterclassPromoCode = async (code, masterclassId, basePrice) => {
  try {
    if (!code || !code.trim()) {
      return { valid: false, error: 'Promo code is required' };
    }

    const { data: promoCode, error } = await supabase
      .from('masterclass_promo_codes')
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

    // Check if applicable to specific masterclass
    if (promoCode.applicable_masterclass_ids && promoCode.applicable_masterclass_ids.length > 0) {
      if (!promoCode.applicable_masterclass_ids.includes(masterclassId)) {
        return { valid: false, error: 'Promo code not applicable to this masterclass' };
      }
    }

    // Check minimum amount requirement
    if (basePrice < promoCode.minimum_amount) {
      return { 
        valid: false, 
        error: `Minimum purchase amount of $${promoCode.minimum_amount} required for this promo code` 
      };
    }

    // Calculate discount
    let discountAmount = 0;
    if (promoCode.discount_type === 'percentage') {
      discountAmount = (basePrice * promoCode.discount_value) / 100;
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
    if (discountAmount > basePrice) {
      discountAmount = basePrice;
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
    console.error('Error validating masterclass promo code:', error);
    return { valid: false, error: 'Error validating promo code' };
  }
};

// Apply masterclass promo code to purchase
export const applyMasterclassPromoCode = async (purchaseId, promoCodeId) => {
  try {
    // First get current used_count
    const { data: promoCode, error: fetchError } = await supabase
      .from('masterclass_promo_codes')
      .select('used_count')
      .eq('id', promoCodeId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Update used count by incrementing
    const { error: updateError } = await supabase
      .from('masterclass_promo_codes')
      .update({ 
        used_count: (promoCode.used_count || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', promoCodeId);

    if (updateError) {
      throw updateError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error applying masterclass promo code:', error);
    throw error;
  }
};

// Get all active masterclass promo codes (for admin use)
export const getActiveMasterclassPromoCodes = async () => {
  try {
    const { data, error } = await supabase
      .from('masterclass_promo_codes')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting active masterclass promo codes:', error);
    throw error;
  }
};

