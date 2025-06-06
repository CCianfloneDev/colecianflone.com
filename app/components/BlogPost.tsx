import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";

type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  file: string;
};

type BlogPostProps = {
  post: BlogMeta;
  content: string;
  onBack: () => void;
};

export default function BlogPost({ post, content, onBack }: BlogPostProps) {
  return (
    <article>
      <button
        className="mb-4 text-blue-600 underline"
        onClick={onBack}
      >
        ← Back to Blog List
      </button>
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <div className="text-gray-500 mb-4">{post.date}</div>
      <div className="prose dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm as any, remarkSlug as any]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}