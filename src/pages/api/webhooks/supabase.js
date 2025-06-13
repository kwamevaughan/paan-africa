import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

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
      console.log('Blog change detected, regenerating sitemap...');
      
      try {
        // Fetch all published blog posts
        const { data: blogs, error } = await supabase
          .from('blogs')
          .select('slug, created_at, updated_at')
          .eq('is_published', true);

        if (error) {
          console.error('Error fetching blogs:', error);
          throw error;
        }

        console.log(`Found ${blogs?.length || 0} published blogs`);

        // Generate sitemap XML
        const sitemap = await generateSitemap(blogs);
        
        // Write sitemap to file
        const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
        fs.writeFileSync(sitemapPath, sitemap);
        
        console.log('Sitemap regenerated successfully');
        return res.status(200).json({ 
          message: 'Sitemap regenerated successfully',
          blogCount: blogs?.length || 0
        });
      } catch (error) {
        console.error('Error regenerating sitemap:', error);
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

async function generateSitemap(blogs) {
  const baseUrl = 'https://paan.africa';
  const now = new Date().toISOString();
  
  // Define static pages manually instead of using glob
  const staticPages = [
    { url: '/', priority: '1.0' },
    { url: '/blog', priority: '0.8' },
    { url: '/about', priority: '0.7' },
    { url: '/contact', priority: '0.7' },
    { url: '/privacy-policy', priority: '0.5' },
    { url: '/terms-of-service', priority: '0.5' }
  ];

  console.log('Using static pages:', staticPages);
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add blog posts
  blogs?.forEach(blog => {
    const lastmod = new Date(blog.updated_at || blog.created_at).toISOString();
    xml += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += '\n</urlset>';
  return xml;
} 