import { getBaseMeta } from "../types/meta";
import type { ContactPageSchema } from "../types/schema";

export function meta() {
  return getBaseMeta({
    title: "Contact | Cole Cianflone",
    description:
      "Get in touch with Cole Cianflone, a software developer in Winnipeg, Manitoba. Available for development projects and technical consulting.",
    url: "https://colecianflone.com/contact",
    keywords:
      "Contact Cole Cianflone, Hire Software Developer Winnipeg, Manitoba Developer Contact, Software Engineering Consultation, Web Development Services",
    type: "website",
  });
}

export default function Contact() {
  const contactSchema: ContactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact | Cole Cianflone",
    description: "Get in touch with Cole Cianflone.",
    url: "https://colecianflone.com/contact",
    mainEntity: {
      "@type": "Person",
      name: "Cole Cianflone",
      email: "cole@colecianflone.com",
      url: "https://colecianflone.com",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1
          className="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
          style={{ fontSize: "2.25rem" }}
        >
          Contact Me
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          You can reach me at{" "}
          <a
            href="mailto:cole@colecianflone.com"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            cole@colecianflone.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}