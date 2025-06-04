import React from "react";
import { Link } from "react-router";

type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  file: string;
};

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
        </li>
      ))}
    </ul>
  );
}