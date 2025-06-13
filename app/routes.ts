import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("blog", "routes/blog.tsx", [
    route(":slug", "routes/blog.$slug.tsx"),
  ]),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
