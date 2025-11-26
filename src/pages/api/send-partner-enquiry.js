import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    email,
    company,
    phone,
    partnershipType,
    message,
    region,
    website,
    recaptchaToken,
  } = req.body;

  // Validate required fields
  if (!name || !email || !company || !phone || !partnershipType || !message || !region || !recaptchaToken) {
    return res.status(400).json({ message: "Missing required fields" });
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

  // Initialize Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    // Send both emails concurrently
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      // Email to secretariat@paan.africa (admin)
      transporter.sendMail({
        from: `"PAAN Summit Partnership Enquiry" <${process.env.INFO_EMAIL}>`,
        to: process.env.SMTP_EMAIL,
        replyTo: email,
        subject: `New Partnership Enquiry for PAAN Summit 2026 - ${partnershipType}`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                New Partnership Enquiry - PAAN Summit 2026
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Contact Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Company:</strong> ${company}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Partnership Type:</strong> ${partnershipType}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Target Region:</strong> ${region}</p>
                ${website ? `<p style="margin: 0 0 10px; font-size: 16px;"><strong>Website:</strong> <a href="${website}" style="color: #F25849; text-decoration: none;">${website}</a></p>` : ''}
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Partnership Proposal:</strong></p>
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
      // Confirmation email to the partner
      transporter.sendMail({
        from: `"PAAN Summit Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.SMTP_EMAIL,
        subject: "Thank You for Your Partnership Interest - PAAN Summit 2026",
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                Thank You for Your Partnership Interest!
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;">Dear ${name},</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Thank you for your interest in partnering with us for the PAAN Summit 2026 - Africa's Borderless Creative Economy Summit. We have received your partnership proposal and are excited about the potential collaboration.</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Our partnership team will review your proposal within 48 hours and get back to you with detailed information about partnership opportunities, benefits, and next steps.</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Partnership Details:</strong></p>
                <ul style="margin: 0 0 10px; padding-left: 20px;">
                  <li style="margin: 0 0 5px; font-size: 16px;">Partnership Type: ${partnershipType}</li>
                  <li style="margin: 0 0 5px; font-size: 16px;">Target Region: ${region}</li>
                  <li style="margin: 0 0 5px; font-size: 16px;">Company: ${company}</li>
                </ul>
                <p style="margin: 20px 0 0; font-size: 16px;">In the meantime, you can learn more about the summit and our partnership opportunities:</p>
                <p style="text-align: center; margin: 20px 0;">
                  <a href="https://paan.africa/summit" style="background-color: #F25849; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-size: 14px; font-weight: bold;">Learn More About the Summit</a>
                </p>
                <p style="margin: 20px 0 0; font-size: 16px;">We look forward to potentially working together to make the PAAN Summit 2026 a success!</p>
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
      console.error("Failed to send partner confirmation email:", userEmailResult.reason);
    }
    if (adminEmailResult.status === "rejected" || userEmailResult.status === "rejected") {
      throw new Error("One or both emails failed to send");
    }

    // Log submission to Supabase
    const { error } = await supabase.from("partner_enquiries").insert({
      name,
      email,
      company,
      phone,
      partnership_type: partnershipType,
      message,
      region,
      website: website || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error logging submission to Supabase:", error);
      // Note: Not failing the request, as emails were sent successfully
    }

    return res.status(200).json({ message: "Partnership enquiry sent successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error sending partnership enquiry", error: error.message });
  }
}
