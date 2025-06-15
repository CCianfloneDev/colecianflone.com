import { Outlet, useLocation } from "react-router";
import { BlogProvider, useBlogContext } from "../components/BlogContext";
import BlogList from "../components/BlogList";
import { getBaseMeta } from "../types/meta";
import type { CollectionPageSchema } from "../types/schema";

export function meta() {
  return getBaseMeta({
    title: "Blog | Cole Cianflone",
    description:
      "Technical articles and insights by Cole Cianflone.",
    url: "https://colecianflone.com/blog",
    keywords:
      "Software Development Blog, Web Development Articles, React Tutorials, TypeScript Guide, Winnipeg Tech Scene, Software Engineering Blog, Cole Cianflone Blog",
    type: "blog",
  });
}

function BlogContent() {
  const { posts, loading, error } = useBlogContext();
  const location = useLocation();
  const isBlogIndex = location.pathname === "/blog";

  const blogSchema: CollectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | Cole Cianflone",
    description: "Read articles and guides on my portfolio blog.",
    url: "https://colecianflone.com/blog",
    author: {
      "@type": "Person",
      name: "Cole Cianflone",
      url: "https://colecianflone.com",
    },
    about: {
      "@type": "CreativeWork",
      name: "Software Development Articles",
      description:
        "Articles about web development, software engineering, and technology",
    },
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description || "",
      datePublished: post.isoDate,
      url: `https://colecianflone.com/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: "Cole Cianflone",
        url: "https://colecianflone.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://colecianflone.com/blog/${post.slug}`,
      },
    })),
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400">
        Error loading blog posts.
      </div>
    );
  }

  return (
    <>
      {isBlogIndex && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema),
          }}
        />
      )}
      {isBlogIndex ? (
        <>
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Blog
          </h1>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Thoughts, tutorials and insights about software development.
            </p>
            <BlogList posts={posts} />
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default function Blog() {
  return (
    <BlogProvider>
      <BlogContent />
    </BlogProvider>
  );
}