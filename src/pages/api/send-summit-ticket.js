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

    // ticket data for email
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

      // Student & Young Creatives Information
      if (data.ticketType === 'student-creatives' && (data.studentId || data.institution || data.graduationYear)) {
        formatted += 'STUDENT INFORMATION\n';
        formatted += '===================\n';
        if (data.studentId) formatted += `Student ID: ${data.studentId}\n`;
        if (data.institution) formatted += `Institution: ${data.institution}\n`;
        if (data.graduationYear) formatted += `Graduation Year: ${data.graduationYear}\n`;
        formatted += '\n';
      }

      // Corporate Group Information
      if (data.ticketType === 'corporate-group') {
        formatted += 'CORPORATE GROUP INFORMATION\n';
        formatted += '===========================\n';
        formatted += `Team Size: ${data.teamSize} members\n`;
        if (data.teamMembers && data.teamMembers.length > 0) {
          formatted += `Team Members:\n`;
          data.teamMembers.forEach((member, index) => {
            formatted += `  ${index + 1}. ${member}\n`;
          });
        }
        formatted += '\n';
      }

      // International Delegate Information
      if (data.ticketType === 'international-delegate' && (data.passportNumber || data.visaRequired || data.accommodationNeeded || data.arrivalDate || data.departureDate)) {
        formatted += 'INTERNATIONAL TRAVEL INFORMATION\n';
        formatted += '=================================\n';
        if (data.passportNumber) formatted += `Passport Number: ${data.passportNumber}\n`;
        if (data.visaRequired) formatted += `Visa Required: ${data.visaRequired}\n`;
        if (data.accommodationNeeded) formatted += `Accommodation Assistance: ${data.accommodationNeeded}\n`;
        if (data.arrivalDate) formatted += `Arrival Date: ${data.arrivalDate}\n`;
        if (data.departureDate) formatted += `Departure Date: ${data.departureDate}\n`;
        formatted += '\n';
      }

      // Virtual Access Information
      if (data.ticketType === 'virtual-access' && (data.timezone || data.preferredLanguage)) {
        formatted += 'VIRTUAL ACCESS PREFERENCES\n';
        formatted += '==========================\n';
        if (data.timezone) formatted += `Timezone: ${data.timezone}\n`;
        if (data.preferredLanguage) formatted += `Preferred Language: ${data.preferredLanguage}\n`;
        formatted += '\n';
      }

      // Agency Growth Information
      if (data.ticketType === 'agency-growth' && (data.agencySize || data.yearsInBusiness)) {
        formatted += 'AGENCY INFORMATION\n';
        formatted += '==================\n';
        if (data.agencySize) formatted += `Agency Size: ${data.agencySize}\n`;
        if (data.yearsInBusiness) formatted += `Years in Business: ${data.yearsInBusiness}\n`;
        formatted += '\n';
      }

      // VIP Delegate Information
      if (data.ticketType === 'vip-delegate' && (data.dietaryRequirements || data.accessibilityNeeds)) {
        formatted += 'VIP PREFERENCES\n';
        formatted += '===============\n';
        if (data.dietaryRequirements) formatted += `Dietary Requirements: ${data.dietaryRequirements}\n`;
        if (data.accessibilityNeeds) formatted += `Accessibility Needs: ${data.accessibilityNeeds}\n`;
        formatted += '\n';
      }

      // Early Bird Information
      if (data.ticketType === 'early-bird' && data.heardAbout) {
        formatted += 'EARLY BIRD INFORMATION\n';
        formatted += '======================\n';
        formatted += `How did you hear about PAAN Summit: ${data.heardAbout}\n`;
        formatted += '\n';
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

                ${ticketData.ticketType === 'student-creatives' && (ticketData.studentId || ticketData.institution || ticketData.graduationYear) ? `
                <div class="section">
                    <h3>Student Information</h3>
                    ${ticketData.studentId ? `<div class="field"><strong>Student ID:</strong> ${ticketData.studentId}</div>` : ''}
                    ${ticketData.institution ? `<div class="field"><strong>Institution:</strong> ${ticketData.institution}</div>` : ''}
                    ${ticketData.graduationYear ? `<div class="field"><strong>Graduation Year:</strong> ${ticketData.graduationYear}</div>` : ''}
                </div>
                ` : ''}

                ${ticketData.ticketType === 'corporate-group' ? `
                <div class="section">
                    <h3>Corporate Group Information</h3>
                    <div class="field"><strong>Team Size:</strong> ${ticketData.teamSize} members</div>
                    ${ticketData.teamMembers && ticketData.teamMembers.length > 0 ? `
                    <div class="field"><strong>Team Members:</strong>
                        <ol>
                            ${ticketData.teamMembers.map(member => `<li>${member}</li>`).join('')}
                        </ol>
                    </div>
                    ` : ''}
                </div>
                ` : ''}

                ${ticketData.ticketType === 'international-delegate' && (ticketData.passportNumber || ticketData.visaRequired || ticketData.accommodationNeeded || ticketData.arrivalDate || ticketData.departureDate) ? `
                <div class="section">
                    <h3>International Travel Information</h3>
                    ${ticketData.passportNumber ? `<div class="field"><strong>Passport Number:</strong> ${ticketData.passportNumber}</div>` : ''}
                    ${ticketData.visaRequired ? `<div class="field"><strong>Visa Required:</strong> ${ticketData.visaRequired}</div>` : ''}
                    ${ticketData.accommodationNeeded ? `<div class="field"><strong>Accommodation Assistance:</strong> ${ticketData.accommodationNeeded}</div>` : ''}
                    ${ticketData.arrivalDate ? `<div class="field"><strong>Arrival Date:</strong> ${ticketData.arrivalDate}</div>` : ''}
                    ${ticketData.departureDate ? `<div class="field"><strong>Departure Date:</strong> ${ticketData.departureDate}</div>` : ''}
                </div>
                ` : ''}

                ${ticketData.ticketType === 'virtual-access' && (ticketData.timezone || ticketData.preferredLanguage) ? `
                <div class="section">
                    <h3>Virtual Access Preferences</h3>
                    ${ticketData.timezone ? `<div class="field"><strong>Timezone:</strong> ${ticketData.timezone}</div>` : ''}
                    ${ticketData.preferredLanguage ? `<div class="field"><strong>Preferred Language:</strong> ${ticketData.preferredLanguage}</div>` : ''}
                </div>
                ` : ''}

                ${ticketData.ticketType === 'agency-growth' && (ticketData.agencySize || ticketData.yearsInBusiness) ? `
                <div class="section">
                    <h3>Agency Information</h3>
                    ${ticketData.agencySize ? `<div class="field"><strong>Agency Size:</strong> ${ticketData.agencySize}</div>` : ''}
                    ${ticketData.yearsInBusiness ? `<div class="field"><strong>Years in Business:</strong> ${ticketData.yearsInBusiness}</div>` : ''}
                </div>
                ` : ''}

                ${ticketData.ticketType === 'vip-delegate' && (ticketData.dietaryRequirements || ticketData.accessibilityNeeds) ? `
                <div class="section">
                    <h3>VIP Preferences</h3>
                    ${ticketData.dietaryRequirements ? `<div class="field"><strong>Dietary Requirements:</strong> ${ticketData.dietaryRequirements}</div>` : ''}
                    ${ticketData.accessibilityNeeds ? `<div class="field"><strong>Accessibility Needs:</strong> ${ticketData.accessibilityNeeds}</div>` : ''}
                </div>
                ` : ''}

                ${ticketData.ticketType === 'early-bird' && ticketData.heardAbout ? `
                <div class="section">
                    <h3>Early Bird Information</h3>
                    <div class="field"><strong>How did you hear about PAAN Summit:</strong> ${ticketData.heardAbout}</div>
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
