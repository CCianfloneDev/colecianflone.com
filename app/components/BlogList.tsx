import React from "react";
import { Link } from "react-router";
import type { BlogMeta } from "../types/blog";

type BlogListProps = {
  posts: BlogMeta[];
};

export default function BlogList({ posts }: BlogListProps) {
  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
        >
          <Link className="block" to={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-700 mb-1">
              {post.title}
            </h2>
            <div className="text-sm text-gray-500 mb-3">{post.date}</div>
            <div className="flex flex-col gap-2">
              {post.description && (
                <p className="text-gray-700 leading-relaxed">
                  {post.description}
                </p>
              )}
              {post.readTime && (
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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