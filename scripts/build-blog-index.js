import fs from "fs";
import path from "path";
import matter from "gray-matter";
import fg from "fast-glob";
import { fileURLToPath } from "url";
import { marked } from "marked"; // Add this import

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, "../public/blog");
const OUTPUT_FILE = path.join(BLOG_DIR, "blog-index.json");

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

async function buildIndex() {
  const files = await fg("*.md", { cwd: BLOG_DIR });
  const posts = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    // Use last modified date of the file, formatted as dd-MMM-yyyy
    const stats = fs.statSync(filePath);
    const formattedDate = formatDate(stats.mtime);

    // Render markdown to HTML
    const html = marked(content);

    return {
      title: data.title || file.replace(/\.md$/, ""),
      slug: data.slug || file.replace(/\.md$/, ""),
      file,
      date: formattedDate,
      description: data.description || "",
      html,
    };
  });

  // Sort by date descending
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`Wrote ${posts.length} posts to ${OUTPUT_FILE}`);
}

buildIndex();