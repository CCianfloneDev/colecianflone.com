import React from "react";
import type { BlogMeta } from "../types/blog";

type BlogPostProps = {
  post: BlogMeta & { html?: string };
  content?: string; // content is now optional
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
        {post.html ? (
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        ) : (
          content && <div>{content}</div>
        )}
      </div>
    </article>
  );
}