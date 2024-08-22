import { patchIssueSchema } from "@/app/validateSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

// Update issue details
export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Check session
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Authentication missing." },
      { status: 401 }
    );

  // Validate request
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, assignedToUserId } = body;

  // Check user
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  // Fetch issue
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue." }, { status: 400 });

  // Update issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToUserId },
  });

  return NextResponse.json(updatedIssue);
}

// Delete issue
export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Check session
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Authentication missing." },
      { status: 401 }
    );

  // Fetch issue
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue." }, { status: 404 });

  // Delete issue
  const deletedIssue = await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json(deletedIssue, { status: 200 });
}
