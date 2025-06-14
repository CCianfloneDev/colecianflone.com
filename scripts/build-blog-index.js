import fs from "fs";
import path from "path";
import matter from "gray-matter";
import fg from "fast-glob";
import { fileURLToPath } from "url";
import { marked } from "marked";
import GithubSlugger from "github-slugger";
import { minify } from "html-minifier-terser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, "../public/blog"); // Directory containing Markdown blog posts
const BLOG_HTML_DIR = path.join(__dirname, "../public/blog-content"); // Directory to output HTML files
const OUTPUT_FILE = path.join(BLOG_DIR, "blog-index.json");

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

async function buildIndex() {
  // Ensure the HTML output directory exists
  if (!fs.existsSync(BLOG_HTML_DIR)) {
    fs.mkdirSync(BLOG_HTML_DIR, { recursive: true });
  }

  const files = await fg("*.md", { cwd: BLOG_DIR });
  const posts = await Promise.all(files.map(async (file) => {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    // Use last modified date of the file, formatted as dd-MMM-yyyy
    const stats = fs.statSync(filePath);
    const formattedDate = formatDate(stats.mtime);

    // Use github-slugger for heading IDs
    const slugger = new GithubSlugger();
    slugger.reset();

    marked.use({
      renderer: {
        heading(token) {
          const slug = slugger.slug(token.text);
          return `<h${token.depth} id="${slug}">${token.text}</h${token.depth}>\n`;
        },
      },
    });

    const html = await minify(marked(content), {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });

    // Write HTML file for this post to blog-content directory
    const htmlFileName = file.replace(/\.md$/, ".html");
    fs.writeFileSync(path.join(BLOG_HTML_DIR, htmlFileName), html);

    return {
      title: data.title || file.replace(/\.md$/, ""),
      slug: data.slug || file.replace(/\.md$/, ""),
      file,
      htmlFile: htmlFileName,
      date: formattedDate,
      description: data.description || "",
      readTime: data.readTime || "",
    };
  }));

  // Sort by date descending
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`Wrote ${posts.length} posts to ${OUTPUT_FILE} and individual HTML files in blog-content.`);
}

buildIndex();