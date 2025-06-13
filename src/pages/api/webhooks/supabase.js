import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import glob from 'glob';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  console.log('Webhook received for sitemap regeneration:', {
    method: req.method,
    headers: req.headers,
    body: req.body,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_KEY
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
  
  // Get all pages from the pages directory
  const pages = await new Promise((resolve, reject) => {
    glob('src/pages/**/*.{js,jsx,ts,tsx}', (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });

  // Transform page paths to URLs
  const staticPages = pages
    .map(page => {
      // Remove src/pages from the path
      const path = page.replace('src/pages', '');
      // Remove file extension
      const pathWithoutExt = path.replace(/\.(js|jsx|ts|tsx)$/, '');
      // Handle index pages
      const url = pathWithoutExt === '/index' ? '/' : pathWithoutExt;
      // Skip API routes and dynamic routes
      if (url.startsWith('/api') || url.includes('[')) return null;
      return { url, priority: '0.7' };
    })
    .filter(Boolean); // Remove null entries

  console.log('Discovered static pages:', staticPages);
  
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