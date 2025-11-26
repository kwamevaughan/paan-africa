import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      company,
      role,
      teamSize,
      trainingNeeds,
      message,
      region,
      recaptchaToken,
    } = req.body;

    // Validate required fields
    if (!name || !email || !company || !role || !teamSize || !trainingNeeds || !message || !region || !recaptchaToken) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verify reCAPTCHA token
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      console.error(
        "reCAPTCHA secret key is missing. Please set RECAPTCHA_SECRET_KEY in .env.local"
      );
      return res.status(500).json({ message: "Server configuration error" });
    }

    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return res
        .status(400)
        .json({ message: "reCAPTCHA verification failed. Please try again." });
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content for academy enquiry
    const emailContent = `
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <img src="https://paan.africa/assets/images/paan-academy/logo.svg" alt="PAAN Academy Logo" style="max-width: 200px;" />
          </td>
        </tr>
        <tr>
          <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
            New PAAN Academy Enquiry
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Role:</strong> ${role}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Team Size:</strong> ${teamSize}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Training Needs:</strong> ${trainingNeeds}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Region:</strong> ${region}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Training Requirements:</strong></p>
            <p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${message}</p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;">
            <p style="margin: 0; font-size: 14px;">PAAN Academy - Upskill Your Team</p>
          </td>
        </tr>
      </table>
    `;

    // Send email
    await transporter.sendMail({
      from: `"PAAN Academy" <${process.env.INFO_EMAIL}>`,
      to: process.env.ACADEMY_ENQUIRY_EMAIL || process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `New PAAN Academy Enquiry from ${name}`,
      html: emailContent,
    });

    // Log the enquiry (optional)
    console.log('Academy enquiry received:', {
      name,
      email,
      company,
      role,
      teamSize,
      trainingNeeds,
      region,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ message: 'Academy enquiry sent successfully' });
  } catch (error) {
    console.error('Error sending academy enquiry:', error);
    res.status(500).json({ message: 'Failed to send academy enquiry' });
  }
} 