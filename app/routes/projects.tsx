export function meta() {
  return [
    { title: "Projects | Cole Cianflone" },
    { name: "description", content: "Explore my software development projects and case studies." },
    { property: "og:title", content: "Projects | Cole Cianflone" },
    { property: "og:description", content: "Explore my software development projects and case studies." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/profile.jpg" },
    { property: "og:url", content: "https://colecianflone.com/projects" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Projects | Cole Cianflone" },
    { name: "twitter:description", content: "Explore my software development projects and case studies." },
    { name: "twitter:image", content: "/profile.jpg" },
    { rel: "canonical", href: "https://colecianflone.com/projects" },
  ];
}

export default function Projects() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <p className="mb-6">Welcome to my projects! Posts will appear here soon.</p>
    </section>
  );
}