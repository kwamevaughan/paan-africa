import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    email,
    company,
    phone,
    agencySize,
    interest,
    message,
    region,
    recaptchaToken,
  } = req.body;

  // Validate required fields
  if (!name || !email || !company || !phone || !agencySize || !interest || !message || !region || !recaptchaToken) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
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



  try {
    // Send both emails concurrently
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      // Email to admin (M&A team)
      transporter.sendMail({
        from: `"PAAN M&A Program" <${process.env.INFO_EMAIL}>`,
        to: process.env.MA_NOTIFICATION_EMAIL || process.env.SMTP_EMAIL,
        replyTo: email,
        subject: `New M&A Consultation Request from ${name}`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                New M&A Consultation Request
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Company:</strong> ${company}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Agency Size:</strong> ${agencySize}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Primary Interest:</strong> ${interest}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Operating Region:</strong> ${region}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Goals & Timeline:</strong></p>
                <p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${message}</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;">
                <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
                <p style="margin: 5px 0 0; font-size: 12px;">© ${new Date().getFullYear()} PAAN. All rights reserved.</p>
              </td>
            </tr>
          </table>
        `,
      }),
      // Confirmation email to the user
      transporter.sendMail({
        from: `"PAAN M&A Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.MA_NOTIFICATION_EMAIL || process.env.SMTP_EMAIL,
        subject: "M&A Consultation Request Received - PAAN",
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                Thank You for Your M&A Consultation Request!
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;">Dear ${name},</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Thank you for reaching out to the PAAN M&A Program. We have received your consultation request and our team will be in touch within 24-48 hours to schedule your confidential consultation.</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Your Details:</strong></p>
                <ul style="margin: 0 0 10px; padding-left: 20px; font-size: 16px;">
                  <li><strong>Company:</strong> ${company}</li>
                  <li><strong>Agency Size:</strong> ${agencySize}</li>
                  <li><strong>Primary Interest:</strong> ${interest}</li>
                  <li><strong>Operating Region:</strong> ${region}</li>
                </ul>
                <p style="margin: 20px 0 0; font-size: 16px;">Our M&A experts will review your goals and prepare a personalized consultation to help you navigate your strategic options in Africa's creative economy.</p>
                <p style="margin: 20px 0 0; font-size: 16px;">In the meantime, you can learn more about our M&A program:</p>
                <p style="text-align: center; margin: 20px 0;">
                  <a href="https://paan.africa/paan-ma-program" style="background-color: #F25849; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-size: 14px; font-weight: bold;">Learn More About M&A</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #172840; padding: 10px 20px; color: #ffffff; text-align: center;">
                <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
                <p style="margin: 5px 0 0; font-size: 12px;">© ${new Date().getFullYear()} PAAN. All rights reserved.</p>
              </td>
            </tr>
          </table>
        `,
      }),
    ]);

    // Check if either email failed
    if (adminEmailResult.status === "rejected") {
      console.error("Failed to send admin email:", adminEmailResult.reason);
    }
    if (userEmailResult.status === "rejected") {
      console.error("Failed to send user confirmation email:", userEmailResult.reason);
    }
    if (adminEmailResult.status === "rejected" || userEmailResult.status === "rejected") {
      throw new Error("One or both emails failed to send");
    }

    return res.status(200).json({ message: "Consultation request submitted successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error sending consultation request", error: error.message });
  }
}
