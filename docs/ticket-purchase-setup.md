# Ticket Purchase System Setup Guide

## Overview
This guide will help you set up the complete ticket purchase system for PAAN Summit 2026, including database setup, Paystack integration, and environment configuration.

## Database Setup

### 1. Create Database Tables
Run the SQL script in `database/ticket-purchase-schema.sql` in your Supabase SQL editor:

```sql
-- Copy and paste the entire content of database/ticket-purchase-schema.sql
```

### 2. Verify Tables Created
You should see the following tables created:
- `purchasers`
- `ticket_purchases`
- `ticket_types`
- `purchase_items`
- `attendees`
- `payment_transactions`

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Paystack Configuration
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key_here
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here

# Email Configuration (optional - for sending confirmation emails)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM=your_from_email
```

## Paystack Setup

### 1. Create Paystack Account
- Go to [Paystack](https://paystack.com) and create an account
- Complete the verification process

### 2. Get API Keys
- In your Paystack dashboard, go to Settings > API Keys & Webhooks
- Copy your Public Key and Secret Key
- Add them to your environment variables

### 3. Configure Webhooks (Optional)
- Set up webhook endpoints to handle payment notifications
- Recommended webhook URL: `https://yourdomain.com/api/paystack/webhook`

## Sample Promo Codes

The database includes sample promo codes for testing:

- **EARLYBIRD20**: 20% off (min $100, max $50 discount) - Valid until Dec 31, 2025
- **STUDENT50**: 50% off student tickets (max $100 discount) - Valid until Apr 20, 2026  
- **VIP100**: $100 off VIP tickets (min $200 purchase) - Valid until Apr 20, 2026
- **AGENCY25**: 25% off agency tickets (min $200, max $75 discount) - Valid until Apr 20, 2026

## Features Implemented

### 1. Dynamic Ticket Selection
- Users can select multiple ticket types
- Quantity selection for each ticket type
- Real-time price calculation
- Category filtering (All, In-Person, Virtual, Student, VIP)

### 2. Dynamic Attendee Forms
- Automatically generates attendee forms based on ticket quantities
- Each attendee gets their own form with:
  - Full name
  - Email
  - Job/Role
  - Organization
- Form validation for all required fields

### 3. Payment Processing
- Paystack integration for secure payments
- Support for multiple payment methods:
  - Credit/Debit Card (Paystack)
  - Bank Transfer/Invoice (with automatic invoice generation)
- Payment verification and status tracking
- Invoice generation with PAAN branding and bank details

### 4. Promo Code System
- Dynamic promo code validation
- Support for percentage and fixed amount discounts
- Usage limits and expiration dates
- Ticket type restrictions
- Real-time discount calculation
- Usage tracking and analytics

### 5. Database Integration
- All purchase data saved to Supabase
- Transaction history tracking
- Attendee information management
- Payment status monitoring

### 6. Form Validation
- Client-side validation for all form fields
- Email format validation
- Required field validation
- Real-time error display

## Usage

### 1. Ticket Selection
- Users browse available ticket types
- Select quantities for desired tickets
- View real-time pricing and discounts

### 2. Attendee Information
- Fill in purchaser information
- Complete attendee details for each ticket
- Optional travel support information

### 3. Payment
- Choose payment method:
  - **Card Payment**: Complete secure payment via Paystack
  - **Bank Transfer**: Generate invoice with bank details and complete manual transfer
- Receive confirmation and receipt

## Testing

### 1. Test Payment Flow
- Use Paystack test mode for development
- Test with Paystack test cards
- Verify database entries

### 2. Test Form Validation
- Try submitting incomplete forms
- Test email validation
- Verify required field validation

## Security Considerations

### 1. Environment Variables
- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate keys regularly

### 2. Database Security
- Use Row Level Security (RLS) in Supabase
- Implement proper access controls
- Regular security audits

### 3. Payment Security
- Always use HTTPS in production
- Validate payments server-side
- Implement proper error handling

## Troubleshooting

### Common Issues

1. **Paystack not loading**
   - Check if Paystack script is loaded
   - Verify public key is correct
   - Check browser console for errors

2. **Database connection issues**
   - Verify Supabase URL and keys
   - Check network connectivity
   - Verify table permissions

3. **Form validation not working**
   - Check form field names
   - Verify validation logic
   - Check error state management

### Support
For technical support, contact the development team or check the project documentation.
