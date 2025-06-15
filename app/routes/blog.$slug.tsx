import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import type { RouteMetaArgs } from "../types/routes";
import { getBaseMeta, type MetaArgs } from "../types/meta";
import { useBlogContext } from "../components/BlogContext";
import BlogPost from "~/components/BlogPost";
import type { BlogPostSchema } from '../types/schema';

export function meta({ params }: RouteMetaArgs) {
  // Default metadata before we have the post data
  return getBaseMeta({
    title: "Blog Post | Cole Cianflone",
    description: "Loading blog post...",
    url: `https://colecianflone.com/blog/${params.slug}`,
    type: "article",
  });
}

export default function BlogSlug() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, loading } = useBlogContext();
  const [content, setContent] = useState<string>("");
  const post = posts.find((p) => p.slug === slug);

  // Update metadata when post data is available
  useEffect(() => {
    if (post) {
      const metaArgs: MetaArgs = {
        title: `${post.title} | Cole Cianflone`,
        description: post.description || "Read this blog post on my portfolio.",
        url: `https://colecianflone.com/blog/${post.slug}`,
        type: "article",
        keywords: "Software Development, Web Development, Technical Tutorial, React, TypeScript, Cloudflare Workers, Cole Cianflone Blog",
      };

      // Only add image if it exists
      if (post.image?.sizes.largeUrl) {
        metaArgs.image = post.image.sizes.largeUrl;
      }

      const metaTags = getBaseMeta(metaArgs);

      // Update each meta tag
      metaTags.forEach(tag => {
        if ('title' in tag) {
          document.title = tag.title;
        } else {
          const attributeKey = Object.keys(tag)[0];
          const attributeValue = tag[attributeKey as keyof typeof tag];
          const selector = attributeKey === 'name' || attributeKey === 'property' 
            ? `meta[${attributeKey}="${attributeValue}"]`
            : `meta[${attributeKey}]`;
          
          const element = document.querySelector(selector);
          if (element) {
            element.setAttribute('content', tag.content || '');
          }
        }
      });
    }
  }, [post]);

  useEffect(() => {
    if (post) {
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
        .then(setContent)
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.error('Failed to load post:', err);
          }
        });

      return () => controller.abort();
    } else {
      setContent("");
      return undefined;
    }
  }, [post?.htmlFile]);

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
                   dark:hover:text-blue-300 font-medium transition-colors"
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
    <>
      {/* BlogPosting JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
      <BlogPost post={post} content={content} onBack={() => navigate("/blog")} />
    </>
  );
}