/** @type {import('next-sitemap').IConfig} */
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Helper function to ensure valid date format
const getValidDate = (date) => {
  try {
    if (!date) return new Date().toISOString();
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      console.warn('Invalid date encountered:', date);
      return new Date().toISOString();
    }
    return parsedDate.toISOString();
  } catch (error) {
    console.error('Error parsing date:', error);
    return new Date().toISOString();
  }
};

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
        lastmod: getValidDate(new Date()),
      }
    ];

    try {
      // Fetch all published blog posts with both created_at and updated_at
      const { data: blogs, error } = await supabase
        .from('blogs')
        .select('slug, created_at, updated_at')
        .eq('is_published', true);

      if (error) throw error;

      // Add each blog post to the sitemap
      blogs.forEach(blog => {
        // Use updated_at if available, otherwise fall back to created_at
        const lastModified = blog.updated_at || blog.created_at;
        result.push({
          loc: `/blog/${blog.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: getValidDate(lastModified),
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
