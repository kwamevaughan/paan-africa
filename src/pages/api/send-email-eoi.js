import nodemailer from "nodemailer";
import { uploadToGoogleDrive } from '@/utils/googleDrive';
import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Disable Next.js body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log('EOI API endpoint called');

  try {
    console.log('Starting fast form parsing with Busboy...');
    
    const fields = {};
    const files = [];
    
    const busboy = Busboy({ 
      headers: req.headers,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 10, // Max 10 files
        fields: 10 // Max 10 fields
      }
    });

    const parsePromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Form parsing timeout'));
      }, 15000); // 15 second timeout

      busboy.on('field', (name, value) => {
        console.log('Field received:', name, value);
        fields[name] = value;
      });

      busboy.on('file', (name, file, info) => {
        console.log('File received:', name, info.filename);
        const { filename, encoding, mimeType } = info;
        
        // Create temporary file
        const tmpDir = os.tmpdir();
        const tmpFile = path.join(tmpDir, `upload_${Date.now()}_${filename}`);
        
        const writeStream = fs.createWriteStream(tmpFile);
        file.pipe(writeStream);
        
        writeStream.on('finish', () => {
          files.push({
            fieldname: name,
            originalFilename: filename,
            mimetype: mimeType,
            filepath: tmpFile,
            size: fs.statSync(tmpFile).size
          });
        });
      });

      busboy.on('finish', () => {
        clearTimeout(timeout);
        console.log('Busboy parsing completed');
        resolve({ fields, files });
      });

      busboy.on('error', (err) => {
        clearTimeout(timeout);
        console.error('Busboy error:', err);
        reject(err);
      });

      req.pipe(busboy);
    });

    const { fields: parsedFields, files: parsedFiles } = await parsePromise;

    console.log('Fields and files extracted');

    // Extract form fields
    const name = parsedFields.name || '';
    const agencyName = parsedFields.agencyName || '';
    const country = parsedFields.country || '';
    const opportunities = parsedFields.opportunities || '[]';
    const credentials = parsedFields.credentials || '';

    // Handle credentials files
    const credentialsFiles = parsedFiles.filter(file => file.fieldname === 'credentialsFiles');
    const experienceFiles = parsedFiles.filter(file => file.fieldname === 'experience');

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

    // Upload files to Google Drive
    console.log('Starting Google Drive uploads...');
    const uploadedFiles = [];
    
    // Upload credentials files
    for (const file of credentialsFiles) {
      console.log('Uploading credentials file:', file.originalFilename);
      try {
        const uploadedFile = await uploadToGoogleDrive(
          file,
          `credentials_${name}_${file.originalFilename}`
        );
        uploadedFiles.push({
          name: file.originalFilename,
          link: uploadedFile.link,
          type: 'Credentials'
        });
        console.log('Credentials file uploaded successfully:', file.originalFilename);
      } catch (uploadError) {
        console.error('Failed to upload credentials file:', file.originalFilename, uploadError);
        // Continue with other files even if one fails
      }
    }

    // Upload experience files
    for (const file of experienceFiles) {
      console.log('Uploading experience file:', file.originalFilename);
      try {
        const uploadedFile = await uploadToGoogleDrive(
          file,
          `experience_${name}_${file.originalFilename}`
        );
        uploadedFiles.push({
          name: file.originalFilename,
          link: uploadedFile.link,
          type: 'Experience'
        });
        console.log('Experience file uploaded successfully:', file.originalFilename);
      } catch (uploadError) {
        console.error('Failed to upload experience file:', file.originalFilename, uploadError);
        // Continue with other files even if one fails
      }
    }

    console.log('Google Drive uploads completed');
    console.log('Uploaded files:', uploadedFiles);

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
            
            ${uploadedFiles.length > 0 ? `
              <p style="margin: 20px 0 10px; font-size: 16px;"><strong>Uploaded Files:</strong></p>
              <ul style="margin: 0; padding-left: 20px;">
                ${uploadedFiles.map(file => `
                  <li style="margin: 0 0 10px; font-size: 16px;">
                    <strong>${file.type}:</strong> ${file.name}<br>
                    <a href="${file.link}" style="color: #F25849; text-decoration: none;">View File</a>
                  </li>
                `).join('')}
              </ul>
            ` : '<p style="margin: 20px 0 10px; font-size: 16px;"><strong>No files uploaded</strong></p>'}
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
    });

    // Add timeout to email sending
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email sending timeout')), 15000); // 15 second timeout
    });

    await Promise.race([emailPromise, timeoutPromise]);

    console.log('Email sent successfully');
    res.status(200).json({ 
      message: 'Expression of Interest submitted successfully!',
      filesUploaded: uploadedFiles.length
    });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ message: 'Error processing form', error: error.message });
  }
} 