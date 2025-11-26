import { supabase } from './supabase';

/**
 * Save initial contact/lead information before ticket selection
 * This allows us to follow up with users who abandon the purchase flow
 */
export const saveLeadContact = async (contactData) => {
  try {
    const { data, error } = await supabase
      .from('summit_leads')
      .insert({
        full_name: contactData.fullName,
        email: contactData.email,
        phone: contactData.phone,
        country: contactData.country,
        source: 'ticket_purchase_flow',
        status: 'contacted', // They've started the process
        metadata: {
          timestamp: new Date().toISOString(),
          user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null
        }
      })
      .select()
      .single();

    if (error) {
      // If duplicate email, update the existing record
      if (error.code === '23505') {
        const { data: updateData, error: updateError } = await supabase
          .from('summit_leads')
          .update({
            full_name: contactData.fullName,
            phone: contactData.phone,
            country: contactData.country,
            updated_at: new Date().toISOString()
          })
          .eq('email', contactData.email)
          .select()
          .single();

        if (updateError) throw updateError;
        return updateData;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error saving lead contact:', error);
    throw error;
  }
};

/**
 * Update lead status when they progress through the funnel
 */
export const updateLeadStatus = async (email, status, metadata = {}) => {
  try {
    const { data, error } = await supabase
      .from('summit_leads')
      .update({
        status,
        metadata: {
          ...metadata,
          last_updated: new Date().toISOString()
        },
        updated_at: new Date().toISOString()
      })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw error;
  }
};

/**
 * Get lead by email
 */
export const getLeadByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('summit_leads')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching lead:', error);
    return null;
  }
};
