import { supabase } from "@/lib/supabase";
import { getAllPages } from '@/lib/getAllPages';

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

const generateSiteMap = (blogs, pages) => {
  const currentDate = new Date().toISOString();
  
  // Function to determine priority and change frequency based on route
  const getRoutePriority = (path) => {
    if (path === '') return { priority: 1.0, changefreq: 'daily' }; // Homepage
    if (path === 'blog') return { priority: 0.9, changefreq: 'daily' };
    if (['clients', 'summit'].includes(path)) return { priority: 0.9, changefreq: 'weekly' };
    return { priority: 0.8, changefreq: 'weekly' }; // Default
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Static Routes -->
      ${pages
        .filter(page => !page.startsWith('api/') && !page.startsWith('_') && !page.includes('[') && page !== 'sitemap.xml')
        .map(page => {
          const path = page.replace(/\.(js|jsx|ts|tsx)$/, '').replace(/\/index$/, '');
          const { priority, changefreq } = getRoutePriority(path);
          return `
            <url>
              <loc>https://paan.africa${path ? `/${path}` : ''}</loc>
              <lastmod>${currentDate}</lastmod>
              <changefreq>${changefreq}</changefreq>
              <priority>${priority}</priority>
            </url>
          `;
        })
        .join('')}

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

    // Get all pages using Next.js's getStaticPaths
    const pages = await getAllPages();

    // Generate the XML sitemap
    const sitemap = generateSiteMap(blogs || [], pages);

    // Set the appropriate headers
    res.setHeader('Content-Type', 'text/xml');
    // Cache the response for 1 hour but allow revalidation
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