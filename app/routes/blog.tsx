import { Outlet, useLocation } from "react-router";
import { BlogProvider, useBlogContext } from "../components/BlogContext";
import BlogList from "../components/BlogList";
import { getBaseMeta } from "../meta";

export function meta() {
  return getBaseMeta({
    title: "Blog | Cole Cianflone",
    description: "Read articles and guides on my portfolio blog.",
    url: "https://colecianflone.com/blog",
  });
}

export default function Blog() {
  return (
    <BlogProvider>
      <BlogContent />
    </BlogProvider>
  );
}

function BlogContent() {
  const { posts, loading, error } = useBlogContext();
  const location = useLocation();
  const isBlogIndex = location.pathname === "/blog";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog posts.</div>;

  return (
    <main>
      <section className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Blog</h1>
        {isBlogIndex && <BlogList posts={posts} />}
        <Outlet />
      </section>
    </main>
  );
}