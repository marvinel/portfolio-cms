import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export default async function AdminProjectsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-xl font-bold">Projects</h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          New Project
        </Link>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {projects.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-lg">No projects yet.</p>
            <p className="text-sm mt-1">Add your first portfolio project.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.featured && (
                      <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                    {project.description}
                  </p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 bg-gray-800 text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton id={project.id} title={project.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
