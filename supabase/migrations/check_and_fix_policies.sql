-- Check current policies on summit_leads table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'summit_leads';

-- Check if RLS is enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'summit_leads';

-- Drop ALL existing policies
DROP POLICY IF EXISTS "Service role has full access to summit_leads" ON summit_leads;
DROP POLICY IF EXISTS "Allow anonymous users to insert leads" ON summit_leads;
DROP POLICY IF EXISTS "Allow anonymous users to update leads by email" ON summit_leads;
DROP POLICY IF EXISTS "Users can read their own lead data" ON summit_leads;

-- Disable RLS temporarily for testing
ALTER TABLE summit_leads DISABLE ROW LEVEL SECURITY;

-- If you want to keep RLS enabled with proper policies, comment out the line above and uncomment below:
-- ALTER TABLE summit_leads ENABLE ROW LEVEL SECURITY;
-- 
-- -- Allow all operations for anon role (public users)
-- CREATE POLICY "Allow public access to summit_leads"
--   ON summit_leads
--   FOR ALL
--   TO public
--   USING (true)
--   WITH CHECK (true);
