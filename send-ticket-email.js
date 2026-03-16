// Dry run script to send ticket email for Sharon Mbugua
const nodemailer = require('nodemailer');
const { generateTicketImage } = require('./src/lib/ticketGenerator');
const { generatePDFTicket } = require('./src/lib/pdfTicketGenerator');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}

async function sendTicketEmail() {
  console.log('Starting ticket email generation...\n');

  // Ticket data for Sharon Mbugua
  const ticketData = {
    name: 'Sharon Mbugua',
    email: 'sm@amethystconsult.com',
    phone: '+254 722 791432',
    country: 'Kenya',
    role: 'Professional',
    company: 'Amethyst Consult',
    ticketType: 'General Admission',
    currency: 'USD',
    amount: 65,
    features: [
      'Full 2-day access (22-23 September 2026)',
      'Access to all exhibitions & keynotes',
      'Networking opportunities',
      'Digital certificate'
    ]
  };

  const paymentData = {
    currency: 'USD',
    amount: 6500, // $65 in cents
    status: 'success',
    paidAt: '2025-12-27T00:00:00.000Z'
  };

  const reference = 'PAAN_1768383442165_vccq3angx';

  console.log('Ticket Details:');
  console.log('- Name:', ticketData.name);
  console.log('- Email:', ticketData.email);
  console.log('- Ticket Type:', ticketData.ticketType);
  console.log('- Registration No:', reference);
  console.log('- Issued On: 12-27-2025');
  console.log('- Event Dates: 22-23 September 2026');
  console.log('- Venue: Sarit Centre, Westlands, Nairobi, Kenya\n');

  try {
    // Create email transporter
    console.log('Setting up email transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Generate ticket image and PDF
    console.log('Generating ticket image and PDF...');
    const ticketImageData = {
      name: ticketData.name,
      email: ticketData.email,
      ticketType: ticketData.ticketType,
      ticketId: reference.substring(0, 10),
      registrationNo: reference,
      issuedOn: '12/27/2025'
    };

    const [ticketImageBuffer, ticketPdfBuffer] = await Promise.all([
      generateTicketImage(ticketImageData),
      generatePDFTicket(ticketImageData)
    ]);

    console.log('✓ Ticket image generated');
    console.log('✓ Ticket PDF generated\n');

    // Prepare attachments
    const attachments = [
      {
        filename: `PAAN-Summit-2026-Ticket-${reference}.pdf`,
        content: ticketPdfBuffer,
        contentType: 'application/pdf'
      },
      {
        filename: `PAAN-Summit-2026-Ticket-${reference}.png`,
        content: ticketImageBuffer,
        contentType: 'image/png'
      }
    ];

    // Email content
    const emailSubject = `PAAN Summit 2026 Ticket Confirmation - ${ticketData.name}`;
    
    const emailHtml = `
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
            .important { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
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
                
                <p>Thank you for your PAAN Summit 2026 registration!</p>
                
                <div class="highlight">
                    <h3>Ticket Confirmed</h3>
                    <p>Your ticket has been successfully confirmed.</p>
                </div>

                <h3>Ticket Details:</h3>
                    <ul>
                    <li><strong>Reference:</strong> ${reference}</li>
                    <li><strong>Ticket Type:</strong> ${ticketData.ticketType}</li>
                    <li><strong>Issued On:</strong> December 27, 2025</li>
                </ul>

                <div class="summit-info">
                    <h3>Summit Information</h3>
                    <ul>
                    <li><strong>Event:</strong> PAAN Summit 2026</li>
                    <li><strong>Date:</strong> 22-23 September 2026</li>
                    <li><strong>Location:</strong> Nairobi, Kenya</li>
                    <li><strong>Venue:</strong> Sarit Centre, Westlands</li>
                </ul>
                </div>

                <h3>What's Next:</h3>
                <ol>
                    <li>Your digital ticket is attached to this email (PDF and image formats)</li>
                    <li>Save your ticket to your phone or print it out</li>
                    <li>Check your email for updates and important information</li>
                    <li>Follow us on social media for the latest updates</li>
                </ol>

                <div class="important">
                    <h3>⚠️ Important</h3>
                    <p>Please bring a <strong>printed or digital copy of your ticket (PDF recommended)</strong> and a <strong>valid ID</strong> to the event.</p>
                </div>

                <p>If you have any questions, please contact us at <a href="mailto:secretariat@paan.africa">secretariat@paan.africa</a>.</p>
                
                <p>We look forward to seeing you at the summit!</p>
            </div>

            <div class="footer">
                <p>Best regards,<br><strong>PAAN Summit Team</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send confirmation email
    console.log('Sending email to:', ticketData.email);
    const confirmationEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_EMAIL,
      to: ticketData.email,
      subject: emailSubject,
      html: emailHtml,
      attachments: attachments
    };

    await transporter.sendMail(confirmationEmailOptions);

    console.log('\n✓ Email sent successfully!');
    console.log('✓ Attachments included: PDF and PNG ticket');
    console.log('\nDone! Check', ticketData.email, 'for the ticket email.');

  } catch (error) {
    console.error('\n✗ Error sending ticket email:', error.message);
    console.error(error);
  }
}

// Run the script
sendTicketEmail();
