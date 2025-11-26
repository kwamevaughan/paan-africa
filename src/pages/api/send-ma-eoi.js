import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const {
      fullName,
      agencyName,
      role,
      email,
      phone,
      opportunityTypes,
      timeline,
      goals,
      targets,
      confidentialCall,
    } = req.body;

    // Basic validation
    if (!fullName || !agencyName || !role || !email || !opportunityTypes || !timeline || !confidentialCall) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // Setup nodemailer transporter
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
            New Confidential M&A EOI Submission
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Full Name:</strong> ${fullName}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Agency Name:</strong> ${agencyName}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Role at the Agency:</strong> ${role}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Phone Number:</strong> ${phone || "-"}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Opportunity Types:</strong> ${Array.isArray(opportunityTypes) ? opportunityTypes.join(", ") : opportunityTypes}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Ideal Timeline:</strong> ${timeline}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Primary Goals:</strong><br/>${goals || "-"}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Target Regions/Types/Capabilities:</strong><br/>${targets || "-"}</p>
            <p style="margin: 0 0 10px; font-size: 16px;"><strong>Wants Confidential Call:</strong> ${confidentialCall}</p>
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
            Thank You for Your Confidential EOI!
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="margin: 0 0 10px; font-size: 16px;">Dear ${fullName},</p>
            <p style="margin: 0 0 10px; font-size: 16px;">Thank you for submitting your confidential Expression of Interest regarding M&A opportunities with PAAN. Our team will review your submission and reach out to you soon.</p>
            <p style="margin: 0 0 10px; font-size: 16px;">If you requested a confidential call, Agency Futures will be in touch to schedule a conversation.</p>
            <p style="margin: 20px 0 0; font-size: 16px;">If you have any questions, feel free to reply to this email.</p>
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

    // Send both emails concurrently
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      transporter.sendMail({
        from: `"PAAN M&A EOI" <${process.env.INFO_EMAIL || process.env.SMTP_EMAIL}>`,
        to: process.env.SMTP_EMAIL,
        replyTo: email,
        subject: `New Confidential M&A EOI from ${fullName}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"PAAN Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.SMTP_EMAIL,
        subject: "Thank You for Your Confidential EOI - PAAN",
        html: userHtml,
      }),
    ]);

    if (adminEmailResult.status === "rejected") {
      console.error("Failed to send admin email:", adminEmailResult.reason);
    }
    if (userEmailResult.status === "rejected") {
      console.error("Failed to send user confirmation email:", userEmailResult.reason);
    }
    if (adminEmailResult.status === "rejected" || userEmailResult.status === "rejected") {
      throw new Error("One or both emails failed to send");
    }

    return res.status(200).json({ message: 'Confidential EOI received and emails sent.' });
  } catch (error) {
    console.error('Error processing M&A EOI:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
} 