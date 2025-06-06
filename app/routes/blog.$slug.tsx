import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import BlogPost from "../components/BlogPost";
import type { BlogMeta } from "../types/blog";

export function meta({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return [
    { title: "Blog Post | Cole Cianflone" },
    { name: "description", content: "Read this blog post on my portfolio." },
    { property: "og:title", content: "Blog Post | Cole Cianflone" },
    { property: "og:description", content: "Read this blog post on my portfolio." },
    { property: "og:type", content: "article" },
    { property: "og:image", content: "/profile.jpg" },
    { property: "og:url", content: `https://colecianflone.com/blog/${slug}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Blog Post | Cole Cianflone" },
    { name: "twitter:description", content: "Read this blog post on my portfolio." },
    { name: "twitter:image", content: "/profile.jpg" },
    { rel: "canonical", href: `https://colecianflone.com/blog/${slug}` },
  ];
}

export default function BlogSlug() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogMeta | null>(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/blog/blog-index.json")
      .then((res) => res.json())
      .then((posts: BlogMeta[]) => {
        const found = posts.find((p) => p.slug === slug) || null;
        setPost(found);
        if (found) {
          fetch(`/blog/${found.file}`)
            .then((res) => res.text())
            .then((raw) => {
              // Remove YAML frontmatter if present
              const content = raw.replace(/^---[\s\S]*?---\s*/, "");
              setContent(content);
            });
        }
      });
  }, [slug]);

  if (!post) {
    return (
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
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-8">
      <BlogPost post={post} content={content} onBack={() => navigate("/blog")} />
    </section>
  );
}