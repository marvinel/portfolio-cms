import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import MarkReadButton from "@/components/admin/MarkReadButton";

export default async function AdminMessagesPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-xl font-bold">Messages</h1>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-lg">No messages yet.</p>
            <p className="text-sm mt-1">Messages from your contact form will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-gray-900 border rounded-xl p-5 ${
                  msg.read ? "border-gray-800" : "border-blue-500/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{msg.name}</h3>
                      {!msg.read && (
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-gray-300 text-sm font-medium mt-1">{msg.subject}</p>
                    )}
                    <p className="text-gray-300 mt-2 text-sm">{msg.body}</p>
                    <p className="text-gray-600 text-xs mt-2">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!msg.read && <MarkReadButton id={msg.id} />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
