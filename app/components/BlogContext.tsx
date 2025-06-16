import { createContext, useContext, useEffect, useState } from "react";
import type { BlogContextType, BlogContextProps } from "../types/components";
import type { BlogMeta } from "../types/blog";
import blogIndexData from "../data/blog-index.json";

const BlogContext = createContext<BlogContextType | undefined>(undefined);

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
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
}