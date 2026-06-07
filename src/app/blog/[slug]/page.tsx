import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) notFound();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800/50 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">MH</Link>
          <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← All posts
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>
              {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <div className="flex gap-1">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <MarkdownRenderer content={post.content} />
      </article>
    </main>
  );
}
