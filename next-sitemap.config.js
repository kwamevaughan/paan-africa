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
  ]
} 