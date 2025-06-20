import fs from "fs";
import path from "path";

const BASE_URL = "https://colecianflone.com";
const staticRoutes = [
  "",
  "projects",
  "blog",
  "contact",
];

const blogIndexPath = path.join(process.cwd(), "app/data/blog-index.json");
const blogPosts = fs.existsSync(blogIndexPath)
  ? JSON.parse(fs.readFileSync(blogIndexPath, "utf8"))
  : [];

const urls = [
  ...staticRoutes.map((route) => `${BASE_URL}/${route}`.replace(/\/+$/, "/")),
  ...blogPosts.map((post) => `${BASE_URL}/blog/${post.slug}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => {
  // Determine frequency based on URL pattern
  let changefreq = "monthly";
  if (url === `${BASE_URL}/`) changefreq = "weekly";
  if (url.includes("/blog/")) changefreq = "monthly";
  
  return `<url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${url === BASE_URL ? "1.0" : "0.8"}</priority>
  </url>`;
}).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), sitemap);
console.log("✅ Sitemap generated at public/sitemap.xml");