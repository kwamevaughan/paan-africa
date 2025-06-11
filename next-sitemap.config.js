/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://paan.africa",
  generateRobotsTxt: true,
  exclude: ["/thank-you"],
  // Add additional paths for blog posts
  additionalPaths: async (config) => {
    // This will be populated by the build process
    return [
      {
        loc: '/blog',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      // Add a pattern for blog posts
      {
        loc: '/blog/*',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    ];
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
