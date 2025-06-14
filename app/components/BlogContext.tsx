import React, { createContext, useContext, useEffect, useState } from "react";
import type { BlogMeta } from "../types/blog";
import type { BlogContextType, BlogContextProps } from "../types/components";

const BlogContext = createContext<BlogContextType>({
  posts: [],
  loading: true,
  error: null,
});

export function BlogProvider({ children }: BlogContextProps) {
  const [posts, setPosts] = useState<BlogMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/blog/blog-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        return res.json() as Promise<BlogMeta[]>;
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <BlogContext.Provider value={{ posts, loading, error }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}