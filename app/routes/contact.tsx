export function meta() {
  return [
    { title: "Contact | Cole Cianflone" },
    { name: "description", content: "Get in touch with Cole Cianflone." },
    { property: "og:title", content: "Contact | Cole Cianflone" },
    { property: "og:description", content: "Get in touch with Cole Cianflone." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/profile.jpg" },
    { property: "og:url", content: "https://colecianflone.com/contact" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Contact | Cole Cianflone" },
    { name: "twitter:description", content: "Get in touch with Cole Cianflone." },
    { name: "twitter:image", content: "/profile.jpg" },
    { rel: "canonical", href: "https://colecianflone.com/contact" },
  ];
}

export default function Contact() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p>
        You can reach me at{" "}
        <a
          href="mailto:cole@colecianflone.com"
          className="text-blue-600 underline"
        >
          cole@colecianflone.com
        </a>
        .
      </p>
    </section>
  );
}