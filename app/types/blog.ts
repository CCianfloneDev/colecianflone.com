export type BlogMeta = {
  title: string;
  slug: string;
  file: string;
  htmlFile: string;
  date: string;
  isoDate: string; // Field for ISO 8601 format
  description?: string;
  readTime?: string;
  image?: {
    alt: string;
    sizes: {
      smallUrl: string;   // 400w
      mediumUrl: string;  // 800w
      largeUrl: string;   // 1200w
    };
  };
};