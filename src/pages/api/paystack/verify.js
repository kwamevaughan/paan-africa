import https from 'https';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ 
        success: false,
        message: 'Payment reference is required' 
      });
    }

    // Verify payment with Paystack
    const verificationResult = await verifyPaymentWithPaystack(reference);

    if (verificationResult.success) {
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: verificationResult.data
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        error: verificationResult.error
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

async function verifyPaymentWithPaystack(reference) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.status) {
            resolve({
              success: true,
              data: {
                reference: response.data.reference,
                amount: response.data.amount,
                currency: response.data.currency,
                status: response.data.status,
                paidAt: response.data.paid_at,
                customer: response.data.customer,
                metadata: response.data.metadata
              }
            });
          } else {
            resolve({
              success: false,
              error: response.message || 'Payment verification failed'
            });
          }
        } catch (parseError) {
          console.error('Error parsing Paystack response:', parseError);
          resolve({
            success: false,
            error: 'Failed to parse verification response'
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('Paystack verification request error:', error);
      resolve({
        success: false,
        error: 'Failed to connect to payment processor'
      });
    });

    req.end();
  });
}
