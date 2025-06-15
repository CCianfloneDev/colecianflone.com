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
    const controller = new AbortController();

    fetch("/blog/blog-index.json", {
      signal: controller.signal,
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch blog posts: ${res.status}`);
        return res.json() as Promise<BlogMeta[]>;
      })
      .then((data) => {
        setPosts(data.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()));
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          console.error('Blog fetch error:', err);
          setError(err);
        }
        setLoading(false);
      });

    return () => controller.abort();
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