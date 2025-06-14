import React from "react";
import { Link } from "react-router";
import type { BlogMeta } from "../types/blog";

interface BlogListProps {
  posts: BlogMeta[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 
                     hover:border-blue-500 dark:hover:border-blue-400 
                     transition-all duration-200 hover:shadow-lg 
                     bg-white dark:bg-gray-800"
        >
          <Link
            className="block space-y-3"
            to={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            title={post.description || `Read ${post.title}`}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 
                         dark:hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {post.date}
            </div>
            <div className="space-y-3">
              {post.description && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {post.description}
                </p>
              )}
              {post.readTime && (
                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
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