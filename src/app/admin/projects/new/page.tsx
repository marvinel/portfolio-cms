import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProjectEditor from "@/components/admin/ProjectEditor";

export default async function NewProjectPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-xl font-bold">New Project</h1>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <ProjectEditor />
      </div>
    </div>
  );
}
