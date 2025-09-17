import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    fullName,
    email,
    phone,
    organization,
    jobTitle,
    country,
    bio,
    sessionTitle,
    sessionType,
    summitTracks,
    sessionDescription,
    keyTakeaways,
    whyThisMatters,
    targetAudience,
    pastTalks,
    specialRequirements,
    recaptchaToken,
  } = req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !organization || !jobTitle || !country || 
      !bio || !sessionTitle || !sessionType || !summitTracks || !sessionDescription || 
      !keyTakeaways || !whyThisMatters || !targetAudience || !recaptchaToken) {
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

  // Validate required environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.error("Missing SMTP configuration");
    return res.status(500).json({ message: "Email service not configured" });
  }

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });


  try {
    // Send both emails concurrently
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      // Email to secretariat@paan.africa (admin)
      transporter.sendMail({
        from: `"PAAN Summit Speaker Application" <${process.env.INFO_EMAIL}>`,
        to: process.env.SMTP_EMAIL,
        replyTo: email,
        subject: `New Speaker Application - ${sessionTitle}`,
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 800px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 15px 20px; color: #ffffff; font-size: 20px; font-weight: bold; text-align: center;">
                New Speaker Application - PAAN Summit 2026
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 30px;">
                <h3 style="color: #172840; margin: 0 0 20px; font-size: 18px;">Personal Information</h3>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Name:</strong> ${fullName}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F25849; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Organization:</strong> ${organization}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Job Title:</strong> ${jobTitle}</p>
                <p style="margin: 0 0 20px; font-size: 16px;"><strong>Country:</strong> ${country}</p>
                
                <h3 style="color: #172840; margin: 20px 0 10px; font-size: 18px;">Bio</h3>
                <p style="margin: 0 0 20px; font-size: 16px; white-space: pre-wrap;">${bio}</p>
                
                <h3 style="color: #172840; margin: 20px 0 10px; font-size: 18px;">Session Information</h3>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Session Title:</strong> ${sessionTitle}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Session Type:</strong> ${sessionType}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Summit Tracks:</strong> ${summitTracks.join(', ')}</p>
                <p style="margin: 0 0 10px; font-size: 16px;"><strong>Target Audience:</strong> ${targetAudience.join(', ')}</p>
                
                <h3 style="color: #172840; margin: 20px 0 10px; font-size: 18px;">Session Description</h3>
                <p style="margin: 0 0 20px; font-size: 16px; white-space: pre-wrap;">${sessionDescription}</p>
                
                <h3 style="color: #172840; margin: 20px 0 10px; font-size: 18px;">Key Takeaways</h3>
                <p style="margin: 0 0 20px; font-size: 16px; white-space: pre-wrap;">${keyTakeaways}</p>
                
                <h3 style="color: #172840; margin: 20px 0 10px; font-size: 18px;">Why This Session Matters</h3>
                <p style="margin: 0 0 20px; font-size: 16px; white-space: pre-wrap;">${whyThisMatters}</p>
                
                ${pastTalks ? `
                <h3 style="color: #172840; margin: 20px 0 10px; font-size: 18px;">Past Talks/Content</h3>
                <p style="margin: 0 0 20px; font-size: 16px;"><a href="${pastTalks}" style="color: #F25849; text-decoration: none;">${pastTalks}</a></p>
                ` : ''}
                
                ${specialRequirements ? `
                <h3 style="color: #172840; margin: 20px 0 10px; font-size: 18px;">Special Requirements</h3>
                <p style="margin: 0 0 20px; font-size: 16px; white-space: pre-wrap;">${specialRequirements}</p>
                ` : ''}
              </td>
            </tr>
            <tr>
              <td style="background-color: #172840; padding: 15px 20px; color: #ffffff; text-align: center;">
                <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
                <p style="margin: 5px 0 0; font-size: 12px;">© ${new Date().getFullYear()} PAAN. All rights reserved.</p>
              </td>
            </tr>
          </table>
        `,
      }),
      // Confirmation email to the speaker
      transporter.sendMail({
        from: `"PAAN Summit Team" <${process.env.SMTP_EMAIL}>`,
        to: email,
        replyTo: process.env.SMTP_EMAIL,
        subject: "Thank You for Your Speaker Application - PAAN Summit 2026",
        html: `
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: Arial, sans-serif; color: #172840;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <img src="https://paan.africa/assets/images/logo.png" alt="PAAN Logo" style="max-width: 200px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color: #F25849; padding: 15px 20px; color: #ffffff; font-size: 20px; font-weight: bold; text-align: center;">
                Thank You for Your Speaker Application!
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 30px;">
                <p style="margin: 0 0 15px; font-size: 16px;">Dear ${fullName},</p>
                <p style="margin: 0 0 15px; font-size: 16px;">Thank you for your interest in speaking at the Africa Borderless Creative Economy Summit 2026. We have received your speaker application and are excited about your proposed session: <strong>"${sessionTitle}"</strong>.</p>
                <p style="margin: 0 0 15px; font-size: 16px;">Our speaker selection committee will carefully review all applications and evaluate them based on:</p>
                <ul style="margin: 0 0 15px; padding-left: 20px;">
                  <li style="margin: 0 0 5px; font-size: 16px;">Relevance to Africa's creative and digital economies</li>
                  <li style="margin: 0 0 5px; font-size: 16px;">Practical value and actionable insights</li>
                  <li style="margin: 0 0 5px; font-size: 16px;">Speaker expertise and experience</li>
                  <li style="margin: 0 0 5px; font-size: 16px;">Alignment with summit tracks and target audience</li>
                </ul>
                <p style="margin: 0 0 15px; font-size: 16px;">We will review all applications and get back to you within 2-3 weeks with our decision. Selected speakers will receive detailed information about logistics, preparation, and next steps.</p>
                <p style="margin: 0 0 15px; font-size: 16px;">In the meantime, you can learn more about the summit and stay updated:</p>
                <p style="text-align: center; margin: 20px 0;">
                  <a href="https://paan.africa/summit" style="background-color: #F25849; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-size: 14px; font-weight: bold;">Learn More About the Summit</a>
                </p>
                <p style="margin: 20px 0 0; font-size: 16px;">We look forward to potentially having you as part of this groundbreaking event!</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #172840; padding: 15px 20px; color: #ffffff; text-align: center;">
                <p style="margin: 0; font-size: 14px;">Pan-African Agency Network (PAAN)</p>
                <p style="margin: 5px 0 0; font-size: 12px;">© ${new Date().getFullYear()} PAAN. All rights reserved.</p>
              </td>
            </tr>
          </table>
        `,
      }),
    ]);

    // Check if either email failed but don't throw error - just log it
    if (adminEmailResult.status === "rejected") {
      console.error("Failed to send admin email:", adminEmailResult.reason);
    }
    if (userEmailResult.status === "rejected") {
      console.error("Failed to send speaker confirmation email:", userEmailResult.reason);
    }
    
    // Log email results for debugging
    console.log("Admin email result:", adminEmailResult.status);
    console.log("User email result:", userEmailResult.status);
    
    // Determine response based on email success
    const emailSuccess = adminEmailResult.status === "fulfilled" || userEmailResult.status === "fulfilled";
    
    // Debug: Log the email results
    console.log("Debug - emailSuccess:", emailSuccess);
    console.log("Debug - adminEmailResult:", adminEmailResult.status);
    console.log("Debug - userEmailResult:", userEmailResult.status);
    
    if (emailSuccess) {
      return res.status(200).json({ 
        message: "Speaker application submitted successfully. You will receive a confirmation email shortly.",
        status: "success"
      });
    } else {
      return res.status(500).json({ 
        message: "Unable to process your application at this time. Please try again or contact us directly.",
        status: "failed",
        contact: "speakers@paan.africa"
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error submitting speaker application", error: error.message });
  }
}
