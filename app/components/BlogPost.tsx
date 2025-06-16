import type { BlogPostProps } from "../types/components";
import Button from "./Button";

export default function BlogPost({ post, content, onBack }: BlogPostProps) {
  return (
    <article className="spacing-responsive">
      <div className="flex items-center mb-6">
        <Button onClick={onBack} aria-label="Return to blog list">
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
        </Button>
      </div>

      <header className="mb-8">
        <h1 className="heading-responsive mb-4">{post.title}</h1>
        <div className="text-responsive-lg text-gray-700 dark:text-gray-300">
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
          <p className="text-responsive-lg text-gray-700 dark:text-gray-300">
            No content found.
          </p>
        )}
      </div>
    </article>
  );
}