import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  console.log("Career application API called with method:", req.method);
  
  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    position,
    experience,
    location,
    coverLetter,
    recaptchaToken,
  } = req.body;

  console.log("Received application data:", { firstName, lastName, email, position });

  // Validate required fields
  if (!firstName || !lastName || !email || !position || !experience || !coverLetter || !recaptchaToken) {
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
      // Email to careers@paan.africa (admin)
      transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: "careers@paan.africa",
        subject: `New Career Application: ${position} - ${firstName} ${lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #172840; margin: 0; font-size: 24px;">New Career Application</h1>
                <p style="color: #666; margin: 10px 0 0 0;">Pan African Agency Network (PAAN)</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #172840; margin: 0 0 15px 0; font-size: 18px;">Application Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840; width: 30%;">Name:</td>
                    <td style="padding: 8px 0; color: #333;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Email:</td>
                    <td style="padding: 8px 0; color: #333;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Phone:</td>
                    <td style="padding: 8px 0; color: #333;">${phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Position:</td>
                    <td style="padding: 8px 0; color: #333;">${position}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Experience:</td>
                    <td style="padding: 8px 0; color: #333;">${experience} years</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Location:</td>
                    <td style="padding: 8px 0; color: #333;">${location || 'Not specified'}</td>
                  </tr>
                </table>
              </div>

              ${coverLetter ? `
                <div style="margin-bottom: 25px;">
                  <h3 style="color: #172840; margin: 0 0 15px 0; font-size: 16px;">Cover Letter</h3>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #84C1D9;">
                    <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${coverLetter}</p>
                  </div>
                </div>
              ` : ''}

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; margin: 0; font-size: 14px;">
                  This application was submitted through the PAAN careers page.
                </p>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
                  Submitted on: ${new Date().toLocaleString('en-US', { 
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })}
                </p>
              </div>
            </div>
          </div>
        `,
      }),

      // Confirmation email to applicant
      transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "Application Received - Pan African Agency Network (PAAN)",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="background-color: #34B6A7; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                  <span style="color: white; font-size: 24px; font-weight: bold;">✓</span>
                </div>
                <h1 style="color: #172840; margin: 0; font-size: 24px;">Application Received!</h1>
                <p style="color: #666; margin: 10px 0 0 0;">Thank you for your interest in joining PAAN</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #172840; margin: 0 0 15px 0; font-size: 18px;">Application Summary</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840; width: 30%;">Name:</td>
                    <td style="padding: 8px 0; color: #333;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Position:</td>
                    <td style="padding: 8px 0; color: #333;">${position}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Experience:</td>
                    <td style="padding: 8px 0; color: #333;">${experience} years</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; border-left: 4px solid #84C1D9; margin-bottom: 25px;">
                <h3 style="color: #172840; margin: 0 0 10px 0; font-size: 16px;">What's Next?</h3>
                <ul style="color: #333; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Our HR team will review your application within 5-7 business days</li>
                  <li>If your profile matches our requirements, we'll contact you for the next steps</li>
                  <li>We may reach out for additional information or to schedule an interview</li>
                  <li>Due to the high volume of applications, we may not be able to respond to all candidates</li>
                </ul>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; margin: 0; font-size: 14px;">
                  Thank you for considering PAAN as your next career destination.
                </p>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
                  Best regards,<br>
                  The PAAN Team
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    ]);

    // Store application in Supabase
    const { data: applicationData, error: applicationError } = await supabase
      .from("career_applications")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || null,
          position: position,
          experience: experience,
          location: location || null,
          cover_letter: coverLetter || null,
          submitted_at: new Date().toISOString(),
        },
      ]);

    if (applicationError) {
      console.error("Error storing application in Supabase:", applicationError);
      // Don't fail the request if Supabase storage fails
    }

    // Check if both emails were sent successfully
    if (adminEmailResult.status === "rejected" || userEmailResult.status === "rejected") {
      console.error("Email sending failed:", {
        admin: adminEmailResult.reason,
        user: userEmailResult.reason,
      });
      return res.status(500).json({
        message: "Failed to send application. Please try again later.",
      });
    }

    return res.status(200).json({
      message: "Application submitted successfully!",
    });
  } catch (error) {
    console.error("Error processing career application:", error);
    return res.status(500).json({
      message: "An error occurred while processing your application. Please try again later.",
    });
  }
}
