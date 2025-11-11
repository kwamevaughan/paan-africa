import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


if (!supabaseUrl) {
  console.error('NEXT_PUBLIC_SUPABASE_URL is missing from environment variables');
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing from environment variables');
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);