import { useEffect } from "react";
import type { BlogPostProps } from "../types/components";
import Button from "./Button";

export default function BlogPost({ post, content, onBack }: BlogPostProps) {
  // Handle hash navigation after content loads
  useEffect(() => {
    if (content && window.location.hash) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          const navbarHeight =
            window.innerWidth >= 2560
              ? 96
              : window.innerWidth >= 1920
              ? 80
              : 64;
          const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementTop - navbarHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [content]);

  // Handle anchor clicks to prevent CSS/JS scroll conflict on Firefox
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          e.preventDefault();
          
          // Temporarily remove scroll-margin to prevent Firefox double-offset
          const originalScrollMargin = (targetElement as HTMLElement).style.scrollMarginTop;
          (targetElement as HTMLElement).style.scrollMarginTop = '0';
          
          const navbarHeight = window.innerWidth >= 2560 ? 96 : window.innerWidth >= 1920 ? 80 : 64;
          const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: elementTop - navbarHeight,
            behavior: 'smooth'
          });
          
          // Restore original scroll-margin after scrolling
          setTimeout(() => {
            (targetElement as HTMLElement).style.scrollMarginTop = originalScrollMargin;
          }, 100);
          
          // Update URL hash
          window.history.replaceState(null, '', target.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [content]);

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