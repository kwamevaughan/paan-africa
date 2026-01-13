-- Masterclass promo codes table
-- This table stores discount codes specifically for masterclasses

CREATE TABLE IF NOT EXISTS masterclass_promo_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  minimum_amount DECIMAL(10,2) DEFAULT 0,
  maximum_discount DECIMAL(10,2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  applicable_masterclass_ids JSONB, -- Array of masterclass IDs this code applies to
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_masterclass_promo_codes_code ON masterclass_promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_masterclass_promo_codes_is_active ON masterclass_promo_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_masterclass_promo_codes_valid_from ON masterclass_promo_codes(valid_from);
CREATE INDEX IF NOT EXISTS idx_masterclass_promo_codes_valid_until ON masterclass_promo_codes(valid_until);

-- Create updated_at trigger function (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_masterclass_promo_codes_updated_at 
  BEFORE UPDATE ON masterclass_promo_codes 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert promo code for webinar attendees (10% discount for January 2026 masterclass)
-- This code is specifically for people who attended the "Unlocking Agency Growth in 2026" webinar
INSERT INTO masterclass_promo_codes (
  code, 
  description, 
  discount_type, 
  discount_value, 
  minimum_amount, 
  maximum_discount, 
  usage_limit, 
  valid_from, 
  valid_until, 
  applicable_masterclass_ids,
  is_active
) VALUES (
  'WEBINAR10',
  '10% discount for webinar attendees - Valid for Agency Positioning Masterclass (January 2026)',
  'percentage',
  10.00,
  0.00,
  NULL,
  NULL, -- No usage limit
  NOW(),
  '2026-01-27 23:59:59+00:00', -- Valid until 27th January 2026
  '[9]'::jsonb, -- Applies to masterclass ID 9 (Agency Positioning Masterclass)
  true
);

