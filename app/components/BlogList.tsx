import React from "react";
import { Link } from "react-router";
import type { BlogMeta } from "../types/blog";

type BlogListProps = {
  posts: BlogMeta[];
};

export default function BlogList({ posts }: BlogListProps) {
  return (
    <ul className="mb-6">
      {posts.map((post) => (
        <li key={post.slug} className="mb-2">
            <Link
            className="text-blue-600 underline"
            to={`/blog/${post.slug}`}
            >
            {post.title} <span className="text-gray-500 text-sm">({post.date})</span>
            </Link>
            {post.description && (
            <div className="text-gray-700 text-sm">{post.description}</div>
            )}
        </li>
      ))}
    </ul>
  );
}