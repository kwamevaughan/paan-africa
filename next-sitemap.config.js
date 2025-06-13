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
  generateIndexSitemap: true,
  // Add our dynamic blog sitemap to the index
  additionalSitemaps: [
    'https://paan.africa/api/sitemap'
  ],
  // Ensure the sitemap index includes our additional sitemaps
  transform: async (config, path) => {
    // For the sitemap index, add our additional sitemaps
    if (path === 'sitemap.xml') {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs,
        additionalSitemaps: config.additionalSitemaps
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs,
    };
  }
} 