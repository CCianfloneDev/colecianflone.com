---
title: Getting started with my portfolio
slug: getting-started
description: A guide of how I built this portfolio.
---
# Getting Started

Welcome to my portfolio blog! This guide will help you get started with the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
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

- `/public/blog/` — Blog posts in Markdown
- `/app/` — Source code (routes, components, styles)
- `/public/` — Static assets (images, manifest, etc.)
- `/build/` — Production build output (after running `npm run build`)

## Contributing

Feel free to open issues or submit pull requests!

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