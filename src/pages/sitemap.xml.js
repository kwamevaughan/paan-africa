import { supabase } from "@/lib/supabase";

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

const generateSiteMap = (blogs) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Static Routes -->
      <url>
        <loc>https://paan.africa</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://paan.africa/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>

      <!-- Dynamic Blog Posts -->
      ${blogs
        .map(({ slug, updated_at, created_at }) => {
          return `
            <url>
              <loc>https://paan.africa/blog/${slug}</loc>
              <lastmod>${getValidDate(updated_at || created_at)}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;
};

export async function getServerSideProps({ res }) {
  try {
    // Fetch all published blog posts
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, created_at, updated_at')
      .eq('is_published', true);

    if (error) throw error;

    // Generate the XML sitemap
    const sitemap = generateSiteMap(blogs || []);

    // Set the appropriate headers
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');
    
    // Write the sitemap content
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return {
      props: {},
    };
  }
}

// Default export to prevent next.js errors
export default function Sitemap() {
  return null;
} 