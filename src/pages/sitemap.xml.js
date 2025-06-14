export default function handler(req, res) {
  // Set the content type to XML
  res.setHeader('Content-Type', 'application/xml');
  
  // Generate the sitemap index XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://paan.africa/sitemap-0.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://paan.africa/api/sitemap</loc>
  </sitemap>
</sitemapindex>`;

  // Send the sitemap index
  res.status(200).send(xml);
} 