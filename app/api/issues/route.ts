import { issueSchema } from "@/app/validateSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
  // Check session
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Authentication missing." },
      { status: 401 }
    );

  // Validate data
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );

  // Create new Issue
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
