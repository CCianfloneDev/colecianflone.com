import { getBaseMeta } from "../meta";

export function meta() {
  return getBaseMeta({
    title: "Projects | Cole Cianflone",
    description: "Explore my software development projects and case studies.",
    url: "https://colecianflone.com/projects",
  });
}

export default function Projects() {
  return (
    <main>
      <section className="max-w-2xl mx-auto px-6 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Projects</h1>
        <p className="mb-6">Welcome to my projects! Posts will appear here soon.</p>
      </section>
    </main>
  );
}