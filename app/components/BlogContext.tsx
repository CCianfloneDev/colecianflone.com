import React, { createContext, useContext, useEffect, useState } from "react";
import type { BlogMeta } from "../types/blog";

type BlogContextType = {
  posts: BlogMeta[];
  loading: boolean;
  error: any;
};

const BlogContext = createContext<BlogContextType>({
  posts: [],
  loading: true,
  error: null,
});

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetch("/blog/blog-index.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data as BlogMeta[]);
        setLoading(false);
      })
      .catch((err) => {
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