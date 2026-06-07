import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }],
      take: 6,
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        tags: true,
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-lg">MH</span>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-400 text-sm font-medium mb-3">Hi, I&apos;m</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Marvin Henriquez
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
            Software Engineer
          </h2>
          <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
            Fullstack developer with 4+ years of experience building web applications,
            API integrations, and digital transformation solutions. Based in Colombia,
            open to remote work worldwide.
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="#projects"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-lg font-medium transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Systems Engineer from Universidad del Norte with experience in
                software development, system integrations, and digital transformation
                in the retail industry.
              </p>
              <p>
                I specialize in building fullstack web applications using React,
                Next.js, Node.js, and TypeScript. I enjoy solving complex integration
                problems and building tools that make teams more productive.
              </p>
              <p>
                AWS Certified Cloud Practitioner. Currently focused on modern web
                development and cloud architecture.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Prisma", "AWS", "Git", "REST APIs", "React Native"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          {projects.length === 0 ? (
            <p className="text-gray-500">Projects coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    {project.featured && (
                      <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20 px-6 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Blog</h2>
            <Link href="/blog" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
              View all posts →
            </Link>
          </div>
          {posts.length === 0 ? (
            <p className="text-gray-500">Posts coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs">
                      {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-8 max-w-lg">
            Interested in working together? Send me a message and I&apos;ll get back to you.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <p>© 2025 Marvin Henriquez</p>
          <div className="flex gap-4">
            <a href="https://github.com/marvinel" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="mailto:marvinshb@gmail.com" className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
