import React from "react";
import type { BlogPostProps } from "../types/components";

export default function BlogPost({ post, content, onBack }: BlogPostProps) {
  return (
    <article className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                     dark:hover:text-blue-300 font-medium flex items-center gap-2
                     transition-colors"
          onClick={onBack}
          aria-label="Return to blog list"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>
        <div className="text-lg text-gray-700 dark:text-gray-300">
          {post.date}
        </div>
      </header>

      <div className="prose dark:prose-invert prose-lg max-w-none">
        {content ? (
          <div
            className="text-gray-900 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-lg text-gray-700 dark:text-gray-300">
            No content found.
          </p>
        )}
      </div>
    </article>
  );
}