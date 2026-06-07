import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/projects — List all projects
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(projects);
}

// POST /api/projects — Create a new project (admin only)
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, slug, description, content, image, liveUrl, repoUrl, techStack, featured } = body;

  if (!title || !slug || !description) {
    return NextResponse.json(
      { error: "Title, slug, and description are required" },
      { status: 400 }
    );
  }

  const project = await prisma.project.create({
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

  return NextResponse.json(project, { status: 201 });
}
