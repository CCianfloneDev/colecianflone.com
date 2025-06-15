import fs from "fs";
import path from "path";

const RSS_URL = "https://colecianflone.com/rss.xml";
const blogIndexPath = path.join(process.cwd(), "app/blog/blog-index.json");

async function generateRSS() {
  const blogPosts = JSON.parse(fs.readFileSync(blogIndexPath, "utf8"));
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cole Cianflone's Blog</title>
    <link>https://colecianflone.com/blog</link>
    <description>Articles about web development, technology, and software engineering</description>
    <language>en-us</language>
    <atom:link href="${RSS_URL}" rel="self" type="application/rss+xml" />
    ${blogPosts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>https://colecianflone.com/blog/${post.slug}</link>
      <guid>https://colecianflone.com/blog/${post.slug}</guid>
      <pubDate>${new Date(post.isoDate).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      ${post.image ? `<image>
        <url>https://colecianflone.com${post.image.sizes.largeUrl}</url>
        <title>${post.image.alt}</title>
      </image>` : ''}
    </item>`).join('\n    ')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(process.cwd(), "public/rss.xml"), rss);
  console.log("✅ RSS feed generated at public/rss.xml");
}

generateRSS();