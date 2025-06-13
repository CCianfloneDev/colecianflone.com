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
    <main className="flex flex-col items-center justify-center min-h-[60vh]">
      <img
        src="/profile-320w.webp"
        srcSet="/profile-320w.webp 320w, /profile-640w.webp 640w, /profile-1024w.webp 1024w"
        sizes="160px"
        alt="Cole Cianflone"
        width={160}
        height={160}
        fetchPriority="high"
        className="w-40 h-40 rounded-full shadow-lg mb-6 object-cover"
      />
      <AboutSection />
    </main>
  );
}
