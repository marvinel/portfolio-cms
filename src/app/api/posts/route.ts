import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/posts — List all posts (public: only published, admin: all)
export async function GET(request: NextRequest) {
  const session = await auth();
  const isAdmin = !!session;

  const posts = await prisma.post.findMany({
    where: isAdmin ? {} : { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      published: true,
      publishedAt: true,
      createdAt: true,
      tags: true,
    },
  });

  return NextResponse.json(posts);
}

// POST /api/posts — Create a new post (admin only)
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, slug, content, excerpt, coverImage, published, tags } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Title, slug, and content are required" },
      { status: 400 }
    );
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      coverImage: coverImage || null,
      published: published || false,
      publishedAt: published ? new Date() : null,
      tags: tags || [],
    },
  });

  return NextResponse.json(post, { status: 201 });
}
