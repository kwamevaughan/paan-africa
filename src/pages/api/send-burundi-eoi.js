import nodemailer from "nodemailer";
import fs from 'fs';
import os from 'os';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('Burundi EOI handler called - Method:', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Starting form parsing with formidable...');
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
      keepExtensions: true,
      uploadDir: os.tmpdir(),
      filename: (name, ext, part, form) => {
        return `upload_${Date.now()}_${part.originalFilename || 'file'}`;
      }
    });
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });
    console.log('Form parsed successfully. Fields:', fields);
    console.log('Files:', Object.keys(files));

    function getFieldValue(field) {
      return Array.isArray(field) ? field[0] : field;
    }

    // Extract fields
    const name = getFieldValue(fields.name) || '';
    const email = getFieldValue(fields.email) || '';
    const agencyName = getFieldValue(fields.agencyName) || '';
    const country = getFieldValue(fields.country) || '';
    const website = getFieldValue(fields.website) || '';
    const experience = getFieldValue(fields.experience) || '';
    const motivation = getFieldValue(fields.motivation) || '';

    // Prepare files for base64 storage
    const credentialsFiles = Array.isArray(files.credentialsFiles)
      ? files.credentialsFiles
      : files.credentialsFiles
      ? [files.credentialsFiles]
      : [];
    const credentialsFilesBase64 = credentialsFiles.map(file => {
      const fileBuffer = fs.readFileSync(file.filepath);
      return {
        originalFilename: file.originalFilename,
        mimetype: file.mimetype,
        size: file.size,
        base64: fileBuffer.toString('base64'),
      };
    });
    // Clean up temp files
    for (const file of credentialsFiles) {
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {
        // ignore
      }
    }

    // Prepare attachments for admin email
    const attachments = credentialsFilesBase64.map(f => ({
      filename: f.originalFilename,
      content: Buffer.from(f.base64, 'base64'),
      contentType: f.mimetype,
    }));

    // Send email notification to admin and user
    console.log('SMTP config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_EMAIL,
      secure: process.env.EMAIL_SECURE,
    });
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Compose admin email
    const adminHtml = `
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
          </td>
        </tr>
        <tr>
          <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
            New Burundi EOI Submission
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Agency/Organization:</strong> ${agencyName}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Country:</strong> ${country}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Website:</strong> <a href="${website}" target="_blank" style="color: #2a5bd7;">${website}</a></p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Experience:</strong></p>
            <p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${experience}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Motivation:</strong></p>
            <p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${motivation}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Files:</strong></p>
            ${credentialsFilesBase64.length > 0
              ? `<ul>${credentialsFilesBase64.map(f => `<li>${f.originalFilename} (${f.mimetype}, ${Math.round(f.size/1024)} KB)</li>`).join('')}</ul>`
              : '<em>No files uploaded</em>'}
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

    // Compose user confirmation email
    const userHtml = `
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
          </td>
        </tr>
        <tr>
          <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
            Thank You for Your Expression of Interest!
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="margin: 0 0 10px; font-size: 16px;">Dear ${name},</p>
            <p style="margin: 0 0 10px; font-size: 16px;">Thank you for submitting your Expression of Interest for the Burundi Nation Branding project. Our team has received your submission and will review it shortly.</p>
            <p style="margin: 0 0 10px; font-size: 16px;">If you have any questions, feel free to reply to this email.</p>
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

    console.log('Sending emails...');
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      transporter.sendMail({
        from: `"PAAN Burundi EOI" <${process.env.INFO_EMAIL || process.env.SMTP_EMAIL}>`,
        to: process.env.SMTP_EMAIL, // Send to admin email from env
        replyTo: email,
        subject: `New Burundi EOI Submission from ${name}`,
        html: adminHtml,
        attachments, // Attach uploaded files
      }),
      transporter.sendMail({
        from: `"PAAN Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.SMTP_EMAIL,
        subject: "Thank You for Your Expression of Interest - PAAN",
        html: userHtml,
      }),
    ]);
    console.log('Emails sent. Results:', { adminEmailResult, userEmailResult });

    if (adminEmailResult.status === "rejected") {
      console.error("Failed to send admin email:", adminEmailResult.reason);
    }
    if (userEmailResult.status === "rejected") {
      console.error("Failed to send user confirmation email:", userEmailResult.reason);
    }
    if (adminEmailResult.status === "rejected" || userEmailResult.status === "rejected") {
      throw new Error("One or both emails failed to send");
    }

    return res.status(200).json({ message: 'Your submission was received and will be processed shortly.' });
  } catch (error) {
    console.error('Burundi EOI error:', error);
    res.status(500).json({ message: 'Error processing form', error: error.message });
  }
} 