import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("blog", "routes/blog.tsx"), // <-- Add this line
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
