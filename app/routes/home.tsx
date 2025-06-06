import type { Route } from "./+types/home";
import AboutSection from "../components/AboutSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cole Cianflone" },
    { name: "description", content: "Welcome to my portfolio!" },
    { property: "og:title", content: "Cole Cianflone" },
    { property: "og:description", content: "Welcome to my portfolio!" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/profile.jpg" },
    { property: "og:url", content: "https://colecianflone.com/" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Cole Cianflone" },
    { name: "twitter:description", content: "Welcome to my portfolio!" },
    { name: "twitter:image", content: "/profile.jpg" },
    { rel: "canonical", href: "https://colecianflone.com/" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <img
        src="/profile.jpg"
        alt="Cole Cianflone"
        className="w-40 h-40 rounded-full shadow-lg mb-6 object-cover"
      />
      <AboutSection />
    </div>
  );
}
