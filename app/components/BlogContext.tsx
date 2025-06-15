import React, { createContext, useContext, useEffect, useState } from "react";
import type { BlogMeta } from "../types/blog";
import type { BlogContextType, BlogContextProps } from "../types/components";

// Import the blog data directly
import blogIndexData from "../blog/blog-index.json";

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
    try {
      // Use the imported data directly
      setPosts(blogIndexData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load blog posts'));
      setLoading(false);
    }
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