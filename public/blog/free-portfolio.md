---
title: "Skip the Monthly Bills: How I Built My Portfolio Site for Absolutely Free"
slug: "free-portfolio"
description: "A step-by-step guide to building a professional portfolio site with React, TypeScript and Cloudflare Workers—completely free. Includes performance optimization tips and deployment strategies."
readTime: "10-minute read"
---
# How I Built My Portfolio Site for $0 (Because I'm Cheap)

Let's be real—I'm cheap. When I needed a portfolio site to showcase my work, monthly hosting fees just seemed wasteful. After some experimentation, I managed to build a fast, professional portfolio that costs me absolutely nothing to host. Here's exactly how I did it, and how you can too.

## Table of Contents

- [My Story: Why Free Everything?](#my-story-why-free-everything)
- [The Performance Journey](#the-performance-journey)
- [What You'll Actually Build](#what-youll-actually-build)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Writing Blog Posts](#writing-blog-posts)
- [Technology Stack Explained](#technology-stack-explained)
- [Deploying to Cloudflare Workers](#deploying-to-cloudflare-workers)
- [SEO and Performance Features](#seo-and-performance-features)
- [Configuration Files](#configuration-files)
- [Next Steps](#next-steps)

---

## My Story: Why Free Everything?

Sure, I could have paid for premium hosting, but why would I when free alternatives work just as well? My goals were straightforward:
- Fast loading times (nobody waits for slow sites)
- Professional appearance (first impressions matter)
- SEO-friendly (discoverability is key)
- **Zero ongoing costs** (why pay when you don't have to?)

Turns out, you can achieve all of this without spending a dime.

## The Performance Journey

I'll be honest—I got a bit obsessed with optimization. But fast sites just feel better to use, and the engineering challenge was fun.

### Version 1: The Naive Approach
Initially, I loaded markdown files in the browser and parsed them with JavaScript. It worked, but:
- Extra JavaScript to download
- Slower initial page loads  
- Questionable SEO

### Version 2: Pre-compiled JSON
I got smarter and pre-compiled everything to JSON at build time:
- Faster loading (no client-side parsing)
- Better SEO (content ready to inject)
- Still had to fetch and inject at runtime

### Version 3: Full Static Generation
The current approach pre-renders everything to static HTML:
- Instant page loads from CDN
- Perfect SEO (content in initial HTML)
- Minimal JavaScript needed

**The result?** PageSpeed scores in the 90s and loading times under 1 second globally. Pretty satisfying for a free setup.

## What You'll Actually Build

After building this, I realized I'd accidentally created something pretty useful:

**For Developers:**
- Modern stack with excellent developer experience
- Hot reload for quick iteration
- TypeScript for better code completion and catching errors at compile time
- Straightforward build process

**For Users:**
- Fast loading times
- Works seamlessly on any device
- Proper SEO optimization
- Clean, professional appearance

**For Your Budget:**
- $0 monthly hosting costs
- $0 build pipeline costs
- $0 CDN costs
- $0 SSL certificate costs

---

# The Complete Setup Guide

Ready to build your own? Here's everything you need to know, step by step.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A GitHub account (for deployment)
- A Cloudflare account (free tier works perfectly)

## Installation

```bash
git clone https://github.com/CCianfloneDev/colecianflone.com.git
cd colecianflone.com
npm install
```

## Running the Project

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site. Hot reload is enabled, so changes show up instantly—no manual refreshing needed.

## Project Structure

```
/public/blog/    # Your markdown blog posts + generated files
/app/            # React components, routes, and styles
/public/         # Static assets (images, favicon, etc.)
/build/          # Production build output
/scripts/        # Build scripts for blog processing
```

Clean and straightforward—no unnecessarily complex folder structures to navigate.

## Writing Blog Posts

All blog posts live in `/public/blog/` as Markdown files. Here's the workflow:

1. **Create a new `.md` file**
   ```markdown
   ---
   title: My Awesome Post
   slug: my-awesome-post
   description: A short summary for SEO and social sharing
   ---
   
   # My Awesome Post
   
   Your content goes here! Use regular Markdown syntax.
   ```

2. **Build the blog**
   ```bash
   npm run build
   ```

3. **What happens automatically:**
   - All Markdown files are parsed
   - HTML versions are generated for fast serving
   - A searchable blog index is created
   - Everything is optimized for performance

No database, no CMS, no maintenance headaches—just write and build.

## Technology Stack Explained

Here's what powers this portfolio and why each piece matters:

**Core Framework:**
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[React](https://react.dev/)** - Component-based UI for interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Better code completion and catches errors at compile time
- **[React Router](https://reactrouter.com/)** - File-based routing and navigation

**Styling & Content:**
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)** - Beautiful prose styling for blog content
- **[marked](https://marked.js.org/)** - Fast Markdown parser for build scripts
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Parses frontmatter from Markdown files

**Build & Optimization:**
- **[github-slugger](https://github.com/Flet/github-slugger)** - Generates heading anchor links
- **[html-minifier-terser](https://github.com/terser/html-minifier-terser)** - Minifies HTML for performance
- **[fast-glob](https://github.com/mrmlnc/fast-glob)** - Efficient file finding for blog posts

The beauty of this setup? Everything has generous free tiers, and you'll realistically never hit the limits for a personal portfolio.

## Deploying to Cloudflare Workers

Cloudflare Workers is genuinely free for personal projects and offers:
- Unlimited requests (up to 100,000/day on free tier)
- Global edge network
- Custom domains
- SSL certificates
- No cold starts

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
   - Go to your Cloudflare dashboard
   - Navigate to Workers & Pages > your Worker > Triggers
   - Add your custom domain

## SEO and Performance Features

Built-in optimizations that work automatically:

**Automatic Sitemap Generation**
- Creates `sitemap.xml` with all pages and blog posts
- Updates automatically when you add content
- Helps search engines discover everything

**Rich Metadata**
- Open Graph tags for social media previews
- Twitter Card support
- Proper canonical URLs and descriptions
- JSON-LD structured data for blog posts

**Performance Optimizations**
- Pre-rendered HTML for instant loading
- Minified assets
- CDN delivery via Cloudflare's global network
- Minimal JavaScript required for hydration

## Configuration Files

These files control different aspects of the build and deployment:

- **`wrangler.json`** - Cloudflare Workers deployment settings
- **`vite.config.ts`** - Build configuration and dev server
- **`tsconfig.json`** - TypeScript compiler options
- **`package.json`** - Dependencies and build scripts
- **`worker-configuration.d.ts`** - TypeScript types for Worker environment

You probably won't need to modify these unless you want to customize specific behavior.

## Next Steps

Ready to build your own free portfolio? Here's what I recommend:

1. **Fork or clone the repo** - Start with a working foundation
2. **Customize the design** - Make it yours with Tailwind utilities
3. **Add your content** - Projects, blog posts, about page, contact info
4. **Deploy to Cloudflare Workers** - Follow the deployment guide above
5. **Point your domain** - Or use the free `.workers.dev` subdomain

The whole process takes about an hour if you're focused, maybe a weekend if you want to really customize the design.

Remember: being frugal doesn't mean compromising on quality. Sometimes it just means being smart about your resources. You don't need to spend money to have a professional web presence that loads fast, looks great, and ranks well in search engines.

Plus, when you can explain your deployment pipeline and performance optimizations in interviews, that's always a nice conversation starter.

---

*Have questions about the setup or want to share your own free portfolio? Drop me a line—I'd love to see what you build.*