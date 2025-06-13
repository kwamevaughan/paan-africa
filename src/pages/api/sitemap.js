import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    // Fetch all published blog posts
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, created_at, updated_at')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }

    // Generate sitemap XML for blog posts only
    const sitemap = generateBlogSitemap(blogs || []);

    // Set the content type to XML
    res.setHeader('Content-Type', 'application/xml');
    
    // Send the sitemap content
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error serving sitemap:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function generateBlogSitemap(blogs) {
  const baseUrl = 'https://paan.africa';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  // Add blog posts
  blogs.forEach(blog => {
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