import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    experience,
    experienceId,
    category,
    name,
    email,
    phone,
    numberOfGuests,
    preferredDate,
    preferredTime,
    specialRequests,
    hotel,
    dietaryRequirements,
    pricePerPerson,
    currency,
    totalAmount,
    recaptchaToken,
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !preferredDate || !recaptchaToken || !experience || !experienceId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Verify reCAPTCHA token
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    console.error("reCAPTCHA secret key is missing");
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

  // Initialize Supabase client
  let supabase = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }

  try {
    // Create booking in database
    let bookingId = null;
    
    if (!supabase) {
      console.error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
      return res.status(500).json({ 
        message: "Database not configured. Please contact support.",
        error: "Supabase client not initialized"
      });
    }

    // Attempt to create booking in database
    console.log("Attempting to create booking in database...");
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "Configured" : "Missing");
    console.log("Supabase Service Key:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Configured" : "Missing");
    console.log("Booking data:", {
      experience_id: experienceId,
      customer_email: email,
      number_of_guests: numberOfGuests,
      total_amount: totalAmount,
      preferred_date: preferredDate
    });

    const { data: booking, error: bookingError } = await supabase
      .from("experience_bookings")
      .insert({
        experience_id: experienceId,
        experience_title: experience,
        category: category || null,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        number_of_guests: numberOfGuests || 1,
        preferred_date: preferredDate,
        preferred_time: preferredTime || null,
        hotel: hotel || null,
        dietary_requirements: dietaryRequirements || null,
        special_requests: specialRequests || null,
        price_per_person: pricePerPerson,
        currency: currency || 'USD',
        total_amount: totalAmount,
        payment_status: 'pending',
        booking_status: 'pending',
        metadata: {
          user_agent: req.headers['user-agent'],
          ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        }
      })
      .select('id')
      .single();

    if (bookingError) {
      console.error("Error creating booking in Supabase:", bookingError);
      console.error("Booking error code:", bookingError.code);
      console.error("Booking error message:", bookingError.message);
      console.error("Booking error details:", JSON.stringify(bookingError, null, 2));
      
      // Return error to client instead of silently failing
      return res.status(500).json({ 
        message: "Failed to save booking to database. Please try again or contact support.",
        error: bookingError.message,
        errorCode: bookingError.code,
        details: bookingError
      });
    }

    if (!booking || !booking.id) {
      console.error("Booking created but no ID returned");
      return res.status(500).json({ 
        message: "Booking created but failed to retrieve booking ID. Please contact support.",
        error: "No booking ID returned"
      });
    }

    bookingId = booking.id;
    console.log("✅ Booking created successfully in database:", bookingId);

    // Send confirmation email
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
      await transporter.sendMail({
        from: `"PAAN Travel Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.SMTP_EMAIL,
        subject: `Booking Created: ${experience} - PAAN Summit 2026`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 10px 20px; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center;">
                Booking Created Successfully!
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="margin: 0 0 10px; font-size: 16px;">Dear ${name},</p>
                <p style="margin: 0 0 10px; font-size: 16px;">Your booking for <strong>${experience}</strong> has been created successfully.</p>
                <div style="background-color: #DAECF3; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 0 0 5px; font-size: 14px; font-weight: bold;">Booking Details:</p>
                  <p style="margin: 0 0 5px; font-size: 14px;">Booking ID: ${bookingId}</p>
                  <p style="margin: 0 0 5px; font-size: 14px;">Number of Guests: ${numberOfGuests || 1}</p>
                  <p style="margin: 0 0 5px; font-size: 14px;">Preferred Date: ${preferredDate}</p>
                  <p style="margin: 0 0 5px; font-size: 14px;">Total Amount: ${currency} ${totalAmount.toLocaleString()}</p>
                </div>
                <p style="margin: 20px 0 0; font-size: 16px;">Please proceed to payment to confirm your booking.</p>
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
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't fail the request if email fails
    }

    return res.status(200).json({ 
      message: "Booking created successfully",
      bookingId: bookingId
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error creating booking", error: error.message });
  }
}

