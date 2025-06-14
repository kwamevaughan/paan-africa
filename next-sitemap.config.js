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
  outDir: 'public',
  additionalPaths: async (config) => {
    return [
      {
        loc: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/blog',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/about',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/contact',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/privacy-policy',
        changefreq: 'weekly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/terms-of-service',
        changefreq: 'weekly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      }
    ];
  }
} 