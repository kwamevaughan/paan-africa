import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      paymentData,
      ticketData,
      reference
    } = req.body;

    // Validate required fields
    if (!ticketData || !paymentData || !reference) {
      return res.status(400).json({
        success: false,
        message: 'Missing required ticket data'
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
    });

    // Format ticket data for email
    const formatTicketData = (data) => {
      let formatted = '';
      
      // Personal Information
      formatted += 'TICKET PURCHASE DETAILS\n';
      formatted += '========================\n';
      formatted += `Full Name: ${data.name}\n`;
      formatted += `Email: ${data.email}\n`;
      formatted += `Phone: ${data.phone}\n`;
      formatted += `Country: ${data.country}\n`;
      formatted += `Role: ${data.role}\n`;
      formatted += `Company: ${data.company}\n\n`;

      // Ticket Information
      formatted += 'TICKET INFORMATION\n';
      formatted += '==================\n';
      formatted += `Ticket Type: ${data.ticketType}\n`;
      formatted += `Price: ${data.currency} ${data.amount.toLocaleString()}\n`;
      formatted += `Features: ${data.features.join(', ')}\n\n`;

      // Membership Verification (if applicable)
      if (data.membershipVerification && data.membershipVerification.method) {
        formatted += 'MEMBERSHIP VERIFICATION\n';
        formatted += '=======================\n';
        formatted += `Method: ${data.membershipVerification.method}\n`;
        formatted += `Value: ${data.membershipVerification.value}\n\n`;
      }

      return formatted;
    };

    // Create email content
    const emailSubject = `PAAN Summit Ticket Purchase - ${ticketData.name} - ${ticketData.ticketType}`;
    
    const emailText = `
PAAN SUMMIT TICKET PURCHASE CONFIRMED

Payment Reference: ${reference}
Purchase Date: ${new Date().toLocaleString()}

${formatTicketData(ticketData)}

PAYMENT DETAILS
===============
Amount: ${paymentData.currency} ${(paymentData.amount / 100).toLocaleString()}
Status: ${paymentData.status}
Paid At: ${paymentData.paidAt ? new Date(paymentData.paidAt).toLocaleString() : 'N/A'}

SUMMIT DETAILS
==============
Event: PAAN Summit 2026
Date: April 21-22, 2026
Location: Nairobi, Kenya
Venue: TBA (Details will be shared closer to the event)

This ticket purchase has been successfully confirmed and payment has been processed.

Best regards,
PAAN Summit Team
    `.trim();

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>PAAN Summit Ticket Purchase</title>
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
            .summit-details { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196F3; }
            .footer { text-align: center; margin-top: 20px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>PAAN Summit Ticket Purchase Confirmed</h1>
                <p>Payment Reference: ${reference}</p>
                <p>Purchase Date: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="content">
                <div class="section">
                    <h3>Ticket Purchase Details</h3>
                    <div class="field"><strong>Full Name:</strong> ${ticketData.name}</div>
                    <div class="field"><strong>Email:</strong> ${ticketData.email}</div>
                    <div class="field"><strong>Phone:</strong> ${ticketData.phone}</div>
                    <div class="field"><strong>Country:</strong> ${ticketData.country}</div>
                    <div class="field"><strong>Role:</strong> ${ticketData.role}</div>
                    <div class="field"><strong>Company:</strong> ${ticketData.company}</div>
                </div>

                <div class="section">
                    <h3>Ticket Information</h3>
                    <div class="field"><strong>Ticket Type:</strong> ${ticketData.ticketType}</div>
                    <div class="field"><strong>Price:</strong> ${ticketData.currency} ${ticketData.amount.toLocaleString()}</div>
                    <div class="field"><strong>Features:</strong>
                        <ul>
                            ${ticketData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                ${ticketData.membershipVerification && ticketData.membershipVerification.method ? `
                <div class="section">
                    <h3>Membership Verification</h3>
                    <div class="field"><strong>Method:</strong> ${ticketData.membershipVerification.method}</div>
                    <div class="field"><strong>Value:</strong> ${ticketData.membershipVerification.value}</div>
                </div>
                ` : ''}

                <div class="payment-details">
                    <h3>Payment Details</h3>
                    <div class="field"><strong>Amount:</strong> ${paymentData.currency} ${(paymentData.amount / 100).toLocaleString()}</div>
                    <div class="field"><strong>Status:</strong> ${paymentData.status}</div>
                    <div class="field"><strong>Paid At:</strong> ${paymentData.paidAt ? new Date(paymentData.paidAt).toLocaleString() : 'N/A'}</div>
                </div>

                <div class="summit-details">
                    <h3>Summit Details</h3>
                    <div class="field"><strong>Event:</strong> PAAN Summit 2026</div>
                    <div class="field"><strong>Date:</strong> April 21-22, 2026</div>
                    <div class="field"><strong>Location:</strong> Nairobi, Kenya</div>
                    <div class="field"><strong>Venue:</strong> TBA (Details will be shared closer to the event)</div>
                </div>
            </div>

            <div class="footer">
                <p>This ticket purchase has been successfully confirmed and payment has been processed.</p>
                <p><strong>PAAN Summit Team</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send email to secretariat
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_EMAIL,
      to: 'secretariat@paan.africa',
      cc: ticketData.email, // Send copy to ticket holder
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to ticket holder
    const confirmationEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_EMAIL,
      to: ticketData.email,
      subject: `PAAN Summit 2026 Ticket Confirmation - ${ticketData.name}`,
      text: `
Dear ${ticketData.name},

Thank you for purchasing your PAAN Summit 2026 ticket!

Your ticket has been successfully confirmed and your payment of ${paymentData.currency} ${(paymentData.amount / 100).toLocaleString()} has been processed.

Ticket Details:
- Reference: ${reference}
- Ticket Type: ${ticketData.ticketType}
- Price: ${ticketData.currency} ${ticketData.amount.toLocaleString()}
- Purchase Date: ${new Date().toLocaleString()}

Summit Information:
- Event: PAAN Summit 2026
- Date: April 21-22, 2026
- Location: Nairobi, Kenya
- Venue: TBA (Details will be shared closer to the event)

What's Next:
1. You'll receive your digital ticket via email shortly
2. Venue details will be shared closer to the event
3. Check your email for updates and important information
4. Follow us on social media for the latest updates

If you have any questions, please contact us at secretariat@paan.africa.

We look forward to seeing you at the summit!

Best regards,
PAAN Summit Team
      `.trim(),
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>PAAN Summit 2026 Ticket Confirmation</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #172840; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; }
              .highlight { background: #e8f5e8; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
              .summit-info { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>PAAN Summit 2026 Ticket Confirmed</h1>
              </div>
              
              <div class="content">
                  <p>Dear <strong>${ticketData.name}</strong>,</p>
                  
                  <p>Thank you for purchasing your PAAN Summit 2026 ticket!</p>
                  
                  <div class="highlight">
                      <h3>Ticket Confirmed</h3>
                      <p>Your ticket has been successfully confirmed and your payment of <strong>${paymentData.currency} ${(paymentData.amount / 100).toLocaleString()}</strong> has been processed.</p>
                  </div>

                  <h3>Ticket Details:</h3>
                  <ul>
                      <li><strong>Reference:</strong> ${reference}</li>
                      <li><strong>Ticket Type:</strong> ${ticketData.ticketType}</li>
                      <li><strong>Price:</strong> ${ticketData.currency} ${ticketData.amount.toLocaleString()}</li>
                      <li><strong>Purchase Date:</strong> ${new Date().toLocaleString()}</li>
                  </ul>

                  <div class="summit-info">
                      <h3>Summit Information</h3>
                      <ul>
                          <li><strong>Event:</strong> PAAN Summit 2026</li>
                          <li><strong>Date:</strong> April 21-22, 2026</li>
                          <li><strong>Location:</strong> Nairobi, Kenya</li>
                          <li><strong>Venue:</strong> TBA (Details will be shared closer to the event)</li>
                      </ul>
                  </div>

                  <h3>What's Next:</h3>
                  <ol>
                      <li>You'll receive your digital ticket via email shortly</li>
                      <li>Venue details will be shared closer to the event</li>
                      <li>Check your email for updates and important information</li>
                      <li>Follow us on social media for the latest updates</li>
                  </ol>

                  <p>If you have any questions, please contact us at <a href="mailto:secretariat@paan.africa">secretariat@paan.africa</a>.</p>
                  
                  <p>We look forward to seeing you at the summit!</p>
              </div>

              <div class="footer">
                  <p>Best regards,<br><strong>PAAN Summit Team</strong></p>
              </div>
          </div>
      </body>
      </html>
      `
    };

    await transporter.sendMail(confirmationEmailOptions);

    console.log('Summit ticket purchase emails sent successfully:', {
      reference,
      ticketType: ticketData.ticketType,
      customerName: ticketData.name,
      amount: paymentData.amount,
      emailsSent: ['secretariat@paan.africa', ticketData.email]
    });

    res.status(200).json({
      success: true,
      message: 'Ticket purchase confirmed and emails sent successfully'
    });

  } catch (error) {
    console.error('Error sending summit ticket email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send ticket confirmation email',
      error: error.message
    });
  }
}
