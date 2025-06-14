---
title: "Skip the Monthly Bills: How I Built My Portfolio Site for Absolutely Free"
slug: "free-portfolio"
description: "A practical guide to building a portfolio site with React, TypeScript and Cloudflare Workers—completely free. Includes performance optimization tips and deployment strategies."
readTime: "10-minute read"
---

# How I Built My Portfolio Site for $0

When I started planning my portfolio site, I looked at the usual suspects: shared hosting, VPS providers, static site hosts. Every option seemed to have the same pattern—reasonable upfront costs that quickly added up with monthly fees, SSL certificates, CDN services, and performance upgrades.

For a personal portfolio that might get a few hundred visitors a month, paying $5-15+ every month felt like overkill. I wanted something professional and fast, but I also wanted to see if I could build it without recurring costs eating into my budget over time.

That's when I discovered Cloudflare Workers and realized I could build something genuinely professional without the monthly bills. Here's how I did it—and how you can too.

## Table of Contents

- [Why I Went the Free Route](#why-i-went-the-free-route)
- [Discovering Cloudflare Workers](#discovering-cloudflare-workers)
- [My Performance Optimization Journey](#my-performance-optimization-journey)
  - [Content Delivery](#content-delivery)
  - [Typography & Fonts](#typography--fonts)
  - [User Interface](#user-interface)
  - [Build Process](#build-process)
- [What You'll Actually Build](#what-youll-actually-build)
- [The Complete Setup Guide](#the-complete-setup-guide)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Project Structure](#project-structure)
  - [Writing Blog Posts](#writing-blog-posts)
- [Technology Stack Explained](#technology-stack-explained)
- [Deploying to Cloudflare Workers](#deploying-to-cloudflare-workers)
- [SEO and Performance Features](#seo-and-performance-features)
- [Configuration Files](#configuration-files)
- [Final Thoughts](#final-thoughts)

## Why I Went the Free Route

My requirements were simple: I needed a portfolio site that looked professional, loaded fast, and could handle a blog. But as I researched options, I kept running into the same pattern—monthly fees that seemed reasonable at first but would add up to hundreds of dollars over a few years.

Traditional shared hosting felt sluggish and came with weird limitations. Static site generators were appealing, but most still required paid hosting for decent performance. Serverless platforms had free tiers, but they were either too limited or confusing to set up properly.

I wanted something that was:
- Actually free (not "free for 12 months")
- Fast and reliable
- Easy to maintain
- Professional looking
- Capable of handling both static pages and a blog

## Discovering Cloudflare Workers

That's when I stumbled across Cloudflare Workers. At first, I thought it was just for enterprise applications, but their free tier is genuinely generous:

- 100,000 requests per day
- Global edge network (your site loads fast everywhere)
- Custom domains with free SSL certificates
- No cold starts or server management
- Built-in CDN

The catch? There isn't really one for personal projects. The free tier limits are higher than most portfolio sites will ever hit.

Setting it up was surprisingly straightforward once I figured out the right approach. Instead of trying to run a full server, I built a static site that gets served from their edge network worldwide.

## My Performance Optimization Journey

Building this site became an unexpected deep dive into web performance. Working within the constraints of free services pushed me to find efficient solutions I might have otherwise overlooked.

### Content Delivery
Rather than relying on external services, I focused on static generation and smart caching:
- Pre-rendered HTML pages for instant loading
- All assets served through Cloudflare's CDN
- Minified files where it made sense
- Responsive images that adapt to different screen sizes

### Typography & Fonts
Font loading can make or break your site's perceived speed. Instead of using Google Fonts (which requires external requests), I went with self-hosted fonts:
- Self-hosted Inter font files stored locally
- Font preloading for critical text
- Proper font-display strategies
- Optimized WOFF2 format for smaller file sizes

### User Interface
I kept the JavaScript minimal but added touches that make the site feel modern:
- Subtle page transitions that don't get in the way
- Dark mode that respects system preferences
- Progressive enhancement (everything works without JavaScript)
- Clean, accessible design that works for everyone

### Build Process
The build system handles content generation automatically:
- Markdown files get converted to optimized HTML
- Blog index gets generated from frontmatter
- CSS gets optimized with Tailwind's purging
- Everything gets minified and ready for deployment

The results exceeded my expectations:
- Excellent Lighthouse scores across all metrics
- Sub-second page loads from anywhere in the world
- Great mobile performance
- Solid accessibility ratings

## What You'll Actually Build

After finishing this project, I realized I'd created something that checks all the boxes for a modern developer portfolio:

**For You as a Developer:**
- Modern development experience with hot reload
- TypeScript for better code completion and error catching
- Simple deployment process that just works
- No server management or maintenance headaches

**For Your Visitors:**
- Lightning-fast loading times
- Seamless experience across all devices
- Accessible to users with disabilities
- Professional appearance that reflects well on your work

**For Your Wallet:**
- $0 monthly hosting costs
- $0 build pipeline costs
- $0 CDN costs
- $0 SSL certificate costs

## The Complete Setup Guide

Ready to build your own? Here's everything you need to know, step by step.

### Prerequisites

- [Node.js](https://nodejs.org/ "Download Node.js - JavaScript runtime for building applications") (v14 or higher)
- [Visual Studio Code](https://code.visualstudio.com/ "Download Visual Studio Code - Free source code editor")
- [npm package manager](https://www.npmjs.com/ "npm - Node.js package manager") or [yarn package manager](https://yarnpkg.com/ "Yarn - Fast, reliable package manager")
- A GitHub account (for version control)
- A Cloudflare account (free tier works perfectly)

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
  /styles/       # CSS and font declarations
  /types/        # TypeScript type definitions
/public/         
  /blog/         # Your markdown blog posts + generated HTML
  /fonts/        # Self-hosted Inter font files (woff2)
  /images/       # Static images and icons
/scripts/        # Build and optimization scripts
```

The structure is intentionally straightforward—no unnecessarily complex folder hierarchies to navigate.

### Writing Blog Posts

All blog posts live in `/public/blog/` as Markdown files. The workflow is simple:

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
   - All Markdown files get parsed and converted
   - HTML versions are generated for fast serving
   - A searchable blog index is created
   - Everything gets optimized for performance

No database to maintain, no CMS to update, no security patches to worry about—just write and build.

## Technology Stack Explained

Here's what powers this portfolio and why each piece matters:

**Core Framework:**
- **[Vite build tool and development server](https://vitejs.dev/ "Vite - Next generation frontend tooling")** - Lightning-fast build tool and dev server
- **[React JavaScript library](https://react.dev/ "React - The library for web and native user interfaces")** - Component-based UI for interactive interfaces
- **[TypeScript programming language](https://www.typescriptlang.org/ "TypeScript - JavaScript with syntax for types")** - Better code completion and catches errors at compile time
- **[React Router for navigation](https://reactrouter.com/ "React Router - Declarative routing for React")** - File-based routing and navigation

**Styling & Content:**
- **[Tailwind CSS framework](https://tailwindcss.com/ "Tailwind CSS - Utility-first CSS framework")** - Utility-first CSS framework
- **[Tailwind Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography "Tailwind CSS Typography - Beautiful typographic defaults")** - Beautiful prose styling for blog content
- **[Inter Font Family](https://rsms.me/inter/ "Inter - A free and open source font family")** - Modern, highly readable typeface
- **[marked Markdown parser](https://marked.js.org/ "marked - A markdown parser built for speed")** - Fast Markdown parser for build scripts
- **[gray-matter frontmatter parser](https://github.com/jonschlinkert/gray-matter "gray-matter - Parse front-matter from strings or files")**  - Parses frontmatter from Markdown files

**Build & Optimization:**
- **[github-slugger for URL slugs](https://github.com/Flet/github-slugger "github-slugger - Generate URL slugs like GitHub")** - Generates heading anchor links
- **[html-minifier-terser for optimization](https://github.com/terser/html-minifier-terser "html-minifier-terser - Minify HTML files")** - Minifies HTML for performance
- **[fast-glob for file searching](https://github.com/mrmlnc/fast-glob "fast-glob - Fast and efficient glob library")** - Efficient file finding for blog posts

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

5. **Add a custom domain** (optional - this is the only part that costs money)
   - Purchase a domain from any registrar (usually $10-15/year)
   - Go to your [Cloudflare dashboard](https://dash.cloudflare.com/ "Cloudflare Dashboard - Manage your Cloudflare account")
   - Navigate to Workers & Pages > your Worker > Triggers
   - Add your custom domain
   
   *Note: This is the only optional cost in the entire setup. You can use the free `workers.dev` subdomain forever if you prefer to keep it completely free.*

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
- Self-hosted Inter font with optimal loading strategy
- Font preloading for critical content
- Responsive images with proper sizing
- Minified assets
- CDN delivery via Cloudflare's global network
- Minimal JavaScript required for hydration
- Page transition animations with GPU acceleration

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

This approach works well for:
- Personal portfolios
- Project showcases
- Simple blogs
- Landing pages

The code is open source and ready to use. You can clone the repository, customize the design, add your content, deploy to Cloudflare, and have a professional portfolio running in an afternoon.

Building something great doesn't always require a budget—sometimes it just needs curiosity and willingness to learn from constraints.

---

*Questions or suggestions? Feel free to reach out. The code is available on GitHub, and I'm always interested in hearing how others adapt it for their needs.*