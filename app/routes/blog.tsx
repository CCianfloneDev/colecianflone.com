import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import BlogList from "../components/BlogList";

type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  file: string;
};

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