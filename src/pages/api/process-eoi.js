import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const functionStart = Date.now();
  console.log('Function handler started');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  console.log('Supabase client created:', (Date.now() - functionStart) / 1000, 'seconds');

  // 1. Get the oldest pending_email submission
  const { data: submissions, error: fetchError } = await supabase
    .from('eoi_submissions')
    .select('*')
    .eq('status', 'pending_email')
    .order('created_at', { ascending: true })
    .limit(1);
  console.log('DB query completed:', (Date.now() - functionStart) / 1000, 'seconds');

  if (fetchError) {
    return res.status(500).json({ message: 'Failed to fetch pending submission', error: fetchError.message });
  }
  if (!submissions || submissions.length === 0) {
    return res.status(200).json({ message: 'No pending submissions to process.' });
  }

  const submission = submissions[0];
  console.log('Found submission:', submission.id, 'at', (Date.now() - functionStart) / 1000, 'seconds');

  // 2. Mark as processing
  await supabase.from('eoi_submissions').update({ status: 'processing' }).eq('id', submission.id);
  console.log('Marked as processing:', (Date.now() - functionStart) / 1000, 'seconds');

  try {
    // 3. Upload only one file to Google Drive using base64 from DB
    let credentialsFiles = submission.credentials_files_base64 || [];
    let experienceFiles = submission.experience_files_base64 || [];
    let driveFiles = submission.drive_files;
    let emailSent = submission.email_sent || false;
    if (typeof credentialsFiles === 'string') {
      try { credentialsFiles = JSON.parse(credentialsFiles); } catch (e) { credentialsFiles = []; }
    }
    if (typeof experienceFiles === 'string') {
      try { experienceFiles = JSON.parse(experienceFiles); } catch (e) { experienceFiles = []; }
    }
    if (typeof driveFiles === 'string') {
      try { driveFiles = JSON.parse(driveFiles); } catch (e) { driveFiles = []; }
    }
    driveFiles = driveFiles || [];
    console.log('Parsed file arrays:', (Date.now() - functionStart) / 1000, 'seconds');

    // If there are files left, upload one file only
    let fileToProcess, fileType, fileIndex;
    if (credentialsFiles.length > 0) {
      fileToProcess = credentialsFiles[0];
      fileType = 'credentials';
      fileIndex = 0;
    } else if (experienceFiles.length > 0) {
      fileToProcess = experienceFiles[0];
      fileType = 'experience';
      fileIndex = 0;
    }
    if (fileToProcess && fileToProcess.base64) {
      const uploadStart = Date.now();
      console.log('Starting upload for file:', fileToProcess.originalFilename, 'size:', fileToProcess.size, 'bytes');
      // Upload this file to Google Drive
      const uploadResult = await require('../../utils/googleDrive').uploadFileToDrive(
        submission.name,
        submission.agency_name,
        fileToProcess.base64,
        fileToProcess.originalFilename || 'file',
        null,
        fileToProcess.mimetype || 'application/octet-stream'
      );
      console.log('Upload completed for file:', fileToProcess.originalFilename, 'in', (Date.now() - uploadStart) / 1000, 'seconds');
      const justUploadedDriveLink = {
        name: fileToProcess.originalFilename,
        url: uploadResult.url
      };
      driveFiles.push(justUploadedDriveLink);
      // Remove the processed file from the base64 arrays
      if (fileType === 'credentials') {
        credentialsFiles.splice(fileIndex, 1);
      } else if (fileType === 'experience') {
        experienceFiles.splice(fileIndex, 1);
      }
      // Update DB, keep status as processing
      await supabase.from('eoi_submissions').update({
        credentials_files_base64: credentialsFiles,
        experience_files_base64: experienceFiles,
        drive_files: driveFiles,
        status: 'processing',
        error_message: null
      }).eq('id', submission.id);
      console.log('DB update for partial completion:', (Date.now() - functionStart) / 1000, 'seconds');
      console.log('Function completed in', (Date.now() - functionStart) / 1000, 'seconds');
      return res.status(200).json({ message: 'Processed one file, more to go.' });
    }

    // If all files are uploaded and email not sent, send the email and mark as done
    if (credentialsFiles.length === 0 && experienceFiles.length === 0 && !emailSent) {
      console.log('All files processed, preparing email:', (Date.now() - functionStart) / 1000, 'seconds');
      const driveLinksHtml = (driveFiles && driveFiles.length > 0)
        ? `<ul>` + driveFiles.map(f => `<li><a href=\"${f.url}\" target=\"_blank\" rel=\"noopener\">${f.name}</a></li>`).join('') + `</ul>`
        : '<p>No files uploaded.</p>';
      const emailContent = `
        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px; font-family: Arial, sans-serif; color: #172840;\">
          <tr>
            <td align=\"center\" style=\"padding: 20px 0;\">
              <img src=\"https://paan.africa/assets/images/logo.png\" alt=\"PAAN Logo\" style=\"max-width: 200px;\" />
            </td>
          </tr>
          <tr>
            <td style=\"background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;\">
              New Expression of Interest Submission
            </td>
          </tr>
          <tr>
            <td style=\"background-color: #f9f9f9; padding: 20px;\">
              <p style=\"margin: 0 0 10px; font-size: 16px;\"><strong>Name:</strong> ${submission.name}</p>
              <p style=\"margin: 0 0 10px; font-size: 16px;\"><strong>Email:</strong> ${submission.email}</p>
              <p style=\"margin: 0 0 10px; font-size: 16px;\"><strong>Agency Name:</strong> ${submission.agency_name}</p>
              <p style=\"margin: 0 0 10px; font-size: 16px;\"><strong>Country:</strong> ${submission.country}</p>
              <p style=\"margin: 0 0 10px; font-size: 16px;\"><strong>Selected Opportunities:</strong> ${(submission.opportunities || []).join(', ')}</p>
              <p style=\"margin: 0 0 10px; font-size: 16px;\"><strong>Credentials:</strong></p>
              <p style=\"margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;\">${submission.credentials}</p>
              <p style=\"margin: 20px 0 10px; font-size: 16px;\"><strong>Uploaded Files (Google Drive Links):</strong></p>
              ${driveLinksHtml}
            </td>
          </tr>
          <tr>
            <td style=\"background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;\">
              <p style=\"margin: 0; font-size: 14px;\">Pan-African Agency Network (PAAN)</p>
              <p style=\"margin: 5px 0 0; font-size: 12px;\">© ${new Date().getFullYear()} PAAN. All rights reserved.</p>
            </td>
          </tr>
        </table>
      `;
      console.log('Email content prepared:', (Date.now() - functionStart) / 1000, 'seconds');
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
      console.log('Email transporter created:', (Date.now() - functionStart) / 1000, 'seconds');
      await transporter.sendMail({
        from: `"PAAN" <${process.env.INFO_EMAIL}>`,
        to: process.env.SMTP_EMAIL,
        cc: process.env.CC_EMAIL,
        replyTo: submission.email,
        subject: `New Expression of Interest from ${submission.agency_name}`,
        html: emailContent,
      });
      console.log('Email sent:', (Date.now() - functionStart) / 1000, 'seconds');
      await supabase.from('eoi_submissions').update({
        status: 'done',
        processed_at: new Date().toISOString(),
        error_message: null,
        credentials_files_base64: null,
        experience_files_base64: null,
        drive_files: driveFiles,
        email_sent: true
      }).eq('id', submission.id);
      console.log('Final DB update completed:', (Date.now() - functionStart) / 1000, 'seconds');
      console.log('Function completed in', (Date.now() - functionStart) / 1000, 'seconds');
      return res.status(200).json({ message: 'All files processed, email sent.' });
    }

    // If all files are uploaded and email already sent, do nothing
    if (credentialsFiles.length === 0 && experienceFiles.length === 0 && emailSent) {
      console.log('All files processed and email already sent:', (Date.now() - functionStart) / 1000, 'seconds');
      return res.status(200).json({ message: 'All files processed and email already sent.' });
    }
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