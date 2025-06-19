import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  // 1. Get the oldest pending_email submission
  const { data: submissions, error: fetchError } = await supabase
    .from('eoi_submissions')
    .select('*')
    .eq('status', 'pending_email')
    .order('created_at', { ascending: true })
    .limit(1);

  if (fetchError) {
    return res.status(500).json({ message: 'Failed to fetch pending submission', error: fetchError.message });
  }
  if (!submissions || submissions.length === 0) {
    return res.status(200).json({ message: 'No pending submissions to process.' });
  }

  const submission = submissions[0];

  // 2. Mark as processing
  await supabase.from('eoi_submissions').update({ status: 'processing' }).eq('id', submission.id);

  try {
    // 3. Prepare email content with Google Drive links
    const driveLinksHtml = (submission.drive_files && submission.drive_files.length > 0)
      ? `<ul>` + submission.drive_files.map(f => `<li><a href="${f.url}" target="_blank" rel="noopener">${f.name}</a></li>`).join('') + `</ul>`
      : '<p>No files uploaded.</p>';

    const emailContent = `
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
          </td>
        </tr>
        <tr>
          <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
            New Expression of Interest Submission
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${submission.name}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> ${submission.email}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Agency Name:</strong> ${submission.agency_name}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Country:</strong> ${submission.country}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Selected Opportunities:</strong> ${(submission.opportunities || []).join(', ')}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Credentials:</strong></p>
            <p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${submission.credentials}</p>
            <p style="margin: 20px 0 10px; font-size: 16px;"><strong>Uploaded Files (Google Drive Links):</strong></p>
            ${driveLinksHtml}
          </td>
        </tr>
        <tr>
          <td style="background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
            <p style="margin: 5px 0 0; font-size: 12px;">© ${new Date().getFullYear()} PAAN. All rights reserved.</p>
          </td>
        </tr>
      </table>
    `;

    // 4. Send the email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.sendMail({
      from: `"PAAN" <${process.env.INFO_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      cc: process.env.CC_EMAIL,
      replyTo: submission.email,
      subject: `New Expression of Interest from ${submission.agency_name}`,
      html: emailContent,
    });

    // 5. Mark as done
    await supabase.from('eoi_submissions').update({
      status: 'done',
      processed_at: new Date().toISOString(),
      error_message: null
    }).eq('id', submission.id);

    return res.status(200).json({ message: 'Submission processed and email sent.' });
  } catch (error) {
    // Mark as failed
    await supabase.from('eoi_submissions').update({
      status: 'failed',
      processed_at: new Date().toISOString(),
      error_message: error.message
    }).eq('id', submission.id);
    return res.status(500).json({ message: 'Failed to process submission', error: error.message });
  }
} 