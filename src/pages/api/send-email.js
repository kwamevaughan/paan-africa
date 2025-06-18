import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { uploadToGoogleDrive } from '@/utils/googleDrive';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      name,
      agencyName,
      country,
      opportunities,
      credentials,
      credentialsFiles,
      experience
    } = req.body;

    // Parse opportunities if it's a string
    const parsedOpportunities = typeof opportunities === 'string' 
      ? JSON.parse(opportunities) 
      : opportunities || [];

    // Upload files to Google Drive
    const uploadedFiles = [];
    
    // Upload credentials files
    if (credentialsFiles && credentialsFiles.length > 0) {
      for (const file of credentialsFiles) {
        const uploadedFile = await uploadToGoogleDrive(
          file,
          `credentials_${name}_${file.name}`
        );
        uploadedFiles.push({
          name: file.name,
          link: uploadedFile.link,
          type: 'Credentials'
        });
      }
    }

    // Upload experience file
    if (experience) {
      const uploadedFile = await uploadToGoogleDrive(
        experience,
        `experience_${name}_${experience.name}`
      );
      uploadedFiles.push({
        name: experience.name,
        link: uploadedFile.link,
        type: 'Experience'
      });
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
      tls: {
        rejectUnauthorized: false
      }
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
            ` : ''}
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
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Expression of Interest from ${agencyName}`,
      html: emailContent,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}
