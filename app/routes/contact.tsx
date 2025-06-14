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