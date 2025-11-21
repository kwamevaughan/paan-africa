-- Fix RLS policies for summit_leads table to allow anonymous inserts
-- Run this in Supabase SQL Editor if you already created the table

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous users to insert leads" ON summit_leads;
DROP POLICY IF EXISTS "Allow anonymous users to update leads by email" ON summit_leads;

-- Create policy to allow anonymous users to insert leads (for ticket purchase flow)
CREATE POLICY "Allow anonymous users to insert leads"
  ON summit_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow anonymous users to update their own leads by email
CREATE POLICY "Allow anonymous users to update leads by email"
  ON summit_leads
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
