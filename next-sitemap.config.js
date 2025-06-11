/** @type {import('next-sitemap').IConfig} */
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

module.exports = {
  siteUrl: "https://paan.africa",
  generateRobotsTxt: true,
  exclude: ["/thank-you"],
  // Add additional paths for blog posts
  additionalPaths: async (config) => {
    const result = [
      {
        loc: '/blog',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    ];

    try {
      // Fetch all published blog posts
      const { data: blogs, error } = await supabase
        .from('blogs')
        .select('slug, updated_at')
        .eq('is_published', true);

      if (error) throw error;

      // Add each blog post to the sitemap
      blogs.forEach(blog => {
        result.push({
          loc: `/blog/${blog.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: blog.updated_at || new Date().toISOString(),
        });
      });
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error);
    }

    return result;
  },
  // Configure robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you', '/api/*'],
      },
    ],
  },
};
