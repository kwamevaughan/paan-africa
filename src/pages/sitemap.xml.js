// pages/sitemap.xml.js
import path from "path";

export async function getServerSideProps({ res }) {
  const fs = await import("fs"); // Dynamically import to ensure server-side use
  const baseUrl = "https://paan.africa";

  const staticPages = getStaticPages(
    path.join(process.cwd(), "pages"),
    fs.default
  );
  const dynamicPages = await getDynamicPages();

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

  return { props: {} };
}

function getStaticPages(dir, fsModule, pages = [], basePath = "") {
  const files = fsModule.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fsModule.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith("[") && file !== "api") {
      getStaticPages(filePath, fsModule, pages, `${basePath}/${file}`);
    } else if (file.endsWith(".js") || file.endsWith(".tsx")) {
      const pagePath = `${basePath}/${file.replace(/\.(js|tsx)$/, "")}`;

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
  return [];
}

export default function Sitemap() {
  // This page will never be rendered, since getServerSideProps ends the response
  return null;
}
