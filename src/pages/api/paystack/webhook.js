import { createClient } from '@supabase/supabase-js';
import { updatePurchaseStatus } from '../../../lib/paystack';

// Initialize Supabase client
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { event, data } = req.body;

    // Verify webhook signature (recommended for production)
    // const signature = req.headers['x-paystack-signature'];
    // if (!verifyWebhookSignature(req.body, signature)) {
    //   return res.status(400).json({ message: 'Invalid signature' });
    // }

    switch (event) {
      case 'charge.success':
        // Check if it's an experience booking or ticket purchase
        if (data.reference && data.reference.startsWith('PAAN_EXP_')) {
          await handleExperienceBookingPayment(data);
        } else {
          await handleSuccessfulPayment(data);
        }
        break;
      
      case 'charge.failed':
        // Check if it's an experience booking or ticket purchase
        if (data.reference && data.reference.startsWith('PAAN_EXP_')) {
          await handleExperienceBookingPaymentFailed(data);
        } else {
          await handleFailedPayment(data);
        }
        break;
      
      default:
        console.log(`Unhandled event: ${event}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
}

async function handleSuccessfulPayment(data) {
  try {
    const { reference, amount, customer } = data;
    
    // Find the purchase by payment reference
    const { data: purchase, error } = await supabase
      .from('ticket_purchases')
      .select('*')
      .eq('payment_reference', reference)
      .single();

    if (error || !purchase) {
      console.error('Purchase not found for reference:', reference);
      return;
    }

    // Update purchase status to paid
    await updatePurchaseStatus(purchase.id, 'paid', reference);

    // Log the successful payment
    console.log(`Payment successful for purchase ${purchase.id}: ${reference}`);
    
    // Here you could trigger email notifications, etc.
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(data) {
  try {
    const { reference } = data;
    
    // Find the purchase by payment reference
    const { data: purchase, error } = await supabase
      .from('ticket_purchases')
      .select('*')
      .eq('payment_reference', reference)
      .single();

    if (error || !purchase) {
      console.error('Purchase not found for reference:', reference);
      return;
    }

    // Update purchase status to cancelled
    await updatePurchaseStatus(purchase.id, 'cancelled');

    // Log the failed payment
    console.log(`Payment failed for purchase ${purchase.id}: ${reference}`);
    
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

async function handleExperienceBookingPayment(data) {
  try {
    if (!supabase) {
      console.log('Supabase not configured, skipping experience booking update');
      return;
    }

    const { reference, amount, customer } = data;
    
    // Find the booking by payment reference
    const { data: booking, error } = await supabase
      .from('experience_bookings')
      .select('*')
      .eq('payment_reference', reference)
      .single();

    if (error || !booking) {
      console.error('Experience booking not found for reference:', reference);
      return;
    }

    // Update booking status to paid
    await supabase
      .from('experience_bookings')
      .update({
        payment_status: 'paid',
        booking_status: 'confirmed',
        confirmed_at: new Date().toISOString(),
        payment_gateway_response: data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', booking.id);

    // Log the successful payment
    console.log(`Payment successful for experience booking ${booking.id}: ${reference}`);
    
    // Here you could trigger email notifications, etc.
    
  } catch (error) {
    console.error('Error handling experience booking payment:', error);
  }
}

async function handleExperienceBookingPaymentFailed(data) {
  try {
    if (!supabase) {
      console.log('Supabase not configured, skipping experience booking update');
      return;
    }

    const { reference } = data;
    
    // Find the booking by payment reference
    const { data: booking, error } = await supabase
      .from('experience_bookings')
      .select('*')
      .eq('payment_reference', reference)
      .single();

    if (error || !booking) {
      console.error('Experience booking not found for reference:', reference);
      return;
    }

    // Update booking status to failed
    await supabase
      .from('experience_bookings')
      .update({
        payment_status: 'failed',
        booking_status: 'pending',
        payment_gateway_response: data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', booking.id);

    // Log the failed payment
    console.log(`Payment failed for experience booking ${booking.id}: ${reference}`);
    
  } catch (error) {
    console.error('Error handling failed experience booking payment:', error);
  }
}

// Function to verify webhook signature (implement for production)
function verifyWebhookSignature(payload, signature) {
  // Implementation depends on your Paystack webhook secret
  // This is a placeholder - implement proper signature verification
  return true;
}
