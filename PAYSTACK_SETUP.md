# Paystack Integration Setup

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Paystack Configuration
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key_here
```

## Getting Paystack Keys

1. Sign up for a Paystack account at [paystack.com](https://paystack.com)
2. Go to Settings > API Keys & Webhooks
3. Copy your Public Key and Secret Key
4. For testing, use the test keys (they start with `pk_test_` and `sk_test_`)
5. For production, use the live keys (they start with `pk_live_` and `sk_live_`)

## Usage

### Basic Usage
```jsx
import TicketPurchaseButton from "@/components/TicketPurchaseButton";

// Simple button
<TicketPurchaseButton />

// Custom button
<TicketPurchaseButton variant="secondary" size="lg">
  Get Your Ticket Now
</TicketPurchaseButton>
```

### Available Variants
- `primary` - Red background (default)
- `secondary` - Red border, transparent background
- `outline` - Dark blue border
- `yellow` - Yellow background

### Available Sizes
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

## Features

- ✅ Form validation
- ✅ Paystack payment processing
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Mobile-friendly
- ✅ Customizable styling

## Form Fields

The ticket purchase form includes:
- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Country (required, dropdown)
- Role/Position (required, dropdown)
- Company/Organization (required)

## Payment Flow

1. User clicks "Buy Ticket" button
2. Form modal opens with ticket selection and required fields
3. User selects ticket type (Members $100, Non-Members $150)
4. User fills out the form
5. Form validation runs
6. Paystack payment modal opens (amount converted to NGN)
7. User completes payment
8. Success callback handles confirmation
9. User receives confirmation email

## Ticket Options

The system supports two ticket tiers:

### Members - $100 USD
- Full 3-day summit access
- Networking sessions
- Digital certificate
- Lunch & refreshments
- Welcome kit
- Member-only sessions

### Non-Members - $150 USD
- Full 3-day summit access
- Networking sessions
- Digital certificate
- Lunch & refreshments
- Welcome kit

## Customization

You can customize ticket options by modifying the `ticketOptions` array in `TicketPurchaseForm.js`:

```javascript
const ticketOptions = [
  {
    id: "members",
    name: "Members",
    price: 100, // USD
    currency: "USD",
    // ... other properties
  },
  {
    id: "non-members",
    name: "Non-Members",
    price: 150, // USD
    currency: "USD",
    // ... other properties
  }
];
```

The system automatically converts USD to NGN for Paystack processing using a 1:1500 exchange rate.

## Security Notes

- Never expose your secret key in client-side code
- Always validate payments on your backend
- Use HTTPS in production
- Implement proper error handling
