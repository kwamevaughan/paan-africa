/**
 * Script to verify and create summit_leads table if it doesn't exist
 * Run with: node scripts/verify-summit-leads-table.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local file manually
const envPath = path.join(__dirname, '..', '.env.local');
let supabaseUrl, supabaseServiceKey;

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();
    
    if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
      supabaseUrl = value;
    } else if (key === 'SUPABASE_SERVICE_ROLE_KEY' || key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
      supabaseServiceKey = supabaseServiceKey || value;
    }
  });
} catch (error) {
  console.error('❌ Could not read .env.local file');
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyAndCreateTable() {
  console.log('🔍 Checking if summit_leads table exists...\n');

  try {
    // Try to query the table
    const { data, error } = await supabase
      .from('summit_leads')
      .select('*')
      .limit(1);

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.log('❌ Table summit_leads does NOT exist\n');
        console.log('📝 SQL to create the table:\n');
        console.log(`
-- Create summit_leads table
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
        `);
        console.log('\n📋 Instructions:');
        console.log('1. Go to your Supabase Dashboard');
        console.log('2. Navigate to SQL Editor');
        console.log('3. Copy and paste the SQL above');
        console.log('4. Click "Run" to create the table');
        console.log('5. Run this script again to verify\n');
        
        return false;
      } else {
        console.error('❌ Error querying table:', error.message);
        return false;
      }
    }

    console.log('✅ Table summit_leads EXISTS!\n');
    console.log('📊 Table structure verified');
    console.log('📈 Sample query successful');
    
    // Get row count
    const { count, error: countError } = await supabase
      .from('summit_leads')
      .select('*', { count: 'exact', head: true });
    
    if (!countError) {
      console.log(`📝 Current records: ${count || 0}\n`);
    }

    return true;
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

// Run the verification
verifyAndCreateTable()
  .then((exists) => {
    if (exists) {
      console.log('✅ All good! The summit_leads table is ready to use.');
      process.exit(0);
    } else {
      console.log('⚠️  Please create the table using the SQL provided above.');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
