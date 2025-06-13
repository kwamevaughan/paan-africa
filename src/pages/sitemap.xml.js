import { supabase } from "@/lib/supabase";
import fs from 'fs';
import path from 'path';

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

export async function getServerSideProps({ res }) {
  try {
    // Read the static sitemap
    const staticSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const staticSitemap = fs.readFileSync(staticSitemapPath, 'utf8');

    // Fetch all published blog posts
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, created_at, updated_at')
      .eq('is_published', true);

    if (error) throw error;

    // Generate blog posts XML
    const blogPostsXml = blogs
      .map(({ slug, updated_at, created_at }) => `
        <url>
          <loc>https://paan.africa/blog/${slug}</loc>
          <lastmod>${getValidDate(updated_at || created_at)}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `)
      .join('');

    // Combine static sitemap with blog posts
    const combinedSitemap = staticSitemap.replace(
      '</urlset>',
      `${blogPostsXml}</urlset>`
    );

    // Set the appropriate headers
    res.setHeader('Content-Type', 'text/xml');
    // Cache the response for 1 hour but allow revalidation
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');
    
    // Write the sitemap content
    res.write(combinedSitemap);
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