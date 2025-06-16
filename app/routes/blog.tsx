import { Outlet, useLocation } from "react-router";
import { ResponsiveContainer } from "~/components/ResponsiveContainer";
import { BlogProvider, useBlogContext } from "../components/BlogContext";
import BlogList from "../components/BlogList";
import { getBaseMeta } from "../types/meta";
import type { CollectionPageSchema } from "../types/schema";
import { PageHeaderSkeleton, BlogListSkeleton } from "../components/Skeleton";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";

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
      <ResponsiveContainer maxWidth="4xl">
        <>
          <PageHeaderSkeleton />
          <BlogListSkeleton />
        </>
      </ResponsiveContainer>
    );
  }

  if (error) {
    return (
      <ResponsiveContainer maxWidth="4xl">
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Unable to load blog posts. Please try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer maxWidth="4xl">
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
          <div role="banner">
            <PageHeader 
              title="Blog"
              description="Thoughts, tutorials and insights about software development."
            />
          </div>
          <BlogList posts={posts} />
        </>
      ) : (
        <Outlet />
      )}
    </ResponsiveContainer>
  );
}

export default function Blog() {
  return (
    <BlogProvider>
      <BlogContent />
    </BlogProvider>
  );
}