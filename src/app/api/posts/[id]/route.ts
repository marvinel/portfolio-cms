import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/posts/:id — Get a single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PUT /api/posts/:id — Update a post (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, slug, content, excerpt, coverImage, published, tags } = body;

  // If publishing for the first time, set publishedAt
  const existingPost = await prisma.post.findUnique({ where: { id } });
  const publishedAt =
    published && !existingPost?.publishedAt ? new Date() : existingPost?.publishedAt;

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      coverImage: coverImage || null,
      published: published || false,
      publishedAt: published ? publishedAt : null,
      tags: tags || [],
    },
  });

  return NextResponse.json(post);
}

// DELETE /api/posts/:id — Delete a post (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.post.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
