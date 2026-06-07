import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// PUT /api/projects/:id — Update a project (admin only)
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
  const { title, slug, description, content, image, liveUrl, repoUrl, techStack, featured } = body;

  const project = await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      content: content || null,
      image: image || null,
      liveUrl: liveUrl || null,
      repoUrl: repoUrl || null,
      techStack: techStack || [],
      featured: featured || false,
    },
  });

  return NextResponse.json(project);
}

// DELETE /api/projects/:id — Delete a project (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
