import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with error handling
let supabase;
try {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('Missing required Supabase environment variables');
  }
  
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

export default async function handler(req, res) {
  // Verify Supabase client is initialized
  if (!supabase) {
    console.error('Supabase client not initialized');
    return res.status(500).json({ 
      message: 'Internal server error - Supabase client not initialized',
      error: 'Database connection failed'
    });
  }

  // Log all headers for debugging
  console.log('All request headers:', req.headers);
  
  // Get the webhook secret from headers (case-insensitive)
  const webhookSecret = req.headers['x-webhook-secret'] || 
                       req.headers['X-Webhook-Secret'] || 
                       req.headers['X-WEBHOOK-SECRET'];

  console.log('Webhook secret check:', {
    received: webhookSecret,
    expected: process.env.WEBHOOK_SECRET,
    headers: req.headers,
    allHeaderKeys: Object.keys(req.headers)
  });

  if (!webhookSecret) {
    console.error('No webhook secret provided in headers');
    return res.status(401).json({ 
      message: 'Unauthorized - No webhook secret provided',
      headers: req.headers
    });
  }

  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    console.error('Webhook secret mismatch:', {
      received: webhookSecret,
      expected: process.env.WEBHOOK_SECRET,
      headers: req.headers
    });
    return res.status(401).json({ 
      message: 'Unauthorized - Invalid webhook secret',
      received: webhookSecret,
      expected: process.env.WEBHOOK_SECRET
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, table, record, old_record } = req.body;
    console.log('Processing webhook:', { type, table, record, old_record });

    // Only process blog-related changes
    if (table === 'blogs') {
      console.log('Blog change detected - sitemap will be regenerated on next request');
      return res.status(200).json({ 
        message: 'Webhook processed successfully - sitemap will be regenerated on next request'
      });
    }

    res.status(200).json({ message: 'Webhook received but no action taken' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ 
      message: 'Error processing webhook', 
      error: error.message,
      stack: error.stack
    });
  }
} 