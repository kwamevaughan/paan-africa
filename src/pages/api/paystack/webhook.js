import { supabase } from '../../../lib/supabase';
import { updatePurchaseStatus } from '../../../lib/paystack';

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
        await handleSuccessfulPayment(data);
        break;
      
      case 'charge.failed':
        await handleFailedPayment(data);
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

// Function to verify webhook signature (implement for production)
function verifyWebhookSignature(payload, signature) {
  // Implementation depends on your Paystack webhook secret
  // This is a placeholder - implement proper signature verification
  return true;
}
