---
title: Getting started with my portfolio
slug: getting-started
description: A guide of how I built this portfolio.
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
- [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)
  - [1. Push Your Code to GitHub](#1-push-your-code-to-github)
  - [2. Create a New Project on Cloudflare Pages](#2-create-a-new-project-on-cloudflare-pages)
  - [3. Configure Build Settings](#3-configure-build-settings)
  - [4. Set Environment Variables (Optional)](#4-set-environment-variables-optional)
  - [5. Save and Deploy](#5-save-and-deploy)
  - [6. Configure Custom Domain (Optional)](#6-configure-custom-domain-optional)
- [Notes](#notes)

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

## Deploying to Cloudflare Pages

You can easily deploy this project to [Cloudflare Pages](https://pages.cloudflare.com/):

### 1. Push Your Code to GitHub

Make sure your latest changes are committed and pushed to your GitHub repository.

### 2. Create a New Project on Cloudflare Pages

- Go to [Cloudflare Pages](https://pages.cloudflare.com/) and log in.
- Click **Create a project** and connect your GitHub repository.
- Select your `colecianflone-portfolio` repository.

### 3. Configure Build Settings

- **Framework preset:** *None* (or "Other")
- **Build command:**  
  ```
  npm run build
  ```
- **Build output directory:**  
  ```
  build/client
  ```
- **Root directory:**  
  ```
  ./
  ```

### 4. Set Environment Variables (Optional)

If you use any environment variables, add them under "Environment Variables".

### 5. Save and Deploy

Click **Save and Deploy**. Cloudflare Pages will install dependencies, build your project, and deploy it.

### 6. Configure Custom Domain (Optional)

After deployment, you can add a custom domain in the Cloudflare Pages dashboard.

---

## Notes

- The production build outputs static assets to `build/client` and server code to `build/server`.
- For Cloudflare Pages, only static assets in `build/client` are deployed.
- If you need SSR or API endpoints, consider deploying with a Node server on a platform like [Fly.io](https://fly.io/) or [Railway](https://railway.app/).

---

Thanks for checking out my portfolio!