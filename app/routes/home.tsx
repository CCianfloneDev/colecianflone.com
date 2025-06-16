import { ResponsiveContainer } from "~/components/ResponsiveContainer";
import AboutSection from "~/components/AboutSection";
import { getBaseMeta } from "../types/meta";
import type { PersonSchema } from "../types/schema";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return getBaseMeta({
    title: "Cole Cianflone | Software Developer in Winnipeg",
    description:
      "Winnipeg-based software developer specializing in full-stack development.",
    url: "https://colecianflone.com",
    keywords:
      "Cole Cianflone, Winnipeg Software Developer, Full Stack Developer Manitoba, React Developer, TypeScript Developer, .NET Developer Winnipeg, Software Engineer Canada",
  });
}

export default function Home() {
  const homeSchema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Cole Cianflone",
    url: "https://colecianflone.com",
    jobTitle: "Software Developer",
    sameAs: [
      "https://www.linkedin.com/in/colecianflone/",
      "https://github.com/CCianfloneDev",
    ],
  };

  return (
    <ResponsiveContainer maxWidth="4xl" className="py-8 lg:py-12 3xl:py-16">
      <div role="main" className="space-y-8 lg:space-y-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeSchema),
          }}
        />
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* Profile Image - Above text on mobile, left side on desktop */}
          <div className="flex-shrink-0 text-center lg:text-left mb-8 lg:mb-0">
            <div className="relative inline-block">
              <img
                src="/profile-320w.webp"
                srcSet="/profile-320w.webp 320w, /profile-640w.webp 640w, /profile-1024w.webp 1024w"
                sizes="(max-width: 640px) 160px, 200px"
                alt="Cole Cianflone"
                width={200}
                height={200}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-40 h-40 sm:w-48 sm:h-48 3xl:w-56 3xl:h-56 4xl:w-64 4xl:h-64 rounded-full shadow-lg object-cover 
                         ring-4 ring-white dark:ring-gray-800"
              />
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
          </div>

          {/* About Content - Below image on mobile, right side on desktop */}
          <div className="flex-1">
            <AboutSection />
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
