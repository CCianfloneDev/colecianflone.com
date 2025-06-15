export type MetaArgs = {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  keywords?: string;
};

export function getBaseMeta({
  title,
  description,
  url,
  image = "/profile-1024w.webp",
  type = "website",
  keywords = "Cole Cianflone, Software Developer, Winnipeg Developer, Full Stack Developer, TypeScript Developer, React Developer, .NET Developer, Manitoba Tech, Winnipeg Software Engineer",
}: MetaArgs) {
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `https://colecianflone.com${image}`;

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: "Cole Cianflone" },
    { name: "robots", content: "index, follow" },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:image", content: absoluteImageUrl },
    { property: "og:url", content: url },
    { property: "og:locale", content: "en_CA" },
    { property: "og:site_name", content: "Cole Cianflone" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absoluteImageUrl },

    // Geo Tags
    { name: "geo.region", content: "CA-MB" },
    { name: "geo.placename", content: "Winnipeg" },
    { name: "geo.position", content: "49.8951;-97.1384" }, // Winnipeg coordinates
    { name: "ICBM", content: "49.8951, -97.1384" },

    // Canonical URL
    { rel: "canonical", href: url },
  ];
}