export type RouteMetaArgs = {
  params: {
    slug?: string;
  };
};

export type RouteErrorBoundaryProps = {
  error: Error;
};

export type RouteDefinition = {
  path: string;
  component: string;
  children?: Record<string, RouteDefinition>;
};