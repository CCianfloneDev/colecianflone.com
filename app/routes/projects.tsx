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
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1
          className="text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight"
          style={{ fontSize: "2.25rem" }}
        >
          Projects
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Welcome to my projects! Posts will appear here soon.
        </p>
      </div>
    </main>
  );
}