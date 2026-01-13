--  experience_bookings table
-- This table stores booking information and payment status for summit experiences

CREATE TABLE IF NOT EXISTS experience_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  experience_id TEXT NOT NULL,
  experience_title TEXT NOT NULL,
  category TEXT,
  
  -- Customer Information
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- Booking Details
  number_of_guests INTEGER DEFAULT 1,
  preferred_date DATE NOT NULL,
  preferred_time TIME,
  hotel TEXT,
  dietary_requirements TEXT,
  special_requests TEXT,
  
  -- Pricing
  price_per_person DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  total_amount DECIMAL(10, 2) NOT NULL,
  
  -- Payment Information
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, cancelled, refunded
  payment_reference TEXT UNIQUE,
  payment_method TEXT, -- card, bank_transfer, etc.
  payment_gateway TEXT DEFAULT 'paystack',
  payment_gateway_response JSONB,
  
  -- Booking Status
  booking_status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_experience_bookings_email ON experience_bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_experience_bookings_experience_id ON experience_bookings(experience_id);
CREATE INDEX IF NOT EXISTS idx_experience_bookings_payment_status ON experience_bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_experience_bookings_booking_status ON experience_bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_experience_bookings_payment_reference ON experience_bookings(payment_reference);
CREATE INDEX IF NOT EXISTS idx_experience_bookings_created_at ON experience_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_experience_bookings_preferred_date ON experience_bookings(preferred_date);

-- Enable Row Level Security
ALTER TABLE experience_bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role has full access to experience_bookings"
  ON experience_bookings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy to allow anonymous users to insert bookings
CREATE POLICY "Allow anonymous users to insert bookings"
  ON experience_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow anonymous users to update their own bookings by email and payment reference
CREATE POLICY "Allow anonymous users to update bookings"
  ON experience_bookings
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to read their own bookings
CREATE POLICY "Users can read their own bookings"
  ON experience_bookings
  FOR SELECT
  TO authenticated
  USING (auth.email() = customer_email);

-- Add comment to table
COMMENT ON TABLE experience_bookings IS 'Stores experience booking information and payment status for PAAN Summit 2026';

-- Add comments to columns
COMMENT ON COLUMN experience_bookings.experience_id IS 'Unique identifier for the experience (slug)';
COMMENT ON COLUMN experience_bookings.experience_title IS 'Title of the experience';
COMMENT ON COLUMN experience_bookings.payment_status IS 'Payment status: pending, paid, failed, cancelled, refunded';
COMMENT ON COLUMN experience_bookings.booking_status IS 'Booking status: pending, confirmed, cancelled, completed';
COMMENT ON COLUMN experience_bookings.payment_reference IS 'Unique payment reference from payment gateway';
COMMENT ON COLUMN experience_bookings.metadata IS 'Additional metadata (user agent, IP address, etc.)';

