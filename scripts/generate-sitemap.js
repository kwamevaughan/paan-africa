const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const siteUrl = 'https://paan.africa';
const pagesDir = path.join(__dirname, '../src/pages');
const publicDir = path.join(__dirname, '../public');

// Get all page files
const pages = glob.sync('**/*.{js,jsx,ts,tsx}', {
  cwd: pagesDir,
  ignore: [
    '**/_*.{js,jsx,ts,tsx}', // Ignore Next.js special files
    '**/api/**', // Ignore API routes
    '**/sitemap*.{js,jsx,ts,tsx}', // Ignore sitemap files
    '**/\[*\]*.{js,jsx,ts,tsx}', // Ignore dynamic routes
  ],
});

// Convert file paths to URLs
const urls = pages.map(page => {
  // Remove file extension and convert to URL path
  const urlPath = page
    .replace(/\.(js|jsx|ts|tsx)$/, '')
    .replace(/\/index$/, '')
    .replace(/^index$/, '');
  
  // Skip if the path contains dynamic segments
  if (urlPath.includes('[') || urlPath.includes(']')) {
    return null;
  }
  
  return {
    loc: `${siteUrl}/${urlPath}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: urlPath === '' ? '1.0' : '0.7',
  };
}).filter(Boolean); // Remove null entries

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

// Write sitemap to public directory
fs.writeFileSync(path.join(publicDir, 'sitemap-0.xml'), sitemap);

console.log('Sitemap generated successfully!'); 