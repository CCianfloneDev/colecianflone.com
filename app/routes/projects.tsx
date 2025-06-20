import { ResponsiveContainer } from "~/components/ResponsiveContainer";
import { getBaseMeta } from "../types/meta";
import type { CollectionPageSchema } from "../types/schema";
import PageHeader from "../components/PageHeader";

export function meta() {
  return getBaseMeta({
    title: "Projects | Cole Cianflone",
    description:
      "Explore my software development projects and case studies.",
    url: "https://colecianflone.com/projects",
    keywords:
      "Software Development Projects, Web Development Portfolio, React Projects, TypeScript Applications, Open Source Projects, Cole Cianflone Projects",
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
    <ResponsiveContainer maxWidth="6xl">
      <div role="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectsSchema),
          }}
        />
        <PageHeader 
          title="Projects"
          description="Here are some of the projects I've been working on. Each project represents a unique challenge and learning opportunity in my development journey."
        />
        
        <div className="text-center section-spacing">
          <div className="text-gray-400 dark:text-gray-500 mb-8 lg:mb-12">
            <svg
              className="w-16 h-16 lg:w-20 lg:h-20 3xl:w-24 3xl:h-24 4xl:w-28 4xl:h-28 mx-auto mb-6 lg:mb-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h2 className="text-responsive-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Projects Coming Soon
          </h2>
          <p className="text-responsive-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            I'm currently working on showcasing my best projects here. Check back soon to see what I've been building!
          </p>
        </div>
      </div>
    </ResponsiveContainer>
  );
}