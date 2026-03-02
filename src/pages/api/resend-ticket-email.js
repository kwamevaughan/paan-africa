import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { generateTicketImage } from '../../lib/ticketGenerator';
import { generatePDFTicket } from '../../lib/pdfTicketGenerator';

// Initialize Supabase client
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { attendeeId, paymentReference } = req.body;

  if (!attendeeId || !paymentReference) {
    return res.status(400).json({ message: 'Attendee ID and payment reference are required' });
  }

  if (!supabase) {
    console.error('Supabase is not configured');
    return res.status(500).json({ 
      message: 'Database not configured. Please contact support.' 
    });
  }

  try {
    // Fetch attendee and purchase details
    const { data: attendee, error: attendeeError } = await supabase
      .from('attendees')
      .select(`
        id,
        full_name,
        email,
        ticket_type,
        role,
        organization,
        ticket_purchases!inner (
          payment_reference,
          paid_at,
          status,
          payment_status,
          currency,
          final_amount
        )
      `)
      .eq('id', attendeeId)
      .eq('ticket_purchases.payment_reference', paymentReference)
      .single();

    if (attendeeError || !attendee) {
      console.error('Attendee not found:', attendeeError);
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Verify ticket is paid
    if (attendee.ticket_purchases.status !== 'paid' || 
        attendee.ticket_purchases.payment_status !== 'completed') {
      return res.status(400).json({ message: 'Ticket is not confirmed' });
    }

    // Generate ticket data
    const ticketImageData = {
      name: attendee.full_name,
      email: attendee.email,
      ticketType: attendee.ticket_type,
      ticketId: paymentReference.substring(0, 10),
      registrationNo: paymentReference,
      issuedOn: new Date(attendee.ticket_purchases.paid_at).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      })
    };

    // Generate ticket image and PDF
    const [ticketImageBuffer, ticketPdfBuffer] = await Promise.all([
      generateTicketImage(ticketImageData),
      generatePDFTicket(ticketImageData)
    ]);

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

    // Prepare attachments
    const attachments = [
      {
        filename: `PAAN-Summit-2026-Ticket-${paymentReference}.pdf`,
        content: ticketPdfBuffer,
        contentType: 'application/pdf'
      },
      {
        filename: `PAAN-Summit-2026-Ticket-${paymentReference}.png`,
        content: ticketImageBuffer,
        contentType: 'image/png'
      }
    ];

    // Email content
    const emailSubject = `PAAN Summit 2026 Ticket - ${attendee.full_name}`;
    
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>PAAN Summit 2026 Ticket</title>
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
                <h1>Your PAAN Summit 2026 Ticket</h1>
            </div>
            
            <div class="content">
                <p>Dear <strong>${attendee.full_name}</strong>,</p>
                
                <p>Here is your PAAN Summit 2026 ticket as requested.</p>
                
                <div class="highlight">
                    <h3>Ticket Confirmed</h3>
                    <p>Your ticket has been successfully confirmed.</p>
                </div>

                <h3>Ticket Details:</h3>
                <ul>
                    <li><strong>Reference:</strong> ${paymentReference}</li>
                    <li><strong>Ticket Type:</strong> ${attendee.ticket_type}</li>
                    <li><strong>Purchase Date:</strong> ${new Date(attendee.ticket_purchases.paid_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</li>
                </ul>

                <div class="summit-info">
                    <h3>Summit Information</h3>
                    <ul>
                        <li><strong>Event:</strong> PAAN Summit 2026</li>
                        <li><strong>Date:</strong> 10-12 April 2026</li>
                        <li><strong>Location:</strong> Nairobi, Kenya</li>
                        <li><strong>Venue:</strong> Sarit Centre, Westlands</li>
                    </ul>
                </div>

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

    // Send email
    const emailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_EMAIL,
      to: attendee.email,
      subject: emailSubject,
      html: emailHtml,
      attachments: attachments
    };

    await transporter.sendMail(emailOptions);

    return res.status(200).json({ 
      success: true,
      message: `Ticket email sent successfully to ${attendee.email}` 
    });

  } catch (error) {
    console.error('Error resending ticket email:', error);
    return res.status(500).json({ 
      message: 'Failed to resend ticket email',
      error: error.message 
    });
  }
}
