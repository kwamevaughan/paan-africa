-- Create summit_leads table for tracking leads from ticket purchase flow
-- This table captures contact information early in the funnel for follow-up and analytics

CREATE TABLE IF NOT EXISTS summit_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  source TEXT DEFAULT 'ticket_purchase_flow',
  status TEXT DEFAULT 'contacted',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_summit_leads_email ON summit_leads(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_summit_leads_status ON summit_leads(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_summit_leads_created_at ON summit_leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE summit_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role has full access to summit_leads"
  ON summit_leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to read their own data
CREATE POLICY "Users can read their own lead data"
  ON summit_leads
  FOR SELECT
  TO authenticated
  USING (auth.email() = email);

-- Add comment to table
COMMENT ON TABLE summit_leads IS 'Stores lead information from summit ticket purchase flow for follow-up and analytics';

-- Add comments to columns
COMMENT ON COLUMN summit_leads.full_name IS 'Full name of the lead';
COMMENT ON COLUMN summit_leads.email IS 'Email address (unique identifier)';
COMMENT ON COLUMN summit_leads.phone IS 'Phone number with country code';
COMMENT ON COLUMN summit_leads.country IS 'Country of residence';
COMMENT ON COLUMN summit_leads.source IS 'Source of the lead (e.g., ticket_purchase_flow)';
COMMENT ON COLUMN summit_leads.status IS 'Lead status: contacted, tickets_selected, purchased, abandoned';
COMMENT ON COLUMN summit_leads.metadata IS 'Additional metadata (timestamps, user agent, ticket selections, etc.)';
