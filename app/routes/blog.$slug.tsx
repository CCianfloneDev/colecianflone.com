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

  if (loading) return <div>Loading...</div>;
  if (!post) {
    return (
      <main>
        <section className="max-w-2xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Blog</h1>
          <p>Post not found.</p>
          <button
            className="mt-4 text-blue-600 underline"
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