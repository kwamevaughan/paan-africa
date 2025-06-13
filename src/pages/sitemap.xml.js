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

// Function to get all static pages
const getStaticPages = () => {
  const pagesDirectory = path.join(process.cwd(), 'src', 'pages');
  const pages = [];

  // Function to recursively get all pages
  const getPages = (dir, baseRoute = '') => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip api and internal Next.js directories
        if (!['api', '_'].includes(file)) {
          getPages(filePath, path.join(baseRoute, file));
        }
      } else if (stat.isFile() && /\.(js|jsx|ts|tsx)$/.test(file)) {
        // Skip special Next.js files and API routes
        if (!file.startsWith('_') && !file.startsWith('[') && file !== 'sitemap.xml.js') {
          // Convert file path to route
          let route = path.join(baseRoute, file.replace(/\.(js|jsx|ts|tsx)$/, ''));
          
          // Special handling for index files
          if (route === 'index') {
            route = ''; // Root index becomes empty string
          } else {
            route = route.replace(/\/index$/, ''); // Other index files just remove the index
          }

          // Skip thank-you page and other excluded pages
          if (['thank-you'].includes(route)) {
            return;
          }

          // Determine priority and change frequency based on route
          let priority = 0.8;
          let changefreq = 'weekly';

          // Adjust priority for important pages
          if (route === '') {
            priority = 1.0;
            changefreq = 'daily';
          } else if (route === 'blog') {
            priority = 0.9;
            changefreq = 'daily';
          } else if (['clients', 'summit'].includes(route)) {
            priority = 0.9;
          }

          pages.push({
            path: route,
            priority,
            changefreq
          });
        }
      }
    });
  };

  getPages(pagesDirectory);
  return pages;
};

const generateSiteMap = (blogs) => {
  const currentDate = new Date().toISOString();
  const staticPages = getStaticPages();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Static Routes -->
      ${staticPages.map(({ path, priority, changefreq }) => `
        <url>
          <loc>https://paan.africa${path ? `/${path}` : ''}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>
      `).join('')}

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