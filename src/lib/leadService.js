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

/**
 * Check if user has submitted contact info within the last 24 hours
 * Returns true if they should skip Step 1, false if they should see it
 */
export const shouldSkipContactStep = async (email) => {
  if (!email || typeof window === 'undefined') {
    return false;
  }

  try {
    // First check localStorage as a quick check
    const storedData = localStorage.getItem('paan_summit_contact_submission');
    if (storedData) {
      try {
        const { email: storedEmail, timestamp } = JSON.parse(storedData);
        if (storedEmail === email.toLowerCase().trim()) {
          const submissionTime = new Date(timestamp);
          const now = new Date();
          const hoursSinceSubmission = (now - submissionTime) / (1000 * 60 * 60);
          
          // If less than 24 hours, skip Step 1
          if (hoursSinceSubmission < 24) {
            return true;
          }
        }
      } catch (e) {
        console.error('Error parsing localStorage data:', e);
      }
    }

    // Also check database for more accurate timestamp
    const lead = await getLeadByEmail(email);
    if (lead) {
      // Use updated_at if available, otherwise created_at
      const lastSubmissionTime = lead.updated_at || lead.created_at;
      if (lastSubmissionTime) {
        const submissionTime = new Date(lastSubmissionTime);
        const now = new Date();
        const hoursSinceSubmission = (now - submissionTime) / (1000 * 60 * 60);
        
        // If less than 24 hours, skip Step 1
        if (hoursSinceSubmission < 24) {
          // Update localStorage to match
          localStorage.setItem('paan_summit_contact_submission', JSON.stringify({
            email: email.toLowerCase().trim(),
            timestamp: lastSubmissionTime
          }));
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking contact submission:', error);
    return false;
  }
};
