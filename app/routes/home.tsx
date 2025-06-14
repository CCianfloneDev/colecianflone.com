import type { Route } from "./+types/home";
import type { PersonSchema } from "../types/schema";
import AboutSection from "../components/AboutSection";
import { getBaseMeta } from "../types/meta";

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
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSchema),
        }}
      />
      <div className="relative mb-8">
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
          className="w-40 h-40 sm:w-48 sm:h-48 rounded-full shadow-lg object-cover 
                   ring-4 ring-white dark:ring-gray-800"
        />
        <div className="absolute inset-0 rounded-full shadow-inner"></div>
      </div>
      <AboutSection />
    </section>
  );
}
