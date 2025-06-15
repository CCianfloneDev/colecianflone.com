import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./fonts.css";
import NavBar from "./components/NavBar";
import type { PersonSchema, WebSiteSchema } from "./types/schema";


export const links: Route.LinksFunction = () => [
  { 
    rel: "preload",
    href: "/fonts/Inter-Regular.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
    fetchPriority: "high",
  },
  {
    rel: "preload", 
    href: "/fonts/Inter-Medium.woff2",
    as: "font", 
    type: "font/woff2",
    crossOrigin: "anonymous",
    fetchPriority: "low", 
  },
  {
    rel: "preload", 
    href: "/fonts/Inter-Bold.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
    fetchPriority: "low"
  }
];

export default function App() {
  const personSchema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Cole Cianflone",
    url: "https://colecianflone.com",
    jobTitle: "Software Developer",
    sameAs: [
      "https://www.linkedin.com/in/colecianflone/",
      "https://github.com/CCianfloneDev"
    ]
  };

  const websiteSchema: WebSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cole Cianflone Portfolio",
    url: "https://colecianflone.com",
    description: "Personal portfolio and blog of Cole Cianflone, featuring web development articles and projects",
    author: {
      "@type": "Person",
      name: "Cole Cianflone",
      url: "https://colecianflone.com"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <link rel="alternate" href="https://colecianflone.com" hrefLang="en-CA" />
        <link rel="alternate" href="https://colecianflone.com" hrefLang="x-default" />
        <Meta />
        <Links />

        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />

        <link 
          rel="preload" 
          href="/fonts/Inter-Regular.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://www.linkedin.com"
          crossOrigin="anonymous"
        />
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Cole Cianflone's Blog RSS Feed" 
          href="/rss.xml" 
        />
      </head>
      <body>
        <NavBar />
        <main className="min-h-screen">
          <section className="max-w-2xl mx-auto px-6 py-8 min-h-[calc(100vh-4rem)]">
            <Outlet />
          </section>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        message = "404 - Page Not Found";
        details = "Sorry, the page you are looking for does not exist.";
        break;
      case 403:
        message = "403 - Forbidden";
        details = "You don't have permission to access this page.";
        break;
      default:
        message = `${error.status} Error`;
        details = error.statusText || details;
    }
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto text-center">
      <h1 className="text-5xl font-bold mb-4">{message}</h1>
      <p className="mb-6">{details}</p>
      <a
        href="/"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Home
      </a>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto text-left mt-6 bg-gray-100 dark:bg-gray-800 rounded">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
