// scripts/generate-sitemap.js
import fs from "fs";
import path from "path";

const baseUrl = "https://paan.africa";

const staticRoutes = [
  "/",
  "/about",
  "/opportunities",
  "/events",
  "/resources",
  "/offers",
  "/contact",
];

// You can also fetch dynamic routes from DB or CMS here
async function getDynamicRoutes() {
  return []; // e.g., [{ slug: 'event-1', updatedAt: '2024-05-01' }]
}

async function generateSitemap() {
  const dynamicRoutes = await getDynamicRoutes();

  const allRoutes = [
    ...staticRoutes.map((route) => ({
      url: route,
      lastModified: new Date().toISOString(),
      changeFreq: "weekly",
      priority: route === "/" ? "1.0" : "0.8",
    })),
    ...dynamicRoutes.map((route) => ({
      url: `/events/${route.slug}`,
      lastModified: route.updatedAt,
      changeFreq: "weekly",
      priority: "0.6",
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
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

  fs.writeFileSync(path.join("public", "sitemap.xml"), sitemap);
  console.log("✅ Sitemap written to public/sitemap.xml");
}

generateSitemap();
