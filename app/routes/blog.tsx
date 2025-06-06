import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import BlogList from "../components/BlogList";
import type { BlogMeta } from "../types/blog";

export function meta() {
  return [
    { title: "Blog | Cole Cianflone" },
    { name: "description", content: "Read articles and guides on my portfolio blog." },
    { property: "og:title", content: "Blog | Cole Cianflone" },
    { property: "og:description", content: "Read articles and guides on my portfolio blog." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/profile.jpg" },
    { property: "og:url", content: "https://colecianflone.com/blog" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Blog | Cole Cianflone" },
    { name: "twitter:description", content: "Read articles and guides on my portfolio blog." },
    { name: "twitter:image", content: "/profile.jpg" },
    { rel: "canonical", href: "https://colecianflone.com/blog" },
  ];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogMeta[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetch("/blog/blog-index.json")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  // Only show the list if we're exactly at /blog (not at /blog/:slug)
  const isBlogIndex = location.pathname === "/blog";

  return (
    <section className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Blog</h1>
      {isBlogIndex && <BlogList posts={posts} />}
      <Outlet />
    </section>
  );
}