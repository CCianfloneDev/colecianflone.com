export default function AboutSection() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        About Me
      </h2>
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
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Cole's LinkedIn profile"
          >
            LinkedIn
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          !
        </p>
      </div>
    </section>
  );
}