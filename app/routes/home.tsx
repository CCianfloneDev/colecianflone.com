import type { Route } from "./+types/home";
import AboutSection from "../components/AboutSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cole Cianflone" },
    { name: "description", content: "Welcome to my portfolio!" },
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
