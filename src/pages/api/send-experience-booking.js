import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    experience,
    experienceId,
    name,
    email,
    phone,
    numberOfGuests,
    preferredDate,
    preferredTime,
    specialRequests,
    hotel,
    dietaryRequirements,
    recaptchaToken,
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !preferredDate || !recaptchaToken || !experience) {
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

  // Initialize Supabase client (only if env vars are available)
  let supabase = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }

  try {
    // Send both emails concurrently
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      // Email to travel@paan.africa (admin)
      transporter.sendMail({
        from: `"PAAN Summit Experiences" <${process.env.INFO_EMAIL}>`,
        to: process.env.SMTP_EMAIL,
        replyTo: email,
        subject: `New Experience Booking Request: ${experience}`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                New Experience Booking Request
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Experience:</strong> ${experience}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Experience ID:</strong> ${experienceId || 'N/A'}</p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Guest Information:</strong></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #F25849; text-decoration: none;">${phone}</a></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Number of Guests:</strong> ${numberOfGuests || 1}</p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Booking Details:</strong></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Preferred Date:</strong> ${preferredDate}</p>
                ${preferredTime ? `<p style="margin: 0 0 10px; font-size: 16px;"><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
                ${hotel ? `<p style="margin: 0 0 10px; font-size: 16px;"><strong>Hotel/Accommodation:</strong> ${hotel}</p>` : ''}
                ${dietaryRequirements ? `<p style="margin: 0 0 10px; font-size: 16px;"><strong>Dietary Requirements:</strong> ${dietaryRequirements}</p>` : ''}
                ${specialRequests ? `<p style="margin: 0 0 10px; font-size: 16px;"><strong>Special Requests:</strong></p><p style="margin: 0 0 10px; font-size: 16px; white-space: pre-wrap;">${specialRequests}</p>` : ''}
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
        from: `"PAAN Travel Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.SMTP_EMAIL,
        subject: `Booking Request Received: ${experience} - PAAN Summit 2026`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                Booking Request Received!
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;">Dear ${name},</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Thank you for your interest in booking <strong>${experience}</strong> for the PAAN Summit 2026 in Nairobi.</p>
                <p style="margin: 0 0 10px; font-size: 16px;">We have received your booking request and will review it within 24 hours. Our travel team will contact you at ${email} or ${phone} to confirm availability and provide payment instructions.</p>
                <div style="background-color: #DAECF3; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 0 0 5px; font-size: 14px; font-weight: bold;">Booking Summary:</p>
                  <p style="margin: 0 0 5px; font-size: 14px;">Experience: ${experience}</p>
                  <p style="margin: 0 0 5px; font-size: 14px;">Number of Guests: ${numberOfGuests || 1}</p>
                  <p style="margin: 0 0 5px; font-size: 14px;">Preferred Date: ${preferredDate}</p>
                  ${preferredTime ? `<p style="margin: 0 0 5px; font-size: 14px;">Preferred Time: ${preferredTime}</p>` : ''}
                </div>
                <p style="margin: 20px 0 0; font-size: 16px;">If you have any questions or need to make changes to your booking, please contact us at <a href="mailto:travel@paan.africa" style="color: #F25849; text-decoration: none;">travel@paan.africa</a>.</p>
                <p style="margin: 20px 0 0; font-size: 16px;">We look forward to providing you with an unforgettable experience in Nairobi!</p>
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

    // Log submission to Supabase (if table exists and client is available)
    if (supabase) {
      try {
        const { error } = await supabase.from("experience_bookings").insert({
          experience,
          experience_id: experienceId,
          name,
          email,
          phone,
          number_of_guests: numberOfGuests || 1,
          preferred_date: preferredDate,
          preferred_time: preferredTime || null,
          special_requests: specialRequests || null,
          hotel: hotel || null,
          dietary_requirements: dietaryRequirements || null,
        });

        if (error) {
          console.error("Error logging submission to Supabase:", error);
          // Note: Not failing the request, as emails were sent successfully
        }
      } catch (supabaseError) {
        console.error("Supabase error (non-critical):", supabaseError);
        // Continue even if Supabase fails
      }
    }

    return res.status(200).json({ message: "Booking request sent successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error sending booking request", error: error.message });
  }
}

