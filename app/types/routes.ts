export type RouteParams = {
  blog: {
    slug: string;
  };
  projects: Record<string, never>;
  contact: Record<string, never>;
  home: Record<string, never>;
};

export interface RouteMetaArgs {
  params: {
    slug: string;
  };
}

export type RouteErrorBoundaryProps = {
  error: Error;
};

export type RouteDefinition = {
  path: string;
  component: string;
  children?: Record<string, RouteDefinition>;
};