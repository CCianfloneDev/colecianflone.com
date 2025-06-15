---
title: 'Skip the Monthly Bills: How I Built My Portfolio Site for Absolutely Free'
slug: free-portfolio
description: >-
  A practical guide to building a portfolio site with React, TypeScript and
  Cloudflare Workers—completely free. Includes performance optimization tips and
  deployment strategies.
readTime: 12-minute read
image:
  alt: >-
    A diagram showing the architecture of a free portfolio site using Cloudflare
    Workers
  sizes:
    smallUrl: /blog-images/free-portfolio-small.webp
    mediumUrl: /blog-images/free-portfolio-medium.webp
    largeUrl: /blog-images/free-portfolio-large.webp
---

# How I Built My Portfolio Site for $0

When I started planning my portfolio site, I hit the same wall every developer faces: those "reasonable" monthly costs that add up fast. Shared hosting, VPS providers, static site hosts—they all follow the same pattern. What starts as $5-15 a month becomes hundreds of dollars over a few years, and that's before you factor in SSL certificates, CDN services, and performance upgrades.

For a personal portfolio that might get a few hundred visitors monthly, those recurring costs felt like overkill. I wanted something professional and fast, but I also wanted to see if I could build it without bleeding money every month.

Then I discovered Cloudflare Workers and realized I could build something genuinely professional without any monthly bills. Here's exactly how I did it—and how you can too.

## Table of Contents

- [Why Free Made Sense](#why-free-made-sense)
- [The Cloudflare Workers Discovery](#the-cloudflare-workers-discovery)
- [What You'll Actually Build](#what-youll-actually-build)
- [Performance and SEO Optimization](#performance-and-seo-optimization)
- [Complete Setup Guide](#complete-setup-guide)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Project Structure](#project-structure)
  - [Writing Blog Posts](#writing-blog-posts)
- [Technology Stack Breakdown](#technology-stack-breakdown)
- [Deploying to Cloudflare Workers](#deploying-to-cloudflare-workers)
- [Configuration Files](#configuration-files)
- [Final Thoughts](#final-thoughts)

## Why Free Made Sense

My requirements were straightforward: professional appearance, fast loading, and blog capability. But every option I researched had the same problem—costs that seemed reasonable at first but would compound into serious money over time.

Traditional shared hosting felt sluggish and came with weird limitations. Static site generators were appealing, but most still required paid hosting for decent performance. Serverless platforms had free tiers, but they were either too restrictive or confusing to set up properly.

I needed something that was:
- Actually free (not "free for 12 months")
- Fast and reliable worldwide
- Easy to maintain long-term
- Professional looking
- Capable of handling both static pages and a blog

## The Cloudflare Workers Discovery

Cloudflare Workers initially seemed like enterprise-only territory, but their free tier is surprisingly generous:

- 100,000 requests per day
- Global edge network (fast loading everywhere)
- Custom domains with free SSL certificates
- No cold starts or server management
- Built-in CDN

The catch? There really isn't one for personal projects. The free tier limits are higher than most portfolio sites will ever hit.

Setting it up was more straightforward than expected once I figured out the right approach. Instead of trying to run a full server, I built a static site that gets served from their edge network worldwide.

## What You'll Actually Build

After finishing this project, I realized I'd created something that checks all the boxes for a modern developer portfolio:

**Developer Experience:**
- Modern development with hot reload
- TypeScript for better code completion and error catching
- Simple deployment that just works
- Zero server management headaches

**Visitor Experience:**
- Lightning-fast loading times
- Seamless experience across all devices
- Accessible to users with disabilities
- Professional appearance that reflects well on your work

**Financial Reality:**
- $0 monthly hosting costs
- $0 build pipeline costs
- $0 CDN costs
- $0 SSL certificate costs
- (Optional) $10-15 yearly for a custom domain 

## Performance and SEO Optimization

Building this site became an unexpected journey into web performance and search optimization. Working within free service constraints pushed me toward solutions that were not only cost-effective but genuinely better.

### Performance Deep Dive

**Content Delivery Strategy**
Rather than relying on external services, I focused on static generation and smart caching. Pre-rendered HTML pages load instantly, all assets flow through Cloudflare's CDN, and responsive images adapt to different screen sizes automatically.

**Typography Approach**
Font loading can make or break perceived speed. Instead of Google Fonts (which requires external requests), I went with self-hosted Inter font files. This means font preloading for critical text, proper font-display strategies, and optimized WOFF2 format for smaller file sizes.

**User Interface**
I kept JavaScript minimal but added touches that make the site feel modern: subtle page transitions that don't get in the way, dark mode that respects system preferences.

**Build Process Automation**
The build system handles content generation automatically. Markdown files convert to optimized HTML, the blog index generates from frontmatter, CSS gets optimized with Tailwind's purging, and everything gets minified for deployment.

### Built-in SEO Features

These search optimization features work automatically without any configuration:

**Automatic Sitemap Generation**
Creates `sitemap.xml` with all pages and blog posts, updates automatically when you add content, and helps search engines discover everything.

**Rich Metadata**
Includes Open Graph tags for social media previews, Twitter Card support, proper canonical URLs and descriptions, and JSON-LD structured data for blog posts.

**Performance as SEO**
Search engines favor fast sites, and this setup delivers: pre-rendered HTML for instant loading, self-hosted Inter font with optimal loading strategy, font preloading for critical content, responsive images with proper sizing, minified assets, CDN delivery via Cloudflare's global network, minimal JavaScript required for hydration, and smooth page transitions.

The results exceeded expectations: excellent Lighthouse scores across all metrics, sub-second page loads globally, great mobile performance, and solid accessibility ratings—all factors that search engines love.

## Complete Setup Guide

Ready to build your own? Here's everything you need, step by step.

### Prerequisites

- [Node.js](https://nodejs.org/ "Download Node.js - JavaScript runtime for building applications") (v14 or higher)
- [Visual Studio Code](https://code.visualstudio.com/ "Download Visual Studio Code - Free source code editor")
- [npm](https://www.npmjs.com/ "npm - Node.js package manager") or [yarn](https://yarnpkg.com/ "Yarn - Fast, reliable package manager")
- GitHub account (for version control)
- Cloudflare account (free tier works perfectly)

### Installation

```bash
git clone https://github.com/CCianfloneDev/colecianflone.com.git
cd colecianflone.com
npm install
```

### Running the Project

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000 "View your portfolio site locally in development mode") to see your site. Hot reload is enabled, so changes show up instantly—no manual refreshing needed.

### Project Structure

```
/app/            # React components, routes, and styles
  /components/   # Reusable UI components
  /routes/       # Page components and routing
  /types/        # TypeScript type definitions
/.react-router/  # React Router configuration (git ignored)
/.src-images/    # Source images for blog posts (original files) (files git ignored)
.wrangler/       # Cloudflare Workers configuration (git ignored)
/workers/        # Edge function logic
public/         
  /blog/         # Your markdown blog posts
  /blog-content/ # Generated HTML versions of blog posts
  /blog-images/  # Converted WebP images in multiple sizes
  /fonts/        # Self-hosted Inter font files (woff2)
build/           # Production build output (git ignored)
  /client/       # Client-side bundles
  /server/       # Server-side rendering
scripts/         # Build and optimization scripts
```

The structure is intentionally straightforward—no unnecessarily complex folder hierarchies to navigate.

### Writing Blog Posts

All blog posts live in `/public/blog/` as Markdown files. The workflow is beautifully simple:

1. **Create a new `.md` file**
   ```markdown
   ---
   title: My Awesome Post
   slug: my-awesome-post
   description: A short summary for SEO and social sharing
   readTime: 5-minute read
   image:
     alt: A description of your image for accessibility
   ---
   
   # My Awesome Post
   
   Your content goes here! Use regular Markdown syntax.
   ```

2. **Add your blog image**
   - Place your image in the `.src-images/` folder
   - Name it exactly the same as your blog post's slug (e.g., `my-awesome-post.png`)
   - Supported formats: `.png`, `.jpg`, `.jpeg`

3. **Build the blog**
   ```bash
   npm run build
   ```

4. **What happens automatically:**
   - Your source image converts to three WebP sizes (400px, 800px, 1200px wide)
   - Image paths are automatically added to your blog post's frontmatter
   - Markdown files convert to optimized HTML
   - Blog index updates with all metadata
   - Everything gets optimized for performance

No database to maintain, no image resizing to handle, no manual WebP conversion—just write your content and add your original image.

**Example Blog Post with Image:**

```markdown
---
title: 'My First Blog Post'
slug: my-first-post
description: 'An example blog post showing image usage.'
readTime: '5-minute read'
image:
  alt: 'A beautiful landscape photo'
  # These sizes are automatically added during build
  sizes:
    smallUrl: '/blog-images/my-first-post-small.webp'
    mediumUrl: '/blog-images/my-first-post-medium.webp'
    largeUrl: '/blog-images/my-first-post-large.webp'
---

# My First Blog Post

Your content here...
```

The corresponding image would be: `.src-images/my-first-post.png`

## Technology Stack Breakdown

Here's what powers this portfolio and why each piece matters:

**Core Framework:**
- **[Vite](https://vitejs.dev/ "Vite - Next generation frontend tooling")** - Lightning-fast build tool and dev server
- **[React](https://react.dev/ "React - The library for web and native user interfaces")** - Component-based UI for interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/ "TypeScript - JavaScript with syntax for types")** - Better code completion and catches errors at compile time
- **[React Router](https://reactrouter.com/ "React Router - Declarative routing for React")** - File-based routing and navigation

**Styling & Content:**
- **[Tailwind CSS](https://tailwindcss.com/ "Tailwind CSS - Utility-first CSS framework")** - Utility-first CSS framework
- **[Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography "Tailwind CSS Typography - Beautiful typographic defaults")** - Beautiful prose styling for blog content
- **[Inter Font](https://rsms.me/inter/ "Inter - A free and open source font family")** - Modern, highly readable typeface
- **[marked](https://marked.js.org/ "marked - A markdown parser built for speed")** - Fast Markdown parser for build scripts
- **[gray-matter](https://github.com/jonschlinkert/gray-matter "gray-matter - Parse front-matter from strings or files")** - Parses frontmatter from Markdown files

**Build & Optimization:**
- **[github-slugger](https://github.com/Flet/github-slugger "github-slugger - Generate URL slugs like GitHub")** - Generates heading anchor links
- **[html-minifier-terser](https://github.com/terser/html-minifier-terser "html-minifier-terser - Minify HTML files")** - Minifies HTML for performance
- **[fast-glob](https://github.com/mrmlnc/fast-glob "fast-glob - Fast and efficient glob library")** - Efficient file finding for blog posts

The beauty of this setup? Everything has generous free tiers, and you'll realistically never hit the limits for a personal portfolio.

## Deploying to Cloudflare Workers

Cloudflare Workers is genuinely free for personal projects and offers unlimited requests (up to 100,000/day on free tier), global edge network, custom domains, SSL certificates, and no cold starts.

### Step-by-Step Deployment

1. **Install and authenticate Wrangler**
   ```bash
   npm install -g wrangler
   npx wrangler login
   ```

2. **Generate Cloudflare types** (optional but recommended)
   ```bash
   npm run cf-typegen
   ```

3. **Build your project**
   ```bash
   npm run build
   ```

4. **Deploy to Workers**
   ```bash
   npm run deploy
   ```

Your site will be live at `https://your-worker.your-account.workers.dev`

5. **Add a custom domain** (optional)
   - Purchase a domain from any registrar (usually $10-15/year)
   - Go to your [Cloudflare dashboard](https://dash.cloudflare.com/ "Cloudflare Dashboard - Manage your Cloudflare account")
   - Navigate to Workers & Pages > your Worker > Triggers
   - Add your custom domain
   
   *Note: This is the only optional cost in the entire setup. You can use the free `workers.dev` subdomain forever if you prefer to keep it completely free.*

## Configuration Files

These files control different aspects of the build and deployment:

- **`wrangler.json`** - Cloudflare Workers deployment settings
- **`vite.config.ts`** - Build configuration and dev server
- **`tsconfig.json`** - TypeScript compiler options
- **`package.json`** - Dependencies and build scripts
- **`worker-configuration.d.ts`** - TypeScript types for Worker environment

You probably won't need to modify these unless you want to customize specific behavior.

## Final Thoughts

What started as a quest to avoid monthly hosting bills turned into a deep dive into modern web development. The constraints of free services pushed me toward solutions that were not only cost-effective but genuinely better—faster loading times, simpler maintenance, and a more pleasant development experience.

This approach works particularly well for personal portfolios, project showcases, simple blogs, and landing pages. The code is open source and ready to use. You can clone the repository, customize the design, add your content, deploy to Cloudflare, and have a professional portfolio running in an afternoon.

Sometimes the best solutions come from working within constraints rather than throwing money at problems. Building something great doesn't always require a budget—sometimes it just needs curiosity and willingness to learn from limitations.

---

*Questions or suggestions? Feel free to reach out. The code is available on GitHub, and I'm always interested in hearing how others adapt it for their needs.*
