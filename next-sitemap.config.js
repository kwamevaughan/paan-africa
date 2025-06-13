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
  // The sitemap will be served from our API endpoint
  sitemapUrl: 'https://paan.africa/api/sitemap',
  additionalPaths: async (config) => {
    try {
      console.log('Starting to fetch blogs for sitemap...');
      const { supabase } = require('./src/lib/supabase');
      
      // Fetch all published blog posts
      const { data: blogs, error } = await supabase
        .from('blogs')
        .select('slug, created_at, updated_at')
        .eq('is_published', true);

      if (error) {
        console.error('Error fetching blogs for sitemap:', error);
        return [];
      }

      console.log(`Found ${blogs?.length || 0} published blogs`);

      // Transform blog posts into sitemap entries
      const blogPaths = (blogs || []).map(({ slug, updated_at, created_at }) => {
        const path = {
          loc: `/blog/${slug}`,
          lastmod: new Date(updated_at || created_at).toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        };
        console.log('Adding blog path to sitemap:', path);
        return path;
      });

      console.log(`Generated ${blogPaths.length} blog paths for sitemap`);
      return blogPaths;
    } catch (error) {
      console.error('Error in additionalPaths:', error);
      return [];
    }
  },
} 