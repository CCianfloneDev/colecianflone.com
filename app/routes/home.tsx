import type { Route } from "./+types/home";
import AboutSection from "../components/AboutSection";
import { getBaseMeta } from "../meta";

export function meta({}: Route.MetaArgs) {
  return getBaseMeta({
    title: "Cole Cianflone",
    description: "Welcome to my portfolio!",
    url: "https://colecianflone.com/",
  });
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] py-12">
      <div className="relative mb-8">
        <img
          src="/profile-320w.webp"
          srcSet="/profile-320w.webp 320w, /profile-640w.webp 640w, /profile-1024w.webp 1024w"
          sizes="(max-width: 640px) 160px, 200px"
          alt="Cole Cianflone"
          width={200}
          height={200}
          fetchPriority="high"
          className="w-48 h-48 sm:w-52 sm:h-52 rounded-full shadow-lg object-cover 
                   ring-4 ring-white dark:ring-gray-800"
        />
        <div className="absolute inset-0 rounded-full shadow-inner"></div>
      </div>
      <AboutSection />
    </main>
  );
}
