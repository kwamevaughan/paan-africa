import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  console.log('Webhook received:', {
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  // Verify webhook secret if you have one
  const webhookSecret = req.headers['x-webhook-secret'];
  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    console.error('Webhook secret mismatch:', {
      received: webhookSecret,
      expected: process.env.WEBHOOK_SECRET
    });
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, table, record, old_record } = req.body;
    console.log('Processing webhook:', { type, table, record, old_record });

    // Only process blog-related changes
    if (table === 'blogs') {
      console.log('Blog change detected, regenerating sitemap...');
      
      // Regenerate sitemap
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);

      try {
        const { stdout, stderr } = await execAsync('npx next-sitemap');
        console.log('Sitemap regeneration output:', { stdout, stderr });
        
        if (stderr) {
          console.error('Sitemap regeneration error:', stderr);
        }
        
        console.log(`Sitemap regenerated after ${type} operation on blogs table`);
        return res.status(200).json({ 
          message: 'Sitemap regenerated successfully',
          output: stdout
        });
      } catch (error) {
        console.error('Error executing next-sitemap:', error);
        throw error;
      }
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