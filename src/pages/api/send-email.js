import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    firstName,
    secondName,
    email,
    phone,
    organization,
    message,
    recaptchaToken,
  } = req.body;

  // Validate required fields
  if (!firstName || !secondName || !email || !message || !recaptchaToken) {
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
        from: `"PAAN Contact Form" <${process.env.INFO_EMAIL}>`, // Sender: info@paan.africa
        to: process.env.SMTP_EMAIL, // Recipient: secretariat@paan.africa
        replyTo: email, // Reply-To: User's email
        subject: `New Contact Form Submission from ${firstName} ${secondName}`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                New Contact Form Submission
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>First Name:</strong> ${firstName}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Second Name:</strong> ${secondName}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Organization:</strong> ${organization || "Not provided"}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Message:</strong> ${message}</p>
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
        from: `"PAAN Team" <${process.env.SMTP_EMAIL}>`, // Sender: secretariat@paan.africa
        to: email, // Recipient: User's email
        replyTo: process.env.SMTP_EMAIL, // Reply-To: secretariat@paan.africa
        subject: "Thank You for Contacting PAAN",
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                Thank You for Reaching Out!
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;">Dear ${firstName} ${secondName},</p>
                <p style="margin: 0 0 10px; font-size: 16px;">We have received your message and will get back to you soon. Thank you for contacting the Pan-African Agency Network (PAAN).</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Your Message:</strong> ${message}</p>
                <p style="margin: 20px 0 0; font-size: 16px;">In the meantime, explore more about how PAAN is redefining Africa’s creative and tech footprint:</p>
                <p style="text-align: center; margin: 20px 0;">
                  <a href="https://paan.africa/#join-network" style="background-color: #F25849; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 25px; font-size: 14px; font-weight: bold;">Join the Network</a>
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
      console.error(
        "Failed to send user confirmation email:",
        userEmailResult.reason
      );
    }
    if (
      adminEmailResult.status === "rejected" ||
      userEmailResult.status === "rejected"
    ) {
      throw new Error("One or both emails failed to send");
    }

    // Log submission to Supabase
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: firstName,
      second_name: secondName,
      email,
      phone: phone || null,
      organization: organization || null,
      message,
    });

    if (error) {
      console.error("Error logging submission to Supabase:", error);
      // Note: Not failing the request, as emails were sent successfully
    }

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
}
