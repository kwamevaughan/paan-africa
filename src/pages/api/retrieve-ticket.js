import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { searchType, searchValue } = req.body;

  if (!searchType || !searchValue) {
    return res.status(400).json({ message: 'Search type and value are required' });
  }

  if (!supabase) {
    console.error('Supabase is not configured');
    return res.status(500).json({ 
      message: 'Database not configured. Please contact support.' 
    });
  }

  try {
    let query = supabase
      .from('attendees')
      .select(`
        id,
        full_name,
        email,
        ticket_type,
        purchase_id,
        ticket_purchases!inner (
          payment_reference,
          paid_at,
          status,
          payment_status
        )
      `)
      .eq('ticket_purchases.status', 'paid')
      .eq('ticket_purchases.payment_status', 'completed');

    // Apply search filter based on type
    if (searchType === 'email') {
      query = query.ilike('email', searchValue.trim());
    } else if (searchType === 'registration') {
      query = query.eq('ticket_purchases.payment_reference', searchValue.trim());
    } else {
      return res.status(400).json({ message: 'Invalid search type' });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ 
        message: 'Failed to retrieve tickets',
        error: error.message 
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ 
        message: 'No tickets found with the provided information' 
      });
    }

    // Format the response
    const tickets = data.map(attendee => ({
      id: attendee.id,
      attendee_name: attendee.full_name,
      attendee_email: attendee.email,
      ticket_type: attendee.ticket_type,
      payment_reference: attendee.ticket_purchases.payment_reference,
      paid_at: attendee.ticket_purchases.paid_at,
      status: attendee.ticket_purchases.status
    }));

    return res.status(200).json({ 
      success: true,
      tickets 
    });

  } catch (error) {
    console.error('Error retrieving tickets:', error);
    return res.status(500).json({ 
      message: 'An error occurred while retrieving tickets',
      error: error.message 
    });
  }
}
