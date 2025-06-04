import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import BlogPost from "../components/BlogPost";

type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  file: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogMeta[]>([]);
  const [selected, setSelected] = useState<BlogMeta | null>(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/blog/blog-index.json")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  useEffect(() => {
    if (selected) {
      fetch(`/blog/${selected.file}`)
        .then((res) => res.text())
        .then(setContent);
    }
  }, [selected]);

  return (
    <section className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Blog</h1>
      {!selected ? (
        <BlogList posts={posts} onSelect={setSelected} />
      ) : (
        <BlogPost post={selected} content={content} onBack={() => setSelected(null)} />
      )}
    </section>
  );
}