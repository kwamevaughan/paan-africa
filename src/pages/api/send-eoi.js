import nodemailer from "nodemailer";
import fs from 'fs';
import os from 'os';
import formidable from 'formidable';
import { uploadFileToDrive } from "../../utils/googleDrive";
import { createClient } from '@supabase/supabase-js';

// Disable Next.js body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('EOI API endpoint called - Method:', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Starting form parsing with formidable...');
    const fields = {};
    const files = [];
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
      keepExtensions: true,
      uploadDir: os.tmpdir(),
      filename: (name, ext, part, form) => {
        return `upload_${Date.now()}_${part.originalFilename || 'file'}`;
      }
    });
    const [formFields, formFiles] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          reject(err);
        } else {
          console.log('Form parsed successfully');
          resolve([fields, files]);
        }
      });
    });

    // Helper to normalize field values
    function getFieldValue(field) {
      return Array.isArray(field) ? field[0] : field;
    }
    // Extract form fields
    const name = getFieldValue(formFields.name) || '';
    const email = getFieldValue(formFields.email) || '';
    const agencyName = getFieldValue(formFields.agencyName) || '';
    const country = getFieldValue(formFields.country) || '';
    const opportunities = getFieldValue(formFields.opportunities) || '[]';
    const credentials = getFieldValue(formFields.credentials) || '';

    // Prepare files for upload
    const credentialsFiles = Array.isArray(formFiles.credentialsFiles)
      ? formFiles.credentialsFiles
      : formFiles.credentialsFiles
      ? [formFiles.credentialsFiles]
      : [];
    const experienceFiles = Array.isArray(formFiles.experience)
      ? formFiles.experience
      : formFiles.experience
      ? [formFiles.experience]
      : [];

    // Upload files to Google Drive and collect links
    const driveUploadResults = [];
    const attachments = [];
    for (const file of [...credentialsFiles, ...experienceFiles]) {
      const fileBuffer = fs.readFileSync(file.filepath);
      const base64String = fileBuffer.toString('base64');
      const uploadResult = await uploadFileToDrive(
        name,
        agencyName,
        base64String,
        file.originalFilename || 'file',
        null,
        file.mimetype || 'application/octet-stream'
      );
      driveUploadResults.push({
        name: file.originalFilename,
        url: uploadResult.url
      });
      attachments.push({
        filename: file.originalFilename,
        content: fileBuffer,
        contentType: file.mimetype || 'application/octet-stream',
      });
    }

    // Clean up temp files
    for (const file of [...credentialsFiles, ...experienceFiles]) {
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {
        console.error('Failed to delete temp file:', file.filepath, err);
      }
    }

    // Format the email content with Google Drive links
    const driveLinksHtml = driveUploadResults.length > 0
      ? `<ul>` + driveUploadResults.map(f => `<li><a href="${f.url}" target="_blank" rel="noopener">${f.name}</a></li>`).join('') + `</ul>`
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
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Agency Name:</strong> ${agencyName}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Country:</strong> ${country}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Selected Opportunities:</strong> ${typeof opportunities === 'string' ? JSON.parse(opportunities).join(', ') : (opportunities || []).join(', ')}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Credentials:</strong></p>
            <p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${credentials}</p>
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

    // Send the email
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
      replyTo: email,
      subject: `New Expression of Interest from ${agencyName}`,
      html: emailContent,
      attachments: attachments,
    });

    // Insert into Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
    const { error } = await supabase.from('eoi_submissions').insert({
      name,
      email,
      agency_name: agencyName,
      country,
      opportunities: typeof opportunities === 'string' ? JSON.parse(opportunities) : opportunities,
      credentials,
      credentials_files: credentialsFiles.map(f => ({
        originalFilename: f.originalFilename,
        mimetype: f.mimetype,
        size: f.size
      })),
      experience_files: experienceFiles.map(f => ({
        originalFilename: f.originalFilename,
        mimetype: f.mimetype,
        size: f.size
      })),
      status: 'done',
      created_at: new Date().toISOString(),
      processed_at: new Date().toISOString(),
      error_message: null
    });
    if (error) {
      console.error('Error inserting EOI submission:', error);
      return res.status(500).json({ message: 'Failed to save submission', error: error.message });
    }
    return res.status(200).json({ message: 'Your submission was successful!' });
  } catch (error) {
    console.error('Error processing EOI submission:', error);
    res.status(500).json({ message: 'Error processing form', error: error.message });
  }
} 