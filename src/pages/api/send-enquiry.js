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
    region,
    message,
    recaptchaToken,
  } = req.body;

  // Validate required fields
  if (!name || !email || !company || !region || !message || !recaptchaToken) {
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
        from: `"PAAN Enquiry Form" <${process.env.INFO_EMAIL}>`,
        to: process.env.SMTP_EMAIL,
        replyTo: email,
        subject: `New Delivery Partner Enquiry from ${name}`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                New Delivery Partner Enquiry
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Company:</strong> ${company}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Target Region:</strong> ${region}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Project Details:</strong></p>
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
        from: `"PAAN Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.SMTP_EMAIL,
        subject: "Thank You for Your Enquiry - PAAN",
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                Thank You for Your Enquiry!
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;">Dear ${name},</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Thank you for reaching out to the Pan-African Agency Network (PAAN). We have received your enquiry and will connect you with the right partners for your project in ${region}.</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Our team will review your requirements and get back to you within 48 hours with potential partners that match your needs.</p>
                <p style="margin: 20px 0 0; font-size: 16px;">In the meantime, you can explore our network of certified agencies and freelancers:</p>
                <p style="text-align: center; margin: 20px 0;">
                  <a href="https://paan.africa/clients" style="background-color: #F25849; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-size: 14px; font-weight: bold;">Explore Our Network</a>
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

    // Log submission to Supabase
    const { error } = await supabase.from("enquiry_submissions").insert({
      name,
      email,
      company,
      region,
      message,
    });

    if (error) {
      console.error("Error logging submission to Supabase:", error);
      // Note: Not failing the request, as emails were sent successfully
    }

    return res.status(200).json({ message: "Enquiry sent successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error sending enquiry", error: error.message });
  }
} 