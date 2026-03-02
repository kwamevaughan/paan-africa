# Ticket Retrieval System

## Overview
The ticket retrieval system allows users to manually download their PAAN Summit 2026 tickets using their email address or registration number. This is useful when users lose their original ticket email or need to access it from a different device.

## Features

### 1. User-Facing Page (`/retrieve-ticket`)
- Clean, branded interface matching PAAN design
- Two search methods:
  - Search by email address
  - Search by registration number
- Displays all tickets associated with the search
- Download options for each ticket:
  - PDF format (recommended for printing)
  - PNG format (for mobile devices)
  - Resend email option

### 2. API Endpoints

#### `/api/retrieve-ticket` (POST)
Searches for tickets in the database based on email or registration number.

**Request Body:**
```json
{
  "searchType": "email" | "registration",
  "searchValue": "user@example.com" | "PAAN_1768383442165_vccq3angx"
}
```

**Response:**
```json
{
  "success": true,
  "tickets": [
    {
      "id": "uuid",
      "attendee_name": "John Doe",
      "attendee_email": "john@example.com",
      "ticket_type": "General Admission",
      "payment_reference": "PAAN_1768383442165_vccq3angx",
      "paid_at": "2025-12-27T00:00:00.000Z",
      "status": "paid"
    }
  ]
}
```

#### `/api/resend-ticket-email` (POST)
Regenerates and resends the ticket email with PDF and PNG attachments.

**Request Body:**
```json
{
  "attendeeId": "uuid",
  "paymentReference": "PAAN_1768383442165_vccq3angx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ticket email sent successfully to user@example.com"
}
```

## Database Requirements

The system queries the following tables:
- `attendees` - Contains attendee information
- `ticket_purchases` - Contains payment and ticket status

**Required fields:**
- `attendees.full_name`
- `attendees.email`
- `attendees.ticket_type`
- `ticket_purchases.payment_reference`
- `ticket_purchases.paid_at`
- `ticket_purchases.status` (must be 'paid')
- `ticket_purchases.payment_status` (must be 'completed')

## Integration Points

### 1. Payment Success Page
Added a "Retrieve Ticket" button for summit ticket purchases at `/payment/success?type=summit`

### 2. Summit Footer
Added "Retrieve Ticket" link in the Quick Links section of the summit footer

### 3. Email Templates
Uses the same ticket generation logic as the original purchase flow:
- `generateTicketImage()` from `src/lib/ticketGenerator.js`
- `generatePDFTicket()` from `src/lib/pdfTicketGenerator.js`

## Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@example.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@paan.africa
EMAIL_SECURE=false
```

## Usage

### For Users
1. Visit `/retrieve-ticket`
2. Choose search method (email or registration number)
3. Enter the information
4. Click "Retrieve Ticket"
5. Download PDF/PNG or resend email

### For Developers
The system is fully automated and requires no manual intervention. All ticket generation uses the existing ticket generator libraries.

## Security Considerations

1. **Database Access**: Uses Supabase service role key for secure database queries
2. **Validation**: Only returns tickets with status 'paid' and payment_status 'completed'
3. **Email Verification**: Resend email only sends to the registered email address
4. **No Authentication Required**: Users can retrieve tickets without logging in (by design for convenience)

## Testing

To test the system:

1. Use the existing test script to create a ticket:
   ```bash
   node send-ticket-email.js
   ```

2. Visit `/retrieve-ticket` and search using:
   - Email: `sm@amethystconsult.com`
   - Registration: `PAAN_1768383442165_vccq3angx`

3. Test all three actions:
   - Download PDF
   - Download PNG
   - Resend Email

## Future Enhancements

Potential improvements:
1. Add QR code scanning for quick retrieval
2. Implement rate limiting to prevent abuse
3. Add ticket transfer functionality
4. Create a user dashboard for managing all purchases
5. Add SMS notification option
6. Support for bulk ticket downloads (for group purchases)

## Troubleshooting

### "No tickets found"
- Verify the email/registration number is correct
- Check that the ticket status is 'paid' in the database
- Ensure payment_status is 'completed'

### "Failed to generate ticket"
- Check that ticket generator libraries are working
- Verify font files are available
- Check server logs for detailed errors

### "Failed to resend email"
- Verify SMTP credentials are correct
- Check email server connection
- Ensure attachments are being generated successfully
