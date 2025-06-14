export type MetaArgs = {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
};

export function getBaseMeta({
  title,
  description,
  url,
  image = "/profile-1024w.webp",
  type = "website",
}: MetaArgs) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:image", content: image },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { rel: "canonical", href: url },
  ];
}