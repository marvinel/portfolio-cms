import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST /api/contact — Submit a contact form message
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, body: messageBody } = body;

  if (!name || !email || !messageBody) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  const message = await prisma.message.create({
    data: {
      name,
      email,
      subject: subject || null,
      body: messageBody,
    },
  });

  return NextResponse.json(message, { status: 201 });
}
