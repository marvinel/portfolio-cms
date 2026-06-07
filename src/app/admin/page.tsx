import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [postCount, projectCount, messageCount, unreadCount] = await Promise.all([
    prisma.post.count(),
    prisma.project.count(),
    prisma.message.count(),
    prisma.message.count({ where: { read: false } }),
  ]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top bar */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{session.user?.email}</span>
          <SignOutButton />
        </div>
      </header>

      <div className="p-6 max-w-5xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Posts</p>
            <p className="text-3xl font-bold mt-1">{postCount}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Projects</p>
            <p className="text-3xl font-bold mt-1">{projectCount}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Messages</p>
            <p className="text-3xl font-bold mt-1">{messageCount}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Unread</p>
            <p className="text-3xl font-bold mt-1 text-blue-400">{unreadCount}</p>
          </div>
        </div>

        {/* Quick actions */}
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/posts"
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500 transition-colors"
          >
            <h3 className="font-semibold mb-1">Manage Posts</h3>
            <p className="text-gray-400 text-sm">Create, edit, and publish blog posts</p>
          </Link>
          <Link
            href="/admin/projects"
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500 transition-colors"
          >
            <h3 className="font-semibold mb-1">Manage Projects</h3>
            <p className="text-gray-400 text-sm">Add and update portfolio projects</p>
          </Link>
          <Link
            href="/admin/messages"
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500 transition-colors"
          >
            <h3 className="font-semibold mb-1">View Messages</h3>
            <p className="text-gray-400 text-sm">Read contact form submissions</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
