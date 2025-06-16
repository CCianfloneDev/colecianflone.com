import React from "react";
import type { PersonSchema } from "../types/schema";
import Button from "./Button";

export default function AboutSection() {
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

  return (
    <div className="max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <h1 className="heading-responsive mb-6 text-center lg:text-left">
        Cole Cianflone
      </h1>
      <div className="spacing-responsive text-responsive-lg text-gray-700 dark:text-gray-300">
        <p>
          Hi, I'm Cole Cianflone, a passionate Software Developer with experience in
          full-stack development, cloud technologies, and DevOps practices. I
          enjoy building scalable, maintainable applications and am always eager to
          learn new technologies and frameworks.
        </p>
        <p>
          I have a strong background in C#, VB.NET, .NET, JavaScript, React, Node.js, and
          Python, and I'm experienced with AWS, Docker, and CI/CD pipelines. My
          professional journey includes working on diverse projects, collaborating
          with cross-functional teams, and delivering high-quality solutions that
          solve real-world problems.
        </p>
        <p>
          I'm committed to continuous learning and growth, both personally and
          professionally. Outside of coding, I enjoy exploring new tech trends,
          contributing to open-source projects, and connecting with other developers
          in the community.
        </p>
        <p>
          Feel free to connect with me on{" "}
          <Button 
            href="https://www.linkedin.com/in/colecianflone/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Cole's LinkedIn profile"
            className="inline"
          >
            LinkedIn
          </Button>{" "}
          or{" "}
          <Button 
            href="https://github.com/CCianfloneDev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Cole's GitHub profile"
            className="inline"
          >
            GitHub
          </Button>
          . Let's build something great together!
        </p>
      </div>
    </div>
  );
}