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
    A meme of a distracted boyfriend turning his back to VPC/Shared hosting and
    looking at Cloudflare workers.
  sizes:
    smallUrl: /blog-images/free-portfolio-small.webp
    mediumUrl: /blog-images/free-portfolio-medium.webp
    largeUrl: /blog-images/free-portfolio-large.webp
---

# How I Built My Portfolio Site for $0

Like most developers, I wanted a portfolio site but but paying ongoing fees for a personal site that might get a handful of visitors felt unnecessary. There are lots of cheap options ($5-10 monthly), but still, why?? The costs add up quickly for something that isn't generating revenue.

I kept thinking there had to be a better way and started exploring different options. Initially, I looked into using a VPC thinking I could set up something more cost-effective than shared hosting, but honestly it's overkill for a simple portfolio site. While cloud providers have reasonable free tiers, I found myself drawn to Cloudflare Workers' straightforward limit of 100,000 requests per day rather than trying to decode complex free tier restrictions and bandwidth calculations, or worry about hardening a server because I didn't want to pay for easy but more expensive shared hosting.

What I'll show you is how to build a portfolio site that costs nothing to run (no hosting fees, no monthly bills, nothing). The only optional cost is a custom domain, which you can purchase through Cloudflare for around $10-15 per year. You can skip that entirely and use their free subdomain if you prefer.

This approach also works well for testing side project ideas without committing to monthly bills upfront. If you end up with something that gets serious traffic (over 100,000 requests per day), you're probably ready to either upgrade to paid tiers or you've built something worth investing in properly.

## Table of Contents

**My Story & Experience:**
- [Why This Matters (Beyond Just Saving Money)](#why-this-matters-beyond-just-saving-money "Learn about the benefits beyond cost savings")
- [My Experience with VPC (And Why They Weren't Right for Me)](#my-experience-with-vpc-and-why-they-werent-right-for-me "Why I chose against VPC hosting solutions")
- [The "Aha" Moment with Cloudflare Workers](#the-aha-moment-with-cloudflare-workers "Discovering Cloudflare Workers' generous free tier")
- [What I Actually Built](#what-i-actually-built "Overview of the final portfolio site features")
- [Performance Optimizations That Made a Difference](#performance-optimizations-that-made-a-difference "Key optimizations for speed and user experience")
- [Why This Approach Works for SaaS Ideas](#why-this-approach-works-for-saas-ideas "Using this setup for testing side project ideas")
- [Final Thoughts](#final-thoughts "Reflections on the entire process")

**Complete Technical Guide:**
- [Prerequisites](#prerequisites "What you need installed before starting")
- [Installation](#installation "Getting the code and dependencies set up")
- [Running the Project](#running-the-project "Starting local development server")
- [Project Structure](#project-structure "Understanding how the codebase is organized")
- [Writing Blog Posts](#writing-blog-posts "How to create and publish new blog content")
- [Technology Stack Breakdown](#technology-stack-breakdown "Detailed overview of all libraries and tools used")
- [Deploying to Cloudflare Workers](#deploying-to-cloudflare-workers "Step-by-step deployment instructions")
- [Configuration Files](#configuration-files "Understanding the project configuration")

## Why This Matters (Beyond Just Saving Money)

Sure, avoiding monthly bills is nice, but there are other benefits that made this whole experiment worthwhile.

If you're working on side projects, starting with free infrastructure means you can actually test ideas without committing to ongoing costs before you even know if anyone cares about what you're building. This removes the financial barrier to experimentation.

Learning a new tool and way of deployment is always good, why not?

Once it's set up, there's practically nothing to maintain. No servers to update, no security patches to worry about, no monitoring dashboards.

My requirements were straightforward: look decent and professional, load fast, cost nothing to maintain, be easy to update when I actually write something, and handle blog posts without needing a database.

## My Experience with VPC (And Why They Weren't Right for Me)

Before landing on Cloudflare Workers, I spent some time exploring VPC setups thinking they might be more cost-effective than traditional shared hosting solutions. On paper, it seemed like I could get more control over my infrastructure while potentially saving money.

I should mention that I'm comfortable with VPC setups and have used them for other projects before. This wasn't about technical capability. After diving into the documentation and pricing for various cloud providers[\^6] [\^7], I realized VPC setups were probably overkill for what I needed. The free tiers looked generous on the surface with decent compute instances, storage, and CDN usage. But here's what made me hesitate.

Setting up VPC infrastructure, configuring security groups, managing instances, it was all just more work than I wanted to do and I didn't want to worry about it just to host a simple site. The free tiers have so many moving parts and conditions that I spent more time trying to understand billing scenarios and setting up alerts, than actually building anything.

While free tiers include bandwidth, I couldn't shake the feeling that I might accidentally exceed limits or misconfigure something and get hit with surprise charges. Even with managed services, there's still updates, security considerations, and monitoring to think about.

What drew me to Cloudflare Workers was the simplicity. 100,000 requests per day felt like a number I could understand and feel comfortable with. With VPC hosting, I kept second-guessing whether my usage patterns would stay within free tier bounds or if some configuration mistake would cost me money.

For a personal portfolio that might get a few visitors per day, I wanted something I could set up once and forget about, something that wouldn't require me to become an infrastructure expert.

## The "Aha" Moment with Cloudflare Workers

It was like the goldie locks story, kinda? I knew that comitting to $5-10 monthly for shared hosting would be too expensive in the long run, but configuring a VPC was over-complicated for what I wanted. Cloudflare workers, were just right.

I actually first started with Cloudflare pages, which is more simple to setup but I was experiencing some issues with my blog and how CF pages serves content. CF workers also seemed cool because it supports SSR and full-stack applications. I gave it a shot after looking a their free tier limits, it was quite generous. According to Cloudflare's official documentation[\^2], the free tier includes 100,000 requests per day, global edge network distribution, custom domains with free SSL, no servers to manage, and a built-in CDN.

For a personal portfolio that might get a few dozen visits a day, those limits are more than sufficient. Free to host, and I could sleep easy at night knowing I didn't have to worry about accidentally configuring my server and being hacked or whatever. Thats all I wanted.

## What I Actually Built

After going through this process, I ended up with something that covers the basics for a developer portfolio.

The development experience includes local development with hot reload, TypeScript for catching errors early, a simple deployment process, and zero server maintenance.

For visitors, the site offers fast loading times globally, works well on mobile devices, includes basic accessibility features, and has a clean, professional appearance.

Cost-wise, there are no monthly hosting costs, no build pipeline costs, no CDN costs, and no SSL certificate costs. The only optional expense is $10-15 yearly for a custom domain through Cloudflare, though you can stick with their free subdomain.

## Performance Optimizations That Made a Difference

Working within free tier constraints pushed me toward some solutions that actually worked quite well. I spent time optimizing especially for mobile users and people on slower connections.

Instead of relying on external services, everything gets pre-rendered and served from Cloudflare's edge network. HTML loads quickly, images are optimized automatically through a conversion script that creates WebP versions at different sizes.

I also added skeleton loaders to improve how fast things feel while content loads, and spent time optimizing for Core Web Vitals, particularly trying to improve Largest Contentful Paint (LCP) and First Contentful Paint (FCP) times[\^3].

Font loading can make sites feel sluggish. Instead of linking to Google Fonts, I went with self-hosted Inter fonts[\^4] that I subsetted to just the characters I actually need. This cuts the font file size significantly, which is especially important for mobile users or anyone on limited data plans.

I kept the JavaScript minimal but added some touches that improve the overall feel. Simple page transitions, dark mode that follows system preferences, skeleton loaders for better perceived performance, responsive design that works well on everything from phones to large monitors, and basic loading states so things don't feel broken.

The build process handles the standard SEO components automatically. It generates sitemaps, creates Open Graph tags for social sharing, adds basic structured data, optimizes images with proper alt tags, and creates RSS feeds.

I worked to get good Lighthouse[\^5] scores and solid mobile performance, covering the basics that search engines care about.

## Why This Approach Works for SaaS Ideas

This setup is also useful for testing out SaaS ideas, though there are some considerations about building more complex applications.

Cloudflare offers D1 (their managed, serverless database with SQLite's SQL semantics)[\^1] [\^8] and Workers KV for data storage, which is suitable for many projects but something to keep in mind. Workers KV is designed for high-read, low-write scenarios with global distribution[\^2].

Starting free means no infrastructure costs while you figure out if your idea has potential. Cloudflare's paid tiers are reasonable ($5/month for 10 million requests according to their pricing page). Edge computing knowledge transfers to other projects, and your app works well everywhere from day one.

You might need to migrate if you need complex database operations or more than 10GB of data, if you require specific Node.js packages that aren't compatible with the Workers runtime, if you hit performance limitations that can't be worked around, or if you need more than the CPU time limits per request.

If you're consistently hitting 100,000+ requests per day, you're probably ready to think about monetization anyway, and by then you'll have a better sense of whether the platform constraints work for your specific use case.

## Final Thoughts

What started as wanting to avoid monthly hosting bills turned into a good learning experience about modern web deployment. Working within free service constraints led to solutions that were both cost-effective and surprisingly performant.

This approach works well for personal portfolios and project showcases, simple blogs and content sites, landing pages for side projects, testing ideas before committing to paid infrastructure, and learning about edge computing and modern deployment.

The code is open source if you want to use it. Clone it, customize it, add your content, and you could have a portfolio running this afternoon.

Sometimes working within constraints leads to simpler, more maintainable solutions than just throwing money at the problem.

---

*Questions or want to share how you adapted this? I'd love to hear about it. The code is on GitHub if you want to take a look.*

---

# Complete Setup Guide

Ready to build your own? Here's everything you need, step by step.

## Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/ "Download Node.js - JavaScript runtime for building applications") (v14 or higher)
- [Visual Studio Code](https://code.visualstudio.com/ "Download Visual Studio Code - Free source code editor") (or whatever editor you prefer)
- [npm](https://www.npmjs.com/ "npm - Node.js package manager") (comes with Node.js)
- A GitHub account (for version control)
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

Visit [http://localhost:3000](http://localhost:3000 "View your portfolio site locally in development mode") and you'll see your site running locally. Hot reload is enabled, so changes show up instantly without needing to manually refresh.

## Project Structure

Here's how everything is organized:

```
/app/            # React components, routes, and styles
  /components/   # Reusable UI components
  /routes/       # Page components and routing
  /types/        # TypeScript type definitions
  /blog/         # Blog index JSON file
/.react-router/  # React Router configuration (git ignored)
/.src-images/    # Source images for blog posts (original files) (files git ignored)
.wrangler/       # Cloudflare Workers configuration (git ignored)
/workers/        # Edge function logic
public/         
  /blog/         # Your markdown blog posts
  /blog-content/ # Generated HTML versions of blog posts
  /blog-images/  # Converted WebP images in multiple sizes
  /fonts/        # Self-hosted Inter font files (woff2)
  sitemap.xml    # Auto-generated sitemap
  rss.xml        # Auto-generated RSS feed
build/           # Production build output (git ignored)
  /client/       # Client-side bundles
  /server/       # Server-side rendering
scripts/         # Build and optimization scripts
  build-blog-index.js    # Generates blog index and HTML
  convert-blog-image.js  # Converts images to WebP
  generate-rss.js        # Creates RSS feed
  generate-sitemap.js    # Creates sitemap
```

The structure is intentionally simple with no unnecessary complexity to wade through.

## Writing Blog Posts

The blog system is straightforward to use.

Create a new `.md` file in `/public/blog/` with frontmatter like this:

```markdown
---
title: My Post
slug: my-post
description: A short summary
readTime: 5-minute read
image:
  alt: Image description
---

# My Post

Your content here.
```

Add your image to the `.src-images/` folder and name it the same as your slug (e.g., `my-post.png`). The system supports `.png`, `.jpg`, and `.jpeg` formats.

Run `npm run build` and the system automatically:
- Converts your image to WebP in three sizes
- Converts your markdown to HTML
- Updates the blog index
- Regenerates the RSS feed
- Updates the sitemap

No database, no manual image resizing. Just write and build.

## Technology Stack Breakdown

Here's what powers this setup and why each piece matters.

The core framework uses [Vite](https://vitejs.dev/ "Vite - Next generation frontend tooling") for lightning fast builds and dev server, [React](https://react.dev/ "React - The library for web and native user interfaces") for component-based UI that's industry standard, [TypeScript](https://www.typescriptlang.org/ "TypeScript - JavaScript with syntax for types") to catch bugs before they hit production, and [React Router](https://reactrouter.com/ "React Router - Declarative routing for React") for file-based routing.

For styling and content, I'm using [Tailwind CSS](https://tailwindcss.com/ "Tailwind CSS - Utility-first CSS framework") as a utility-first CSS framework that speeds up development, [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography "Tailwind CSS Typography - Beautiful typographic defaults") to make blog content look professional, [Inter Font](https://rsms.me/inter/ "Inter - A free and open source font family") for clean, readable typography, [marked](https://marked.js.org/ "marked - A markdown parser built for speed") for fast Markdown processing, and [gray-matter](https://github.com/jonschlinkert/gray-matter "gray-matter - Parse front-matter from strings or files") for handling blog post metadata.

Build and optimization tools include [github-slugger](https://github.com/Flet/github-slugger "github-slugger - Generate URL slugs like GitHub") for creating anchor links for headings, [html-minifier-terser](https://github.com/terser/html-minifier-terser "html-minifier-terser - Minify HTML files") for optimizing HTML for speed, [fast-glob](https://github.com/mrmlnc/fast-glob "fast-glob - Fast and efficient glob library") for efficiently finding blog posts, and [Sharp](https://sharp.pixelplumbing.com/ "Sharp - High performance image processing") for handling image optimization.

Everything here has generous free tiers that work well for personal projects.

## Deploying to Cloudflare Workers

This is where the magic happens. Cloudflare Workers gives you enterprise-grade infrastructure for free.

### Step-by-Step Deployment

Install and authenticate Wrangler:
```bash
npm install -g wrangler
npx wrangler login
```

Generate types (optional but helpful for TypeScript):
```bash
npm run cf-typegen
```

Build your project:
```bash
npm run build
```

Deploy:
```bash
npm run deploy
```

Your site goes live at `https://your-worker.your-account.workers.dev` completely free and fully functional.

If you want a custom domain, you can buy one directly through Cloudflare for around $10-15 per year. In your [Cloudflare dashboard](https://dash.cloudflare.com/ "Cloudflare Dashboard - Manage your Cloudflare account"), go to Workers & Pages and add your custom domain under Triggers.

The free `.workers.dev` subdomain works perfectly fine if you want to keep it completely free. I used the free subdomain for months before getting a custom domain.

## Configuration Files

These files control the build and deployment process:
- `wrangler.json` for Cloudflare Workers settings
- `vite.config.ts` for build configuration
- `tsconfig.json` for TypeScript settings
- `package.json` for dependencies and scripts
- `worker-configuration.d.ts` for TypeScript types for Workers

You probably won't need to modify these unless you want to customize specific behavior.

[\^1]: [Cloudflare Blog – Building D1, a Global Database](https://blog.cloudflare.com/building-d1-a-global-database/)
[\^2]: [Cloudflare Workers Free Tier Limits](https://developers.cloudflare.com/workers/platform/limits/)
[\^3]: [Google Core Web Vitals Guide](https://web.dev/vitals/)
[\^4]: [Inter Font GitHub Repository](https://github.com/rsms/inter)
[\^5]: [Lighthouse Performance Tool](https://developers.google.com/web/tools/lighthouse/)
[\^6]: [AWS Free Tier Details](https://aws.amazon.com/free/)
[\^7]: [Google Cloud Free Tier](https://cloud.google.com/free)
[\^8]: [Cloudflare D1 Query Performance Improvements](https://developers.cloudflare.com/changelog/2025-01-07-d1-faster-query/)
