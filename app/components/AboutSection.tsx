import type { PersonSchema } from '../types/schema';

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight" style={{ fontSize: '2.25rem' }}>
          About Me
        </h1>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
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
            <a
              href="https://www.linkedin.com/in/colecianflone/"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Cole's LinkedIn profile"
            >
              LinkedIn
            </a>
            !
          </p>
        </div>
      </div>
    </>
  );
}