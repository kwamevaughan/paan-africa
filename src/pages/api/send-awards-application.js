import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      paymentData,
      applicationData,
      reference
    } = req.body;

    // Validate required fields
    if (!applicationData || !paymentData || !reference) {
      return res.status(400).json({
        success: false,
        message: 'Missing required application data'
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Check if early bird deadline is still active (November 25, 2025)
    const isEarlyBird = () => {
      const earlyBirdDeadline = new Date('2025-11-25T23:59:59+03:00'); // November 25, 2025 at 11:59 PM EAT
      const now = new Date();
      return now <= earlyBirdDeadline;
    };

    // Calculate pricing details
    const calculatePricingDetails = (data, paymentData) => {
      const isAgency = data.applicantType === 'agency';
      // Agency pricing: $130 for early bird (until Nov 25, 2025), $200 regular price
      const pricePerCategory = isAgency ? (isEarlyBird() ? 130 : 200) : 30;
      const categoryCount = data.selectedCategories.length;
      const baseAmount = pricePerCategory * categoryCount;
      const discountAmount = categoryCount > 1 ? baseAmount * 0.25 : 0;
      const finalAmount = baseAmount - discountAmount;
      
      return {
        pricePerCategory,
        categoryCount,
        baseAmount,
        discountAmount,
        finalAmount,
        currency: paymentData.currency,
        isEarlyBird: isEarlyBird()
      };
    };

    // Format application data for email
    const formatApplicationData = (data) => {
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

      // Award Categories
      formatted += 'SELECTED AWARD CATEGORIES\n';
      formatted += '=========================\n';
      data.selectedCategories.forEach((category, index) => {
        formatted += `${index + 1}. ${category}\n`;
      });
      formatted += '\n';

      // Project Information
      formatted += 'PROJECT/WORK INFORMATION\n';
      formatted += '========================\n';
      formatted += `Project Title: ${data.projectTitle}\n`;
      formatted += `Project Description: ${data.projectDescription}\n`;
      if (data.projectUrl) {
        formatted += `Project URL: ${data.projectUrl}\n`;
      }
      formatted += '\n';

      // Additional Information
      formatted += 'ADDITIONAL INFORMATION\n';
      formatted += '======================\n';
      formatted += `Why Apply: ${data.whyApply}\n`;
      if (data.previousAwards) {
        formatted += `Previous Awards: ${data.previousAwards}\n`;
      }
      
      // Social Media
      if (data.socialMedia) {
        formatted += '\nSOCIAL MEDIA\n';
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
      }

      return formatted;
    };

    // Calculate pricing details
    const pricingDetails = calculatePricingDetails(applicationData, paymentData);

    // Create email content
    const emailSubject = `PAAN Awards Application - ${applicationData.applicantType} - ${applicationData.fullName}`;
    
    const emailText = `
PAAN AWARDS APPLICATION RECEIVED

Payment Reference: ${reference}
Application Date: ${new Date().toLocaleString()}

${formatApplicationData(applicationData)}

PAYMENT DETAILS
===============
Applicant Type: ${applicationData.applicantType}
Price per Category: ${pricingDetails.currency} ${pricingDetails.pricePerCategory}
Categories Selected: ${pricingDetails.categoryCount}
Base Amount: ${pricingDetails.currency} ${pricingDetails.baseAmount.toLocaleString()}
${pricingDetails.discountAmount > 0 ? `Multi-Category Discount (25%): -${pricingDetails.currency} ${pricingDetails.discountAmount.toLocaleString()}\n` : ''}Final Amount: ${pricingDetails.currency} ${pricingDetails.finalAmount.toLocaleString()}
Status: ${paymentData.status}
Paid At: ${paymentData.paidAt ? new Date(paymentData.paidAt).toLocaleString() : 'N/A'}

This application has been successfully submitted and payment has been confirmed.

Best regards,
PAAN Awards System
    `.trim();

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>PAAN Awards Application</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: #172840; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .section { margin-bottom: 20px; }
            .section h3 { color: #F25849; border-bottom: 2px solid #F25849; padding-bottom: 5px; }
            .field { margin-bottom: 10px; }
            .field strong { color: #172840; }
            .payment-details { background: #e8f5e8; padding: 15px; border-left: 4px solid #4CAF50; }
            .footer { text-align: center; margin-top: 20px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>PAAN Awards Application Received</h1>
                <p>Payment Reference: ${reference}</p>
                <p>Application Date: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="content">
                <div class="section">
                    <h3>Personal Information</h3>
                    <div class="field"><strong>Full Name:</strong> ${applicationData.fullName}</div>
                    <div class="field"><strong>Email:</strong> ${applicationData.email}</div>
                    <div class="field"><strong>Phone:</strong> ${applicationData.phone}</div>
                    <div class="field"><strong>Country:</strong> ${applicationData.country}</div>
                </div>

                <div class="section">
                    <h3>Professional Information</h3>
                    <div class="field"><strong>Applicant Type:</strong> ${applicationData.applicantType}</div>
                    ${applicationData.companyName ? `<div class="field"><strong>Company Name:</strong> ${applicationData.companyName}</div>` : ''}
                    <div class="field"><strong>Website/Portfolio:</strong> <a href="${applicationData.website}">${applicationData.website}</a></div>
                    <div class="field"><strong>Years of Experience:</strong> ${applicationData.yearsExperience}</div>
                </div>

                <div class="section">
                    <h3>Selected Award Categories</h3>
                    <ul>
                        ${applicationData.selectedCategories.map(category => `<li>${category}</li>`).join('')}
                    </ul>
                </div>

                <div class="section">
                    <h3>Project/Work Information</h3>
                    <div class="field"><strong>Project Title:</strong> ${applicationData.projectTitle}</div>
                    <div class="field"><strong>Project Description:</strong><br>${applicationData.projectDescription.replace(/\n/g, '<br>')}</div>
                    ${applicationData.projectUrl ? `<div class="field"><strong>Project URL:</strong> <a href="${applicationData.projectUrl}">${applicationData.projectUrl}</a></div>` : ''}
                </div>

                <div class="section">
                    <h3>Additional Information</h3>
                    <div class="field"><strong>Why Apply:</strong><br>${applicationData.whyApply.replace(/\n/g, '<br>')}</div>
                    ${applicationData.previousAwards ? `<div class="field"><strong>Previous Awards:</strong><br>${applicationData.previousAwards.replace(/\n/g, '<br>')}</div>` : ''}
                </div>

                ${applicationData.socialMedia && (applicationData.socialMedia.linkedin || applicationData.socialMedia.twitter || applicationData.socialMedia.instagram) ? `
                <div class="section">
                    <h3>Social Media</h3>
                    ${applicationData.socialMedia.linkedin ? `<div class="field"><strong>LinkedIn:</strong> <a href="${applicationData.socialMedia.linkedin}">${applicationData.socialMedia.linkedin}</a></div>` : ''}
                    ${applicationData.socialMedia.twitter ? `<div class="field"><strong>Twitter:</strong> ${applicationData.socialMedia.twitter}</div>` : ''}
                    ${applicationData.socialMedia.instagram ? `<div class="field"><strong>Instagram:</strong> ${applicationData.socialMedia.instagram}</div>` : ''}
                </div>
                ` : ''}

                <div class="payment-details">
                    <h3>Payment Details</h3>
                    <div class="field"><strong>Applicant Type:</strong> ${applicationData.applicantType}</div>
                    <div class="field"><strong>Price per Category:</strong> ${pricingDetails.currency} ${pricingDetails.pricePerCategory}</div>
                    <div class="field"><strong>Categories Selected:</strong> ${pricingDetails.categoryCount}</div>
                    <div class="field"><strong>Base Amount:</strong> ${pricingDetails.currency} ${pricingDetails.baseAmount.toLocaleString()}</div>
                    ${pricingDetails.discountAmount > 0 ? `<div class="field" style="color: #4CAF50;"><strong>Multi-Category Discount (25%):</strong> -${pricingDetails.currency} ${pricingDetails.discountAmount.toLocaleString()}</div>` : ''}
                    <div class="field" style="font-size: 1.1em; font-weight: bold; border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px;"><strong>Final Amount:</strong> ${pricingDetails.currency} ${pricingDetails.finalAmount.toLocaleString()}</div>
                    <div class="field"><strong>Status:</strong> ${paymentData.status}</div>
                    <div class="field"><strong>Paid At:</strong> ${paymentData.paidAt ? new Date(paymentData.paidAt).toLocaleString() : 'N/A'}</div>
                </div>
            </div>

            <div class="footer">
                <p>This application has been successfully submitted and payment has been confirmed.</p>
                <p><strong>PAAN Awards System</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'secretariat@paan.africa',
      cc: applicationData.email, // Send copy to applicant
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to applicant
    const confirmationEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: applicationData.email,
      subject: `PAAN Awards Application Confirmation - ${applicationData.fullName}`,
      text: `
Dear ${applicationData.fullName},

Thank you for submitting your application for the PAAN Awards 2026!

Your application has been successfully received and your payment has been confirmed.

Application Details:
- Reference: ${reference}
- Applicant Type: ${applicationData.applicantType}
- Selected Categories: ${applicationData.selectedCategories.join(', ')}
- Application Date: ${new Date().toLocaleString()}

Payment Breakdown:
- Price per Category: ${pricingDetails.currency} ${pricingDetails.pricePerCategory}
- Categories Selected: ${pricingDetails.categoryCount}
- Base Amount: ${pricingDetails.currency} ${pricingDetails.baseAmount.toLocaleString()}
${pricingDetails.discountAmount > 0 ? `- Multi-Category Discount (25%): -${pricingDetails.currency} ${pricingDetails.discountAmount.toLocaleString()}\n` : ''}- Final Amount Paid: ${pricingDetails.currency} ${pricingDetails.finalAmount.toLocaleString()}

What's Next:
1. Our team will review your application
2. You'll receive updates on the review process
3. Finalists will be announced on April 22, 2026
4. The awards ceremony will be held during the PAAN Summit

If you have any questions, please contact us at secretariat@paan.africa.

Best regards,
PAAN Awards Team
      `.trim(),
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>PAAN Awards Application Confirmation</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #172840; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; }
              .highlight { background: #e8f5e8; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>PAAN Awards Application Confirmed</h1>
              </div>
              
              <div class="content">
                  <p>Dear <strong>${applicationData.fullName}</strong>,</p>
                  
                  <p>Thank you for submitting your application for the PAAN Awards 2026!</p>
                  
                  <div class="highlight">
                      <h3>Application Confirmed</h3>
                      <p>Your application has been successfully received and your payment has been confirmed.</p>
                  </div>

                  <h3>Application Details:</h3>
                  <ul>
                      <li><strong>Reference:</strong> ${reference}</li>
                      <li><strong>Applicant Type:</strong> ${applicationData.applicantType}</li>
                      <li><strong>Selected Categories:</strong> ${applicationData.selectedCategories.join(', ')}</li>
                      <li><strong>Application Date:</strong> ${new Date().toLocaleString()}</li>
                  </ul>

                  <h3>Payment Breakdown:</h3>
                  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                      <div style="margin-bottom: 8px;"><strong>Price per Category:</strong> ${pricingDetails.currency} ${pricingDetails.pricePerCategory}</div>
                      <div style="margin-bottom: 8px;"><strong>Categories Selected:</strong> ${pricingDetails.categoryCount}</div>
                      <div style="margin-bottom: 8px;"><strong>Base Amount:</strong> ${pricingDetails.currency} ${pricingDetails.baseAmount.toLocaleString()}</div>
                      ${pricingDetails.discountAmount > 0 ? `<div style="margin-bottom: 8px; color: #4CAF50;"><strong>Multi-Category Discount (25%):</strong> -${pricingDetails.currency} ${pricingDetails.discountAmount.toLocaleString()}</div>` : ''}
                      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ccc; font-weight: bold; font-size: 1.1em;"><strong>Final Amount Paid:</strong> ${pricingDetails.currency} ${pricingDetails.finalAmount.toLocaleString()}</div>
                  </div>

                  <h3>What's Next:</h3>
                  <ol>
                      <li>Our team will review your application</li>
                      <li>You'll receive updates on the review process</li>
                      <li>Finalists will be announced on April 22, 2026</li>
                      <li>The awards ceremony will be held during the PAAN Summit</li>
                  </ol>

                  <p>If you have any questions, please contact us at <a href="mailto:secretariat@paan.africa">secretariat@paan.africa</a>.</p>
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

    console.log('Awards application emails sent successfully:', {
      reference,
      applicantType: applicationData.applicantType,
      applicantName: applicationData.fullName,
      amount: paymentData.amount,
      emailsSent: ['secretariat@paan.africa', applicationData.email]
    });

    res.status(200).json({
      success: true,
      message: 'Application submitted and emails sent successfully'
    });

  } catch (error) {
    console.error('Error sending awards application email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send application email',
      error: error.message
    });
  }
}
