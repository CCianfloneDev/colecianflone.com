---
title: Making and hosting this portfolio site for free!
slug: free-portfolio
description: A guide of how I built this portfolio and host it for completely free.
---
# Getting Started

Welcome to my portfolio blog! This guide will help you get up and running with the project, and share a bit about my journey building it.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Writing and Building Blog Posts](#writing-and-building-blog-posts)
- [Technology Stack](#technology-stack)
- [Performance and Blog Rendering Evolution](#performance-and-blog-rendering-evolution)
- [Deploying to Cloudflare Workers](#deploying-to-cloudflare-workers)
  - [1. Push Your Code to GitHub](#1-push-your-code-to-github)
  - [2. Install Wrangler and Authenticate](#2-install-wrangler-and-authenticate)
  - [3. Generate Cloudflare Types](#3-generate-cloudflare-types)
  - [4. Build the Project](#4-build-the-project)
  - [5. Deploy to Cloudflare Workers](#5-deploy-to-cloudflare-workers)
  - [6. Configure Custom Domain (Optional)](#6-configure-custom-domain-optional)
- [Notes](#notes)
- [SEO and Metadata](#seo-and-metadata)
- [Configuration Files Explained](#configuration-files-explained)
- [Credits](#credits)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

```bash
git clone https://github.com/colecianflone/colecianflone-portfolio.git
cd colecianflone-portfolio
npm install
```

## Running the Project

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Folder Structure

- `/public/blog/` — Blog posts in Markdown, plus auto-generated `blog-index.json` and `.html` files (created by the build script)
- `/app/` — Source code (routes, components, styles)
- `/public/` — Static assets (images, manifest, etc.)
- `/build/` — Production build output (after running `npm run build`)

---

## Writing and Building Blog Posts

All blog posts live in the `/public/blog/` directory as Markdown (`.md`) files. To add a new post:

1. **Create a Markdown file** in `/public/blog/` (for example, `my-new-post.md`).  
   Include frontmatter at the top for metadata:
   ```markdown
   ---
   title: My New Post
   slug: my-new-post
   description: A short summary of my new post.
   ---
   # My New Post

   Content goes here!
   ```

2. **Build the blog index and HTML files**  
   Run:
   ```bash
   npm run build
   ```
   This triggers the `build-blog-index.js` script, which:
   - Parses all Markdown files in `/public/blog/`
   - Generates a `blog-index.json` file with metadata for each post
   - Pre-renders each post as a static `.html` file in `/public/blog/`

3. **Deploy or run your site**  
   The blog index and HTML files are now ready for fast, SEO-friendly serving.

**In short:**  
Just add your Markdown files to `/public/blog/`, run `npm run build`, and everything else is handled for you!

---

## Technology Stack

This portfolio is built with a modern, high-performance stack designed for developer productivity and a great user experience:

- **[Vite](https://vitejs.dev/):** Lightning-fast build tool and dev server.
- **[React](https://react.dev/):** Component-based UI library for building interactive interfaces.
- **[React Router](https://reactrouter.com/):** File-based routing and navigation for React apps.
- **[TypeScript](https://www.typescriptlang.org/):** Type-safe JavaScript for better maintainability and reliability.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for rapid UI development.
- **[@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography):** Beautifully styled prose for blog content.
- **[marked](https://marked.js.org/):** Fast Markdown parser for Node.js, used in the blog build script.
- **[gray-matter](https://github.com/jonschlinkert/gray-matter):** Parses frontmatter metadata from Markdown files.
- **[github-slugger](https://github.com/Flet/github-slugger):** Generates GitHub-style heading slugs for anchor links.
- **[html-minifier-terser](https://github.com/terser/html-minifier-terser):** Minifies generated HTML for optimal performance.
- **[fast-glob](https://github.com/mrmlnc/fast-glob):** Efficient file globbing for finding blog posts.
- **[Cloudflare Pages](https://pages.cloudflare.com/):** Static hosting with a global CDN for instant delivery.

**Why this stack?**  
Every choice here is about speed, reliability, and developer happiness. From instant hot reloads in development to zero-config static deployment, this stack lets me focus on building features and delivering a great experience.

---

## Performance and Blog Rendering Evolution

One of my main goals with this portfolio was to deliver a fast, seamless experience for every visitor. This led me to iterate on how blog content is rendered, always with performance and optimization in mind.

### Initial Approach: Client-Side Markdown Rendering

When I first built the blog, each post was stored as a Markdown file. The React blog component would fetch the Markdown at runtime, parse it in the browser, and render it as HTML. While this approach was simple and flexible, it had some drawbacks:

- **Extra JavaScript:** The browser had to download a Markdown parser and process content on the client.
- **Slower First Paint:** Users had to wait for the fetch and parsing before seeing the blog content.
- **SEO Limitations:** Search engines might not see the fully rendered content.

### Step 2: Pre-rendering HTML into a JSON Index

To address these issues, I wrote a build script that pre-parsed all Markdown files into HTML at build time. The script generated a `blog-index.json` file containing metadata and HTML for each post. Now, the blog component could fetch this JSON and instantly render the HTML, eliminating the need for client-side Markdown parsing.

- **Benefits:**  
  - Faster load times (no client-side parsing)
  - Smaller JS bundles
  - Improved SEO (content is ready to inject)
- **Still room for improvement:**  
  - The browser still had to fetch the JSON and inject HTML at runtime.
  - As the blog grows, the JSON file could become large due to embedded HTML for many posts.

### Step 3: Full Static HTML Pre-rendering

Pushing optimization further, I updated the build process to output a static HTML file for each blog post. Now, when a user visits a blog post, the server (or CDN) serves a fully pre-rendered HTML file—no client-side fetching or parsing required.

- **Benefits:**  
  - Instant content delivery from the CDN
  - Minimal JavaScript required for hydration
  - Best possible SEO (content is always present in the initial HTML)
  - Reduced runtime complexity

### Why This Matters

This evolution—from client-side Markdown rendering, to pre-rendered JSON, to fully static HTML—shows my drive for performance and optimization. Each step reduced client work, improved SEO, and made the site more robust and scalable. I’m always looking for ways to make the user experience faster and more reliable, and this journey is a great example of that mindset in action.

---

## Deploying to Cloudflare Workers

You can easily deploy this project to [Cloudflare Workers](https://workers.cloudflare.com/):

### 1. Push Your Code to GitHub

Make sure your latest changes are committed and pushed to your GitHub repository.

### 2. Install Wrangler and Authenticate

Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/) globally if you haven't already:

```bash
npm install -g wrangler
```

Log in to your Cloudflare account:

```bash
npx wrangler login
```

### 3. Generate Cloudflare Types

Generate TypeScript types for your Cloudflare Worker environment bindings:

```bash
npm run cf-typegen
```

This command runs Wrangler's type generation, producing or updating the `worker-configuration.d.ts` file.  
It provides type safety and autocompletion for environment variables, KV namespaces, and other bindings defined in your `wrangler.json`.  
Keeping these types up to date helps prevent runtime errors and improves your development experience.

### 4. Build the Project

Generate the production build:

```bash
npm run build
```

This will output static assets to `build/client` and server code to `build/server`.

### 5. Deploy to Cloudflare Workers

Deploy your Worker using Wrangler:

```bash
npm run deploy
```
Or directly:
```bash
npx wrangler deploy
```

Your app will be available at your Workers subdomain (e.g., `https://your-worker.your-account.workers.dev`) or a custom domain if configured.

### 6. Configure Custom Domain (Optional)

You can add a custom domain to your Worker in the Cloudflare dashboard under Workers & Pages > your Worker > Triggers > Custom Domains.

---

## Notes

- The production build outputs static assets to `build/client` and server code to `build/server`.
- For Cloudflare Workers, both static assets and server code can be deployed, depending on your routing setup.
- If you need SSR or API endpoints, Cloudflare Workers is ideal for edge-side rendering and APIs.

---

## SEO and Metadata

This project includes several features and scripts to improve SEO and metadata for better discoverability and sharing:

- **Automatic Sitemap Generation**  
  The script `scripts/generate-sitemap.js` runs at build time and generates a `public/sitemap.xml` file.
  - It includes all static routes (like `/`, `/projects`, `/blog`, `/contact`) and dynamically adds all blog post URLs by reading `public/blog/blog-index.json`.
  - This helps search engines efficiently crawl and index all pages and blog posts.

- **Dynamic Metadata with meta.ts**  
  The `app/meta.ts` file provides a utility function for generating consistent meta tags for each page and blog post.
  - It sets Open Graph, Twitter Card, canonical, and description tags based on the page’s content.
  - Blog posts and pages use this to ensure rich previews on social media and accurate search engine snippets.

- **Structured Data for Blog Posts**  
  Blog post pages inject [JSON-LD](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) structured data using the [BlogPosting](https://schema.org/BlogPosting) schema.
  - This is handled in the blog post route and helps Google and other search engines understand your content for rich results.

- **Pre-rendered HTML for Blog Content**  
  Blog posts are pre-rendered to static HTML at build time, ensuring that search engines and social media scrapers see the full content immediately—no client-side rendering required.

**Summary:**  
With these efforts, your portfolio is optimized for SEO, social sharing, and discoverability out of the box.

---

## Configuration Files Explained

This project uses several configuration files to manage building, type checking, and deployment:

- **wrangler.json**  
  Configures Cloudflare Workers deployment.  
  - `name`: Worker name  
  - `main`: Entry point for the Worker (e.g., `build/server/index.js`)  
  - `compatibility_date`: Ensures consistent runtime behavior  
  - `routes`: (optional) Custom domains/routes

- **vite.config.ts**  
  Handles Vite build and dev server settings, including React, HMR, and SSR.

- **tsconfig.json / tsconfig.node.json / tsconfig.cloudflare.json**  
  TypeScript configuration for different environments.  
  - `tsconfig.json`: Base config  
  - `tsconfig.node.json`: Node-specific overrides  
  - `tsconfig.cloudflare.json`: Cloudflare Worker-specific overrides

- **package.json**  
  Project metadata, scripts, and dependencies.

- **worker-configuration.d.ts**  
  TypeScript declarations for Worker environment bindings.

---

## Credits

This portfolio project was built using and inspired by the [React Router + Cloudflare Workers Starter Template](https://github.com/cloudflare/templates/tree/main/react-router-starter-template).  
Special thanks to the maintainers of that template for providing a solid foundation for modern, full-stack React apps on Cloudflare Workers.

---

Thanks for checking out my portfolio!