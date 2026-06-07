import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import PostEditor from "@/components/admin/PostEditor";

export default async function NewPostPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-xl font-bold">New Post</h1>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <PostEditor />
      </div>
    </div>
  );
}
