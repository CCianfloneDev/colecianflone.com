import { getBaseMeta } from "../types/meta";
import type { CollectionPageSchema } from "../types/schema";

export function meta() {
  return getBaseMeta({
    title: "Projects | Cole Cianflone",
    description:
      "Portfolio of software development projects by Cole Cianflone. Featuring web applications, open source contributions, and technical case studies.",
    url: "https://colecianflone.com/projects",
    keywords:
      "Software Projects, Web Development Portfolio, React Projects, TypeScript Applications, Winnipeg Developer Portfolio, Full Stack Projects, Open Source Work",
    type: "website",
  });
}

export default function Projects() {
  const projectsSchema: CollectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects | Cole Cianflone",
    description: "Explore my software development projects and case studies.",
    url: "https://colecianflone.com/projects",
    author: {
      "@type": "Person",
      name: "Cole Cianflone",
      url: "https://colecianflone.com",
    },
    about: {
      "@type": "CreativeWork",
      name: "Software Development Projects",
      description:
        "A collection of software development projects showcasing various technologies and solutions.",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsSchema),
        }}
      />
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