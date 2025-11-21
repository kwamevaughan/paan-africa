-- Temporarily disable RLS on summit_leads to allow inserts
-- This is a quick fix - you can re-enable with proper policies later

-- Disable RLS
ALTER TABLE summit_leads DISABLE ROW LEVEL SECURITY;

-- Or if you want to keep RLS enabled, drop all policies and create a permissive one
-- ALTER TABLE summit_leads ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Service role has full access to summit_leads" ON summit_leads;
-- DROP POLICY IF EXISTS "Allow anonymous users to insert leads" ON summit_leads;
-- DROP POLICY IF EXISTS "Allow anonymous users to update leads by email" ON summit_leads;
-- DROP POLICY IF EXISTS "Users can read their own lead data" ON summit_leads;

-- CREATE POLICY "Allow all operations for now"
--   ON summit_leads
--   FOR ALL
--   USING (true)
--   WITH CHECK (true);
