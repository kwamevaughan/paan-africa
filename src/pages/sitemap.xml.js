import { NextResponse } from 'next/server';

export async function GET() {
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

  // Return the XML with the correct content type
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 