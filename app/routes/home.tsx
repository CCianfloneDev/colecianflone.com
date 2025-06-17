import { ResponsiveContainer } from "~/components/ResponsiveContainer";
import AboutSection from "~/components/AboutSection";
import Timeline from "~/components/Timeline";
import { getBaseMeta } from "../types/meta";
import type { PersonSchema } from "../types/schema";
import type { TimelineItem } from "../types/timeline";
import type { Route } from "./+types/home";
import timelineDataRaw from "../data/timeline.json";

// Type assertion to ensure the JSON data matches our interface
const timelineData = timelineDataRaw as TimelineItem[];

export function meta({}: Route.MetaArgs) {
  return getBaseMeta({
    title: "Cole Cianflone | Software Developer in Winnipeg",
    description:
      "Winnipeg-based software developer specializing in full-stack development. Explore my career journey, education, and professional experience.",
    url: "https://colecianflone.com",
    keywords:
      "Cole Cianflone, Winnipeg Software Developer, Full Stack Developer Manitoba, React Developer, TypeScript Developer, .NET Developer Winnipeg, Software Engineer Canada, Career Timeline, Portfolio",
  });
}

export default function Home() {
  const homeSchema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Cole Cianflone",
    url: "https://colecianflone.com",
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "Organization",
      name:
        timelineData.find((item) => item.current && item.type === "work")
          ?.company || "Software Development",
    },
    alumniOf: timelineData
      .filter((item) => item.type === "education")
      .map((item) => ({
        "@type": "EducationalOrganization",
        name: item.institution || item.title,
      })),
    sameAs: [
      "https://www.linkedin.com/in/colecianflone/",
      "https://github.com/CCianfloneDev",
    ],
  };

  return (
    <ResponsiveContainer maxWidth="6xl" className="section-spacing">
      <div className="page-content space-y-12 lg:space-y-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeSchema),
          }}
        />

        {/* Hero Section */}
        <div className="space-y-8 lg:space-y-12">
          {/* Profile Image - Centered */}
          <div className="flex justify-center">
            <div className="relative inline-block">
              <img
                src="/profile.webp"
                alt="Cole Cianflone"
                width={256}
                height={256}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-40 h-40 sm:w-48 sm:h-48 3xl:w-56 3xl:h-56 4xl:w-64 4xl:h-64 rounded-full shadow-lg object-cover 
                         ring-4 ring-white dark:ring-gray-800"
              />
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
          </div>

          {/* About Content - Left aligned and full width */}
          <div>
            <AboutSection />
          </div>
        </div>

        {/* Career & Education Timeline */}
        <section>
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Career & Education Journey
            </h2>
            <p className="text-responsive-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My professional and educational timeline, showcasing the experiences
              that have shaped my development career.
            </p>
          </div>

          <Timeline items={timelineData} className="max-w-4xl mx-auto" />
        </section>
      </div>
    </ResponsiveContainer>
  );
}
