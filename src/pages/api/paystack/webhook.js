import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the Paystack signature from headers
    const signature = req.headers['x-paystack-signature'];
    
    if (!signature) {
      console.error('No Paystack signature found in headers');
      return res.status(400).json({ message: 'No signature provided' });
    }

    // Verify the webhook signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== signature) {
      console.error('Invalid Paystack signature');
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body;
    console.log('Paystack webhook received:', event.event);

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleSuccessfulPayment(event.data);
        break;
      
      case 'charge.failed':
        await handleFailedPayment(event.data);
        break;
      
      case 'subscription.create':
        await handleSubscriptionCreated(event.data);
        break;
      
      case 'subscription.disable':
        await handleSubscriptionDisabled(event.data);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ 
      message: 'Webhook processing failed',
      error: error.message 
    });
  }
}

async function handleSuccessfulPayment(data) {
  try {
    console.log('Processing successful payment:', data.reference);
    
    // Extract metadata
    const metadata = data.metadata || {};
    const customFields = metadata.custom_fields || [];
    
    // Create a mapping of custom fields
    const fieldMap = {};
    customFields.forEach(field => {
      fieldMap[field.variable_name] = field.value;
    });

    // Determine payment type based on reference or metadata
    let paymentType = 'unknown';
    let applicationData = {};

    if (data.reference.includes('PAAN_AWARDS_')) {
      paymentType = 'awards_application';
      applicationData = {
        applicantType: fieldMap.applicant_type || 'unknown',
        fullName: fieldMap.full_name || '',
        companyName: fieldMap.company_name || '',
        selectedCategories: fieldMap.selected_categories ? fieldMap.selected_categories.split(', ') : [],
        projectTitle: fieldMap.project_title || '',
        country: fieldMap.country || '',
        amount: data.amount / 100, // Convert from kobo to naira
        currency: data.currency,
        reference: data.reference,
        status: 'paid'
      };

      // Send awards application email via webhook
      try {
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-awards-application`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentData: {
              reference: data.reference,
              amount: data.amount,
              currency: data.currency,
              status: 'success',
              paidAt: data.paid_at || new Date().toISOString()
            },
            applicationData: applicationData,
            reference: data.reference
          }),
        });

        const emailResult = await emailResponse.json();
        
        if (emailResult.success) {
          console.log('Awards application email sent via webhook');
        } else {
          console.error('Failed to send awards application email via webhook:', emailResult.message);
        }
      } catch (emailError) {
        console.error('Error sending awards application email via webhook:', emailError);
      }

    } else if (data.reference.includes('PAAN_SUMMIT_')) {
      paymentType = 'summit_ticket';
      applicationData = {
        ticketType: fieldMap.ticket_type || 'unknown',
        fullName: fieldMap.full_name || '',
        email: data.customer?.email || '',
        amount: data.amount / 100,
        currency: data.currency,
        reference: data.reference,
        status: 'paid'
      };

      // Send summit ticket purchase email via webhook
      try {
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-summit-ticket`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentData: {
              reference: data.reference,
              amount: data.amount,
              currency: data.currency,
              status: 'success',
              paidAt: data.paid_at || new Date().toISOString()
            },
            ticketData: applicationData,
            reference: data.reference
          }),
        });

        const emailResult = await emailResponse.json();
        
        if (emailResult.success) {
          console.log('Summit ticket purchase email sent via webhook');
        } else {
          console.error('Failed to send summit ticket purchase email via webhook:', emailResult.message);
        }
      } catch (emailError) {
        console.error('Error sending summit ticket purchase email via webhook:', emailError);
      }
    }

    // Log the successful payment
    console.log('Payment processed successfully:', {
      type: paymentType,
      reference: data.reference,
      amount: data.amount,
      currency: data.currency,
      customer: data.customer?.email,
      applicationData
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Update application status
    // 4. Generate tickets/certificates
    
    console.log('Payment verification completed for:', data.reference);
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(data) {
  try {
    console.log('Processing failed payment:', data.reference);
    
    // Log the failed payment
    console.log('Payment failed:', {
      reference: data.reference,
      amount: data.amount,
      currency: data.currency,
      customer: data.customer?.email,
      reason: data.gateway_response || 'Unknown error'
    });

    // Here you would typically:
    // 1. Update application status to 'failed'
    // 2. Send failure notification email
    // 3. Log for manual review if needed
    
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

async function handleSubscriptionCreated(data) {
  try {
    console.log('Processing subscription creation:', data.subscription_code);
    
    // Handle subscription creation logic here
    
  } catch (error) {
    console.error('Error handling subscription creation:', error);
  }
}

async function handleSubscriptionDisabled(data) {
  try {
    console.log('Processing subscription disable:', data.subscription_code);
    
    // Handle subscription disable logic here
    
  } catch (error) {
    console.error('Error handling subscription disable:', error);
  }
}
