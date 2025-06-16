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
const BLOG_IMAGES_DIR = path.join(__dirname, "../public/blog-images"); // Directory for blog post images
const OUTPUT_FILE = path.join(__dirname, "../app/data/blog-index.json"); // Output file for blog index

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return {
    formatted: `${day}-${month}-${year}`,
    iso: date.toISOString() // Add ISO 8601 format
  };
}

async function buildIndex() {
  // Ensure blog, HTML, and app/blog directories exist
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
  if (!fs.existsSync(BLOG_HTML_DIR)) {
    fs.mkdirSync(BLOG_HTML_DIR, { recursive: true });
  }

  const appBlogDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(appBlogDir)) {
    fs.mkdirSync(appBlogDir, { recursive: true });
  }

  const files = await fg("*.md", { cwd: BLOG_DIR });
  const posts = await Promise.all(files.map(async (file) => {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(/\.md$/, "");

    // Check if converted images exist
    const smallWebp = path.join(BLOG_IMAGES_DIR, `${slug}-small.webp`);
    const mediumWebp = path.join(BLOG_IMAGES_DIR, `${slug}-medium.webp`);
    const largeWebp = path.join(BLOG_IMAGES_DIR, `${slug}-large.webp`);

    // Update image sizes in the frontmatter if WebP files exist
    if (fs.existsSync(smallWebp) && fs.existsSync(mediumWebp) && fs.existsSync(largeWebp)) {
      const imageData = {
        alt: data.image?.alt || "",
        sizes: {
          smallUrl: `/blog-images/${slug}-small.webp`,
          mediumUrl: `/blog-images/${slug}-medium.webp`,
          largeUrl: `/blog-images/${slug}-large.webp`
        }
      };

      // Update the markdown frontmatter
      const updatedFrontmatter = {
        ...data,
        image: imageData
      };

      const updatedContent = matter.stringify(content, updatedFrontmatter);
      fs.writeFileSync(filePath, updatedContent);
      data.image = imageData;
    }

    // Use last modified date of the file, formatted as dd-MMM-yyyy
    const stats = fs.statSync(filePath);
    const dates = formatDate(stats.mtime);

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

    // Write HTML file to the dedicated HTML directory instead of blog directory
    const htmlFileName = file.replace(/\.md$/, ".html");
    fs.writeFileSync(path.join(BLOG_HTML_DIR, htmlFileName), html);

    // Return object that matches BlogMeta type
    return {
      title: data.title || file.replace(/\.md$/, ""),
      slug: data.slug || file.replace(/\.md$/, ""),
      file,
      htmlFile: htmlFileName,
      date: dates.formatted,
      isoDate: dates.iso,
      description: data.description || "",
      readTime: data.readTime || "",
      image: data.image ? {
        alt: data.image.alt || "",
        sizes: data.image.sizes || {
          smallUrl: "",
          mediumUrl: "",
          largeUrl: ""
        }
      } : undefined
    };
  }));

  // Sort by date descending (using ISO date for accuracy)
  posts.sort((a, b) => (new Date(a.isoDate) < new Date(b.isoDate) ? 1 : -1));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`✅ Generated blog index with ${posts.length} posts`);
}

buildIndex();