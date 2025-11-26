import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate email format
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // Validate environment variables
  const requiredEnvVars = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_EMAIL",
    "SMTP_PASSWORD",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_KEY",
  ];
  const missingEnvVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingEnvVars.length > 0) {
    console.error(
      `Missing environment variables: ${missingEnvVars.join(", ")}`
    );
    return res.status(500).json({
      message: `Server configuration error: Missing environment variables: ${missingEnvVars.join(", ")}`,
    });
  }

  // Create a transporter using SMTP
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
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

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"PAAN Team" <${process.env.SMTP_EMAIL}>`, // Sender: secretariat@paan.africa
      to: email, // Recipient: User's email
      replyTo: process.env.SMTP_EMAIL, // Reply-To: secretariat@paan.africa
      subject: "Welcome to the PAAN Newsletter!",
      html: `
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
            </td>
          </tr>
          <tr>
            <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
              Welcome to the PAAN Newsletter!
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px;">
              <p style="margin: 0 0 10px; font-size: 16px;">Dear ${name},</p>
              <p style="margin: 0 0 10px; font-size: 16px;">Thank you for subscribing to the Pan-African Agency Network (PAAN) newsletter! You'll receive insights, trend reports, and event invites straight to your inbox.</p>
              <p style="margin: 20px 0 0; font-size: 16px;">Explore more about PAAN:</p>
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
    });

    // Upsert subscription to Supabase to prevent duplicate emails
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .upsert(
        { name, email, created_at: new Date().toISOString() },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Error upserting subscription to Supabase:", error);
      // Not failing the request, as email was sent successfully
    }

    return res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res
      .status(500)
      .json({ message: "Error processing subscription", error: error.message });
  }
}
