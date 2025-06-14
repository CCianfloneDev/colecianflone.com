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

  if (loading) return;
  if (error) return <div>Error loading blog posts.</div>;

  return (
    <main>
      <section className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          Blog
        </h1>
        {isBlogIndex && (
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Thoughts, tutorials and insights about software development.
            </p>
            <BlogList posts={posts} />
          </div>
        )}
        <Outlet />
      </section>
    </main>
  );
}