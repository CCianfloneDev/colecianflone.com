import React from "react";

type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  file: string;
};

type BlogListProps = {
  posts: BlogMeta[];
  onSelect: (post: BlogMeta) => void;
};

export default function BlogList({ posts, onSelect }: BlogListProps) {
  return (
    <ul className="mb-6">
      {posts.map((post) => (
        <li key={post.slug} className="mb-2">
          <button
            className="text-blue-600 underline"
            onClick={() => onSelect(post)}
          >
            {post.title} <span className="text-gray-500 text-sm">({post.date})</span>
          </button>
        </li>
      ))}
    </ul>
  );
}