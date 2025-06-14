import { type RouteConfig, index, route } from "@react-router/dev/routes";
import type { RouteDefinition } from "./types/routes";

// Define route structure with meta and layout info
const routes = {
  home: {
    path: "/",
    component: "routes/home.tsx",
  },
  projects: {
    path: "/projects",
    component: "routes/projects.tsx",
  },
  blog: {
    path: "/blog",
    component: "routes/blog.tsx",
    children: {
      post: {
        path: ":slug",
        component: "routes/blog.$slug.tsx",
      },
    },
  },
  contact: {
    path: "/contact",
    component: "routes/contact.tsx",
  },
} satisfies Record<string, RouteDefinition>;

// Export route configuration
export default [
  index(routes.home.component),
  route(routes.projects.path, routes.projects.component),
  route(routes.blog.path, routes.blog.component, [
    route(routes.blog.children.post.path, routes.blog.children.post.component),
  ]),
  route(routes.contact.path, routes.contact.component),
] satisfies RouteConfig;

// Export route paths for use in components
export const ROUTES = {
  home: routes.home.path,
  projects: routes.projects.path,
  blog: {
    index: routes.blog.path,
    post: (slug: string) => `${routes.blog.path}/${slug}`,
  },
  contact: routes.contact.path,
} as const;
