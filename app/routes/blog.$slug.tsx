import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import type { RouteMetaArgs } from "../types/routes";
import { getBaseMeta } from "../types/meta";
import { useBlogContext } from "../components/BlogContext";
import BlogPost from "../components/BlogPost";
import type { BlogPostSchema } from '../types/schema';
import { BlogPostSkeleton } from "../components/Skeleton";

// Import the blog data directly for meta function
import blogIndexData from "../blog/blog-index.json";

export function meta({ params }: RouteMetaArgs) {
  // Use the imported blog data directly
  const post = blogIndexData.find(p => p.slug === params.slug);

  if (!post) {
    return getBaseMeta({
      title: "Blog Post Not Found | Cole Cianflone",
      description: "The requested blog post could not be found.",
      url: `https://colecianflone.com/blog/${params.slug}`,
      type: "article",
    });
  }

  const metaArgs = {
    title: `${post.title} | Cole Cianflone`,
    description: post.description || "Read this blog post on my portfolio.",
    url: `https://colecianflone.com/blog/${post.slug}`,
    type: "article",
    keywords: [
      post.title,
      post.description,
      "Software Development",
      "Web Development",
      "Technical Tutorial",
      "Cole Cianflone Blog",
      "Blog",
      "Article"
    ].filter(Boolean).join(", "),
  } as {
    title: string;
    description: string;
    url: string;
    type: string;
    keywords: string;
    image?: string;
  };

  if (post.image?.sizes.largeUrl) {
    metaArgs.image = `https://colecianflone.com${post.image.sizes.largeUrl}`;
  }

  return getBaseMeta(metaArgs);
}

export default function BlogSlug() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts, loading } = useBlogContext();
  const [content, setContent] = useState<string>("");
  const [contentLoading, setContentLoading] = useState(true);
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      setContentLoading(true);
      const controller = new AbortController();
      
      fetch(`/blog-content/${post.htmlFile}`, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to load post content');
          return res.text();
        })
        .then(content => {
          setContent(content);
          setContentLoading(false);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.error('Failed to load post:', err);
          }
          setContentLoading(false);
        });

      return () => controller.abort();
    } else {
      setContent("");
      setContentLoading(false);
      return undefined;
    }
  }, [post?.htmlFile]);

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          Post Not Found
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/blog")}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                   dark:hover:text-blue-300 font-medium transition-colors cursor-pointer"
        >
          Back to Blog List
        </button>
      </div>
    );
  }

  const schema: BlogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description ?? "",
    datePublished: post.isoDate,
    url: `https://colecianflone.com/blog/${post.slug}`,
    ...(post.image && {
      image: [
        `https://colecianflone.com${post.image.sizes.smallUrl}`,
        `https://colecianflone.com${post.image.sizes.mediumUrl}`,
        `https://colecianflone.com${post.image.sizes.largeUrl}`
      ]
    }),
    author: {
      "@type": "Person",
      name: "Cole Cianflone",
      url: `https://colecianflone.com/blog/${post.slug}`
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://colecianflone.com/blog/${post.slug}`
    }
  };

  return (
    <article className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
      {contentLoading ? (
        <BlogPostSkeleton />
      ) : (
        <BlogPost post={post} content={content} onBack={() => navigate("/blog")} />
      )}
    </article>
  );
}