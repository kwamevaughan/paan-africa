/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://paan.africa',
  generateRobotsTxt: true,
  exclude: ['/thank-you', '/pricing', '/api/*', '/sitemap.xml', '/sitemap-blogs.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you', '/pricing', '/api/*'],
      },
    ],
    additionalSitemaps: [
      'https://paan.africa/sitemap-blogs.xml'
    ]
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  outDir: 'public', 
  sitemapBaseFileName: 'sitemap-static'
} 