import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(req, res) {
  console.log("Career application API called with method:", req.method);
  
  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  let files = null; // Declare files in broader scope for cleanup

  try {
    // Parse form data including files
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ name, originalFilename, mimetype }) => {
        // Only allow PDF, DOC, DOCX files
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return allowedTypes.includes(mimetype);
      }
    });

    const [fields, parsedFiles] = await form.parse(req);
    files = parsedFiles; // Assign to the broader scope variable
    
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
    } = fields;

    // Convert arrays to strings (formidable returns arrays)
    const firstNameStr = Array.isArray(firstName) ? firstName[0] : firstName;
    const lastNameStr = Array.isArray(lastName) ? lastName[0] : lastName;
    const emailStr = Array.isArray(email) ? email[0] : email;
    const phoneStr = Array.isArray(phone) ? phone[0] : phone;
    const positionStr = Array.isArray(position) ? position[0] : position;
    const experienceStr = Array.isArray(experience) ? experience[0] : experience;
    const locationStr = Array.isArray(location) ? location[0] : location;
    const coverLetterStr = Array.isArray(coverLetter) ? coverLetter[0] : coverLetter;
    const recaptchaTokenStr = Array.isArray(recaptchaToken) ? recaptchaToken[0] : recaptchaToken;

    console.log("Received application data:", { firstName: firstNameStr, lastName: lastNameStr, email: emailStr, position: positionStr });
    console.log("Files received:", files);

    // Validate required fields
    if (!firstNameStr || !lastNameStr || !emailStr || !positionStr || !experienceStr || !coverLetterStr || !recaptchaTokenStr) {
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
        body: `secret=${recaptchaSecret}&response=${recaptchaTokenStr}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return res
        .status(400)
        .json({ message: "reCAPTCHA verification failed. Please try again." });
    }

    // Debug SMTP configuration
    console.log("SMTP Configuration:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.EMAIL_SECURE,
      user: process.env.SMTP_EMAIL,
      hasPassword: !!process.env.SMTP_PASSWORD
    });

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true, // Enable debug mode
      logger: true // Enable logging
    });

    // Prepare email attachments
    const attachments = [];
    if (files.resume && files.resume[0]) {
      const resumeFile = files.resume[0];
      attachments.push({
        filename: resumeFile.originalFilename || 'resume.pdf',
        path: resumeFile.filepath,
        contentType: resumeFile.mimetype
      });
      console.log("Attachment prepared:", {
        filename: resumeFile.originalFilename,
        size: resumeFile.size,
        mimetype: resumeFile.mimetype
      });
    } else {
      console.log("No resume file found");
    }

    // Test SMTP connection first
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP connection verification failed:", verifyError);
      return res.status(500).json({
        message: "Email service is currently unavailable. Please try again later.",
      });
    }

    // Send email to admin first (without attachments for testing)
    const adminEmailResult = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "careers@paan.africa",
      subject: `New Career Application: ${positionStr} - ${firstNameStr} ${lastNameStr}`,
      // attachments: attachments, // Temporarily disabled for testing
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
                    <td style="padding: 8px 0; color: #333;">${firstNameStr} ${lastNameStr}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Email:</td>
                    <td style="padding: 8px 0; color: #333;">${emailStr}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Phone:</td>
                    <td style="padding: 8px 0; color: #333;">${phoneStr || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Position:</td>
                    <td style="padding: 8px 0; color: #333;">${positionStr}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Experience:</td>
                    <td style="padding: 8px 0; color: #333;">${experienceStr} years</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #172840;">Location:</td>
                    <td style="padding: 8px 0; color: #333;">${locationStr || 'Not specified'}</td>
                  </tr>
                </table>
              </div>

              ${coverLetterStr ? `
                <div style="margin-bottom: 25px;">
                  <h3 style="color: #172840; margin: 0 0 15px 0; font-size: 16px;">Cover Letter</h3>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #84C1D9;">
                    <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${coverLetterStr}</p>
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
              
              ${files.resume && files.resume[0] ? `
              <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin-top: 20px;">
                <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">📎 Resume Attached</h3>
                <p style="color: #856404; margin: 0; font-size: 14px;">
                  <strong>Filename:</strong> ${files.resume[0].originalFilename}<br>
                  <strong>Size:</strong> ${Math.round(files.resume[0].size / 1024)} KB<br>
                  <strong>Type:</strong> ${files.resume[0].mimetype}
                </p>
                <p style="color: #856404; margin: 10px 0 0 0; font-size: 12px; font-style: italic;">
                  Note: Resume file is available in the system but not attached to this email for testing purposes.
                </p>
              </div>
              ` : ''}
            </div>
          </div>
        `,
    });

    // Log application data for debugging
    console.log("Application data:", {
      firstName: firstNameStr,
      lastName: lastNameStr,
      email: emailStr,
      position: positionStr,
      experience: experienceStr,
      hasResume: !!(files.resume && files.resume[0])
    });

    // Clean up temporary files
    if (files.resume && files.resume[0]) {
      try {
        fs.unlinkSync(files.resume[0].filepath);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary file:", cleanupError);
      }
    }

    // Check if email was sent successfully
    console.log("Email sent successfully:", adminEmailResult.messageId);

    return res.status(200).json({
      message: "Application submitted successfully!",
    });
  } catch (error) {
    console.error("Error processing career application:", error);
    
    // Clean up temporary files in case of error
    if (files && files.resume && files.resume[0]) {
      try {
        fs.unlinkSync(files.resume[0].filepath);
        console.log("Cleaned up temporary file");
      } catch (cleanupError) {
        console.error("Error cleaning up temporary file:", cleanupError);
      }
    }
    
    return res.status(500).json({
      message: "An error occurred while processing your application. Please try again later.",
    });
  }
}
