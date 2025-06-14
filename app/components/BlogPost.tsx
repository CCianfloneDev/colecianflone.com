import React from "react";
import type { BlogMeta } from "../types/blog";

type BlogPostProps = {
  post: BlogMeta & { html?: string };
  content?: string;
  onBack: () => void;
};

export default function BlogPost({ post, content, onBack }: BlogPostProps) {
  return (
    <article>
      <button
        className="mb-4 text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-2"
        onClick={onBack}
        aria-label="Return to blog list"
        title="Go back to all blog posts"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Blog List
      </button>
      <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        {post.title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 mb-6 font-medium">
        {post.date}
      </div>
      <div className="prose dark:prose-invert prose-lg max-w-none">
        {content ? (
          <div
            className="text-gray-900 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="text-gray-700 dark:text-gray-300">
            No content found.
          </div>
        )}
      </div>
    </article>
  );
}