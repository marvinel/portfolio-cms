import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import ProjectEditor from "@/components/admin/ProjectEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-xl font-bold">Edit Project</h1>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <ProjectEditor
          isEditing
          initialData={{
            id: project.id,
            title: project.title,
            slug: project.slug,
            description: project.description,
            content: project.content || "",
            image: project.image || "",
            liveUrl: project.liveUrl || "",
            repoUrl: project.repoUrl || "",
            techStack: project.techStack,
            featured: project.featured,
          }}
        />
      </div>
    </div>
  );
}
