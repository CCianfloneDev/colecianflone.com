import React from "react";
import { Link } from "react-router";
import type { BlogListProps } from "../types/components";
import { BlogListSkeleton } from "./Skeleton";

export default function BlogList({ posts }: BlogListProps) {
  if (!posts || posts.length === 0) {
    return <BlogListSkeleton />;
  }

  return (
    <ul className="spacing-responsive">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="p-4 lg:p-6 3xl:p-8 rounded-lg border border-gray-200 dark:border-gray-700 
                     hover:border-blue-500 dark:hover:border-blue-400 
                     transition-all duration-200 hover:shadow-lg 
                     bg-white dark:bg-gray-800"
        >
          <Link
            className="block spacing-responsive blog-list-link"
            to={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            title={post.description || `Read ${post.title}`}
          >
            {post.image && post.image.sizes && (
              <div className="aspect-w-16 aspect-h-9 mb-3 lg:mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <picture>
                  <source
                    srcSet={`${post.image.sizes.smallUrl} 400w,
                            ${post.image.sizes.mediumUrl} 800w,
                            ${post.image.sizes.largeUrl} 1200w`}
                    sizes="(max-width: 400px) 400px,
                           (max-width: 800px) 800px,
                           min(1200px, 100vw)"
                    type="image/webp"
                  />
                  <img
                    src={post.image.sizes.mediumUrl}
                    alt={post.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="object-cover w-full h-full transition-transform duration-200 
                              hover:scale-105 opacity-0"
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  />
                </picture>
              </div>
            )}
            <h2 className="text-responsive-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 
                         dark:hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <div className="text-sm lg:text-sm 3xl:text-base text-gray-600 dark:text-gray-400">
              {post.date}
            </div>
            <div className="spacing-responsive">
              {post.description && (
                <p className="text-sm lg:text-base 3xl:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {post.description}
                </p>
              )}
              {post.readTime && (
                <div className="text-xs lg:text-sm 3xl:text-base text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 lg:w-4 lg:h-4 3xl:w-5 3xl:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.readTime}
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}