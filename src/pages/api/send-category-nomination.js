import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      email,
      phone,
      country,
      applicantType,
      companyName,
      website,
      yearsExperience,
      categoryName,
      categoryDescription,
      categoryRationale,
      targetAudience,
      similarCategories,
      whyImportant,
      expectedImpact,
      socialMedia,
      recaptchaToken
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !country || !applicantType || 
        !website || !yearsExperience || !categoryName || !categoryDescription || 
        !categoryRationale || !targetAudience || !whyImportant || !expectedImpact || 
        !recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Verify reCAPTCHA token
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      console.error(
        "reCAPTCHA secret key is missing. Please set RECAPTCHA_SECRET_KEY in .env.local"
      );
      return res.status(500).json({ message: 'Server configuration error' });
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

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Format nomination data for email
    const formatNominationData = (data) => {
      let formatted = '';
      
      // Personal Information
      formatted += 'PERSONAL INFORMATION\n';
      formatted += '====================\n';
      formatted += `Full Name: ${data.fullName}\n`;
      formatted += `Email: ${data.email}\n`;
      formatted += `Phone: ${data.phone}\n`;
      formatted += `Country: ${data.country}\n\n`;

      // Professional Information
      formatted += 'PROFESSIONAL INFORMATION\n';
      formatted += '========================\n';
      formatted += `Applicant Type: ${data.applicantType}\n`;
      if (data.companyName) {
        formatted += `Company Name: ${data.companyName}\n`;
      }
      formatted += `Website/Portfolio: ${data.website}\n`;
      formatted += `Years of Experience: ${data.yearsExperience}\n\n`;

      // Category Nomination Details
      formatted += 'CATEGORY NOMINATION DETAILS\n';
      formatted += '==========================\n';
      formatted += `Proposed Category Name: ${data.categoryName}\n`;
      formatted += `Category Description: ${data.categoryDescription}\n`;
      formatted += `Rationale: ${data.categoryRationale}\n`;
      formatted += `Target Audience: ${data.targetAudience}\n`;
      if (data.similarCategories) {
        formatted += `Similar Categories: ${data.similarCategories}\n`;
      }
      formatted += `Why Important: ${data.whyImportant}\n`;
      formatted += `Expected Impact: ${data.expectedImpact}\n\n`;
      
      // Social Media
      if (data.socialMedia && (data.socialMedia.linkedin || data.socialMedia.twitter || data.socialMedia.instagram)) {
        formatted += 'SOCIAL MEDIA\n';
        formatted += '============\n';
        if (data.socialMedia.linkedin) {
          formatted += `LinkedIn: ${data.socialMedia.linkedin}\n`;
        }
        if (data.socialMedia.twitter) {
          formatted += `Twitter: ${data.socialMedia.twitter}\n`;
        }
        if (data.socialMedia.instagram) {
          formatted += `Instagram: ${data.socialMedia.instagram}\n`;
        }
        formatted += '\n';
      }

      return formatted;
    };

    // Create email content
    const emailSubject = `PAAN Awards Category Nomination - ${categoryName} - ${fullName}`;
    
    const emailText = `
PAAN AWARDS CATEGORY NOMINATION RECEIVED

Nomination Date: ${new Date().toLocaleString()}

${formatNominationData({
  fullName,
  email,
  phone,
  country,
  applicantType,
  companyName,
  website,
  yearsExperience,
  categoryName,
  categoryDescription,
  categoryRationale,
  targetAudience,
  similarCategories,
  whyImportant,
  expectedImpact,
  socialMedia
})}

This category nomination has been successfully submitted and will be reviewed by the PAAN Awards committee.

Best regards,
PAAN Awards System
    `.trim();

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>PAAN Awards Category Nomination</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: #172840; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .section { margin-bottom: 20px; }
            .section h3 { color: #F25849; border-bottom: 2px solid #F25849; padding-bottom: 5px; }
            .field { margin-bottom: 10px; }
            .field strong { color: #172840; }
            .nomination-details { background: #e8f4fd; padding: 15px; border-left: 4px solid #2196F3; }
            .footer { text-align: center; margin-top: 20px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>PAAN Awards Category Nomination Received</h1>
                <p>Nomination Date: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="content">
                <div class="section">
                    <h3>Personal Information</h3>
                    <div class="field"><strong>Full Name:</strong> ${fullName}</div>
                    <div class="field"><strong>Email:</strong> ${email}</div>
                    <div class="field"><strong>Phone:</strong> ${phone}</div>
                    <div class="field"><strong>Country:</strong> ${country}</div>
                </div>

                <div class="section">
                    <h3>Professional Information</h3>
                    <div class="field"><strong>Applicant Type:</strong> ${applicantType}</div>
                    ${companyName ? `<div class="field"><strong>Company Name:</strong> ${companyName}</div>` : ''}
                    <div class="field"><strong>Website/Portfolio:</strong> <a href="${website}">${website}</a></div>
                    <div class="field"><strong>Years of Experience:</strong> ${yearsExperience}</div>
                </div>

                <div class="nomination-details">
                    <h3>Category Nomination Details</h3>
                    <div class="field"><strong>Proposed Category Name:</strong> ${categoryName}</div>
                    <div class="field"><strong>Category Description:</strong><br>${categoryDescription.replace(/\n/g, '<br>')}</div>
                    <div class="field"><strong>Rationale:</strong><br>${categoryRationale.replace(/\n/g, '<br>')}</div>
                    <div class="field"><strong>Target Audience:</strong> ${targetAudience}</div>
                    ${similarCategories ? `<div class="field"><strong>Similar Categories:</strong><br>${similarCategories.replace(/\n/g, '<br>')}</div>` : ''}
                    <div class="field"><strong>Why Important:</strong><br>${whyImportant.replace(/\n/g, '<br>')}</div>
                    <div class="field"><strong>Expected Impact:</strong><br>${expectedImpact.replace(/\n/g, '<br>')}</div>
                </div>

                ${socialMedia && (socialMedia.linkedin || socialMedia.twitter || socialMedia.instagram) ? `
                <div class="section">
                    <h3>Social Media</h3>
                    ${socialMedia.linkedin ? `<div class="field"><strong>LinkedIn:</strong> <a href="${socialMedia.linkedin}">${socialMedia.linkedin}</a></div>` : ''}
                    ${socialMedia.twitter ? `<div class="field"><strong>Twitter:</strong> ${socialMedia.twitter}</div>` : ''}
                    ${socialMedia.instagram ? `<div class="field"><strong>Instagram:</strong> ${socialMedia.instagram}</div>` : ''}
                </div>
                ` : ''}
            </div>

            <div class="footer">
                <p>This category nomination has been successfully submitted and will be reviewed by the PAAN Awards committee.</p>
                <p><strong>PAAN Awards System</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send email to secretariat
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'secretariat@paan.africa',
      cc: email, // Send copy to nominator
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to nominator
    const confirmationEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: `PAAN Awards Category Nomination Confirmation - ${fullName}`,
      text: `
Dear ${fullName},

Thank you for nominating a new category for the PAAN Awards 2026!

Your nomination for "${categoryName}" has been successfully received and will be reviewed by our awards committee.

Nomination Details:
- Category Name: ${categoryName}
- Submitted By: ${fullName}
- Submission Date: ${new Date().toLocaleString()}

What's Next:
1. Our committee will review your nomination
2. We'll evaluate how it fits with our current categories
3. We'll consider the impact and relevance to the African creative industry
4. You'll receive an update on the decision within 30 days

If you have any questions, please contact us at secretariat@paan.africa.

Thank you for helping shape the future of PAAN Awards!

Best regards,
PAAN Awards Team
      `.trim(),
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>PAAN Awards Category Nomination Confirmation</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #172840; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; }
              .highlight { background: #e8f4fd; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>PAAN Awards Category Nomination Confirmed</h1>
              </div>
              
              <div class="content">
                  <p>Dear <strong>${fullName}</strong>,</p>
                  
                  <p>Thank you for nominating a new category for the PAAN Awards 2026!</p>
                  
                  <div class="highlight">
                      <h3>Nomination Confirmed</h3>
                      <p>Your nomination for <strong>"${categoryName}"</strong> has been successfully received and will be reviewed by our awards committee.</p>
                  </div>

                  <h3>Nomination Details:</h3>
                  <ul>
                      <li><strong>Category Name:</strong> ${categoryName}</li>
                      <li><strong>Submitted By:</strong> ${fullName}</li>
                      <li><strong>Submission Date:</strong> ${new Date().toLocaleString()}</li>
                  </ul>

                  <h3>What's Next:</h3>
                  <ol>
                      <li>Our committee will review your nomination</li>
                      <li>We'll evaluate how it fits with our current categories</li>
                      <li>We'll consider the impact and relevance to the African creative industry</li>
                      <li>You'll receive an update on the decision within 30 days</li>
                  </ol>

                  <p>If you have any questions, please contact us at <a href="mailto:secretariat@paan.africa">secretariat@paan.africa</a>.</p>
                  
                  <p>Thank you for helping shape the future of PAAN Awards!</p>
              </div>

              <div class="footer">
                  <p>Best regards,<br><strong>PAAN Awards Team</strong></p>
              </div>
          </div>
      </body>
      </html>
      `
    };

    await transporter.sendMail(confirmationEmailOptions);

    console.log('Category nomination emails sent successfully:', {
      nominatorName: fullName,
      categoryName,
      emailsSent: ['secretariat@paan.africa', email]
    });

    res.status(200).json({
      success: true,
      message: 'Category nomination submitted and emails sent successfully'
    });

  } catch (error) {
    console.error('Error sending category nomination email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send nomination email',
      error: error.message
    });
  }
}
