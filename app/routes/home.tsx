import type { Route } from "./+types/home";
import AboutSection from "../components/AboutSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cole Cianflone" },
    { name: "description", content: "Welcome to my portfolio!" },
  ];
}

export default function Home() {
  return <AboutSection />;
}
