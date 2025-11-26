import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      paymentData,
      masterclassData,
      reference
    } = req.body;

    // Validate required fields
    if (!masterclassData || !paymentData || !reference) {
      return res.status(400).json({
        success: false,
        message: 'Missing required masterclass data'
      });
    }

    // Validate SMTP configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error('Missing SMTP configuration:', {
        SMTP_HOST: !!process.env.SMTP_HOST,
        SMTP_EMAIL: !!process.env.SMTP_EMAIL,
        SMTP_PASSWORD: !!process.env.SMTP_PASSWORD
      });
      return res.status(500).json({
        success: false,
        message: 'Email service not configured properly'
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      debug: true, // Enable debug mode
      logger: true // Enable logging
    });

    // Test SMTP connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection verification failed:', verifyError);
      return res.status(500).json({
        success: false,
        message: 'Email service connection failed',
        error: verifyError.message
      });
    }

    // Format masterclass data for email
    const formatMasterclassData = (data) => {
      let formatted = '';
      
      // Personal Information
      formatted += 'MASTERCLASS REGISTRATION DETAILS\n';
      formatted += '================================\n';
      formatted += `Full Name: ${data.name}\n`;
      formatted += `Email: ${data.email}\n`;
      formatted += `Phone: ${data.phone || 'Not provided'}\n`;
      formatted += `Organization: ${data.organization || 'Not provided'}\n\n`;

      // Masterclass Information
      formatted += 'MASTERCLASS INFORMATION\n';
      formatted += '=======================\n';
      formatted += `Title: ${data.masterclassTitle}\n`;
      formatted += `Date: ${data.date}\n`;
      formatted += `Time: ${data.time}\n`;
      formatted += `Format: ${data.format}\n`;
      formatted += `Instructor: ${data.instructor}\n`;
      formatted += `Pricing Type: ${data.pricingType}\n`;
      formatted += `Price: ${data.currency} ${data.amount.toLocaleString()}\n\n`;

      return formatted;
    };

    // Create email content
    const emailSubject = `PAAN Masterclass Registration - ${masterclassData.name} - ${masterclassData.masterclassTitle}`;
    
    const emailText = `
PAAN MASTERCLASS REGISTRATION CONFIRMED

Payment Reference: ${reference}
Registration Date: ${new Date().toLocaleString()}

${formatMasterclassData(masterclassData)}

PAYMENT DETAILS
===============
Amount: ${paymentData.currency} ${(paymentData.amount / 100).toLocaleString()}
Status: ${paymentData.status}
Paid At: ${paymentData.paidAt ? new Date(paymentData.paidAt).toLocaleString() : 'N/A'}

This masterclass registration has been successfully confirmed and payment has been processed.

Best regards,
PAAN Masterclasses Team
    `.trim();

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>PAAN Masterclass Registration</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: #172840; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .section { margin-bottom: 20px; }
            .section h3 { color: #F25849; border-bottom: 2px solid #F25849; padding-bottom: 5px; }
            .field { margin-bottom: 10px; }
            .field strong { color: #172840; }
            .payment-details { background: #e8f5e8; padding: 15px; border-left: 4px solid #4CAF50; }
            .masterclass-details { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196F3; }
            .footer { text-align: center; margin-top: 20px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>PAAN Masterclass Registration Confirmed</h1>
                <p>Payment Reference: ${reference}</p>
                <p>Registration Date: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="content">
                <div class="section">
                    <h3>Registration Details</h3>
                    <div class="field"><strong>Full Name:</strong> ${masterclassData.name}</div>
                    <div class="field"><strong>Email:</strong> ${masterclassData.email}</div>
                    <div class="field"><strong>Phone:</strong> ${masterclassData.phone || 'Not provided'}</div>
                    <div class="field"><strong>Organization:</strong> ${masterclassData.organization || 'Not provided'}</div>
                </div>

                <div class="masterclass-details">
                    <h3>Masterclass Information</h3>
                    <div class="field"><strong>Title:</strong> ${masterclassData.masterclassTitle}</div>
                    <div class="field"><strong>Date:</strong> ${masterclassData.date}</div>
                    <div class="field"><strong>Time:</strong> ${masterclassData.time}</div>
                    <div class="field"><strong>Format:</strong> ${masterclassData.format}</div>
                    <div class="field"><strong>Instructor:</strong> ${masterclassData.instructor}</div>
                    <div class="field"><strong>Pricing Type:</strong> ${masterclassData.pricingType}</div>
                </div>

                <div class="payment-details">
                    <h3>Payment Details</h3>
                    <div class="field"><strong>Amount:</strong> ${paymentData.currency} ${(paymentData.amount / 100).toLocaleString()}</div>
                    <div class="field"><strong>Status:</strong> ${paymentData.status}</div>
                    <div class="field"><strong>Paid At:</strong> ${paymentData.paidAt ? new Date(paymentData.paidAt).toLocaleString() : 'N/A'}</div>
                </div>
            </div>

            <div class="footer">
                <p>This masterclass registration has been successfully confirmed and payment has been processed.</p>
                <p><strong>PAAN Masterclasses Team</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send email to secretariat
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_EMAIL,
      to: 'secretariat@paan.africa',
      cc: masterclassData.email, 
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    // Send email to secretariat
    try {
      await transporter.sendMail(mailOptions);
      console.log('Administrative email sent successfully to secretariat@paan.africa');
    } catch (adminEmailError) {
      console.error('Failed to send administrative email:', adminEmailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send administrative email',
        error: adminEmailError.message
      });
    }

    // Send confirmation email to participant
    const confirmationEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_EMAIL,
      to: masterclassData.email,
      subject: `PAAN Masterclass Confirmation - ${masterclassData.masterclassTitle}`,
      text: `
Dear ${masterclassData.name},

Thank you for registering for the PAAN Masterclass!

Your registration has been successfully confirmed and your payment of ${paymentData.currency} ${(paymentData.amount / 100).toLocaleString()} has been processed.

Masterclass Details:
- Reference: ${reference}
- Title: ${masterclassData.masterclassTitle}
- Date: ${masterclassData.date}
- Time: ${masterclassData.time}
- Format: ${masterclassData.format}
- Instructor: ${masterclassData.instructor}
- Pricing Type: ${masterclassData.pricingType}
- Price: ${masterclassData.currency} ${masterclassData.amount.toLocaleString()}
- Registration Date: ${new Date().toLocaleString()}

What's Next:
1. You'll receive joining instructions via email 24 hours before the session
2. Make sure to test your internet connection and Zoom setup
3. Prepare any questions you'd like to ask during the interactive session
4. Check your email for any updates or additional materials

If you have any questions, please contact us at secretariat@paan.africa.

We look forward to seeing you in the masterclass!

Best regards,
PAAN Masterclasses Team
      `.trim(),
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>PAAN Masterclass Confirmation</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #172840; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; }
              .highlight { background: #e8f5e8; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
              .masterclass-info { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>PAAN Masterclass Confirmed</h1>
              </div>
              
              <div class="content">
                  <p>Dear <strong>${masterclassData.name}</strong>,</p>
                  
                  <p>Thank you for registering for the PAAN Masterclass!</p>
                  
                  <div class="highlight">
                      <h3>Registration Confirmed</h3>
                      <p>Your registration has been successfully confirmed and your payment of <strong>${paymentData.currency} ${(paymentData.amount / 100).toLocaleString()}</strong> has been processed.</p>
                  </div>

                  <div class="masterclass-info">
                      <h3>Masterclass Details</h3>
                      <ul>
                          <li><strong>Reference:</strong> ${reference}</li>
                          <li><strong>Title:</strong> ${masterclassData.masterclassTitle}</li>
                          <li><strong>Date:</strong> ${masterclassData.date}</li>
                          <li><strong>Time:</strong> ${masterclassData.time}</li>
                          <li><strong>Format:</strong> ${masterclassData.format}</li>
                          <li><strong>Instructor:</strong> ${masterclassData.instructor}</li>
                          <li><strong>Pricing Type:</strong> ${masterclassData.pricingType}</li>
                          <li><strong>Price:</strong> ${masterclassData.currency} ${masterclassData.amount.toLocaleString()}</li>
                          <li><strong>Registration Date:</strong> ${new Date().toLocaleString()}</li>
                      </ul>
                  </div>

                  <h3>What's Next:</h3>
                  <ol>
                      <li>You'll receive joining instructions via email 24 hours before the session</li>
                      <li>Make sure to test your internet connection and Zoom setup</li>
                      <li>Prepare any questions you'd like to ask during the interactive session</li>
                      <li>Check your email for any updates or additional materials</li>
                  </ol>

                  <p>If you have any questions, please contact us at <a href="mailto:secretariat@paan.africa">secretariat@paan.africa</a>.</p>
                  
                  <p>We look forward to seeing you in the masterclass!</p>
              </div>

              <div class="footer">
                  <p>Best regards,<br><strong>PAAN Masterclasses Team</strong></p>
              </div>
          </div>
      </body>
      </html>
      `
    };

    // Send confirmation email to participant
    try {
      await transporter.sendMail(confirmationEmailOptions);
      console.log('Confirmation email sent successfully to participant:', masterclassData.email);
    } catch (confirmationEmailError) {
      console.error('Failed to send confirmation email to participant:', confirmationEmailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send confirmation email to participant',
        error: confirmationEmailError.message
      });
    }

    console.log('Masterclass registration emails sent successfully:', {
      reference,
      masterclassId: masterclassData.masterclassId,
      customerName: masterclassData.name,
      amount: paymentData.amount,
      emailsSent: ['secretariat@paan.africa', masterclassData.email]
    });

    res.status(200).json({
      success: true,
      message: 'Masterclass registration confirmed and emails sent successfully'
    });

  } catch (error) {
    console.error('Error sending masterclass registration email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send masterclass confirmation email',
      error: error.message
    });
  }
}