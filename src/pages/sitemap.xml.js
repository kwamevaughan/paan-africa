const SitemapIndex = () => null;

export const getServerSideProps = async ({ res }) => {
  // Generate the sitemap index XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://paan.africa/sitemap-static.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://paan.africa/sitemap-blogs.xml</loc>
  </sitemap>
</sitemapindex>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

export default SitemapIndex; 