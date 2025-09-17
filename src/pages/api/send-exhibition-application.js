import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    companyName,
    contactPerson,
    email,
    phone,
    website,
    country,
    industry,
    companySize,
    boothSize,
    exhibitionGoals,
    previousExhibitions,
    specialRequirements,
    budget,
    marketingMaterials,
    demoEquipment,
    recaptchaToken,
  } = req.body;

  // Validate required fields
  if (!companyName || !contactPerson || !email || !phone || !country || !industry || !companySize || !boothSize || !exhibitionGoals) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Verify reCAPTCHA
  if (!recaptchaToken) {
    return res.status(400).json({ message: "reCAPTCHA verification required" });
  }

  try {
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      {
        method: "POST",
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
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

    // Email content for admin
    const adminEmailContent = `
      <h2>New Exhibition Application - PAAN Summit 2026</h2>
      
      <h3>Company Information:</h3>
      <ul>
        <li><strong>Company Name:</strong> ${companyName}</li>
        <li><strong>Contact Person:</strong> ${contactPerson}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Website:</strong> ${website || 'Not provided'}</li>
        <li><strong>Country:</strong> ${country}</li>
        <li><strong>Industry:</strong> ${industry}</li>
        <li><strong>Company Size:</strong> ${companySize}</li>
      </ul>

      <h3>Exhibition Details:</h3>
      <ul>
        <li><strong>Preferred Booth Size:</strong> ${boothSize}</li>
        <li><strong>Budget Range:</strong> ${budget || 'Not specified'}</li>
        <li><strong>Exhibition Goals:</strong> ${exhibitionGoals}</li>
        <li><strong>Previous Exhibitions:</strong> ${previousExhibitions || 'None mentioned'}</li>
        <li><strong>Marketing Materials:</strong> ${marketingMaterials || 'Not specified'}</li>
        <li><strong>Special Requirements:</strong> ${specialRequirements || 'None'}</li>
      </ul>

      <p><strong>Application Date:</strong> ${new Date().toLocaleString()}</p>
      
      <p>Please review this application and contact the applicant to discuss next steps.</p>
    `;

    // Email content for applicant
    const applicantEmailContent = `
      <h2>Exhibition Application Received - PAAN Summit 2026</h2>
      
      <p>Dear ${contactPerson},</p>
      
      <p>Thank you for your interest in exhibiting at the Africa Borderless Creative Economy Summit 2026!</p>
      
      <p>We have received your exhibition application for <strong>${companyName}</strong> and our team will review it carefully.</p>
      
      <h3>Application Summary:</h3>
      <ul>
        <li><strong>Company:</strong> ${companyName}</li>
        <li><strong>Preferred Booth Size:</strong> ${boothSize}</li>
        <li><strong>Industry:</strong> ${industry}</li>
        <li><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</li>
      </ul>
      
      <h3>What happens next?</h3>
      <ul>
        <li>Our exhibition team will review your application within 5-7 business days</li>
        <li>We'll contact you to discuss booth availability and pricing</li>
        <li>If approved, you'll receive detailed exhibition guidelines and next steps</li>
        <li>Space is limited, so early applications have priority</li>
      </ul>
      
      <h3>Important Information:</h3>
      <ul>
        <li><strong>Event Dates:</strong> April 23-24, 2026</li>
        <li><strong>Venue:</strong> Sarit Centre, Nairobi, Kenya</li>
        <li><strong>Expected Attendees:</strong> 300+ in-person, 1,000+ streaming</li>
      </ul>
      
      <p>If you have any questions about your application or the exhibition process, please don't hesitate to contact us at <a href="mailto:exhibitions@paan.africa">exhibitions@paan.africa</a>.</p>
      
      <p>We look forward to potentially having you showcase your brand at Africa's premier creative economy summit!</p>
      
      <p>Best regards,<br>
      The PAAN Summit Team</p>
    `;

    // Send both emails concurrently
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      // Email to exhibitions@paan.africa (admin)
      transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: "exhibitions@paan.africa",
        subject: `New Exhibition Application - ${companyName} - PAAN Summit 2026`,
        html: adminEmailContent,
      }),
      
      // Email to applicant
      transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "Exhibition Application Received - PAAN Summit 2026",
        html: applicantEmailContent,
      }),
    ]);

    // Check if either email failed but don't throw error - just log it
    if (adminEmailResult.status === "rejected") {
      console.error("Failed to send admin email:", adminEmailResult.reason);
    }
    if (userEmailResult.status === "rejected") {
      console.error("Failed to send applicant confirmation email:", userEmailResult.reason);
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
        message: "Exhibition application submitted successfully. You will receive a confirmation email shortly.",
        status: "success"
      });
    } else {
      return res.status(500).json({ 
        message: "Unable to process your application at this time. Please try again or contact us directly.",
        status: "failed",
        contact: "exhibitions@paan.africa"
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error submitting exhibition application", error: error.message });
  }
}
