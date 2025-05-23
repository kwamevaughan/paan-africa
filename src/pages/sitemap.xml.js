// pages/api/sitemap.xml.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const baseUrl = "https://paan.africa";

  // Get static pages
  const pagesDirectory = path.join(process.cwd(), "pages");
  const staticPages = getStaticPages(pagesDirectory);

  // Get dynamic content (replace with your data source)
  const dynamicPages = getDynamicPages();

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map((page) => {
    return `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
}

function getStaticPages(dir, pages = [], basePath = "") {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith("[") && file !== "api") {
      // Recursively get pages from subdirectories
      getStaticPages(filePath, pages, `${basePath}/${file}`);
    } else if (file.endsWith(".js") || file.endsWith(".tsx")) {
      const pagePath = `${basePath}/${file.replace(/\.(js|tsx)$/, "")}`;

      // Skip API routes, dynamic routes, and special files
      if (
        !file.startsWith("[") &&
        file !== "_app.js" &&
        file !== "_document.js" &&
        file !== "404.js"
      ) {
        pages.push({
          url: pagePath === "/index" ? "/" : pagePath,
          lastModified: stat.mtime.toISOString(),
          changeFreq: "weekly",
          priority: pagePath === "/index" ? "1.0" : "0.8",
        });
      }
    }
  });

  return pages;
}

async function getDynamicPages() {
  try {
    // Example: Fetch from your CMS or database
    // const posts = await fetchBlogPosts()
    // return posts.map(post => ({
    //   url: `/blog/${post.slug}`,
    //   lastModified: post.updatedAt,
    //   changeFreq: 'weekly',
    //   priority: '0.6'
    // }))

    return [];
  } catch (error) {
    console.error("Error fetching dynamic pages:", error);
    return [];
  }
}
