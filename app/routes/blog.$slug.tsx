import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import BlogPost from "../components/BlogPost";
import type { BlogMeta } from "../types/blog";
import { getBaseMeta } from "../meta";
import { useBlogContext } from "../components/BlogContext";

export function meta({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return getBaseMeta({
    title: "Blog Post | Cole Cianflone",
    description: "Read this blog post on my portfolio.",
    url: `https://colecianflone.com/blog/${slug}`,
    type: "article",
  });
}

export default function BlogSlug() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts, loading } = useBlogContext();
  const [content, setContent] = useState<string>("");

  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      fetch(`/blog-content/${post.htmlFile}`)
        .then((res) => res.text())
        .then(setContent);
    } else {
      setContent("");
    }
  }, [post]);

  if (loading) {
    return (
      <main>
        <section className="max-w-2xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <section className="max-w-2xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight text-center">
            Post Not Found
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <button
            className="mx-auto block text-blue-600 hover:text-blue-700 dark:text-blue-400 
                     dark:hover:text-blue-300 font-medium transition-colors"
            onClick={() => navigate("/blog")}
          >
            ← Back to Blog List
          </button>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="max-w-2xl mx-auto px-6 py-8">
        {/* BlogPosting JSON-LD for SEO */}
        {post && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.description,
                "datePublished": post.date,
                "author": {
                  "@type": "Person",
                  "name": "Cole Cianflone"
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://colecianflone.com/blog/${post.slug}`
                }
              })
            }}
          />
        )}
        <BlogPost post={post} content={content} onBack={() => navigate("/blog")} />
      </section>
    </main>
  );
}