import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      position,
      country,
      city,
      experience,
      motivation,
      network,
      expectations
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !position || !country || !city || !experience || !motivation || !network || !expectations) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Use TLS
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to PAAN team (admin notification)
    const adminEmailHtml = `
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <img src="https://www.paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
          </td>
        </tr>
        <tr>
          <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
            New PAAN Ambassador Application
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <h3 style="color: #172840; margin: 0 0 15px;">Personal Information</h3>
            <p style="margin: 0 0 8px; font-size: 16px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin: 0 0 8px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 8px; font-size: 16px;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
            
            <h3 style="color: #172840; margin: 20px 0 15px;">Professional Information</h3>
            <p style="margin: 0 0 8px; font-size: 16px;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 0 0 8px; font-size: 16px;"><strong>Position:</strong> ${position}</p>
            <p style="margin: 0 0 8px; font-size: 16px;"><strong>Location:</strong> ${city}, ${country}</p>
            <p style="margin: 0 0 8px; font-size: 16px;"><strong>Experience:</strong> ${experience} years</p>
            
            <h3 style="color: #172840; margin: 20px 0 15px;">Motivation</h3>
            <p style="margin: 0 0 8px; font-size: 16px; line-height: 1.5;">${motivation}</p>
            
            <h3 style="color: #172840; margin: 20px 0 15px;">Professional Network & Influence</h3>
            <p style="margin: 0 0 8px; font-size: 16px; line-height: 1.5;">${network}</p>
            
            <h3 style="color: #172840; margin: 20px 0 15px;">Goals as Ambassador</h3>
            <p style="margin: 0 0 8px; font-size: 16px; line-height: 1.5;">${expectations}</p>
            
            <p style="margin: 20px 0 0; font-size: 14px; color: #666;"><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
            <p style="margin: 5px 0 0; font-size: 12px;">&copy; ${new Date().getFullYear()} PAAN. All rights reserved.</p>
          </td>
        </tr>
      </table>
    `;

    await transporter.sendMail({
      from: `"PAAN Ambassador Program" <${process.env.INFO_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // secretariat@paan.africa
      replyTo: email,
      subject: `New PAAN Ambassador Application - ${firstName} ${lastName}`,
      html: adminEmailHtml,
    });

    // Confirmation email to applicant
    const confirmationEmailHtml = `
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <img src="https://www.paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
          </td>
        </tr>
        <tr>
          <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
            Application Received - PAAN Ambassador Program
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="margin: 0 0 15px; font-size: 16px;">Dear ${firstName},</p>
            
            <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.5;">
              Thank you for your interest in becoming a PAAN Ambassador! We have received your application and our team will review it carefully.
            </p>
            
            <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.5;">
              <strong>What happens next?</strong><br>
              • Our team will review your application within 48 hours<br>
              • You'll receive a detailed response with next steps<br>
              • If approved, you'll receive your Welcome Kit and onboarding details
            </p>
            
            <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.5;">
              In the meantime, if you have any questions, please don't hesitate to reach out to us at 
              <a href="mailto:secretariat@paan.africa" style="color: #F25849; text-decoration: none;">secretariat@paan.africa</a>
            </p>
            
            <div style="background-color: #e8f4fd; border-left: 4px solid #F25849; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #172840;">
                <strong>Application Details:</strong><br>
                Name: ${firstName} ${lastName}<br>
                Company: ${company}<br>
                Location: ${city}, ${country}<br>
                Experience: ${experience} years
              </p>
            </div>
            
            <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.5;">
              We're excited about the possibility of having you join our network of Africa's most influential creative leaders!
            </p>
            
            <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.5;">
              Best regards,<br>
              <strong>The PAAN Team</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
            <p style="margin: 5px 0 0; font-size: 12px;">&copy; ${new Date().getFullYear()} PAAN. All rights reserved.</p>
          </td>
        </tr>
      </table>
    `;

    await transporter.sendMail({
      from: `"PAAN Team" <${process.env.SMTP_EMAIL}>`,
      to: email,
      replyTo: process.env.SMTP_EMAIL,
      subject: "PAAN Ambassador Application Received",
      html: confirmationEmailHtml,
    });

    return res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error processing ambassador application:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
} 