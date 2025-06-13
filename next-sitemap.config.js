/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://paan.africa',
  generateRobotsTxt: true,
  exclude: ['/thank-you', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you', '/api/*'],
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  additionalPaths: async (config) => {
    const { supabase } = require('./src/lib/supabase');
    
    // Fetch all published blog posts
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, created_at, updated_at')
      .eq('is_published', true);

    // Transform blog posts into sitemap entries
    const blogPaths = (blogs || []).map(({ slug, updated_at, created_at }) => ({
      loc: `/blog/${slug}`,
      lastmod: new Date(updated_at || created_at).toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    return blogPaths;
  },
} 