import nodemailer from "nodemailer";
import fs from 'fs';
import os from 'os';
import formidable from 'formidable';

// Disable Next.js body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('EOI API endpoint called - Method:', req.method);
  

  console.log('EOI API endpoint called');

  try {
    console.log('Starting form parsing with formidable...');
    
    const fields = {};
    const files = [];
    
    // Parse form data using formidable
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

    console.log('Fields and files extracted');

    // Extract form fields
    const name = formFields.name || '';
    const agencyName = formFields.agencyName || '';
    const country = formFields.country || '';
    const opportunities = formFields.opportunities || '[]';
    const credentials = formFields.credentials || '';

    // Handle credentials files
    const credentialsFiles = Array.isArray(formFiles.credentialsFiles) 
      ? formFiles.credentialsFiles 
      : formFiles.credentialsFiles ? [formFiles.credentialsFiles] : [];
    
    const experienceFiles = Array.isArray(formFiles.experience) 
      ? formFiles.experience 
      : formFiles.experience ? [formFiles.experience] : [];

    // Debug: Log all parsed files
    console.log('🔍 All parsed files:', [...credentialsFiles, ...experienceFiles].map(file => ({
      fieldname: file.fieldName,
      originalFilename: file.originalFilename,
      size: file.size
    })));

    // Console log all the values
    console.log('=== FORM DATA RECEIVED ===');
    console.log('Name:', name);
    console.log('Agency Name:', agencyName);
    console.log('Country:', country);
    console.log('Opportunities:', opportunities);
    console.log('Credentials:', credentials);
    console.log('Credentials Files Count:', credentialsFiles.length);
    console.log('Experience Files Count:', experienceFiles.length);
    console.log('========================');

    // Parse opportunities if it's a string
    const parsedOpportunities = typeof opportunities === 'string' 
      ? JSON.parse(opportunities) 
      : opportunities || [];

    console.log('Parsed Opportunities:', parsedOpportunities);

    // Prepare attachments for nodemailer
    const attachments = [];
    for (const file of [...credentialsFiles, ...experienceFiles]) {
      attachments.push({
        filename: file.originalFilename || 'file',
        path: file.filepath,
        contentType: file.mimetype
      });
    }

    // Create email transporter
    console.log('Creating email transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      // Add timeout settings
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,   // 10 seconds
      socketTimeout: 10000,     // 10 seconds
    });

    console.log('Email transporter created');
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.EMAIL_SECURE,
      user: process.env.SMTP_EMAIL ? '***' : 'NOT SET',
      pass: process.env.SMTP_PASSWORD ? '***' : 'NOT SET'
    });

    // Format the email content
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
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Agency Name:</strong> ${agencyName}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Country:</strong> ${country}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Selected Opportunities:</strong> ${parsedOpportunities.join(', ')}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Credentials:</strong></p>
            <p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${credentials}</p>
            <p style="margin: 20px 0 10px; font-size: 16px;"><strong>Uploaded Files:</strong> See attached files.</p>
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

    console.log('Sending email...');
    console.log('Email details:', {
      from: `"PAAN Expression of Interest" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      cc: 'norah@paan.africa',
      subject: `New Expression of Interest from ${agencyName}`
    });

    // Send the email with timeout
    const emailPromise = transporter.sendMail({
      from: `"PAAN Expression of Interest" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      cc: 'norah@paan.africa',
      subject: `New Expression of Interest from ${agencyName}`,
      html: emailContent,
      attachments: attachments
    });

    // Add timeout to email sending
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email sending timeout')), 15000); // 15 second timeout
    });

    await Promise.race([emailPromise, timeoutPromise]);

    // Clean up temp files
    for (const file of [...credentialsFiles, ...experienceFiles]) {
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {
        console.error('Failed to delete temp file:', file.filepath, err);
      }
    }

    console.log('Email sent successfully');
    res.status(200).json({ 
      message: 'Expression of Interest submitted successfully!',
      name,
      agencyName,
      country,
    });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ message: 'Error processing form', error: error.message });
  }
} 