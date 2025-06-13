import { getBaseMeta } from "../meta";

export function meta() {
  return getBaseMeta({
    title: "Contact | Cole Cianflone",
    description: "Get in touch with Cole Cianflone.",
    url: "https://colecianflone.com/contact",
  });
}

export default function Contact() {
  return (
    <main>
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
    </main>
  );
}