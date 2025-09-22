# Email Setup for PAAN Awards Applications

## Overview

When a PAAN Awards application payment is successful, the system automatically sends a detailed email to `secretariat@paan.africa` with all the application data.

## Environment Variables Required

Add these variables to your `.env.local` file:

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com

# Base URL for webhook callbacks (production only)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Email Service Setup

### Option 1: Gmail (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASS`

3. **Configure Environment Variables:**
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_gmail@gmail.com
   SMTP_PASS=your_16_character_app_password
   SMTP_FROM=your_gmail@gmail.com
   ```

### Option 2: Other Email Providers

#### Outlook/Hotmail
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
```

#### Custom SMTP Server
```bash
SMTP_HOST=your_smtp_server.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
```

## Email Content

The system sends a comprehensive email containing:

### Personal Information
- Full Name
- Email Address
- Phone Number
- Country

### Professional Information
- Applicant Type (Agency/Freelancer)
- Company Name (for agencies)
- Website/Portfolio URL
- Years of Experience

### Award Categories
- All selected award categories

### Project Information
- Project Title
- Project Description
- Project URL (if provided)

### Additional Information
- Why they should win the award
- Previous awards/recognition
- Social media profiles

### Payment Details
- Payment reference
- Amount paid
- Payment status
- Payment timestamp

## Email Recipients

- **Primary:** `secretariat@paan.africa`
- **CC:** Applicant's email address (for confirmation)

## Email Format

The email is sent in both:
- **HTML format** - Beautifully formatted with styling
- **Text format** - Plain text fallback

## Testing

### Test Email Sending
1. Make a test payment
2. Check the console logs for email sending status
3. Verify email is received at `secretariat@paan.africa`

### Debug Email Issues
1. Check server logs for SMTP errors
2. Verify environment variables are set correctly
3. Test SMTP connection with a simple email

## Troubleshooting

### Common Issues

#### "Authentication failed"
- Check if 2FA is enabled on Gmail
- Verify app password is correct
- Ensure `SMTP_USER` matches the account with app password

#### "Connection timeout"
- Check firewall settings
- Verify SMTP host and port
- Try different SMTP port (465 for SSL)

#### "Email not received"
- Check spam folder
- Verify recipient email address
- Check SMTP logs for delivery status

### Debug Commands

```bash
# Test SMTP connection
telnet smtp.gmail.com 587

# Check environment variables
echo $SMTP_USER
echo $SMTP_HOST
```

## Security Notes

- Never commit email credentials to version control
- Use app passwords instead of main account passwords
- Consider using environment-specific email accounts
- Monitor email sending for abuse

## Production Considerations

1. **Rate Limiting:** Implement rate limiting for email sending
2. **Queue System:** Consider using a queue system for high volume
3. **Monitoring:** Set up monitoring for email delivery
4. **Backup:** Have backup email service configured
5. **Compliance:** Ensure GDPR/privacy compliance for email data

## API Endpoint

The email is sent via: `POST /api/send-awards-application`

**Request Body:**
```json
{
  "paymentData": {
    "reference": "PAAN_AWARDS_AGENCY_1234567890",
    "amount": 30000,
    "currency": "USD",
    "status": "success",
    "paidAt": "2024-01-15T10:30:00Z"
  },
  "applicationData": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "applicantType": "agency",
    // ... all form data
  },
  "reference": "PAAN_AWARDS_AGENCY_1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted and email sent successfully"
}
```
